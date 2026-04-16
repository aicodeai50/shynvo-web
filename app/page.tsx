"use client";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import PreviewTypingLoop from "./components/PreviewTypingLoop";
import WelcomeRobot from "./components/WelcomeRobot";

const VALUES = [
  { tag:"01", title:"AI-Guided Intelligence Layer", desc:"Shynvo understands your intent and adapts to you. It recommends the right direction, adjusts guidance as you progress, and gives you clarity instead of chaos.", href:"/ai-guided-intelligence", glyph:"◈", color:"#00e5ff" },
  { tag:"02", title:"Modular Environment Architecture", desc:"Purpose-built environments for learning, building, and exploration — all connected through unified workflows.", href:"/modular-architecture", glyph:"⬡", color:"#00ff88" },
  { tag:"03", title:"Structured Progression System", desc:"Clear steps, guided paths, and AI-supported progression so users always know what to do next.", href:"/structured-progression", glyph:"◎", color:"#a855f7" },
];

const ENVS = [
  { id:"robot",      title:"Shynvo Robot",    sub:"Guide ready",   desc:"AI guidance to navigate the platform.",            href:"/robot",      color:"#00e5ff", variant:"robot"      as const, lines:["Analyzing your path...","Shynvo Robot ready...","Choose where to begin..."] },
  { id:"university", title:"University Hub",  sub:"Faculty ready", desc:"Advanced learning and study areas.",               href:"/university", color:"#00ff88", variant:"university" as const, lines:["Opening University Hub...","Study systems online...","Learning environments ready..."] },
  { id:"frontier",   title:"Frontier Lab",    sub:"System live",   desc:"Innovative tech and engineering workflows.",       href:"/frontier",   color:"#a855f7", variant:"frontier"   as const, lines:["Booting Frontier Lab...","Engineering mode active...","Research workflow ready..."] },
];

function Counter({ to, suffix="" }:{ to:number; suffix?:string }) {
  const [val,setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{
      if(!e.isIntersecting) return; obs.disconnect();
      let n=0; const step=()=>{ n+=Math.ceil(to/40); if(n>=to){setVal(to);return;} setVal(n); requestAnimationFrame(step); };
      requestAnimationFrame(step);
    },{threshold:0.5});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

const mono:React.CSSProperties = {fontFamily:"var(--font-space-mono,monospace)"};
const sans:React.CSSProperties = {fontFamily:"var(--font-syne,sans-serif)"};
const CYAN="#00e5ff", GREEN="#00ff88";

export default function HomePage() {
  const [activeEnv,setActiveEnv] = useState(0);
  const [scanY,setScanY] = useState(0);

  useEffect(()=>{
    let frame:number, start:number|null=null;
    const run=(ts:number)=>{ if(!start) start=ts; setScanY(((ts-start)%3200)/3200*100); frame=requestAnimationFrame(run); };
    frame=requestAnimationFrame(run);
    return ()=>cancelAnimationFrame(frame);
  },[]);

  return (
    <main style={{position:"relative",overflow:"hidden",color:"#fff"}}>
      <div aria-hidden style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,background:"radial-gradient(ellipse 80% 50% at 10% 0%,rgba(0,229,255,0.07),transparent 60%),radial-gradient(ellipse 60% 40% at 90% 5%,rgba(0,255,136,0.05),transparent 55%),radial-gradient(ellipse 70% 45% at 50% 100%,rgba(124,58,237,0.06),transparent 55%)"}}/>

      {/* ── HERO ── */}
      <section style={{maxWidth:1400,margin:"0 auto",padding:"72px 24px 80px",position:"relative",zIndex:1}}>
        <div style={{display:"grid",alignItems:"start",gap:48}} className="lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,border:"1px solid rgba(0,229,255,0.2)",borderRadius:3,padding:"6px 14px",marginBottom:28}}>
              <span style={{width:6,height:6,borderRadius:"50%",background:GREEN,boxShadow:`0 0 10px ${GREEN}`,display:"inline-block",animation:"sh-pulse-g 2s ease-in-out infinite"}}/>
              <span style={{...mono,fontSize:10,color:GREEN,letterSpacing:"0.14em",textTransform:"uppercase"}}>Structured AI Platform · Online</span>
            </div>

            <h1 style={{...sans,fontWeight:800,fontSize:"clamp(2.6rem,6vw,5rem)",lineHeight:1.02,letterSpacing:"-0.03em",color:"#fff",margin:0}}>
              One platform for <span style={{color:CYAN}}>learning,</span> building, and <span style={{color:GREEN}}>AI-guided</span> work
            </h1>

            <p style={{...mono,marginTop:24,fontSize:13,color:"rgba(255,255,255,0.5)",lineHeight:1.8,maxWidth:480,letterSpacing:"0.02em"}}>
              Clear environments. Guided AI. Structured progress.
            </p>

            <div style={{display:"flex",flexWrap:"wrap",gap:12,marginTop:36}}>
              <Link href="/docs" style={{...mono,fontSize:12,fontWeight:700,color:"#040810",background:CYAN,padding:"14px 28px",borderRadius:3,textDecoration:"none",letterSpacing:"0.08em",textTransform:"uppercase",boxShadow:"0 0 32px rgba(0,229,255,0.35)"}}>Start Your Journey →</Link>
              <Link href="#platform-preview" style={{...mono,fontSize:12,color:"rgba(255,255,255,0.6)",border:"1px solid rgba(255,255,255,0.1)",padding:"14px 24px",borderRadius:3,textDecoration:"none",letterSpacing:"0.08em",textTransform:"uppercase"}}>Explore Worlds</Link>
            </div>

            <p style={{...mono,marginTop:20,fontSize:10,color:"rgba(255,255,255,0.3)",letterSpacing:"0.1em"}}>NO SETUP REQUIRED · START INSTANTLY · ALL ENVIRONMENTS</p>

            <div style={{display:"flex",gap:32,marginTop:40,flexWrap:"wrap"}}>
              {[{to:7,s:"",l:"Environments"},{to:4,s:" plans",l:"Pricing tiers"},{to:100,s:"%",l:"AI-guided"}].map(x=>(
                <div key={x.l}>
                  <div style={{...sans,fontWeight:800,fontSize:28,color:CYAN,lineHeight:1}}><Counter to={x.to} suffix={x.s}/></div>
                  <div style={{...mono,fontSize:10,color:"rgba(255,255,255,0.35)",marginTop:4,letterSpacing:"0.1em",textTransform:"uppercase"}}>{x.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex lg:justify-end">
            <div style={{width:"100%",maxWidth:360,position:"relative"}}>
              <div aria-hidden style={{position:"absolute",inset:-40,background:"radial-gradient(circle at 50% 50%,rgba(0,229,255,0.12),transparent 65%)",pointerEvents:"none",zIndex:0}}/>
              <div style={{position:"relative",zIndex:1}}><WelcomeRobot/></div>
              <div style={{...mono,fontSize:9,color:CYAN,opacity:0.5,letterSpacing:"0.14em",textAlign:"center",marginTop:12}}>SH-ROBOT · UNIT-01 · STANDBY</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT SHYNVO IS ── */}
      <section style={{maxWidth:1400,margin:"0 auto",padding:"0 24px 96px",position:"relative",zIndex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:40}}>
          <div style={{flex:1,height:1,background:"linear-gradient(90deg,rgba(0,229,255,0.3),transparent)"}}/>
          <div style={{...mono,fontSize:10,color:CYAN,letterSpacing:"0.2em",textTransform:"uppercase",opacity:0.7}}>What Shynvo Is</div>
          <div style={{flex:1,height:1,background:"linear-gradient(270deg,rgba(0,229,255,0.3),transparent)"}}/>
        </div>
        <div style={{display:"grid",gap:16}} className="md:grid-cols-3">
          {VALUES.map(item=>(
            <Link key={item.tag} href={item.href} style={{textDecoration:"none"}}>
              <div style={{background:"#060c14",border:"1px solid rgba(0,229,255,0.1)",borderRadius:4,padding:28,height:"100%",position:"relative",overflow:"hidden",transition:"border-color 0.2s,transform 0.2s",cursor:"pointer"}}
                onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=`${item.color}50`;(e.currentTarget as HTMLDivElement).style.transform="translateY(-4px)";}}
                onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor="rgba(0,229,255,0.1)";(e.currentTarget as HTMLDivElement).style.transform="translateY(0)";}}
              >
                <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${item.color},transparent)`,opacity:0.4,pointerEvents:"none"}}/>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
                  <span style={{...mono,fontSize:9,color:item.color,opacity:0.6,letterSpacing:"0.15em"}}>_{item.tag}</span>
                  <span style={{fontSize:24,color:item.color,opacity:0.6}}>{item.glyph}</span>
                </div>
                <div style={{...sans,fontSize:16,fontWeight:700,color:"#fff",marginBottom:14,lineHeight:1.3}}>{item.title}</div>
                <p style={{...mono,fontSize:12,color:"rgba(255,255,255,0.5)",lineHeight:1.75,marginBottom:24}}>{item.desc}</p>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <span style={{...mono,fontSize:10,color:item.color,letterSpacing:"0.1em",textTransform:"uppercase"}}>Learn more</span>
                  <span style={{color:item.color,fontSize:16}}>›</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── PLATFORM PREVIEW ── */}
      <section id="platform-preview" style={{maxWidth:1400,margin:"0 auto",padding:"0 24px 96px",position:"relative",zIndex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:16}}>
          <div style={{flex:1,height:1,background:"linear-gradient(90deg,rgba(0,229,255,0.3),transparent)"}}/>
          <div style={{...mono,fontSize:10,color:CYAN,letterSpacing:"0.2em",textTransform:"uppercase",opacity:0.7}}>Platform Environments</div>
          <div style={{flex:1,height:1,background:"linear-gradient(270deg,rgba(0,229,255,0.3),transparent)"}}/>
        </div>
        <h2 style={{...sans,fontWeight:800,fontSize:"clamp(1.8rem,4vw,3rem)",letterSpacing:"-0.02em",textAlign:"center",color:"#fff",marginBottom:40}}>What the platform looks like</h2>

        <div style={{display:"flex",gap:4,justifyContent:"center",marginBottom:32,flexWrap:"wrap"}}>
          {ENVS.map((env,i)=>(
            <button key={env.id} onClick={()=>setActiveEnv(i)} style={{...mono,fontSize:11,color:activeEnv===i?"#040810":"rgba(255,255,255,0.5)",background:activeEnv===i?env.color:"transparent",border:`1px solid ${activeEnv===i?env.color:"rgba(255,255,255,0.1)"}`,borderRadius:3,padding:"8px 18px",cursor:"pointer",letterSpacing:"0.08em",textTransform:"uppercase",transition:"all 0.2s",boxShadow:activeEnv===i?`0 0 20px ${env.color}40`:"none"}}>{env.title}</button>
          ))}
        </div>

        <div style={{display:"grid",gap:16}} className="md:grid-cols-3">
          {ENVS.map((env,i)=>(
            <Link key={env.id} href={env.href} style={{textDecoration:"none"}}>
              <div style={{background:"#060c14",border:`1px solid ${activeEnv===i?env.color+"40":"rgba(0,229,255,0.08)"}`,borderRadius:4,padding:24,position:"relative",overflow:"hidden",transition:"all 0.2s",transform:activeEnv===i?"translateY(-4px)":"none",boxShadow:activeEnv===i?`0 8px 32px rgba(0,0,0,0.4),0 0 0 1px ${env.color}20`:"none"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${env.color},transparent)`,opacity:activeEnv===i?0.6:0.2,pointerEvents:"none"}}/>
                {[[{top:6,left:6},{borderTop:`1px solid ${env.color}`,borderLeft:`1px solid ${env.color}`}],[{top:6,right:6},{borderTop:`1px solid ${env.color}`,borderRight:`1px solid ${env.color}`}],[{bottom:6,left:6},{borderBottom:`1px solid ${env.color}`,borderLeft:`1px solid ${env.color}`}],[{bottom:6,right:6},{borderBottom:`1px solid ${env.color}`,borderRight:`1px solid ${env.color}`}]].map(([p,b],ci)=>(
                  <div key={ci} aria-hidden style={{position:"absolute",width:10,height:10,opacity:activeEnv===i?0.7:0.2,...p as any,...b as any}}/>
                ))}
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
                  <div style={{...sans,fontSize:15,fontWeight:700,color:"#fff"}}>{env.title}</div>
                  <div style={{display:"flex",alignItems:"center",gap:5}}>
                    <span style={{width:6,height:6,borderRadius:"50%",background:GREEN,boxShadow:`0 0 8px ${GREEN}`,display:"inline-block",animation:"sh-pulse-g 2s ease-in-out infinite"}}/>
                    <span style={{...mono,fontSize:9,color:GREEN,letterSpacing:"0.12em",textTransform:"uppercase"}}>System Live</span>
                  </div>
                </div>
                <div style={{...mono,fontSize:10,color:env.color,opacity:0.7,marginBottom:12,letterSpacing:"0.1em"}}>{env.sub}</div>
                <p style={{...mono,fontSize:12,color:"rgba(255,255,255,0.5)",lineHeight:1.7,marginBottom:16}}>{env.desc}</p>
                <div style={{background:"#020508",border:"1px solid rgba(0,229,255,0.08)",borderRadius:3,padding:12,position:"relative",overflow:"hidden"}}>
                  {activeEnv===i && <div aria-hidden style={{position:"absolute",left:0,right:0,height:2,top:`${scanY}%`,background:"linear-gradient(90deg,transparent,rgba(0,229,255,0.3),transparent)",pointerEvents:"none",zIndex:5}}/>}
                  <div style={{...mono,fontSize:9,color:env.color,opacity:0.5,marginBottom:8,letterSpacing:"0.1em"}}>local loop ▌</div>
                  <PreviewTypingLoop variant={env.variant} lines={env.lines}/>
                </div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:16}}>
                  <span style={{...mono,fontSize:10,color:"rgba(255,255,255,0.4)",letterSpacing:"0.08em",textTransform:"uppercase"}}>Open preview</span>
                  <span style={{color:env.color,fontSize:16}}>›</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURE STRIP ── */}
      <section style={{position:"relative",zIndex:1,margin:"0 0 80px",borderTop:"1px solid rgba(0,229,255,0.06)",borderBottom:"1px solid rgba(0,229,255,0.06)",background:"rgba(0,229,255,0.02)",padding:"40px 24px"}}>
        <div style={{maxWidth:1400,margin:"0 auto",display:"flex",gap:40,flexWrap:"wrap",justifyContent:"center"}}>
          {[{l:"Multi-environment",d:"One login, every world"},{l:"AI-native",d:"Guided from first click"},{l:"Modular by design",d:"Only what you need"},{l:"Structured paths",d:"Always know next step"},{l:"Mobile-ready",d:"iOS & Android apps"}].map(f=>(
            <div key={f.l} style={{textAlign:"center",minWidth:140}}>
              <div style={{...sans,fontSize:14,fontWeight:600,color:"#fff",marginBottom:4}}>{f.l}</div>
              <div style={{...mono,fontSize:11,color:"rgba(255,255,255,0.35)",letterSpacing:"0.04em"}}>{f.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── QR ── */}
      <section style={{maxWidth:1400,margin:"0 auto",padding:"0 24px 96px",position:"relative",zIndex:1}}>
        <div style={{background:"#060c14",border:"1px solid rgba(0,229,255,0.12)",borderRadius:4,padding:"48px 36px",position:"relative",overflow:"hidden",display:"flex",flexDirection:"column",alignItems:"center",gap:32,textAlign:"center"}} className="md:flex-row md:text-left md:justify-between">
          <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(0,229,255,0.5),transparent)",pointerEvents:"none"}}/>
          <div>
            <div style={{...mono,fontSize:10,color:CYAN,opacity:0.6,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:12}}>Mobile Access</div>
            <div style={{...sans,fontWeight:800,fontSize:28,color:"#fff",marginBottom:8}}>Scan to explore Shynvo</div>
            <p style={{...mono,fontSize:12,color:"rgba(255,255,255,0.45)",maxWidth:360}}>Continue your journey on mobile. Same environments, same AI guidance.</p>
          </div>
          <div style={{background:"#fff",padding:14,borderRadius:4,boxShadow:"0 0 40px rgba(0,229,255,0.15)"}}>
            <QRCodeSVG value="https://shynvo.app" size={120} bgColor="#ffffff" fgColor="#020508"/>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{maxWidth:1400,margin:"0 auto",padding:"0 24px 120px",position:"relative",zIndex:1,textAlign:"center"}}>
        <div style={{...mono,fontSize:10,color:CYAN,opacity:0.5,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:20}}>Begin Now</div>
        <h2 style={{...sans,fontWeight:800,fontSize:"clamp(2rem,5vw,4rem)",letterSpacing:"-0.03em",color:"#fff",marginBottom:16,lineHeight:1.05}}>Hello! Welcome to Shynvo.</h2>
        <p style={{...mono,fontSize:13,color:"rgba(255,255,255,0.45)",maxWidth:440,margin:"0 auto 36px",lineHeight:1.8}}>Choose your starting environment and let the Robot guide you from there.</p>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
          <Link href="/docs" style={{...mono,fontSize:12,fontWeight:700,color:"#040810",background:CYAN,padding:"14px 32px",borderRadius:3,textDecoration:"none",letterSpacing:"0.08em",textTransform:"uppercase",boxShadow:"0 0 40px rgba(0,229,255,0.4)"}}>Start Your Journey</Link>
          <Link href="/robot" style={{...mono,fontSize:12,color:CYAN,border:"1px solid rgba(0,229,255,0.3)",padding:"14px 24px",borderRadius:3,textDecoration:"none",letterSpacing:"0.08em",textTransform:"uppercase"}}>Open Robot</Link>
        </div>
      </section>
    </main>
  );
}
