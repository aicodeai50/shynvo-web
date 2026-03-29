"use client";

import { useState } from "react";
import ExperimentsNav from "@/components/experiments/ExperimentsNav";

type RoomType = "Debate Room" | "Simulation Room" | "Concept Room" | "Practice Room";

export default function RoomsPage() {
  const [roomType, setRoomType] = useState<RoomType>("Debate Room");
  const [roomName, setRoomName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [status, setStatus] = useState("No room action yet.");

  function createRoom() {
    if (!roomName.trim()) return;
    setStatus(`Created ${roomType}: "${roomName.trim()}"`);
  }

  function joinRoom() {
    if (!joinCode.trim()) return;
    setStatus(`Joined room with code: ${joinCode.trim()}`);
  }

  return (
    <section className="py-10 sm:py-14">
      <ExperimentsNav />

      <div className="text-xs font-semibold uppercase tracking-wider text-cyan-100/70">
        Experiments
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        Experiment Rooms
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        Rooms are structured collaborative spaces for friends, classmates, and teammates. Each room
        has a purpose and can be guided by AI for clearer, more productive sessions.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
          <div className="text-xl font-semibold text-white">Create Room</div>
          <div className="mt-2 text-sm text-white/70">
            Start a new debate room, simulation room, concept room, or practice room.
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {(["Debate Room", "Simulation Room", "Concept Room", "Practice Room"] as RoomType[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setRoomType(item)}
                className={`rounded-2xl border px-4 py-2 text-sm font-semibold transition ${
                  roomType === item
                    ? "border-white bg-white text-[#0B0F14]"
                    : "border-white/10 bg-black/20 text-white/80 hover:bg-white/10"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <input
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Enter room name..."
            className="mt-5 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
          />

          <button
            type="button"
            onClick={createRoom}
            className="mt-4 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
          >
            Create Room
          </button>
        </div>

        <div className="rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
          <div className="text-xl font-semibold text-white">Join Room</div>
          <div className="mt-2 text-sm text-white/70">
            Enter an existing room with your classmates, friends, or teammates.
          </div>

          <input
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            placeholder="Enter room code..."
            className="mt-5 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
          />

          <button
            type="button"
            onClick={joinRoom}
            className="mt-4 rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
          >
            Join Room
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
        <div className="text-sm font-semibold text-white">Room Status</div>
        <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
          {status}
        </div>
      </div>
    </section>
  );
}
