// Moldura dos cards do topo: título, ação opcional e um contorno discreto no hover.
export default function Card({ title, headingId, action, children, ...props }) {
  return (
    <section
      aria-labelledby={headingId}
      {...props}
      className="rounded-xl border border-neutral-200 bg-white p-3 transition-colors hover:border-neutral-400 focus-within:border-neutral-900 motion-reduce:transition-none"
    >
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h2 id={headingId} className="text-sm font-semibold text-neutral-900">
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}
