import CoinTableRow from "./CoinTableRow";
import { coins } from "./mock-coins";
import { focusRing } from "../Navbar/navStyles";

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

export default function CoinsTable() {
  return (
    <section aria-labelledby="coins-table-title">
      <h2
        id="coins-table-title"
        className="text-xl font-semibold text-neutral-900"
      >
        Preços por capitalização de mercado
      </h2>

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
                  className={`px-3 py-3 text-xs font-medium text-neutral-600 ${
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
    </section>
  );
}
