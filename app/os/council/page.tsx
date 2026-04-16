"use client";
import { useState } from "react";
import Link from "next/link";
import OsNav from "@/components/os/OsNav";
import { getSupabaseClient } from "@/lib/supabase/client";

const C="#a855f7";
const mono:React.CSSProperties={fontFamily:"var(--font-space-mono,monospace)"};
const sans:React.CSSProperties={fontFamily:"var(--font-syne,sans-serif)"};

const EXAMPLES=[
  "Should I focus on exams first or product work first?",
  "I feel overwhelmed and scattered. Help me think clearly.",
  "Should I continue this direction or simplify first?",
  "Help me think through a difficult personal decision.",
];

const SYSTEM_PROMPT=`You are AI Council inside Shynvo OS. You help users think through decisions, uncertainty, emotional overwhelm, and strategic direction. Respond like a calm, wise council — not a generic chatbot. Give balanced, multi-perspective reasoning. End with a grounded next step. Be warm, steady, and respectful. Do not mention backend systems or infrastructure.`.trim();

async function fetchReply(message:string):Promise<string> {
  const supabase=getSupabaseClient();
  let token="";
  if(supabase){const s=await supabase.auth.getSession();token=s.data.session?.access_token||"";}
  const res=await fetch("/api/public/chat",{method:"POST",headers:{"content-type":"application/json",...(token?{authorization:`Bearer ${token}`}:{})},body:JSON.stringify({message,systemPrompt:SYSTEM_PROMPT,messages:[{role:"user",content:message}]})});
  const raw=await res.text();
  let data:any=null;try{data=JSON.parse(raw);}catch{data=null;}
  if(!res.ok) throw new Error(data?.error||raw||"Council could not respond.");
  return data?.answer||data?.reply||data?.message||raw||"Council could not respond.";
}

export default function CouncilPage() {
  const [decision,setDecision]=useState("");
  const [output,setOutput]=useState("No council reasoning yet. Write a decision, problem, or situation and the council will help you think clearly.");
  const [loading,setLoading]=useState(false);

  async function analyze(example?:string) {
    const text=(example??decision).trim();
    if(!text||loading)return;
    if(example)setDecision(example);
    setLoading(true);setOutput("AI Council is thinking...");
    try{const answer=await fetchReply(text);setOutput(answer);}
    catch(e:any){setOutput(e?.message||"Council could not respond right now.");}
    finally{setLoading(false);}
  }

  return (
    <section style={{maxWidth:960,margin:"0 auto",padding:"40px 20px 80px",position:"relative",zIndex:1}}>
      <OsNav/>

      {/* Header */}
      <div className="env-panel" style={{"--env-color":C} as React.CSSProperties}>
        <div style={{display:"flex",flexWrap:"wrap",alignItems:"flex-start",justifyContent:"space-between",gap:16}}>
          <div style={{maxWidth:520}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:12}}>
              <span style={{width:5,height:5,borderRadius:"50%",background:C,boxShadow:`0 0 6px ${C}`,display:"inline-block",flexShrink:0}}/>
              <span style={{...mono,fontSize:9,color:C,letterSpacing:"0.14em",textTransform:"uppercase",opacity:0.75}}>Shynvo OS · AI Council Chamber</span>
            </div>
            <h1 style={{...sans,fontWeight:800,fontSize:"clamp(1.4rem,2.5vw,2rem)",color:"#fff",margin:"0 0 10px",letterSpacing:"-0.02em"}}>AI Council</h1>
            <p style={{...mono,fontSize:11,color:"rgba(255,255,255,0.48)",lineHeight:1.75}}>The reflection and decision chamber of Shynvo OS. Multi-perspective reasoning, emotional intelligence, and grounded next steps.</p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8,minWidth:180}}>
            {[{l:"Chamber",v:"AI Council"},{l:"Mode",v:"Reflection"},{l:"Status",v:"Online"},{l:"Layer",v:"Shynvo OS"}].map(x=>(
              <div key={x.l} style={{background:"rgba(168,85,247,0.04)",border:"1px solid rgba(168,85,247,0.12)",borderRadius:4,padding:"7px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{...mono,fontSize:9,color:"rgba(255,255,255,0.35)",letterSpacing:"0.1em",textTransform:"uppercase"}}>{x.l}</span>
                <span style={{...mono,fontSize:10,color:C}}>{x.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div style={{display:"grid",gap:14,marginTop:14}} className="lg:grid-cols-2">

        {/* Input */}
        <div className="env-panel" style={{"--env-color":C} as React.CSSProperties}>
          <div style={{...mono,fontSize:9,color:C,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:10,opacity:0.7}}>Council Input</div>
          <p style={{...mono,fontSize:11,color:"rgba(255,255,255,0.44)",lineHeight:1.7,marginBottom:12}}>Describe your decision, tension, or situation. The council will reason through it.</p>
          <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:14}}>
            {EXAMPLES.map(ex=>(
              <button key={ex} onClick={()=>analyze(ex)} disabled={loading}
                style={{...mono,fontSize:10,color:"rgba(255,255,255,0.6)",background:"rgba(0,0,0,0.25)",border:"1px solid rgba(168,85,247,0.15)",borderRadius:4,padding:"8px 12px",cursor:"pointer",textAlign:"left",lineHeight:1.5,transition:"border-color 0.15s",opacity:loading?0.5:1}}
                onMouseEnter={e=>(e.currentTarget.style.borderColor="rgba(168,85,247,0.4)")}
                onMouseLeave={e=>(e.currentTarget.style.borderColor="rgba(168,85,247,0.15)")}
              >{ex}</button>
            ))}
          </div>
          <textarea value={decision} onChange={e=>setDecision(e.target.value)}
            placeholder="Write your decision question or what you are going through..."
            style={{...mono,width:"100%",minHeight:120,background:"rgba(0,0,0,0.3)",border:"1px solid rgba(168,85,247,0.12)",borderRadius:4,padding:"10px 12px",fontSize:11,color:"rgba(255,255,255,0.85)",outline:"none",resize:"vertical",lineHeight:1.7,marginBottom:12}}
          />
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <button onClick={()=>analyze()} disabled={loading||!decision.trim()}
              style={{...mono,fontSize:10,fontWeight:700,color:"#020508",background:C,padding:"9px 16px",borderRadius:3,border:"none",cursor:"pointer",letterSpacing:"0.08em",textTransform:"uppercase",opacity:(loading||!decision.trim())?0.4:1,boxShadow:`0 0 14px rgba(168,85,247,0.3)`}}
            >{loading?"Thinking...":"Open Council Reasoning"}</button>
            <button onClick={()=>{setDecision("");setOutput("No council reasoning yet. Write a decision, problem, or situation and the council will help you think clearly.");}} disabled={loading}
              style={{...mono,fontSize:10,color:"rgba(255,255,255,0.5)",background:"transparent",border:"1px solid rgba(255,255,255,0.1)",padding:"9px 14px",borderRadius:3,cursor:"pointer",letterSpacing:"0.08em",textTransform:"uppercase"}}
            >Clear</button>
          </div>
        </div>

        {/* Output */}
        <div className="env-panel" style={{"--env-color":C} as React.CSSProperties}>
          <div style={{...mono,fontSize:9,color:C,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:10,opacity:0.7}}>Council Output</div>
          <div style={{...mono,fontSize:11,color:"rgba(255,255,255,0.72)",lineHeight:1.85,whiteSpace:"pre-wrap",minHeight:200,background:"rgba(0,0,0,0.2)",border:"1px solid rgba(168,85,247,0.1)",borderRadius:4,padding:"12px 14px"}}>
            {output}
          </div>
          <div style={{marginTop:12,display:"flex",flexDirection:"column",gap:6}}>
            {[{l:"Purpose",v:"Decisions, uncertainty, overwhelm, direction"},{l:"Style",v:"Balanced reasoning + grounded next step"},{l:"Tone",v:"Calm, wise, emotionally intelligent"}].map(x=>(
              <div key={x.l} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
                <span style={{...mono,fontSize:9,color:"rgba(255,255,255,0.3)",letterSpacing:"0.08em",textTransform:"uppercase"}}>{x.l}</span>
                <span style={{...mono,fontSize:9,color:"rgba(255,255,255,0.55)"}}>{x.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
