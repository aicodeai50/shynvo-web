import OSShell from "@/components/os/OSShell";
import { BoxLink } from "@/components/os/OSCard";
import OSHUD from "@/components/os/OSHUD";
import OSLogbook from "@/components/os/OSLogbook";

export default function PlanetControlPage() {
  return (
    <OSShell
      title="Orbital Nexus / Planet Control"
      subtitle="Control deck for the colony. Every feature is a subsystem."
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

          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="text-xs uppercase tracking-widest text-white/60">Zones</div>
            <div className="mt-2 text-sm text-white/70">
              Themed routes to your OS modules (frontend-only for now).
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <BoxLink href="/os/cognitive" title="Academy Sector" desc="Cadet training protocols." tag="Subsystem" icon="í¾“" />
              <BoxLink href="/os/focus" title="Research Dome" desc="Deep work rituals & execution." tag="Subsystem" icon="í·ª" />
              <BoxLink href="/os/trajectory" title="Industrial Ring" desc="Mission control & outcomes." tag="Subsystem" icon="í¿—ï¸" />
              <BoxLink href="/os/momentum" title="Comms & Momentum" desc="Feedback loops & drills." tag="Subsystem" icon="í³¡" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <OSLogbook bootEntry="Orbital Nexus booted. Colony systems online." />
        </div>
      </div>
    </OSShell>
  );
}
