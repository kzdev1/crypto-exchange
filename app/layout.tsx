import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import OfflineNotice from "@/components/OfflineNotice/OfflineNotice";
import Navbar from "@/components/Navbar/Navbar";
import MarketStatsBar from "@/components/MarketStatsBar/MarketStatsBar";
import Footer from "@/components/Footer/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crypto Exchange",
  description:
    "Preços de criptomoedas, estatísticas do mercado e notícias, em reais. Projeto de portfólio.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <OfflineNotice />
        <Navbar />
        <MarketStatsBar />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
