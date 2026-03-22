import Link from "next/link";

export default function ExperimentsJoinRoomPage() {
  return (
    <section className="py-10 sm:py-14">
      <Link href="/experiments/rooms" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        ← Back to Rooms
      </Link>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
        Experiments
      </div>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
        Join Room
      </h1>

      <div className="mt-8 grid gap-4">
        <input
          placeholder="Enter room code or invite link"
          className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
        />

        <button className="inline-flex w-fit rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90">
          Join Experiment Room
        </button>
      </div>
    </section>
  );
}
