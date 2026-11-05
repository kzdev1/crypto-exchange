import type { Metadata } from "next";
import Container from "@/components/Container/Container";
import ErrorNotice from "@/components/ErrorNotice/ErrorNotice";
import RankingTable from "@/components/RankingTable/RankingTable";
import { SortNav, Pagination } from "@/components/RankingTable/RankingNav";
import {
  PAGE_SIZE,
  parsePage,
  parseSort,
  sortCoins,
  SORTS,
} from "@/components/RankingTable/ranking-options";
import { getMarkets } from "@/lib/api/coingecko";

export const metadata: Metadata = {
  title: "Ranking de criptomoedas | Crypto Exchange",
  description:
    "Ranking das maiores criptomoedas por capitalização de mercado, com preço em reais, variação, volume e gráfico de 7 dias.",
};

type Props = {
  searchParams: Promise<{ ordem?: string; pagina?: string }>;
};

// Ranking completo. A ordem e a página vêm da URL (?ordem=alta&pagina=2).
// Usa a mesma lista de moedas da página inicial, então não gasta chamadas extras da API.
export default async function CriptomoedasPage({ searchParams }: Props) {
  const { ordem, pagina } = await searchParams;
  const markets = await getMarkets();

  const sortId = parseSort(ordem);
  const sortLabel = SORTS.find((sort) => sort.id === sortId)?.label ?? "";

  const sorted = markets.ok ? sortCoins(markets.data, sortId) : [];
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const page = parsePage(pagina, totalPages);
  const start = (page - 1) * PAGE_SIZE;
  const coins = sorted.slice(start, start + PAGE_SIZE);

  return (
    <Container className="flex flex-col gap-6 py-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Ranking de criptomoedas
        </h1>
        <p className="text-sm text-neutral-600">
          Preços em reais, ordenados por {sortLabel.toLowerCase()}.
        </p>
        {markets.isExample && (
          <p className="text-xs text-neutral-600">
            Dados de exemplo: a chave da CoinGecko não está configurada neste
            ambiente.
          </p>
        )}
      </div>

      <SortNav activeSort={sortId} />

      {markets.ok ? (
        <div>
          <RankingTable
            coins={coins}
            caption={`Ranking de criptomoedas por ${sortLabel.toLowerCase()}, posições ${start + 1} a ${start + coins.length} de ${sorted.length}, em reais`}
          />
          <Pagination sortId={sortId} page={page} totalPages={totalPages} />
        </div>
      ) : (
        <ErrorNotice
          kind={markets.error}
          title="Não foi possível carregar o ranking"
        />
      )}
    </Container>
  );
}