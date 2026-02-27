import OSShell from "@/components/os/OSShell";
import { BackRow, OSCard } from "@/components/os/OSCard";

export default function AccelerationPage() {
  return (
    <OSShell title="Trajectory / Acceleration" subtitle="Increase output with stable loops." chips={["online", "phase: acceleration", "missions: active", "sync: idle"]}>
      <BackRow href="/os/trajectory" label="Back to Trajectory" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <OSCard title="Objective" value="More output" hint="same stress" icon="íº€" />
        <OSCard title="This week" value="2 deep sessions" hint="protect time" icon="â±ï¸" />
        <OSCard title="Next action" value="Schedule 2 blocks" hint="calendar" icon="í³Œ" />
      </div>
    </OSShell>
  );
}
