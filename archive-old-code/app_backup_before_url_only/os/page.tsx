import Link from "next/link";
import OsNav from "@/components/os/OsNav";
import { OS_SECTORS } from "@/_lib/os/data";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function OsPage() {
  return (
    <section className="py-10 sm:py-14">
      <OsNav />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
            Shynvo OS
          </div>

          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
            Orbital Nexus
          </h1>

          <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
            Shynvo OS is the execution environment of the platform. It helps users move from goal
            to mission to session, with structured control over planning, focus, logs, cognitive
            state, and AI assistance.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-300/15 bg-emerald-400/5 px-4 py-3 text-sm font-semibold text-emerald-100/85">
          System Status: Online
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/70">
            Daily Command
          </div>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Define what you want to achieve
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
            In the full system, this command layer becomes the engine of Shynvo OS:
            a user states a goal, the system generates a mission, then schedules execution
            through sessions and logs results over time.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-lg font-semibold text-white">Pass my exam</div>
              <div className="mt-1 text-sm text-white/70">Build a focused academic mission</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-lg font-semibold text-white">Launch a project</div>
              <div className="mt-1 text-sm text-white/70">Turn an idea into an execution plan</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-lg font-semibold text-white">Improve my skills</div>
              <div className="mt-1 text-sm text-white/70">Create a guided improvement path</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-lg font-semibold text-white">Organize my week</div>
              <div className="mt-1 text-sm text-white/70">Convert priorities into scheduled sessions</div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/70">
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
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/70">
          Sectors
        </div>

        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Enter a sector
        </h2>

        <p className="mt-2 max-w-4xl text-sm leading-6 text-white/70">
          Each sector is a real working area of the OS. This keeps the environment professional,
          navigable, and distinct from the learning structure of University Hub.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {OS_SECTORS.map((sector) => (
          <Link
            key={sector.key}
            href={sector.href}
            className={cx(
              "group relative overflow-hidden rounded-3xl border p-5 transition",
              "border-emerald-300/15 bg-white/5 hover:bg-white/[0.08] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.14)]"
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold text-white">{sector.title}</div>
                <div className="mt-2 text-sm leading-6 text-white/70">{sector.subtitle}</div>
              </div>

              <span className="rounded-full border border-emerald-300/20 bg-emerald-400/5 px-3 py-1 text-[11px] font-semibold text-emerald-100/85">
                {sector.status}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {sector.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70"
                >
                  {tag}
                </span>
              ))}
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
          </Link>
        ))}
      </div>
    </section>
  );
}
