import { formatPercent } from "./format";
import { toneFromValue, toneText } from "./tones";
import CoinIcon from "../CoinIcon/CoinIcon";

const symbols = { positive: "▲", negative: "▼", neutral: "–" };
const descriptions = {
  positive: "alta de",
  negative: "queda de",
  neutral: "variação de",
};

// Variação em %, com cor E seta/texto (a cor nunca é o único sinal).
export default function Variation({ value }) {
  const tone = toneFromValue(value);

  return (
    <span className={`whitespace-nowrap text-sm font-medium ${toneText[tone]}`}>
      <span aria-hidden="true">{symbols[tone]}</span>{" "}
      <span className="sr-only">{descriptions[tone]}</span>
      {formatPercent(Math.abs(value))}
    </span>
  );
}
