"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const LANGS = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "de", label: "Deutsch" },
  { code: "ar", label: "العربية" },
  { code: "sw", label: "Kiswahili" },
];

const LANG_KEY = "shynvo_lang";

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved) setLang(saved);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setLangOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function setLanguage(code: string) {
    setLang(code);
    setLangOpen(false);
    try {
      localStorage.setItem(LANG_KEY, code);
    } catch {
      // ignore
    }
  }

  const currentLangLabel = useMemo(() => {
    return LANGS.find((l) => l.code === lang)?.label ?? "English";
  }, [lang]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0F14]/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        {/* Left: Brand */}
        <Link href="/" className="flex items-center gap-2" aria-label="Shynvo home">
          <ShynvoLogo />
          <span className="text-sm font-semibold tracking-wide text-white">Shynvo</span>
        </Link>

        {/* Center nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <a href="/pricing" className="text-sm text-white/80 hover:text-white">
            Pricing
          </a>
          <Link href="/docs" className="text-sm text-white/80 hover:text-white">
            Docs
          </Link>
          <Link href="/contact" className="text-sm text-white/80 hover:text-white">
            Contact
          </Link>
        </nav>

        {/* Right: actions */}
        <div className="hidden items-center gap-2 md:flex">
          <IconButton label="Search" href="/search" icon="search" />

          {/* Language dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-2 rounded-xl px-3 py-2 ring-1 ring-white/15 hover:bg-white/5"
              aria-label="Select language"
            >
              <GlobeIcon />
              <span className="text-sm text-white/85">{currentLangLabel}</span>
              <ChevronDown />
            </button>

            {langOpen ? (
              <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F14] shadow-lg">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    className={cx(
                      "w-full px-4 py-3 text-left text-sm hover:bg-white/5",
                      l.code === lang ? "text-white" : "text-white/75"
                    )}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <Link
            href="/signup"
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
          >
            Create account
          </Link>
        </div>

        {/* Mobile: icons + menu */}
        <div className="flex items-center gap-2 md:hidden">
          <IconButton label="Search" href="/search" icon="search" />

          <button
            type="button"
            onClick={() => setLangOpen((v) => !v)}
            className="rounded-xl p-2 ring-1 ring-white/15 hover:bg-white/5"
            aria-label="Language"
            title="Language"
          >
            <GlobeIcon />
          </button>

          <button
            onClick={() => setOpen(true)}
            className="rounded-xl p-2 ring-1 ring-white/15 hover:bg-white/5"
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {/* Mobile language dropdown */}
      {langOpen ? (
        <div className="md:hidden border-t border-white/10 bg-[#0B0F14]">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-2">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={cx(
                    "rounded-xl px-3 py-2 text-left text-sm ring-1 ring-white/10 hover:bg-white/5",
                    l.code === lang ? "text-white" : "text-white/75"
                  )}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {/* Mobile drawer */}
      <div className={cx("md:hidden", open ? "block" : "hidden")}>
        <div className="fixed inset-0 z-50 bg-black/60" onClick={() => setOpen(false)} aria-hidden="true" />
        <div className="fixed right-0 top-0 z-50 h-full w-[86%] max-w-sm border-l border-white/10 bg-[#0B0F14] p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-white">Menu</span>
            <button
              onClick={() => setOpen(false)}
              className="rounded-xl p-2 ring-1 ring-white/15 hover:bg-white/5"
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="mt-4 space-y-2">
            <a
              href="/pricing"
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm text-white/85 ring-1 ring-white/10 hover:bg-white/5"
            >
              Pricing
            </a>
            <Link
              href="/docs"
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm text-white/85 ring-1 ring-white/10 hover:bg-white/5"
            >
              Docs
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm text-white/85 ring-1 ring-white/10 hover:bg-white/5"
            >
              Contact
            </Link>
          </div>

          <div className="my-4 border-t border-white/10" />

          <Link
            href="/signup"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-[#0B0F14]"
          >
            Create account
          </Link>
        </div>
      </div>
    </header>
  );
}

function IconButton({ label, href, icon }: { label: string; href: string; icon: "search" | "globe" }) {
  return (
    <Link href={href} className="rounded-xl p-2 ring-1 ring-white/15 hover:bg-white/5" aria-label={label} title={label}>
      {icon === "search" ? <SearchIcon /> : <GlobeIcon />}
    </Link>
  );
}

/* Logo */

function ShynvoLogo() {
  return (
    <svg width="30" height="30" viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <circle cx="50" cy="50" r="10" fill="white" />
      <ellipse cx="50" cy="50" rx="34" ry="18" stroke="white" strokeWidth="3" opacity="0.9" />
      <ellipse cx="50" cy="50" rx="18" ry="34" stroke="white" strokeWidth="2" opacity="0.6" />
      <circle cx="84" cy="50" r="3" fill="white" />
      <circle cx="16" cy="50" r="3" fill="white" />
      <circle cx="50" cy="16" r="3" fill="white" />
      <circle cx="50" cy="84" r="3" fill="white" />
    </svg>
  );
}

/* Icons */

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M16.5 16.5 21 21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M2 12h20" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 2c3 3 3 17 0 20-3-3-3-17 0-20Z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 12h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 7l10 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17 7 7 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}