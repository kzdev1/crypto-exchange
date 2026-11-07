import type { Metadata } from "next";
import Container from "@/components/Container/Container";
import {
  learnPage,
  guides,
  glossary,
} from "@/components/LearnPage/learn-content";

export const metadata: Metadata = {
  title: `${learnPage.title} | Crypto Exchange`,
  description: learnPage.intro,
};

const linkStyle =
  "rounded-md text-sm text-neutral-700 underline hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900";

export default function AprenderPage() {
  return (
    <Container className="py-8">
      <div className="mx-auto max-w-3xl space-y-10">
        <header className="space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            {learnPage.title}
          </h1>
          <p className="leading-7 text-neutral-700">{learnPage.intro}</p>
          <p className="rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-sm text-neutral-700">
            {learnPage.disclaimer}
          </p>
        </header>

        <nav aria-label="Nesta página">
          <h2 className="mb-2 text-sm font-semibold text-neutral-900">Nesta página</h2>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {guides.map((guide) => (
              <li key={guide.id}>
                <a href={`#${guide.id}`} className={linkStyle}>
                  {guide.title}
                </a>
              </li>
            ))}
            <li>
              <a href="#glossario" className={linkStyle}>
                Glossário
              </a>
            </li>
          </ul>
        </nav>

        {guides.map((guide) => (
          <article key={guide.id} id={guide.id} className="scroll-mt-4 space-y-3">
            <h2 className="text-xl font-semibold text-neutral-900">{guide.title}</h2>
            {guide.paragraphs.map((text) => (
              <p key={text} className="leading-7 text-neutral-700">
                {text}
              </p>
            ))}
          </article>
        ))}

        <section id="glossario" className="scroll-mt-4 space-y-3">
          <h2 className="text-xl font-semibold text-neutral-900">Glossário</h2>
          <dl className="divide-y divide-neutral-200 rounded-xl border border-neutral-200">
            {glossary.map((item) => (
              <div key={item.term} className="space-y-1 p-3">
                <dt className="font-semibold text-neutral-900">{item.term}</dt>
                <dd className="text-sm leading-6 text-neutral-700">{item.definition}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </Container>
  );
}