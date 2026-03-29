"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type LogEntry = {
  text: string;
  type: "focus-session" | "mission-review" | "weekly-reflection" | "general";
};

const STORAGE_KEY = "shynvo_os_logbook_entries";

export default function Page() {
  const [entries, setEntries] = useState<LogEntry[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setEntries(JSON.parse(raw) as LogEntry[]);
    } catch {
      // ignore storage
    }
  }, []);

  const filtered = useMemo(
    () => entries.filter((item) => item.type === "mission-review"),
    [entries]
  );

  return (
    <section className="py-10 sm:py-14">
      <Link href="/os/logbook" className="text-sm text-white/70 hover:text-white">
        ← Back to Logbook
      </Link>
      <h1 className="mt-4 text-3xl font-semibold">Mission Review</h1>
      <p className="mt-3 max-w-3xl text-white/70">
        This page stores mission reviews so the user can see progress, obstacles, and the next milestone clearly.
      </p>

      <div className="mt-8 space-y-4">
        {filtered.length ? (
          filtered.map((item, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-white/80">
              {item.text}
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-white/70">
            No mission review entries yet.
          </div>
        )}
      </div>
    </section>
  );
}
