import Variation from "./Variation";
import { formatBRL } from "./format";

// Uma linha de moeda, usada nos cards de moedas em alta e de altas e baixas.
export default function CoinRow({ rank, coin }) {
  return (
    <li className="flex items-center justify-between gap-2 py-2 text-sm">
      <span className="flex items-center gap-2">
        <span className="w-4 text-neutral-600">{rank}</span>
        <span className="font-semibold text-neutral-900">{coin.symbol}</span>
        <span className="sr-only">{coin.name}</span>
      </span>
      <span className="flex items-center gap-3">
        <span className="text-neutral-900">{formatBRL(coin.price)}</span>
        <span className="w-20 text-right">
          <Variation value={coin.change} />
        </span>
      </span>
    </li>
  );
}
