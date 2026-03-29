"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useOSState } from "@/components/os/useOSState";
import { useLogbook, formatTs } from "@/components/os/OSLogbookStore";

export default function OSStoryBar() {
  const [open, setOpen] = useOSState<boolean>("os.ui.storyBarOpen", true);
  const { entries } = useLogbook();

  const latest = useMemo(() => entries.slice(0, 6), [entries]);

  return (
    <div className="os-story rounded-2xl p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="text-xs uppercase tracking-widest text-white/60">Story log</div>
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/70 hover:bg-white/10"
        >
          {open ? "Collapse" : "Expand"}
        </button>
      </div>

      {open ? (
        <>
          <div className="mt-3 space-y-2">
            {latest.map((e) => (
              <div key={e.id} className="rounded-xl border border-white/10 bg-black/40 p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm text-white/90 line-clamp-1">{e.title}</div>
                  <div className="text-xs text-white/55">{e.tag || "log"}</div>
                </div>
                <div className="mt-1 text-xs text-white/55">{formatTs(e.ts)}</div>
                <div className="mt-2 text-sm text-white/75 whitespace-pre-wrap line-clamp-4">
                  {e.body}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href="/os/logbook"
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10"
            >
              Open logbook
            </Link>

            <button
              onClick={() => {
                try {
                  navigator.clipboard.writeText(
                    latest.map((e) => e.title + " - " + e.body).join("\n\n")
                  );
                } catch {}
              }}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10"
            >
              Copy snippet
            </button>
          </div>

          <div className="mt-3 text-xs text-white/50">
            Frontend demo: local persistence. Later: server generated story.
          </div>
        </>
      ) : (
        <div className="mt-3 text-sm text-white/70">
          {entries[0] ? entries[0].title : "No entries yet."}
        </div>
      )}
    </div>
  );
}
