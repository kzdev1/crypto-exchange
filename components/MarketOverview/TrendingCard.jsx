"use client";

import { useEffect, useState } from "react";
import Card from "./Card";
import CoinRow from "./CoinRow";
import { trendingCoins } from "./mock-data";
import { focusRing } from "../Navbar/navStyles";

const PAGE_SIZE = 5;
const ROTATE_EVERY_MS = 8000;
const totalPages = Math.ceil(trendingCoins.length / PAGE_SIZE);

const arrowButton = `rounded-md px-2 py-1 text-neutral-600 hover:text-neutral-900 ${focusRing}`;

export default function TrendingCard() {
  const [page, setPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Troca de página sozinho. Pausa com mouse/foco no card e respeita
  // a preferência do sistema por menos movimento.
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (isPaused || reduceMotion) return;

    const timer = setInterval(() => {
      setPage((current) => (current + 1) % totalPages);
    }, ROTATE_EVERY_MS);
    return () => clearInterval(timer);
  }, [isPaused, page]);

  function goToPrevious() {
    setPage((current) => (current - 1 + totalPages) % totalPages);
  }

  function goToNext() {
    setPage((current) => (current + 1) % totalPages);
  }

  const start = page * PAGE_SIZE;
  const visibleCoins = trendingCoins.slice(start, start + PAGE_SIZE);

  return (
    <Card
      title="Moedas em alta"
      headingId="trending-title"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      action={
        <div className="flex items-center text-sm text-neutral-600">
          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Moedas anteriores"
            className={arrowButton}
          >
            <span aria-hidden="true">‹</span>
          </button>
          <span>
            {page + 1}/{totalPages}
          </span>
          <button
            type="button"
            onClick={goToNext}
            aria-label="Próximas moedas"
            className={arrowButton}
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      }
    >
      <ol>
        {visibleCoins.map((coin, index) => (
          <CoinRow key={coin.id} rank={start + index + 1} coin={coin} />
        ))}
      </ol>
    </Card>
  );
}
