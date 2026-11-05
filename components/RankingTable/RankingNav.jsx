import Link from "next/link";
import { SORTS, buildHref } from "./ranking-options";
import { focusRing } from "../Navbar/navStyles";

const baseLink = `rounded-md border px-3 py-1.5 text-sm font-medium ${focusRing}`;
const activeLink = "border-neutral-900 bg-neutral-900 text-white";
const idleLink =
  "border-neutral-500 text-neutral-700 hover:border-neutral-900 hover:text-neutral-900";

// Links para trocar a ordem do ranking.
export function SortNav({ activeSort }) {
  return (
    <nav aria-label="Ordenar ranking" className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-neutral-600">Ordenar por</span>
      {SORTS.map((sort) => {
        const isActive = sort.id === activeSort;
        return (
          <Link
            key={sort.id}
            href={buildHref(sort.id, 1)}
            aria-current={isActive ? "true" : undefined}
            className={`${baseLink} ${isActive ? activeLink : idleLink}`}
          >
            {sort.label}
          </Link>
        );
      })}
    </nav>
  );
}

// Links das páginas do ranking.
export function Pagination({ sortId, page, totalPages }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      aria-label="Paginação do ranking"
      className="mt-6 flex flex-wrap items-center justify-center gap-2"
    >
      {page > 1 && (
        <Link href={buildHref(sortId, page - 1)} rel="prev" className={`${baseLink} ${idleLink}`}>
          Anterior
        </Link>
      )}
      {pages.map((number) => (
        <Link
          key={number}
          href={buildHref(sortId, number)}
          aria-label={`Página ${number}`}
          aria-current={number === page ? "page" : undefined}
          className={`${baseLink} ${number === page ? activeLink : idleLink}`}
        >
          {number}
        </Link>
      ))}
      {page < totalPages && (
        <Link href={buildHref(sortId, page + 1)} rel="next" className={`${baseLink} ${idleLink}`}>
          Próxima
        </Link>
      )}
    </nav>
  );
}
