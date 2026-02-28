import OSShell from "@/components/os/OSShell";
import { BackRow } from "@/components/os/OSCard";

export default function ReflectionPage() {
  return (
    <OSShell zone="momentum"
  title="Momentum / Reflection" subtitle="Close loops: what worked, what didn’t." chips={["online", "mode: reflection", "sync: idle", "shield: on"]}>
      <BackRow href="/os/momentum" label="Back to Momentum" />
      <div className="rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-white/80">
        Reflection prompt: “What is the smallest change that improves tomorrow?”
      </div>
    </OSShell>
  );
}
