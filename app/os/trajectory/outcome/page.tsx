import OSShell from "@/components/os/OSShell";
import { BackRow, OSCard } from "@/components/os/OSCard";

export default function OutcomePage() {
  return (
    <OSShell zone="trajectory"
  title="Trajectory / Outcome" subtitle="Ship, measure, iterate." chips={["online", "phase: outcome", "missions: active", "sync: idle"]}>
      <BackRow href="/os/trajectory" label="Back to Trajectory" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <OSCard title="Objective" value="Ship results" hint="measurable" icon="í¿" />
        <OSCard title="This week" value="Deliverable" hint="publish/submit" icon="í³¦" />
        <OSCard title="Next action" value="Define metric" hint="success criteria" icon="í³" />
      </div>
    </OSShell>
  );
}
