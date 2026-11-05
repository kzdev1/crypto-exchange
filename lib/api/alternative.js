import "server-only";
import { ApiError } from "./errors";
import { fetchJson, toResult } from "./http";

// Índice Medo e Ganância do Alternative.me. É gratuito, não pede chave e
// exige que a fonte seja citada junto do dado (veja MarketStatsBar.jsx).
const FEAR_GREED_URL = "https://api.alternative.me/fng/";

// O índice só muda uma vez por dia, então guardar por 1 hora é suficiente.
const FEAR_GREED_REVALIDATE_SECONDS = 3600;

// Devolve { ok: true, data: { value, classification } } ou { ok: false, error }.
// `classification` vem em inglês: "Extreme Fear", "Fear", "Neutral", "Greed", "Extreme Greed".
export async function getFearGreed() {
  return toResult(async () => {
    const raw = await fetchJson(FEAR_GREED_URL, {
      revalidate: FEAR_GREED_REVALIDATE_SECONDS,
    });

    const entry = raw?.data?.[0];
    const value = Number(entry?.value);
    if (
      !entry ||
      !Number.isFinite(value) ||
      typeof entry.value_classification !== "string"
    ) {
      throw new ApiError("invalid-data");
    }

    return { value, classification: entry.value_classification };
  });
}
