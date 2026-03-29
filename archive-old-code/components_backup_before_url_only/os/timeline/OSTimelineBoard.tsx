"use client";

// components/os/timeline/OSTimelineBoard.tsx

import React from "react";
import {
  CHRONO_START,
  CHRONO_END,
  getChronoYear,
  getChronoYearsRange,
  yearToPercent,
  type ChronoEvent,
  type ChronoTag,
  type ChronoYear,
} from "@/lib/timeline/chrono";
import { useOSState } from "@/components/os/useOSState";

function tagBadge(tag?: ChronoTag) {
  const base =
    "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] tracking-wider backdrop-blur-md";
  switch (tag) {
    case "SYSTEM":
      return `${base} border-cyan-400/35 bg-cyan-500/10 text-cyan-200`;
    case "MISSION":
      return `${base} border-emerald-400/35 bg-emerald-500/10 text-emerald-200`;
    case "RESEARCH":
      return `${base} border-violet-400/35 bg-violet-500/10 text-violet-200`;
    case "PERSONAL":
      return `${base} border-amber-400/35 bg-amber-500/10 text-amber-200`;
    case "MILESTONE":
    default:
      return `${base} border-white/15 bg-white/5 text-white/70`;
  }
}

function YearChip({
  year,
  active,
  onClick,
}: {
  year: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-full border px-3 py-1.5 text-sm tracking-wide transition backdrop-blur-md",
        active
          ? "border-white/30 bg-white/10 text-white shadow-[0_0_26px_rgba(255,255,255,0.08)]"
          : "border-white/10 bg-black/20 text-white/60 hover:text-white/85 hover:border-white/20",
      ].join(" ")}
      aria-pressed={active}
    >
      {year}
    </button>
  );
}

function EventRow({
  e,
  active,
  onPick,
}: {
  e: ChronoEvent;
  active: boolean;
  onPick: () => void;
}) {
  return (
    <button
      onClick={onPick}
      className={[
        "w-full rounded-xl border p-3 text-left transition",
        "bg-black/35 backdrop-blur-md",
        active ? "border-white/25" : "border-white/10 hover:border-white/20",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm text-white/90 leading-snug">{e.title}</div>
          {e.detail ? (
            <div className="mt-1 text-xs text-white/55 leading-relaxed line-clamp-2">
              {e.detail}
            </div>
          ) : null}
        </div>
        {e.tag ? <div className={tagBadge(e.tag)}>{e.tag}</div> : null}
      </div>
    </button>
  );
}

export default function OSTimelineBoard() {
  const years = React.useMemo(() => getChronoYearsRange(), []);

  const [selectedYear, setSelectedYear] = useOSState<number>("os.timeline.selectedYear", CHRONO_START);
  const [selectedEventId, setSelectedEventId] = useOSState<string>(
    "os.timeline.selectedEventId",
    getChronoYear(CHRONO_START).events[0]?.id ?? "2026-os-shell-stable"
  );

  const yearData: ChronoYear = React.useMemo(() => getChronoYear(selectedYear), [selectedYear]);

  const selectedEvent = React.useMemo(() => {
    const byId = yearData.events.find((e) => e.id === selectedEventId);
    return byId ?? yearData.events[0];
  }, [yearData, selectedEventId]);

  // featured node per year for the horizontal chronoline (first event in that year)
  const featuredByYear = React.useMemo(
    () =>
      years.map((y) => {
        const yd = getChronoYear(y);
        return { year: y, event: yd.events[0] };
      }),
    [years]
  );

  function pickYear(y: number) {
    setSelectedYear(y);
    const yd = getChronoYear(y);
    setSelectedEventId(yd.events[0]?.id ?? `${y}-placeholder-1`);
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      {/* LEFT: Year strip */}
      <div className="lg:col-span-3 rounded-xl border border-white/10 bg-black/30 p-4">
        <div className="flex items-center justify-between">
          <div className="text-xs uppercase tracking-widest text-white/60">Years</div>
          <div className="text-[11px] tracking-wider text-white/45">SELECT</div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-3">
          {years.map((y) => (
            <YearChip key={y} year={y} active={y === selectedYear} onClick={() => pickYear(y)} />
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="text-xs uppercase tracking-[0.22em] text-white/45">{yearData.year}</div>
          <div className="mt-1 text-sm text-white/75 leading-relaxed">
            {yearData.headline ?? "—"}
          </div>
        </div>

        <div className="mt-3 rounded-lg border border-white/10 bg-black/40 p-3 text-xs text-white/55">
          Range: {CHRONO_START}–{CHRONO_END}
          <div className="mt-1 text-[11px] text-white/45">
            Later: hydrate from backend + user state.
          </div>
        </div>
      </div>

      {/* CENTER: Chronochart + events */}
      <div className="lg:col-span-6 rounded-xl border border-white/10 bg-black/30 p-4">
        <div className="text-xs uppercase tracking-widest text-white/60">Chronochart</div>

        {/* Chronoline */}
        <div className="relative mt-6 h-28 rounded-xl border border-white/10 bg-black/40">
          <div className="absolute left-4 right-4 top-1/2 h-[2px] -translate-y-1/2 bg-white/10" />

          {featuredByYear.map(({ year, event }) => {
            const active = year === selectedYear;
            return (
              <button
                key={year}
                onClick={() => {
                  setSelectedYear(year);
                  setSelectedEventId(event?.id ?? `${year}-placeholder-1`);
                }}
                className="absolute top-1/2 -translate-y-1/2"
                style={{ left: `calc(${yearToPercent(year)}% - 10px)` }}
                title={`${year} • ${event?.title ?? "—"}`}
              >
                <span
                  className={[
                    "inline-flex h-5 w-5 items-center justify-center rounded-full border transition",
                    active ? "border-white/35 bg-white/25" : "border-white/15 bg-white/10",
                  ].join(" ")}
                  style={{
                    boxShadow: active ? "0 0 18px rgba(255,255,255,0.18)" : "none",
                  }}
                />
                <div className="mt-2 w-16 -translate-x-1/3 text-left text-[11px] text-white/60">
                  <div className="text-white/80">{year}</div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-4 rounded-lg border border-white/10 bg-black/40 p-3 text-xs text-white/60">
          Select a year in the strip or click a node. Then pick an event below for full details.
        </div>

        {/* Events list */}
        <div className="mt-4 rounded-xl border border-white/10 bg-black/25 p-3">
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-widest text-white/60">
              Events ({yearData.events.length})
            </div>
            <div className="text-[11px] tracking-wider text-white/45">PICK</div>
          </div>

          <div className="mt-3 space-y-2">
            {yearData.events.map((e) => (
              <EventRow
                key={e.id}
                e={e}
                active={e.id === selectedEventId}
                onPick={() => setSelectedEventId(e.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Details */}
      <div className="lg:col-span-3 rounded-xl border border-white/10 bg-black/30 p-4">
        <div className="text-xs uppercase tracking-widest text-white/60">Details</div>

        <div className="mt-3 rounded-lg border border-white/10 bg-black/40 p-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm text-white/90">{selectedEvent?.title ?? "—"}</div>
              <div className="mt-2 text-xs text-white/60">year: {selectedYear}</div>
            </div>
            {selectedEvent?.tag ? <div className={tagBadge(selectedEvent.tag)}>{selectedEvent.tag}</div> : null}
          </div>

          {selectedEvent?.detail ? (
            <div className="mt-3 text-sm text-white/75 leading-relaxed">{selectedEvent.detail}</div>
          ) : (
            <div className="mt-3 text-sm text-white/55">No detail attached.</div>
          )}
        </div>

        <div className="mt-3 rounded-lg border border-white/10 bg-white/5 p-3">
          <div className="text-xs text-white/60">Next action</div>
          <div className="mt-2 text-sm text-white/80">
            Convert the selected event into a Mission card, or author new events for this year.
          </div>
        </div>

        <div className="mt-3 rounded-lg border border-white/10 bg-black/40 p-3 text-xs text-white/55">
          Saved locally:
          <div className="mt-1 font-mono text-[11px] text-white/60">
            os.timeline.selectedYear / os.timeline.selectedEventId
          </div>
        </div>
      </div>
    </div>
  );
}