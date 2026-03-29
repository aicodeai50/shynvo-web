"use client";

import { useMemo, useState } from "react";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";

type ScheduleItem = {
  title: string;
  type: "Leadership" | "Review" | "Sync" | "Planning";
  owner: string;
};

export default function EnterpriseSchedulePage() {
  const [meeting, setMeeting] = useState("");
  const [schedule, setSchedule] = useState<ScheduleItem[]>([
    { title: "09:00 — Leadership Room", type: "Leadership", owner: "Executive" },
    { title: "11:00 — Product Review", type: "Review", owner: "Product Team" },
    { title: "14:00 — Engineering Sync", type: "Sync", owner: "Engineering" },
    { title: "16:00 — Marketing Planning", type: "Planning", owner: "Marketing" },
  ]);

  function addMeeting() {
    const text = meeting.trim();
    if (!text) return;

    setSchedule((prev) => [
      { title: text, type: "Planning", owner: "Unassigned" },
      ...prev,
    ]);
    setMeeting("");
  }

  const scheduleReading = useMemo(() => {
    const leadershipCount = schedule.filter((item) => item.type === "Leadership").length;
    const reviewCount = schedule.filter((item) => item.type === "Review").length;

    return `Current coordination reading: ${schedule.length} scheduled sessions, ${leadershipCount} leadership-level rooms, and ${reviewCount} review-oriented sessions. The schedule should help the company coordinate execution, not create unnecessary meeting load.`;
  }, [schedule]);

  return (
    <section className="py-10 sm:py-14">
      <EnterpriseNav hubHref="/enterprise" hubTitle="Shynvo Enterprise" label="Meeting Schedule" />

      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
        Shynvo Enterprise
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        Meeting Schedule
      </h1>

      <p className="mt-4 max-w-5xl text-sm leading-6 text-white/70 sm:text-base">
        Schedule gives the company a more structured meeting flow for rooms, leadership sessions,
        reviews, and team coordination.
      </p>

      <div className="mt-6 rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
        <div className="text-sm font-semibold text-white">Schedule Reading</div>
        <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/75">
          {scheduleReading}
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-xl font-semibold text-white">Add Session</div>
          <p className="mt-2 text-sm leading-6 text-white/70">
            Add a company session, room, review, sync, or planning block.
          </p>

          <div className="mt-4 flex gap-3">
            <input
              value={meeting}
              onChange={(e) => setMeeting(e.target.value)}
              placeholder="Example: 15:00 — Workshop Room"
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
            />
            <button
              type="button"
              onClick={addMeeting}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
            >
              Add
            </button>
          </div>

          <div className="mt-6 grid gap-4">
            {schedule.map((item, i) => (
              <div
                key={`${item.title}-${i}`}
                className="rounded-2xl border border-emerald-300/15 bg-black/20 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-white">{item.title}</div>
                    <div className="mt-1 text-sm text-white/60">
                      {item.type} • {item.owner}
                    </div>
                  </div>

                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
                    Scheduled
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
            <div className="text-xl font-semibold text-white">Coordination Standard</div>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
                Leadership rooms should drive decisions, not duplicate discussions.
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
                Team syncs should remove blockers and clarify ownership.
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
                Reviews should lead to actions, not just reporting.
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
            <div className="text-xl font-semibold text-white">Recommended Flow</div>
            <div className="mt-4 space-y-3">
              {[
                "Leadership review",
                "Team sync",
                "Mission checkpoint",
                "Cross-functional planning",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
