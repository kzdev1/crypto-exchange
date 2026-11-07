import "server-only";
import { ApiError } from "./errors";
import { fetchJson } from "./http";

// Tradução automática de títulos (inglês -> português do Brasil) pelo DeepL API Free:
// 500.000 caracteres por mês. A chave fica só no servidor (DEEPL_API_KEY).
// Falhar na tradução nunca derruba a notícia: o título original é mantido.

// Cada título é traduzido uma única vez e a resposta fica guardada por 7 dias,
// para não gastar caracteres repetidos.
const TRANSLATE_REVALIDATE_SECONDS = 60 * 60 * 24 * 7;
const TRANSLATE_TIMEOUT_MS = 5000;
const MAX_MEMORY_ENTRIES = 500;
const PAUSE_AFTER_LIMIT_MS = 60 * 60 * 1000; // 1 hora sem tentar, se o limite acabar

const memory = new Map();
let pausedUntil = 0;

// Devolve o texto traduzido, ou null se não for possível traduzir.
export async function translateToPortuguese(text) {
  const key = process.env.DEEPL_API_KEY;
  if (!key || Date.now() < pausedUntil) return null;
  if (memory.has(text)) return memory.get(text);

  // Chaves gratuitas terminam em ":fx" e usam outro endereço.
  const host = key.endsWith(":fx") ? "api-free.deepl.com" : "api.deepl.com";

  try {
    const raw = await fetchJson(`https://${host}/v2/translate`, {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: [text],
        source_lang: "EN",
        target_lang: "PT-BR",
      }),
      revalidate: TRANSLATE_REVALIDATE_SECONDS,
      timeoutMs: TRANSLATE_TIMEOUT_MS,
    });

    const translated = raw?.translations?.[0]?.text;
    if (typeof translated !== "string" || !translated.trim()) return null;

    if (memory.size >= MAX_MEMORY_ENTRIES) {
      memory.delete(memory.keys().next().value);
    }
    memory.set(text, translated.trim());
    return translated.trim();
  } catch (error) {
    const status = error instanceof ApiError ? error.status : undefined;
    // 456 = limite mensal esgotado; 429 = muitas requisições.
    if (status === 456 || status === 429) pausedUntil = Date.now() + PAUSE_AFTER_LIMIT_MS;
    console.error(`[translate] falha: ${error instanceof ApiError ? error.kind : "unknown"}${status ? ` (${status})` : ""}`);
    return null;
  }
}
