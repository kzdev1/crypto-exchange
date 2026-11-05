// Funções de formatação em português do Brasil.
const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

// Preços abaixo de R$ 1 mostram mais casas, para moedas de valor muito
// baixo não virarem "R$ 0,00".
const brlSmall = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 8,
});

const percent = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const compactBRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  notation: "compact",
  maximumFractionDigits: 2,
});

const compactNumber = new Intl.NumberFormat("pt-BR", {
  notation: "compact",
  maximumFractionDigits: 2,
});

export const formatBRL = (value) =>
  (Math.abs(value) < 1 ? brlSmall : brl).format(value);
export const formatPercent = (value) => `${percent.format(value)}%`;
export const formatCompactBRL = (value) => compactBRL.format(value);
export const formatCompactNumber = (value) => compactNumber.format(value);