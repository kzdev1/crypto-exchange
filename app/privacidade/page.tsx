import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage/LegalPage";
import { legalDocuments } from "@/components/LegalPage/legal-content";

const doc = legalDocuments["privacidade"];

export const metadata: Metadata = {
  title: `${doc.title} | Crypto Exchange`,
  description: doc.description,
};

export default function PrivacidadePage() {
  return <LegalPage slug="privacidade" />;
}