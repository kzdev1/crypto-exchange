import "server-only";
import { ApiError } from "./errors";

const DEFAULT_TIMEOUT_MS = 8000;

// Faz a requisição com tempo limite e transforma qualquer falha em um ApiError
// previsível. `revalidate` é quantos segundos o servidor guarda a resposta.
async function request(
  url,
  { method, headers, body, revalidate, timeoutMs = DEFAULT_TIMEOUT_MS } = {}
) {
  let response;

  try {
    response = await fetch(url, {
      method,
      headers,
      body,
      next: { revalidate },
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch (error) {
    throw new ApiError(error?.name === "TimeoutError" ? "timeout" : "network");
  }

  if (response.status === 429) throw new ApiError("rate-limit", 429);
  if (!response.ok) throw new ApiError("http", response.status);
  return response;
}

export async function fetchJson(url, options) {
  const response = await request(url, options);
  try {
    return await response.json();
  } catch {
    throw new ApiError("invalid-data");
  }
}

export async function fetchText(url, options) {
  const response = await request(url, options);
  try {
    return await response.text();
  } catch {
    throw new ApiError("invalid-data");
  }
}

// Executa `load` e devolve sempre { ok: true, data } ou { ok: false, error }.
// O erro é registrado só no servidor, sem URL, cabeçalhos ou chave.
export async function toResult(load) {
  try {
    return { ok: true, data: await load(), isExample: false };
  } catch (error) {
    const kind = error instanceof ApiError ? error.kind : "unknown";
    const status = error instanceof ApiError && error.status ? ` (${error.status})` : "";
    console.error(`[api] falha: ${kind}${status}`);
    return { ok: false, error: kind };
  }
}
