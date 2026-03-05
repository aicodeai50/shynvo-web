"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function SiteNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0F14]/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        {/* Left: Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-white/10 ring-1 ring-white/15" />
          <span className="text-sm font-semibold tracking-wide text-white">Shynvo</span>
        </Link>

        {/* Center: minimal, no repetition */}
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#pricing" className="text-sm text-white/80 hover:text-white">
            Pricing
          </a>
          <Link href="/docs" className="text-sm text-white/80 hover:text-white">
            Docs
          </Link>
          <Link href="/contact" className="text-sm text-white/80 hover:text-white">
            Contact
          </Link>
        </nav>

        {/* Right: icons + create account */}
        <div className="hidden items-center gap-2 md:flex">
          {/* Search (placeholder link for now) */}
          <IconButton label="Search" href="/search" icon="search" />
          {/* Language (placeholder link for now) */}
          <IconButton label="Language" href="/language" icon="globe" />

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
          <IconButton label="Language" href="/language" icon="globe" />
          <button
            onClick={() => setOpen(true)}
            className="rounded-xl p-2 ring-1 ring-white/15 hover:bg-white/5"
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>
        </div>
      </div>

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
              href="#pricing"
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
    <Link
      href={href}
      className="rounded-xl p-2 ring-1 ring-white/15 hover:bg-white/5"
      aria-label={label}
      title={label}
    >
      {icon === "search" ? <SearchIcon /> : <GlobeIcon />}
    </Link>
  );
}

/* Icons */

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M16.5 16.5 21 21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M2 12h20" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 2c3 3 3 17 0 20-3-3-3-17 0-20Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 12h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 7l10 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17 7 7 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}