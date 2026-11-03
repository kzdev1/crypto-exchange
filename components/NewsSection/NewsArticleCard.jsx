import Link from "next/link";
import { focusRing } from "../Navbar/navStyles";

// Card de uma notícia. O card inteiro é clicável pelo link do título.
export default function NewsArticleCard({ news }) {
  return (
    <article className="relative flex w-full flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-3 transition hover:border-neutral-900 hover:ring-1 hover:ring-neutral-900 focus-within:border-neutral-900 focus-within:ring-1 focus-within:ring-neutral-900 motion-reduce:transition-none">
      {/* Espaço da imagem. Troque por <Image> quando as notícias vierem da API. */}
      <div aria-hidden="true" className="aspect-video rounded-lg bg-neutral-100" />

      <h3 className="line-clamp-3 text-base font-semibold text-neutral-900">
        <Link
          href={news.href}
          className={`rounded-md after:absolute after:inset-0 hover:underline ${focusRing}`}
        >
          {news.title}
        </Link>
      </h3>

      <p className="mt-auto flex flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-600">
        <span className="font-medium text-neutral-900">{news.source}</span>
        <span>{news.category}</span>
        <span>{news.time}</span>
      </p>
    </article>
  );
}
