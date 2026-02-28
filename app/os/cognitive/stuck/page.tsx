"use client";

import Link from "next/link";
import { useMemo } from "react";
import OSShell from "@/components/os/OSShell";
import { OSCard } from "@/components/os/OSCard";
import { useOSState } from "@/components/os/useOSState";
import OSSub from "@/components/os/OSSub";

type StuckType = "Too big" | "Too vague" | "Too risky" | "No energy" | "No clarity";

const STUCK_TYPES: Array<{ key: StuckType; hint: string }> = [
  { key: "Too big", hint: "Task is massive and shapeless." },
  { key: "Too vague", hint: "No clear next move." },
  { key: "Too risky", hint: "Fear of wasting time or failing." },
  { key: "No energy", hint: "Capacity is low." },
  { key: "No clarity", hint: "Missing info or direction." },
];

function safeType(v: string): StuckType {
  const allowed: StuckType[] = ["Too big", "Too vague", "Too risky", "No energy", "No clarity"];
  return allowed.includes(v as StuckType) ? (v as StuckType) : "Too vague";
}

function nextSteps(stuck: StuckType, text: string): string[] {
  const base = (text || "").trim() || "this";
  switch (stuck) {
    case "Too big": return [`Define the smallest shippable slice of ${base}.`, "Write a 3-bullet outline.", "Do a 10-minute ugly first pass."];
    case "Too vague": return ["Write the win: In 25 minutes, I will have ____.", "Pick the first constraint you can decide now.", "Start with a placeholder and refine."];
    case "Too risky": return ["Run a cheap experiment for 15 minutes.", "Define the failure cost. Make it tiny.", "Ship a draft to yourself only."];
    case "No energy": return [`Switch to a 12-minute micro-session on ${base}.`, "Reduce scope by 80% and do one tiny action.", "Do Recovery then restart."];
    case "No clarity": return [`Write one clarifying question about ${base}.`, "List what you know vs what you need.", "Make an assumption and proceed (label it)."];
  }
}

export default function CognitiveStuckPage() {
  const [typeRaw, setTypeRaw] = useOSState<string>("cognitive.stuck.type", "Too vague");
  const [task, setTask] = useOSState<string>("cognitive.stuck.task", "draft the mission plan");
  const [picked, setPicked] = useOSState<string>("cognitive.stuck.picked", "");
  const type = safeType(typeRaw);
  const steps = useMemo(() => nextSteps(type, task), [type, task]);

  return (
    <OSShell
      zone="cognitive"
  title="Cognitive / Stuck"
      subtitle={
        <OSSub
          en="Unstuck protocol: reduce scope, reframe, generate next step. Saved locally."
          i18n={{
            es: "Protocolo para destrabarse: reduce alcance, reenfoca, siguiente paso. Guardado localmente.",
            fr: "Protocole anti-blocage: reduire, recadrer, prochain pas. Sauvegarde locale.",
            pt: "Protocolo destravar: reduzir escopo, reenquadrar, proximo passo. Salvo localmente.",
            de: "Unstuck: Umfang reduzieren, neu rahmen, naechster Schritt. Lokal gespeichert.",
            it: "Sblocco: riduci, riformula, prossimo passo. Salvato localmente.",
            nl: "Unstuck: scope verkleinen, herkaderen, volgende stap. Lokaal opgeslagen.",
            tr: "Takilma protokolu: kapsami azalt, yeniden cercevele, sonraki adim. Yerelde kayitli.",
            ar: "Burutukol al-khuruj: taqlil, i adat tateer, al-khutwa al-taaliya. mahfuz mahalliyan.",
            hi: "Unstuck protocol: scope kam, reframe, next step. Local save.",
            zh: "Jie ka xie yi: suo xiao fan wei, chong xin ding yi, xia yi bu. Ben di bao cun.",
            ja: "Unstuck: scope shukusho, reframe, next step. rokaru hozon.",
            ko: "Unstuck: scope 줄이기, reframe, next step. Local save.",
          }}
        />
      }
      chips={["online", "module: cognitive", `stuck: ${type.toLowerCase().replace(" ", "-")}`, picked ? "target: locked" : "target: none"]}
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1 rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="text-xs uppercase tracking-widest text-white/60">Stuck scan</div>
          <div className="mt-2 text-xs text-white/55">Selections saved locally.</div>

          <div className="mt-3 rounded-lg border border-white/10 bg-black/40 p-3">
            <div className="text-xs uppercase tracking-widest text-white/60">Current task</div>
            <input value={task} onChange={(e) => setTask(e.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/85 outline-none" />
          </div>

          <div className="mt-4 space-y-2">
            {STUCK_TYPES.map((s) => {
              const on = type === s.key;
              return (
                <button
                  key={s.key}
                  onClick={() => setTypeRaw(s.key)}
                  className={["w-full rounded-lg border px-3 py-3 text-left transition", on ? "border-white/25 bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/10"].join(" ")}
                >
                  <div className="text-sm text-white/90">{s.key}</div>
                  <div className="mt-1 text-xs text-white/60">{s.hint}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="text-xs uppercase tracking-widest text-white/60">Next-step generator</div>
            <div className="mt-3 space-y-2">
              {steps.map((s) => {
                const on = picked === s;
                return (
                  <button
                    key={s}
                    onClick={() => setPicked(s)}
                    className={["w-full rounded-lg border px-3 py-3 text-left transition", on ? "border-white/25 bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/10"].join(" ")}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm text-white/85">{s}</div>
                      <span className="text-xs text-white/60">{on ? "selected" : "choose"}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <OSCard title="Scope" value={type === "Too big" ? "Reduce 80%" : "Small slice"} hint="protocol" />
            <OSCard title="Clarity" value={type === "No clarity" ? "Ask 1 question" : "Good enough"} hint="protocol" />
            <OSCard title="Momentum" value={type === "No energy" ? "Micro-session" : "Commit 1 step"} hint="protocol" />
          </div>

          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="text-xs uppercase tracking-widest text-white/60">Cross-links</div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/os/cognitive" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Back to hub</Link>
              <Link href="/os/focus" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Execute in Focus</Link>
              <Link href="/os/cognitive/recovery" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Go to Recovery</Link>
            </div>
          </div>
        </div>
      </div>
    </OSShell>
  );
}
