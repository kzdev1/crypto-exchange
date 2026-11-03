"use client";

import { useState } from "react";
import Link from "next/link";
import NewsArticleCard from "./NewsArticleCard";
import { newsCategories, newsItems } from "./mock-news";
import { focusRing } from "../Navbar/navStyles";

export default function NewsSection() {
  const [activeCategory, setActiveCategory] = useState("Todas");

  const visibleNews =
    activeCategory === "Todas"
      ? newsItems
      : newsItems.filter((news) => news.category === activeCategory);

  return (
    <section aria-labelledby="news-section-title">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2
          id="news-section-title"
          className="text-xl font-semibold text-neutral-900"
        >
          Últimas notícias de cripto
        </h2>

        <div
          role="group"
          aria-label="Filtrar notícias por assunto"
          className="flex flex-wrap gap-2"
        >
          {newsCategories.map((category) => {
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
      </div>

      {/* Avisa leitores de tela quando o filtro muda a lista. */}
      <p className="sr-only" aria-live="polite">
        {visibleNews.length} notícias exibidas
      </p>

      {visibleNews.length > 0 ? (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visibleNews.map((news) => (
            <li key={news.id} className="flex">
              <NewsArticleCard news={news} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 text-sm text-neutral-600">
          Nenhuma notícia neste assunto por enquanto.
        </p>
      )}

      <div className="mt-8 flex justify-center">
        <Link
          href="/noticias"
          className={`rounded-md bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-200 ${focusRing}`}
        >
          Ver mais notícias
        </Link>
      </div>
    </section>
  );
}
