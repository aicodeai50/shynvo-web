// lib/timeline/chrono.ts

export type ChronoTag = "SYSTEM" | "MISSION" | "RESEARCH" | "PERSONAL" | "MILESTONE";

export type ChronoEvent = {
  id: string;
  year: number;
  title: string;
  detail?: string;
  tag?: ChronoTag;
};

export type ChronoYear = {
  year: number;
  headline?: string;
  events: ChronoEvent[];
};

export const CHRONO_START = 2026;
export const CHRONO_END = 2050;

const seed2026: ChronoYear = {
  year: 2026,
  headline: "System ignition → OS stabilizes → modules come online",
  events: [
    {
      id: "2026-os-shell-stable",
      year: 2026,
      title: "OS Shell stabilized",
      detail: "Navigation safe, cinematic layer active, core modules load.",
      tag: "SYSTEM",
    },
    {
      id: "2026-assistant-proxy-online",
      year: 2026,
      title: "Assistant proxy chain confirmed",
      detail: "Frontend → /api/public/chat → Railway → reply (no browser secrets).",
      tag: "SYSTEM",
    },
    {
      id: "2026-chronochart-module",
      year: 2026,
      title: "Chronochart Timeline module begins",
      detail: "2026–2050 scaffolding + OS-style board layout.",
      tag: "MILESTONE",
    },
    {
      id: "2026-public-demo-flow",
      year: 2026,
      title: "Launch SH Colony OS (demo flow)",
      detail: "OS home, planet, cognitive, missions, timeline. Frontend sprint locks layout.",
      tag: "MISSION",
    },
  ],
};

function makePlaceholderYear(year: number): ChronoYear {
  return {
    year,
    headline: "Placeholder year — future events to be authored",
    events: [
      {
        id: `${year}-placeholder-1`,
        year,
        title: "Awaiting events",
        detail: "Add missions, milestones, research arcs, system upgrades.",
        tag: "MILESTONE",
      },
    ],
  };
}

export const chronoYears: ChronoYear[] = [
  seed2026,
  ...Array.from({ length: CHRONO_END - 2027 + 1 }, (_, i) => makePlaceholderYear(2027 + i)),
];

export function getChronoYearsRange(): number[] {
  return Array.from({ length: CHRONO_END - CHRONO_START + 1 }, (_, i) => CHRONO_START + i);
}

export function getChronoYear(year: number): ChronoYear {
  return chronoYears.find((y) => y.year === year) ?? makePlaceholderYear(year);
}

export function yearToPercent(year: number) {
  // 2026 -> 0%, 2050 -> 100%
  const min = CHRONO_START;
  const max = CHRONO_END;
  return ((year - min) / (max - min)) * 100;
}