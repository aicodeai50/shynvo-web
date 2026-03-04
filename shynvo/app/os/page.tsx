import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#05070A] text-white px-6 py-16">
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-3xl font-semibold">Active page</h1>
        <p className="text-white/70">
          This page is live (no 404). Content will be built next.
        </p>
        <Link href="/" className="inline-flex rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/15 transition">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
