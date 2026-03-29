"use client";

import { useEffect, useMemo, useState } from "react";
import {
  persistMissions,
  useMissionsStore,
  Mission,
  MissionStatus,
} from "@/stores/missions/missions.store";
import Link from "next/link";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const COLUMNS: { key: MissionStatus; label: string }[] = [
  { key: "queued", label: "Queued" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
];

function badge(priority: Mission["priority"]) {
  if (priority === "high")
    return "border-red-400/30 bg-red-500/10 text-red-200";
  if (priority === "medium")
    return "border-yellow-400/30 bg-yellow-500/10 text-yellow-200";
  return "border-emerald-400/30 bg-emerald-500/10 text-emerald-200";
}

export default function MissionsBoard() {
  const missions = useMissionsStore((s) => s.missions);
  const selectedId = useMissionsStore((s) => s.selectedId);

  const hydrate = useMissionsStore((s) => s.hydrate);
  const createMission = useMissionsStore((s) => s.createMission);
  const updateMission = useMissionsStore((s) => s.updateMission);
  const moveMission = useMissionsStore((s) => s.moveMission);
  const del = useMissionsStore((s) => s.deleteMission);
  const select = useMissionsStore((s) => s.select);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Mission["priority"]>("medium");

  // load local
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  // persist on change
  useEffect(() => {
    persistMissions(missions);
  }, [missions]);

  const byStatus = useMemo(() => {
    const map: Record<MissionStatus, Mission[]> = {
      queued: [],
      active: [],
      completed: [],
    };
    for (const m of missions) map[m.status].push(m);
    return map;
  }, [missions]);

  const selected = useMemo(
    () => missions.find((m) => m.id === selectedId) || null,
    [missions, selectedId]
  );

  function submit() {
    if (!title.trim() && !description.trim()) return;
    createMission({ title, description, priority });
    setTitle("");
    setDescription("");
    setPriority("medium");
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-white/60">
            Missions
          </div>
          <div className="mt-1 text-sm text-white/70">
            Frontend-only mission board. Later: AI-generated missions + timeline
            sync.
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/os"
            className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs font-extrabold hover:bg-white/5"
          >
            Back to OS
          </Link>
        </div>
      </div>

      {/* Create */}
      <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
        <div className="text-xs font-extrabold text-white/70">
          Create mission
        </div>

        <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Mission title"
            className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/85 outline-none focus:border-violet-400/40 focus:ring-4 focus:ring-violet-500/10"
          />

          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as Mission["priority"])
            }
            className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/85 outline-none focus:border-violet-400/40 focus:ring-4 focus:ring-violet-500/10"
          >
            <option value="low">low priority</option>
            <option value="medium">medium priority</option>
            <option value="high">high priority</option>
          </select>

          <button
            onClick={submit}
            className="rounded-xl bg-white px-3 py-2 text-sm font-extrabold text-black hover:opacity-90"
          >
            Create
          </button>
        </div>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description / notes…"
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/85 outline-none focus:border-violet-400/40 focus:ring-4 focus:ring-violet-500/10"
          rows={3}
        />
      </div>

      {/* Board */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {COLUMNS.map((col) => (
          <div
            key={col.key}
            className="rounded-2xl border border-white/10 bg-black/30 p-3"
          >
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-widest text-white/60">
                {col.label}
              </div>
              <div className="text-xs text-white/40">
                {byStatus[col.key].length}
              </div>
            </div>

            <div className="mt-3 flex flex-col gap-2">
              {byStatus[col.key].map((m) => (
                <button
                  key={m.id}
                  onClick={() => select(m.id)}
                  className={cx(
                    "text-left rounded-2xl border p-3 transition",
                    "border-white/10 bg-black/40 hover:bg-white/5",
                    selectedId === m.id && "border-white/20 bg-white/5"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-sm font-semibold text-white/90">
                      {m.title}
                    </div>
                    <div
                      className={cx(
                        "rounded-full border px-2 py-0.5 text-[10px] font-extrabold",
                        badge(m.priority)
                      )}
                    >
                      {m.priority.toUpperCase()}
                    </div>
                  </div>

                  {m.description ? (
                    <div className="mt-2 line-clamp-3 text-xs text-white/65">
                      {m.description}
                    </div>
                  ) : (
                    <div className="mt-2 text-xs text-white/40">
                      No description
                    </div>
                  )}
                </button>
              ))}

              {byStatus[col.key].length === 0 ? (
                <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-xs text-white/45">
                  Empty
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {/* Detail Drawer */}
      {selected ? (
        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <div className="text-xs uppercase tracking-widest text-white/60">
                Mission detail
              </div>
              <div className="mt-1 text-lg font-extrabold text-white/90">
                {selected.title}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => moveMission(selected.id, "queued")}
                className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs font-extrabold hover:bg-white/5"
              >
                Queued
              </button>
              <button
                onClick={() => moveMission(selected.id, "active")}
                className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs font-extrabold hover:bg-white/5"
              >
                Active
              </button>
              <button
                onClick={() => moveMission(selected.id, "completed")}
                className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs font-extrabold hover:bg-white/5"
              >
                Completed
              </button>

              <button
                onClick={() => del(selected.id)}
                className="rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs font-extrabold text-red-200 hover:bg-red-500/15"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-black/20 p-3">
              <div className="text-xs text-white/50">Title</div>
              <input
                value={selected.title}
                onChange={(e) =>
                  updateMission(selected.id, { title: e.target.value })
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/85 outline-none focus:border-violet-400/40 focus:ring-4 focus:ring-violet-500/10"
              />
            </div>

            <div className="rounded-xl border border-white/10 bg-black/20 p-3">
              <div className="text-xs text-white/50">Priority</div>
              <select
                value={selected.priority}
                onChange={(e) =>
                  updateMission(selected.id, {
                    priority: e.target.value as Mission["priority"],
                  })
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/85 outline-none focus:border-violet-400/40 focus:ring-4 focus:ring-violet-500/10"
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>
          </div>

          <div className="mt-2 rounded-xl border border-white/10 bg-black/20 p-3">
            <div className="text-xs text-white/50">Description</div>
            <textarea
              value={selected.description}
              onChange={(e) =>
                updateMission(selected.id, { description: e.target.value })
              }
              rows={4}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/85 outline-none focus:border-violet-400/40 focus:ring-4 focus:ring-violet-500/10"
            />
          </div>

          <div className="mt-2 text-xs text-white/45">
            Created: {new Date(selected.createdAt).toLocaleString()} • Updated:{" "}
            {new Date(selected.updatedAt).toLocaleString()}
          </div>
        </div>
      ) : null}
    </div>
  );
}