// app/components/SiteFooter.tsx
import Link from "next/link";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

const LINKS: FooterLink[] = [
  { label: "Docs", href: "/docs" },
  { label: "Research", href: "/research" },
  { label: "Pricing", href: "/pricing" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Contact", href: "mailto:hi@shynvo.app", external: true }, // ✅ your email
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 mt-14">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-lg font-semibold">Shynvo</div>
            <p className="text-sm text-white/70 mt-2 max-w-sm">
              Multi-environment AI platform for building, learning, and deploying.
            </p>
            <p className="text-sm text-white/70 mt-3">
              Email:{" "}
              <a className="underline" href="mailto:hi@shynvo.app">
                hi@shynvo.app
              </a>
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3">
            {LINKS.map((x) =>
              x.external ? (
                <a
                  key={x.label}
                  href={x.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-white/70 hover:text-white"
                >
                  {x.label}
                </a>
              ) : (
                <Link
                  key={x.label}
                  href={x.href}
                  className="text-sm text-white/70 hover:text-white"
                >
                  {x.label}
                </Link>
              )
            )}
          </nav>
        </div>

        <div className="text-xs text-white/50 mt-10">
          © {new Date().getFullYear()} Shynvo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
