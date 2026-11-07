// Erros previsíveis das APIs e as mensagens mostradas ao visitante.
// As mensagens são genéricas de propósito: nunca expõem URL, chave ou
// detalhes internos do servidor.

export class ApiError extends Error {
  // kind: "network" | "timeout" | "rate-limit" | "http" | "invalid-data" | "missing-key"
  constructor(kind, status) {
    super(kind);
    this.name = "ApiError";
    this.kind = kind;
    this.status = status;
  }
}

const messages = {
  network:
    "Não foi possível conectar ao serviço de dados. Verifique sua internet e tente novamente.",
  timeout:
    "O serviço de dados demorou para responder. Tente novamente em instantes.",
  "rate-limit":
    "Muitas consultas ao serviço de dados no momento. Tente novamente em alguns minutos.",
  http: "O serviço de dados está indisponível agora. Tente novamente em instantes.",
  "invalid-data":
    "Recebemos uma resposta inesperada do serviço de dados. Tente novamente em instantes.",
};

// "missing-key" e qualquer erro desconhecido usam a mensagem de indisponibilidade,
// para não revelar detalhes de configuração ao visitante.
export function getErrorMessage(kind) {
  return messages[kind] ?? messages.http;
}
