import OSShell from "@/components/os/OSShell";
import { BoxLink } from "@/components/os/OSCard";
import OSHUD from "@/components/os/OSHUD";
import OSLogbook from "@/components/os/OSLogbook";
import OSSub from "@/components/os/OSSub";
import "@/app/os/os-planet.css";

export default function PlanetControlPage() {
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
      chips={["online", "deck: orbital-nexus", "sector: prime", "sync: stable"]}
      rightSlot={
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
          colony: active
        </span>
      }
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <OSHUD seed="planet-control" />

          <div className="os-planet-grid rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-widest text-white/60">Zones</div>
                <div className="mt-1 text-sm text-white/70">
                  Hover tiles for glow. Click to enter subsystem.
                </div>
              </div>

              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                status: nominal
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="os-zone rounded-xl border border-white/10 bg-black/30 p-4">
                <span className="os-zone-pulse" />
                <BoxLink href="/os/cognitive" title="Academy Sector" desc="Cadet training protocols." tag="Subsystem" />
                <div className="mt-2 text-xs text-white/55">Energy, friction, recovery, stuck.</div>
              </div>

              <div className="os-zone rounded-xl border border-white/10 bg-black/30 p-4">
                <span className="os-zone-pulse" />
                <BoxLink href="/os/focus" title="Research Dome" desc="Deep work rituals and execution." tag="Subsystem" />
                <div className="mt-2 text-xs text-white/55">Warm-up, lock-in, work loops.</div>
              </div>

              <div className="os-zone rounded-xl border border-white/10 bg-black/30 p-4">
                <span className="os-zone-pulse" />
                <BoxLink href="/os/trajectory" title="Industrial Ring" desc="Mission control and outcomes." tag="Subsystem" />
                <div className="mt-2 text-xs text-white/55">Foundation to outcome phases.</div>
              </div>

              <div className="os-zone rounded-xl border border-white/10 bg-black/30 p-4">
                <span className="os-zone-pulse" />
                <BoxLink href="/os/momentum" title="Comms and Momentum" desc="Feedback loops and drills." tag="Subsystem" />
                <div className="mt-2 text-xs text-white/55">Drill, reflection, hard prompts.</div>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-white/10 bg-black/40 p-3 text-xs text-white/60">
              Next: add badges that reflect saved state (focus mode, last phase).
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
