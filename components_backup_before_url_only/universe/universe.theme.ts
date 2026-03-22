// components/universe/universe.theme.ts

export type UniverseSlug =
  | "demo"
  | "pricing"
  | "robot"
  | "os2050"
  | "academy"
  | "arena"
  | "lab";

export type UniverseDef = {
  slug: UniverseSlug;
  title: string;
  desc: string;
  cta: string;
  href: string;

  // Visual identity per universe (unique background + glow)
  bg: string; // gradient
  glow: string; // box glow
  accent: string; // small accent text/borders
  icon: string; // simple symbol for now
};

// Each one is a DIFFERENT universe.
export const UNIVERSES: UniverseDef[] = [
  {
    slug: "demo",
    title: "View Demo Universe",
    desc: "Instant AI practice flow. Low friction. High wow.",
    cta: "Enter Demo",
    href: "/universe/demo",
    icon: "⚡",
    bg: "radial-gradient(1200px circle at 20% 20%, rgba(56,189,248,0.22), transparent 45%), radial-gradient(900px circle at 80% 30%, rgba(99,102,241,0.18), transparent 50%), linear-gradient(180deg, rgba(2,6,23,0.85), rgba(0,0,0,0.92))",
    glow: "0 0 50px rgba(56,189,248,0.18)",
    accent: "rgba(56,189,248,0.85)",
  },
  {
    slug: "pricing",
    title: "Pricing Atlas",
    desc: "Free → Pro → Team. Choose power level.",
    cta: "See Plans",
    href: "/universe/pricing",
    icon: "¤",
    bg: "radial-gradient(1200px circle at 30% 20%, rgba(245,158,11,0.16), transparent 50%), radial-gradient(900px circle at 70% 60%, rgba(250,204,21,0.12), transparent 55%), linear-gradient(180deg, rgba(2,6,23,0.85), rgba(0,0,0,0.92))",
    glow: "0 0 50px rgba(250,204,21,0.14)",
    accent: "rgba(250,204,21,0.9)",
  },
  {
    slug: "robot",
    title: "Sci-Fi Robot Bay",
    desc: "Talk to the robot. Modes. Quizzes. Interviews.",
    cta: "Enter Robot",
    href: "/universe/robot",
    icon: "🤖",
    bg: "radial-gradient(1200px circle at 80% 20%, rgba(167,139,250,0.20), transparent 45%), radial-gradient(900px circle at 30% 70%, rgba(236,72,153,0.12), transparent 55%), linear-gradient(180deg, rgba(2,6,23,0.85), rgba(0,0,0,0.92))",
    glow: "0 0 55px rgba(167,139,250,0.16)",
    accent: "rgba(167,139,250,0.9)",
  },
  {
    slug: "os2050",
    title: "Enter Shynvo OS (2050)",
    desc: "Cinematic control deck. Terminal never vanishes.",
    cta: "Enter OS",
    href: "/os",
    icon: "🛰",
    bg: "radial-gradient(1200px circle at 50% 40%, rgba(253,224,71,0.14), transparent 55%), radial-gradient(900px circle at 20% 80%, rgba(255,255,255,0.06), transparent 60%), linear-gradient(180deg, rgba(2,6,23,0.85), rgba(0,0,0,0.92))",
    glow: "0 0 60px rgba(253,224,71,0.12)",
    accent: "rgba(253,224,71,0.9)",
  },

  // Extra 2–3 boxes to boost engagement
  {
    slug: "academy",
    title: "Academy Sector",
    desc: "Guided learning paths + drills. Fast progression.",
    cta: "Enter Academy",
    href: "/universe/academy",
    icon: "🎓",
    bg: "radial-gradient(1200px circle at 20% 25%, rgba(34,211,238,0.18), transparent 50%), radial-gradient(900px circle at 70% 70%, rgba(16,185,129,0.12), transparent 55%), linear-gradient(180deg, rgba(2,6,23,0.85), rgba(0,0,0,0.92))",
    glow: "0 0 55px rgba(34,211,238,0.14)",
    accent: "rgba(34,211,238,0.9)",
  },
  {
    slug: "arena",
    title: "Interview Arena",
    desc: "Timed rounds. Scoring. Pressure mode.",
    cta: "Enter Arena",
    href: "/universe/arena",
    icon: "🜲",
    bg: "radial-gradient(1200px circle at 75% 25%, rgba(244,63,94,0.16), transparent 50%), radial-gradient(900px circle at 25% 75%, rgba(251,113,133,0.10), transparent 55%), linear-gradient(180deg, rgba(2,6,23,0.85), rgba(0,0,0,0.92))",
    glow: "0 0 55px rgba(244,63,94,0.14)",
    accent: "rgba(244,63,94,0.9)",
  },
  {
    slug: "lab",
    title: "Builder Lab",
    desc: "Generate plans, scaffolds, and launch steps.",
    cta: "Enter Lab",
    href: "/universe/lab",
    icon: "🧪",
    bg: "radial-gradient(1200px circle at 70% 20%, rgba(99,102,241,0.20), transparent 50%), radial-gradient(900px circle at 30% 70%, rgba(56,189,248,0.12), transparent 55%), linear-gradient(180deg, rgba(2,6,23,0.85), rgba(0,0,0,0.92))",
    glow: "0 0 55px rgba(99,102,241,0.16)",
    accent: "rgba(99,102,241,0.9)",
  },
];

export function getUniverse(slug: string) {
  return UNIVERSES.find((u) => u.slug === slug) ?? null;
}