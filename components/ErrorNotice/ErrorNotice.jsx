import RetryButton from "./RetryButton";
import { getErrorMessage } from "../../lib/api/errors";

// Aviso de erro padrão do site: ícone + texto (nunca só cor), mensagem clara
// sem detalhes técnicos e um botão para tentar de novo.
// `kind` é o tipo do erro vindo de lib/api (ex.: "network", "timeout").
export default function ErrorNotice({
  kind,
  title = "Não foi possível carregar os dados",
  showRetry = true,
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-2 rounded-lg border border-red-700 bg-red-50 p-3 text-sm"
    >
      <p className="font-semibold text-red-700">
        <span aria-hidden="true">⚠ </span>
        {title}
      </p>
      <p className="text-neutral-700">{getErrorMessage(kind)}</p>
      {showRetry && <RetryButton />}
    </div>
  );
}
