import OSShell from "@/components/os/OSShell";
import { BackRow } from "@/components/os/OSCard";

export default function HardPromptPage() {
  return (
    <OSShell zone="momentum"
  title="Momentum / Hard Prompt" subtitle="A single question that forces clarity." chips={["online", "mode: hard-prompt", "sync: idle", "shield: on"]}>
      <BackRow href="/os/momentum" label="Back to Momentum" />
      <div className="rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-white/80">
        Hard prompt: “If I could only do ONE thing today, what would make everything else easier?”
      </div>
    </OSShell>
  );
}
