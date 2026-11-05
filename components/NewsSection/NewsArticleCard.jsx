import { focusRing } from "../Navbar/navStyles";

// Card de uma notícia real. O card inteiro é clicável pelo link do título,
// que abre a matéria original em outra aba.
export default function NewsArticleCard({ news }) {
  return (
    <article className="relative flex w-full flex-col gap-2 rounded-xl border border-neutral-200 bg-white p-3 transition-colors hover:border-neutral-400 focus-within:border-neutral-900 motion-reduce:transition-none">
      <h3 className="line-clamp-3 text-sm font-semibold text-neutral-900">
        <a
          href={news.href}
          target="_blank"
          rel="noopener noreferrer"
          lang={news.language}
          className={`rounded-md after:absolute after:inset-0 hover:underline ${focusRing}`}
        >
          {news.title}
          <span className="sr-only"> (abre em nova aba)</span>
        </a>
      </h3>

      <p className="mt-auto flex flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-600">
        <span className="font-medium text-neutral-900">{news.source}</span>
        <span>{news.categories[0]}</span>
        {news.language === "en" && <span>Em inglês</span>}
        <span>{news.time}</span>
      </p>
    </article>
  );
}
