import { formatPercent } from "./format";

// Mostra a variação com seta e texto, não só com cor.
export default function Variation({ value }) {
  const isUp = value >= 0;

  return (
    <span className="whitespace-nowrap text-sm font-medium text-neutral-900">
      <span aria-hidden="true">{isUp ? "▲" : "▼"}</span>{" "}
      <span className="sr-only">{isUp ? "alta de" : "queda de"}</span>
      {formatPercent(Math.abs(value))}
    </span>
  );
}
