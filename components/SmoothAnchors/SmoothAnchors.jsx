"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

// Faz os links com "#" (ex.: /#conversor) descerem até o alvo com scroll suave,
// SEM colocar o "#" na barra de endereço. O alvo ganha destaque se tiver o atributo
// data-highlight-on-scroll. Funciona também vindo de outra página.

const STORAGE_KEY = "scroll-target";
const HIGHLIGHT_MS = 1800;
const MAX_TRIES = 20;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function goTo(id) {
  const element = document.getElementById(id);
  if (!element) return false;

  const highlight = element.hasAttribute("data-highlight-on-scroll");

  element.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: highlight ? "center" : "start",
  });

  // Leva o foco do teclado junto, para quem navega sem mouse.
  if (!element.hasAttribute("tabindex")) element.setAttribute("tabindex", "-1");
  element.focus({ preventScroll: true });

  if (highlight) {
    element.setAttribute("data-highlighted", "true");
    window.setTimeout(() => element.removeAttribute("data-highlighted"), HIGHLIGHT_MS);
  }
  return true;
}

export default function SmoothAnchors() {
  const router = useRouter();
  const pathname = usePathname();

  // Intercepta o clique antes do Next, para a URL não receber o "#".
  useEffect(() => {
    function handleClick(event) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || !url.hash) return;

      event.preventDefault();
      const id = decodeURIComponent(url.hash.slice(1));

      if (url.pathname === window.location.pathname) {
        goTo(id);
      } else {
        // Outra página: guarda o alvo, navega sem o "#" e rola ao chegar.
        try {
          sessionStorage.setItem(STORAGE_KEY, id);
        } catch {}
        router.push(url.pathname + url.search);
      }
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [router]);

  // Depois de mudar de página, rola até o alvo guardado.
  useEffect(() => {
    let id = null;
    try {
      id = sessionStorage.getItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {}
    if (!id) return;

    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (goTo(id) || tries >= MAX_TRIES) window.clearInterval(timer);
    }, 100);
    return () => window.clearInterval(timer);
  }, [pathname]);

  return null;
}