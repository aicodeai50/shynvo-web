import Link from "next/link";

export default function ExperimentsRoomsPage() {
  return (
    <section className="py-10 sm:py-14">
      <Link href="/experiments" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        ← Back to Experiments
      </Link>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
        Experiments
      </div>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
        Experiment Rooms
      </h1>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
        Rooms are structured collaborative spaces for friends, classmates, and teammates.
        Each room has a purpose and can be guided by AI for clearer, more productive sessions.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Link
          href="/experiments/rooms/create"
          className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/7 transition"
        >
          <div className="text-lg font-semibold text-white">Create Room</div>
          <div className="mt-2 text-sm text-white/70">
            Start a new debate room, simulation room, concept room, or practice room.
          </div>
        </Link>

        <Link
          href="/experiments/rooms/join"
          className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/7 transition"
        >
          <div className="text-lg font-semibold text-white">Join Room</div>
          <div className="mt-2 text-sm text-white/70">
            Enter an existing room with your classmates, friends, or teammates.
          </div>
        </Link>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-sm font-semibold text-white">Room Types</div>
        <div className="mt-4 flex flex-wrap gap-2 text-sm text-white/70">
          <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5">Debate Room</span>
          <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5">Simulation Room</span>
          <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5">Concept Room</span>
          <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5">Practice Room</span>
        </div>
      </div>
    </section>
  );
}
