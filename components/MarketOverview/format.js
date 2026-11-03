// Funções de formatação em português do Brasil.
const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
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

export const formatCompactBRL = (value) => compactBRL.format(value);
export const formatBRL = (value) => brl.format(value);
export const formatPercent = (value) => `${percent.format(value)}%`;


