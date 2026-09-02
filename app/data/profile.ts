import type { Link, Stat } from "./types";

export const profile = {
  name: "Neo Prohnitchi",
  shortName: "Neo Prohnitchi",
  /** Used in the hero. Kept short so the headline stays within two lines. */
  role: "Software engineer",
  discipline: "Biomedical engineering, software specialization",
  school: "University of Waterloo",
  location: "Toronto, Ontario",
  email: "neoprohnitchi@gmail.com",

  /** Hero headline. Two lines maximum at desktop. No em dashes. */
  headline: ["Systems that", "hold up at speed"],

  /** Hero subtext. Hard cap of 20 words. Currently 19. */
  subtext:
    "I build backend systems, embedded firmware and machine learning tools. Waterloo engineering student, four co-op terms deep.",

  /** Longer bio for the about page. Paragraphs, first person. */
  bio: [
    "I am a biomedical engineering student at Waterloo, specializing in software. Most of what I build sits close to hardware or close to data: a digital asset manager moving 70 terabytes, firmware running a PID loop on a soft exoskeleton, a retrieval pipeline running local models.",
    "I like problems where the constraint is real. Storage that actually ran out. A slicer that actually had to beat the vendor tool. A classifier that had to work on a phone at a lake.",
    "Outside of that I am usually driving, in the mountains, or building something in the garage that did not need building.",
  ],

  education: {
    school: "University of Waterloo",
    degree: "BASc, Biomedical Engineering",
    specialization: "Software engineering specialization",
    dates: { start: "2024", end: "2029" },
    gpa: "3.92",
    coursework: [
      "Data Structures and Algorithms",
      "Digital Computation",
      "Linear Algebra",
    ],
  },

  /** Three figures for the home page. Every value is traceable via `source`. */
  stats: [
    {
      // Non-breaking space so the unit never wraps away from the figure.
      value: "70\u00a0TB",
      label: "storage reclaimed",
      source: "Lancaster Group digital asset manager, Go and PostgreSQL",
    },
    {
      value: "1450",
      label: "Elo chess engine",
      source: "PyTorch and Minimax engine built at ChessHacks",
    },
    {
      value: "22%",
      label: "faster than Bambu Studio",
      source: "GemSlice slice-time benchmark against Bambu Studio",
    },
  ] satisfies Stat[],

  skills: {
    languages: [
      "Go",
      "TypeScript",
      "Python",
      "C",
      "C++",
      "Ruby",
      "SQL",
      "JavaScript",
      "PowerShell",
    ],
    frameworks: [
      "React",
      "Next.js",
      "Vue.js",
      "Rails",
      "Node.js",
      "Electron",
      "Three.js",
      "FastAPI",
      "PyTorch",
      "TensorFlow",
    ],
    tools: [
      "Git",
      "Docker",
      "GitHub Actions",
      "PostgreSQL",
      "pgvector",
      "MongoDB",
      "Supabase",
      "SQLite",
      "Linux",
      "Vite",
    ],
  },

  /** The bench. Personality content that happens to be technically relevant. */
  bench: [
    {
      label: "Workstation",
      value: "Ryzen AI Max+ 395, 64\u00a0GB DDR5, 4\u00a0TB NVMe",
    },
    { label: "GPUs", value: "2x Radeon RX 9070 XT" },
    { label: "NPU", value: "AMD XDNA 2, local model inference" },
    { label: "Server", value: "Linux Docker host running CI" },
  ],

  links: [
    { label: "GitHub", href: "https://github.com/proneo14", external: true },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/neo-prohnitchi",
      external: true,
    },
    {
      label: "Flickr",
      href: "https://www.flickr.com/photos/202613784@N08/",
      external: true,
    },
    { label: "Email", href: "mailto:neoprohnitchi@gmail.com" },
  ] satisfies Link[],
} as const;

/**
 * The portfolio CTA label. Locked to a single string and imported everywhere it
 * appears, so nav, hero and footer can never drift into duplicate CTA intent.
 */
export const WORK_CTA = "View work";
