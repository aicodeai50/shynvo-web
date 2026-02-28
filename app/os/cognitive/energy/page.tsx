"use client";

import Link from "next/link";
import { useMemo } from "react";
import OSShell from "@/components/os/OSShell";
import { OSCard } from "@/components/os/OSCard";
import { useOSState } from "@/components/os/useOSState";
import OSSub from "@/components/os/OSSub";

type EnergyBand = "Low" | "Medium" | "High";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
function bandFromSignal(signal: number): EnergyBand {
  if (signal <= 33) return "Low";
  if (signal <= 66) return "Medium";
  return "High";
}
function protocolFor(band: EnergyBand) {
  switch (band) {
    case "Low":
      return { mode: "Stabilize", focus: "12-18 min", breakType: "2-4 min walk / water / reset", prompt: "Shrink scope. One tiny deliverable. Win momentum before intensity." };
    case "Medium":
      return { mode: "Build", focus: "25-35 min", breakType: "5 min standing break + quick review", prompt: "Choose one objective. Keep it crisp. Aim for progress, not perfection." };
    case "High":
      return { mode: "Sprint", focus: "45-60 min", breakType: "8-12 min full disconnect", prompt: "Use the peak. Deep work only. No context switching. Protect the run." };
  }
}
function SignalBars({ value }: { value: number }) {
  return (
    <div className="flex items-end gap-1">
      {Array.from({ length: 10 }).map((_, i) => {
        const threshold = (i + 1) * 10;
        const on = value >= threshold;
        return (
          <div key={i} className={["h-6 w-2 rounded-sm border", on ? "border-white/20 bg-white/70" : "border-white/10 bg-white/5"].join(" ")} />
        );
      })}
    </div>
  );
}

export default function CognitiveEnergyPage() {
  const [signal, setSignal] = useOSState<number>("cognitive.energy.signal", 62);
  const band = useMemo(() => bandFromSignal(signal), [signal]);
  const protocol = useMemo(() => protocolFor(band), [band]);

  return (
    <OSShell
      zone="cognitive"
  title="Cognitive / Energy"
      subtitle={
        <OSSub
          en="Energy protocol (signal-based session guidance). Saved locally."
          i18n={{
            es: "Protocolo de energia (guia por senales). Guardado localmente.",
            fr: "Protocole energie (guidage par signaux). Sauvegarde locale.",
            pt: "Protocolo de energia (guia por sinais). Salvo localmente.",
            de: "Energieprotokoll (Signal-gesteuert). Lokal gespeichert.",
            it: "Protocollo energia (a segnali). Salvato localmente.",
            nl: "Energieprotocol (signaalgestuurd). Lokaal opgeslagen.",
            tr: "Enerji protokolu (sinyal tabanli). Yerelde kayitli.",
            ar: "Burutukol al-taqa (isharat). mahfuz mahalliyan.",
            hi: "Energy protocol (signal-based). Local save.",
            zh: "Neng liang xie yi (xin hao). Ben di bao cun.",
            ja: "Enerugi purotokoru (shingou). rokaru hozon.",
            ko: "Energy protocol (signal). Local save.",
          }}
        />
      }
      chips={["online", "module: cognitive", `signal: ${band.toLowerCase()}`, `mode: ${protocol.mode.toLowerCase()}`]}
    >
      <div className="rounded-xl border border-white/10 bg-black/30 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-widest text-white/60">Energy Signal</div>
            <div className="mt-1 text-sm text-white/80">
              Band: <span className="text-white/90">{band}</span> - Mode: <span className="text-white/90">{protocol.mode}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <SignalBars value={signal} />
            <div className="min-w-[4rem] text-right text-sm text-white/80">{signal}%</div>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-xs uppercase tracking-widest text-white/60">Adjust signal</div>
          <input
            className="mt-2 w-full accent-white"
            type="range"
            min={0}
            max={100}
            value={signal}
            onChange={(e) => setSignal(clamp(parseInt(e.target.value, 10), 0, 100))}
          />
        </div>

        <div className="mt-2 text-xs text-white/55">Saved locally so your demo feels continuous.</div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <OSCard title="Focus length" value={protocol.focus} hint="recommended" />
        <OSCard title="Break type" value={protocol.breakType} hint="recommended" />
        <OSCard title="Operator prompt" value={protocol.prompt} hint="guidance" />
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4">
        <div className="text-xs uppercase tracking-widest text-white/60">Cross-links</div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/os/cognitive" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Back to hub</Link>
          <Link href="/os/cognitive/friction" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Go to Friction</Link>
          <Link href="/os/cognitive/recovery" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Go to Recovery</Link>
          <Link href="/os/cognitive/stuck" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Go to Stuck</Link>
        </div>
      </div>
    </OSShell>
  );
}
