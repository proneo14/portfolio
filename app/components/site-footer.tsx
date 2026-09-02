import { ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router";

import { profile } from "~/data/profile";

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline-strong bg-canvas">
      <div className="mx-auto max-w-page px-4 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <p className="font-display text-display-sm uppercase text-ink">
              Open to co-op
            </p>
            <p className="mt-4 max-w-[40ch] text-body">
              I am looking for a software engineering co-op term. The fastest way
              to reach me is email.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-6 inline-block font-mono text-meta text-ink underline decoration-accent decoration-2 underline-offset-4 transition-colors duration-150 hover:text-accent-bright"
            >
              {profile.email}
            </a>
          </div>

          <div>
            <h2 className="font-mono text-label text-muted uppercase">
              Elsewhere
            </h2>
            <ul className="mt-4 space-y-3">
              {profile.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.external
                      ? { target: "_blank", rel: "noreferrer noopener" }
                      : {})}
                    className="inline-flex items-center gap-1 font-mono text-meta text-body transition-colors duration-150 hover:text-ink"
                  >
                    {link.label}
                    {link.external ? (
                      <ArrowUpRight size={12} aria-hidden="true" />
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-mono text-label text-muted uppercase">
              This site
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  to="/projects"
                  className="font-mono text-meta text-body transition-colors duration-150 hover:text-ink"
                >
                  Work
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="font-mono text-meta text-body transition-colors duration-150 hover:text-ink"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="font-mono text-meta text-body transition-colors duration-150 hover:text-ink"
                >
                  About
                </Link>
              </li>
              <li>
                {/* The hobby layer. Quiet, but a real link so it is reachable by
                    keyboard, on touch, and by crawlers. */}
                <Link
                  to="/garage"
                  className="font-mono text-meta text-muted transition-colors duration-150 hover:text-accent-bright"
                >
                  Garage
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-16 font-mono text-meta text-muted">
          {profile.name}. {profile.location}.
        </p>
      </div>
    </footer>
  );
}
