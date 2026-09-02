import type { Role } from "./types";

/** Most recent first. Rendered as hairline-divided rows, not cards. */
export const experience: Role[] = [
  {
    id: "lancaster",
    title: "Software Engineer",
    organization: "Lancaster Group Inc.",
    location: "Toronto, ON",
    dates: { start: "Jan 2026", end: "Apr 2026" },
    highlights: [
      "Built a digital asset manager in Go and PostgreSQL that reclaimed more than 70 TB of storage.",
      "Wrote a virtual drive agent in PowerShell over WebDAV so the asset library mounted like a local disk.",
      "Implemented a retrieval pipeline in Go using Ollama and pgvector for search across the archive.",
    ],
    stack: ["Go", "PostgreSQL", "pgvector", "Ollama", "PowerShell", "WebDAV"],
  },
  {
    id: "cope",
    title: "Frontend Developer",
    organization: "COPE Family Health Clinic",
    location: "Toronto, ON",
    dates: { start: "May 2025", end: "Aug 2025" },
    highlights: [
      "Rebuilt the clinic website in React, which raised online bookings by roughly half.",
      "Automated the Meta and Google Analytics reporting workflows, lifting organic traffic by about 40 percent.",
    ],
    stack: ["React", "TypeScript", "Google Analytics", "Meta Ads"],
  },
  {
    id: "biomechatronics",
    title: "Software Developer",
    organization: "UW Biomechatronics Club",
    location: "Waterloo, ON",
    dates: { start: "Sep 2024", end: "Present" },
    highlights: [
      "Write C++ firmware running the PID control loop for a soft exoskeleton.",
      "Fine-tune a TensorFlow classifier on EMG gesture signals to drive actuation intent.",
    ],
    stack: ["C++", "TensorFlow", "Embedded systems", "EMG"],
  },
];
