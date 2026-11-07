// Dados do menu. Para adicionar ou renomear itens, edite só este arquivo.
// - Item com `links` vira um dropdown.
// - Item com `href` vira um link simples.
// Links com "#" (ex.: /#conversor) descem até a ferramenta com scroll suave.
export const navItems = [
  {
    id: "criptomoedas",
    label: "Criptomoedas",
    links: [
      { label: "Por capitalização", href: "/criptomoedas" },
      { label: "Em alta", href: "/criptomoedas?ordem=volume" },
      { label: "Maiores altas e baixas", href: "/criptomoedas?ordem=alta" },
    ],
  },
  {
    id: "ferramentas",
    label: "Ferramentas",
    links: [
      { label: "Conversor", href: "/#conversor" },
      { label: "Comparar moedas", href: "/#comparar" },
    ],
  },
  {
    id: "noticias",
    label: "Notícias",
    links: [
      { label: "Mercado", href: "/noticias/mercado" },
      { label: "Regulação e política", href: "/noticias/regulacao" },
      { label: "Brasil", href: "/noticias/brasil" },
    ],
  },
  { id: "aprender", label: "Aprender", href: "/aprender" },
];