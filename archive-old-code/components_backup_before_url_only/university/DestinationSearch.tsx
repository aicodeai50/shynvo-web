"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export type Destination = {
  label: string;
  keywords: string[];
  href: (opts: { faculty?: string; q?: string }) => string;
};

function norm(s: string) {
  return (s || "").toLowerCase().trim();
}

export default function DestinationSearch({
  faculty,
  destinations,
  placeholder = "Search a destination… (e.g., exam, study, concept, career)",
}: {
  faculty?: string;
  destinations: Destination[];
  placeholder?: string;
}) {
  const router = useRouter();
  const [q, setQ] = useState("");

  const matches = useMemo(() => {
    const query = norm(q);
    if (!query) return destinations.slice(0, 6);

    const scored = destinations
      .map((d) => {
        const hay = norm([d.label, ...d.keywords].join(" "));
        let score = 0;

        // Simple scoring: exact label contains > keyword contains
        if (norm(d.label).includes(query)) score += 4;
        if (d.keywords.some((k) => norm(k).includes(query))) score += 2;
        if (hay.includes(query)) score += 1;

        return { d, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score);

    return scored.slice(0, 8).map((x) => x.d);
  }, [q, destinations]);

  function go(to: Destination) {
    const href = to.href({ faculty, q: q.trim() || undefined });
    router.push(href);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!matches.length) return;
    go(matches[0]); // top match
  }

  return (
    <div className="rounded-3xl border border-white/15 bg-black/35 p-5 backdrop-blur-xl">
      <div className="text-xs tracking-widest text-white/60">SEARCH DESTINATION</div>

      <form onSubmit={onSubmit} className="mt-3 flex flex-col gap-3 md:flex-row">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-white/15 bg-black/50 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
        />
        <button
          type="submit"
          className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm text-white/85 hover:bg-white/15"
        >
          Go →
        </button>
      </form>

      <div className="mt-3 flex flex-wrap gap-2">
        {matches.map((d) => (
          <button
            key={d.label}
            type="button"
            onClick={() => go(d)}
            className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/75 hover:bg-white/10"
          >
            {d.label} →
          </button>
        ))}
        {!matches.length ? (
          <div className="text-xs text-white/50">No matches. Try “study”, “exam”, “concept”, “career”.</div>
        ) : null}
      </div>
    </div>
  );
}
