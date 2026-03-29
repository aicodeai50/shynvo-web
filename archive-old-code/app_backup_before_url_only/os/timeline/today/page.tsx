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
      <h1 className="mt-4 text-3xl font-semibold">Today</h1>
      <p className="mt-3 max-w-3xl text-white/70">
        This page shows what should happen next today so the user has a realistic execution target instead of scattered action.
      </p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-4 text-white/80">
        {snapshot?.today || "No timeline for today has been saved yet."}
      </div>
    </section>
  );
}
