// Textos da página "Sobre o projeto". Para mudar, edite só este arquivo.
export const about = {
  title: "Sobre o projeto",
  version: "Versão 1.0",
  repositoryUrl: "https://github.com/kzdev1/crypto-exchange/",
  purpose: [
    "O Crypto Exchange é um projeto de portfólio que reúne, em um só lugar e em reais, preços de criptomoedas, números gerais do mercado, notícias e conteúdo para quem está começando.",
    "Ele não é uma corretora: não permite comprar, vender nem guardar criptomoedas. O objetivo é informar e, ao mesmo tempo, praticar o desenvolvimento de um site completo, com dados reais, segurança e acessibilidade.",
  ],
  features: [
    "Ranking das maiores criptomoedas, com ordem, busca por nome ou sigla e paginação.",
    "Resumo do mercado: capitalização, volume, dominância do Bitcoin e do Ethereum e o índice Medo e Ganância.",
    "Conversor entre criptomoedas e reais, nos dois sentidos, e comparador de moedas.",
    "Notícias por assunto (mercado, regulação e Brasil), com manchetes em inglês traduzidas automaticamente.",
    "Seção Aprender, com guias curtos e um glossário.",
  ],
  technologies: [
    {
      group: "Site",
      items: ["Next.js (App Router)", "React", "TypeScript", "Tailwind CSS", "Fonte Inter"],
    },
    {
      group: "Dados",
      items: ["CoinGecko (preços e mercado)", "Alternative.me (Medo e Ganância)", "Feeds RSS (notícias)", "DeepL (tradução de títulos)"],
    },
    {
      group: "Segurança e qualidade",
      items: ["Chaves de API só no servidor", "Cabeçalhos de segurança e validação de entradas", "Acessibilidade (WCAG) e LGPD"],
    },
  ],
  howItWasBuilt: [
    { title: "Segurança", text: "As chaves das APIs ficam só no servidor. Todo texto vindo da URL ou de fontes externas é validado antes de ser usado." },
    { title: "Acessibilidade", text: "HTML semântico, navegação completa por teclado, contraste adequado e cor sempre acompanhada de seta ou texto." },
    { title: "Privacidade", text: "O site não coleta dados pessoais nem usa cookies de rastreamento, em linha com a LGPD." },
    { title: "Confiabilidade", text: "Os dados ficam guardados por alguns minutos no servidor, o que respeita o limite das APIs gratuitas. Se algo falha, o site mostra uma mensagem clara, com a opção de tentar de novo." },
  ],
  author: {
    name: "Kauã Barbosa",
    text: "Kauã Barbosa, desenvolvedor front-end em início de carreira, criou o Crypto Exchange como projeto de portfólio para praticar Next.js, React e Tailwind CSS com dados reais.",
  },
};