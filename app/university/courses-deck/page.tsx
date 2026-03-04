import Link from "next/link";

const ITEMS = [
  { href: "/university/courses-deck/course", title: "Course", desc: "Full syllabus + outcomes." },
  { href: "/university/courses-deck/module", title: "Module", desc: "Weekly structure." },
  { href: "/university/courses-deck/lesson", title: "Lesson", desc: "Single topic breakdown." },
];

export default function CoursesDeck() {
  return (
    <main className="min-h-screen bg-[#05070A] text-white px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">Courses, Modules, Lessons</h1>
            <p className="mt-2 text-white/70">Next: subject search + AI syllabus + weekly plan generator.</p>
          </div>
          <Link href="/university" className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/15 transition">
            Back to Hub
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((x) => (
            <Link key={x.href} href={x.href} className="rounded-3xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition">
              <div className="text-lg font-semibold">{x.title}</div>
              <div className="mt-2 text-sm text-white/65">{x.desc}</div>
              <div className="mt-4 text-sm text-white/80">Open →</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
