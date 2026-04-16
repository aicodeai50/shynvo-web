import Link from "next/link";

const COLS = [
  { label:"Product",  links:[{href:"/docs",label:"Docs"},{href:"/pricing",label:"Pricing"},{href:"/search",label:"Search"}] },
  { label:"Platform", links:[{href:"/university",label:"University Hub"},{href:"/frontier",label:"Frontier Lab"},{href:"/enterprise",label:"Enterprise"},{href:"/robot",label:"Robot"}] },
  { label:"Company",  links:[{href:"/contact",label:"Contact"}] },
];

const LEGAL = [{href:"/terms",label:"Terms"},{href:"/privacy",label:"Privacy"},{href:"/refund",label:"Refund"}];
const TAGS  = ["AI-guided","Modular","Structured"];
const mono  = {fontFamily:"var(--font-space-mono,monospace)"} as React.CSSProperties;
const sans  = {fontFamily:"var(--font-syne,sans-serif)"} as React.CSSProperties;

export default function SiteFooter() {
  return (
    <footer style={{ position:"relative", borderTop:"1px solid rgba(0,229,255,0.08)", background:"linear-gradient(180deg,#020508 0%,#010306 100%)" }}>
      <div style={{ position:"absolute", top:0, left:"10%", right:"10%", height:1, background:"linear-gradient(90deg,transparent,rgba(0,229,255,0.4),transparent)", pointerEvents:"none" }}/>

      <div style={{ maxWidth:1400, margin:"0 auto", padding:"64px 24px 0" }}>
        <div style={{ display:"grid", gap:48, marginBottom:48 }} className="md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#00e5ff", boxShadow:"0 0 10px rgba(0,229,255,0.8)", display:"inline-block" }}/>
              <span style={{ ...sans, fontWeight:800, fontSize:18, color:"#fff", letterSpacing:"-0.03em" }}>Shynvo</span>
            </div>
            <p style={{ ...mono, fontSize:11, color:"rgba(255,255,255,0.4)", lineHeight:1.75, maxWidth:220 }}>
              Structured AI platform for learning, building, and guided digital work.
            </p>
            <div style={{ display:"flex", gap:6, marginTop:16, flexWrap:"wrap" }}>
              {TAGS.map(t=>(
                <span key={t} style={{ ...mono, fontSize:9, color:"#00e5ff", border:"1px solid rgba(0,229,255,0.2)", borderRadius:3, padding:"3px 8px", letterSpacing:"0.1em", textTransform:"uppercase" }}>{t}</span>
              ))}
            </div>
          </div>

          {COLS.map(col=>(
            <div key={col.label}>
              <div style={{ ...mono, fontSize:9, color:"rgba(0,229,255,0.5)", letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:16 }}>{col.label}</div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {col.links.map(l=>(
                  <Link key={l.href} href={l.href} style={{ ...mono, fontSize:12, color:"rgba(255,255,255,0.5)", textDecoration:"none", letterSpacing:"0.04em" }}
                    onMouseEnter={e=>(e.currentTarget.style.color="#00e5ff")}
                    onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.5)")}
                  >{l.label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop:"1px solid rgba(255,255,255,0.05)", padding:"20px 0 24px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <div style={{ ...mono, fontSize:10, color:"rgba(255,255,255,0.25)", letterSpacing:"0.08em" }}>© {new Date().getFullYear()} Shynvo. All rights reserved.</div>
          <div style={{ display:"flex", gap:20 }}>
            {LEGAL.map(l=>(
              <Link key={l.href} href={l.href} style={{ ...mono, fontSize:10, color:"rgba(255,255,255,0.3)", textDecoration:"none", letterSpacing:"0.08em" }}
                onMouseEnter={e=>(e.currentTarget.style.color="rgba(255,255,255,0.7)")}
                onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.3)")}
              >{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
