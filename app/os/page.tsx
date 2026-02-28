import OSShell from "@/components/os/OSShell";
import { BoxLink } from "@/components/os/OSCard";
import OSSub from "@/components/os/OSSub";

export default function OSHomePage() {
  return (
    <OSShell
      zone="home"
  title="Shynvo OS"
      subtitle={
        <OSSub
          en="Cockpit interface for focus, cognition, momentum, and missions."
          i18n={{
            es: "Interfaz tipo cabina para enfoque, cognicion, impulso y misiones.",
            fr: "Interface cockpit pour focus, cognition, elan et missions.",
            pt: "Interface estilo cockpit para foco, cognicao, impulso e missoes.",
            de: "Cockpit-Oberflaeche fuer Fokus, Kognition, Momentum und Missionen.",
            it: "Interfaccia cockpit per focus, cognizione, slancio e missioni.",
            nl: "Cockpit-interface voor focus, cognitie, momentum en missies.",
            tr: "Odak, bilis, ivme ve gorevler icin kokpit arayuzu.",
            ar: "Wajhat qamrat qiyada lil-tarkiz wal-idrak wal-zakhm wal-maham.",
            hi: "Focus, cognition, momentum aur missions ke liye cockpit interface.",
            zh: "Jia shi cang jie mian: zhuan zhu, ren zhi, dong liang, ren wu.",
            ja: "Kokupitto UI: shuchu, ninchi, momentum, misshon.",
            ko: "Kokpit UI: jipjung, inji, momentum, miseon.",
          }}
        />
      }
      chips={["online", "deck: os-home", "signal: ready", "sync: idle"]}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <BoxLink href="/os/planet" title="Orbital Nexus" desc="Planet Control dashboard." tag="new" />
        <BoxLink href="/os/cognitive" title="Cognitive" desc="Energy, friction, recovery, stuck protocols." tag="C" />
        <BoxLink href="/os/focus" title="Focus" desc="Warm-up, lock-in, work loops." tag="B" />
        <BoxLink href="/os/momentum" title="Momentum" desc="Drills, reflections, hard prompts." tag="A/B" />
        <BoxLink href="/os/trajectory" title="Trajectory" desc="90-day mission control." tag="D" />
        <BoxLink href="/os/terminal" title="Terminal" desc="Diagnostics + route launcher." tag="tool" />
      </div>
    </OSShell>
  );
}
