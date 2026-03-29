"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";

type RoomMode = "meeting" | "notes" | "decisions" | "tasks";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getRoomData(roomId: string) {
  if (roomId.includes("leadership")) {
    return {
      title: "Leadership Room",
      subtitle: "Executive planning, trade-offs, decisions, and follow-up actions.",
      members: ["CEO", "Product Lead", "Engineering Lead", "Marketing Lead"],
      agenda: ["Review priorities", "Discuss major decision", "Approve direction", "Assign actions"],
    };
  }

  if (roomId.includes("workshop")) {
    return {
      title: "Workshop Room",
      subtitle: "Collaborative problem solving, structured brainstorming, and group progress.",
      members: ["Facilitator", "Design Lead", "Ops Lead", "Team Member"],
      agenda: ["Define challenge", "Generate options", "Select next step", "Capture insights"],
    };
  }

  if (roomId.includes("standup")) {
    return {
      title: "Standup Room",
      subtitle: "Fast daily sync for priorities, blockers, and execution flow.",
      members: ["Team Lead", "Engineer", "Designer", "Operator"],
      agenda: ["Yesterday", "Today", "Blockers", "Escalations"],
    };
  }

  return {
    title: "Project Room",
    subtitle: "Execution, progress review, blockers, owners, and delivery alignment.",
    members: ["Project Lead", "Engineer", "Designer", "Analyst"],
    agenda: ["Status update", "Blockers", "Owners", "Next milestone"],
  };
}

export default function EnterpriseRoomWorkspacePage() {
  const params = useParams();
  const roomId = Array.isArray(params.roomId) ? params.roomId[0] : String(params.roomId ?? "project-room");

  const [mode, setMode] = useState<RoomMode>("meeting");
  const [meetingPrompt, setMeetingPrompt] = useState("");
  const [notes, setNotes] = useState("");
  const [decisionInput, setDecisionInput] = useState("");
  const [taskInput, setTaskInput] = useState("");

  const room = useMemo(() => getRoomData(roomId), [roomId]);

  return (
    <section className="relative py-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(1000px_520px_at_15%_10%,rgba(34,197,94,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_560px_at_80%_20%,rgba(16,185,129,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_100%,rgba(59,130,246,0.08),transparent_55%)]" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/enterprise/rooms"
          className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white"
        >
          ← Back
        </Link>
        <Link
          href="/"
          className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white"
        >
          Home
        </Link>
        <Link
          href="/enterprise"
          className="inline-flex items-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-100 hover:bg-emerald-400/15"
        >
          Shynvo Enterprise
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200/70">
            Enterprise Room
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            {room.title}
          </h1>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
            {room.subtitle}
          </p>
        </div>

        <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-100">
          Video Meetings: UI Ready
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {(["meeting", "notes", "decisions", "tasks"] as RoomMode[]).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setMode(tab)}
            className={cx(
              "rounded-2xl px-4 py-2 text-sm font-semibold transition",
              mode === tab
                ? "bg-white text-[#0B0F14]"
                : "border border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
            )}
          >
            {tab === "meeting"
              ? "Meeting"
              : tab === "notes"
              ? "Notes"
              : tab === "decisions"
              ? "Decisions"
              : "Tasks"}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          {mode === "meeting" ? (
            <>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                Meeting Workspace
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                Start the room session
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/70">
                This is the meeting layer. Today it works as a structured workspace UI. Later you
                can connect real live video, audio, attendance, and screen sharing.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <button
                  type="button"
                  className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
                >
                  Start meeting
                </button>
                <button
                  type="button"
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
                >
                  Join call
                </button>
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-5">
                <div className="text-sm font-semibold text-white">Meeting prompt</div>
                <textarea
                  value={meetingPrompt}
                  onChange={(e) => setMeetingPrompt(e.target.value)}
                  placeholder="Write the meeting context, what must be decided, what is blocked, and what the room should focus on..."
                  rows={8}
                  className="mt-3 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
                />
              </div>
            </>
          ) : null}

          {mode === "notes" ? (
            <>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                Live Notes
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                Capture the session
              </h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Write meeting notes, summaries, blockers, observations, and follow-up context..."
                rows={14}
                className="mt-5 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
              />
            </>
          ) : null}

          {mode === "decisions" ? (
            <>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                Decisions Log
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                Record outcomes
              </h2>
              <textarea
                value={decisionInput}
                onChange={(e) => setDecisionInput(e.target.value)}
                placeholder="Write the decisions made in this room, the reason, owner, and expected result..."
                rows={14}
                className="mt-5 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
              />
            </>
          ) : null}

          {mode === "tasks" ? (
            <>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                Action Tracking
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                Convert meeting output into execution
              </h2>
              <textarea
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Write action items, owners, deadlines, and dependencies..."
                rows={14}
                className="mt-5 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
              />
            </>
          ) : null}
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Room Panel
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-sm font-semibold text-white">Participants</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {room.members.map((member) => (
                <span
                  key={member}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/75"
                >
                  {member}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-sm font-semibold text-white">Suggested agenda</div>
            <div className="mt-3 space-y-2">
              {room.agenda.map((item) => (
                <div key={item} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-sm font-semibold text-white">AI Summary</div>
            <div className="mt-2 text-sm leading-6 text-white/65">
              This panel can later show automatic summaries, decisions, owners, and next steps after
              each company meeting.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
