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
        Documentation is still being expanded. For now, use this page as the clean route map
        to access all Shynvo environments and active sections.
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
  );
}
