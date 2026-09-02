import type { Project } from "./types";

/**
 * Order is meaningful. The home page bento grid renders exactly as many cells as
 * there are featured projects, so adding a fourth featured project means
 * reshaping that grid rather than pasting a blank tile.
 */
export const projects: Project[] = [
  {
    slug: "neopass",
    name: "NeoPass",
    summary:
      "A password manager built on post-quantum key exchange, with a desktop app, browser extension and sync engine.",
    body: [
      "NeoPass is a password manager written in Go around the X-Wing hybrid key encapsulation mechanism, which combines a classical and a post-quantum primitive so a break in either one alone does not compromise the vault.",
      "The desktop client is React inside Electron with biometric unlock. The browser extension does autofill through a Shadow DOM overlay so page scripts cannot read the injected fields. A sync engine keeps multiple devices consistent without the server ever holding plaintext.",
      "The interesting problem here was not the cryptography, which is a library call. It was key rotation across devices that are not all online at the same time.",
    ],
    year: "2026",
    status: "active",
    stack: [
      "Go",
      "X-Wing KEM",
      "React",
      "Electron",
      "TypeScript",
      "Shadow DOM",
    ],
    metrics: [],
    links: [
      {
        label: "Source",
        href: "https://github.com/proneo14",
        external: true,
      },
    ],
    photoId: null,
    featured: true,
  },
  {
    slug: "gemslice",
    name: "GemSlice",
    summary:
      "A browser-based 3D print slicer that orchestrates OrcaSlicer in Docker and beats the vendor tool on time and waste.",
    body: [
      "GemSlice moves slicing off the desktop. A Rails backend orchestrates containerized OrcaSlicer instances, and a Vue front end with a Three.js viewport handles model placement and preview in the browser.",
      "The benchmark that mattered was against Bambu Studio on the same models and the same printer profiles. GemSlice came out 22 percent faster on slice times and 15 percent lower on print waste.",
      "Most of the engineering went into queueing and container lifecycle, since a slice job is a long CPU-bound task and users expect a progress bar rather than a spinner.",
    ],
    year: "2025",
    status: "shipped",
    stack: ["Ruby on Rails", "Vue.js", "Three.js", "Docker", "PostgreSQL"],
    metrics: [
      {
        value: "22%",
        label: "faster slice times",
        source: "Benchmarked against Bambu Studio on identical model set",
      },
      {
        value: "15%",
        label: "less print waste",
        source: "Benchmarked against Bambu Studio on identical model set",
      },
    ],
    links: [
      { label: "Source", href: "https://github.com/proneo14", external: true },
    ],
    photoId: null,
    featured: true,
  },
  {
    slug: "gofish",
    name: "GoFish",
    summary:
      "A fishing app that identifies your catch from a photo and predicts when the bite is on. Winner at DeltaHacks 12.",
    body: [
      "GoFish pairs a social feed with two pieces of machine learning. A PyTorch image classifier identifies species from a photo of the catch at around 92 percent accuracy, and a FastAPI service computes a live bite probability from weather, pressure and time of day.",
      "The front end is Next.js and the backend stores catches in MongoDB. It won DeltaHacks 12.",
      "Building this taught me more about data collection than about modeling. The classifier only worked once we stopped training on clean reference photos and started training on photos that look like a fish held at arm's length in bad light.",
    ],
    year: "2025",
    status: "shipped",
    award: "Winner, DeltaHacks 12",
    stack: ["Next.js", "PyTorch", "FastAPI", "MongoDB", "Python"],
    metrics: [
      {
        value: "92%",
        label: "species classification accuracy",
        source: "Held-out validation set, PyTorch image classifier",
      },
    ],
    links: [
      { label: "Source", href: "https://github.com/proneo14", external: true },
    ],
    photoId: null,
    featured: true,
  },
  {
    slug: "chess-engine",
    name: "ML Chess Engine",
    summary:
      "A chess engine combining a learned opening book with Minimax search, playing at roughly 1450 Elo.",
    body: [
      "This engine pairs classical Minimax search with a convolutional network trained on more than 2000 openings, reaching about 92 percent accuracy on opening choice and roughly 1450 Elo in play.",
      "The web app is Next.js with a live board, so you can play it directly. Built at ChessHacks.",
    ],
    year: "2025",
    status: "shipped",
    stack: ["PyTorch", "Python", "Next.js", "Minimax"],
    metrics: [
      {
        value: "1450",
        label: "playing strength in Elo",
        source: "Self-play and online rated games",
      },
    ],
    links: [
      { label: "Source", href: "https://github.com/proneo14", external: true },
    ],
    photoId: null,
    featured: false,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function findProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
