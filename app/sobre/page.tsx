import type { Metadata } from "next";
import Container from "@/components/Container/Container";
import { about } from "@/components/AboutPage/about-content";
import { legalConfig } from "@/components/LegalPage/legal-config";

export const metadata: Metadata = {
  title: `${about.title} | Crypto Exchange`,
  description: about.purpose[0],
};

const linkStyle =
  "rounded-md underline hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900";

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkStyle}>
      {children}
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  );
}

export default function SobrePage() {
  return (
    <Container className="py-8">
      <div className="mx-auto max-w-3xl space-y-10">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            {about.title}
          </h1>
          <p className="text-sm text-neutral-600">{about.version}</p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-neutral-900">Proposta</h2>
          {about.purpose.map((text) => (
            <p key={text} className="leading-7 text-neutral-700">
              {text}
            </p>
          ))}
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-neutral-900">O que o site oferece</h2>
          <ul className="list-disc space-y-1 pl-6 leading-7 text-neutral-700">
            {about.features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-neutral-900">Tecnologias</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {about.technologies.map((group) => (
              <div key={group.group} className="rounded-xl border border-neutral-200 p-3">
                <h3 className="mb-2 text-sm font-semibold text-neutral-900">{group.group}</h3>
                <ul className="space-y-1 text-sm text-neutral-700">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-neutral-900">Como foi feito</h2>
          <dl className="space-y-3">
            {about.howItWasBuilt.map((item) => (
              <div key={item.title}>
                <dt className="font-semibold text-neutral-900">{item.title}</dt>
                <dd className="leading-7 text-neutral-700">{item.text}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-neutral-900">Quem desenvolveu</h2>
          <p className="leading-7 text-neutral-700">{about.author.text}</p>
          <p className="leading-7 text-neutral-700">
            <ExternalLink href={legalConfig.linkedinUrl}>LinkedIn</ExternalLink>
            {", "}
            <ExternalLink href={legalConfig.githubUrl}>GitHub</ExternalLink>
            {" e "}
            <ExternalLink href={about.repositoryUrl}>repositório do projeto</ExternalLink>.
          </p>
        </section>
      </div>
    </Container>
  );
}