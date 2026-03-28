"use client";

import Link from "next/link";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";

export default function EnterpriseRoomsPage() {
  return (
    <section className="py-10 sm:py-14">
      <EnterpriseNav label="Enterprise Rooms" />

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/65">
          Rooms
        </div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          Rooms
        </h1>
        <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
          Create or join a workspace room.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link href="/enterprise/rooms/create" className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5 transition hover:bg-white/[0.06]">
          <h2 className="text-2xl font-semibold text-white">Create Room</h2>
          <p className="mt-3 text-sm leading-6 text-white/68">Open the room creation flow.</p>
          <div className="mt-5 text-sm font-semibold text-white/90">Open create flow →</div>
        </Link>

        <Link href="/enterprise/rooms/join" className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5 transition hover:bg-white/[0.06]">
          <h2 className="text-2xl font-semibold text-white">Join Room</h2>
          <p className="mt-3 text-sm leading-6 text-white/68">Open the room join flow.</p>
          <div className="mt-5 text-sm font-semibold text-white/90">Open join flow →</div>
        </Link>
      </div>
    </section>
  );
}
