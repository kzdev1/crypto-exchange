// Lê o valor digitado, aceitando os formatos comuns no Brasil e fora dele:
// "1234.56", "1234,56", "1.234,56" e "1,234.56". Devolve um número ou null se for inválido.
// Obs.: com um único separador ("1.234"), ele é tratado como casa decimal.
export function parseAmount(text) {
  const cleaned = String(text).trim().replace(/\s/g, "");

  let normalized = null;
  if (/^(\d+([.,]\d*)?|[.,]\d+)$/.test(cleaned)) {
    normalized = cleaned.replace(",", "."); // 1234,56 ou 1234.56
  } else if (/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(cleaned)) {
    normalized = cleaned.replaceAll(".", "").replace(",", "."); // 1.234,56
  } else if (/^\d{1,3}(,\d{3})+(\.\d+)?$/.test(cleaned)) {
    normalized = cleaned.replaceAll(",", ""); // 1,234.56
  }

  if (normalized === null) return null;
  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}