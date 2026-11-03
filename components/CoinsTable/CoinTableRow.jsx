import Variation from "../MarketOverview/Variation";
import { formatBRL, formatCompactBRL } from "../MarketOverview/format";
import Sparkline from "./Sparkline";

const cell = "px-3 py-3";

// A ordem das células segue a ordem das colunas em CoinsTable.jsx.
export default function CoinTableRow({ coin }) {
  const isUp = coin.sparkline.at(-1) >= coin.sparkline[0];
  const chartLabel = `Gráfico dos últimos 7 dias de ${coin.name}, tendência de ${
    isUp ? "alta" : "queda"
  }`;

  return (
    <tr className="border-b border-neutral-200 last:border-b-0 hover:bg-neutral-50">
      <td className={`${cell} text-neutral-600`}>{coin.rank}</td>
      <th scope="row" className={`${cell} text-left font-normal`}>
        <span className="font-semibold text-neutral-900">{coin.name}</span>{" "}
        <span className="text-neutral-600">{coin.symbol}</span>
      </th>
      <td className={`${cell} text-right text-neutral-900`}>
        {formatBRL(coin.price)}
      </td>
      <td className={`${cell} text-right`}>
        <Variation value={coin.change24h} />
      </td>
      <td className={cell}>
        <div className="flex justify-end">
          <Sparkline data={coin.sparkline} label={chartLabel} />
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
