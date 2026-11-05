import Link from "next/link";
import Container from "../Container/Container";
import { legalConfig, legalPages } from "./legal-config";
import { legalDocuments } from "./legal-content";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900";
const textLink = `rounded-md underline hover:text-neutral-900 ${focusRing}`;

// Troca {owner} e {site} pelos dados de legal-config.js.
const fill = (text) =>
  text
    .replaceAll("{owner}", legalConfig.ownerName)
    .replaceAll("{site}", legalConfig.siteName);

function ExternalLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={textLink}>
      {children}
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  );
}

function ContactSection() {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-neutral-900">Contato</h2>
      <p className="leading-7 text-neutral-700">
        Para exercer seus direitos ou tirar dúvidas sobre este documento, fale com{" "}
        {legalConfig.ownerName}
        {legalConfig.contactEmail ? (
          <>
            {" "}
            pelo e-mail{" "}
            <a href={`mailto:${legalConfig.contactEmail}`} className={textLink}>
              {legalConfig.contactEmail}
            </a>
            .
          </>
        ) : (
          <>
            {" "}
            pelo <ExternalLink href={legalConfig.linkedinUrl}>LinkedIn</ExternalLink> ou
            pelo <ExternalLink href={legalConfig.githubUrl}>GitHub</ExternalLink>.
          </>
        )}
      </p>
    </section>
  );
}

// Página legal genérica. `slug` escolhe o documento em legal-content.js.
export default function LegalPage({ slug }) {
  const doc = legalDocuments[slug];

  return (
    <Container className="py-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            {doc.title}
          </h1>
          <p className="text-sm text-neutral-600">
            Última atualização: {legalConfig.lastUpdated}
          </p>
        </header>

        <nav aria-label="Documentos legais" className="flex flex-wrap gap-x-4 gap-y-2">
          {legalPages.map((page) => (
            <Link
              key={page.slug}
              href={page.href}
              aria-current={page.slug === slug ? "page" : undefined}
              className={`rounded-md text-sm ${focusRing} ${
                page.slug === slug
                  ? "font-semibold text-neutral-900"
                  : "text-neutral-700 underline hover:text-neutral-900"
              }`}
            >
              {page.label}
            </Link>
          ))}
        </nav>

        {doc.sections.map((section) => (
          <section key={section.heading} className="space-y-3">
            <h2 className="text-xl font-semibold text-neutral-900">{section.heading}</h2>
            {section.paragraphs?.map((text) => (
              <p key={text} className="leading-7 text-neutral-700">
                {fill(text)}
              </p>
            ))}
            {section.items && (
              <ul className="list-disc space-y-1 pl-6 leading-7 text-neutral-700">
                {section.items.map((item) => (
                  <li key={item}>{fill(item)}</li>
                ))}
              </ul>
            )}
            {section.after?.map((text) => (
              <p key={text} className="leading-7 text-neutral-700">
                {fill(text)}
              </p>
            ))}
          </section>
        ))}

        {doc.showContact && <ContactSection />}
      </div>
    </Container>
  );
}