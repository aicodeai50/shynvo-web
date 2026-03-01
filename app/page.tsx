"use client";

import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNav />

      <main className="mx-auto max-w-6xl px-6 py-14">
        {/* HERO */}
        <section className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              Shynvo — AI Learning + Upskilling
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Learn faster. Prepare smarter. Upskill teams with AI.
            </h1>

            <p className="mt-4 text-white/70">
              Generate quizzes, flashcards, interview practice, and upskilling plans — with optional
              “sci-fi assistant” UI for a futuristic experience.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                className="rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-neutral-200"
                href="/demo"
              >
                View demo
              </Link>
              <Link
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10"
                href="/pricing"
              >
                See pricing
              </Link>
              <Link
                className="rounded-xl border border-white/10 bg-black px-5 py-3 font-semibold text-white hover:bg-white/5"
                href="/robot"
              >
                Try the sci-fi robot
              </Link>
              <Link
                className="rounded-xl border border-white/10 bg-black px-5 py-3 font-semibold text-white hover:bg-white/5"
                href="/os"
              >
                Enter Shynvo OS (2050)
              </Link>
            </div>

            <div className="mt-6 text-sm text-white/60">
              Built for: <span className="text-white/80">Students</span>,{" "}
              <span className="text-white/80">Professionals</span>,{" "}
              <span className="text-white/80">Teams</span>
            </div>

            <div className="mt-6 grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-semibold text-white/80">Why people switch to Shynvo</div>
              <ul className="list-disc space-y-2 pl-5 text-sm text-white/60">
                <li>Instant practice from any topic (no course hunting).</li>
                <li>Interview simulation + scoring to improve faster.</li>
                <li>Company features for team skills + upskilling plans.</li>
              </ul>
            </div>
          </div>

          {/* HERO CARD */}
          <div className="rounded-3xl border border-white/10 bg-neutral-950 p-6 shadow-xl">
            <div className="text-sm text-white/60">What you get</div>

            <div className="mt-4 grid gap-3">
              <Feature title="Adaptive quizzes + flashcards">
                Generate practice instantly from any topic.
              </Feature>
              <Feature title="Interview simulation (Pro)">
                Practice questions, feedback, and scoring.
              </Feature>
              <Feature title="Company tools (Team)">
                Skill matrix, upskilling plans, admin analytics + seats.
              </Feature>
              <Feature title="Cinematic robot (optional)">
                Futuristic UI you can enable/disable anytime.
              </Feature>
            </div>

            <Link
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-semibold text-white hover:bg-white/10"
              href="/pricing"
            >
              Upgrade anytime →
            </Link>

            <div className="mt-3 text-xs text-white/50">
              Tip: start with the demo, then choose a plan when ready.
            </div>
          </div>
        </section>

        {/* EXPLORE EXPERIMENTS (BETA) — FULL WIDTH */}
        <section className="mt-16 rounded-3xl border border-white/10 bg-neutral-950 p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-white/60">
                Explore Experiments (Beta)
              </div>
              <h2 className="mt-2 text-2xl font-bold text-white">Standalone AI universes</h2>
              <p className="mt-2 max-w-2xl text-white/70">
                Experiments are immersive, fullscreen AI prototypes — separate from Shynvo OS. Each
                evolves independently with its own versions and visuals.
              </p>
            </div>

            <Link
              href="/experiments"
              className="inline-flex rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Open Experiment Hub →
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {/* Thought Forge */}
            <Link
              href="/experiments/thought-forge"
              className="group rounded-3xl border border-white/10 p-6 hover:brightness-110 transition"
              style={{
                background: `
                  radial-gradient(800px circle at 20% 20%, rgba(34,211,238,0.18), transparent 55%),
                  radial-gradient(700px circle at 80% 30%, rgba(163,230,53,0.14), transparent 55%),
                  radial-gradient(700px circle at 30% 90%, rgba(244,114,182,0.10), transparent 60%),
                  linear-gradient(180deg, rgba(10,10,15,0.92), rgba(0,0,0,0.92))
                `,
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-lg font-semibold text-white">Thought Forge</div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                  v0.2 • Beta
                </div>
              </div>

              <p className="mt-2 text-sm text-white/75">
                A living concept graph. Seed a thought, click nodes, and expand meaning visually.
              </p>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs text-white/60">Phase 1 stable • AI expansion next</div>
                <div className="text-xs text-white/80 group-hover:text-white">Enter →</div>
              </div>
            </Link>

            {/* Debate Matrix */}
            <Link
              href="/experiments/debate-matrix"
              className="group rounded-3xl border border-white/10 p-6 hover:brightness-110 transition"
              style={{
                background: `
                  radial-gradient(850px circle at 18% 22%, rgba(244,114,182,0.16), transparent 55%),
                  radial-gradient(800px circle at 85% 18%, rgba(99,102,241,0.18), transparent 55%),
                  radial-gradient(700px circle at 40% 90%, rgba(34,211,238,0.10), transparent 60%),
                  linear-gradient(180deg, rgba(10,10,15,0.92), rgba(0,0,0,0.92))
                `,
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-lg font-semibold text-white/90">Debate Matrix</div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  Soon
                </div>
              </div>

              <p className="mt-2 text-sm text-white/75">
                Multi-agent debate to break echo chambers. Arguments mapped for & against.
              </p>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs text-white/60">Status: planned</div>
                <div className="text-xs text-white/80 group-hover:text-white">Preview →</div>
              </div>
            </Link>

            {/* Chrono Vault */}
            <Link
              href="/experiments/chrono-vault"
              className="group rounded-3xl border border-white/10 p-6 hover:brightness-110 transition"
              style={{
                background: `
                  radial-gradient(900px circle at 22% 25%, rgba(34,211,238,0.16), transparent 55%),
                  radial-gradient(850px circle at 78% 20%, rgba(168,85,247,0.16), transparent 55%),
                  radial-gradient(700px circle at 35% 95%, rgba(163,230,53,0.08), transparent 60%),
                  linear-gradient(180deg, rgba(10,10,15,0.92), rgba(0,0,0,0.92))
                `,
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-lg font-semibold text-white/90">Chrono Vault</div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  Soon
                </div>
              </div>

              <p className="mt-2 text-sm text-white/75">
                Future-self simulation with branching timelines and reflective guidance.
              </p>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs text-white/60">Status: planned</div>
                <div className="text-xs text-white/80 group-hover:text-white">Preview →</div>
              </div>
            </Link>

            {/* Beta notes */}
            <Link
              href="/experiments#beta-notes"
              className="group rounded-3xl border border-white/10 p-6 hover:brightness-110 transition"
              style={{
                background: `
                  radial-gradient(900px circle at 18% 25%, rgba(99,102,241,0.16), transparent 55%),
                  radial-gradient(850px circle at 78% 18%, rgba(244,114,182,0.14), transparent 55%),
                  radial-gradient(700px circle at 35% 95%, rgba(34,211,238,0.08), transparent 60%),
                  linear-gradient(180deg, rgba(10,10,15,0.92), rgba(0,0,0,0.92))
                `,
              }}
            >
              <div className="text-xs uppercase tracking-widest text-white/70">Beta Notes</div>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-xs text-white/65">
                <li>v0.2: Canvas stability + build fixes</li>
                <li>v0.3 next: AI-generated nodes (/api/public/chat)</li>
                <li>v0.4 next: Animated emergence + thinking effects</li>
              </ul>
              <div className="mt-4 text-xs text-white/80 group-hover:text-white">Open notes →</div>
            </Link>
          </div>
        </section>

        {/* TRUST / STATS */}
        <section className="mt-14 grid gap-4 md:grid-cols-3">
          <Stat value="Free" label="Start with the free tier" />
          <Stat value="Pro" label="Interview prep + higher limits" />
          <Stat value="Team" label="Seats + analytics + skill matrix" />
        </section>

        {/* WHO IT’S FOR */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold">Who Shynvo is for</h2>
          <p className="mt-2 text-white/70">
            Choose your path — Shynvo adapts the experience to your role.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Card title="Students">
              Quizzes, flashcards, study plans, and confidence-building practice.
            </Card>
            <Card title="Professionals">
              Skill-gap analysis, certification prep, interview readiness.
            </Card>
            <Card title="Companies">
              Team upskilling plans, skill matrix, admin analytics + seats.
            </Card>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mt-16 rounded-3xl border border-white/10 bg-neutral-950 p-8">
          <h2 className="text-2xl font-bold">How it works</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Step n="1" title="Choose a goal">
              Quiz, flashcards, interview practice, or upskilling plan.
            </Step>
            <Step n="2" title="Get AI-generated practice">
              Fast content you can repeat daily.
            </Step>
            <Step n="3" title="Track improvement">
              Upgrade for deeper scoring and team features.
            </Step>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-neutral-200"
              href="/demo"
            >
              Open demo
            </Link>
            <Link
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10"
              href="/robot"
            >
              See the robot experience
            </Link>
            <Link
              className="rounded-xl border border-white/10 bg-black px-5 py-3 font-semibold text-white hover:bg-white/5"
              href="/os"
            >
              Enter Shynvo OS →
            </Link>
          </div>
        </section>

        {/* PRICING TEASER */}
        <section className="mt-16">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Pricing</h2>
              <p className="mt-2 text-white/70">Start free. Upgrade when you need more power.</p>
            </div>
            <Link className="text-sm text-white/70 underline hover:text-white" href="/pricing">
              View full pricing →
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <MiniPlan
              title="Free"
              price="NOK 0"
              items={["Basic quizzes", "Basic flashcards", "Community support"]}
            />
            <MiniPlan
              title="Pro"
              price="NOK 299 / month"
              items={["Higher limits", "Interview simulator", "Skill prep"]}
            />
            <MiniPlan
              title="Team"
              price="NOK 999 / month"
              items={["Seats", "Skill matrix", "Admin analytics"]}
            />
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold">FAQ</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Faq q="Is the robot required?">
              No — it’s optional. The core product works normally without it.
            </Faq>
            <Faq q="Do you store my private data?">
              Only what’s necessary to provide the service. See the Privacy page for details.
            </Faq>
            <Faq q="Can companies add seats?">
              Yes — Team plan is designed for seats, admins, and analytics.
            </Faq>
            <Faq q="What’s next?">
              We’ll connect the demo + robot panel to more backend endpoints (quizzes, interviews,
              analytics).
            </Faq>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-bold">Ready to try it?</h2>
          <p className="mt-2 text-white/70">Start with the demo, then upgrade when you’re ready.</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              className="rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-neutral-200"
              href="/demo"
            >
              Open demo
            </Link>
            <Link
              className="rounded-xl border border-white/10 bg-black px-5 py-3 font-semibold text-white hover:bg-white/5"
              href="/pricing"
            >
              View pricing
            </Link>
            <Link
              className="rounded-xl border border-white/10 bg-black px-5 py-3 font-semibold text-white hover:bg-white/5"
              href="/robot"
            >
              Try the robot
            </Link>
            <Link
              className="rounded-xl border border-white/10 bg-black px-5 py-3 font-semibold text-white hover:bg-white/5"
              href="/os"
            >
              Enter Shynvo OS (2050)
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function Feature({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black p-4">
      <div className="font-semibold text-white">{title}</div>
      <div className="mt-1 text-sm text-white/60">{children}</div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black p-6">
      <div className="text-lg font-semibold">{title}</div>
      <div className="mt-2 text-sm text-white/60">{children}</div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black p-6">
      <div className="text-2xl font-bold">{value}</div>
      <div className="mt-1 text-sm text-white/60">{label}</div>
    </div>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold">
          {n}
        </div>
        <div className="font-semibold">{title}</div>
      </div>
      <div className="mt-3 text-sm text-white/60">{children}</div>
    </div>
  );
}

function MiniPlan({ title, price, items }: { title: string; price: string; items: string[] }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black p-6">
      <div className="text-lg font-semibold">{title}</div>
      <div className="mt-2 text-2xl font-bold">{price}</div>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/60">
        {items.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </div>
  );
}

function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black p-6">
      <div className="font-semibold">{q}</div>
      <div className="mt-2 text-sm text-white/60">{children}</div>
    </div>
  );
}