import OSShell from "@/components/os/OSShell";
import { BackRow, OSCard } from "@/components/os/OSCard";

export default function WorkPage() {
  return (
    <OSShell zone="focus"
  title="Focus / Work Loop" subtitle="Single objective execution loop." chips={["online", "module: focus", "loop: work", "sync: idle"]}>
      <BackRow href="/os/focus" label="Back to Focus" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <OSCard title="Objective" value="Ship a small slice" hint="done/not done" icon="í¾¯" />
        <OSCard title="Timer" value="25 min" hint="build block" icon="â±ï¸" />
        <OSCard title="Rule" value="No switching" hint="park thoughts" icon="í³µ" />
      </div>
    </OSShell>
  );
}
