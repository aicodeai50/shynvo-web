"use client";

import { useMemo } from "react";
import OSShell from "@/components/os/OSShell";
import { BoxLink } from "@/components/os/OSCard";
import OSHUD from "@/components/os/OSHUD";
import OSLogbook from "@/components/os/OSLogbook";
import OSSub from "@/components/os/OSSub";
import { useOSState } from "@/components/os/useOSState";
import "@/app/os/os-planet.css";

type ZoneStatus = "nominal" | "elevated" | "degraded";

function statusChipClass(s: ZoneStatus) {
  if (s === "nominal") return "border-emerald-400/20 bg-emerald-500/10 text-emerald-200";
  if (s === "elevated") return "border-amber-400/20 bg-amber-500/10 text-amber-200";
  return "border-rose-400/20 bg-rose-500/10 text-rose-200";
}

export default function PlanetControlPage() {
  const [sector, setSector] = useOSState<string>("os.planet.sector", "prime");
  const [status, setStatus] = useOSState<ZoneStatus>("os.planet.status", "nominal");

  const rightPill = useMemo(
    () => (
      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
        colony: active
      </span>
    ),
    []
  );

  return (
    <OSShell
      zone="planet"
      title="Orbital Nexus / Planet Control"
      subtitle={
        <OSSub
          en="Planet dashboard with animated zones (frontend-only)."
          i18n={{
            es: "Panel del planeta con zonas animadas (solo frontend).",
            fr: "Tableau de bord planete avec zones animees (frontend uniquement).",
            pt: "Painel do planeta com zonas animadas (somente frontend).",
            de: "Planet-Dashboard mit animierten Zonen (nur Frontend).",
            it: "Dashboard del pianeta con zone animate (solo frontend).",
            nl: "Planeet-dashboard met geanimeerde zones (alleen frontend).",
            tr: "Animasyonlu bolgelerle gezegen paneli (yalnizca frontend).",
            ar: "Lawhat al-kawkab ma a manatiq mutaharika (frontend faqat).",
            hi: "Animated zones ke sath planet dashboard (sirf frontend).",
            zh: "Xing qiu kan ban: dong hua qu yu (jin xian frontend).",
            ja: "Wakusei dashubodo: anime zon (frontend nomi).",
            ko: "Haengseong daesibodeu: aenime zon (frontend man).",
          }}
        />
      }
      chips={["online", "deck: orbital-nexus", `sector: ${sector}`, `status: ${status}`, "sync: local"]}
      rightSlot={rightPill}
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <OSHUD seed="planet-control" />

          {/* Top controls (frontend-only, but makes it feel “alive”) */}
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-widest text-white/60">Nexus controls</div>
                <div className="mt-1 text-sm text-white/70">
                  Sector routing + system status are local UI state (safe).
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={[
                    "rounded-full border px-3 py-1 text-xs",
                    statusChipClass(status),
                  ].join(" ")}
                >
                  status: {status}
                </span>

                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs text-white/80 outline-none"
                  title="Sector"
                >
                  <option value="prime">prime</option>
                  <option value="aurora">aurora</option>
                  <option value="deepfield">deepfield</option>
                </select>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ZoneStatus)}
                  className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs text-white/80 outline-none"
                  title="Status"
                >
                  <option value="nominal">nominal</option>
                  <option value="elevated">elevated</option>
                  <option value="degraded">degraded</option>
                </select>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-3">
              <BoxLink href="/os/timeline" title="Chronochart" desc="2026–2050 future track." tag="Module" />
              <BoxLink href="/os/council" title="AI Council" desc="Multi-core planning panel." tag="Module" />
              <BoxLink href="/os/settings" title="Settings" desc="Profile + theme sync." tag="Module" />
            </div>

            <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2">
              <BoxLink href="/os/terminal" title="Terminal" desc="Command layer (Phase C = persistent)." tag="Module" />
              <BoxLink href="/assistant" title="SH Assistant" desc="Chat module via /api/public/chat." tag="AI" />
            </div>
          </div>

          {/* Zones grid */}
          <div className="os-planet-grid rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-widest text-white/60">Zones</div>
                <div className="mt-1 text-sm text-white/70">
                  Hover tiles for glow. Click to enter subsystem.
                </div>
              </div>

              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                routing: stable
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="os-zone rounded-xl border border-white/10 bg-black/30 p-4">
                <span className="os-zone-pulse" />
                <BoxLink
                  href="/os/cognitive"
                  title="Academy Sector"
                  desc="Cadet training protocols."
                  tag="Subsystem"
                />
                <div className="mt-2 text-xs text-white/55">Energy, friction, recovery, stuck.</div>
              </div>

              <div className="os-zone rounded-xl border border-white/10 bg-black/30 p-4">
                <span className="os-zone-pulse" />
                <BoxLink
                  href="/os/focus"
                  title="Research Dome"
                  desc="Deep work rituals and execution."
                  tag="Subsystem"
                />
                <div className="mt-2 text-xs text-white/55">Warm-up, lock-in, work loops.</div>
              </div>

              <div className="os-zone rounded-xl border border-white/10 bg-black/30 p-4">
                <span className="os-zone-pulse" />
                <BoxLink
                  href="/os/trajectory"
                  title="Industrial Ring"
                  desc="Mission control and outcomes."
                  tag="Subsystem"
                />
                <div className="mt-2 text-xs text-white/55">Foundation to outcome phases.</div>
              </div>

              <div className="os-zone rounded-xl border border-white/10 bg-black/30 p-4">
                <span className="os-zone-pulse" />
                <BoxLink
                  href="/os/momentum"
                  title="Comms and Momentum"
                  desc="Feedback loops and drills."
                  tag="Subsystem"
                />
                <div className="mt-2 text-xs text-white/55">Drill, reflection, hard prompts.</div>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-white/10 bg-black/40 p-3 text-xs text-white/60">
              Next: add badges that reflect saved state (focus mode, last phase) + wire zones into missions/timeline.
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <OSLogbook bootEntry="Orbital Nexus booted. Colony zones online." />
        </div>
      </div>
    </OSShell>
  );
}