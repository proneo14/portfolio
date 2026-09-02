/**
 * Narrative beats for the drift section.
 *
 * These exist so the animation carries information rather than being
 * decoration. In the static and reduced-motion baseline they render as a normal
 * stacked list. In the animated version each beat is tied to a point along the
 * scroll-scrubbed path.
 */
export type DriftBeat = {
  id: string;
  /** Mono label. Short. Names the phase in plain language. */
  label: string;
  heading: string;
  body: string;
};

export const driftBeats: DriftBeat[] = [
  {
    id: "entry",
    label: "Entry",
    heading: "Commit before you can see the exit",
    body: "Most of the engineering I care about starts here. You pick an approach while the information is still incomplete, and the quality of that first decision sets how much room you have later.",
  },
  {
    id: "balance",
    label: "Balance",
    heading: "Hold it with small corrections",
    body: "A drift is not one input, it is hundreds of tiny ones. Same with a system in production. The PID loop on the exoskeleton taught me more about this than any lecture did.",
  },
  {
    id: "exit",
    label: "Exit",
    heading: "Straighten out and put the power down",
    body: "The payoff is a system that holds under load: 70 terabytes reclaimed, a slicer that beat the vendor tool, a classifier that works on a phone at a lake in bad light.",
  },
];
