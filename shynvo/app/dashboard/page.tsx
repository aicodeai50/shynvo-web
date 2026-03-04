"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

function daysLeft(trialEndsAt?: string | null) {
  if (!trialEndsAt) return null;
  const end = new Date(trialEndsAt).getTime();
  const now = Date.now();
  const diff = end - now;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const res = await api("/auth/me");
      if (!res.user) {
        router.push("/login");
        return;
      }
      setUser(res.user);
      setLoading(false);
    })();
  }, [router]);

  const left = useMemo(() => daysLeft(user?.trialEndsAt), [user?.trialEndsAt]);
  const locked = user ? !user.access : false;

  if (loading) return <div className="min-h-screen bg-[#05070A] text-white p-10">Loading...</div>;

  return (
    <main className="min-h-screen bg-[#05070A] text-white px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs tracking-[0.22em] text-white/50">DASHBOARD</div>
            <h1 className="mt-2 text-3xl font-semibold">Welcome back</h1>
            <p className="mt-1 text-white/60">{user?.email}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm text-white/70">
              Plan: <span className="text-white">{user?.plan}</span>
            </div>
            <div className="text-sm text-white/70">
              Trial:{" "}
              <span className="text-white">
                {user?.trialActive ? `${left ?? "?"} day(s) left` : "Ended"}
              </span>
            </div>
            <div className="mt-3">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:opacity-90"
              >
                Upgrade
              </Link>
            </div>
          </div>
        </header>

        {locked ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-lg font-semibold">Trial ended</div>
            <p className="mt-2 text-white/65 max-w-2xl">
              To keep using Shynvo environments, upgrade to Pro or Team.
            </p>
            <div className="mt-4">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:opacity-90"
              >
                View plans
              </Link>
            </div>
          </div>
        ) : (
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/university" className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition">
              <div className="text-lg font-semibold">University Hub</div>
              <div className="mt-2 text-sm text-white/65">Structured academic campus.</div>
              <div className="mt-4 text-sm text-white/80">Enter →</div>
            </Link>

            <Link href="/os" className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition">
              <div className="text-lg font-semibold">Shynvo OS</div>
              <div className="mt-2 text-sm text-white/65">Dimensional cockpit + VM sectors.</div>
              <div className="mt-4 text-sm text-white/80">Enter →</div>
            </Link>

            <Link href="/experiments" className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition">
              <div className="text-lg font-semibold">Experiments (BETA)</div>
              <div className="mt-2 text-sm text-white/65">Standalone AI worlds.</div>
              <div className="mt-4 text-sm text-white/80">Explore →</div>
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}
