import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface LogEntry {
  id: string;
  timestamp: string;
  source: string;
  actor: 'ai' | 'user' | 'system';
  message: string;
  type: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

const EVALUATION_TELEMETRY_STORAGE_KEY = 'collabsmart_show_evaluation_telemetry';

function getInitialEvaluationTelemetryVisibility(): boolean {
  try {
    const raw = globalThis.localStorage?.getItem(EVALUATION_TELEMETRY_STORAGE_KEY);
    if (raw == null) return true;
    return raw === 'true';
  } catch {
    return true;
  }
}

function persistEvaluationTelemetryVisibility(value: boolean): void {
  try {
    globalThis.localStorage?.setItem(EVALUATION_TELEMETRY_STORAGE_KEY, value ? 'true' : 'false');
  } catch {
    // Ignore persistence failures; runtime state still updates.
  }
}

function getOrCreateUserId(): string {
  const storageKey = 'collabsmart_user_id';
  try {
    const existing = globalThis.localStorage?.getItem(storageKey);
    if (existing && existing.trim().length > 0) return existing;

    const generated =
      globalThis.crypto?.randomUUID?.() ??
      `user-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

    globalThis.localStorage?.setItem(storageKey, generated);
    return generated;
  } catch {
    return `user-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

interface SocketStore {
  socket: Socket | null;
  sessionId: string | null;
  userId: string | null;
  status: ConnectionStatus;
  logs: LogEntry[];
  messages: ChatMessage[];
  isAIThinking: boolean;
  lastError: string | null;
  showEvaluationTelemetry: boolean;

  connect: () => void;
  disconnect: () => void;
  sendMessage: (message: string) => void;
  setShowEvaluationTelemetry: (show: boolean) => void;
  clearLogs: () => void;
  clearMessages: () => void;
}

let logCounter = 0;
let msgCounter = 0;

function makeLogId() {
  return `log-${++logCounter}-${Date.now()}`;
}

function makeMsgId() {
  return `msg-${++msgCounter}-${Date.now()}`;
}

export const useSocketStore = create<SocketStore>((set, get) => ({
  socket: null,
  sessionId: null,
  userId: null,
  status: 'disconnected',
  logs: [],
  messages: [],
  isAIThinking: false,
  lastError: null,
  showEvaluationTelemetry: getInitialEvaluationTelemetryVisibility(),

  connect() {
    const existing = get().socket;
    if (existing?.connected) return;

    set({ status: 'connecting' });

    const userId = getOrCreateUserId();
    set({ userId });

    const socket = io(BACKEND_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });

    socket.on('connect', () => {
      set({ status: 'connected', lastError: null });
      addSystemLog(set, 'Connected to CollabSmart backend');
    });

    socket.on('disconnect', () => {
      set({ status: 'disconnected' });
      addSystemLog(set, 'Disconnected from backend');
    });

    socket.on('connect_error', () => {
      set({ status: 'error' });
    });

    socket.on('session:init', (data: { sessionId: string }) => {
      set({ sessionId: data.sessionId });
      addSystemLog(set, `Session initialized: ${data.sessionId.slice(0, 8)}...`);
    });

    socket.on('log:entry', (entry: Omit<LogEntry, 'id'>) => {
      set((state) => ({
        logs: [
          ...state.logs.slice(-500), // Keep last 500 log entries
          { ...entry, id: makeLogId() },
        ],
      }));
    });

    socket.on('chat:start', () => {
      set({ isAIThinking: true, lastError: null });
    });

    socket.on('chat:typing', (data: { text: string }) => {
      if (data.text?.trim()) {
        set({ isAIThinking: false });
      }
    });

    socket.on('chat:response', (data: { message: string }) => {
      set((state) => ({
        isAIThinking: false,
        messages: [
          ...state.messages,
          {
            id: makeMsgId(),
            role: 'assistant' as const,
            content: data.message,
            timestamp: new Date(),
          },
        ],
      }));
    });

    socket.on('chat:evaluation', (data: {
      sessionId: string;
      evaluation: {
        is_aligned: boolean;
        zone?: 'aligned' | 'acceptable_variance' | 'violation';
        alignment_score: number;
        correction_magnitude: number;
        season?: string;
        variance_margin_used?: number;
      };
    }) => {
      const ev = data.evaluation;
      const zone = ev.zone || (ev.is_aligned ? 'aligned' : 'violation');
      const score = Number.isFinite(ev.alignment_score) ? ev.alignment_score.toFixed(3) : 'n/a';
      const margin = typeof ev.variance_margin_used === 'number' && Number.isFinite(ev.variance_margin_used)
        ? ev.variance_margin_used.toFixed(3)
        : 'n/a';
      const correction = typeof ev.correction_magnitude === 'number' && Number.isFinite(ev.correction_magnitude)
        ? ev.correction_magnitude.toFixed(3)
        : 'n/a';

      if (!get().showEvaluationTelemetry) {
        return;
      }

      addSystemLog(
        set,
        `LINA evaluation: zone=${zone}, score=${score}, correction=${correction}, season=${ev.season || 'n/a'}, variance_margin=${margin}`,
        'evaluation'
      );
    });

    socket.on('chat:error', (data: { error: string }) => {
      set({ isAIThinking: false, lastError: data.error || 'Unknown chat error' });
      addSystemLog(set, `Error: ${data.error}`, 'error');
    });

    socket.on('tool:start', (data: { name: string; input: unknown }) => {
      addSystemLog(set, `AI using tool: ${data.name}`, 'tool-call');
    });

    socket.on('tool:result', (data: { name: string; success: boolean; output: string }) => {
      addSystemLog(
        set,
        `Tool ${data.name}: ${data.success ? 'OK' : 'FAIL'} — ${(data.output || '').slice(0, 120)}`,
        data.success ? 'tool-result' : 'error'
      );
    });

    set({ socket });
  },

  disconnect() {
    get().socket?.disconnect();
    set({ socket: null, status: 'disconnected', sessionId: null });
  },

  sendMessage(message: string) {
    const { socket, sessionId, userId } = get();
    if (!socket || !sessionId || !userId) return;

    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: makeMsgId(),
          role: 'user' as const,
          content: message,
          timestamp: new Date(),
        },
      ],
    }));

    socket.emit('chat:message', { sessionId, message, userId });
  },

  setShowEvaluationTelemetry(show: boolean) {
    persistEvaluationTelemetryVisibility(show);
    set({ showEvaluationTelemetry: show });
  },

  clearLogs() {
    set({ logs: [] });
  },

  clearMessages() {
    set({ messages: [], lastError: null });
    const { socket, sessionId } = get();
    if (sessionId) {
      // Clear server-side conversation history too
      fetch(`${BACKEND_URL}/api/conversation/${sessionId}`, { method: 'DELETE' }).catch(() => {});
    }
  },
}));

function addSystemLog(
  set: (fn: (state: SocketStore) => Partial<SocketStore>) => void,
  message: string,
  type = 'system'
) {
  set((state) => ({
    logs: [
      ...state.logs.slice(-500),
      {
        id: makeLogId(),
        timestamp: new Date().toISOString(),
        source: 'system',
        actor: 'system' as const,
        message,
        type,
      },
    ],
  }));
}
