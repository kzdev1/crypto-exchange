// Cores de "bom" e "ruim" do site, em um lugar só.
// positive = alta/bom (verde) | negative = queda/ruim (vermelho) | neutral = sem variação (cinza)
// Os textos usam tons escuros para manter o contraste mínimo de 4.5:1 no fundo branco.

export const toneText = {
  positive: "text-green-700",
  negative: "text-red-700",
  neutral: "text-neutral-600",
};

// Cor dos gráficos (usam currentColor).
export const toneStroke = {
  positive: "text-green-600",
  negative: "text-red-600",
  neutral: "text-neutral-500",
};

export function toneFromValue(value) {
  if (value > 0) return "positive";
  if (value < 0) return "negative";
  return "neutral";
}
