"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type TimelineSnapshot = {
  today: string;
  week: string;
  plan: string;
};

const STORAGE_KEY = "shynvo_os_timeline_snapshot";

export default function Page() {
  const [snapshot, setSnapshot] = useState<TimelineSnapshot | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSnapshot(JSON.parse(raw) as TimelineSnapshot);
    } catch {
      // ignore
    }
  }, []);

  return (
    <section className="py-10 sm:py-14">
      <Link href="/os/timeline" className="text-sm text-white/70 hover:text-white">
        ← Back to Timeline
      </Link>
      <h1 className="mt-4 text-3xl font-semibold">Planning Logic</h1>
      <p className="mt-3 max-w-3xl text-white/70">
        This page explains the rule behind the schedule: how Shynvo OS should allocate time across urgency, depth, and energy.
      </p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-4 text-white/80">
        {snapshot?.plan || "No planning logic has been saved yet."}
      </div>
    </section>
  );
}
