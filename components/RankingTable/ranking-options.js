// Regras da página de ranking: ordens disponíveis, busca, tamanho da página e links.
// Para adicionar uma ordem, inclua-a em SORTS e em `comparers`.

export const PAGE_SIZE = 50;
export const DEFAULT_SORT = "capitalizacao";

export const SORTS = [
  { id: "capitalizacao", label: "Capitalização" },
  { id: "volume", label: "Volume 24h" },
  { id: "alta", label: "Maiores altas" },
  { id: "baixa", label: "Maiores baixas" },
];

const comparers = {
  capitalizacao: (a, b) => a.rank - b.rank,
  volume: (a, b) => b.volume24h - a.volume24h,
  alta: (a, b) => b.change24h - a.change24h,
  baixa: (a, b) => a.change24h - b.change24h,
};

// Só aceita ordens conhecidas; qualquer outra coisa na URL vira a padrão.
export function parseSort(value) {
  return typeof value === "string" && Object.hasOwn(comparers, value)
    ? value
    : DEFAULT_SORT;
}

export function sortCoins(coins, sortId) {
  return [...coins].sort(comparers[sortId]);
}

// Tira acentos e maiúsculas, para "ethéreum" e "ETHEREUM" acharem o mesmo.
const normalizeText = (text) =>
  text.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

// Moedas cujo nome ou sigla contém o texto buscado. Sem texto, devolve todas.
export function filterCoins(coins, query) {
  if (!query) return coins;
  const needle = normalizeText(query);
  return coins.filter(
    (coin) =>
      normalizeText(coin.name).includes(needle) ||
      normalizeText(coin.symbol).includes(needle)
  );
}

// Número da página vindo da URL, sempre entre 1 e o total de páginas.
export function parsePage(value, totalPages) {
  const page = Number.parseInt(value, 10);
  if (!Number.isFinite(page) || page < 1) return 1;
  return Math.min(page, totalPages);
}

export function buildHref(sortId, page, query = "") {
  const params = new URLSearchParams();
  if (query) params.set("busca", query);
  if (sortId !== DEFAULT_SORT) params.set("ordem", sortId);
  if (page > 1) params.set("pagina", String(page));
  const text = params.toString();
  return text ? `/criptomoedas?${text}` : "/criptomoedas";
}