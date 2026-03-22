import Link from "next/link";
export default function Page() {
  return <section className="py-10 sm:py-14"><Link href="/os/council" className="text-sm text-white/70 hover:text-white">← Back to AI Council</Link><h1 className="mt-4 text-3xl font-semibold">Decision Input</h1><textarea className="mt-4 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40" rows={6} placeholder="Type the decision you want the council to evaluate..." /></section>;
}
