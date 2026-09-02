import { List, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";

import { profile, WORK_CTA } from "~/data/profile";

/**
 * Nav items. `WORK_CTA` is imported rather than retyped so the portfolio label
 * can never drift between nav, hero and footer into duplicate CTA intent.
 */
const items = [
  { to: "/projects", label: WORK_CTA },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
];

const linkBase =
  "font-mono text-nav uppercase transition-colors duration-150 ease-out";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close the sheet whenever navigation happens, including back and forward.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    // The sheet covers the viewport, so the page behind it must not scroll.
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-20 border-b border-hairline-strong bg-canvas">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between px-4 md:px-8">
        <Link
          to="/"
          className="flex items-center gap-3 font-display text-button uppercase text-ink"
        >
          {/* The mark is the twin tail light bars. Decorative, so it is hidden
              from assistive tech and the adjacent name carries the meaning. */}
          <span aria-hidden="true" className="flex flex-col gap-[3px]">
            <span className="block h-[3px] w-6 bg-accent-bright" />
            <span className="block h-[3px] w-6 bg-accent" />
          </span>
          {profile.name}
        </Link>

        {/* Desktop. One line, always. */}
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {items.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `${linkBase} border-b-2 pb-1 ${
                      isActive
                        ? "border-accent text-ink"
                        : "border-transparent text-body hover:text-ink"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-2 flex size-12 items-center justify-center text-ink md:hidden"
        >
          {open ? (
            <X size={24} aria-hidden="true" />
          ) : (
            <List size={24} aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile sheet. Rendered in the DOM only when open, so nothing behind it
          is reachable by keyboard while it is closed. */}
      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-16 bottom-0 z-20 overflow-y-auto overscroll-contain bg-canvas md:hidden"
        >
          <nav aria-label="Main" className="px-4 py-8">
            <ul>
              {items.map((item) => (
                <li key={item.to} className="border-b border-hairline">
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `block py-5 font-display text-display-sm uppercase ${
                        isActive ? "text-ink" : "text-body"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
