export type OsSector = {
  key: string;
  title: string;
  subtitle: string;
  status: string;
  description: string;
  href: string;
  tags: string[];
};

export const OS_SECTORS: OsSector[] = [
  {
    key: "missions",
    title: "Missions",
    subtitle: "Turn goals into structured execution paths and active mission flows.",
    status: "Active",
    description: "Mission design, execution phases, measurable progress, and operational direction.",
    href: "/os/missions",
    tags: ["Goal", "Mission", "Execution"],
  },
  {
    key: "timeline",
    title: "Timeline",
    subtitle: "View the sequence of sessions, priorities, and planned execution windows.",
    status: "Active",
    description: "Time windows, structured sequencing, review checkpoints, and execution planning.",
    href: "/os/timeline",
    tags: ["Schedule", "Windows", "Planning"],
  },
  {
    key: "logbook",
    title: "Logbook",
    subtitle: "Store session outcomes, notes, reflections, and operational memory.",
    status: "Active",
    description: "Daily records, mission notes, reflections, and performance memory.",
    href: "/os/logbook",
    tags: ["Logs", "Memory", "Reflection"],
  },
  {
    key: "cognitive",
    title: "Cognitive",
    subtitle: "Track mental load, recovery, friction, and execution state.",
    status: "Active",
    description: "Focus state, recovery level, mental friction, and execution health.",
    href: "/os/cognitive",
    tags: ["State", "Recovery", "Friction"],
  },
  {
    key: "focus",
    title: "Focus",
    subtitle: "Run deep-work sessions with structured execution blocks.",
    status: "Active",
    description: "Execution sessions, work blocks, measurable output, and guided intent.",
    href: "/os/focus",
    tags: ["Deep Work", "Blocks", "Session"],
  },
  {
    key: "robots",
    title: "Robots",
    subtitle: "Use AI agents for research, strategy, coding, writing, and support.",
    status: "Active",
    description: "Specialized agents inside the operating system for targeted execution support.",
    href: "/os/robots",
    tags: ["Agents", "Research", "Support"],
  },
  {
    key: "council",
    title: "AI Council",
    subtitle: "Use multi-perspective AI reasoning for difficult decisions.",
    status: "Active",
    description: "Multi-angle strategic reasoning for important academic, project, and execution choices.",
    href: "/os/council",
    tags: ["Decisions", "Reasoning", "Strategy"],
  },
];
