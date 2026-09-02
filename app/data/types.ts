/**
 * Content model for the site.
 *
 * Everything the page renders comes from these types. Sections read data, they
 * never inline copy. This exists so no section can ship with placeholder text.
 */

/** A date expressed as the site displays it. Kept as a string because these are
 *  editorial ranges, not values we compute with. Never use an en dash here. */
export type DateRange = {
  /** e.g. "Jan 2026" */
  start: string;
  /** e.g. "Apr 2026", or "Present" for ongoing work. */
  end: string;
};

export type Link = {
  label: string;
  href: string;
  /** Set for anything leaving the site, so the UI can mark it. */
  external?: boolean;
};

/** A single dramatic figure, rendered with the `stat` type token.
 *  Every value here must be real and traceable to `source`. */
export type Stat = {
  /** The figure itself. Rendered in mono. */
  value: string;
  /** What the figure measures. Kept under six words. */
  label: string;
  /** Where the number comes from, so it can be verified before shipping. */
  source: string;
};

export type Role = {
  id: string;
  title: string;
  organization: string;
  location: string;
  dates: DateRange;
  /** Present tense for ongoing roles, past tense otherwise. Two or three items.
   *  Each one leads with what was built, not with a filler verb. */
  highlights: string[];
  /** Technologies actually used in this role. */
  stack: string[];
};

export type ProjectStatus = "shipped" | "active" | "archived";

export type Project = {
  slug: string;
  name: string;
  /** One line, under 20 words. Used in cards and meta descriptions. */
  summary: string;
  /** Longer prose for the detail page. Paragraphs, not bullets. */
  body: string[];
  year: string;
  status: ProjectStatus;
  /** Optional recognition. Only real awards. */
  award?: string;
  stack: string[];
  /** Real measured results. Empty is better than invented. */
  metrics: Stat[];
  links: Link[];
  /** Id of the photo used as this project's visual. Null means the card renders
   *  a labeled placeholder slot rather than a broken image. */
  photoId: string | null;
  /** Featured projects appear on the home page bento grid. Order matters: the
   *  grid uses exactly as many cells as there are featured projects. */
  featured: boolean;
};

export type PhotoTag =
  | "cls63"
  | "rear"
  | "front"
  | "detail"
  | "roll"
  | "static"
  | "other-car"
  | "landscape";

/**
 * `pending` photos render as an explicitly labeled placeholder slot with the
 * correct aspect ratio reserved. They never render a broken `img`.
 */
export type PhotoStatus = "ready" | "pending";

export type Photo = {
  id: string;
  /** Path relative to /photos, without extension. `photoSrc` builds the URL. */
  file: string;
  /** Real descriptive alt text. These photos are content, not decoration, so
   *  an empty alt is always wrong here. */
  alt: string;
  width: number;
  height: number;
  status: PhotoStatus;
  tags: PhotoTag[];
  car?: string;
  location?: string;
  /** Tiny blurred base64 data URI used as a background while the photo loads.
   *  Keep each one under 1 KB or the inlining costs more than it saves. */
  lqip?: string;
};

export type Hobby = {
  id: string;
  name: string;
  /** One sentence, first person, no filler. */
  note: string;
};
