import OSShell from "@/components/os/OSShell";
import { BoxLink } from "@/components/os/OSCard";

export default function TrajectoryPage() {
  return (
    <OSShell title="Trajectory" subtitle="90-day mission control." chips={["online", "module: trajectory", "phase: overview", "sync: idle"]}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <BoxLink href="/os/trajectory/foundation" title="Foundation" desc="Set systems and remove chaos." tag="Phase 1" icon="í·±" />
        <BoxLink href="/os/trajectory/acceleration" title="Acceleration" desc="Increase output with stable loops." tag="Phase 2" icon="íº€" />
        <BoxLink href="/os/trajectory/specialization" title="Specialization" desc="Narrow focus and deepen skill." tag="Phase 3" icon="í¾¯" />
        <BoxLink href="/os/trajectory/outcome" title="Outcome" desc="Ship, measure, iterate." tag="Phase 4" icon="í¿" />
      </div>
    </OSShell>
  );
}
