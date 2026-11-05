"use client";

import { useState } from "react";
import ErrorNotice from "../ErrorNotice/ErrorNotice";
import Variation from "../MarketOverview/Variation";
import Sparkline from "../CoinsTable/Sparkline";
import {
  formatBRL,
  formatCompactBRL,
  formatCompactNumber,
} from "../MarketOverview/format";
import { toneFromValue } from "../MarketOverview/tones";
import { focusRing } from "../Navbar/navStyles";

const MISSING = "—";
const NONE = "";
const SLOT_LABELS = ["Moeda 1", "Moeda 2", "Moeda 3 (opcional)"];

const boxStyle = "rounded-xl border border-neutral-200 bg-white p-3";
const labelStyle = "mb-1 block text-xs text-neutral-600";
const fieldStyle = `w-full rounded-md border border-neutral-500 bg-white px-3 py-2 text-sm text-neutral-900 ${focusRing}`;

function ChartCell({ coin }) {
  if (coin.sparkline.length < 2) return MISSING;
  const trend = toneFromValue(coin.sparkline.at(-1) - coin.sparkline[0]);
  return (
    <div className="flex justify-end">
      <Sparkline
        data={coin.sparkline}
        label={`Gráfico dos últimos 7 dias de ${coin.name}`}
        tone={trend}
      />
    </div>
  );
}

// Linhas da comparação. Para incluir um indicador novo, adicione um item aqui.
const rows = [
  { id: "price", label: "Preço", render: (c) => formatBRL(c.price) },
  { id: "change24h", label: "Variação 24h", render: (c) => <Variation value={c.change24h} /> },
  {
    id: "change7d",
    label: "Variação 7 dias",
    render: (c) => (c.change7d == null ? MISSING : <Variation value={c.change7d} />),
  },
  { id: "marketCap", label: "Capitalização", render: (c) => formatCompactBRL(c.marketCap) },
  { id: "volume", label: "Volume 24h", render: (c) => formatCompactBRL(c.volume24h) },
  {
    id: "supply",
    label: "Oferta circulante",
    render: (c) =>
      c.circulatingSupply == null
        ? MISSING
        : `${formatCompactNumber(c.circulatingSupply)} ${c.symbol}`,
  },
  { id: "chart", label: "Últimos 7 dias", render: (c) => <ChartCell coin={c} /> },
];

// Compara de 2 a 3 moedas lado a lado.
// `coins`: moedas com todos os indicadores. `errorKind`: erro da API, se houve.
export default function CompareTool({ coins, errorKind }) {
  const [ids, setIds] = useState([coins[0]?.id ?? NONE, coins[1]?.id ?? NONE, NONE]);

  if (errorKind || coins.length < 2) {
    return (
      <section aria-labelledby="compare-title" className={boxStyle}>
        <h2 id="compare-title" className="mb-2 text-sm font-semibold text-neutral-900">
          Comparar moedas
        </h2>
        <ErrorNotice
          kind={errorKind ?? "invalid-data"}
          title="Comparação indisponível no momento"
        />
      </section>
    );
  }

  const selected = ids.map((id) => coins.find((coin) => coin.id === id)).filter(Boolean);

  const handleChange = (index, value) =>
    setIds((current) => current.map((id, i) => (i === index ? value : id)));

  return (
    <section aria-labelledby="compare-title" className={boxStyle}>
      <h2 id="compare-title" className="text-sm font-semibold text-neutral-900">
        Comparar moedas
      </h2>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {SLOT_LABELS.map((label, index) => (
          <div key={label}>
            <label htmlFor={`compare-${index}`} className={labelStyle}>
              {label}
            </label>
            <select
              id={`compare-${index}`}
              value={ids[index]}
              onChange={(event) => handleChange(index, event.target.value)}
              className={fieldStyle}
            >
              {index === 2 && <option value={NONE}>Nenhuma</option>}
              {coins.map((coin) => (
                <option
                  key={coin.id}
                  value={coin.id}
                  disabled={ids.some((id, i) => i !== index && id === coin.id)}
                >
                  {coin.name} ({coin.symbol})
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div
        role="region"
        aria-label="Comparação das moedas escolhidas"
        tabIndex={0}
        className={`mt-3 overflow-x-auto rounded-lg border border-neutral-200 ${focusRing}`}
      >
        <table className="w-full min-w-[480px] border-collapse text-sm">
          <caption className="sr-only">
            Comparação entre {selected.map((coin) => coin.name).join(", ")}
          </caption>
          <thead className="border-b border-neutral-200 bg-neutral-50">
            <tr>
              <th scope="col" className="px-3 py-2 text-left">
                <span className="sr-only">Indicador</span>
              </th>
              {selected.map((coin) => (
                <th key={coin.id} scope="col" className="px-3 py-2 text-right text-neutral-900">
                  {coin.name} <span className="font-normal text-neutral-600">{coin.symbol}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-neutral-200 last:border-b-0">
                <th scope="row" className="px-3 py-2 text-left text-xs font-medium text-neutral-600">
                  {row.label}
                </th>
                {selected.map((coin) => (
                  <td key={coin.id} className="px-3 py-2 text-right text-neutral-900">
                    {row.render(coin)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}