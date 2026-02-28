import OSShell from "@/components/os/OSShell";
import { BackRow } from "@/components/os/OSCard";

export default function DrillPage() {
  return (
    <OSShell zone="momentum"
  title="Momentum / Drill" subtitle="Small reps to keep velocity." chips={["online", "mode: drill", "sync: idle", "shield: on"]}>
      <BackRow href="/os/momentum" label="Back to Momentum" />
      <div className="rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-white/80">
        10-minute drill: pick one micro-skill and repeat it 5 times.
      </div>
    </OSShell>
  );
}
