"use client";

import { useEffect, useReducer, useState, useSyncExternalStore } from "react";
import Card from "./Card";
import CoinRow from "./CoinRow";
import ErrorNotice from "../ErrorNotice/ErrorNotice";
import { focusRing } from "../Navbar/navStyles";

const TITLE = "Moedas em alta";
const PAGE_SIZE = 3;
const MAX_PAGES = 3;
const ROTATE_EVERY_SECONDS = 8;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const arrowButton = `rounded-md px-2 py-0.5 text-neutral-600 hover:text-neutral-900 ${focusRing}`;

// Estado da página e dos segundos já passados desde a última troca.
function reducer(state, action) {
  switch (action.type) {
    case "tick": {
      const elapsed = state.elapsed + 1;
      return elapsed >= ROTATE_EVERY_SECONDS
        ? { page: (state.page + 1) % action.totalPages, elapsed: 0 }
        : { ...state, elapsed };
    }
    case "next":
      return { page: (state.page + 1) % action.totalPages, elapsed: 0 };
    case "previous":
      return {
        page: (state.page - 1 + action.totalPages) % action.totalPages,
        elapsed: 0,
      };
    default:
      return state;
  }
}

// Lê a preferência do sistema por menos movimento.
function subscribeToReducedMotion(callback) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

const getReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;

const RADIUS = 8;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Anel que vai esvaziando até a próxima troca de página.
function CountdownRing({ elapsed }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 -rotate-90">
      <circle
        cx="10"
        cy="10"
        r={RADIUS}
        fill="none"
        strokeWidth="2"
        className="stroke-neutral-200"
      />
      <circle
        cx="10"
        cy="10"
        r={RADIUS}
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={CIRCUMFERENCE * (elapsed / ROTATE_EVERY_SECONDS)}
        className="stroke-neutral-900"
      />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-neutral-900">
      <rect x="5" y="4" width="3.5" height="12" rx="1" />
      <rect x="11.5" y="4" width="3.5" height="12" rx="1" />
    </svg>
  );
}

// `coins`: lista de { id, symbol, name, price, change }. `errorKind`: tipo do erro, se a API falhou.
export default function TrendingCard({ coins, errorKind }) {
  const [state, dispatch] = useReducer(reducer, { page: 0, elapsed: 0 });
  const [isPaused, setIsPaused] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    () => false
  );

  const shownCoins = coins.slice(0, PAGE_SIZE * MAX_PAGES);
  const totalPages = Math.max(1, Math.ceil(shownCoins.length / PAGE_SIZE));
  const canRotate = totalPages > 1;
  const page = state.page % totalPages;

  // A cada segundo, avança a contagem. Pausa com mouse/foco no card
  // e não roda para quem pede menos movimento.
  useEffect(() => {
    if (isPaused || reducedMotion || !canRotate) return;
    const timer = setInterval(() => dispatch({ type: "tick", totalPages }), 1000);
    return () => clearInterval(timer);
  }, [isPaused, reducedMotion, canRotate, totalPages]);

  if (errorKind || shownCoins.length === 0) {
    return (
      <Card title={TITLE} headingId="trending-title">
        <ErrorNotice
          kind={errorKind ?? "invalid-data"}
          title="Não foi possível carregar"
        />
      </Card>
    );
  }

  const start = page * PAGE_SIZE;
  const visibleCoins = shownCoins.slice(start, start + PAGE_SIZE);

  return (
    <Card
      title={TITLE}
      headingId="trending-title"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      action={
        canRotate && (
          <div className="flex items-center text-xs text-neutral-600">
            <button
              type="button"
              onClick={() => dispatch({ type: "previous", totalPages })}
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
              onClick={() => dispatch({ type: "next", totalPages })}
              aria-label="Próximas moedas"
              className={arrowButton}
            >
              <span aria-hidden="true">›</span>
            </button>
          </div>
        )
      }
    >
      <ol>
        {visibleCoins.map((coin, index) => (
          <CoinRow key={coin.id} rank={start + index + 1} coin={coin} />
        ))}
      </ol>

      {canRotate && !reducedMotion && (
        <p className="mt-1 flex items-center gap-1.5 text-xs text-neutral-600">
          {isPaused ? <PauseIcon /> : <CountdownRing elapsed={state.elapsed} />}
          <span aria-hidden="true">
            {isPaused
              ? "Pausado"
              : `Troca em ${ROTATE_EVERY_SECONDS - state.elapsed}s`}
          </span>
          <span className="sr-only">
            Troca de página a cada {ROTATE_EVERY_SECONDS} segundos.
          </span>
        </p>
      )}
    </Card>
  );
}
