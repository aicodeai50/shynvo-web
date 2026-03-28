"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto w-full max-w-4xl">
        <div className="rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur-xl">
          <div className="text-3xl font-semibold">Not found</div>
          <div className="mt-2 text-sm text-white/70">
            This page does not exist yet, or the route is still being built.
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/" className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm hover:bg-white/15">
              Home
            </Link>
            <Link href="/docs" className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm hover:bg-white/15">
              Docs
            </Link>
            <Link href="/contact" className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm hover:bg-white/15">
              Contact
            </Link>
            <Link href="/enterprise" className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm hover:bg-white/15">
              Enterprise Suite
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
