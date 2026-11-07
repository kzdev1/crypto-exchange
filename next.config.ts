import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// Política de conteúdo: o site só carrega scripts, imagens, fontes e conexões dele mesmo,
// não pode ser colocado dentro de outro site e só envia formulários para ele mesmo.
// Está em modo "só avisar" (Report-Only): erros aparecem no console do navegador (F12),
// mas nada é bloqueado. Depois de conferir que não há avisos, troque o nome do cabeçalho
// abaixo para "Content-Security-Policy" para ela passar a valer de verdade.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy-Report-Only", value: contentSecurityPolicy },
  // O navegador não "adivinha" o tipo de um arquivo (evita executar texto como script).
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Impede que o site seja aberto dentro de outro site (clickjacking).
  { key: "X-Frame-Options", value: "DENY" },
  // Não envia o endereço completo da página para sites externos.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Bloqueia recursos do aparelho que o site não usa.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Obriga HTTPS depois da primeira visita (só em produção; em http local é ignorado).
  ...(isDev
    ? []
    : [{ key: "Strict-Transport-Security", value: "max-age=63072000" }]),
];

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // Ícones das moedas: o servidor do Next baixa as imagens da CoinGecko e as entrega
  // pelo próprio site (o navegador do visitante não fala com a CoinGecko).
  // Mantenha esta lista igual à ALLOWED_IMAGE_HOSTS em lib/api/coingecko.js.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coin-images.coingecko.com",
        pathname: "/coins/images/**",
      },
      {
        protocol: "https",
        hostname: "assets.coingecko.com",
        pathname: "/coins/images/**",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;