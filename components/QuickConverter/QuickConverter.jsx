"use client";

import { useState } from "react";
import ErrorNotice from "../ErrorNotice/ErrorNotice";
import { formatBRL } from "../MarketOverview/format";
import { focusRing } from "../Navbar/navStyles";

const labelStyle = "mb-1 block text-xs text-neutral-600";
const fieldStyle = `w-full rounded-md border border-neutral-500 bg-white px-3 py-2 text-sm text-neutral-900 ${focusRing}`;
const boxStyle = "rounded-xl border border-neutral-200 bg-white p-3";

// Converte uma quantidade de uma criptomoeda para reais.
// `coins`: lista de { id, name, symbol, price }. `errorKind`: tipo do erro, se a API falhou.
export default function QuickConverter({ coins, errorKind }) {
  const [amount, setAmount] = useState("1");
  const [coinId, setCoinId] = useState(coins[0]?.id ?? "");

  if (errorKind || coins.length === 0) {
    return (
      <section aria-labelledby="converter-title" className={boxStyle}>
        <h2
          id="converter-title"
          className="mb-2 text-sm font-semibold text-neutral-900"
        >
          Conversor rápido
        </h2>
        <ErrorNotice
          kind={errorKind ?? "invalid-data"}
          title="Conversor indisponível no momento"
        />
      </section>
    );
  }

  const coin = coins.find((item) => item.id === coinId) ?? coins[0];
  const parsedAmount = Number(amount.replace(",", "."));
  const isValid =
    amount.trim() !== "" && Number.isFinite(parsedAmount) && parsedAmount >= 0;

  return (
    <section aria-labelledby="converter-title" className={boxStyle}>
      <div className="grid items-end gap-3 sm:grid-cols-3 lg:grid-cols-[auto_1fr_1fr_1fr] lg:gap-6">
        <h2
          id="converter-title"
          className="text-sm font-semibold text-neutral-900 sm:col-span-3 lg:col-span-1 lg:self-center"
        >
          Conversor rápido
        </h2>

        <div>
          <label htmlFor="converter-amount" className={labelStyle}>
            Quantidade
          </label>
          <input
            id="converter-amount"
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className={fieldStyle}
          />
        </div>

        <div>
          <label htmlFor="converter-coin" className={labelStyle}>
            Moeda
          </label>
          <select
            id="converter-coin"
            value={coin.id}
            onChange={(event) => setCoinId(event.target.value)}
            className={fieldStyle}
          >
            {coins.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} ({item.symbol})
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className={labelStyle}>Equivale a</p>
          <output
            htmlFor="converter-amount converter-coin"
            className="block py-2 text-sm font-semibold text-neutral-900"
          >
            {isValid
              ? formatBRL(parsedAmount * coin.price)
              : "Digite um número válido"}
          </output>
        </div>
      </div>
    </section>
  );
}
