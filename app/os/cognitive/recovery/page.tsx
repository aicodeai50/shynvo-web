"use client";

import Link from "next/link";
import { useMemo } from "react";
import OSShell from "@/components/os/OSShell";
import { OSCard } from "@/components/os/OSCard";
import { useOSState } from "@/components/os/useOSState";
import OSSub from "@/components/os/OSSub";

type RecoveryMode = "Downshift" | "Rest Window" | "Reset";

function clamp(n: number, min: number, max: number) { return Math.max(min, Math.min(max, n)); }

function planFor(mode: RecoveryMode, minutes: number) {
  if (mode === "Downshift") {
    return { headline: "Downshift (fast reset)", steps: ["Stand and slow breath (60-90s)", "Hydrate and change posture", "Light exposure (2m)", "Return with one tiny objective"], note: "Goal: restore controllability without losing the day." };
  }
  if (mode === "Rest Window") {
    const length = clamp(minutes, 10, 60);
    return { headline: `Rest window (${length} min)`, steps: ["Eyes off screen (first 5m)", "Walk or lie down (no input)", "If mind races: jot 3 bullets then stop", "Restart with smaller scope"], note: "Goal: real recovery, not scrolling." };
  }
  return { headline: "Reset (clean reboot)", steps: ["Clear desk (60s)", "Write: What matters in 30 minutes?", "Pick one deliverable", "Start timer and begin"], note: "Goal: remove ambiguity and re-enter with a win condition." };
}

function safeMode(v: string): RecoveryMode {
  if (v === "Downshift" || v === "Rest Window" || v === "Reset") return v;
  return "Downshift";
}

export default function CognitiveRecoveryPage() {
  const [modeRaw, setModeRaw] = useOSState<string>("cognitive.recovery.mode", "Downshift");
  const [restMinutes, setRestMinutes] = useOSState<number>("cognitive.recovery.minutes", 20);
  const mode = safeMode(modeRaw);
  const plan = useMemo(() => planFor(mode, restMinutes), [mode, restMinutes]);

  return (
    <OSShell
      zone="cognitive"
  title="Cognitive / Recovery"
      subtitle={
        <OSSub
          en="Downshift, rest window, and reset prompts. Saved locally."
          i18n={{
            es: "Baja ritmo, ventana de descanso y reinicio. Guardado localmente.",
            fr: "Ralentir, pause et reinitialisation. Sauvegarde locale.",
            pt: "Desacelerar, descanso e reset. Salvo localmente.",
            de: "Runterfahren, Pause und Reset. Lokal gespeichert.",
            it: "Rallenta, pausa e reset. Salvato localmente.",
            nl: "Afbouwen, rust en reset. Lokaal opgeslagen.",
            tr: "Yavasla, dinlenme ve sifirlama. Yerelde kayitli.",
            ar: "Tahdi a, nafidha raaha, wa reset. mahfuz mahalliyan.",
            hi: "Downshift, rest window, reset prompts. Local save.",
            zh: "Jiang su, xiu xi chuang kou, chong qi. Ben di bao cun.",
            ja: "Downshift, rest, reset. rokaru hozon.",
            ko: "Downshift, rest, reset. Local save.",
          }}
        />
      }
      chips={["online", "module: cognitive", `recovery: ${mode.toLowerCase().replace(" ", "-")}`, "sync: paused"]}
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1 rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="text-xs uppercase tracking-widest text-white/60">Recovery mode</div>
          <div className="mt-2 text-xs text-white/55">Saved locally for continuity.</div>

          <div className="mt-3 space-y-2">
            {(["Downshift", "Rest Window", "Reset"] as RecoveryMode[]).map((m) => {
              const on = mode === m;
              return (
                <button
                  key={m}
                  onClick={() => setModeRaw(m)}
                  className={["w-full rounded-lg border px-3 py-3 text-left transition", on ? "border-white/25 bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/10"].join(" ")}
                >
                  <div className="text-sm text-white/90">{m}</div>
                </button>
              );
            })}
          </div>

          {mode === "Rest Window" && (
            <div className="mt-4 rounded-lg border border-white/10 bg-black/40 p-3">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-widest text-white/60">Rest length</div>
                <div className="text-xs text-white/60">{restMinutes} min</div>
              </div>
              <input className="mt-2 w-full accent-white" type="range" min={10} max={60} value={restMinutes} onChange={(e) => setRestMinutes(parseInt(e.target.value, 10))} />
            </div>
          )}
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="text-xs uppercase tracking-widest text-white/60">Protocol</div>
            <div className="mt-1 text-lg text-white/90">{plan.headline}</div>
            <div className="mt-2 text-sm text-white/70">{plan.note}</div>

            <div className="mt-4 space-y-2">
              {plan.steps.map((s, i) => (
                <div key={i} className="rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm text-white/85">
                  {i + 1}. {s}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <OSCard title="Priority" value={mode === "Downshift" ? "Stabilize fast" : mode === "Rest Window" ? "Restore capacity" : "Re-enter clean"} hint="goal" />
            <OSCard title="Input rule" value={mode === "Rest Window" ? "No feeds" : "Minimal"} hint="protect recovery" />
            <OSCard title="Restart" value="One tiny deliverable" hint="win condition" />
          </div>

          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="text-xs uppercase tracking-widest text-white/60">Cross-links</div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/os/cognitive" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Back to hub</Link>
              <Link href="/os/cognitive/energy" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Re-check Energy</Link>
              <Link href="/os/focus" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Return to Focus</Link>
            </div>
          </div>
        </div>
      </div>
    </OSShell>
  );
}
