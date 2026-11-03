import Link from "next/link";
import Card from "./Card";
import { latestNews } from "./mock-data";
import { focusRing } from "../Navbar/navStyles";

export default function NewsCard() {
  return (
    <Card
      title="Últimas notícias"
      headingId="news-title"
      action={
        <Link
          href="/noticias"
          className={`rounded-md text-sm text-neutral-600 underline hover:text-neutral-900 ${focusRing}`}
        >
          Ver todas
        </Link>
      }
    >
      <ul className="divide-y divide-neutral-200">
        {latestNews.map((news) => (
          <li key={news.id}>
            <Link
              href={news.href}
              className={`block rounded-md py-2 hover:underline ${focusRing}`}
            >
              <span className="line-clamp-2 text-sm font-medium text-neutral-900">
                {news.title}
              </span>
              <span className="mt-1 flex gap-2 text-xs text-neutral-600">
                <span>{news.category}</span>
                <span>{news.time}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
