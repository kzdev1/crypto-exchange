"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

const getSnapshot = () => navigator.onLine;
const getServerSnapshot = () => true;

// Faixa no topo que aparece quando o navegador perde a internet.
export default function OfflineNotice() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (isOnline) return null;

  return (
    <div
      role="status"
      className="border-b border-red-700 bg-red-50 px-4 py-2 text-center text-sm text-red-700"
    >
      <span aria-hidden="true">⚠ </span>
      Você está sem conexão com a internet. Os dados exibidos podem estar
      desatualizados.
    </div>
  );
}
