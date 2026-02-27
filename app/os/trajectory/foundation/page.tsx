import OSShell from "@/components/os/OSShell";
import { BackRow, OSCard } from "@/components/os/OSCard";

export default function FoundationPage() {
  return (
    <OSShell title="Trajectory / Foundation" subtitle="Stabilize systems and build baseline." chips={["online", "phase: foundation", "missions: active", "sync: idle"]}>
      <BackRow href="/os/trajectory" label="Back to Trajectory" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <OSCard title="Objective" value="Stability + clarity" hint="reduce chaos" icon="í·±" />
        <OSCard title="This week" value="3 missions" hint="small wins" icon="í³†" />
        <OSCard title="Next action" value="Pick one system to lock" hint="start now" icon="âœ…" />
      </div>
    </OSShell>
  );
}
