import OSShell from "@/components/os/OSShell";
import { BackRow, OSCard } from "@/components/os/OSCard";

export default function SpecializationPage() {
  return (
    <OSShell zone="trajectory"
  title="Trajectory / Specialization" subtitle="Narrow focus and deepen skill." chips={["online", "phase: specialization", "missions: active", "sync: idle"]}>
      <BackRow href="/os/trajectory" label="Back to Trajectory" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <OSCard title="Objective" value="Depth" hint="fewer topics" icon="í¾¯" />
        <OSCard title="This week" value="1 skill slice" hint="mastery" icon="í·©" />
        <OSCard title="Next action" value="Choose one track" hint="commit" icon="âœ…" />
      </div>
    </OSShell>
  );
}
