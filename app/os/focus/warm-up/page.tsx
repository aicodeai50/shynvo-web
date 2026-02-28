import OSShell from "@/components/os/OSShell";
import { BackRow } from "@/components/os/OSCard";

export default function WarmUpPage() {
  return (
    <OSShell zone="focus"
  title="Focus / Warm-up" subtitle="3-minute ignition: wake recall, prime focus, start clean." chips={["online", "module: focus", "stage: warm-up", "sync: idle"]}>
      <BackRow href="/os/focus" label="Back to Focus" />

      <div className="rounded-xl border border-white/10 bg-black/30 p-4">
        <div className="text-xs uppercase tracking-widest text-white/60">Warm-up protocol (3 minutes)</div>
        <div className="mt-3 space-y-2 text-sm text-white/80">
          <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-3">1) 10 flash recalls (quick questions, no notes)</div>
          <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-3">2) Write: “Today’s win is ___”</div>
          <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-3">3) Start timer and begin the first tiny action</div>
        </div>
      </div>
    </OSShell>
  );
}
