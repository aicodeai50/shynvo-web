"use client";

export type RobotMode =
  | "Tutor"
  | "Interviewer"
  | "Analyst"
  | "Builder"
  | "Support";

const MODES: { key: RobotMode; desc: string }[] = [
  { key: "Tutor", desc: "Explains, teaches, guides learning paths." },
  { key: "Interviewer", desc: "Simulates interviews + feedback." },
  { key: "Analyst", desc: "Breaks down skills, gaps, and next steps." },
  { key: "Builder", desc: "Helps generate projects + execution steps." },
  { key: "Support", desc: "Friendly help, onboarding, and FAQs." },
];

export default function RobotModePicker({
  mode,
  setMode,
  disabled,
}: {
  mode: RobotMode;
  setMode: (m: RobotMode) => void;
  disabled?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-sm text-neutral-400">Assistant mode</div>
          <div className="text-lg font-semibold text-neutral-100">{mode}</div>
        </div>

        <div className="flex flex-wrap gap-2">
          {MODES.map((m) => (
            <button
              key={m.key}
              disabled={disabled}
              onClick={() => setMode(m.key)}
              className={`rounded-xl border px-3 py-2 text-sm transition ${
                m.key === mode
                  ? "border-neutral-200/50 bg-neutral-200/10 text-neutral-100"
                  : "border-neutral-800 bg-black text-neutral-300 hover:text-white"
              } ${disabled ? "opacity-50" : ""}`}
              title={m.desc}
            >
              {m.key}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 text-sm text-neutral-400">
        {MODES.find((m) => m.key === mode)?.desc}
      </div>
    </div>
  );
}