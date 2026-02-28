import OSShell from "@/components/os/OSShell";
import { BoxLink } from "@/components/os/OSCard";
import OSSub from "@/components/os/OSSub";

export default function MomentumPage() {
  return (
    <OSShell
      zone="momentum"
  title="Momentum"
      subtitle={
        <OSSub
          en="Keep moving: drills, reflection, and hard prompts."
          i18n={{
            es: "Sigue avanzando: practicas, reflexion y preguntas duras.",
            fr: "Avancer: exercices, reflexion, questions difficiles.",
            pt: "Continuar: treinos, reflexao e perguntas dificeis.",
            de: "In Bewegung bleiben: Drills, Reflexion, harte Fragen.",
            it: "Continua: esercizi, riflessione, domande difficili.",
            nl: "Blijf gaan: drills, reflectie, harde vragen.",
            tr: "Devam et: drill, yansima, zor sorular.",
            ar: "Istamir: tamarin, tafakkur, asila saaba.",
            hi: "Keep moving: drills, reflection, hard prompts.",
            zh: "Bao chi dong liang: xun lian, fan si, ying ti wen ti.",
            ja: "Momentum: drill, reflection, hard prompt.",
            ko: "Momentum: drill, reflection, hard prompt.",
          }}
        />
      }
      chips={["online", "module: momentum", "signal: alive", "sync: idle"]}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <BoxLink href="/os/momentum/drill" title="Drill" desc="Short repetition loop." tag="mode" />
        <BoxLink href="/os/momentum/reflection" title="Reflection" desc="Close loops and learn." tag="mode" />
        <BoxLink href="/os/momentum/hard-prompt" title="Hard Prompt" desc="One question that forces clarity." tag="mode" />
      </div>
    </OSShell>
  );
}
