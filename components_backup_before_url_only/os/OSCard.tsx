import React from "react";
import Link from "next/link";

export type OSCardProps = {
  title: string;
  subtitle?: string; // new style
  value?: string;    // legacy
  hint?: string;     // legacy
  icon?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
};

export function OSCard({
  title,
  subtitle,
  value,
  hint,
  icon,
  right,
  className = "",
  children,
}: OSCardProps) {
  const topLine = subtitle ?? value;
  const bottomLine = hint;

  return (
    <div className={["rounded-xl border border-white/10 bg-black/30 p-4", className].join(" ")}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {icon ? <div className="mt-0.5 text-lg text-white/80">{icon}</div> : null}
          <div>
            <div className="text-sm font-medium text-white/90">{title}</div>
            {topLine ? <div className="mt-1 text-sm text-white/80">{topLine}</div> : null}
            {bottomLine ? <div className="mt-1 text-xs text-white/55">{bottomLine}</div> : null}
          </div>
        </div>
        {right ? <div className="text-xs text-white/60">{right}</div> : null}
      </div>

      {children ? <div className="mt-3">{children}</div> : null}
    </div>
  );
}

export function BackRow({ href = "/os", label = "Back" }: { href?: string; label?: string }) {
  return (
    <div className="mb-4">
      <Link
        href={href}
        className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10"
      >
        <span className="text-white/60">←</span>
        {label}
      </Link>
    </div>
  );
}

export function BoxLink({
  href,
  title,
  subtitle,
  value,
  hint,
  desc, // legacy alias
  tag,  // legacy alias
  icon,
}: {
  href: string;
  title: string;
  subtitle?: string;
  value?: string;
  hint?: string;
  desc?: string;
  tag?: string;
  icon?: React.ReactNode;
}) {
  const finalSubtitle = subtitle ?? desc;
  const finalHint = hint ?? tag;

  return (
    <Link href={href} className="block">
      <OSCard
        title={title}
        subtitle={finalSubtitle}
        value={value}
        hint={finalHint}
        icon={icon}
        className="transition hover:bg-white/10"
      />
    </Link>
  );
}

export default OSCard;
