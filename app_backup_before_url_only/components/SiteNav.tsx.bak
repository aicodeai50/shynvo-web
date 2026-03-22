"use client";

import LanguageSelector from "@/_components/LanguageSelector";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function SiteNav() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0F14]/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="Shynvo home">
          <ShynvoLogo />
          <span className="text-sm font-semibold tracking-wide text-white">Shynvo</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/pricing" className="text-sm text-white/80 hover:text-white">
            {t("nav.pricing")}
          </Link>
          <Link href="/docs" className="text-sm text-white/80 hover:text-white">
            {t("nav.docs")}
          </Link>
          <Link href="/contact" className="text-sm text-white/80 hover:text-white">
            {t("nav.contact")}
          </Link>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <IconButton label={t("search.label")} href="/search" icon="search" />
          <LanguageSelector />
          <Link
            href="/sign-up"
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
          >
            {t("nav.createAccount")}
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <IconButton label={t("search.label")} href="/search" icon="search" />
          <button
            onClick={() => setOpen(true)}
            className="rounded-xl p-2 ring-1 ring-white/15 hover:bg-white/5"
            aria-label={t("nav.menu")}
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      <div className={cx("md:hidden", open ? "block" : "hidden")}>
        <div className="fixed inset-0 z-50 bg-black/60" onClick={() => setOpen(false)} aria-hidden="true" />
        <div className="fixed right-0 top-0 z-50 h-full w-[86%] max-w-sm border-l border-white/10 bg-[#0B0F14] p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-white">{t("nav.menu")}</span>
            <button
              onClick={() => setOpen(false)}
              className="rounded-xl p-2 ring-1 ring-white/15 hover:bg-white/5"
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="mt-4 space-y-2">
            <Link
              href="/pricing"
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm text-white/85 ring-1 ring-white/10 hover:bg-white/5"
            >
              {t("nav.pricing")}
            </Link>
            <Link
              href="/docs"
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm text-white/85 ring-1 ring-white/10 hover:bg-white/5"
            >
              {t("nav.docs")}
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm text-white/85 ring-1 ring-white/10 hover:bg-white/5"
            >
              {t("nav.contact")}
            </Link>
          </div>

          <div className="my-4 border-t border-white/10" />

          <div className="mb-4">
            <LanguageSelector />
          </div>

          <Link
            href="/sign-up"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-[#0B0F14]"
          >
            {t("nav.createAccount")}
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
