// Largura máxima e margem lateral padrão do site.
// Use em todas as seções para manter tudo alinhado.
export default function Container({
  as: Tag = "div",
  className = "",
  children,
}) {
  return (
    <Tag className={`mx-auto w-full max-w-7xl px-4 sm:px-8 ${className}`}>
      {children}
    </Tag>
  );
}
