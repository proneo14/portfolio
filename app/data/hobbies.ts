import type { Hobby } from "./types";

/**
 * The hobby layer, rendered on /garage. Not in the main nav.
 * First person, one sentence each, no filler.
 */
export const hobbies: Hobby[] = [
  {
    id: "cars",
    name: "Cars",
    note: "A 2014 CLS63 S and an ongoing argument with my own maintenance budget.",
  },
  {
    id: "skiing",
    name: "Skiing",
    note: "Most of my winter weekends end up on a chairlift.",
  },
  {
    id: "hiking",
    name: "Hiking and mountains",
    note: "Long routes, early starts, and far too many photos of the same ridge.",
  },
  {
    id: "fishing",
    name: "Fishing",
    note: "The reason GoFish exists. I wanted to know when the bite was on.",
  },
  {
    id: "anime",
    name: "Anime",
    note: "Mostly long-running series I can leave on while soldering.",
  },
  {
    id: "games",
    name: "Video games",
    note: "Sim racing, and anything with a physics engine worth breaking.",
  },
  {
    id: "bench",
    name: "Bench projects",
    note: "Hardware that did not need building, built anyway. Usually at 2 am.",
  },
];
