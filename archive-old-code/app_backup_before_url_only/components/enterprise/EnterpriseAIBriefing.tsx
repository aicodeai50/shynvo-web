import { getEnterpriseBriefing } from "@/lib/enterprise/aiSignals";

function toneClasses(tone: "stable" | "watch" | "action") {
  if (tone === "stable") {
    return "border-emerald-400/20 bg-emerald-400/10 text-emerald-100";
  }
  if (tone === "watch") {
    return "border-amber-400/20 bg-amber-400/10 text-amber-100";
  }
  return "border-rose-400/20 bg-rose-400/10 text-rose-100";
}

export default function EnterpriseAIBriefing({ area }: { area: string }) {
  const briefing = getEnterpriseBriefing(area);

  return (
    <div className="mt-8 rounded-[1.75rem] border border-emerald-300/15 bg-white/[0.04] p-5 backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/65">
            {briefing.headline}
          </div>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-white/72 sm:text-base">
            {briefing.summary}
          </p>
        </div>

        <div className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-100/85">
          AI Active
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="grid gap-3 sm:grid-cols-3">
          {briefing.signals.map((signal) => (
            <div
              key={signal.title}
              className="rounded-2xl border border-white/10 bg-black/20 p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm font-semibold text-white">{signal.title}</div>
                <span
                  className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${toneClasses(signal.tone)}`}
                >
                  {signal.tone}
                </span>
              </div>
              <div className="mt-2 text-sm leading-6 text-white/65">{signal.detail}</div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
            Suggested Next Steps
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {briefing.suggestions.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-4 text-sm font-semibold text-emerald-100/85">
            Review with AI →
          </div>
        </div>
      </div>
    </div>
  );
}
