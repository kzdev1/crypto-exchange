import Container from "@/components/Container/Container";
import MarketOverview from "@/components/MarketOverview/MarketOverview";
import QuickConverter from "@/components/QuickConverter/QuickConverter";
import CoinsTable from "@/components/CoinsTable/CoinsTable";
import NewsSection from "@/components/NewsSection/NewsSection";
import { getMarkets } from "@/lib/api/coingecko";
import { getNews } from "@/lib/api/news";

// A página é regerada no máximo a cada 60 segundos. Os dados da API ficam
// guardados por mais tempo no servidor (veja lib/api/coingecko.js), então
// isso não gasta chamadas extras e um erro não fica preso por muito tempo.
export const revalidate = 60;

export default async function Home() {
  const [markets, news] = await Promise.all([getMarkets(), getNews()]);

  // O conversor só precisa destes 4 campos de cada moeda.
  const converterCoins = markets.ok
    ? markets.data.map(
        (coin: { id: string; name: string; symbol: string; price: number }) => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          price: coin.price,
        })
      )
    : [];

  return (
    <Container className="flex flex-col gap-10 py-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Preços de criptomoedas hoje
        </h1>
        {markets.isExample && (
          <p className="text-xs text-neutral-600">
            Dados de exemplo: a chave da CoinGecko não está configurada neste
            ambiente.
          </p>
        )}
        <MarketOverview markets={markets} news={news} />
      </div>
      <div id="conversor" className="scroll-mt-4">
        <QuickConverter
          coins={converterCoins}
          errorKind={markets.ok ? null : markets.error}
        />
      </div>
      <CoinsTable markets={markets} />
      <NewsSection news={news} />
    </Container>
  );
}