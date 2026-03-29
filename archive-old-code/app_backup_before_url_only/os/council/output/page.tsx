import Link from "next/link";
export default function Page() {
  return <section className="py-10 sm:py-14"><Link href="/os/council" className="text-sm text-white/70 hover:text-white">← Back to AI Council</Link><h1 className="mt-4 text-3xl font-semibold">Council Output</h1><p className="mt-3 text-white/70">Decision reasoning results will appear here.</p></section>;
}
