"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TRIAL_MS = 7 * 24 * 60 * 60 * 1000;
const KEY = "shynvo_trial_started_at";

// Pages that should still be accessible even if trial is expired
const ALLOW_AFTER_EXPIRE_PREFIXES = ["/pricing", "/docs", "/research", "/privacy", "/terms"];

function isAllowedPath(pathname: string) {
  return ALLOW_AFTER_EXPIRE_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export default function TrialGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [expired, setExpired] = useState(false);
  const [remainingDays, setRemainingDays] = useState<number | null>(null);

  const allowed = useMemo(() => isAllowedPath(pathname ?? "/"), [pathname]);

  useEffect(() => {
    try {
      const now = Date.now();
      const existing = localStorage.getItem(KEY);

      let startedAt = existing ? Number(existing) : NaN;

      // Start trial on first visit
      if (!existing || Number.isNaN(startedAt) || startedAt <= 0) {
        startedAt = now;
        localStorage.setItem(KEY, String(startedAt));
      }

      const age = now - startedAt;
      const isExpired = age >= TRIAL_MS;

      const remaining = Math.max(0, TRIAL_MS - age);
      const daysLeft = Math.ceil(remaining / (24 * 60 * 60 * 1000));

      setExpired(isExpired);
      setRemainingDays(daysLeft);
      setReady(true);
    } catch {
      // If localStorage is blocked, fail open (don’t break the site)
      setReady(true);
      setExpired(false);
      setRemainingDays(null);
    }
  }, [pathname]);

  // Avoid hydration flash
  if (!ready) return <>{children}</>;

  // Trial expired AND user is not on an allowed page => show paywall overlay
  if (expired && !allowed) {
    return (
      <div className="min-h-screen bg-[#05070A] text-white px-6 py-16">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="text-xs tracking-[0.22em] text-white/50">TRIAL ENDED</div>
          <h1 className="text-4xl font-semibold">Your 7-day trial has ended</h1>
          <p className="text-white/70">
            To continue using Shynvo buildings, upgrade your plan.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/pricing"
              className="inline-flex justify-center rounded-2xl border border-white/10 bg-white/15 px-5 py-3 text-sm font-medium hover:bg-white/20 transition"
            >
              View pricing
            </Link>
            <a
              href="mailto:hi@shynvo.app?subject=Shynvo%20Upgrade%20Request"
              className="inline-flex justify-center rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm hover:bg-white/15 transition"
            >
              Contact support
            </a>
          </div>

          <div className="text-xs text-white/45">
            Note: trial tracking is currently device-based (no login yet).
          </div>
        </div>
      </div>
    );
  }

  // Trial active => optionally show a small banner at top
  return (
    <>
      {!allowed && remainingDays !== null ? (
        <div className="border-b border-white/10 bg-black/30">
          <div className="mx-auto max-w-6xl px-6 py-2 text-xs text-white/60 flex items-center justify-between">
            <div>
              Trial: <span className="text-white">{remainingDays}</span> day(s) left
            </div>
            <Link href="/pricing" className="text-white/80 hover:text-white underline">
              Upgrade
            </Link>
          </div>
        </div>
      ) : null}
      {children}
    </>
  );
}
