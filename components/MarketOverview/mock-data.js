// DADOS DE EXEMPLO. Serão substituídos pelos dados das APIs gratuitas.
// Preços em reais (BRL); variações em porcentagem nas últimas 24h.

export const marketStatus = [
  { id: "fear-greed", label: "Medo e Ganância", value: "33", detail: "Medo" },
  { id: "market-cap", label: "Capitalização total", value: "R$ 13,99 tri", change: -2.16 },
  { id: "volume", label: "Volume em 24h", value: "R$ 349 bi", change: 44.49 },
  { id: "btc-dominance", label: "Dominância do BTC", value: "59,9%" },
];

export const trendingCoins = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin", price: 416030.16, change: -2.28 },
  { id: "ethereum", symbol: "ETH", name: "Ethereum", price: 12210.48, change: -2.03 },
  { id: "solana", symbol: "SOL", name: "Solana", price: 498.43, change: -3.29 },
  { id: "ripple", symbol: "XRP", name: "XRP", price: 6.79, change: -0.28 },
  { id: "binancecoin", symbol: "BNB", name: "BNB", price: 3778.61, change: -2.15 },
  { id: "zcash", symbol: "ZEC", name: "Zcash", price: 6130.21, change: -11.57 },
  { id: "dogecoin", symbol: "DOGE", name: "Dogecoin", price: 0.92, change: -1.8 },
  { id: "cardano", symbol: "ADA", name: "Cardano", price: 2.31, change: -2.6 },
  { id: "chainlink", symbol: "LINK", name: "Chainlink", price: 78.4, change: -3.1 },
  { id: "avalanche", symbol: "AVAX", name: "Avalanche", price: 160.2, change: 1.4 },
];

export const gainers = [
  { id: "coin-a", symbol: "AAA", name: "Moeda A", price: 0.18, change: 38.2 },
  { id: "coin-b", symbol: "BBB", name: "Moeda B", price: 1.42, change: 27.9 },
  { id: "coin-c", symbol: "CCC", name: "Moeda C", price: 12.5, change: 21.4 },
  { id: "coin-d", symbol: "DDD", name: "Moeda D", price: 0.07, change: 18.6 },
  { id: "coin-e", symbol: "EEE", name: "Moeda E", price: 3.95, change: 15.1 },
];

export const losers = [
  { id: "coin-f", symbol: "FFF", name: "Moeda F", price: 0.43, change: -24.3 },
  { id: "coin-g", symbol: "GGG", name: "Moeda G", price: 5.1, change: -19.8 },
  { id: "coin-h", symbol: "HHH", name: "Moeda H", price: 0.96, change: -16.2 },
  { id: "coin-i", symbol: "III", name: "Moeda I", price: 22.7, change: -13.5 },
  { id: "coin-j", symbol: "JJJ", name: "Moeda J", price: 0.31, change: -11.9 },
];

export const latestNews = [
  { id: "n1", title: "Bitcoin opera em queda após dia de saídas em fundos negociados em bolsa", category: "Mercado", time: "há 1 hora", href: "/noticias/mercado" },
  { id: "n2", title: "Reguladores discutem novas regras para corretoras de criptomoedas", category: "Regulação", time: "há 2 horas", href: "/noticias/regulacao" },
  { id: "n3", title: "Interesse de brasileiros por stablecoins cresce no trimestre", category: "Brasil", time: "há 3 horas", href: "/noticias/brasil" },
  { id: "n4", title: "Ethereum avança em teste de atualização da rede", category: "Mercado", time: "há 5 horas", href: "/noticias/mercado" },
];
