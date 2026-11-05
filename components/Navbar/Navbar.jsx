"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Container from "../Container/Container";
import NavDropdown from "./NavDropdown";
import { navItems } from "./nav-links";
import { navLink, dropdownLink, focusRing } from "./navStyles";

export default function Navbar() {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const desktopNavRef = useRef(null);

  // Fecha o dropdown ao clicar fora do menu.
  useEffect(() => {
    function handleClickOutside(event) {
      if (!desktopNavRef.current?.contains(event.target)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggleMenu(id) {
    setOpenMenuId((current) => (current === id ? null : id));
  }

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-neutral-900 focus:outline-2 focus:outline-neutral-900"
      >
        Ir para o conteúdo
      </a>

      <header className="border-b border-neutral-200 bg-white">
        <Container className="flex h-16 items-center gap-8">
          <Link
            href="/"
            className={`rounded-md text-lg font-semibold tracking-tight text-neutral-900 ${focusRing}`}
          >
            Crypto Exchange
          </Link>

          <nav
            ref={desktopNavRef}
            aria-label="Menu principal"
            className="hidden md:block"
          >
            <ul className="flex items-center gap-1">
              {navItems.map((item) =>
                item.links ? (
                  <NavDropdown
                    key={item.id}
                    item={item}
                    isOpen={openMenuId === item.id}
                    onToggle={() => toggleMenu(item.id)}
                    onClose={() => setOpenMenuId(null)}
                  />
                ) : (
                  <li key={item.id}>
                    <Link href={item.href} className={navLink}>
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          <div className="ml-auto hidden items-center gap-2 md:flex">
            <div role="search">
              <label htmlFor="busca" className="sr-only">
                Buscar criptomoedas
              </label>
              <input
                id="busca"
                type="search"
                placeholder="Buscar"
                className={`w-44 rounded-md border border-neutral-500 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 ${focusRing}`}
              />
            </div>
            <button type="button" className={navLink}>
              Entrar
            </button>
            <button
              type="button"
              className={`rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 ${focusRing}`}
            >
              Criar conta
            </button>
          </div>

          <button
            type="button"
            aria-expanded={isMobileOpen}
            aria-controls="menu-mobile"
            aria-label={isMobileOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setIsMobileOpen((open) => !open)}
            className={`ml-auto rounded-md p-2 text-neutral-900 md:hidden ${focusRing}`}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="h-6 w-6"
            >
              {isMobileOpen ? (
                <path d="M6 6l12 12M18 6 6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </Container>

        {isMobileOpen && (
          <nav
            id="menu-mobile"
            aria-label="Menu principal"
            className="border-t border-neutral-200 md:hidden"
          >
            <Container as="ul" className="space-y-4 py-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  {item.links ? (
                    <>
                      <p className="px-3 py-1 text-sm font-semibold text-neutral-900">
                        {item.label}
                      </p>
                      <ul>
                        {item.links.map((link) => (
                          <li key={link.href}>
                            <Link href={link.href} className={dropdownLink}>
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block rounded-md px-3 py-1 text-sm font-semibold text-neutral-900 hover:bg-neutral-100 ${focusRing}`}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </Container>
          </nav>
        )}
      </header>
    </>
  );
}
