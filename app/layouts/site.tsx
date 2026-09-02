import { Outlet } from "react-router";

import { SiteFooter } from "~/components/site-footer";
import { SiteNav } from "~/components/site-nav";

/**
 * Chrome shared by every route. `main` lives here so the skip link in root.tsx
 * has a single, reliable target on every page.
 */
export default function SiteLayout() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <SiteNav />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
