"use client";

import Link from "next/link";
import { useMemo } from "react";
import OSShell from "@/components/os/OSShell";
import { OSCard } from "@/components/os/OSCard";
import { useOSState } from "@/components/os/useOSState";
import OSSub from "@/components/os/OSSub";

type Blocker = "confusion" | "distraction" | "unclearGoal" | "overwhelm";

const BLOCKERS: Array<{ key: Blocker; label: string; hint: string }> = [
  { key: "confusion", label: "Confusion", hint: "You do not know what to do next." },
  { key: "distraction", label: "Distraction", hint: "You keep switching contexts." },
  { key: "unclearGoal", label: "Unclear goal", hint: "Objective is not precise." },
  { key: "overwhelm", label: "Overwhelm", hint: "Too big, too many moving parts." },
];

function fixesFor(active: Set<Blocker>) {
  const fixes: Array<{ title: string; detail: string; action: string }> = [];
  if (active.has("unclearGoal")) fixes.push({ title: "Define the win", detail: "One sentence outcome for the next 25 minutes.", action: "Set outcome" });
  if (active.has("confusion")) fixes.push({ title: "Generate next step", detail: "List 3 steps. Choose the smallest.", action: "Next step" });
  if (active.has("distraction")) fixes.push({ title: "Lock context", detail: "Close tabs and silence notifications for one session.", action: "Lock-in" });
  if (active.has("overwhelm")) fixes.push({ title: "Reduce scope 80%", detail: "Ship the smallest working slice.", action: "Reduce" });
  if (fixes.length === 0) fixes.push({ title: "Select blockers", detail: "Pick one or more blockers to get targeted fixes.", action: "Select" });
  return fixes;
}

function setToArray(s: Set<Blocker>) { return Array.from(s.values()); }
function arrayToSet(a: string[]): Set<Blocker> {
  const allowed = new Set<Blocker>(["confusion", "distraction", "unclearGoal", "overwhelm"]);
  const out = new Set<Blocker>();
  for (const x of a) if (allowed.has(x as Blocker)) out.add(x as Blocker);
  return out;
}

export default function CognitiveFrictionPage() {
  const [saved, setSaved] = useOSState<string[]>("cognitive.friction.blockers", ["distraction"]);
  const selected = useMemo(() => arrayToSet(saved), [saved]);
  const fixes = useMemo(() => fixesFor(selected), [selected]);

  const toggle = (key: Blocker) => {
    const next = new Set(selected);
    if (next.has(key)) next.delete(key); else next.add(key);
    setSaved(setToArray(next));
  };

  const recommendedNext =
    selected.has("distraction") ? "Lock context" :
    selected.has("unclearGoal") ? "Define win" :
    selected.has("confusion") ? "Next step" :
    selected.has("overwhelm") ? "Reduce scope" :
    "Select blockers";

  return (
    <OSShell
      zone="cognitive"
  title="Cognitive / Friction"
      subtitle={
        <OSSub
          en="Identify blockers and apply quick fixes. Saved locally."
          i18n={{
            es: "Identifica bloqueos y aplica soluciones rapidas. Guardado localmente.",
            fr: "Identifier les blocages et appliquer des correctifs. Sauvegarde locale.",
            pt: "Identifique bloqueios e aplique correcoes rapidas. Salvo localmente.",
            de: "Blocker finden und Schnellfixes anwenden. Lokal gespeichert.",
            it: "Identifica ostacoli e applica soluzioni rapide. Salvato localmente.",
            nl: "Blokkades vinden en snelle fixes toepassen. Lokaal opgeslagen.",
            tr: "Engelleri bul ve hizli cozum uygula. Yerelde kayitli.",
            ar: "Taareef al-awaiq wa tatbiq islahat sari a. mahfuz mahalliyan.",
            hi: "Blockers pehchano aur quick fixes lagao. Local save.",
            zh: "Shi bie zu ai bing kuai su xiu fu. Ben di bao cun.",
            ja: "Blocker shindan + quick fix. rokaru hozon.",
            ko: "Blocker scan + quick fix. Local save.",
          }}
        />
      }
      chips={["online", "module: cognitive", `blockers: ${selected.size}/4`, "protocol: quick-fix"]}
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1 rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="text-xs uppercase tracking-widest text-white/60">Blocker scan</div>
          <div className="mt-2 text-xs text-white/55">Your selection is saved locally for continuity.</div>

          <div className="mt-4 space-y-2">
            {BLOCKERS.map((b) => {
              const on = selected.has(b.key);
              return (
                <button
                  key={b.key}
                  onClick={() => toggle(b.key)}
                  className={["w-full rounded-lg border px-3 py-3 text-left transition", on ? "border-white/25 bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/10"].join(" ")}
                >
                  <div className="text-sm text-white/90">{b.label}</div>
                  <div className="mt-1 text-xs text-white/60">{b.hint}</div>
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={() => setSaved([])} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 hover:bg-white/10">Clear</button>
            <button onClick={() => setSaved(["distraction"])} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 hover:bg-white/10">Default</button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {fixes.map((f, idx) => (
              <div key={idx} className="rounded-xl border border-white/10 bg-black/30 p-4">
                <div className="text-xs uppercase tracking-widest text-white/60">Quick fix</div>
                <div className="mt-1 text-base text-white/90">{f.title}</div>
                <div className="mt-2 text-sm text-white/70">{f.detail}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">{f.action}</button>
                  <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Save protocol</button>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <OSCard title="Friction level" value={`${selected.size} / 4`} hint="selected blockers" />
            <OSCard title="Recommended next" value={recommendedNext} hint="priority" />
            <OSCard title="Session type" value={selected.has("overwhelm") ? "Micro-chunks" : "Single objective"} hint="mode" />
          </div>

          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="text-xs uppercase tracking-widest text-white/60">Cross-links</div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/os/cognitive" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Back to hub</Link>
              <Link href="/os/cognitive/stuck" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Go to Stuck</Link>
              <Link href="/os/cognitive/recovery" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Go to Recovery</Link>
              <Link href="/os/cognitive/energy" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Check Energy</Link>
            </div>
          </div>
        </div>
      </div>
    </OSShell>
  );
}
