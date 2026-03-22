"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type MissionSnapshot = {
  goal: string;
  mission: string;
  saved: string[];
};

const STORAGE_KEY = "shynvo_os_missions_snapshot";

export default function Page() {
  const [snapshot, setSnapshot] = useState<MissionSnapshot | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSnapshot(JSON.parse(raw) as MissionSnapshot);
    } catch {
      // ignore
    }
  }, []);

  return (
    <section className="py-10 sm:py-14">
      <Link href="/os/missions" className="text-sm text-white/70 hover:text-white">
        ← Back to Missions
      </Link>
      <h1 className="mt-4 text-3xl font-semibold">Mission Sessions</h1>
      <p className="mt-3 max-w-3xl text-white/70">
        This page connects the mission to real execution sessions. It shows what the mission is supposed to become inside Focus and Timeline.
      </p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-4 text-white/80 whitespace-pre-wrap">
        {snapshot?.mission || "No mission is ready to be connected to sessions yet."}
      </div>
    </section>
  );
}
