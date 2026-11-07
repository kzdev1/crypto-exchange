import Link from "next/link";
import CoinTableRow from "./CoinTableRow";
import ErrorNotice from "../ErrorNotice/ErrorNotice";
import { focusRing } from "../Navbar/navStyles";

// Quantas moedas aparecem na página inicial. O ranking completo fica em /criptomoedas.
const VISIBLE_ROWS = 10;

// Para adicionar ou remover uma coluna, edite esta lista
// e a linha correspondente em CoinTableRow.jsx.
const columns = [
  { id: "rank", label: "#", align: "left" },
  { id: "asset", label: "Ativo", align: "left" },
  { id: "price", label: "Preço", align: "right" },
  { id: "change", label: "Variação 24h", align: "right" },
  { id: "chart", label: "Últimos 7 dias", align: "right" },
  { id: "marketCap", label: "Capitalização", align: "right" },
  { id: "volume", label: "Volume 24h", align: "right" },
];

const alignClass = { left: "text-left", right: "text-right" };

// `markets` é o resultado de getMarkets(): { ok, data } ou { ok: false, error }.
export default function CoinsTable({ markets }) {
  return (
    <section aria-labelledby="coins-table-title">
      <h2
        id="coins-table-title"
        className="text-xl font-semibold text-neutral-900"
      >
        Preços por capitalização de mercado
      </h2>

      {markets.ok ? (
        <TableContent coins={markets.data.slice(0, VISIBLE_ROWS)} />
      ) : (
        <div className="mt-4">
          <ErrorNotice
            kind={markets.error}
            title="Não foi possível carregar os preços"
          />
        </div>
      )}
    </section>
  );
}

function TableContent({ coins }) {
  return (
    <>
      <div
        role="region"
        aria-labelledby="coins-table-title"
        tabIndex={0}
        className={`mt-4 overflow-x-auto rounded-xl border border-neutral-200 ${focusRing}`}
      >
        <table className="w-full min-w-[820px] border-collapse text-sm">
          <caption className="sr-only">
            Ranking das {coins.length} maiores criptomoedas por capitalização de
            mercado, em reais
          </caption>
          <thead className="border-b border-neutral-200 bg-neutral-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.id}
                  scope="col"
                  className={`px-3 py-2 text-xs font-medium text-neutral-600 ${
                    alignClass[column.align]
                  }`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <CoinTableRow key={coin.id} coin={coin} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center">
        <Link
          href="/criptomoedas"
          className={`rounded-md bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-200 ${focusRing}`}
        >
          Ver todas as criptomoedas
        </Link>
      </div>
    </>
  );
}
