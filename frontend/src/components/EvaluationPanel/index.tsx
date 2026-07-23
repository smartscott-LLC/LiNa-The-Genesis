'use client';

import React from 'react';

export interface EvaluationData {
  is_aligned: boolean;
  zone?: 'aligned' | 'acceptable_variance' | 'violation';
  alignment_score: number;
  was_corrected?: boolean;
  correction_magnitude?: number;
  season?: string;
  violations?: Array<{
    name: string;
    value: number;
    bound: number;
    type?: string;
  }>;
  wisdom?: {
    overconfidence?: boolean;
    humility_suggested?: boolean;
    validation_suggested?: boolean;
    notes?: string[];
  };
}

function scoreToColor(score: number): string {
  if (score >= 0.7) return 'text-sharp-success';
  if (score >= 0.3) return 'text-sharp-warning';
  return 'text-sharp-error';
}

function zoneToColor(zone: string): string {
  switch (zone) {
    case 'aligned': return 'text-sharp-success';
    case 'acceptable_variance': return 'text-sharp-warning';
    case 'violation': return 'text-sharp-error';
    default: return 'text-gray-500';
  }
}

function zoneToLabel(zone: string): string {
  switch (zone) {
    case 'aligned': return 'Aligned';
    case 'acceptable_variance': return 'Near Edge';
    case 'violation': return 'Outside';
    default: return 'Unknown';
  }
}

export default function EvaluationPanel({ evaluation }: { evaluation: EvaluationData | null }) {
  if (!evaluation) return null;

  const zone = evaluation.zone || (evaluation.is_aligned ? 'aligned' : 'violation');
  const score = Number.isFinite(evaluation.alignment_score) ? evaluation.alignment_score : 0;
  const violations = evaluation.violations || [];
  const wisdom = evaluation.wisdom;

  return (
    <div className="mt-2 pt-2 border-t border-sharp-border/50">
      {/* Score bar */}
      <div className="flex items-center gap-2 mb-1.5">
        <div className="flex-1 h-1.5 rounded-full bg-sharp-bg overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              score >= 0.7 ? 'bg-sharp-success' :
              score >= 0.3 ? 'bg-sharp-warning' :
              'bg-sharp-error'
            }`}
            style={{ width: `${Math.max(score * 100, 2)}%` }}
          />
        </div>
        <span className={`text-[10px] font-semibold font-mono ${scoreToColor(score)}`}>
          {score.toFixed(3)}
        </span>
      </div>

      {/* Zone badge + season */}
      <div className="flex items-center gap-2 mb-1.5">
        <span className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded ${
          zone === 'aligned' ? 'bg-sharp-success/10 text-sharp-success' :
          zone === 'acceptable_variance' ? 'bg-sharp-warning/10 text-sharp-warning' :
          'bg-sharp-error/10 text-sharp-error'
        }`}>
          {zoneToLabel(zone)}
        </span>
        {evaluation.season && (
          <span className="text-[10px] font-mono text-gray-500">
            {evaluation.season}
          </span>
        )}
        {evaluation.was_corrected && (
          <span className="text-[10px] font-mono text-sharp-warning">
            Δ {evaluation.correction_magnitude?.toFixed(4)}
          </span>
        )}
      </div>

      {/* Violations */}
      {violations.length > 0 && (
        <div className="mb-1">
          {violations.slice(0, 3).map((v, i) => (
            <div key={i} className="flex items-center gap-1 text-[10px] font-mono text-sharp-error/80">
              <span className="w-1 h-1 rounded-full bg-sharp-error shrink-0" />
              <span className="capitalize">{v.name}</span>
              <span className="text-gray-500">({v.value.toFixed(3)} / {v.bound.toFixed(3)})</span>
            </div>
          ))}
        </div>
      )}

      {/* Wisdom flags */}
      {wisdom && (wisdom.overconfidence || wisdom.humility_suggested || wisdom.validation_suggested) && (
        <div className="flex flex-wrap gap-1">
          {wisdom.overconfidence && (
            <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-sharp-warning/10 text-sharp-warning">
              overconfident
            </span>
          )}
          {wisdom.humility_suggested && (
            <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-sharp-accent/10 text-sharp-accent-light">
              humility
            </span>
          )}
          {wisdom.validation_suggested && (
            <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-sharp-ai/10 text-sharp-ai">
              validate
            </span>
          )}
        </div>
      )}
    </div>
  );
}
