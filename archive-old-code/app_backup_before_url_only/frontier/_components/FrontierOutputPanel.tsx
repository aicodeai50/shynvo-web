type FrontierOutputPanelProps = {
  title?: string;
  summary: string;
  meaning?: string;
  nextAction: string;
  why: string[];
  deliverables: string[];
  risk?: string;
  encouragement?: string;
};

export default function FrontierOutputPanel({
  title = "AI guidance",
  summary,
  meaning,
  nextAction,
  why,
  deliverables,
  risk,
  encouragement,
}: FrontierOutputPanelProps) {
  return (
    <div className="rounded-3xl border border-lime-400/20 bg-lime-400/10 p-5">
      <div className="text-sm font-semibold text-lime-100">{title}</div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
          Summary
        </div>
        <p className="mt-2 text-sm leading-6 text-white/88">{summary}</p>

      {meaning ? (
        <div className="mt-4">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
            What this means
          </div>
          <p className="mt-2 text-sm leading-6 text-white/75">
            {meaning}
          </p>
        </div>
      ) : null}
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
          Recommended next action
        </div>
        <p className="mt-2 text-sm leading-6 text-white/88">{nextAction}</p>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
            Why this path
          </div>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-white/80">
            {why.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
            Deliverables
          </div>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-white/80">
            {deliverables.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>

      {risk ? (
        <div className="mt-4 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-100/80">
            Watchout
          </div>
          <p className="mt-2 text-sm leading-6 text-amber-50/90">{risk}</p>
        </div>
      ) : null}
    </div>
  );
}
