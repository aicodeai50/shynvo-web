import Link from "next/link";

const LINKS = [
  { label: "Docs", href: "/docs" },
  { label: "Research", href: "/research" },
  { label: "University Hub", href: "/university" },
  { label: "Contact", href: "mailto:hi@shynvo.app", external: true },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
] as const;

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-black/20">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <div className="text-base font-semibold text-white">Shynvo</div>
            <p className="max-w-sm text-sm text-white/60">
              A multi-environment AI platform: structured buildings for study, strategy, execution, and growth.
            </p>
            <div className="text-sm text-white/60">
              <span className="text-white/50">Email:</span>{" "}
              <a className="text-white hover:underline" href="mailto:hi@shynvo.app">
                hi@shynvo.app
              </a>
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3">
            {LINKS.map((x) =>
              x.external ? (
                <a
                  key={x.label}
                  href={x.href}
                  className="text-sm text-white/70 hover:text-white transition"
                >
                  {x.label}
                </a>
              ) : (
                <Link
                  key={x.label}
                  href={x.href}
                  className="text-sm text-white/70 hover:text-white transition"
                >
                  {x.label}
                </Link>
              )
            )}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-white/45">
            © {new Date().getFullYear()} Shynvo. All rights reserved.
          </div>
          <div className="text-xs text-white/45">
            Built for international users · Language switch on top bar
          </div>
        </div>
      </div>
    </footer>
  );
}
