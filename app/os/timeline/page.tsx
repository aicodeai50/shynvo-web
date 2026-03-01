"use client";

import { useMemo } from "react";
import OSShell from "@/components/os/OSShell";
import OSSub from "@/components/os/OSSub";
import { useOSState } from "@/components/os/useOSState";

type ChronoTag = "SYSTEM" | "MISSION" | "RESEARCH" | "PERSONAL" | "MILESTONE";

type ChronoEvent = {
  id: string;
  year: number;
  title: string;
  detail?: string;
  tag?: ChronoTag;
};

type ChronoYear = {
  year: number;
  headline?: string;
  events: ChronoEvent[];
};

const CHRONO_START = 2026;
const CHRONO_END = 2050;

function makePlaceholderYear(year: number): ChronoYear {
  return {
    year,
    headline: "Placeholder year — future events to be authored",
    events: [
      {
        id: `${year}-placeholder-1`,
        year,
        title: "Awaiting events",
        detail: "Add missions, milestones, research arcs, system upgrades.",
        tag: "MILESTONE",
      },
    ],
  };
}

const seed2026: ChronoYear = {
  year: 2026,
  headline: "System ignition → OS stabilizes → modules come online",
  events: [
    {
      id: "2026-os-shell-stable",
      year: 2026,
      title: "OS Shell stabilized",
      detail: "Navigation safe, cinematic layer active, core modules load.",
      tag: "SYSTEM",
    },
    {
      id: "2026-assistant-proxy-online",
      year: 2026,
      title: "Assistant proxy chain confirmed",
      detail: "Frontend → /api/public/chat → Railway → reply (no browser secrets).",
      tag: "SYSTEM",
    },
    {
      id: "2026-chronochart-module",
      year: 2026,
      title: "Chronochart Timeline module begins",
      detail: "2026–2050 scaffolding + OS-style board layout.",
      tag: "MILESTONE",
    },
    {
      id: "2026-public-demo-flow",
      year: 2026,
      title: "Launch SH Colony OS (demo flow)",
      detail: "OS home, planet, cognitive, missions, timeline. Frontend sprint locks layout.",
      tag: "MISSION",
    },
  ],
};

const chronoYears: ChronoYear[] = [
  seed2026,
  ...Array.from({ length: CHRONO_END - 2027 + 1 }, (_, i) => makePlaceholderYear(2027 + i)),
];

function getChronoYearsRange(): number[] {
  return Array.from({ length: CHRONO_END - CHRONO_START + 1 }, (_, i) => CHRONO_START + i);
}

function getChronoYear(year: number): ChronoYear {
  return chronoYears.find((y) => y.year === year) ?? makePlaceholderYear(year);
}

function pos(year: number) {
  // 2026 -> 0%, 2050 -> 100%
  const min = CHRONO_START;
  const max = CHRONO_END;
  return ((year - min) / (max - min)) * 100;
}

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

export default function TimelinePage() {
  const years = useMemo(() => getChronoYearsRange(), []);
  const [selectedYear, setSelectedYear] = useOSState<number>("os.timeline.selectedYear", CHRONO_START);
  const [selectedEventId, setSelectedEventId] = useOSState<string>(
    "os.timeline.selectedEventId",
    seed2026.events[0].id
  );

  const yearData = useMemo(() => getChronoYear(selectedYear), [selectedYear]);
  const selectedEvent = useMemo(() => {
    const byId = yearData.events.find((e) => e.id === selectedEventId);
    return byId ?? yearData.events[0];
  }, [yearData, selectedEventId]);

  // A “featured” node per year for the chart (first event of that year).
  const featuredByYear = useMemo(() => {
    return years.map((y) => {
      const yd = getChronoYear(y);
      const e = yd.events[0];
      return { year: y, event: e };
    });
  }, [years]);

  return (
    <OSShell
      title="Timeline"
      subtitle={
        <OSSub
          en="Chronochart: 2026–2050. Select a year → inspect events. Saved locally."
          i18n={{
            es: "Cronograma: 2026–2050. Elige un año → inspecciona eventos. Guardado localmente.",
            fr: "Chronochart : 2026–2050. Sélectionnez une année → voir les événements. Sauvegarde locale.",
            pt: "Cronograma: 2026–2050. Selecione um ano → ver eventos. Salvo localmente.",
            de: "Zeitleiste: 2026–2050. Jahr wählen → Ereignisse ansehen. Lokal gespeichert.",
            it: "Timeline: 2026–2050. Seleziona un anno → eventi. Salvato localmente.",
            nl: "Tijdlijn: 2026–2050. Kies een jaar → bekijk events. Lokaal opgeslagen.",
            tr: "Zaman çizelgesi: 2026–2050. Yıl seç → olayları gör. Yerelde kayıtlı.",
            ar: "Khat al-zaman: 2026–2050. ikhtar sana → arid al-ahdath. mahfuz mahalliyan.",
            hi: "Timeline: 2026–2050. Year select → events. Local save.",
            zh: "时间轴：2026–2050。选择年份→查看事件。本地保存。",
            ja: "タイムライン: 2026–2050。年を選択→イベント。ローカル保存。",
            ko: "타임라인: 2026–2050. 연도 선택 → 이벤트. 로컬 저장.",
          }}
        />
      }
      chips={[
        "online",
        "module: timeline",
        `range: ${CHRONO_START}-${CHRONO_END}`,
        "sync: local",
      ]}
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* LEFT: Year strip */}
        <div className="lg:col-span-3 rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-widest text-white/60">Years</div>
            <div className="text-[11px] tracking-wider text-white/45">SELECT</div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-3">
            {years.map((y) => {
              const active = y === selectedYear;
              return (
                <button
                  key={y}
                  onClick={() => {
                    setSelectedYear(y);
                    // reset event selection to first event in year (prevents “missing event” mismatch)
                    const yd = getChronoYear(y);
                    setSelectedEventId(yd.events[0]?.id ?? `${y}-placeholder-1`);
                  }}
                  className={[
                    "rounded-full border px-2.5 py-1.5 text-sm tracking-wide transition backdrop-blur-md",
                    active
                      ? "border-white/30 bg-white/10 text-white shadow-[0_0_26px_rgba(255,255,255,0.08)]"
                      : "border-white/10 bg-black/20 text-white/60 hover:text-white/85 hover:border-white/20",
                  ].join(" ")}
                  aria-pressed={active}
                >
                  {y}
                </button>
              );
            })}
          </div>

          <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="text-xs uppercase tracking-[0.22em] text-white/45">{yearData.year}</div>
            <div className="mt-1 text-sm text-white/75 leading-relaxed">{yearData.headline ?? "—"}</div>
          </div>
        </div>

        {/* CENTER: Chronochart */}
        <div className="lg:col-span-6 rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="text-xs uppercase tracking-widest text-white/60">Chronochart</div>

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
                  style={{ left: `calc(${pos(year)}% - 10px)` }}
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
                  <div className="mt-2 w-20 -translate-x-1/3 text-left text-[11px] text-white/60">
                    <div className="text-white/80">{year}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-4 rounded-lg border border-white/10 bg-black/40 p-3 text-xs text-white/60">
            Select a year in the strip or click a node. Frontend-only now. Later: hydrate from backend timeline data.
          </div>

          {/* EVENTS LIST */}
          <div className="mt-4 rounded-xl border border-white/10 bg-black/25 p-3">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-widest text-white/60">Events ({yearData.events.length})</div>
              <div className="text-[11px] tracking-wider text-white/45">PICK</div>
            </div>

            <div className="mt-3 space-y-2">
              {yearData.events.map((e) => {
                const active = e.id === selectedEventId;
                return (
                  <button
                    key={e.id}
                    onClick={() => setSelectedEventId(e.id)}
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
              })}
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
              Convert selected event into a Mission card, or author new events for this year.
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
    </OSShell>
  );
}