import TrendingCard from "./TrendingCard";
import GainersLosersCard from "./GainersLosersCard";
import NewsCard from "./NewsCard";

// Faixa de cards abaixo da navbar: 1 coluna no celular, 2 no tablet, 4 no desktop.
export default function MarketOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <TrendingCard />
      <GainersLosersCard />
      <NewsCard />
    </div>
  );
}
