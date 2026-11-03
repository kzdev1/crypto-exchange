"use client";

import { useState } from "react";
import Card from "./Card";
import CoinRow from "./CoinRow";
import { gainers, losers } from "./mock-data";
import { focusRing } from "../Navbar/navStyles";

const tabs = [
  { id: "gainers", label: "Altas", coins: gainers },
  { id: "losers", label: "Baixas", coins: losers },
];

export default function GainersLosersCard() {
  const [activeId, setActiveId] = useState("gainers");
  const activeTab = tabs.find((tab) => tab.id === activeId);

  return (
    <Card
      title="Maiores altas e baixas"
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
              className={`rounded px-2 py-1 text-xs font-medium ${focusRing} ${
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
