"use client";

import { useState } from "react";
import NewsArticleCard from "./NewsArticleCard";
import ErrorNotice from "../ErrorNotice/ErrorNotice";
import { focusRing } from "../Navbar/navStyles";

// Para mudar as abas, edite esta lista (os nomes devem existir em lib/api/news-sources.js).
const CATEGORIES = ["Todas", "Mercado", "Regulação", "Brasil"];
const ITEMS_PER_VIEW = 8;

// `news` é o resultado de getNews(): { ok, data } ou { ok: false, error }.
export default function NewsSection({ news }) {
  const [activeCategory, setActiveCategory] = useState("Todas");

  const visibleNews = news.ok
    ? news.data
        .filter(
          (item) =>
            activeCategory === "Todas" || item.categories.includes(activeCategory)
        )
        .slice(0, ITEMS_PER_VIEW)
    : [];

  return (
    <section id="noticias" aria-labelledby="news-section-title" className="scroll-mt-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="news-section-title" className="text-xl font-semibold text-neutral-900">
          Últimas notícias de cripto
        </h2>

        {news.ok && (
          <div
            role="group"
            aria-label="Filtrar notícias por assunto"
            className="flex flex-wrap gap-2"
          >
            {CATEGORIES.map((category) => {
              const isActive = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-md border px-3 py-1.5 text-sm font-medium ${focusRing} ${
                    isActive
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-neutral-500 text-neutral-700 hover:border-neutral-900 hover:text-neutral-900"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {!news.ok ? (
        <div className="mt-4">
          <ErrorNotice kind={news.error} title="Não foi possível carregar as notícias" />
        </div>
      ) : (
        <>
          {/* Avisa leitores de tela quando o filtro muda a lista. */}
          <p className="sr-only" aria-live="polite">
            {visibleNews.length} notícias exibidas
          </p>

          {visibleNews.length > 0 ? (
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {visibleNews.map((item) => (
                <li key={item.id} className="flex">
                  <NewsArticleCard news={item} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-neutral-600">
              Nenhuma notícia neste assunto por enquanto.
            </p>
          )}
        </>
      )}
    </section>
  );
}
