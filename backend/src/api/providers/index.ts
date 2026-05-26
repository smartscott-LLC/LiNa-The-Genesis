/**
 * AI Provider Factory
 * ===================
 * Returns the correct AIProvider instance based on the `ai_provider`
 * runtime setting (DB-backed, with env-var fallback).
 *
 * Supported providers and their default base URLs:
 *
 *   anthropic    — native Anthropic SDK (ANTHROPIC_API_KEY)
 *   openai       — https://api.openai.com/v1  (AI_API_KEY or OPENAI_API_KEY)
 *   ollama       — http://localhost:11434/v1   (no key required)
 *   groq         — https://api.groq.com/openai/v1  (AI_API_KEY)
 *   openrouter   — https://openrouter.ai/api/v1    (AI_API_KEY)
 *   together_ai  — https://api.together.xyz/v1      (AI_API_KEY)
 *
 * The AI_BASE_URL env var (or `ai_base_url` DB setting) overrides the
 * provider's default base URL, allowing any custom/self-hosted endpoint.
 */

import { AnthropicProvider } from './anthropic-provider';
import { OpenAICompatProvider } from './openai-compat-provider';
import type { AIProvider, ProviderName } from './types';

function firstNonEmpty(...values: Array<string | undefined>): string {
  for (const value of values) {
    if (value && value.trim().length > 0) {
      return value;
    }
  }
  return '';
}

/** Default base URLs for each OpenAI-compatible provider. */
const PROVIDER_BASE_URLS: Partial<Record<ProviderName, string>> = {
  openai: 'https://api.openai.com/v1',
  ollama: 'http://localhost:11434/v1',
  groq: 'https://api.groq.com/openai/v1',
  openrouter: 'https://openrouter.ai/api/v1',
  together_ai: 'https://api.together.xyz/v1',
};

/**
 * Build an AIProvider from the given configuration values.
 * All parameters are runtime-configurable; supply the results of
 * `getSetting()` calls from the caller.
 */
export function getProvider(providerName: string, baseUrlOverride: string): AIProvider {
  const provider = providerName as ProviderName;

  if (provider === 'anthropic') {
    const key = process.env.ANTHROPIC_API_KEY ?? '';
    if (!key) {
      throw new Error(
        'ANTHROPIC_API_KEY is not set. Add it to your .env file to use the Anthropic provider.',
      );
    }
    return new AnthropicProvider(key);
  }

  // All other providers use the OpenAI-compatible interface
  const apiKey =
    provider === 'openrouter'
      ? firstNonEmpty(
          process.env.OPENROUTER_API_KEY,
          process.env.AI_API_KEY,
          process.env.OPENAI_API_KEY, // legacy fallback
        )
      : firstNonEmpty(
          process.env.AI_API_KEY,
          process.env.OPENAI_API_KEY, // legacy fallback
        );

  const defaultBaseUrl = PROVIDER_BASE_URLS[provider] ?? '';
  const baseURL = baseUrlOverride || defaultBaseUrl;
  const defaultHeaders: Record<string, string> = {};

  if (!baseURL) {
    throw new Error(
      `Unknown provider "${provider}". ` +
        'Set ai_provider to one of: ' +
        Object.keys(PROVIDER_BASE_URLS).join(', ') +
        ', or set ai_provider=anthropic.',
    );
  }

  if (provider === 'openrouter') {
    const appUrl = process.env.OPENROUTER_SITE_URL ?? process.env.FRONTEND_URL ?? 'http://localhost:3000';
    const appName = process.env.OPENROUTER_APP_NAME ?? 'CollabSmart';
    defaultHeaders['HTTP-Referer'] = appUrl;
    defaultHeaders['X-Title'] = appName;
  }

  return new OpenAICompatProvider(apiKey, baseURL, defaultHeaders);
}

export type { AIProvider, ProviderName } from './types';
