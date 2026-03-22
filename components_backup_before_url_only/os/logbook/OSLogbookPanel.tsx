"use client";

import { useMemo, useState } from "react";
import { useLogbook } from "@/stores/logbook/logbook.store";
import type { LogbookEntry, LogbookEntryType } from "@/stores/logbook/types";

const FILTERS: Array<LogbookEntryType | "all"> = [
  "all",
  "system",
  "assistant",
  "robot",
  "user",
];

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function formatTime(ts: number) {
  try {
    return new Date(ts).toLocaleString();
  } catch {
    return String(ts);
  }
}

export default function OSLogbookPanel() {
  const { entries, clear } = useLogbook();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return (entries || []).filter((e) => {
      if (filter !== "all" && e.type !== filter) return false;
      if (!query) return true;

      const hay = `${e.title ?? ""} ${e.content ?? ""}`.toLowerCase();
      return hay.includes(query);
    });
  }, [entries, filter, q]);

  function copy(text: string) {
    navigator.clipboard?.writeText(text).catch(() => {});
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(entries ?? [], null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `shynvo-logbook-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs uppercase tracking-widest text-white/60">
            Logbook • local
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={exportJson}
              className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs font-extrabold hover:bg-white/5"
            >
              Export JSON
            </button>
            <button
              onClick={clear}
              className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs font-extrabold hover:bg-white/5"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cx(
                "rounded-xl border px-3 py-2 text-xs font-extrabold transition",
                f === filter
                  ? "border-white/20 bg-white/10"
                  : "border-white/10 bg-black/30 hover:bg-white/5"
              )}
            >
              {f.toUpperCase()}
            </button>
          ))}

          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search title/content…"
            className="ml-auto w-full sm:w-[280px] rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-white/80 outline-none focus:border-violet-400/40 focus:ring-4 focus:ring-violet-500/10"
          />
        </div>
      </div>

      {/* List */}
      <div className="mt-4 space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/70">
            No entries yet. Use Shynvo SH Assistant AI or navigate the OS to
            generate events.
          </div>
        ) : (
          filtered.map((e: LogbookEntry) => (
            <div
              key={e.id}
              className="rounded-2xl border border-white/10 bg-black/30 p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="text-xs font-extrabold text-white/70">
                    {e.type.toUpperCase()}{" "}
                    <span className="text-white/40 font-normal">
                      • {formatTime(e.timestamp)}
                    </span>
                  </div>
                  {e.title ? (
                    <div className="mt-1 text-sm font-semibold text-white/90">
                      {e.title}
                    </div>
                  ) : null}
                </div>

                <button
                  onClick={() => copy(e.content)}
                  className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs font-extrabold hover:bg-white/5"
                >
                  Copy
                </button>
              </div>

              <div className="mt-3 whitespace-pre-wrap text-sm text-white/80">
                {e.content}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}