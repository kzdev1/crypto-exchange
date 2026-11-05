// Fontes de notícias (feeds RSS públicos). Para adicionar ou remover uma fonte,
// edite só esta lista. Se um feed falhar, ele é ignorado e as outras fontes continuam.
//
// category: assunto da aba ("Mercado", "Regulação" ou "Brasil").
// language: idioma das manchetes ("pt-BR" ou "en").

export const newsFeeds = [
  { id: "cointelegraph", source: "Cointelegraph", url: "https://cointelegraph.com/rss", category: "Mercado", language: "en" },
  { id: "coindesk", source: "CoinDesk", url: "https://www.coindesk.com/arc/outboundfeeds/rss/?outputType=xml", category: "Mercado", language: "en" },
  { id: "cointelegraph-regulation", source: "Cointelegraph", url: "https://cointelegraph.com/rss/tag/regulation", category: "Regulação", language: "en" },
  // Fontes brasileiras: se algum endereço estiver errado, só ele é ignorado
  // (o terminal mostra "[news] feed indisponível").
  { id: "cointelegraph-brasil", source: "Cointelegraph Brasil", url: "https://cointelegraph.com.br/rss", category: "Brasil", language: "pt-BR" },
  { id: "portal-do-bitcoin", source: "Portal do Bitcoin", url: "https://portaldobitcoin.uol.com.br/feed/", category: "Brasil", language: "pt-BR" },
];

export const MAX_ITEMS_PER_FEED = 10;
export const FEED_TIMEOUT_MS = 5000;
export const NEWS_REVALIDATE_SECONDS = 600; // busca de novo a cada 10 minutos
