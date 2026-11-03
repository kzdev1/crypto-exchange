// Textos e links do rodapé. Para mudar qualquer coisa, edite só este arquivo.
// Links com `external: true` abrem em nova aba.

export const projectInfo = {
  name: "Crypto Exchange",
  description:
    "Projeto de portfólio com preços de criptomoedas, estatísticas do mercado e notícias. Feito para estudar desenvolvimento web com Next.js, React e Tailwind CSS. Sem fins comerciais.",
};

export const footerColumns = [
  {
    id: "explorar",
    title: "Explorar",
    links: [
      { label: "Criptomoedas", href: "/criptomoedas" },
      { label: "Categorias", href: "/categorias" },
      { label: "Em alta", href: "/em-alta" },
      { label: "Conversor", href: "/conversor" },
      { label: "Notícias", href: "/noticias/mercado" },
    ],
  },
  {
    id: "projeto",
    title: "Projeto",
    links: [
      { label: "Sobre o projeto", href: "/sobre" },
      {
        label: "Repositório no GitHub",
        href: "https://github.com/kzdev1/crypto-exchange/",
        external: true,
      },
      { label: "GitHub", href: "https://github.com/kzdev1/", external: true },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/kaua-barbosa/",
        external: true,
      },
    ],
  },
  {
    id: "legal",
    title: "Legal",
    links: [
      { label: "Política de Privacidade", href: "/privacidade" },
      { label: "Termos de Uso", href: "/termos" },
      { label: "Preferências de cookies", href: "/cookies" },
      { label: "Aviso legal", href: "/aviso-legal" },
    ],
  },
  {
    id: "fontes",
    title: "Fontes",
    links: [
      {
        label: "CoinGecko (preços e mercado)",
        href: "https://www.coingecko.com/",
        external: true,
      },
      {
        label: "Alternative.me (Medo e Ganância)",
        href: "https://alternative.me/crypto/fear-and-greed-index/",
        external: true,
      },
    ],
  },
];

export const disclaimer =
  "Crypto Exchange é um projeto de portfólio e não é uma corretora: não há compra, venda ou custódia de criptomoedas. As informações são apenas informativas e não constituem recomendação de investimento. Criptomoedas são ativos de alto risco.";
