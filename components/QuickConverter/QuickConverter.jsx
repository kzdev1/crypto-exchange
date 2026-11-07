"use client";

import { useState } from "react";
import ErrorNotice from "../ErrorNotice/ErrorNotice";
import { formatBRL } from "../MarketOverview/format";
import { focusRing } from "../Navbar/navStyles";
import { parseAmount } from "./parse-amount";

const TOP_COINS = 10; // as maiores aparecem primeiro na lista
const MAX_AMOUNT = 1e15;

const labelStyle = "mb-1 block text-xs text-neutral-600";
const fieldStyle = `w-full rounded-md border border-neutral-500 bg-white px-3 py-2 text-sm text-neutral-900 ${focusRing}`;
const boxStyle = "rounded-xl border border-neutral-200 bg-white p-3";

const coinAmount = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 8 });

// Converte entre uma criptomoeda e reais, nos dois sentidos.
// `coins`: lista de { id, name, symbol, price } (da maior para a menor). `errorKind`: erro da API, se houve.
export default function QuickConverter({ coins, errorKind }) {
  const [amount, setAmount] = useState("1");
  const [coinId, setCoinId] = useState(coins[0]?.id ?? "");
  const [direction, setDirection] = useState("coin-to-brl"); // ou "brl-to-coin"

  if (errorKind || coins.length === 0) {
    return (
      <section aria-labelledby="converter-title" className={boxStyle}>
        <h2 id="converter-title" className="mb-2 text-sm font-semibold text-neutral-900">
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
  const topCoins = coins.slice(0, TOP_COINS);
  const otherCoins = coins
    .slice(TOP_COINS)
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

  const isCoinToBrl = direction === "coin-to-brl";
  const parsed = parseAmount(amount);
  const isTooBig = parsed !== null && parsed > MAX_AMOUNT;
  const isValid = parsed !== null && !isTooBig;

  let result;
  if (isTooBig) result = "Valor muito grande";
  else if (!isValid) result = "Digite um número válido";
  else if (isCoinToBrl) result = formatBRL(parsed * coin.price);
  else result = `${coinAmount.format(parsed / coin.price)} ${coin.symbol}`;

  const renderOption = (item) => (
    <option key={item.id} value={item.id}>
      {item.name} ({item.symbol})
    </option>
  );

  return (
    <section aria-labelledby="converter-title" className={boxStyle}>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <h2 id="converter-title" className="text-sm font-semibold text-neutral-900">
          Conversor rápido
        </h2>
        <p className="flex flex-wrap gap-x-3 text-xs text-neutral-600">
          <span>
            1 {coin.symbol} = {formatBRL(coin.price)}
          </span>
          <span>Cotações atualizadas a cada 10 minutos</span>
        </p>
      </div>

      <div className="mt-3 grid items-end gap-3 sm:grid-cols-[1fr_1fr_auto_1fr]">
        <div>
          <label htmlFor="converter-amount" className={labelStyle}>
            {isCoinToBrl ? `Quantidade de ${coin.symbol}` : "Valor em reais (R$)"}
          </label>
          <input
            id="converter-amount"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={amount}
            aria-invalid={!isValid}
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
            <optgroup label="Principais">{topCoins.map(renderOption)}</optgroup>
            {otherCoins.length > 0 && (
              <optgroup label="Outras moedas">{otherCoins.map(renderOption)}</optgroup>
            )}
          </select>
        </div>

        <button
          type="button"
          onClick={() => setDirection(isCoinToBrl ? "brl-to-coin" : "coin-to-brl")}
          className={`rounded-md border border-neutral-500 bg-white px-3 py-2 text-sm font-medium text-neutral-900 hover:border-neutral-900 ${focusRing}`}
        >
          <span aria-hidden="true">⇄ </span>
          Inverter
          <span className="sr-only">
            {isCoinToBrl
              ? " (agora de moeda para reais)"
              : " (agora de reais para moeda)"}
          </span>
        </button>

        <div>
          <p className={labelStyle}>
            {isCoinToBrl ? "Equivale a (em reais)" : `Equivale a (em ${coin.symbol})`}
          </p>
          <output
            htmlFor="converter-amount converter-coin"
            className="block py-2 text-sm font-semibold text-neutral-900"
          >
            {result}
          </output>
        </div>
      </div>
    </section>
  );
}