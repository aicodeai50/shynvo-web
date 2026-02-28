import Link from "next/link";
import OSShell from "@/components/os/OSShell";
import { BackRow } from "@/components/os/OSCard";

export default function LockInPage() {
  return (
    <OSShell zone="focus"
  title="Focus / Lock-in" subtitle="Remove distractions, define the win, start." chips={["online", "module: focus", "mode: lock-in", "sync: idle"]}>
      <BackRow href="/os/focus" label="Back to Focus" />

      <div className="rounded-xl border border-white/10 bg-black/30 p-4">
        <div className="text-xs uppercase tracking-widest text-white/60">Lock-in protocol</div>
        <div className="mt-3 space-y-2 text-sm text-white/80">
          <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-3">1) Silence notifications • phone away • close tabs</div>
          <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-3">2) Write the win: “In 25 minutes, I will have ___”</div>
          <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-3">3) Start timer • single-thread • ship a slice</div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Start 25-min session</button>
          <Link href="/os/focus/work" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Go to Work Loop</Link>
        </div>
      </div>
    </OSShell>
  );
}
