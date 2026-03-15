import Link from "next/link";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";

const TEAMS = [
  {
    title: "Engineering",
    href: "/enterprise/teams/engineering",
    desc: "Members, mission ownership, and internal coordination.",
  },
  {
    title: "Marketing",
    href: "/enterprise/teams/marketing",
    desc: "Members, mission ownership, and internal coordination.",
  },
  {
    title: "Product",
    href: "/enterprise/teams/product",
    desc: "Members, mission ownership, and internal coordination.",
  },
];

export default function EnterpriseTeamsPage() {
  return (
    <section className="py-10 sm:py-14">
      <EnterpriseNav hubHref="/enterprise" hubTitle="Shynvo Enterprise" />

      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
        Shynvo Enterprise
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        Teams
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        Teams organizes departments, members, responsibilities, and collaboration structure across the company.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {TEAMS.map((team) => (
          <Link
            key={team.title}
            href={team.href}
            className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6 transition hover:bg-white/10"
          >
            <div className="text-2xl font-semibold text-white">{team.title}</div>
            <div className="mt-3 text-sm leading-6 text-white/70">{team.desc}</div>
            <div className="mt-5 text-sm font-semibold text-white/90">Open team →</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
