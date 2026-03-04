"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export default function SiteNav() {
  const [openSearch, setOpenSearch] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const languages = useMemo(
    () => [
      { code: "en", name: "English" },
      { code: "fr", name: "Français" },
      { code: "es", name: "Español" },
      { code: "ar", name: "العربية" },
    ],
    []
  );

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#05070A]/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-semibold text-white tracking-wide">
              SHYNVO
            </Link>
            <span className="hidden sm:inline text-xs text-white/45">
              Multi-environment AI platform
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
            <Link href="/university" className="hover:text-white transition">University Hub</Link>
            <Link href="/os" className="hover:text-white transition">Shynvo OS</Link>
            <Link href="/experiments" className="hover:text-white transition">Experiments</Link>
            <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
            <Link href="/docs" className="hover:text-white transition">Docs</Link>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpenSearch(true)}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10 transition"
            >
              Search
            </button>

            <div className="relative">
              <button
                onClick={() => setLangOpen((v) => !v)}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10 transition"
              >
                Language
              </button>

              {langOpen ? (
                <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-2xl border border-white/10 bg-[#05070A] shadow-xl">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLangOpen(false);
                        // Placeholder: later integrate i18n
                        alert(`Language set to ${l.name} (placeholder)`);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-white/80 hover:bg-white/10"
                    >
                      {l.name}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <a
              href="mailto:hi@shynvo.app"
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10 transition"
            >
              Contact
            </a>

            <Link
              href="/pricing"
              className="hidden sm:inline-flex rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/15 transition"
            >
              Upgrade
            </Link>
          </div>
        </div>

        {/* mobile nav */}
        <div className="md:hidden border-t border-white/10">
          <div className="mx-auto max-w-6xl px-6 py-3 flex gap-3 overflow-x-auto text-sm text-white/70">
            <Link href="/university" className="whitespace-nowrap hover:text-white">University</Link>
            <Link href="/os" className="whitespace-nowrap hover:text-white">OS</Link>
            <Link href="/experiments" className="whitespace-nowrap hover:text-white">Experiments</Link>
            <Link href="/pricing" className="whitespace-nowrap hover:text-white">Pricing</Link>
            <Link href="/docs" className="whitespace-nowrap hover:text-white">Docs</Link>
          </div>
        </div>
      </header>

      {/* Search modal */}
      {openSearch ? (
        <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm">
          <div className="mx-auto max-w-2xl px-6 py-16">
            <div className="rounded-3xl border border-white/10 bg-[#05070A] p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs tracking-[0.22em] text-white/50">SEARCH</div>
                  <div className="text-xl font-semibold">Find buildings, departments, pages</div>
                </div>
                <button
                  onClick={() => setOpenSearch(false)}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10 transition"
                >
                  Close
                </button>
              </div>

              <input
                autoFocus
                placeholder="Type to search… (placeholder)"
                className="mt-4 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-white/20"
              />

              <div className="mt-4 text-sm text-white/60">
                Next: connect search to a real index across buildings.
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
