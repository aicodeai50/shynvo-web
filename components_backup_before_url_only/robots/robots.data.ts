export type RobotMode = {
  id: string;
  name: string;
  vibe: string;
};

export type RobotProfile = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: "online" | "standby" | "offline";
  modes: RobotMode[];
};

export const ROBOTS: RobotProfile[] = [
  {
    id: "shynvo-one",
    name: "Shynvo One",
    tagline: "Cinematic companion • core shell",
    description:
      "Primary cinematic robot presence. Handles modes, atmosphere, and emotional tone. Brain connects later.",
    status: "online",
    modes: [
      { id: "calm", name: "Calm", vibe: "soft • grounded • reassuring" },
      { id: "focus", name: "Focus", vibe: "direct • structured • sharp" },
      { id: "cinematic", name: "Cinematic", vibe: "epic • atmospheric • narrative" },
    ],
  },
  {
    id: "sentinel",
    name: "Sentinel",
    tagline: "Guardian posture • system watch",
    description:
      "Monitors OS state, detects friction, and keeps you on trajectory. Telemetry later.",
    status: "standby",
    modes: [
      { id: "scan", name: "Scan", vibe: "aware • quiet • analytical" },
      { id: "shield", name: "Shield", vibe: "protective • strict • resilient" },
    ],
  },
  {
    id: "architect",
    name: "Architect",
    tagline: "Builder mindset • mission planner",
    description:
      "Transforms goals into mission sets. Later will generate mission trees and timelines.",
    status: "offline",
    modes: [
      { id: "design", name: "Design", vibe: "systems • structure • clarity" },
      { id: "iterate", name: "Iterate", vibe: "fast • adaptive • improvement" },
    ],
  },
];