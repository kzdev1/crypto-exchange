import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage/LegalPage";
import { legalDocuments } from "@/components/LegalPage/legal-content";

const doc = legalDocuments["aviso-legal"];

export const metadata: Metadata = {
  title: `${doc.title} | Crypto Exchange`,
  description: doc.description,
};

export default function AvisoLegalPage() {
  return <LegalPage slug="aviso-legal" />;
}