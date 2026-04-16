"use client";
import { useState } from "react";
import Link from "next/link";

type Category = "all"|"learn"|"build"|"explore"|"guide";
const C="#00e5ff";
const mono:React.CSSProperties={fontFamily:"var(--font-space-mono,monospace)"};
const sans:React.CSSProperties={fontFamily:"var(--font-syne,sans-serif)"};

const FILTERS:Array<{key:Category;label:string}> = [
  {key:"all",label:"All"},{key:"learn",label:"Learn"},{key:"build",label:"Build"},
  {key:"explore",label:"Explore"},{key:"guide",label:"Get Guidance"},
];

const PATHS = [
  {title:"University Hub",  desc:"Structured academic learning with guided study paths.", href:"/university",  category:"learn"   as Category,color:"#3b82f6",glyph:"◈"},
  {title:"Shynvo Academy",  desc:"School-level learning with subjects and progression.",  href:"/academy",     category:"learn"   as Category,color:"#3b82f6",glyph:"◇"},
  {title:"Frontier Lab",    desc:"Technical and engineering workflows.",                   href:"/frontier",    category:"build"   as Category,color:"#a855f7",glyph:"⬡"},
  {title:"Enterprise Suite",desc:"Team workflows, missions, and execution systems.",       href:"/enterprise",  category:"build"   as Category,color:"#00ff88",glyph:"▣"},
  {title:"Experiments",     desc:"AI exploration and simulation environments.",            href:"/experiments", category:"explore" as Category,color:"#00e5ff",glyph:"◎"},
  {title:"Arcade Sim",      desc:"Interactive challenges and training simulations.",       href:"/arcade",      category:"explore" as Category,color:"#f59e0b",glyph:"◉"},
  {title:"Shynvo Robot",    desc:"AI guide to help you decide where to start.",           href:"/robot",       category:"guide"   as Category,color:"#00e5ff",glyph:"⬢"},
  {title:"AI Council",      desc:"Clarity, decision-making, and reflection support.",     href:"/os/council",  category:"guide"   as Category,color:"#a855f7",glyph:"◈"},
];

export default function DocsPage() {
  const [active,setActive]=useState<Category>("all");
  const filtered=active==="all"?PATHS:PATHS.filter(p=>p.category===active);
  return (
    <section style={{maxWidth:960,margin:"0 auto",padding:"40px 20px 80px",position:"relative",zIndex:1}}>
      <div className="env-panel" style={{"--env-color":C} as React.CSSProperties}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
          <Link href="/" style={{...mono,fontSize:9,color:"rgba(255,255,255,0.45)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:3,padding:"4px 10px",textDecoration:"none",letterSpacing:"0.06em",textTransform:"uppercase"}}>← Home</Link>
          <span style={{...mono,fontSize:9,color:"rgba(255,255,255,0.2)"}}>/</span>
          <span style={{...mono,fontSize:9,color:C,letterSpacing:"0.06em",textTransform:"uppercase",opacity:0.7}}>Platform Guide</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}>
          <span style={{width:5,height:5,borderRadius:"50%",background:C,boxShadow:`0 0 6px ${C}`,display:"inline-block",flexShrink:0}}/>
          <span style={{...mono,fontSize:9,color:C,letterSpacing:"0.14em",textTransform:"uppercase",opacity:0.7}}>Shynvo · Environment Navigator</span>
        </div>
        <h1 style={{...sans,fontWeight:800,fontSize:"clamp(1.4rem,2.5vw,2rem)",color:"#fff",margin:"0 0 8px",letterSpacing:"-0.02em"}}>Choose Your Path</h1>
        <p style={{...mono,fontSize:11,color:"rgba(255,255,255,0.48)",lineHeight:1.75,maxWidth:480}}>Select what you want to do and enter the right environment. Each path has its own AI guide.</p>
      </div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",margin:"14px 0"}}>
        {FILTERS.map(f=>(
          <button key={f.key} onClick={()=>setActive(f.key)}
            style={{...mono,fontSize:9,letterSpacing:"0.08em",textTransform:"uppercase",padding:"6px 12px",borderRadius:3,cursor:"pointer",border:`1px solid ${active===f.key?C:"rgba(255,255,255,0.1)"}`,background:active===f.key?"rgba(0,229,255,0.1)":"transparent",color:active===f.key?C:"rgba(255,255,255,0.45)",transition:"all 0.15s",whiteSpace:"nowrap"}}
          >{f.label}</button>
        ))}
      </div>
      <div style={{display:"grid",gap:10,gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,240px),1fr))"}}>
        {filtered.map(item=>(
          <Link key={item.title} href={item.href} className="env-card" style={{textDecoration:"none","--env-color":item.color} as React.CSSProperties}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${item.color},transparent)`,opacity:0.25,pointerEvents:"none"}}/>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:16,color:item.color,opacity:0.6}}>{item.glyph}</span>
                <div style={{...sans,fontSize:13,fontWeight:700,color:"#fff"}}>{item.title}</div>
              </div>
              <span style={{...mono,fontSize:8,color:item.color,border:`1px solid ${item.color}30`,borderRadius:3,padding:"2px 6px",letterSpacing:"0.06em",textTransform:"uppercase",flexShrink:0}}>{item.category}</span>
            </div>
            <p style={{...mono,fontSize:10,color:"rgba(255,255,255,0.44)",lineHeight:1.65,marginBottom:12}}>{item.desc}</p>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <span style={{...mono,fontSize:9,color:item.color,letterSpacing:"0.08em",textTransform:"uppercase"}}>Enter path</span>
              <span style={{color:item.color,fontSize:13}}>→</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="env-panel" style={{"--env-color":C,marginTop:14} as React.CSSProperties}>
        <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:16}}>
          <div>
            <div style={{...mono,fontSize:9,color:C,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:6,opacity:0.65}}>Need Help?</div>
            <div style={{...sans,fontSize:14,fontWeight:700,color:"#fff",marginBottom:4}}>Contact support or open the Robot</div>
            <p style={{...mono,fontSize:11,color:"rgba(255,255,255,0.44)"}}>The Robot can guide you to the right environment.</p>
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <Link href="/contact" style={{...mono,fontSize:10,fontWeight:700,color:"#020508",background:C,padding:"9px 16px",borderRadius:3,textDecoration:"none",letterSpacing:"0.08em",textTransform:"uppercase"}}>Contact</Link>
            <Link href="/robot" style={{...mono,fontSize:10,color:C,border:"1px solid rgba(0,229,255,0.28)",padding:"9px 14px",borderRadius:3,textDecoration:"none",letterSpacing:"0.08em",textTransform:"uppercase"}}>Open Robot</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
