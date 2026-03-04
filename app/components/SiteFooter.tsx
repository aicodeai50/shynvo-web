import Link from "next/link";

type FooterLink = { label: string; href: string; external?: boolean };

const LINKS: FooterLink[] = [
  { label: "Docs", href: "/docs" },
  { label: "Research", href: "/research" },
  { label: "University Hub", href: "/university" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10">
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

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/50">
          © {new Date().getFullYear()} Shynvo · 7-day free trial
        </div>
      </div>
    </footer>
  );
}
