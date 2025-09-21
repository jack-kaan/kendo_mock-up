const GEMINI_MODEL_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const extractGeminiText = (result: any) => {
  const content = result?.candidates?.[0]?.content?.parts?.[0]?.text;
  return typeof content === 'string' ? content : null;
};

export type GeminiResult =
  | { ok: true; message: string }
  | { ok: false; reason: 'missing_api_key' | 'network_error' | 'empty_response' | 'exception' };

export async function callGemini(prompt: string): Promise<GeminiResult> {
  const apiKey = import.meta.env?.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    return { ok: false, reason: 'missing_api_key' };
  }

  try {
    const payload = { contents: [{ role: 'user', parts: [{ text: prompt }] }] };
    const response = await fetch(`${GEMINI_MODEL_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return { ok: false, reason: 'network_error' };
    }

    const result = await response.json();
    const message = extractGeminiText(result);
    if (!message) {
      return { ok: false, reason: 'empty_response' };
    }

    return { ok: true, message };
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return { ok: false, reason: 'exception' };
  }
}
