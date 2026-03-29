"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TRIAL_MS = 7 * 24 * 60 * 60 * 1000;
const KEY = "shynvo_trial_started_at";

/** Only these paths are trial-gated */
const GATED_PREFIXES = ["/robot"];

function isGatedPath(pathname: string) {
  return GATED_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export default function TrialGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const gated = useMemo(() => isGatedPath(pathname), [pathname]);

  const [ready, setReady] = useState(false);
  const [expired, setExpired] = useState(false);
  const [remainingDays, setRemainingDays] = useState<number | null>(null);

  useEffect(() => {
    // If page isn't gated, don't do anything (no banner, no paywall)
    if (!gated) {
      setReady(true);
      return;
    }

    try {
      const now = Date.now();
      const existing = localStorage.getItem(KEY);

      let startedAt = existing ? Number(existing) : NaN;

      // Start trial on first visit to any gated page
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
      // If localStorage is blocked, fail open
      setReady(true);
      setExpired(false);
      setRemainingDays(null);
    }
  }, [pathname, gated]);

  if (!ready) return <>{children}</>;

  // Trial expired and user is on a gated page => show paywall screen
  if (gated && expired) {
    return (
      <div className="min-h-screen bg-[#05070A] text-white px-6 py-16">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="text-xs tracking-[0.22em] text-white/50">TRIAL ENDED</div>
          <h1 className="text-4xl font-semibold">Your 7-day robot trial has ended</h1>
          <p className="text-white/70">
            To continue using the cinematic robot experience, upgrade your plan.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/pricing"
              className="inline-flex justify-center rounded-2xl border border-white/10 bg-white/15 px-5 py-3 text-sm font-medium hover:bg-white/20 transition"
            >
              View pricing
            </Link>
            <a
              href="mailto:hi@shynvo.app?subject=Shynvo%20Robot%20Upgrade%20Request"
              className="inline-flex justify-center rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm hover:bg-white/15 transition"
            >
              Contact support
            </a>
          </div>

          <Link href="/" className="text-sm text-white/70 underline hover:text-white">
            Back to Home
          </Link>

          <div className="text-xs text-white/45">
            Note: trial is device-based for now.
          </div>
        </div>
      </div>
    );
  }

  // Trial active and on gated page => show small banner
  return (
    <>
      {gated && remainingDays !== null ? (
        <div className="border-b border-white/10 bg-black/30">
          <div className="mx-auto max-w-6xl px-6 py-2 text-xs text-white/60 flex items-center justify-between">
            <div>
              Robot trial: <span className="text-white">{remainingDays}</span> day(s) left
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