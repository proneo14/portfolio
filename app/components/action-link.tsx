import { Link } from "react-router";

type Variant = "primary" | "secondary";

/**
 * The only button shape in the system: a 48px tall rectangle with zero radius
 * and an uppercase letterspaced label. `whitespace-nowrap` because a CTA label
 * that wraps to two lines at desktop is a design failure, not a responsive one.
 *
 * Primary is a white outline that inverts on hover. Secondary is a hairline
 * outline. Both keep their label at full contrast in every state.
 */
const base =
  "inline-flex h-12 items-center justify-center whitespace-nowrap border px-8 font-display text-button uppercase transition-colors duration-150 ease-out active:translate-y-[1px]";

const variantClass: Record<Variant, string> = {
  primary: "border-ink text-ink hover:bg-ink hover:text-canvas",
  secondary: "border-hairline text-body hover:border-ink hover:text-ink",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

export function ActionLink({
  to,
  variant = "primary",
  className = "",
  children,
}: CommonProps & { to: string }) {
  return (
    <Link to={to} className={`${base} ${variantClass[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function ActionAnchor({
  href,
  variant = "primary",
  className = "",
  children,
}: CommonProps & { href: string }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={`${base} ${variantClass[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

/**
 * Inline text link in the technical voice. Used for "read more" style
 * navigation where a full button would be too heavy.
 */
export function QuietLink({
  to,
  className = "",
  children,
}: {
  to: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2 font-mono text-label text-body uppercase transition-colors duration-150 hover:text-ink ${className}`}
    >
      {children}
    </Link>
  );
}
