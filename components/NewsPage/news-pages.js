// Páginas de notícias. Para adicionar uma página, inclua um item aqui
// (a `category` deve existir em lib/api/news-sources.js) e uma rota em app/noticias.
export const NEWS_PAGES = [
  {
    slug: "",
    href: "/noticias",
    label: "Todas",
    category: null,
    title: "Notícias de criptomoedas",
    description:
      "As últimas notícias do mercado de criptomoedas, de fontes brasileiras e internacionais.",
  },
  {
    slug: "mercado",
    href: "/noticias/mercado",
    label: "Mercado",
    category: "Mercado",
    title: "Notícias do mercado",
    description:
      "Preços, grandes movimentos, fundos negociados em bolsa e análises do mercado de criptomoedas.",
  },
  {
    slug: "regulacao",
    href: "/noticias/regulacao",
    label: "Regulação e política",
    category: "Regulação",
    title: "Regulação e política",
    description:
      "Leis, órgãos reguladores e decisões políticas que podem influenciar o mercado de criptomoedas.",
  },
  {
    slug: "brasil",
    href: "/noticias/brasil",
    label: "Brasil",
    category: "Brasil",
    title: "Notícias do Brasil",
    description: "O que acontece com as criptomoedas no Brasil, em fontes brasileiras.",
  },
];

export const findNewsPage = (slug) =>
  NEWS_PAGES.find((page) => page.slug === slug);