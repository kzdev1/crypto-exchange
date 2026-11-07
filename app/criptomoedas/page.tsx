import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container/Container";
import ErrorNotice from "@/components/ErrorNotice/ErrorNotice";
import RankingTable from "@/components/RankingTable/RankingTable";
import { SortNav, Pagination } from "@/components/RankingTable/RankingNav";
import {
  PAGE_SIZE,
  filterCoins,
  parsePage,
  parseSort,
  sortCoins,
  SORTS,
} from "@/components/RankingTable/ranking-options";
import { getMarkets } from "@/lib/api/coingecko";
import { cleanSearchText } from "@/lib/security/validate-input";

export const metadata: Metadata = {
  title: "Ranking de criptomoedas | Crypto Exchange",
  description:
    "Ranking das maiores criptomoedas por capitalização de mercado, com preço em reais, variação, volume e gráfico de 7 dias.",
};

type Props = {
  searchParams: Promise<{ ordem?: string; pagina?: string; busca?: string }>;
};

// Ranking completo. Ordem, página e busca vêm da URL (?busca=bit&ordem=alta&pagina=2).
// Usa a mesma lista de moedas da página inicial, então não gasta chamadas extras da API.
export default async function CriptomoedasPage({ searchParams }: Props) {
  const { ordem, pagina, busca } = await searchParams;
  const markets = await getMarkets();

  const sortId = parseSort(ordem);
  const sortLabel = SORTS.find((sort) => sort.id === sortId)?.label ?? "";

  // A busca passa pelo validador de segurança antes de ser usada.
  const query = cleanSearchText(busca);
  const hadInvalidSearch =
    typeof busca === "string" && busca.trim() !== "" && query === "";

  const filtered = markets.ok ? filterCoins(markets.data, query) : [];
  const sorted = sortCoins(filtered, sortId);
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const page = parsePage(pagina, totalPages);
  const start = (page - 1) * PAGE_SIZE;
  const coins = sorted.slice(start, start + PAGE_SIZE);

  return (
    <Container className="flex flex-col gap-6 py-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          {query ? `Resultados para “${query}”` : "Ranking de criptomoedas"}
        </h1>
        <p className="text-sm text-neutral-600">
          {query
            ? `${sorted.length} ${sorted.length === 1 ? "moeda encontrada" : "moedas encontradas"}, em reais, ordenadas por ${sortLabel.toLowerCase()}. A busca vale para as 250 maiores moedas.`
            : `Preços em reais, ordenados por ${sortLabel.toLowerCase()}.`}
        </p>
        {query && (
          <Link
            href="/criptomoedas"
            className="inline-block rounded-md text-sm text-neutral-700 underline hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
          >
            Limpar busca
          </Link>
        )}
        {hadInvalidSearch && (
          <p role="alert" className="text-sm text-red-700">
            <span aria-hidden="true">⚠ </span>
            Na busca, use apenas letras, números, espaços, pontos e hífens.
          </p>
        )}
        {markets.isExample && (
          <p className="text-xs text-neutral-600">
            Dados de exemplo: a chave da CoinGecko não está configurada neste
            ambiente.
          </p>
        )}
      </div>

      <SortNav activeSort={sortId} query={query} />

      {!markets.ok ? (
        <ErrorNotice
          kind={markets.error}
          title="Não foi possível carregar o ranking"
        />
      ) : sorted.length === 0 ? (
        <p className="text-sm text-neutral-700">
          Nenhuma moeda encontrada para “{query}”. Tente outro nome ou sigla.
        </p>
      ) : (
        <div>
          <RankingTable
            coins={coins}
            caption={`Ranking de criptomoedas${query ? ` para a busca ${query}` : ""}, por ${sortLabel.toLowerCase()}, posições ${start + 1} a ${start + coins.length} de ${sorted.length}, em reais`}
          />
          <Pagination sortId={sortId} page={page} totalPages={totalPages} query={query} />
        </div>
      )}
    </Container>
  );
}