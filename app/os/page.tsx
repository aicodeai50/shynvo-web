import Link from "next/link";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type Sector = {
  title: string;
  subtitle: string;
  href: string;
  status: string;
};

const SECTORS: Sector[] = [
  {
    title: "Missions",
    subtitle: "Turn goals into structured execution paths and active mission flows.",
    href: "/os/missions",
    status: "Active",
  },
  {
    title: "Timeline",
    subtitle: "View the sequence of sessions, priorities, and planned execution windows.",
    href: "/os/timeline",
    status: "Active",
  },
  {
    title: "Logbook",
    subtitle: "Store session outcomes, notes, reflections, and operational memory.",
    href: "/os/logbook",
    status: "Active",
  },
  {
    title: "Cognitive",
    subtitle: "Track mental load, recovery, friction, and execution state.",
    href: "/os/cognitive",
    status: "Active",
  },
  {
    title: "Focus",
    subtitle: "Run deep-work sessions with structured execution blocks.",
    href: "/os/focus",
    status: "Active",
  },
  {
    title: "Robots",
    subtitle: "Use AI agents for research, strategy, coding, writing, and support.",
    href: "/os/robots",
    status: "Active",
  },
  {
    title: "AI Council",
    subtitle: "Use multi-perspective AI reasoning for difficult decisions.",
    href: "/os/council",
    status: "Active",
  },
];

export default function ShynvoOSPage() {
  return (
    <section className="py-10 sm:py-14">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            ← Back to Home
          </Link>

          <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Shynvo OS
          </div>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
            Orbital Nexus
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
            Shynvo OS is the execution environment of the platform. It helps users
            move from goal to mission to session, with structured control over
            planning, focus, logs, cognitive state, and AI assistance.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
          System Status: Online
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Daily Command
          </div>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Define what you want to achieve
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
            In the full system, this command layer becomes the engine of Shynvo OS:
            a user states a goal, the system generates a mission, then schedules
            execution through sessions and logs results over time.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-left hover:bg-white/5">
              <div className="text-sm font-semibold text-white">Pass my exam</div>
              <div className="mt-1 text-sm text-white/60">
                Build a focused academic mission
              </div>
            </button>

            <button className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-left hover:bg-white/5">
              <div className="text-sm font-semibold text-white">Launch a project</div>
              <div className="mt-1 text-sm text-white/60">
                Turn an idea into an execution plan
              </div>
            </button>

            <button className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-left hover:bg-white/5">
              <div className="text-sm font-semibold text-white">Improve my skills</div>
              <div className="mt-1 text-sm text-white/60">
                Create a guided improvement path
              </div>
            </button>

            <button className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-left hover:bg-white/5">
              <div className="text-sm font-semibold text-white">Organize my week</div>
              <div className="mt-1 text-sm text-white/60">
                Convert priorities into scheduled sessions
              </div>
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Nexus Status
          </div>

          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Execution Layer</div>
              <div className="mt-1 text-sm text-white/60">Ready</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Mission Engine</div>
              <div className="mt-1 text-sm text-white/60">Structured</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">AI Agent Layer</div>
              <div className="mt-1 text-sm text-white/60">Connected in platform architecture</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
          Sectors
        </div>

        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Enter a sector
        </h2>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-white/70">
          Each sector is a real working area of the OS. This keeps the environment
          professional, navigable, and distinct from the learning structure of
          University Hub.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {SECTORS.map((sector) => (
          <Link
            key={sector.title}
            href={sector.href}
            className={cx(
              "group relative overflow-hidden rounded-3xl border p-5 transition",
              "border-white/10 bg-white/5 hover:bg-white/7 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.14)]"
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-base font-semibold text-white">{sector.title}</div>
                <div className="mt-1 text-sm leading-6 text-white/70">
                  {sector.subtitle}
                </div>
              </div>

              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/75">
                {sector.status}
              </span>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm font-semibold text-white/90 group-hover:text-white">
                Open sector
              </span>

              <span className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M10 7 15 12 10 17"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>

            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="absolute inset-0 bg-[radial-gradient(900px_240px_at_50%_0%,rgba(255,255,255,0.10),transparent_60%)]" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
