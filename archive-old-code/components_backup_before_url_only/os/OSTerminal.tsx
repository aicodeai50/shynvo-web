import React from "react";

export type OSTerminalLine = {
  t: "sys" | "user" | "out";
  v: string;
};

export default function OSTerminal({
  title,
  lines,
  footerHint,
}: {
  title?: string;
  lines: OSTerminalLine[];
  footerHint?: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/60 p-5">
      {title ? (
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm font-semibold text-white/80">{title}</div>
          <div className="text-xs text-white/40">TERMINAL</div>
        </div>
      ) : null}

      <div className="rounded-2xl border border-white/10 bg-black/70 p-4 font-mono text-sm">
        {lines.map((l, i) => (
          <div key={i} className="flex gap-3 leading-6">
            <span className="w-12 shrink-0 text-white/40">
              {l.t === "sys" ? "[sys]" : l.t === "user" ? "[you]" : "[out]"}
            </span>
            <span className="text-white/80">{l.v}</span>
          </div>
        ))}

        {footerHint ? (
          <div className="mt-3 border-t border-white/10 pt-3 text-xs text-white/40">
            {footerHint}
          </div>
        ) : null}
      </div>
    </div>
  );
}
