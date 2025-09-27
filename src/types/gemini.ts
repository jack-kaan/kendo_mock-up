export type GeminiErrorReason =
  | 'missing_api_key'
  | 'network_error'
  | 'empty_response'
  | 'exception';

export type GeminiResult =
  | { ok: true; message: string }
  | { ok: false; reason: GeminiErrorReason };
