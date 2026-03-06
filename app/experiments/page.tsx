import Link from "next/link";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type ExperimentArea = {
  title: string;
  subtitle: string;
  href: string;
  status: string;
  tags: string[];
};

const AREAS: ExperimentArea[] = [
  {
    title: "Debate Lab",
    subtitle:
      "Test both sides of arguments, decisions, and beliefs with structured AI reasoning.",
    href: "/experiments/debate",
    status: "Active",
    tags: ["Debate", "Reasoning", "Decision"],
  },
  {
    title: "Simulation Lab",
    subtitle:
      "Run what-if scenarios across study, work, product, and life situations.",
    href: "/experiments/simulation",
    status: "Active",
    tags: ["Scenarios", "Risk", "Outcomes"],
  },
  {
    title: "Concept Forge",
    subtitle:
      "Turn rough ideas into clearer concepts, positioning, and next-step plans.",
    href: "/experiments/concept-forge",
    status: "Active",
    tags: ["Ideas", "Clarity", "Structure"],
  },
  {
    title: "Practice Arena",
    subtitle:
      "Rehearse interviews, oral exams, presentations, pitches, and difficult conversations.",
    href: "/experiments/practice",
    status: "Active",
    tags: ["Practice", "Feedback", "Performance"],
  },
  {
    title: "Experiment Rooms",
    subtitle:
      "Create structured group rooms with friends, classmates, or teammates and let AI moderate the session.",
    href: "/experiments/rooms",
    status: "Active",
    tags: ["Groups", "Rooms", "Collaboration"],
  },
];

export default function ExperimentsPage() {
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
            Experiments
          </div>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
            AI Exploration Worlds
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
            Experiments is the Shynvo environment for testing ideas before commitment.
            Users can debate choices, simulate outcomes, shape concepts, rehearse real
            situations, and run structured group rooms with AI support.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
          Experiment Layer: Online
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Core Purpose
          </div>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Test before you commit
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
            This environment helps users think through important choices before they
            turn them into study paths, projects, or execution missions. It is where
            raw ideas become clearer and risky assumptions get challenged.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link
              href="/experiments/debate"
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 hover:bg-white/5"
            >
              <div className="text-sm font-semibold text-white">Debate a decision</div>
              <div className="mt-1 text-sm text-white/60">
                See both sides before choosing
              </div>
            </Link>

            <Link
              href="/experiments/simulation"
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 hover:bg-white/5"
            >
              <div className="text-sm font-semibold text-white">Simulate a scenario</div>
              <div className="mt-1 text-sm text-white/60">
                Explore likely outcomes and risks
              </div>
            </Link>

            <Link
              href="/experiments/concept-forge"
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 hover:bg-white/5"
            >
              <div className="text-sm font-semibold text-white">Forge an idea</div>
              <div className="mt-1 text-sm text-white/60">
                Turn raw thoughts into something structured
              </div>
            </Link>

            <Link
              href="/experiments/practice"
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 hover:bg-white/5"
            >
              <div className="text-sm font-semibold text-white">Practice for real life</div>
              <div className="mt-1 text-sm text-white/60">
                Rehearse and get performance feedback
              </div>
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Environment Status
          </div>

          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Reasoning Layer</div>
              <div className="mt-1 text-sm text-white/60">
                Ready for structured analysis
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Simulation Layer</div>
              <div className="mt-1 text-sm text-white/60">
                Ready for scenario exploration
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Collaboration Layer</div>
              <div className="mt-1 text-sm text-white/60">
                Room-based experiments supported
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
          Experiment Areas
        </div>

        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Enter a lab
        </h2>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-white/70">
          Each lab has a distinct job inside Experiments. This keeps the environment
          useful, professional, and clearly different from University Hub and Shynvo OS.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {AREAS.map((area) => (
          <Link
            key={area.title}
            href={area.href}
            className={cx(
              "group relative overflow-hidden rounded-3xl border p-5 transition",
              "border-white/10 bg-white/5 hover:bg-white/7 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.14)]"
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-base font-semibold text-white">{area.title}</div>
                <div className="mt-1 text-sm leading-6 text-white/70">
                  {area.subtitle}
                </div>
              </div>

              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/75">
                {area.status}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {area.tags.map((tag) => (
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
                Open lab
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
