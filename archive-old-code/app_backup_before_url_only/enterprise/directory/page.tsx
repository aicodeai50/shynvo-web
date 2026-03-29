"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";

type Person = {
  id: string;
  name: string;
  role: string;
  team: string;
  email?: string;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const INITIAL_PEOPLE: Person[] = [
  { id: "amina-yusuf", name: "Amina Yusuf", role: "CEO", team: "Leadership", email: "amina@company.com" },
  { id: "daniel-reed", name: "Daniel Reed", role: "Engineering Lead", team: "Engineering", email: "daniel@company.com" },
  { id: "sarah-cole", name: "Sarah Cole", role: "Product Lead", team: "Product", email: "sarah@company.com" },
  { id: "michael-hart", name: "Michael Hart", role: "Marketing Lead", team: "Marketing", email: "michael@company.com" },
  { id: "lina-hassan", name: "Lina Hassan", role: "Operations", team: "Operations", email: "lina@company.com" },
  { id: "david-moore", name: "David Moore", role: "Frontend Engineer", team: "Engineering", email: "david@company.com" },
];

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "??";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

function slugifyName(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function EnterpriseDirectoryPage() {
  const [people, setPeople] = useState<Person[]>(INITIAL_PEOPLE);
  const [query, setQuery] = useState("");

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [team, setTeam] = useState("");
  const [email, setEmail] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return people;

    return people.filter((person) => {
      return (
        person.name.toLowerCase().includes(q) ||
        person.role.toLowerCase().includes(q) ||
        person.team.toLowerCase().includes(q) ||
        (person.email ?? "").toLowerCase().includes(q)
      );
    });
  }, [people, query]);

  function addMember() {
    const cleanName = name.trim();
    const cleanRole = role.trim();
    const cleanTeam = team.trim();
    const cleanEmail = email.trim();

    if (!cleanName || !cleanRole || !cleanTeam) return;

    const next: Person = {
      id: slugifyName(cleanName) || `${Date.now()}`,
      name: cleanName,
      role: cleanRole,
      team: cleanTeam,
      email: cleanEmail || undefined,
    };

    setPeople((prev) => [next, ...prev]);
    setName("");
    setRole("");
    setTeam("");
    setEmail("");
  }

  function removeMember(id: string) {
    setPeople((prev) => prev.filter((person) => person.id !== id));
  }

  const totalTeams = new Set(people.map((p) => p.team)).size;

  return (
    <section className="relative py-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(1000px_520px_at_10%_10%,rgba(34,197,94,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_560px_at_85%_15%,rgba(16,185,129,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_50%_100%,rgba(59,130,246,0.06),transparent_55%)]" />
      </div>

      <EnterpriseNav
        hubHref="/enterprise"
        hubTitle="Shynvo Enterprise"
        label="Member Directory"
      />

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/70">
            Shynvo Enterprise
          </div>

          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            Member Directory
          </h1>

          <p className="mt-4 max-w-5xl text-sm leading-6 text-white/70 sm:text-base">
            Directory helps companies manage their people structure across teams, roles,
            and functional areas. Add new members, search the organization, and keep the
            company structure visible in one place.
          </p>
        </div>

        <div className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-100">
          People: {people.length} • Teams: {totalTeams}
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Add Member
          </div>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
            Create a directory entry
          </h2>

          <p className="mt-3 text-sm leading-6 text-white/70">
            Type any member name, role, team, and optional email.
          </p>

          <div className="mt-6 grid gap-4">
            <div>
              <label className="text-sm font-semibold text-white">Full name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Example: Sandra Herbert"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-white">Role</label>
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Example: Operations Lead"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-white">Team</label>
              <input
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                placeholder="Example: Operations"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-white">Email (optional)</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Example: sandra@company.com"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={addMember}
            className="mt-6 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
          >
            Add member
          </button>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Search Directory
          </div>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
            Find people by name, role, team, or email
          </h2>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, role, team, or email..."
            className="mt-5 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
          />

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <StatCard label="Members" value={`${people.length}`} />
            <StatCard label="Visible Results" value={`${filtered.length}`} />
            <StatCard label="Teams" value={`${totalTeams}`} />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
          Company Members
        </div>

        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Organization view
        </h2>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((person) => (
          <div
            key={person.id}
            className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6 backdrop-blur-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl border border-emerald-300/20 bg-emerald-400/10 text-sm font-semibold text-emerald-100">
                  {initialsFromName(person.name)}
                </div>

                <div>
                  <div className="text-xl font-semibold text-white">{person.name}</div>
                  <div className="mt-1 text-sm text-white/70">{person.role}</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeMember(person.id)}
                className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/65 hover:bg-white/10 hover:text-white"
              >
                Remove
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/75">
                {person.team}
              </span>

              {person.email ? (
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/75">
                  {person.email}
                </span>
              ) : null}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={`/enterprise/directory/${person.id}?name=${encodeURIComponent(person.name)}&role=${encodeURIComponent(person.role)}&team=${encodeURIComponent(person.team)}&email=${encodeURIComponent(person.email ?? "")}`}
                className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
              >
                Open profile
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
          No members found for this search.
        </div>
      ) : null}
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
      <div className="text-xs uppercase tracking-[0.18em] text-white/45">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
    </div>
  );
}
