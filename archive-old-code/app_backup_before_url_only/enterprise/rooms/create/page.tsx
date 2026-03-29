"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type RoomType = "leadership" | "project" | "workshop" | "standup";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const ROOM_INFO: Record<
  RoomType,
  {
    title: string;
    subtitle: string;
    agenda: string[];
  }
> = {
  leadership: {
    title: "Leadership Room",
    subtitle: "Strategy, alignment, executive review, and decision making.",
    agenda: ["Review company priorities", "Discuss trade-offs", "Record decisions", "Assign follow-ups"],
  },
  project: {
    title: "Project Room",
    subtitle: "Delivery coordination, blockers, owners, deadlines, and progress.",
    agenda: ["Status update", "Blockers", "Owner assignments", "Next milestone"],
  },
  workshop: {
    title: "Workshop Room",
    subtitle: "Collaborative problem solving, brainstorming, and structured sessions.",
    agenda: ["Define challenge", "Generate options", "Select direction", "Capture actions"],
  },
  standup: {
    title: "Standup Room",
    subtitle: "Fast team sync for daily priorities, blockers, and execution.",
    agenda: ["Yesterday", "Today", "Blockers", "Escalations"],
  },
};

function CreateRoomInner() {
  const searchParams = useSearchParams();
  const initial = (searchParams.get("type") as RoomType) || "project";

  const [roomType, setRoomType] = useState<RoomType>(
    initial === "leadership" || initial === "project" || initial === "workshop" || initial === "standup"
      ? initial
      : "project"
  );
  const [roomName, setRoomName] = useState("");
  const [participants, setParticipants] = useState("");
  const [agendaNotes, setAgendaNotes] = useState("");

  const active = useMemo(() => ROOM_INFO[roomType], [roomType]);
  const roomLink = `/enterprise/rooms/${roomType}-room`;

  return (
    <section className="relative py-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_15%_10%,rgba(34,197,94,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_560px_at_80%_18%,rgba(16,185,129,0.10),transparent_55%)]" />
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

      <div className="mt-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200/70">
          Shynvo Enterprise
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          Create Room
        </h1>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
          Configure the room structure now. Real-time meeting logic can be added later, but this
          already gives the company a serious meeting workspace.
        </p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-sm font-semibold text-white">Room Type</div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {(["leadership", "project", "workshop", "standup"] as RoomType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setRoomType(type)}
                className={cx(
                  "rounded-2xl border px-4 py-4 text-left transition",
                  roomType === type
                    ? "border-emerald-300/30 bg-emerald-400/10 text-white"
                    : "border-white/10 bg-black/20 text-white/80 hover:bg-white/7"
                )}
              >
                <div className="text-sm font-semibold">{ROOM_INFO[type].title}</div>
                <div className="mt-1 text-sm text-white/60">{ROOM_INFO[type].subtitle}</div>
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4">
            <div>
              <label className="text-sm font-semibold text-white">Room name</label>
              <input
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Example: Product Launch Leadership Room"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-white">Participants</label>
              <input
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
                placeholder="Example: CEO, Product Lead, Engineering Lead, Marketing Lead"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-white">Agenda notes</label>
              <textarea
                value={agendaNotes}
                onChange={(e) => setAgendaNotes(e.target.value)}
                placeholder="Write goals, meeting context, what must be decided, and what needs follow-up..."
                rows={6}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={roomLink}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
            >
              Open room workspace
            </Link>

            <Link
              href="/enterprise/rooms/join"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
            >
              Join existing room
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-sm font-semibold text-white">Selected template</div>
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-lg font-semibold text-white">{active.title}</div>
            <div className="mt-2 text-sm leading-6 text-white/70">{active.subtitle}</div>
          </div>

          <div className="mt-6 text-sm font-semibold text-white">Suggested agenda</div>
          <div className="mt-3 space-y-3">
            {active.agenda.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function EnterpriseCreateRoomPage() {
  return (
    <Suspense fallback={<div className="py-10 text-white/70">Loading room creator...</div>}>
      <CreateRoomInner />
    </Suspense>
  );
}
