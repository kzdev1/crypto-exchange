import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsPageContent from "@/components/NewsPage/NewsPageContent";
import { findNewsPage } from "@/components/NewsPage/news-pages";

type Props = { params: Promise<{ categoria: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  const page = findNewsPage(categoria);
  if (!page) return {};

  return {
    title: `${page.title} | Crypto Exchange`,
    description: page.description,
  };
}

// Rotas: /noticias/mercado, /noticias/regulacao e /noticias/brasil.
// Qualquer outro endereço mostra a página 404.
export default async function NoticiasCategoriaPage({ params }: Props) {
  const { categoria } = await params;
  if (!categoria || !findNewsPage(categoria)) notFound();

  return <NewsPageContent slug={categoria} />;
}