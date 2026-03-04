import Link from "next/link";
export default function CoursePage() {
  return (
    <main className="min-h-screen bg-[#05070A] text-white px-6 py-10">
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="text-3xl font-semibold">Course</h1>
        <p className="text-white/70">Here we will generate a full course syllabus + outcomes.</p>
        <Link className="underline text-white/85" href="/university/courses-deck">← Back to Courses Deck</Link>
      </div>
    </main>
  );
}
