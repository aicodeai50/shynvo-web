import Link from "next/link";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const ROOM_TYPES = [
  {
    key: "leadership",
    title: "Leadership Room",
    desc: "Executive planning, weekly decisions, strategy alignment, and AI-supported summaries.",
    tags: ["Leadership", "Decisions", "Strategy"],
  },
  {
    key: "project",
    title: "Project Room",
    desc: "Coordinate delivery, assign ownership, track blockers, and keep work visible.",
    tags: ["Project", "Execution", "Tracking"],
  },
  {
    key: "workshop",
    title: "Workshop Room",
    desc: "Structured collaboration for ideas, problem solving, planning, and reviews.",
    tags: ["Workshop", "Ideas", "Review"],
  },
  {
    key: "standup",
    title: "Standup Room",
    desc: "Daily updates, blockers, priorities, and immediate team coordination.",
    tags: ["Daily", "Blockers", "Priorities"],
  },
];

export default function EnterpriseRoomsPage() {
  return (
    <section className="relative py-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(1000px_520px_at_15%_10%,rgba(34,197,94,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_560px_at_85%_18%,rgba(16,185,129,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_100%,rgba(59,130,246,0.08),transparent_55%)]" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/enterprise"
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
            Shynvo Enterprise
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Rooms
          </h1>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
            Rooms are structured company spaces for communication, meetings, workshops, delivery,
            planning, and decisions. This is where Shynvo Enterprise can grow into a true all-in-one
            workspace.
          </p>
        </div>

        <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-100">
          Meeting Layer: Ready
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Room Actions
          </div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
            Create or join a workspace
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70">
            A room can act like a meeting space, project hub, workshop, sprint board, or leadership
            chamber. This is the foundation for future video meetings, notes, attendance, and AI
            summaries.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Link
              href="/enterprise/rooms/create"
              className={cx(
                "group rounded-3xl border p-5 transition",
                "border-white/10 bg-black/20 hover:bg-white/7 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.14)]"
              )}
            >
              <div className="text-lg font-semibold text-white">Create Room</div>
              <div className="mt-2 text-sm text-white/70">
                Start a leadership room, project room, workshop room, or meeting room.
              </div>
              <div className="mt-5 text-sm font-semibold text-white/90 group-hover:text-white">
                Open create flow →
              </div>
            </Link>

            <Link
              href="/enterprise/rooms/join"
              className={cx(
                "group rounded-3xl border p-5 transition",
                "border-white/10 bg-black/20 hover:bg-white/7 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.14)]"
              )}
            >
              <div className="text-lg font-semibold text-white">Join Room</div>
              <div className="mt-2 text-sm text-white/70">
                Enter an existing company room for communication, meetings, and collaboration.
              </div>
              <div className="mt-5 text-sm font-semibold text-white/90 group-hover:text-white">
                Open join flow →
              </div>
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Future Features
          </div>

          <div className="mt-4 space-y-4">
            {[
              ["Video Meetings", "Room-based calls and host controls"],
              ["AI Notes", "Automatic summaries, decisions, and next steps"],
              ["Attendance", "Track members, presence, and role in the session"],
              ["Tasks", "Convert meeting outcomes into missions and assignments"],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-sm font-semibold text-white">{title}</div>
                <div className="mt-1 text-sm text-white/60">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
          Room Types
        </div>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Start from a structure that matches the company need
        </h2>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {ROOM_TYPES.map((room) => (
          <Link
            key={room.key}
            href={`/enterprise/rooms/create?type=${room.key}`}
            className={cx(
              "group rounded-3xl border p-5 transition",
              "border-white/10 bg-white/5 hover:bg-white/7 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.14)]"
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-base font-semibold text-white">{room.title}</div>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/75">
                Active
              </span>
            </div>

            <p className="mt-3 text-sm leading-6 text-white/70">{room.desc}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {room.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5 text-sm font-semibold text-white/90 group-hover:text-white">
              Use this template →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
