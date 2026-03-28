"use client";

import Link from "next/link";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";

const teams = [
  { title: "Engineering", href: "/enterprise/teams/engineering", desc: "Product engineering, platform systems, and technical delivery." },
  { title: "Marketing", href: "/enterprise/teams/marketing", desc: "Campaigns, growth, communication, and audience reach." },
  { title: "Product", href: "/enterprise/teams/product", desc: "Product direction, planning, research, and roadmap ownership." },
];

export default function EnterpriseTeamsPage() {
  return (
    <section className="py-10 sm:py-14">
      <EnterpriseNav label="Enterprise Teams" />

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/65">
          Teams
        </div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          Teams
        </h1>
        <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
          Open a team workspace below.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {teams.map((team) => (
          <Link
            key={team.href}
            href={team.href}
            className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5 transition hover:bg-white/[0.06]"
          >
            <h2 className="text-2xl font-semibold text-white">{team.title}</h2>
            <p className="mt-3 text-sm leading-6 text-white/68">{team.desc}</p>
            <div className="mt-5 text-sm font-semibold text-white/90">Open team →</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
