"use client";

import PortalShell from "@/components/portal/PortalShell";
import PortalCard from "@/components/portal/PortalCard";

export default function PortalHomePage() {
  return (
    <PortalShell
      title="User Dock"
      subtitle={
        <>
          This is the public layer — a different surface than the OS. Routes are alive now; auth comes later.
        </>
      }
      rightSlot={
        <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
          status: preview
        </span>
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <PortalCard
          title="Get Started"
          desc="Quick start: what Shynvo is, how to begin, and what to do first."
          href="/portal/get-started"
          tag="Guide"
          icon={<span>⚡</span>}
        />
        <PortalCard
          title="Create Account"
          desc="Sign up for access. (Stub page for now)"
          href="/portal/signup"
          tag="Auth"
          icon={<span>＋</span>}
        />
        <PortalCard
          title="Sign In"
          desc="Return to your workspace. (Stub page for now)"
          href="/portal/signin"
          tag="Auth"
          icon={<span>↩</span>}
        />
        <PortalCard
          title="Pricing"
          desc="Free vs Pro vs Team. (Stub page for now)"
          href="/portal/pricing"
          tag="Info"
          icon={<span>¤</span>}
        />
        <PortalCard
          title="Documentation"
          desc="How modules work. How AI proxy works. (Stub page for now)"
          href="/portal/docs"
          tag="Docs"
          icon={<span>⌁</span>}
        />
        <PortalCard
          title="System Status"
          desc="Runtime health + API tests. (Later: real telemetry)"
          href="/portal/status"
          tag="Live"
          icon={<span>◎</span>}
        />
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-black/40 p-5 text-sm text-white/65 backdrop-blur-xl">
        <div className="text-xs uppercase tracking-widest text-white/50">Why this exists</div>
        <div className="mt-2 leading-relaxed">
          The OS is the internal control deck. The Portal is the user-facing layer: onboarding, auth, pricing, docs.
          Different feel, same universe.
        </div>
      </div>
    </PortalShell>
  );
}