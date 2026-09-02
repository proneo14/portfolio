import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type Plugin } from "vite";

/**
 * Chrome DevTools probes /.well-known/appspecific/com.chrome.devtools.json on
 * every dev session. There is no such route, so React Router logs a route-match
 * error and buries the useful output. Answer it with 204 in dev only.
 */
function quietChromeDevtoolsProbe(): Plugin {
  const path = "/.well-known/appspecific/com.chrome.devtools.json";
  return {
    name: "quiet-chrome-devtools-probe",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(path, (_request, response) => {
        response.statusCode = 204;
        response.end();
      });
    },
  };
}

export default defineConfig({
  plugins: [quietChromeDevtoolsProbe(), tailwindcss(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    watch: {
      // Running a build while the dev server is up otherwise triggers a reload
      // for every prerendered HTML file.
      ignored: ["**/build/**", "**/.react-router/**", "**/.wrangler/**"],
    },
  },
});

// GSAP is the only heavy dependency. It is loaded through a dynamic import
// inside the drift component rather than a manual chunk, so routes that do not
// animate never pay for it and reduced-motion visitors never fetch it.
