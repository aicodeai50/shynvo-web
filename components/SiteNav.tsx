"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const NAV = [
  { href:"/pricing", label:"Pricing" },
  { href:"/docs",    label:"Docs"    },
  { href:"/contact", label:"Contact" },
  { href:"/search",  label:"Search"  },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const tick = () => setTime(new Date().toISOString().slice(11,19));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const mono = { fontFamily:"var(--font-space-mono,monospace)" } as React.CSSProperties;
  const sans = { fontFamily:"var(--font-syne,sans-serif)" } as React.CSSProperties;

  return (
    <>
      <style>{`
        .shn-link{font-family:var(--font-space-mono,monospace);font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.5);text-decoration:none;padding:6px 0;position:relative;transition:color 0.15s;}
        .shn-link::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1px;background:#00e5ff;transition:width 0.2s;}
        .shn-link:hover{color:rgba(255,255,255,0.9);}
        .shn-link:hover::after,.shn-link.act::after{width:100%;}
        .shn-link.act{color:#00e5ff;}
      `}</style>

      <header style={{ position:"sticky", top:0, zIndex:80, borderBottom: scrolled ? "1px solid rgba(0,229,255,0.1)" : "1px solid transparent", background: scrolled ? "rgba(2,5,8,0.95)" : "rgba(2,5,8,0.7)", backdropFilter:"blur(20px)", transition:"background 0.3s,border-color 0.3s" }}>
        <div style={{ borderBottom:"1px solid rgba(0,229,255,0.06)", padding:"4px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ ...mono, fontSize:9, color:"rgba(0,229,255,0.4)", letterSpacing:"0.15em", textTransform:"uppercase" }}>SHYNVO · STRUCTURED AI PLATFORM</span>
          <span style={{ ...mono, fontSize:9, color:"rgba(0,229,255,0.35)", letterSpacing:"0.12em" }}>{time} UTC</span>
        </div>

        <nav style={{ maxWidth:1400, margin:"0 auto", padding:"0 24px", height:52, display:"flex", alignItems:"center", justifyContent:"space-between", gap:24 }}>
          <Link href="/" style={{ ...sans, fontWeight:800, fontSize:18, color:"#fff", textDecoration:"none", letterSpacing:"-0.03em", display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:"#00e5ff", boxShadow:"0 0 10px rgba(0,229,255,0.9)", display:"inline-block", animation:"sh-pulse-c 2s ease-in-out infinite" }}/>
            Shynvo
          </Link>

          <div style={{ display:"flex", alignItems:"center", gap:28 }} className="hidden md:flex">
            {NAV.map(l => <Link key={l.href} href={l.href} className={`shn-link ${pathname===l.href?"act":""}`}>{l.label}</Link>)}
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:12 }} className="hidden md:flex">
            <Link href="/sign-in" style={{ ...mono, fontSize:11, color:"rgba(255,255,255,0.5)", textDecoration:"none", letterSpacing:"0.08em", textTransform:"uppercase", padding:"6px 12px" }}>Sign in</Link>
            <Link href="/docs" style={{ ...mono, fontSize:11, fontWeight:700, color:"#040810", background:"#00e5ff", padding:"8px 16px", borderRadius:3, textDecoration:"none", letterSpacing:"0.08em", textTransform:"uppercase", boxShadow:"0 0 20px rgba(0,229,255,0.3)" }}>Get Started</Link>
          </div>

          <button onClick={()=>setOpen(p=>!p)} className="flex md:hidden" style={{ background:"none", border:"1px solid rgba(0,229,255,0.2)", borderRadius:3, padding:"7px 10px", cursor:"pointer", color:"#00e5ff", ...mono, fontSize:11 }}>
            {open?"✕":"≡"}
          </button>
        </nav>
      </header>

      {open && (
        <div style={{ position:"fixed", inset:0, top:80, background:"#020508", zIndex:90, padding:24, borderTop:"1px solid rgba(0,229,255,0.1)", display:"flex", flexDirection:"column", gap:4 }} className="md:hidden">
          {[...NAV,{href:"/university",label:"University Hub"},{href:"/frontier",label:"Frontier Lab"},{href:"/robot",label:"Robot"}].map(l=>(
            <Link key={l.href} href={l.href} style={{ ...mono, fontSize:13, color:pathname===l.href?"#00e5ff":"rgba(255,255,255,0.7)", textDecoration:"none", padding:"14px 0", borderBottom:"1px solid rgba(255,255,255,0.04)", letterSpacing:"0.08em", textTransform:"uppercase" }}>{l.label}</Link>
          ))}
          <div style={{ marginTop:20, display:"flex", flexDirection:"column", gap:10 }}>
            <Link href="/sign-in" style={{ ...mono, fontSize:12, color:"rgba(255,255,255,0.6)", textDecoration:"none", textAlign:"center", padding:"12px", border:"1px solid rgba(255,255,255,0.08)", borderRadius:3, letterSpacing:"0.08em", textTransform:"uppercase" }}>Sign In</Link>
            <Link href="/docs" style={{ ...mono, fontSize:12, fontWeight:700, color:"#040810", background:"#00e5ff", textDecoration:"none", textAlign:"center", padding:"12px", borderRadius:3, letterSpacing:"0.08em", textTransform:"uppercase" }}>Get Started</Link>
          </div>
        </div>
      )}
    </>
  );
}
