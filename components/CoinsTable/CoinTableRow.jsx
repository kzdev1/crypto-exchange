import CoinIcon from "../CoinIcon/CoinIcon";
import Variation from "../MarketOverview/Variation";
import { formatBRL, formatCompactBRL } from "../MarketOverview/format";
import { toneFromValue } from "../MarketOverview/tones";
import Sparkline from "./Sparkline";

const cell = "px-3 py-2";
const trendNames = { positive: "alta", negative: "queda", neutral: "estabilidade" };

// A ordem das células segue a ordem das colunas em CoinsTable.jsx.
export default function CoinTableRow({ coin }) {
  // Algumas moedas podem vir sem dados de gráfico; nesse caso o gráfico some.
  const hasChart = coin.sparkline.length > 1;
  const trend = hasChart
    ? toneFromValue(coin.sparkline.at(-1) - coin.sparkline[0])
    : "neutral";
  const chartLabel = `Gráfico dos últimos 7 dias de ${coin.name}, tendência de ${trendNames[trend]}`;

  return (
    <tr className="border-b border-neutral-200 last:border-b-0 hover:bg-neutral-50">
      <td className={`${cell} text-neutral-600`}>{coin.rank}</td>
      <th scope="row" className={`${cell} text-left font-normal`}>
        <span className="flex items-center gap-2">
          <CoinIcon src={coin.image} symbol={coin.symbol} />
          <span>
            <span className="font-semibold text-neutral-900">{coin.name}</span>{" "}
            <span className="text-neutral-600">{coin.symbol}</span>
          </span>
        </span>
      </th>
      <td className={`${cell} text-right text-neutral-900`}>
        {formatBRL(coin.price)}
      </td>
      <td className={`${cell} text-right`}>
        <Variation value={coin.change24h} />
      </td>
      <td className={cell}>
        <div className="flex justify-end">
          {hasChart && (
            <Sparkline data={coin.sparkline} label={chartLabel} tone={trend} />
          )}
        </div>
      </td>
      <td className={`${cell} text-right text-neutral-900`}>
        {formatCompactBRL(coin.marketCap)}
      </td>
      <td className={`${cell} text-right text-neutral-900`}>
        {formatCompactBRL(coin.volume24h)}
      </td>
    </tr>
  );
}