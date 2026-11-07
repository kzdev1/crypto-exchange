import TrendingCard from "./TrendingCard";
import GainersLossersCard from "./GainersLossersCard";
import NewsCard from "./NewsCard";
import { getTrending, pickGainersAndLosers } from "../../lib/api/coingecko";

const ROWS_PER_CARD = 3;

// Os cards de moedas usam o formato { id, symbol, name, price, change }.
const toRowCoin = (coin) => ({
  id: coin.id,
  symbol: coin.symbol,
  name: coin.name,
  price: coin.price,
  image: coin.image,
  change: coin.change24h,
});

// Faixa de cards compactos: 1 coluna no celular, 2 no tablet, 3 no desktop.
// `markets` é o resultado de getMarkets() e `news`, o de getNews().
export default async function MarketOverview({ markets, news }) {
  const trending = await getTrending(markets);

  const picked = markets.ok
    ? pickGainersAndLosers(markets.data, ROWS_PER_CARD)
    : { gainers: [], losers: [] };
  const gainers = picked.gainers.map(toRowCoin);
  const losers = picked.losers.map(toRowCoin);

  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      <TrendingCard
        coins={trending.ok ? trending.data : []}
        errorKind={trending.ok ? null : trending.error}
      />
      <GainersLossersCard
        gainers={gainers}
        losers={losers}
        errorKind={markets.ok ? null : markets.error}
      />
      <NewsCard
        news={news.ok ? news.data : []}
        errorKind={news.ok ? null : news.error}
      />
    </div>
  );
}