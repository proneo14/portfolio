import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/site.tsx", [
    index("routes/home.tsx"),
    route("projects", "routes/projects.tsx"),
    route("projects/:slug", "routes/project-detail.tsx"),
    route("gallery", "routes/gallery.tsx"),
    route("about", "routes/about.tsx"),
    // Not in the nav, but a real route so it stays linkable and crawlable.
    route("garage", "routes/garage.tsx"),
  ]),
] satisfies RouteConfig;
