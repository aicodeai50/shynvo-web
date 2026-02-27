import OSShell from "@/components/os/OSShell";
import { BoxLink } from "@/components/os/OSCard";

export default function CognitiveHubPage() {
  return (
    <OSShell
      title="Cognitive"
      subtitle="Signal-based guidance for energy, friction, recovery, and getting unstuck."
      chips={["online", "module: cognitive", "signal: ready", "sync: idle"]}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <BoxLink href="/os/cognitive/energy" title="Energy" desc="Session length + break type based on signal." tag="protocol" icon="âš¡" />
        <BoxLink href="/os/cognitive/friction" title="Friction" desc="Identify blockers and apply quick fixes." tag="protocol" icon="í·©" />
        <BoxLink href="/os/cognitive/recovery" title="Recovery" desc="Downshift, rest window, reset prompts." tag="protocol" icon="í»Ÿ" />
        <BoxLink href="/os/cognitive/stuck" title="Stuck" desc="Reduce scope, reframe, generate next step." tag="protocol" icon="í· " />
      </div>
    </OSShell>
  );
}
