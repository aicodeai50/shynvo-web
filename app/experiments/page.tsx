import Link from "next/link";
import ExperimentsNav from "@/components/experiments/ExperimentsNav";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const LABS = [
  {
    title: "Debate Lab",
    subtitle: "Challenge ideas and decisions from multiple perspectives.",
    href: "/experiments/debate",
    tags: ["Arguments", "Reasoning", "Counterpoints"],
  },
  {
    title: "Simulation Lab",
    subtitle: "Explore possible futures and outcomes before acting.",
    href: "/experiments/simulation",
    tags: ["Scenarios", "Risk", "Forecast"],
  },
  {
    title: "Concept Forge",
    subtitle: "Turn raw ideas into structured concepts and next steps.",
    href: "/experiments/concept",
    tags: ["Ideas", "Strategy", "Innovation"],
  },
  {
    title: "Practice Arena",
    subtitle: "Rehearse real-world situations with AI feedback.",
    href: "/experiments/practice",
    tags: ["Interviews", "Speaking", "Preparation"],
  },
  {
    title: "Experiment Rooms",
    subtitle: "Run collaborative sessions with friends or teammates.",
    href: "/experiments/rooms",
    tags: ["Rooms", "Collaboration", "AI Moderation"],
  },
];

export default function ExperimentsPage() {
  return (
    <section className="py-10 sm:py-14">

      <ExperimentsNav />

      <div className="flex flex-wrap items-start justify-between gap-4">

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-cyan-100/70">
            Experiments
          </div>

          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
            AI Exploration Worlds
          </h1>

          <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
            Experiments is where users test ideas, simulate outcomes, debate choices,
            rehearse situations, and explore possibilities before committing to action.
          </p>

        </div>

        <div className="rounded-2xl border border-cyan-300/15 bg-cyan-400/5 px-4 py-3 text-sm font-semibold text-cyan-100/85">
          Experiment Layer: Active
        </div>

      </div>

      <div className="mt-10">

        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70">
          Exploration Labs
        </div>

        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Choose an environment
        </h2>

        <p className="mt-2 max-w-4xl text-sm leading-6 text-white/70">
          Each lab supports a different kind of thinking: structured reasoning,
          scenario simulation, concept shaping, performance rehearsal, or collaborative sessions.
        </p>

      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

        {LABS.map((lab) => (
          <Link
            key={lab.title}
            href={lab.href}
            className={cx(
              "group relative overflow-hidden rounded-3xl border p-5 transition",
              "border-cyan-300/15 bg-white/5 hover:bg-white/[0.08]"
            )}
          >
            <div className="flex items-start justify-between gap-3">

              <div>
                <div className="text-lg font-semibold text-white">
                  {lab.title}
                </div>

                <div className="mt-2 text-sm leading-6 text-white/70">
                  {lab.subtitle}
                </div>
              </div>

              <span className="rounded-full border border-cyan-300/20 bg-cyan-400/5 px-3 py-1 text-[11px] font-semibold text-cyan-100/85">
                Active
              </span>

            </div>

            <div className="mt-4 flex flex-wrap gap-2">

              {lab.tags.map((tag) => (
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
                Enter Lab
              </span>

            </div>
          </Link>
        ))}

      </div>
    </section>
  );
}
