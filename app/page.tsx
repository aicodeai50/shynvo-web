import Link from "next/link";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const ENVIRONMENTS = [
  {
    key: "university",
    title: "University Hub",
    subtitle: "Structured Academic Campus",
    desc: "Guided study systems, exam preparation, and faculty-based learning environments.",
    tags: ["Study", "Exams", "Career"],
    href: "/university",
  },
  {
    key: "academy",
    title: "Shynvo Academy",
    subtitle: "School Learning World",
    desc: "Junior and senior high school learning, subject rooms, tutors, and classroom workshops.",
    tags: ["School", "Subjects", "Badges"],
    href: "/academy",
  },
  {
    key: "os",
    title: "Shynvo OS",
    subtitle: "Dimensional Execution Cockpit",
    desc: "Missions, focus systems, AI agents, and strategic orchestration in one cockpit.",
    tags: ["Missions", "Focus", "Terminal"],
    href: "/os",
  },
  {
    key: "experiments",
    title: "Experiments",
    subtitle: "AI Exploration Worlds",
    desc: "Standalone worlds for thinking, debate, simulation, and concept development.",
    tags: ["Debate", "Simulation", "Concepts"],
    href: "/experiments",
  },
  {
    key: "enterprise",
    title: "Enterprise Suite",
    subtitle: "Organizational Intelligence System",
    desc: "Admin tools, skill matrices, team missions, and analytics for organizations.",
    tags: ["Teams", "OKRs", "Analytics"],
    href: "/enterprise",
  },
  {
    key: "frontier",
    title: "Frontier Lab",
    subtitle: "Engineering District",
    desc: "Coding, programming logic, algorithms, system puzzles, and technical skill building.",
    tags: ["Code", "Algorithms", "Build"],
    href: "/frontier",
  },
  {
    key: "arcade",
    title: "Arcade Sim",
    subtitle: "Interactive Game Arena",
    desc: "Game-based skill worlds, reaction drills, progression loops, and playful challenge modes.",
    tags: ["Games", "Drills", "Progress"],
    href: "/arcade",
  },
];

export default function HomePage() {
  return (
    <section className="relative overflow-hidden py-6 sm:py-8 lg:py-10">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <video
          className="h-full w-full object-cover opacity-22"
          src="/shynvo-wallpaper.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-[#07090d]/62" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_18%_12%,rgba(255,255,255,0.05),transparent_52%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_620px_at_78%_18%,rgba(86,196,255,0.05),transparent_48%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_720px_at_50%_100%,rgba(255,255,255,0.03),transparent_55%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-start gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-black/20 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-sm sm:p-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.85)]" />
              Structured Intelligence Platform
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Shynvo
            </h1>

            <h2 className="mt-3 max-w-3xl text-xl font-medium tracking-tight text-white/92 sm:text-5xl">
              Architecture of Applied Intelligence
            </h2>

            <p className="mt-5 max-w-3xl text-base leading-9 text-white/78">
              A multi-environment intelligence platform for learning, execution, strategy,
              resilience, organizational growth, coding, and skill development.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="#environments"
                className="inline-flex items-center rounded-2xl bg-white px-7 py-4 text-base font-semibold text-[#0B0F14] transition hover:bg-white/90"
              >
                Enter Platform
              </Link>

              <Link
                href="/docs"
                className="inline-flex items-center rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-4 text-base font-semibold text-white/90 transition hover:bg-white/[0.08]"
              >
                Read Docs
              </Link>
            </div>

            <p className="mt-5 text-sm leading-6 text-white/64">
              Trial: full access for 7 days. Robot is included during trial; upgrade required after.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-black/20 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-sm overflow-hidden">
            <Link href="/robot" className="group block h-full">
              <div className="relative h-[200px] sm:h-[220px] lg:h-[240px] w-full overflow-hidden border-b border-white/10 bg-black/30">
                <video
                  className="h-full w-full object-cover"
                  src="/robot.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-2xl font-semibold text-white">Shynvo Robot</div>
                    <div className="mt-1 text-base text-white/75">
                      Open multilingual robot experience
                    </div>
                  </div>

                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/80 transition group-hover:bg-white/[0.09] group-hover:text-white">
                    →
                  </span>
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-base leading-7 text-white/86">
                  Welcome to Shynvo Robot. Click to enter the multilingual robot experience.
                </div>

                <div className="mt-4 text-base text-white/66">
                  Click the chamber to open the robot trial experience.
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div id="environments" className="mt-14 border-t border-white/10 pt-12">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Environments
          </div>

          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Explore the buildings
          </h2>

          <p className="mt-4 max-w-4xl text-lg leading-8 text-white/72">
            Each building is a purpose-built system with its own departments, identity, and workflows.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {ENVIRONMENTS.map((env) => (
              <Link
                key={env.key}
                href={env.href}
                className={cx(
                  "group relative overflow-hidden rounded-[2rem] border p-6 transition",
                  "border-white/10 bg-white/[0.04] hover:bg-white/[0.06] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full border border-white/10 bg-white/[0.06]" />
                    <div>
                      <div className="text-2xl font-semibold text-white">{env.title}</div>
                      <div className="mt-1 text-sm text-white/62">{env.subtitle}</div>
                    </div>
                  </div>

                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/80 transition group-hover:bg-white/[0.1] group-hover:text-white">
                    →
                  </span>
                </div>

                <p className="mt-6 text-lg leading-8 text-white/74">{env.desc}</p>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  {env.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-white/72"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-7 text-xl font-semibold text-white/95">
                  Open
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
