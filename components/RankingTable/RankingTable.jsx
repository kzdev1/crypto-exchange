import CoinIcon from "../CoinIcon/CoinIcon";
import Variation from "../MarketOverview/Variation";
import Sparkline from "../CoinsTable/Sparkline";
import {
  formatBRL,
  formatCompactBRL,
  formatCompactNumber,
} from "../MarketOverview/format";
import { toneFromValue } from "../MarketOverview/tones";
import { focusRing } from "../Navbar/navStyles";

// Para adicionar ou remover uma coluna, edite esta lista e a linha em CoinRow abaixo.
const columns = [
  { id: "rank", label: "#", align: "left" },
  { id: "asset", label: "Ativo", align: "left" },
  { id: "price", label: "Preço", align: "right" },
  { id: "change24h", label: "24h", align: "right" },
  { id: "change7d", label: "7 dias", align: "right" },
  { id: "chart", label: "Últimos 7 dias", align: "right" },
  { id: "marketCap", label: "Capitalização", align: "right" },
  { id: "volume", label: "Volume 24h", align: "right" },
  { id: "supply", label: "Oferta circulante", align: "right" },
];

const alignClass = { left: "text-left", right: "text-right" };
const cell = "px-3 py-2";
const trendNames = { positive: "alta", negative: "queda", neutral: "estabilidade" };
const MISSING = "—";

function CoinRow({ coin }) {
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
      <td className={`${cell} text-right text-neutral-900`}>{formatBRL(coin.price)}</td>
      <td className={`${cell} text-right`}>
        <Variation value={coin.change24h} />
      </td>
      <td className={`${cell} text-right`}>
        {coin.change7d == null ? (
          <span className="text-neutral-600">{MISSING}</span>
        ) : (
          <Variation value={coin.change7d} />
        )}
      </td>
      <td className={cell}>
        <div className="flex justify-end">
          {hasChart && <Sparkline data={coin.sparkline} label={chartLabel} tone={trend} />}
        </div>
      </td>
      <td className={`${cell} text-right text-neutral-900`}>
        {formatCompactBRL(coin.marketCap)}
      </td>
      <td className={`${cell} text-right text-neutral-900`}>
        {formatCompactBRL(coin.volume24h)}
      </td>
      <td className={`${cell} text-right text-neutral-900`}>
        {coin.circulatingSupply == null
          ? MISSING
          : `${formatCompactNumber(coin.circulatingSupply)} ${coin.symbol}`}
      </td>
    </tr>
  );
}

// `coins`: moedas da página atual. `caption`: descrição para leitores de tela.
export default function RankingTable({ coins, caption }) {
  return (
    <div
      role="region"
      aria-label="Tabela do ranking de criptomoedas"
      tabIndex={0}
      className={`overflow-x-auto rounded-xl border border-neutral-200 ${focusRing}`}
    >
      <table className="w-full min-w-[1100px] border-collapse text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="border-b border-neutral-200 bg-neutral-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.id}
                scope="col"
                className={`px-3 py-2 text-xs font-medium text-neutral-600 ${alignClass[column.align]}`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <CoinRow key={coin.id} coin={coin} />
          ))}
        </tbody>
      </table>
    </div>
  );
}