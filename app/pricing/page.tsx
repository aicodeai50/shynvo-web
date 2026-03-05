import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="mx-auto w-full max-w-6xl py-16">
      <div className="mb-8">
        <h1 className="text-4xl font-semibold">Pricing</h1>
        <p className="mt-2 text-white/70">Simple plans. Upgrade anytime.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-white/15 bg-white/5 p-7 backdrop-blur-xl">
          <div className="text-xl font-semibold">Free</div>
          <div className="mt-2 text-2xl font-semibold">7 days free trial</div>
          <ul className="mt-5 space-y-2 text-sm text-white/80">
            <li>• Limited AI generations</li>
            <li>• Basic quizzes & flashcards</li>
            <li>• Community support</li>
          </ul>
          <button className="mt-6 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm hover:bg-white/15">
            Upgrade
          </button>
        </div>

        <div className="rounded-3xl border border-white/15 bg-white/5 p-7 backdrop-blur-xl">
          <div className="text-xl font-semibold">Pro</div>
          <div className="mt-2 text-2xl font-semibold">NOK 299 / month</div>
          <ul className="mt-5 space-y-2 text-sm text-white/80">
            <li>• Higher limits</li>
            <li>• Interview simulator</li>
            <li>• Resume + skill prep</li>
          </ul>
          <button className="mt-6 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm hover:bg-white/15">
            Upgrade
          </button>
        </div>

        <div className="rounded-3xl border border-white/15 bg-white/5 p-7 backdrop-blur-xl">
          <div className="text-xl font-semibold">Team</div>
          <div className="mt-2 text-2xl font-semibold">NOK 999 / month</div>
          <ul className="mt-5 space-y-2 text-sm text-white/80">
            <li>• Company admin tools</li>
            <li>• Seats (managed per team)</li>
            <li>• Skill matrix + upskill plans</li>
          </ul>
          <button className="mt-6 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm hover:bg-white/15">
            Upgrade
          </button>
        </div>
      </div>

      <div className="mt-10">
        <Link className="text-sm underline hover:opacity-80" href="/">
          ← Back
        </Link>
      </div>
    </div>
  );
}
