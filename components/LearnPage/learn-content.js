// Textos da página Aprender. Para mudar, adicionar ou remover um guia ou termo,
// edite só este arquivo: a página se monta sozinha a partir destas listas.

export const learnPage = {
  title: "Aprender sobre criptomoedas",
  intro:
    "Guias curtos e um glossário para entender os conceitos básicos do mercado de criptomoedas e usar melhor as informações deste site.",
  disclaimer:
    "Conteúdo apenas educativo, sem recomendação de investimento. Criptomoedas são ativos de alto risco e é possível perder todo o valor investido. Estude e, se precisar, procure um profissional habilitado.",
};

export const guides = [
  {
    id: "bitcoin",
    title: "O que é Bitcoin",
    paragraphs: [
      "O Bitcoin é uma moeda digital criada em 2009 por uma pessoa ou grupo que usa o nome Satoshi Nakamoto. Ele funciona sem banco central e sem intermediários: quem mantém a rede funcionando é uma comunidade de computadores espalhados pelo mundo.",
      "Existirão no máximo 21 milhões de bitcoins, e esse limite está no próprio código. Cada bitcoin pode ser dividido em partes muito pequenas, então é possível comprar uma fração dele.",
      "O preço do Bitcoin muda bastante de um dia para o outro. Por isso, entender o risco vem antes de qualquer decisão.",
    ],
  },
  {
    id: "blockchain",
    title: "O que é blockchain",
    paragraphs: [
      "Blockchain é um livro-razão digital compartilhado: uma lista de registros, agrupados em blocos, em que cada bloco aponta para o anterior. Por isso a lista forma uma corrente.",
      "Muitos computadores guardam uma cópia da mesma lista. Para alterar um registro antigo, seria preciso mudar todos os blocos seguintes em quase todas as cópias, o que é muito difícil. É isso que dá confiança ao sistema.",
      "Atenção: a blockchain em si é difícil de alterar, mas carteiras, corretoras e sites ligados a ela podem ser invadidos ou usados em golpes.",
    ],
  },
  {
    id: "stablecoins",
    title: "O que são stablecoins",
    paragraphs: [
      "Stablecoins são criptomoedas criadas para manter um valor estável, em geral acompanhando uma moeda como o dólar. Alguns exemplos que aparecem no ranking são o USDT e o USDC.",
      "Elas servem para guardar valor por um tempo ou para movimentar dinheiro entre operações. Em reais, o preço de uma stablecoin atrelada ao dólar acompanha a cotação do dólar.",
      "Elas também têm riscos: o emissor pode não ter reservas suficientes e o valor pode se afastar do esperado. Estável não significa livre de risco.",
    ],
  },
  {
    id: "ranking",
    title: "Como ler o ranking de criptomoedas",
    paragraphs: [
      "Capitalização de mercado é o preço da moeda multiplicado pela oferta circulante (quantas unidades existem em circulação). É ela, e não o preço de uma unidade, que mostra o tamanho de uma criptomoeda. Uma moeda de preço baixo pode ser maior do que uma de preço alto.",
      "Volume em 24 horas é o valor negociado no último dia. Volume alto indica que muita gente está comprando e vendendo, o que facilita negociar.",
      "As variações de 24 horas e de 7 dias mostram quanto o preço subiu ou caiu no período. No site, verde indica alta e vermelho indica queda, sempre junto de uma seta. O gráfico pequeno resume os últimos 7 dias.",
    ],
  },
  {
    id: "medo-e-ganancia",
    title: "O que é o índice Medo e Ganância",
    paragraphs: [
      "É um número de 0 a 100 que resume o humor do mercado de criptomoedas. Valores baixos indicam medo e valores altos indicam ganância. Ele combina fatores como volatilidade, volume de negociação, redes sociais e tendências de busca.",
      "Ele mostra o sentimento do momento e não prevê o futuro. Os dados vêm do Alternative.me e são atualizados uma vez por dia.",
    ],
  },
  {
    id: "golpes",
    title: "Como evitar golpes",
    paragraphs: [
      "Desconfie de qualquer promessa de ganho garantido ou de retorno muito acima do normal. Pressa e urgência (\"só hoje\", \"últimas vagas\") são sinais clássicos de golpe.",
      "Nunca compartilhe sua senha, seus códigos de verificação, sua chave privada ou sua frase de recuperação. Nenhuma empresa séria pede isso.",
      "Confira o endereço do site antes de entrar, evite links recebidos por mensagem e ative a verificação em duas etapas. Lembre que transferências de criptomoedas normalmente não podem ser desfeitas.",
      "Antes de usar uma plataforma, pesquise a reputação dela e se ela é autorizada a operar no Brasil. Em caso de dúvida, não invista.",
    ],
  },
];

export const glossary = [
  { term: "Altcoin", definition: "Qualquer criptomoeda diferente do Bitcoin." },
  { term: "Blockchain", definition: "Registro digital compartilhado, formado por blocos encadeados, difícil de alterar." },
  { term: "Capitalização de mercado", definition: "Preço da moeda multiplicado pela oferta circulante. Mostra o tamanho da criptomoeda." },
  { term: "Carteira (wallet)", definition: "Aplicativo ou dispositivo que guarda as chaves de acesso às suas criptomoedas." },
  { term: "Chave privada", definition: "Código secreto que dá controle sobre uma carteira. Quem tem a chave controla o dinheiro." },
  { term: "Corretora (exchange)", definition: "Plataforma onde se compram, vendem e trocam criptomoedas." },
  { term: "Frase de recuperação", definition: "Sequência de palavras que permite recuperar uma carteira. Nunca deve ser compartilhada." },
  { term: "Halving", definition: "Evento do Bitcoin, mais ou menos a cada quatro anos, em que a recompensa dos mineradores cai pela metade." },
  { term: "Liquidez", definition: "Facilidade de comprar ou vender uma moeda rapidamente sem mexer muito no preço." },
  { term: "Mineração", definition: "Processo em que computadores validam transações e protegem algumas redes, como a do Bitcoin." },
  { term: "Oferta circulante", definition: "Quantidade de unidades de uma moeda que estão em circulação." },
  { term: "Stablecoin", definition: "Criptomoeda criada para manter valor estável, como o dólar." },
  { term: "Taxa de rede", definition: "Valor pago para que uma transação seja processada na blockchain." },
  { term: "Token", definition: "Ativo digital criado sobre uma blockchain que já existe." },
  { term: "Volatilidade", definition: "Quanto o preço sobe e desce em pouco tempo." },
  { term: "Volume", definition: "Valor total negociado em um período, como as últimas 24 horas." },
];