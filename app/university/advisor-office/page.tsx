import Link from "next/link";

export default function AdvisorOffice() {
  return (
    <main className="min-h-screen bg-[#05070A] text-white px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs tracking-[0.22em] text-white/50">ADVISOR OFFICE</div>
            <h1 className="text-3xl font-semibold">Academic Advisor</h1>
            <p className="mt-2 text-white/70">
              Generates structured study plans based on your faculty + program.
            </p>
          </div>
          <Link href="/university" className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/15 transition">
            Back to Hub
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm font-semibold">Context</div>
            <div className="mt-3 space-y-3 text-sm">
              <div>
                <div className="text-white/60">Faculty</div>
                <select className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 p-2 outline-none">
                  <option>BSc – Science & Technology</option>
                  <option>BA – Arts & Humanities</option>
                  <option>BBA – Business & Management</option>
                  <option>Engineering</option>
                  <option>Health Sciences</option>
                  <option>Law & Governance</option>
                  <option>Education</option>
                  <option>Creative Arts</option>
                </select>
              </div>

              <div>
                <div className="text-white/60">Program</div>
                <select className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 p-2 outline-none">
                  <option>BSc Computer Science — Year 1</option>
                  <option>BSc Computer Science — Year 2</option>
                  <option>BSc Computer Science — Year 3</option>
                </select>
              </div>

              <div className="text-xs text-white/50">Tip: Include exam date + hours/day for best output.</div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 lg:col-span-2">
            <div className="text-sm font-semibold">Advisor Chat</div>
            <div className="mt-3 rounded-2xl border border-white/10 bg-black/25 p-3 text-sm text-white/70">
              Tell me your exam date and how many hours per day you can study, I’ll create a plan.
            </div>

            <div className="mt-3 flex gap-2">
              <input
                className="flex-1 rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:border-white/20"
                placeholder="Ask the advisor…"
              />
              <button className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/15 transition" type="button">
                Send
              </button>
            </div>

            <div className="mt-2 text-xs text-white/50">
              Backend: next we will connect your Railway endpoint (your /chat path is 404 right now).
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
