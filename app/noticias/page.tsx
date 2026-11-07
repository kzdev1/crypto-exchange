import type { Metadata } from "next";
import NewsPageContent from "@/components/NewsPage/NewsPageContent";
import { findNewsPage } from "@/components/NewsPage/news-pages";

const page = findNewsPage("");

export const metadata: Metadata = {
  title: `${page?.title} | Crypto Exchange`,
  description: page?.description,
};

export default function NoticiasPage() {
  return <NewsPageContent slug="" />;
}