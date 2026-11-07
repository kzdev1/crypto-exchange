"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { focusRing } from "../Navbar/navStyles";

// Pede ao servidor para buscar os dados de novo, com feedback imediato.
export default function RetryButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => startTransition(() => router.refresh())}
      className={`rounded-md border border-neutral-500 bg-white px-3 py-1.5 text-xs font-medium text-neutral-900 hover:border-neutral-900 disabled:opacity-60 ${focusRing}`}
    >
      {isPending ? "Tentando..." : "Tentar novamente"}
    </button>
  );
}
