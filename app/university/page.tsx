import Link from "next/link";

export default function UniversityHomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl py-10">
      <div className="mb-6">
        <div className="text-3xl font-semibold">University Hub</div>
        <div className="mt-1 text-sm text-white/70">
          Structured academic campus (stub index page)
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { href: "/university/stem-it", title: "STEM & IT" },
          { href: "/university/arts-humanities", title: "Arts & Humanities" },
          { href: "/university/business", title: "Business" },
          { href: "/university/health", title: "Health Sciences" },
          { href: "/university/law", title: "Law & Government" },
          { href: "/university/concept-forge", title: "Concept Forge" },
        ].map((x) => (
          <Link
            key={x.href}
            href={x.href}
            className="rounded-3xl border border-white/15 bg-white/5 p-5 backdrop-blur-xl hover:bg-white/10"
          >
            <div className="text-lg font-semibold">{x.title}</div>
            <div className="mt-4 text-sm text-white/80">Open →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
