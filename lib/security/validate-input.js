// Validação de texto digitado pelo visitante (ex.: busca).
// Regra: aceitar só o que é esperado (letras, números, espaço, ponto e hífen) e descartar
// todo o resto, em vez de tentar "limpar" caracteres perigosos. Assim, aspas, <, >, ;, = e
// outros símbolos usados em injeção de SQL ou de HTML nunca passam.
const MAX_SEARCH_LENGTH = 50;
const ALLOWED = /^[\p{L}\p{N} .\-]+$/u;

// Devolve o texto limpo ou "" se for vazio ou tiver caracteres não permitidos.
export function cleanSearchText(value) {
  if (typeof value !== "string") return "";

  const text = value
    .normalize("NFC")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_SEARCH_LENGTH);

  return ALLOWED.test(text) ? text : "";
}