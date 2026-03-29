import Link from "next/link";

export default function ExperimentsCreateRoomPage() {
  return (
    <section className="py-10 sm:py-14">
      <Link href="/experiments/rooms" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        ← Back to Rooms
      </Link>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
        Experiments
      </div>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
        Create Room
      </h1>

      <div className="mt-8 grid gap-4">
        <input
          placeholder="Room name"
          className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
        />

        <select className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none">
          <option>Debate Room</option>
          <option>Simulation Room</option>
          <option>Concept Room</option>
          <option>Practice Room</option>
        </select>

        <textarea
          rows={5}
          placeholder="Room purpose or prompt"
          className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
        />

        <input
          placeholder="Invite emails or usernames"
          className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
        />

        <button className="inline-flex w-fit rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90">
          Create Experiment Room
        </button>
      </div>
    </section>
  );
}
