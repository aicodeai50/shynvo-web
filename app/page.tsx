"use client";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import PreviewTypingLoop from "./components/PreviewTypingLoop";

const VALUES = [
  { tag:"01", title:"AI-Guided Intelligence Layer", desc:"Shynvo understands your intent and adapts to you. It recommends the right direction, adjusts guidance as you progress, and gives you clarity instead of chaos.", href:"/ai-guided-intelligence", glyph:"◈", color:"#00e5ff" },
  { tag:"02", title:"Modular Environment Architecture", desc:"Purpose-built environments for learning, building, and exploration — all connected through unified workflows.", href:"/modular-architecture", glyph:"⬡", color:"#00ff88" },
  { tag:"03", title:"Structured Progression System", desc:"Clear steps, guided paths, and AI-supported progression so users always know what to do next.", href:"/structured-progression", glyph:"◎", color:"#a855f7" },
];

const ENVS = [
  { id:"robot", title:"Shynvo Robot", sub:"Guide ready", desc:"AI guidance to navigate the platform.", href:"/robot", color:"#00e5ff", variant:"robot" as const, lines:["Analyzing your path...","Shynvo Robot ready...","Choose where to begin..."] },
  { id:"university", title:"University Hub", sub:"Faculty ready", desc:"Advanced learning and study areas.", href:"/university", color:"#00ff88", variant:"university" as const, lines:["Opening University Hub...","Study systems online...","Learning environments ready..."] },
  { id:"frontier", title:"Frontier Lab", sub:"System live", desc:"Innovative tech and engineering workflows.", href:"/frontier", color:"#a855f7", variant:"frontier" as const, lines:["Booting Frontier Lab...","Engineering mode active...","Research workflow ready..."] },
];

const CYAN="#00e5ff", GREEN="#00ff88";

function Counter({to,suffix=""}:{to:number;suffix?:string}) {
  const [val,setVal]=useState(0);
  const ref=useRef<HTMLSpanElement>(null);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{
      if(!e.isIntersecting)return;obs.disconnect();
      let n=0;const step=()=>{n+=Math.ceil(to/40);if(n>=to){setVal(to);return;}setVal(n);requestAnimationFrame(step);};
      requestAnimationFrame(step);
    },{threshold:0.5});
    if(ref.current)obs.observe(ref.current);
    return()=>obs.disconnect();
  },[to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

export default function HomePage() {
  const [activeEnv,setActiveEnv]=useState(0);
  const [scanY,setScanY]=useState(0);
  useEffect(()=>{
    let f:number,s:number|null=null;
    const r=(ts:number)=>{if(!s)s=ts;setScanY(((ts-s)%3200)/3200*100);f=requestAnimationFrame(r);};
    f=requestAnimationFrame(r);
    return()=>cancelAnimationFrame(f);
  },[]);

  return (
    <main style={{position:"relative",overflow:"hidden",color:"#fff"}}>
      <style>{`
        @keyframes sh-pulse-g{0%,100%{opacity:1;box-shadow:0 0 8px #00ff88,0 0 18px rgba(0,255,136,.28)}50%{opacity:.6;box-shadow:0 0 4px #00ff88}}
        @keyframes sh-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        .sh-page *{word-break:normal;overflow-wrap:normal;white-space:normal;}
        .sh-val-card{background:#060c14;border:1px solid rgba(0,229,255,0.1);border-radius:6px;padding:20px;height:100%;position:relative;overflow:hidden;transition:border-color 0.2s,transform 0.2s;display:block;text-decoration:none;}
        .sh-val-card:hover{transform:translateY(-3px);}
        .sh-env-card{background:#060c14;border-radius:6px;padding:18px;position:relative;overflow:hidden;transition:all 0.2s;display:block;text-decoration:none;}
        .sh-tab{font-family:var(--font-space-mono,monospace);font-size:10px;letter-spacing:0.06em;text-transform:uppercase;border-radius:3px;padding:7px 14px;cursor:pointer;transition:all 0.2s;border:1px solid;white-space:nowrap;}
        .sh-cta-primary{font-family:var(--font-space-mono,monospace);font-size:11px;font-weight:700;color:#020508;background:#00e5ff;padding:11px 20px;border-radius:4px;text-decoration:none;letter-spacing:0.06em;text-transform:uppercase;white-space:nowrap;display:inline-block;}
        .sh-cta-secondary{font-family:var(--font-space-mono,monospace);font-size:11px;color:rgba(255,255,255,0.65);border:1px solid rgba(255,255,255,0.15);padding:11px 16px;border-radius:4px;text-decoration:none;letter-spacing:0.06em;text-transform:uppercase;white-space:nowrap;display:inline-block;}
      `}</style>

      <div aria-hidden style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,background:"radial-gradient(ellipse 90% 55% at 5% 0%,rgba(0,229,255,0.07),transparent 60%),radial-gradient(ellipse 70% 45% at 95% 5%,rgba(0,255,136,0.05),transparent 55%),radial-gradient(ellipse 80% 50% at 50% 105%,rgba(124,58,237,0.06),transparent 55%)"}}/>

      {/* ══ HERO ══ */}
      <section className="sh-page" style={{maxWidth:960,margin:"0 auto",padding:"40px 20px 56px",position:"relative",zIndex:1}}>
        <div style={{display:"block"}}>

          {/* LEFT */}
          <div>
            {/* Status pill — nowrap, small font */}
            <div style={{display:"inline-flex",alignItems:"center",gap:6,border:"1px solid rgba(0,229,255,0.18)",borderRadius:20,padding:"4px 12px",marginBottom:20,background:"rgba(0,229,255,0.04)",flexShrink:0}}>
              <span style={{width:6,height:6,borderRadius:"50%",background:GREEN,flexShrink:0,display:"inline-block",animation:"sh-pulse-g 2s ease-in-out infinite"}}/>
              <span style={{fontFamily:"var(--font-space-mono,monospace)",fontSize:9,color:GREEN,letterSpacing:"0.08em",textTransform:"uppercase",whiteSpace:"nowrap"}}>
                Structured AI Platform · Online
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily:"var(--font-syne,sans-serif)",
              fontWeight:800,
              fontSize:"clamp(1.3rem,2.2vw,2.2rem)",
              lineHeight:1.12,
              letterSpacing:"-0.02em",
              color:"#fff",
              margin:"0 0 14px",
              wordBreak:"normal",
              overflowWrap:"normal",
            }}>
              One platform for{" "}
              <span style={{color:CYAN}}>learning,</span>{" "}
              building, and{" "}
              <span style={{color:GREEN}}>AI-guided</span>{" "}
              work
            </h1>

            <p style={{
              fontFamily:"var(--font-space-mono,monospace)",
              fontSize:12,
              color:"rgba(255,255,255,0.52)",
              lineHeight:1.8,
              marginBottom:24,
              maxWidth:440,
            }}>
              Clear environments. Guided AI. Structured progress.
            </p>

            {/* CTAs — flex row, nowrap */}
            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14,alignItems:"flex-start"}}>
              <Link href="/docs" className="sh-cta-primary">Start Your Journey →</Link>
              <Link href="#platform-preview" className="sh-cta-secondary">Explore Worlds</Link>
            </div>

            <p style={{
              fontFamily:"var(--font-space-mono,monospace)",
              fontSize:9,
              color:"rgba(255,255,255,0.2)",
              letterSpacing:"0.06em",
              marginBottom:24,
              whiteSpace:"normal",
            }}>
              No setup required · Start instantly · All environments
            </p>

            {/* Stats — flex row */}
            <div style={{display:"flex",gap:20,flexWrap:"nowrap",alignItems:"flex-start",overflowX:"auto"}}>
              {[{to:7,s:"",l:"Environments"},{to:4,s:" plans",l:"Pricing tiers"},{to:100,s:"%",l:"AI-guided"}].map(x=>(
                <div key={x.l} style={{minWidth:60}}>
                  <div style={{
                    fontFamily:"var(--font-syne,sans-serif)",
                    fontWeight:800,
                    fontSize:20,
                    color:CYAN,
                    lineHeight:1,
                    whiteSpace:"nowrap",
                  }}>
                    <Counter to={x.to} suffix={x.s}/>
                  </div>
                  <div style={{
                    fontFamily:"var(--font-space-mono,monospace)",
                    fontSize:9,
                    color:"rgba(255,255,255,0.3)",
                    marginTop:3,
                    letterSpacing:"0.06em",
                    textTransform:"uppercase",
                    whiteSpace:"nowrap",
                  }}>{x.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — robot, desktop only */}
          <div className="hidden lg:flex" style={{justifyContent:"flex-end",alignItems:"flex-start"}}>
            <div style={{width:300,position:"relative"}}>
              <div aria-hidden style={{position:"absolute",inset:-40,background:"radial-gradient(circle at 50% 45%,rgba(0,229,255,0.1),transparent 60%)",pointerEvents:"none",zIndex:0}}/>
              <div style={{position:"relative",zIndex:1,background:"rgba(6,12,20,0.75)",border:"1px solid rgba(0,229,255,0.16)",borderRadius:10,padding:"12px 12px 8px",backdropFilter:"blur(12px)"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8,paddingBottom:7,borderBottom:"1px solid rgba(0,229,255,0.08)"}}>
                  <span style={{fontFamily:"var(--font-space-mono,monospace)",fontSize:8,color:CYAN,opacity:0.55,letterSpacing:"0.1em",textTransform:"uppercase"}}>SH-ROBOT · UNIT-01</span>
                  <div style={{display:"flex",alignItems:"center",gap:4}}>
                    <span style={{width:5,height:5,borderRadius:"50%",background:GREEN,display:"inline-block",animation:"sh-pulse-g 2s ease-in-out infinite"}}/>
                    <span style={{fontFamily:"var(--font-space-mono,monospace)",fontSize:8,color:GREEN,letterSpacing:"0.08em",textTransform:"uppercase"}}>Standby</span>
                  </div>
                </div>
                <WelcomeRobot/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHAT SHYNVO IS ══ */}
      <section style={{maxWidth:960,margin:"0 auto",padding:"0 20px 72px",position:"relative",zIndex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:28}}>
          <div style={{flex:1,height:1,background:"linear-gradient(90deg,rgba(0,229,255,0.25),transparent)"}}/>
          <span style={{fontFamily:"var(--font-space-mono,monospace)",fontSize:9,color:CYAN,letterSpacing:"0.14em",textTransform:"uppercase",opacity:0.6,whiteSpace:"nowrap"}}>What Shynvo Is</span>
          <div style={{flex:1,height:1,background:"linear-gradient(270deg,rgba(0,229,255,0.25),transparent)"}}/>
        </div>
        <div style={{display:"grid",gap:12,gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,260px),1fr))"}}>
          {VALUES.map(item=>(
            <Link key={item.tag} href={item.href} className="sh-val-card"
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=`${item.color}50`;}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor="rgba(0,229,255,0.1)";}}
            >
              <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${item.color},transparent)`,opacity:0.3,pointerEvents:"none"}}/>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                <span style={{fontFamily:"var(--font-space-mono,monospace)",fontSize:9,color:item.color,opacity:0.5,letterSpacing:"0.1em"}}>_{item.tag}</span>
                <span style={{fontSize:18,color:item.color,opacity:0.5}}>{item.glyph}</span>
              </div>
              <div style={{fontFamily:"var(--font-syne,sans-serif)",fontSize:14,fontWeight:700,color:"#fff",marginBottom:8,lineHeight:1.35}}>{item.title}</div>
              <p style={{fontFamily:"var(--font-space-mono,monospace)",fontSize:11,color:"rgba(255,255,255,0.44)",lineHeight:1.72,marginBottom:14}}>{item.desc}</p>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{fontFamily:"var(--font-space-mono,monospace)",fontSize:9,color:item.color,letterSpacing:"0.08em",textTransform:"uppercase"}}>Learn more</span>
                <span style={{color:item.color,fontSize:13}}>›</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══ PLATFORM PREVIEW ══ */}
      <section id="platform-preview" style={{maxWidth:960,margin:"0 auto",padding:"0 20px 72px",position:"relative",zIndex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
          <div style={{flex:1,height:1,background:"linear-gradient(90deg,rgba(0,229,255,0.25),transparent)"}}/>
          <span style={{fontFamily:"var(--font-space-mono,monospace)",fontSize:9,color:CYAN,letterSpacing:"0.14em",textTransform:"uppercase",opacity:0.6,whiteSpace:"nowrap"}}>Platform Environments</span>
          <div style={{flex:1,height:1,background:"linear-gradient(270deg,rgba(0,229,255,0.25),transparent)"}}/>
        </div>
        <h2 style={{fontFamily:"var(--font-syne,sans-serif)",fontWeight:800,fontSize:"clamp(1.1rem,2vw,1.6rem)",letterSpacing:"-0.02em",textAlign:"center",color:"#fff",marginBottom:24}}>
          What the platform looks like
        </h2>
        <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:20,flexWrap:"wrap"}}>
          {ENVS.map((env,i)=>(
            <button key={env.id} onClick={()=>setActiveEnv(i)} className="sh-tab"
              style={{color:activeEnv===i?"#020508":"rgba(255,255,255,0.5)",background:activeEnv===i?env.color:"transparent",borderColor:activeEnv===i?env.color:"rgba(255,255,255,0.1)",boxShadow:activeEnv===i?`0 0 16px ${env.color}40`:"none"}}
            >{env.title}</button>
          ))}
        </div>
        <div style={{display:"grid",gap:12,gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,260px),1fr))"}}>
          {ENVS.map((env,i)=>(
            <Link key={env.id} href={env.href} className="sh-env-card"
              style={{border:`1px solid ${activeEnv===i?env.color+"40":"rgba(0,229,255,0.08)"}`,transform:activeEnv===i?"translateY(-3px)":"none",boxShadow:activeEnv===i?`0 6px 24px rgba(0,0,0,0.4),0 0 0 1px ${env.color}16`:"none"}}
            >
              <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${env.color},transparent)`,opacity:activeEnv===i?0.5:0.12,pointerEvents:"none"}}/>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                <div style={{fontFamily:"var(--font-syne,sans-serif)",fontSize:13,fontWeight:700,color:"#fff"}}>{env.title}</div>
                <div style={{display:"flex",alignItems:"center",gap:4}}>
                  <span style={{width:5,height:5,borderRadius:"50%",background:GREEN,display:"inline-block",animation:"sh-pulse-g 2s ease-in-out infinite"}}/>
                  <span style={{fontFamily:"var(--font-space-mono,monospace)",fontSize:8,color:GREEN,letterSpacing:"0.08em",textTransform:"uppercase",whiteSpace:"nowrap"}}>System Live</span>
                </div>
              </div>
              <div style={{fontFamily:"var(--font-space-mono,monospace)",fontSize:9,color:env.color,opacity:0.6,marginBottom:7,letterSpacing:"0.06em"}}>{env.sub}</div>
              <p style={{fontFamily:"var(--font-space-mono,monospace)",fontSize:11,color:"rgba(255,255,255,0.44)",lineHeight:1.65,marginBottom:11}}>{env.desc}</p>
              <div style={{background:"#020508",border:"1px solid rgba(0,229,255,0.06)",borderRadius:3,padding:9,position:"relative",overflow:"hidden"}}>
                {activeEnv===i&&<div aria-hidden style={{position:"absolute",left:0,right:0,height:2,top:`${scanY}%`,background:"linear-gradient(90deg,transparent,rgba(0,229,255,0.25),transparent)",pointerEvents:"none",zIndex:5}}/>}
                <div style={{fontFamily:"var(--font-space-mono,monospace)",fontSize:8,color:env.color,opacity:0.4,marginBottom:4,letterSpacing:"0.08em"}}>local loop ▌</div>
                <PreviewTypingLoop variant={env.variant} lines={env.lines}/>
              </div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:10}}>
                <span style={{fontFamily:"var(--font-space-mono,monospace)",fontSize:9,color:"rgba(255,255,255,0.3)",letterSpacing:"0.06em",textTransform:"uppercase"}}>Open preview</span>
                <span style={{color:env.color,fontSize:12}}>›</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══ QR ══ */}
      <section style={{maxWidth:960,margin:"0 auto",padding:"0 20px 72px",position:"relative",zIndex:1}}>
        <div style={{background:"#060c14",border:"1px solid rgba(0,229,255,0.12)",borderRadius:6,padding:"28px 24px",position:"relative",overflow:"hidden",display:"flex",flexDirection:"column",alignItems:"center",gap:20,textAlign:"center"}} className="md:flex-row md:text-left md:justify-between">
          <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(0,229,255,0.38),transparent)",pointerEvents:"none"}}/>
          <div>
            <div style={{fontFamily:"var(--font-space-mono,monospace)",fontSize:9,color:CYAN,opacity:0.5,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:8}}>Mobile Access</div>
            <div style={{fontFamily:"var(--font-syne,sans-serif)",fontWeight:800,fontSize:"clamp(1rem,1.8vw,1.3rem)",color:"#fff",marginBottom:6}}>Scan to explore Shynvo</div>
            <p style={{fontFamily:"var(--font-space-mono,monospace)",fontSize:11,color:"rgba(255,255,255,0.38)",maxWidth:280,lineHeight:1.7}}>Continue on mobile. Same environments, same AI guidance.</p>
          </div>
          <div style={{background:"#fff",padding:10,borderRadius:4,boxShadow:"0 0 28px rgba(0,229,255,0.12)",flexShrink:0}}>
            <QRCodeSVG value="https://shynvo.app" size={88} bgColor="#ffffff" fgColor="#020508"/>
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section style={{maxWidth:960,margin:"0 auto",padding:"0 20px 96px",position:"relative",zIndex:1,textAlign:"center"}}>
        <div style={{fontFamily:"var(--font-space-mono,monospace)",fontSize:9,color:CYAN,opacity:0.4,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:12}}>Begin Now</div>
        <h2 style={{fontFamily:"var(--font-syne,sans-serif)",fontWeight:800,fontSize:"clamp(1.2rem,2.2vw,2rem)",letterSpacing:"-0.02em",color:"#fff",marginBottom:10,lineHeight:1.1}}>
          Hello! Welcome to Shynvo.
        </h2>
        <p style={{fontFamily:"var(--font-space-mono,monospace)",fontSize:11,color:"rgba(255,255,255,0.38)",maxWidth:320,margin:"0 auto 24px",lineHeight:1.8}}>
          Choose your environment and let the Robot guide you.
        </p>
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
          <Link href="/docs" className="sh-cta-primary" style={{boxShadow:`0 0 28px rgba(0,229,255,0.32)`}}>Start Your Journey</Link>
          <Link href="/robot" style={{fontFamily:"var(--font-space-mono,monospace)",fontSize:11,color:CYAN,border:`1px solid rgba(0,229,255,0.25)`,padding:"11px 18px",borderRadius:4,textDecoration:"none",letterSpacing:"0.06em",textTransform:"uppercase",display:"inline-block",background:"rgba(0,229,255,0.03)"}}>Open Robot</Link>
        </div>
      </section>
    </main>
  );
}
