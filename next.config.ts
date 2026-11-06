import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
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