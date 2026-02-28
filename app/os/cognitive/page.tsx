import OSShell from "@/components/os/OSShell";
import { BoxLink } from "@/components/os/OSCard";
import OSSub from "@/components/os/OSSub";

export default function CognitiveHubPage() {
  return (
    <OSShell
      zone="cognitive"
  title="Cognitive"
      subtitle={
        <OSSub
          en="Signal-based guidance for energy, friction, recovery, and getting unstuck."
          i18n={{
            es: "Guia basada en senales: energia, friccion, recuperacion y destrabarse.",
            fr: "Guidage par signaux: energie, friction, recuperation, se debloquer.",
            pt: "Guia por sinais: energia, friccao, recuperacao e destravar.",
            de: "Signalbasierte Hilfe: Energie, Reibung, Erholung, Blockade loesen.",
            it: "Guida a segnali: energia, attrito, recupero, sblocco.",
            nl: "Signaal-gestuurde hulp: energie, wrijving, herstel, vastlopen.",
            tr: "Sinyal tabanli rehber: enerji, surtunme, toparlanma, takilma.",
            ar: "Irshad bi-isharat: taqa, ihtikak, taafi, fak al-tajanub.",
            hi: "Signal-based guidance: energy, friction, recovery, aur unstuck.",
            zh: "Xin hao zhi dao: neng liang, zu li, hui fu, jie ka.",
            ja: "Shingou shidou: enerugi, furikushon, kaifuku, unstuck.",
            ko: "Signal guide: energy, friction, recovery, unstuck.",
          }}
        />
      }
      chips={["online", "module: cognitive", "signal: ready", "sync: idle"]}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <BoxLink href="/os/cognitive/energy" title="Energy" desc="Session length and break type based on signal." tag="protocol" />
        <BoxLink href="/os/cognitive/friction" title="Friction" desc="Identify blockers and apply quick fixes." tag="protocol" />
        <BoxLink href="/os/cognitive/recovery" title="Recovery" desc="Downshift, rest window, reset prompts." tag="protocol" />
        <BoxLink href="/os/cognitive/stuck" title="Stuck" desc="Reduce scope, reframe, generate next step." tag="protocol" />
      </div>
    </OSShell>
  );
}
