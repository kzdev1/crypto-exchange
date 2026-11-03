// Moldura de todos os cards: título, ação opcional e o efeito de hover.
export default function Card({ title, headingId, action, children, ...props }) {
  return (
    <section
      aria-labelledby={headingId}
      {...props}
      className="relative rounded-xl border border-neutral-200 bg-white p-4 transition duration-200 hover:z-10 hover:scale-[1.02] hover:border-neutral-900 hover:ring-1 hover:ring-neutral-900 focus-within:border-neutral-900 focus-within:ring-1 focus-within:ring-neutral-900 motion-reduce:transition-none motion-reduce:hover:scale-100"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 id={headingId} className="text-base font-semibold text-neutral-900">
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}
