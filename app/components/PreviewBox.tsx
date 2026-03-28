import Link from "next/link";

export default function PreviewBox() {
  return (
    <div className="mt-10 sm:mt-12">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
        Preview
      </div>

      <div className="mt-3 rounded-[1.75rem] border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">
          See inside Shynvo
        </h2>

        <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/70 leading-6">
          Explore what the platform looks like before you enter. Preview real
          environments, flows, and guided AI experiences.
        </p>

        <div className="mt-5">
          <Link
            href="/preview"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition"
          >
            Open preview →
          </Link>
        </div>
      </div>
    </div>
  );
}
