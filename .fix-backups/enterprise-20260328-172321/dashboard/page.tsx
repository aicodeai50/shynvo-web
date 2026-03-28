"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";

function GaugeCard({
  title,
  value,
  helper,
  level,
  onChange,
}: {
  title: string;
  value: number;
  helper: string;
  level: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
      <div className="text-sm text-white/60">{title}</div>
      <div className="mt-3 text-4xl font-semibold text-white">{value}/100</div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-5 w-full"
      />
      <div className="mt-3 text-sm text-white/80">{level}</div>
      <div className="mt-1 text-sm text-white/60">{helper}</div>
    </div>
  );
}

function InfoCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="text-sm font-semibold text-white">{title}</div>
      <div className="mt-2 text-sm leading-6 text-white/70">{body}</div>
    </div>
  );
}

export default function EnterpriseDashboardPage() {
  const [missionHealth, setMissionHealth] = useState(82);
  const [teamLoad, setTeamLoad] = useState(67);
  const [meetingFlow, setMeetingFlow] = useState(74);
  const [note, setNote] = useState("");
  const [alerts, setAlerts] = useState<string[]>([
    "Engineering delivery pressure is rising ahead of next release.",
    "Leadership room should review current mission sequencing.",
    "Meeting rhythm is healthy but execution follow-through needs stronger ownership.",
  ]);

  const executiveReading = useMemo(() => {
    const missionState =
      missionHealth >= 80
        ? "mission execution is strong"
        : missionHealth >= 60
        ? "mission execution is stable but needs attention"
        : "mission execution is under strain";

    const loadState =
      teamLoad >= 80
        ? "team pressure is high"
        : teamLoad >= 60
        ? "team capacity is moderately loaded"
        : "team capacity is relatively balanced";

    const flowState =
      meetingFlow >= 80
        ? "coordination rhythm is highly effective"
        : meetingFlow >= 60
        ? "coordination rhythm is functional"
        : "coordination rhythm needs improvement";

    return `Current enterprise reading: ${missionState}, ${loadState}, and ${flowState}. Leadership should use this dashboard to decide where workload, sequencing, and communication need adjustment first.`;
  }, [missionHealth, teamLoad, meetingFlow]);

  return (
    <section className="py-10 sm:py-14">
      <EnterpriseNav hubHref="/enterprise" hubTitle="Shynvo Enterprise" label="Enterprise Dashboard" />

      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
        Shynvo Enterprise
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        Company Dashboard
      </h1>

      <p className="mt-4 max-w-5xl text-sm leading-6 text-white/70 sm:text-base">
        The dashboard is the company visibility layer. It gives leadership and teams
        a clean view of mission health, team pressure, meeting quality, and enterprise focus.
      </p>

      <div className="mt-6 rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
        <div className="text-sm font-semibold text-white">Executive Reading</div>
        <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/75">
          {executiveReading}
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <GaugeCard
          title="Mission Health"
          value={missionHealth}
          onChange={setMissionHealth}
          level={
            missionHealth >= 80
              ? "Strong execution flow"
              : missionHealth >= 60
              ? "Stable but needs monitoring"
              : "Needs leadership intervention"
          }
          helper="Measures execution confidence across company missions."
        />

        <GaugeCard
          title="Team Load"
          value={teamLoad}
          onChange={setTeamLoad}
          level={
            teamLoad >= 80
              ? "Heavy team pressure"
              : teamLoad >= 60
              ? "Moderate load across teams"
              : "Balanced workload"
          }
          helper="Shows pressure level across current execution responsibilities."
        />

        <GaugeCard
          title="Meeting Flow"
          value={meetingFlow}
          onChange={setMeetingFlow}
          level={
            meetingFlow >= 80
              ? "Healthy communication rhythm"
              : meetingFlow >= 60
              ? "Functional coordination rhythm"
              : "Needs stronger coordination"
          }
          helper="Shows whether meetings and room sessions are helping execution."
        />
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-xl font-semibold text-white">Leadership Notes</div>
          <p className="mt-2 text-sm leading-6 text-white/70">
            Record leadership observations, risks, sequence changes, and executive priorities.
          </p>

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write leadership notes, key risks, priority shifts, or current observations..."
            className="mt-4 min-h-[220px] w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-white/35"
          />

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <InfoCard
              title="What belongs here"
              body="Operational concerns, delivery pressure, sequencing decisions, meeting observations, and high-level leadership guidance."
            />
            <InfoCard
              title="How teams use this"
              body="This becomes the executive context layer that informs rooms, missions, analytics, and strategic review."
            />
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
            <div className="text-xl font-semibold text-white">Priority Alerts</div>
            <div className="mt-4 space-y-3">
              {alerts.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
            <div className="text-xl font-semibold text-white">Quick Access</div>
            <div className="mt-4 grid gap-3">
              <Link href="/enterprise/rooms" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80 hover:bg-white/10">
                Open Rooms
              </Link>
              <Link href="/enterprise/schedule" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80 hover:bg-white/10">
                Open Schedule
              </Link>
              <Link href="/enterprise/directory" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80 hover:bg-white/10">
                Open Directory
              </Link>
              <Link href="/enterprise/chat" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80 hover:bg-white/10">
                Open Company Chat
              </Link>
              <Link href="/enterprise/strategy" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80 hover:bg-white/10">
                Open AI Strategy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
