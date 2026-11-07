import { focusRing } from "./navStyles";

// Busca de moedas. É um formulário comum (GET): ao enviar, abre o ranking filtrado
// em /criptomoedas?busca=texto. Funciona com Enter ou com o botão da lupa.
// `id` precisa ser único na página (o menu do celular usa outro id).
export default function SearchForm({ id, className = "" }) {
  return (
    <form
      role="search"
      action="/criptomoedas"
      method="get"
      className={`flex items-center gap-1 ${className}`}
    >
      <label htmlFor={id} className="sr-only">
        Buscar criptomoedas por nome ou sigla
      </label>
      <input
        id={id}
        name="busca"
        type="search"
        placeholder="Buscar"
        maxLength={50}
        autoComplete="off"
        className={`w-full min-w-0 rounded-md border border-neutral-500 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 md:w-44 ${focusRing}`}
      />
      <button
        type="submit"
        className={`shrink-0 rounded-md border border-neutral-500 bg-white p-2 text-neutral-900 hover:border-neutral-900 ${focusRing}`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="h-5 w-5"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <span className="sr-only">Buscar</span>
      </button>
    </form>
  );
}