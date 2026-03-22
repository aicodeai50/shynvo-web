import Link from "next/link";

export default function Page() {
  return (
    <section className="py-10 sm:py-14">
      <Link href="/os/focus" className="text-sm text-white/70 hover:text-white">
        ← Back to Focus
      </Link>

      <h1 className="mt-4 text-3xl font-semibold">Focus Session</h1>

      <p className="mt-3 max-w-3xl text-white/70">
        This room is designed for uninterrupted work. Define your task clearly,
        protect your attention, and complete the session before leaving.
      </p>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-xl font-semibold text-white">
          Live Focus Session
        </div>

        <p className="mt-3 text-white/70">
          Stay inside this workspace until your focus block is completed.
        </p>
      </div>
    </section>
  );
}
