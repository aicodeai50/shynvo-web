import Link from "next/link";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const LABS = [
  {
    href: "/frontier/coding",
    title: "Coding Arena",
    desc: "AI-assisted build workspace for products, websites, tools, games, and Python learning.",
    tags: ["Build", "AI Guidance", "Projects"],
    status: "Adaptive",
    next: "Generate build direction",
  },
  {
    href: "/frontier/algorithms",
    title: "Algorithm Challenges",
    desc: "AI reasoning chamber for system problems, graphs, scheduling, and structured engineering logic.",
    tags: ["Graphs", "Logic", "Systems"],
    status: "Reasoning",
    next: "Detect problem type",
  },
  {
    href: "/frontier/ai-bots",
    title: "AI Bot Lab",
    desc: "Experiment with AI mode, tone, purpose, and response behavior under the same prompt.",
    tags: ["AI", "Modes", "Prompting"],
    status: "Simulation",
    next: "Compare assistant styles",
  },
  {
    href: "/frontier/puzzles",
    title: "Logic Puzzles",
    desc: "Train deduction with layered hints, staged reveal, and guided reasoning progression.",
    tags: ["Puzzles", "Hints", "Practice"],
    status: "Training",
    next: "Reveal next move",
  },
];

const SIGNALS = [
  {
    title: "AI Guidance",
    value: "Active",
    helper: "Every lab route now responds like an interactive AI workspace.",
  },
  {
    title: "User Direction",
    value: "Improved",
    helper: "Each area is designed to interpret, guide, and continue the workflow.",
  },
  {
    title: "Lab Feel",
    value: "Future-facing",
    helper: "Frontier is being shaped as a living AI environment rather than a static menu.",
  },
];

export default function FrontierLabPage() {
  return (
    <section className="relative py-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_480px_at_18%_10%,rgba(132,204,22,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_82%_16%,rgba(34,197,94,0.12),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_560px_at_50%_100%,rgba(59,130,246,0.07),transparent_60%)]" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white"
        >
          ← Back
        </Link>
        <Link
          href="/"
          className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white"
        >
          Home
        </Link>
        <span className="inline-flex items-center rounded-xl border border-lime-400/20 bg-lime-400/10 px-3 py-2 text-sm text-lime-100">
          Frontier Lab
        </span>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-200/70">
            Frontier Lab
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Engineering District
          </h1>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
            Frontier Lab is the technical creation environment of Shynvo. It is built for users who
            want AI guidance while building, reasoning, testing assistant behavior, and solving
            logic challenges. Each area should continue the user journey, not stop at a card.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {SIGNALS.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                  {item.title}
                </div>
                <div className="mt-2 text-lg font-semibold text-white">{item.value}</div>
                <div className="mt-1 text-sm text-white/60">{item.helper}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-lime-400/20 bg-lime-400/10 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-100/70">
            AI Routing Layer
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Frontier now guides instead of only displaying
          </h2>
          <div className="mt-4 space-y-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
              Coding Arena interprets project goals and shapes build flow.
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
              Algorithm Challenges detects reasoning type and recommends the route.
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
              AI Bot Lab compares how the same prompt behaves under different assistant modes.
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
              Logic Puzzles trains deduction through hints, reveal levels, and progression.
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {LABS.map((lab) => (
          <Link
            key={lab.href}
            href={lab.href}
            className={cx(
              "group rounded-3xl border p-5 transition",
              "border-white/10 bg-white/5 hover:bg-white/[0.07] hover:shadow-[0_0_0_1px_rgba(163,230,53,0.22)]"
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-lg font-semibold text-white">{lab.title}</div>
              <span className="rounded-full border border-lime-400/20 bg-lime-400/10 px-2.5 py-1 text-[11px] text-lime-100">
                {lab.status}
              </span>
            </div>

            <p className="mt-3 text-sm leading-6 text-white/70">{lab.desc}</p>

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

            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-3">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                AI next action
              </div>
              <div className="mt-1 text-sm text-white/80">{lab.next}</div>
            </div>

            <div className="mt-5 text-sm font-semibold text-lime-200 group-hover:text-lime-100">
              Open AI workspace →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
