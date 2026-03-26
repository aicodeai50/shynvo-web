import Link from "next/link";

export default function DocsPage() {
  const items = [
    { title: "University Hub", href: "/university", status: "Live" },
    { title: "Shynvo Academy", href: "/academy", status: "New" },
    { title: "Shynvo OS", href: "/os", status: "Live" },
    { title: "Experiments", href: "/experiments", status: "Live" },
    { title: "Enterprise Suite", href: "/enterprise", status: "Live" },
    { title: "Frontier Lab", href: "/frontier", status: "Preview" },
    { title: "Arcade Sim", href: "/arcade", status: "Preview" },
    { title: "Robot assistant", href: "/robot", status: "Live" },
  ];

  const gettingStarted = [
    "Create your account to access Shynvo tools and environments.",
    "Start with the homepage to understand the platform structure.",
    "Open Shynvo Robot if you want guidance on where to begin.",
    "Choose the environment that matches your goal: learn, build, train, or explore.",
  ];

  const platformAreas = [
    {
      title: "Learn",
      desc: "Use University Hub and Shynvo Academy for guided academic and school learning.",
    },
    {
      title: "Build",
      desc: "Use Frontier Lab, Enterprise Suite, and Shynvo OS for creation, systems, and structured workflows.",
    },
    {
      title: "Train and explore",
      desc: "Use Arcade Sim and Experiments for drills, simulations, and AI exploration worlds.",
    },
  ];

  return (
    <section className="py-10 sm:py-14">
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
        >
          ← Back to Home
        </Link>

        <Link
          href="/search"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white"
        >
          Search →
        </Link>
      </div>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
        Documentation
      </div>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
        Platform Guide
      </h1>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
        Shynvo Docs is the starting point for understanding the platform, its environments,
        and where to go next. Use this page to get oriented before entering a specific section.
      </p>

      <section className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
            What this page is
          </div>
          <h2 className="mt-3 text-xl font-semibold text-white">
            A clear starting point for Shynvo
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/72">
            This page helps new users understand what Shynvo contains, how to begin,
            and which environment to choose based on their goal.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
            Need guidance?
          </div>
          <h2 className="mt-3 text-xl font-semibold text-white">
            Start with Shynvo Robot
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/72">
            If you are unsure where to begin, open Shynvo Robot for guided help across
            learning, building, training, and exploration.
          </p>

          <div className="mt-5">
            <Link
              href="/robot"
              className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Open Shynvo Robot
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
          Getting started
        </div>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          First steps inside Shynvo
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {gettingStarted.map((step, index) => (
            <div
              key={step}
              className="rounded-3xl border border-white/10 bg-white/5 p-5"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
                Step {index + 1}
              </div>
              <p className="mt-3 text-sm leading-6 text-white/72">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
          Core platform areas
        </div>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          Choose the area that fits your goal
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {platformAreas.map((area) => (
            <div
              key={area.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-5"
            >
              <h3 className="text-lg font-semibold text-white">{area.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/72">{area.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
          Platform sections
        </div>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          Open active environments and tools
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
          Use the links below as the clean route map to access active Shynvo environments and sections.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/7 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.14)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-base font-semibold text-white">{item.title}</div>
                  <div className="mt-2 text-sm text-white/65">
                    Open this section of the platform.
                  </div>
                </div>

                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/75">
                  {item.status}
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm font-semibold text-white/90 group-hover:text-white">
                  Open
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

      <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
          Support
        </div>
        <h2 className="mt-3 text-xl font-semibold text-white">
          Need help?
        </h2>
        <p className="mt-3 text-sm leading-6 text-white/72">
          If you need platform help, pricing help, or account guidance, use the contact page or email support.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            Contact
          </Link>

          <a
            href="mailto:support@shynvo.app"
            className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            support@shynvo.app
          </a>
        </div>
      </section>
    </section>
  );
}
