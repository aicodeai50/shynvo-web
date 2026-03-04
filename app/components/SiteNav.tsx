"use client";

import Link from "next/link";
import { useState } from "react";

export default function SiteNav() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/university", label: "University Hub" },
    { href: "/os", label: "Shynvo OS" },
    { href: "/experiments", label: "Experiments" },
    { href: "/pricing", label: "Pricing" },
    { href: "/docs", label: "Docs" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#05070A]/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="font-semibold tracking-wide text-white">
          SHYNVO
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-white transition">
              {l.label}
            </Link>
          ))}
          <a href="mailto:hi@shynvo.app" className="hover:text-white transition">
            Contact
          </a>
        </nav>

        <div className="md:hidden">
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10 transition"
          >
            Menu
          </button>
        </div>
      </div>

      {open ? (
        <div className="md:hidden border-t border-white/10">
          <div className="mx-auto max-w-6xl px-6 py-3 flex flex-col gap-3 text-sm text-white/70">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="hover:text-white transition"
              >
                {l.label}
              </Link>
            ))}
            <a href="mailto:hi@shynvo.app" className="hover:text-white transition">
              Contact
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
