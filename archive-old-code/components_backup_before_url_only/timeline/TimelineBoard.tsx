"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  persistTimeline,
  TimelineBlock,
  TimelineBlockType,
  useTimelineStore,
} from "@/stores/timeline/timeline.store";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function todayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const TYPE_BADGE: Record<TimelineBlockType, string> = {
  focus: "border-violet-400/30 bg-violet-500/10 text-violet-200",
  mission: "border-cyan-400/30 bg-cyan-500/10 text-cyan-200",
  recovery: "border-emerald-400/30 bg-emerald-500/10 text-emerald-200",
  note: "border-white/15 bg-white/5 text-white/80",
};

export default function TimelineBoard() {
  const blocks = useTimelineStore((s) => s.blocks);
  const selectedId = useTimelineStore((s) => s.selectedId);
  const view = useTimelineStore((s) => s.view);

  const hydrate = useTimelineStore((s) => s.hydrate);
  const setView = useTimelineStore((s) => s.setView);
  const createBlock = useTimelineStore((s) => s.createBlock);
  const updateBlock = useTimelineStore((s) => s.updateBlock);
  const del = useTimelineStore((s) => s.deleteBlock);
  const select = useTimelineStore((s) => s.select);

  const [date, setDate] = useState(todayKey());
  const [type, setType] = useState<TimelineBlockType>("focus");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("10:00");

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    persistTimeline();
  }, [blocks, view]);

  const selected = useMemo(
    () => blocks.find((b) => b.id === selectedId) || null,
    [blocks, selectedId]
  );

  const filtered = useMemo(() => {
    if (view === "day") return blocks.filter((b) => b.date === date);
    // week view (simple): show all blocks sorted by date then start
    return [...blocks].sort((a, b) => {
      if (a.date !== b.date) return a.date < b.date ? -1 : 1;
      return a.start < b.start ? -1 : 1;
    });
  }, [blocks, view, date]);

  function submit() {
    if (!title.trim() && !notes.trim()) return;
    createBlock({ title, notes, date, start, end, type });
    setTitle("");
    setNotes("");
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-white/60">
            Timeline
          </div>
          <div className="mt-1 text-sm text-white/70">
            Frontend-only scheduling layer. Later: drag blocks + mission sync.
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/missions"
            className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs font-extrabold hover:bg-white/5"
          >
            Missions
          </Link>
          <Link
            href="/os"
            className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs font-extrabold hover:bg-white/5"
          >
            OS
          </Link>
        </div>
      </div>

      {/* Controls */}
      <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex gap-2">
            <button
              onClick={() => setView("day")}
              className={cx(
                "rounded-xl border px-3 py-2 text-xs font-extrabold",
                view === "day"
                  ? "border-white/20 bg-white/10"
                  : "border-white/10 bg-black/20 hover:bg-white/5"
              )}
            >
              Day
            </button>
            <button
              onClick={() => setView("week")}
              className={cx(
                "rounded-xl border px-3 py-2 text-xs font-extrabold",
                view === "week"
                  ? "border-white/20 bg-white/10"
                  : "border-white/10 bg-black/20 hover:bg-white/5"
              )}
            >
              Week
            </button>
          </div>

          {view === "day" ? (
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/80 outline-none"
            />
          ) : (
            <div className="text-xs text-white/50">Showing all blocks</div>
          )}
        </div>

        {/* Create block */}
        <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-6">
          <select
            value={type}
            onChange={(e) => setType(e.target.value as TimelineBlockType)}
            className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/80 outline-none md:col-span-1"
          >
            <option value="focus">focus</option>
            <option value="mission">mission</option>
            <option value="recovery">recovery</option>
            <option value="note">note</option>
          </select>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Block title"
            className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/80 outline-none md:col-span-3"
          />

          <input
            type="time"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/80 outline-none md:col-span-1"
          />

          <input
            type="time"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/80 outline-none md:col-span-1"
          />
        </div>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Notes…"
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/80 outline-none"
        />

        <button
          onClick={submit}
          className="mt-2 rounded-xl bg-white px-3 py-2 text-sm font-extrabold text-black hover:opacity-90"
        >
          Add block
        </button>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <div className="text-xs uppercase tracking-widest text-white/60">
            Blocks
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {filtered.length === 0 ? (
              <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-xs text-white/45">
                Empty
              </div>
            ) : (
              filtered.map((b) => (
                <button
                  key={b.id}
                  onClick={() => select(b.id)}
                  className={cx(
                    "text-left rounded-2xl border p-3 transition",
                    "border-white/10 bg-black/40 hover:bg-white/5",
                    selectedId === b.id && "border-white/20 bg-white/5"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-sm font-semibold text-white/90">
                        {b.title}
                      </div>
                      <div className="mt-1 text-xs text-white/50">
                        {b.date} • {b.start}–{b.end}
                      </div>
                    </div>
                    <div
                      className={cx(
                        "rounded-full border px-2 py-0.5 text-[10px] font-extrabold",
                        TYPE_BADGE[b.type]
                      )}
                    >
                      {b.type.toUpperCase()}
                    </div>
                  </div>

                  {b.notes ? (
                    <div className="mt-2 text-xs text-white/65 line-clamp-3">
                      {b.notes}
                    </div>
                  ) : null}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Detail */}
        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <div className="text-xs uppercase tracking-widest text-white/60">
            Detail
          </div>

          {!selected ? (
            <div className="mt-3 text-sm text-white/60">
              Select a block to edit.
            </div>
          ) : (
            <div className="mt-3 space-y-3">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="text-xs text-white/50">Title</div>
                  <input
                    value={selected.title}
                    onChange={(e) =>
                      updateBlock(selected.id, { title: e.target.value })
                    }
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/85 outline-none"
                  />
                </div>

                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="text-xs text-white/50">Type</div>
                  <select
                    value={selected.type}
                    onChange={(e) =>
                      updateBlock(selected.id, {
                        type: e.target.value as TimelineBlockType,
                      })
                    }
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/85 outline-none"
                  >
                    <option value="focus">focus</option>
                    <option value="mission">mission</option>
                    <option value="recovery">recovery</option>
                    <option value="note">note</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="text-xs text-white/50">Date</div>
                  <input
                    type="date"
                    value={selected.date}
                    onChange={(e) =>
                      updateBlock(selected.id, { date: e.target.value })
                    }
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/85 outline-none"
                  />
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="text-xs text-white/50">Start</div>
                  <input
                    type="time"
                    value={selected.start}
                    onChange={(e) =>
                      updateBlock(selected.id, { start: e.target.value })
                    }
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/85 outline-none"
                  />
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="text-xs text-white/50">End</div>
                  <input
                    type="time"
                    value={selected.end}
                    onChange={(e) =>
                      updateBlock(selected.id, { end: e.target.value })
                    }
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/85 outline-none"
                  />
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                <div className="text-xs text-white/50">Notes</div>
                <textarea
                  value={selected.notes}
                  onChange={(e) =>
                    updateBlock(selected.id, { notes: e.target.value })
                  }
                  rows={5}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/85 outline-none"
                />
              </div>

              <button
                onClick={() => del(selected.id)}
                className="rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs font-extrabold text-red-200 hover:bg-red-500/15"
              >
                Delete
              </button>

              <div className="text-xs text-white/45">
                Created: {new Date(selected.createdAt).toLocaleString()} •
                Updated: {new Date(selected.updatedAt).toLocaleString()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}