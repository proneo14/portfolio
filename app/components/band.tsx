type Surface = "canvas" | "soft" | "card";

const surfaceClass: Record<Surface, string> = {
  canvas: "bg-canvas",
  soft: "bg-surface-soft",
  card: "bg-surface-card",
};

/**
 * A major page section.
 *
 * `surface` exists so the band rhythm rule can be honored: never repeat the
 * same surface mode in two consecutive bands. Two text-only bands in a row read
 * as a corporate site.
 *
 * Set `bleed` when the section's content runs edge to edge, which photography
 * always does. Contained sections cap at the page width and pad in from the
 * viewport edge.
 */
export function Band({
  surface = "canvas",
  bleed = false,
  className = "",
  children,
  ...rest
}: {
  surface?: Surface;
  bleed?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<"section">, "className" | "children">) {
  return (
    <section
      className={`${surfaceClass[surface]} py-band-sm md:py-band ${className}`}
      {...rest}
    >
      {bleed ? (
        children
      ) : (
        <div className="mx-auto max-w-page px-4 md:px-8">{children}</div>
      )}
    </section>
  );
}

/** Page-width wrapper for use inside a bleeding band. */
export function BandInset({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`mx-auto max-w-page px-4 md:px-8 ${className}`}>
      {children}
    </div>
  );
}
