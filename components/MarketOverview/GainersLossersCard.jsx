"use client";

import { useState } from "react";
import Card from "./Card";
import CoinRow from "./CoinRow";
import ErrorNotice from "../ErrorNotice/ErrorNotice";
import { focusRing } from "../Navbar/navStyles";

const TITLE = "Maiores altas e baixas";

export default function GainersLossersCard({ gainers, losers, errorKind }) {
  const [activeId, setActiveId] = useState("gainers");

  if (errorKind) {
    return (
      <Card title={TITLE} headingId="gainers-losers-title">
        <ErrorNotice kind={errorKind} title="Não foi possível carregar" />
      </Card>
    );
  }

  const tabs = [
    { id: "gainers", label: "Altas", coins: gainers },
    { id: "losers", label: "Baixas", coins: losers },
  ];
  const activeTab = tabs.find((tab) => tab.id === activeId);

  return (
    <Card
      title={TITLE}
      headingId="gainers-losers-title"
      action={
        <div
          role="group"
          aria-label="Alternar entre altas e baixas"
          className="flex rounded-md border border-neutral-200 p-0.5"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              aria-pressed={tab.id === activeId}
              onClick={() => setActiveId(tab.id)}
              className={`rounded px-2 py-0.5 text-xs font-medium ${focusRing} ${
                tab.id === activeId
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      }
    >
      <ol>
        {activeTab.coins.map((coin, index) => (
          <CoinRow key={coin.id} rank={index + 1} coin={coin} />
        ))}
      </ol>
    </Card>
  );
}
