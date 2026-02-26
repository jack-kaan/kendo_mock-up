import { useCallback, useState } from 'react';

import { callGemini } from '@/services/gemini';

export type GeminiPromptStatus = 'success' | 'missing_api_key' | 'error';

export interface GeminiPromptResult {
  status: GeminiPromptStatus;
  message: string;
}

export interface GeneratePromptOptions {
  fallbackMessage?: string;
  missingKeyMessage?: string;
}

const DEFAULT_ERROR_MESSAGE = '메시지 생성에 실패했습니다. 잠시 후 다시 시도해주세요.';

export function useGeminiPrompt(defaultOptions?: GeneratePromptOptions) {
  const [isLoading, setIsLoading] = useState(false);

  const generatePrompt = useCallback(
    async (prompt: string, options?: GeneratePromptOptions): Promise<GeminiPromptResult> => {
      const { fallbackMessage = DEFAULT_ERROR_MESSAGE, missingKeyMessage } = {
        ...defaultOptions,
        ...options,
      };

      setIsLoading(true);
      try {
        const result = await callGemini(prompt);
        if (result.ok) {
          return { status: 'success', message: result.message };
        }

        if (result.reason === 'missing_api_key' && missingKeyMessage) {
          return { status: 'missing_api_key', message: missingKeyMessage };
        }

        return { status: 'error', message: fallbackMessage };
      } catch {
        return { status: 'error', message: fallbackMessage };
      } finally {
        setIsLoading(false);
      }
    },
    [defaultOptions],
  );

  return { isLoading, generatePrompt };
}
