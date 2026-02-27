import OSShell from "@/components/os/OSShell";
import { BoxLink } from "@/components/os/OSCard";

export default function MomentumPage() {
  return (
    <OSShell title="Momentum" subtitle="Keep moving: drills, reflection, and hard prompts." chips={["online", "module: momentum", "signal: alive", "sync: idle"]}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <BoxLink href="/os/momentum/drill" title="Drill" desc="Short repetition loop." tag="mode" icon="íµŠ" />
        <BoxLink href="/os/momentum/reflection" title="Reflection" desc="Close loops and learn." tag="mode" icon="íºž" />
        <BoxLink href="/os/momentum/hard-prompt" title="Hard Prompt" desc="One question that forces clarity." tag="mode" icon="âš¡" />
      </div>
    </OSShell>
  );
}
