import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { profile } from "./data/profile";

/** The mark is the twin tail light bars, in accent over black. */
export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        {/* No maximum-scale and no user-scalable=no. Zoom stays available. */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Must track --color-canvas, or the browser chrome bands against the
            page on mobile. */}
        <meta name="theme-color" content="#050505" />
        <Meta />
        <Links />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-canvas focus:px-4 focus:py-3 focus:font-mono focus:text-label focus:text-ink focus:uppercase focus:outline focus:outline-2 focus:outline-accent-bright"
        >
          Skip to content
        </a>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let heading = "Something went wrong";
  let detail = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    heading = error.status === 404 ? "Page not found" : "Error";
    detail =
      error.status === 404
        ? "That page does not exist. The road ends here."
        : error.statusText || detail;
  } else if (import.meta.env.DEV && error instanceof Error) {
    detail = error.message;
    stack = error.stack;
  }

  return (
    <main
      id="main"
      className="mx-auto flex min-h-[100dvh] max-w-page flex-col justify-center px-4 py-16 md:px-8"
    >
      <p className="font-mono text-label text-accent-bright uppercase">
        {profile.shortName}
      </p>
      <h1 className="mt-4 text-display-md uppercase md:text-display-lg">
        {heading}
      </h1>
      <p className="mt-4 max-w-[65ch] text-body">{detail}</p>
      <a
        href="/"
        className="mt-8 inline-flex h-12 w-fit items-center border border-ink px-8 font-display text-button uppercase text-ink transition-colors duration-150 hover:bg-ink hover:text-canvas"
      >
        Back to start
      </a>
      {stack ? (
        <pre className="mt-8 overflow-x-auto border border-hairline bg-surface-soft p-4 font-mono text-meta text-muted">
          <code>{stack}</code>
        </pre>
      ) : null}
    </main>
  );
}
