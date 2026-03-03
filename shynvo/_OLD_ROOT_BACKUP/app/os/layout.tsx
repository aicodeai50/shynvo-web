import type { ReactNode } from 'react';

export default function OSLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#070A0F] text-white">
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-48 left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-56 right-[-140px] h-[620px] w-[620px] rounded-full bg-white/4 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(255,255,255,0.06),transparent_60%)]" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070A0F]/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-white/10 ring-1 ring-white/15" />
            <div className="leading-tight">
              <div className="text-sm font-semibold">Shynvo</div>
              <div className="text-[11px] text-white/60">OS • Dimensional Cockpit</div>
            </div>
          </a>

          <nav className="hidden items-center gap-3 md:flex">
            <a href="/os" className="rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white">
              Cockpit
            </a>
            <a href="/os/terminal" className="rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white">
              Terminal
            </a>
            <a href="/os/missions" className="rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white">
              Missions
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/upgrade"
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#070A0F] hover:bg-white/90"
            >
              Upgrade
            </a>
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}
