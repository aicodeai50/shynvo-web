import Link from "next/link";

const L =
  "text-sm text-white/60 hover:text-white transition";

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-black">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <div className="text-sm font-semibold text-white">Shynvo</div>
          <div className="mt-2 text-sm text-white/60">
            AI environments for study, exams, interviews, and team upskilling.
          </div>
          <div className="mt-4 text-xs text-white/40">
            © {new Date().getFullYear()} Shynvo
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50">Product</div>
          <div className="mt-4 grid gap-2">
            <Link className={L} href="/demo">Demo</Link>
            <Link className={L} href="/pricing">Pricing</Link>
            <Link className={L} href="/robot">Sci-fi Robot</Link>
            <Link className={L} href="/os">Shynvo OS (2050)</Link>
            <Link className={L} href="/university">University Hub</Link>
            <Link className={L} href="/experiments">Experiments (Beta)</Link>
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/50">Get started</div>
          <div className="mt-4 grid gap-2 text-sm text-white/60">
            <div>1) Open Demo</div>
            <div>2) Choose University or OS</div>
            <div>3) Practice daily loops</div>
            <div>4) Upgrade for scoring + limits</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
