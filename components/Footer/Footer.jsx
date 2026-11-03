"use client";


import Link from "next/link";
import { footerColumns, projectInfo, disclaimer } from "./footer-links";
import { focusRing } from "../Navbar/navStyles";

const linkStyle = `rounded-md text-sm text-neutral-600 hover:text-neutral-900 hover:underline ${focusRing}`;

// Link interno usa o Link do Next; externo abre em nova aba.
function FooterLink({ link }) {
  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkStyle}
      >
        {link.label}
        <span className="sr-only"> (abre em nova aba)</span>
      </a>
    );
  }

  return (
    <Link href={link.href} className={linkStyle}>
      {link.label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <Link
              href="/"
              className={`rounded-md text-lg font-semibold tracking-tight text-neutral-900 ${focusRing}`}
            >
              {projectInfo.name}
            </Link>
            <p className="mt-3 max-w-sm text-sm text-neutral-600">
              {projectInfo.description}
            </p>
          </div>

          <nav
            aria-label="Rodapé"
            className="grid grid-cols-2 gap-8 sm:grid-cols-4"
          >
            {footerColumns.map((column) => (
              <div key={column.id}>
                <h2 className="text-sm font-semibold text-neutral-900">
                  {column.title}
                </h2>
                <ul className="mt-3 space-y-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <FooterLink link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-10 space-y-2 border-t border-neutral-200 pt-6 text-xs text-neutral-600">
          <p className="max-w-3xl">{disclaimer}</p>
          <p>
            © {new Date().getFullYear()} {projectInfo.name}. Projeto de
            portfólio.
          </p>
        </div>
      </div>
    </footer>
  );
}
