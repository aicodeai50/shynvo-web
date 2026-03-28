"use client";

import Link from "next/link";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "??";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

export default async function EnterpriseMemberProfilePage({
  params,
  searchParams,
}: {
  params: Promise<{ memberId: string }>;
  searchParams: Promise<{
    name?: string;
    role?: string;
    team?: string;
    email?: string;
  }>;
}) {
  const { memberId } = await params;
  const data = await searchParams;

  const name = data.name || memberId.replace(/-/g, " ");
  const role = data.role || "Team Member";
  const team = data.team || "General";
  const email = data.email || "No email added";

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
        label="Member Profile"
      />

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          href="/enterprise/directory"
          className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white"
        >
          ← Back to Directory
        </Link>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="grid h-20 w-20 place-items-center rounded-3xl border border-emerald-300/20 bg-emerald-400/10 text-2xl font-semibold text-emerald-100">
              {initialsFromName(name)}
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/70">
                Shynvo Enterprise
              </div>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                {name}
              </h1>
              <p className="mt-2 text-sm text-white/70">{role}</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Team</div>
              <div className="mt-1 text-sm text-white/70">{team}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Email</div>
              <div className="mt-1 text-sm text-white/70">{email}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Profile ID</div>
              <div className="mt-1 text-sm text-white/70">{memberId}</div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Work Summary
          </div>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
            Professional overview
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Current Responsibility</div>
              <div className="mt-2 text-sm leading-6 text-white/70">
                {name} contributes to the {team} team as {role}, helping the company coordinate
                priorities, ownership, and execution.
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Enterprise Position</div>
              <div className="mt-2 text-sm leading-6 text-white/70">
                This profile can later connect to rooms, meetings, tasks, analytics, skills, and
                mission assignments inside Shynvo Enterprise.
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Connected Areas</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {["Rooms", "Missions", "Analytics", "Skill Matrix"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/75"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Future Expansion</div>
              <div className="mt-2 text-sm leading-6 text-white/70">
                Later this profile can include attendance, performance, activity logs, direct
                messaging, reporting lines, and live collaboration history.
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/enterprise/rooms"
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
            >
              Open rooms
            </Link>

            <Link
              href="/enterprise/missions"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
            >
              Open missions
            </Link>

            <Link
              href="/enterprise/analytics"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
            >
              Open analytics
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
