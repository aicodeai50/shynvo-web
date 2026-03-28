"use client";

import Link from "next/link";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";

const OS_AREAS = [
  {
    title: "Focus",
    subtitle: "Deep work, sessions, and execution control.",
    href: "/os/focus",
    tags: ["Sessions", "Attention", "Execution"],
  },
  {
    title: "OS Missions",
    subtitle: "Mission creation, active execution, and structured progress.",
    href: "/os/missions",
    tags: ["Goals", "Delivery", "Tracking"],
  },
  {
    title: "Robots",
    subtitle: "AI robot systems for execution, research, and strategy support.",
    href: "/os/robots",
    tags: ["AI", "Assistants", "Automation"],
  },
  {
    title: "Timeline",
    subtitle: "Time-based execution views across day, week, and logic.",
    href: "/os/timeline",
    tags: ["Day", "Week", "Logic"],
  },
  {
    title: "Logbook",
    subtitle: "Reflections, mission reviews, and execution memory.",
    href: "/os/logbook",
    tags: ["Logs", "Reviews", "Memory"],
  },
  {
    title: "Cognitive",
    subtitle: "Focus state, recovery, and friction signal tracking.",
    href: "/os/cognitive",
    tags: ["Recovery", "State", "Signals"],
  },
  {
    title: "Council",
    subtitle: "Structured input and output layers for decisions and direction.",
    href: "/os/council",
    tags: ["Decisions", "Input", "Output"],
  },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function EnterpriseOsPage() {
  return (
    <section className="py-10 sm:py-14">
      <EnterpriseNav label="Enterprise OS Layer" />

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/65">
          Shynvo Enterprise
        </div>

        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          OS Core
        </h1>

        <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
          OS Core is now presented as part of Shynvo Enterprise. This layer contains
          the execution systems, focus mechanics, AI robot access, timeline structure,
          cognitive state tracking, and mission control capabilities that power the
          operating environment.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {OS_AREAS.map((area) => (
          <Link
            key={area.href}
            href={area.href}
            className={cx(
              "group rounded-[1.75rem] border border-white/10 bg-black/20 p-5 transition",
              "hover:border-white/20 hover:bg-white/[0.06]"
            )}
          >
            <div className="mt-2">
              <h3 className="text-2xl font-semibold text-white">{area.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/68">{area.subtitle}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {area.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm font-semibold text-white/90">Open area</span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition group-hover:bg-white group-hover:text-[#0B0F14]">
                ›
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
