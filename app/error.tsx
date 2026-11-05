"use client";

import Container from "@/components/Container/Container";

// Tela mostrada quando algo inesperado quebra a página.
// Não exibe a mensagem do erro, para não revelar detalhes internos.
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <Container className="py-16">
      <div role="alert" className="max-w-xl space-y-3">
        <h1 className="text-2xl font-semibold text-neutral-900">
          Algo deu errado
        </h1>
        <p className="text-neutral-600">
          Não foi possível carregar esta página agora. Verifique sua conexão e
          tente novamente.
        </p>
        <button
          type="button"
          onClick={reset}
          className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
        >
          Tentar novamente
        </button>
      </div>
    </Container>
  );
}
