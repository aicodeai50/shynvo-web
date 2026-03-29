"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import OsNav from "@/components/os/OsNav";

type MissionSnapshot = {
  goal: string;
  mission: string;
  saved: string[];
};

const STORAGE_KEY = "shynvo_os_missions_snapshot";

export default function MissionsPage() {
  const [goal, setGoal] = useState("");
  const [mission, setMission] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored = JSON.parse(raw) as MissionSnapshot;
        setGoal(stored.goal || "");
        setMission(stored.mission || "");
        setSaved(stored.saved || []);
      }
    } catch {
      // ignore
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          goal,
          mission,
          saved,
        })
      );
    } catch {
      // ignore
    }
  }, [goal, mission, saved, ready]);

  const explanation = useMemo(
    () =>
      "Missions is the goal-to-execution layer of Shynvo OS. It turns a broad goal into a structured mission that can later move into Timeline, Focus, and Logbook.",
    []
  );

  function generateMission(example?: string) {
    const source = (example ?? goal).trim();
    if (!source) return;

    const built = `Mission created: ${source}

Phase 1 • Clarify the target
- Define what success looks like
- Remove vague wording
- Set the outcome clearly

Phase 2 • Build execution structure
- Break the goal into 3 practical phases
- Decide the next milestone
- Define the first focus session

Phase 3 • Run and review
- Move the mission into Timeline
- Execute through Focus sessions
- Track progress in Logbook`;

    setMission(built);
    setSaved((prev) => [source, ...prev.filter((item) => item !== source)].slice(0, 5));
  }

  return (
    <section className="py-10 sm:py-14">
      <OsNav />

      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
        Shynvo OS
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        Missions
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        {explanation}
      </p>

      <div className="mt-6 rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
        <div className="text-sm font-semibold text-white">What this page is for</div>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
            Turn a raw goal into a clear mission.
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
            Break that mission into execution structure.
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
            Prepare the mission for Timeline, Focus, and Logbook.
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/70">
            Mission Builder
          </div>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Turn a goal into execution
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <button
              type="button"
              onClick={() => generateMission("Pass my exam")}
              className="rounded-2xl border border-white/10 bg-black/20 p-4 text-left transition hover:bg-white/10"
            >
              <div className="text-lg font-semibold text-white">Pass my exam</div>
              <div className="mt-1 text-sm text-white/70">Build a focused academic mission</div>
            </button>

            <button
              type="button"
              onClick={() => generateMission("Launch a project")}
              className="rounded-2xl border border-white/10 bg-black/20 p-4 text-left transition hover:bg-white/10"
            >
              <div className="text-lg font-semibold text-white">Launch a project</div>
              <div className="mt-1 text-sm text-white/70">Turn an idea into an execution plan</div>
            </button>

            <button
              type="button"
              onClick={() => generateMission("Improve my skills")}
              className="rounded-2xl border border-white/10 bg-black/20 p-4 text-left transition hover:bg-white/10"
            >
              <div className="text-lg font-semibold text-white">Improve my skills</div>
              <div className="mt-1 text-sm text-white/70">Create a guided improvement path</div>
            </button>

            <button
              type="button"
              onClick={() => generateMission("Organize my week")}
              className="rounded-2xl border border-white/10 bg-black/20 p-4 text-left transition hover:bg-white/10"
            >
              <div className="text-lg font-semibold text-white">Organize my week</div>
              <div className="mt-1 text-sm text-white/70">Convert priorities into scheduled sessions</div>
            </button>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-white">
              Write your own goal
            </label>
            <div className="flex gap-3">
              <input
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Example: Finish my chemistry revision"
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
              />
              <button
                type="button"
                onClick={() => generateMission()}
                className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
              >
                Create
              </button>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-sm font-semibold text-white">Generated mission</div>
            <pre className="mt-3 whitespace-pre-wrap text-sm leading-6 text-white/75">
              {mission || "No mission created yet. Use a quick button or write your own goal above."}
            </pre>
          </div>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/70">
            Mission Status
          </div>

          <div className="mt-4 space-y-4">
            <Link href="/os/missions/active" className="block rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:bg-white/10">
              <div className="text-sm font-semibold text-white">Current State</div>
              <div className="mt-1 text-sm text-white/60">
                {mission ? "Mission created and ready for execution" : "Waiting for goal input"}
              </div>
            </Link>

            <Link href="/os/missions/sessions" className="block rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:bg-white/10">
              <div className="text-sm font-semibold text-white">Execution Use</div>
              <div className="mt-1 text-sm text-white/60">
                Connects mission intent to focus sessions and measurable execution.
              </div>
            </Link>

            <Link href="/os/missions/create" className="block rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:bg-white/10">
              <div className="text-sm font-semibold text-white">Recent Goals</div>
              <div className="mt-2 space-y-2 text-sm text-white/70">
                {saved.length ? saved.map((item, i) => <div key={i}>• {item}</div>) : <div>No saved goals yet</div>}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
