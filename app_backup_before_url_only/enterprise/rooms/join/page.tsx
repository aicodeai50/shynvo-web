"use client";

import Link from "next/link";
import { useState } from "react";

export default function EnterpriseJoinRoomPage() {
  const [roomCode, setRoomCode] = useState("");

  return (
    <section className="relative py-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_20%_10%,rgba(34,197,94,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_560px_at_85%_18%,rgba(16,185,129,0.10),transparent_55%)]" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/enterprise/rooms"
          className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white"
        >
          ← Back
        </Link>
        <Link
          href="/"
          className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white"
        >
          Home
        </Link>
        <Link
          href="/enterprise"
          className="inline-flex items-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-100 hover:bg-emerald-400/15"
        >
          Shynvo Enterprise
        </Link>
      </div>

      <div className="mt-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200/70">
          Shynvo Enterprise
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          Join Room
        </h1>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
          Join a company room for meetings, project delivery, workshop sessions, or leadership
          coordination.
        </p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <label className="text-sm font-semibold text-white">Room code or room name</label>
          <input
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            placeholder="Example: project-room or leadership-room"
            className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
          />

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={`/enterprise/rooms/${roomCode.trim() || "project-room"}`}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
            >
              Enter room
            </Link>

            <Link
              href="/enterprise/rooms/create"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
            >
              Create instead
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-sm font-semibold text-white">Examples</div>
          <div className="mt-4 space-y-3">
            {[
              "leadership-room",
              "project-room",
              "workshop-room",
              "standup-room",
            ].map((example) => (
              <Link
                key={example}
                href={`/enterprise/rooms/${example}`}
                className="block rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80 hover:bg-white/7"
              >
                {example}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
