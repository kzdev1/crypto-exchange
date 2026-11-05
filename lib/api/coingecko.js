import "server-only";
import { ApiError } from "./errors";
import { fetchJson, toResult } from "./http";
import { coins as exampleCoins } from "../../components/CoinsTable/mock-coins";
import { trendingCoins as exampleTrending } from "../../components/MarketOverview/mock-data";

const BASE_URL = "https://api.coingecko.com/api/v3";

// Quantos segundos o servidor guarda cada resposta antes de buscar de novo.
// Somando as três, são cerca de 8.600 chamadas por mês (limite gratuito: ~10.000).
const MARKETS_REVALIDATE_SECONDS = 600; // lista de moedas: a cada 10 min
const TRENDING_REVALIDATE_SECONDS = 900; // moedas em alta: a cada 15 min
const GLOBAL_REVALIDATE_SECONDS = 1800; // resumo geral: a cada 30 min

const MARKETS_PER_PAGE = 250; // máximo por chamada: custa o mesmo que pedir menos
const SPARKLINE_STEP = 4; // o gráfico usa 1 ponto a cada 4, para ficar leve

// Dados de exemplo do resumo geral (só usados em desenvolvimento, sem chave).
const exampleGlobalStats = {
  activeCoins: 22744,
  exchanges: 1525,
  marketCap: 13.99e12,
  marketCapChange24h: -0.9,
  volume24h: 349e9,
  btcDominance: 58.3,
  ethDominance: 10.4,
};

// A chave fica só em variável de ambiente do servidor (sem NEXT_PUBLIC_)
// e vai no cabeçalho, nunca na URL.
function getAuthHeaders() {
  const key = process.env.COINGECKO_API_KEY;
  if (!key) return null;
  return { accept: "application/json", "x-cg-demo-api-key": key };
}

// Sem chave: em desenvolvimento usa dados de exemplo;
// em produção mostra erro, nunca preço falso.
function withoutKey(exampleData) {
  if (process.env.NODE_ENV === "production") {
    console.error("[api] COINGECKO_API_KEY não configurada");
    return { ok: false, error: "missing-key" };
  }
  return { ok: true, data: exampleData, isExample: true };
}

const numberOrNull = (value) => (Number.isFinite(value) ? value : null);

function downsample(values, step) {
  const sampled = values.filter((_, index) => index % step === 0);
  const last = values.at(-1);
  if (last !== undefined && sampled.at(-1) !== last) sampled.push(last);
  return sampled;
}

// ---------- Lista de moedas ----------

// Converte um item da API para o formato usado pelos componentes.
function toCoin(item) {
  if (!item || !Number.isFinite(item.current_price)) return null;

  return {
    rank: item.market_cap_rank,
    id: item.id,
    name: item.name,
    symbol: String(item.symbol).toUpperCase(),
    price: item.current_price,
    change24h: item.price_change_percentage_24h ?? 0,
    change7d: numberOrNull(item.price_change_percentage_7d_in_currency),
    circulatingSupply: numberOrNull(item.circulating_supply),
    marketCap: item.market_cap ?? 0,
    volume24h: item.total_volume ?? 0,
    sparkline: downsample(item.sparkline_in_7d?.price ?? [], SPARKLINE_STEP),
  };
}

// Lista das maiores moedas por capitalização, em reais.
// Devolve { ok: true, data, isExample } ou { ok: false, error }.
export async function getMarkets() {
  const headers = getAuthHeaders();
  if (!headers) return withoutKey(exampleCoins);

  const params = new URLSearchParams({
    vs_currency: "brl",
    order: "market_cap_desc",
    per_page: String(MARKETS_PER_PAGE),
    page: "1",
    sparkline: "true",
    price_change_percentage: "24h,7d",
  });

  return toResult(async () => {
    const raw = await fetchJson(`${BASE_URL}/coins/markets?${params}`, {
      headers,
      revalidate: MARKETS_REVALIDATE_SECONDS,
    });
    if (!Array.isArray(raw)) throw new ApiError("invalid-data");

    const coins = raw.map(toCoin).filter(Boolean);
    if (coins.length === 0) throw new ApiError("invalid-data");
    return coins;
  });
}

// Separa as maiores altas e baixas das últimas 24h dentro da própria lista.
export function pickGainersAndLosers(coins, count = 5) {
  const sorted = [...coins].sort((a, b) => b.change24h - a.change24h);
  return {
    gainers: sorted.slice(0, count),
    losers: sorted.slice(-count).reverse(),
  };
}

// ---------- Resumo geral do mercado ----------

// Números gerais: moedas, corretoras, capitalização, volume e dominância.
// Cada valor que a API não trouxer vem como null (a tela mostra "—").
export async function getGlobalStats() {
  const headers = getAuthHeaders();
  if (!headers) return withoutKey(exampleGlobalStats);

  return toResult(async () => {
    const raw = await fetchJson(`${BASE_URL}/global`, {
      headers,
      revalidate: GLOBAL_REVALIDATE_SECONDS,
    });

    const data = raw?.data;
    if (!data || typeof data !== "object") throw new ApiError("invalid-data");

    return {
      activeCoins: numberOrNull(data.active_cryptocurrencies),
      exchanges: numberOrNull(data.markets),
      marketCap: numberOrNull(data.total_market_cap?.brl),
      marketCapChange24h: numberOrNull(data.market_cap_change_percentage_24h_usd),
      volume24h: numberOrNull(data.total_volume?.brl),
      btcDominance: numberOrNull(data.market_cap_percentage?.btc),
      ethDominance: numberOrNull(data.market_cap_percentage?.eth),
    };
  });
}

// ---------- Moedas em alta ----------

// A lista de "em alta" da CoinGecko traz o preço em dólar e em bitcoin.
// Para mostrar em reais: se a moeda já está na lista principal, usa os valores
// dela; senão, converte o preço em bitcoin pelo preço do bitcoin em reais.
function toTrendingCoin(item, marketsById, bitcoinBrl) {
  if (!item) return null;

  const known = marketsById.get(item.id);
  if (known) {
    return {
      id: known.id,
      symbol: known.symbol,
      name: known.name,
      price: known.price,
      change: known.change24h,
    };
  }

  const priceBtc = Number(item.price_btc ?? item.data?.price_btc);
  const change = item.data?.price_change_percentage_24h?.usd;
  if (
    !Number.isFinite(priceBtc) ||
    !Number.isFinite(bitcoinBrl) ||
    !Number.isFinite(change)
  ) {
    return null;
  }

  return {
    id: item.id,
    symbol: String(item.symbol).toUpperCase(),
    name: item.name,
    price: priceBtc * bitcoinBrl,
    change,
  };
}

// `markets` é o resultado de getMarkets(); se ele falhou, esta também falha.
export async function getTrending(markets) {
  if (!markets.ok) return { ok: false, error: markets.error };

  const headers = getAuthHeaders();
  if (!headers) return withoutKey(exampleTrending);

  const marketsById = new Map(markets.data.map((coin) => [coin.id, coin]));
  const bitcoinBrl = marketsById.get("bitcoin")?.price;

  return toResult(async () => {
    const raw = await fetchJson(`${BASE_URL}/search/trending`, {
      headers,
      revalidate: TRENDING_REVALIDATE_SECONDS,
    });
    if (!Array.isArray(raw?.coins)) throw new ApiError("invalid-data");

    const coins = raw.coins
      .map(({ item }) => toTrendingCoin(item, marketsById, bitcoinBrl))
      .filter(Boolean);
    if (coins.length === 0) throw new ApiError("invalid-data");
    return coins;
  });
}