"use client";

import { useState } from "react";
import Image from "next/image";

// Ícone redondo da moeda. Se não houver imagem ou ela falhar, mostra a inicial da sigla.
// É decorativo (alt vazio), porque o nome da moeda sempre aparece ao lado.
export default function CoinIcon({ src, symbol, size = 24 }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <span
        aria-hidden="true"
        style={{ width: size, height: size }}
        className="inline-flex shrink-0 items-center justify-center rounded-full bg-neutral-200 text-[10px] font-semibold text-neutral-700"
      >
        {String(symbol ?? "?").charAt(0)}
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      onError={() => setFailed(true)}
      className="shrink-0 rounded-full"
    />
  );
}