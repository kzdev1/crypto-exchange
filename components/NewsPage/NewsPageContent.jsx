import Link from "next/link";
import Container from "../Container/Container";
import ErrorNotice from "../ErrorNotice/ErrorNotice";
import NewsArticleCard from "../NewsSection/NewsArticleCard";
import { getNews } from "../../lib/api/news";
import { focusRing } from "../Navbar/navStyles";
import { NEWS_PAGES, findNewsPage } from "./news-pages";

const MAX_ITEMS = 30;

const baseLink = `rounded-md border px-3 py-1.5 text-sm font-medium ${focusRing}`;
const activeLink = "border-neutral-900 bg-neutral-900 text-white";
const idleLink =
  "border-neutral-500 text-neutral-700 hover:border-neutral-900 hover:text-neutral-900";

// Conteúdo das páginas de notícias. `slug` vem da rota ("" = todas).
// Usa a mesma busca da página inicial, então não gasta chamadas extras.
export default async function NewsPageContent({ slug }) {
  const page = findNewsPage(slug);
  const news = await getNews();

  const items = news.ok
    ? news.data
        .filter((item) => !page.category || item.categories.includes(page.category))
        .slice(0, MAX_ITEMS)
    : [];

  return (
    <Container className="flex flex-col gap-6 py-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          {page.title}
        </h1>
        <p className="text-sm text-neutral-600">{page.description}</p>
      </div>

      <nav aria-label="Assuntos das notícias" className="flex flex-wrap gap-2">
        {NEWS_PAGES.map((item) => {
          const isActive = item.slug === slug;
          return (
            <Link
              key={item.slug}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`${baseLink} ${isActive ? activeLink : idleLink}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {!news.ok ? (
        <ErrorNotice kind={news.error} title="Não foi possível carregar as notícias" />
      ) : items.length === 0 ? (
        <p className="text-sm text-neutral-600">
          Nenhuma notícia neste assunto por enquanto.
        </p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.id} className="flex">
              <NewsArticleCard news={item} />
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}