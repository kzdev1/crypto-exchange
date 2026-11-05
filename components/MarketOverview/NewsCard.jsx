import Card from "./Card";
import ErrorNotice from "../ErrorNotice/ErrorNotice";
import { focusRing } from "../Navbar/navStyles";

const ROWS = 3;

// `news`: lista de notícias reais (veja lib/api/news.js). `errorKind`: tipo do erro, se falhou.
export default function NewsCard({ news, errorKind }) {
  if (errorKind || news.length === 0) {
    return (
      <Card title="Últimas notícias" headingId="news-title">
        <ErrorNotice
          kind={errorKind ?? "invalid-data"}
          title="Não foi possível carregar as notícias"
        />
      </Card>
    );
  }

  return (
    <Card
      title="Últimas notícias"
      headingId="news-title"
      action={
        <a
          href="#noticias"
          className={`rounded-md text-xs text-neutral-600 underline hover:text-neutral-900 ${focusRing}`}
        >
          Ver todas
        </a>
      }
    >
      <ul className="divide-y divide-neutral-200">
        {news.slice(0, ROWS).map((item) => (
          <li key={item.id}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              lang={item.language}
              className={`block rounded-md py-1.5 hover:underline ${focusRing}`}
            >
              <span className="line-clamp-1 text-sm font-medium text-neutral-900">
                {item.title}
                <span className="sr-only"> (abre em nova aba)</span>
              </span>
              <span
                lang="pt-BR"
                className="mt-0.5 flex gap-2 text-xs text-neutral-600"
              >
                <span>{item.source}</span>
                <span>{item.time}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Card>
  );
}
