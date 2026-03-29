import Link from "next/link";

export default function ExploreWorldsCard() {
  return (
    <section className="mt-8">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              Explore
            </div>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Explore Shynvo Worlds
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/68 sm:text-base">
              Enter the environments and choose the path that fits your goal for learning, building, practice, and guided AI support.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/70">
                Learn
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/70">
                Build
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/70">
                Explore
              </span>
            </div>
          </div>

          <div>
            <Link
              href="/worlds"
              className="inline-flex items-center rounded-2xl border border-white/10 bg-[#0d1420] px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-[#131b29]"
            >
              Open all environments →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
