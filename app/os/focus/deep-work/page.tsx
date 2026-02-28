import OSShell from "@/components/os/OSShell";
import { BackRow } from "@/components/os/OSCard";

export default function DeepWorkPage() {
  return (
    <OSShell zone="focus"
  title="Focus / Deep Work" subtitle="Protect the sprint and eliminate context switching." chips={["online", "module: focus", "mode: deep-work", "sync: locked"]}>
      <BackRow href="/os/focus" label="Back to Focus" />

      <div className="rounded-xl border border-white/10 bg-black/30 p-4">
        <div className="text-xs uppercase tracking-widest text-white/60">Deep work rules</div>
        <div className="mt-3 space-y-2 text-sm text-white/80">
          <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-3">1) One task only</div>
          <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-3">2) No messages, no tabs</div>
          <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-3">3) 45–60 min sprint • full break after</div>
        </div>
      </div>
    </OSShell>
  );
}
