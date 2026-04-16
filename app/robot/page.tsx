"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useRouter } from "next/navigation";
import { renderAssistantHtml } from "@/lib/sh-assistant/render";

type MainChoice = "learn" | "build" | "train" | "explore";
type RouteTarget = "university" | "academy" | "frontier" | "arcade" | "experiments" | "enterprise" | "os";
type Msg = { role: "robot" | "user"; text: string };
type ChatThread = { id: string; title: string; messages: Msg[]; updatedAt: number };

const THREADS_KEY = "shynvo_robot_threads_v1";
const ACTIVE_KEY = "shynvo_robot_active_thread_v1";

function makeId() { return `${Date.now()}-${Math.random().toString(36).slice(2,9)}`; }
function buildTitle(messages: Msg[]) {
  const u = messages.find(m => m.role==="user")?.text?.trim();
  if (!u) return "New chat";
  return u.length > 42 ? u.slice(0,42)+"…" : u;
}

const CHOICES = [
  { key:"learn"   as MainChoice, title:"Learn",   desc:"University Hub or Shynvo Academy.",       glyph:"◈" },
  { key:"build"   as MainChoice, title:"Build",   desc:"Code, systems, and structured workflows.", glyph:"⬡" },
  { key:"train"   as MainChoice, title:"Train",   desc:"Challenges, drills, and progression.",     glyph:"⬢" },
  { key:"explore" as MainChoice, title:"Explore", desc:"Simulations, ideas, and experiments.",     glyph:"◎" },
];

const ENVS: Record<MainChoice, Array<{key:RouteTarget;title:string;desc:string;explanation:string;href:string;glyph:string}>> = {
  learn:[
    {key:"university",title:"University Hub",glyph:"◈",desc:"Structured higher learning by faculty.",explanation:"University Hub is your academic environment for structured higher learning. Best for serious study, faculty-based knowledge, and guided understanding.",href:"/university"},
    {key:"academy",title:"Shynvo Academy",glyph:"◇",desc:"Junior and senior school learning paths.",explanation:"Shynvo Academy is designed for junior and senior school learners. Focuses on subjects, guided explanations, and patient learning support.",href:"/academy"},
  ],
  build:[
    {key:"frontier",title:"Frontier Lab",glyph:"⬡",desc:"Code, logic, AI modes, technical systems.",explanation:"Frontier Lab is your engineering environment. Build with code, solve technical problems, and explore structured system thinking.",href:"/frontier"},
    {key:"enterprise",title:"Enterprise Suite",glyph:"▣",desc:"Company workflows and coordination.",explanation:"Enterprise Suite is for organizational building. Helps teams structure collaboration, missions, analytics, and coordinated work.",href:"/enterprise"},
    {key:"os",title:"Shynvo OS",glyph:"⬢",desc:"Personal systems, missions, execution.",explanation:"Shynvo OS is your execution cockpit. Best for focus, operations, workflows, and personal mission structure.",href:"/os"},
  ],
  train:[
    {key:"arcade",title:"Arcade Sim",glyph:"◉",desc:"Drills, game loops, challenge progression.",explanation:"Arcade Sim turns skill training into challenge mode. Best for drills, repeated practice, and competitive learning energy.",href:"/arcade"},
    {key:"frontier",title:"Frontier Lab",glyph:"⬡",desc:"Technical training, coding, reasoning.",explanation:"Frontier Lab works as a technical training ground. Stronger when your goal is coding, algorithms, or logic puzzles.",href:"/frontier"},
  ],
  explore:[
    {key:"experiments",title:"Experiments",glyph:"◎",desc:"Simulations, concepts, new AI worlds.",explanation:"Experiments is where new ideas and simulations live. Best for concept exploration and new system experiences.",href:"/experiments"},
    {key:"enterprise",title:"Enterprise Suite",glyph:"▣",desc:"Business coordination and team systems.",explanation:"Enterprise Suite is useful for exploring how structured work and business environments operate inside Shynvo.",href:"/enterprise"},
    {key:"os",title:"Shynvo OS",glyph:"⬢",desc:"Operational systems, execution flows.",explanation:"Shynvo OS lets you explore personal execution systems and organized workflows across missions.",href:"/os"},
  ],
};

const STATUS = ["Guiding across Shynvo environments","Ready to help you begin","Online · learning, building, training","Preparing your next path"];
const INIT: Msg[] = [
  {role:"robot",text:"Welcome to Shynvo Robot. I can guide you through learning, building, training, and exploration across the Shynvo environments."},
  {role:"robot",text:"What would you like to do first?"},
];

function Dots() {
  return (
    <span style={{display:"inline-flex",alignItems:"center",gap:3}}>
      {[0,1,2].map(i=>(
        <span key={i} style={{width:5,height:5,borderRadius:"50%",background:"#00e5ff",opacity:0.7,display:"inline-block",animation:`shb 1.1s ease-in-out ${i*0.15}s infinite`}}/>
      ))}
    </span>
  );
}

async function getRobotReply(input:string,history:Msg[],lang:string,img?:string):Promise<string> {
  const systemPrompt = `You are Shynvo Robot, the multilingual guide for the Shynvo platform. Answer naturally in the user's language. Prefer: ${lang}. Be professional, clear, warm, concise. Environments: University Hub, Shynvo Academy, Shynvo OS, Experiments, Enterprise Suite, Frontier Lab, Arcade Sim. Do not mention backend or API.`;
  const supabase = getSupabaseClient();
  const session = supabase ? await supabase.auth.getSession() : {data:{session:null}};
  const token = (session as any).data?.session?.access_token || "";
  const res = await fetch("/api/public/chat",{
    method:"POST",
    headers:{"content-type":"application/json",...(token?{authorization:`Bearer ${token}`}:{})},
    body:JSON.stringify({preferredLanguage:lang,message:input,systemPrompt,imageDataUrl:img,messages:history.map(m=>({role:m.role==="user"?"user":"assistant",content:m.text}))}),
  });
  const raw = await res.text();
  let data:any=null; try{data=JSON.parse(raw);}catch{data=null;}
  if(!res.ok) throw new Error(data?.error||raw||"No reply.");
  return data?.answer||data?.reply||data?.message||raw||"No reply.";
}

const C = "#00e5ff";
const G = "#00ff88";
const mono = {fontFamily:"var(--font-space-mono,monospace)"} as React.CSSProperties;
const sans = {fontFamily:"var(--font-syne,sans-serif)"} as React.CSSProperties;
const dim = "rgba(255,255,255,0.5)";
const faint = "rgba(255,255,255,0.22)";
const bdim = "rgba(255,255,255,0.06)";
const bg2 = "#060c14";
const bg3 = "#0a1220";

function Panel({children,style}:{children:React.ReactNode;style?:React.CSSProperties}) {
  return (
    <div style={{background:bg2,border:"1px solid rgba(0,229,255,0.14)",borderRadius:4,position:"relative",overflow:"hidden",...style}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(0,229,255,0.5),transparent)",pointerEvents:"none"}}/>
      {[[{top:4,left:4},{borderTop:"1px solid rgba(0,229,255,0.5)",borderLeft:"1px solid rgba(0,229,255,0.5)"}],[{top:4,right:4},{borderTop:"1px solid rgba(0,229,255,0.5)",borderRight:"1px solid rgba(0,229,255,0.5)"}],[{bottom:4,left:4},{borderBottom:"1px solid rgba(0,229,255,0.5)",borderLeft:"1px solid rgba(0,229,255,0.5)"}],[{bottom:4,right:4},{borderBottom:"1px solid rgba(0,229,255,0.5)",borderRight:"1px solid rgba(0,229,255,0.5)"}]].map(([p,b],i)=>(
        <div key={i} aria-hidden style={{position:"absolute",width:10,height:10,opacity:0.55,...p as any,...b as any}}/>
      ))}
      {children}
    </div>
  );
}

export default function RobotPage() {
  const router = useRouter();
  const {t,language} = useLanguage();
  const listRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const switching = useRef(false);

  const [threads,setThreads] = useState<ChatThread[]>([]);
  const [activeId,setActiveId] = useState("");
  const [messages,setMessages] = useState<Msg[]>(INIT);
  const [selMain,setSelMain] = useState<MainChoice|null>(null);
  const [selTarget,setSelTarget] = useState<RouteTarget|null>(null);
  const [statusIdx,setStatusIdx] = useState(0);
  const [thinking,setThinking] = useState(false);
  const [input,setInput] = useState("");
  const [imgFile,setImgFile] = useState<File|null>(null);
  const [imgPreview,setImgPreview] = useState("");
  const [imgData,setImgData] = useState("");
  const [imgNote,setImgNote] = useState("");
  const [sideOpen,setSideOpen] = useState(false);
  const [tick,setTick] = useState(0);

  const opts = useMemo(()=>selMain?ENVS[selMain]:[],[selMain]);

  useEffect(()=>{const id=setInterval(()=>setTick(p=>p+1),60);return()=>clearInterval(id);},[]);
  useEffect(()=>{
    try{
      const saved=JSON.parse(localStorage.getItem(THREADS_KEY)||"[]");
      const act=localStorage.getItem(ACTIVE_KEY)||"";
      if(Array.isArray(saved)&&saved.length>0){
        setThreads(saved);
        const a=saved.find((t:ChatThread)=>t.id===act)?.id||saved[0].id;
        setActiveId(a);
        const th=saved.find((t:ChatThread)=>t.id===a);
        if(th?.messages?.length) setMessages(th.messages);
      } else {
        const s={id:makeId(),title:"New chat",messages:INIT,updatedAt:Date.now()};
        setThreads([s]);setActiveId(s.id);
      }
    }catch{
      const s={id:makeId(),title:"New chat",messages:INIT,updatedAt:Date.now()};
      setThreads([s]);setActiveId(s.id);
    }
  },[]);
  useEffect(()=>{const id=setInterval(()=>setStatusIdx(p=>(p+1)%STATUS.length),2600);return()=>clearInterval(id);},[]);
  useEffect(()=>{const el=listRef.current;if(!el)return;el.scrollTo({top:el.scrollHeight,behavior:"smooth"});},[messages,thinking]);
  useEffect(()=>()=>{if(imgPreview)URL.revokeObjectURL(imgPreview);},[imgPreview]);
  useEffect(()=>{
    if(!activeId)return;
    if(switching.current){switching.current=false;return;}
    setThreads(prev=>{
      const exists=prev.some(t=>t.id===activeId);
      const next=exists
        ?prev.map(t=>t.id===activeId?{...t,messages,title:buildTitle(messages),updatedAt:Date.now()}:t)
        :[{id:activeId,title:buildTitle(messages),messages,updatedAt:Date.now()},...prev];
      localStorage.setItem(THREADS_KEY,JSON.stringify(next));
      localStorage.setItem(ACTIVE_KEY,activeId);
      return next;
    });
  },[messages,activeId]);

  function newChat(){
    switching.current=true;
    const s={id:makeId(),title:"New chat",messages:INIT,updatedAt:Date.now()};
    const next=[s,...threads];
    setThreads(next);setActiveId(s.id);setMessages(INIT);
    setSelMain(null);setSelTarget(null);setInput("");clearImg();
    localStorage.setItem(THREADS_KEY,JSON.stringify(next));
    localStorage.setItem(ACTIVE_KEY,s.id);
  }

  function openThread(id:string){
    const t=threads.find(t=>t.id===id);if(!t)return;
    switching.current=true;
    setActiveId(id);setMessages(t.messages?.length?t.messages:INIT);
    setSelMain(null);setSelTarget(null);setInput("");clearImg();
    localStorage.setItem(ACTIVE_KEY,id);setSideOpen(false);
  }

  function delThread(id:string){
    const rem=threads.filter(t=>t.id!==id);
    if(rem.length===0){
      const s={id:makeId(),title:"New chat",messages:INIT,updatedAt:Date.now()};
      setThreads([s]);setActiveId(s.id);setMessages(INIT);
      localStorage.setItem(THREADS_KEY,JSON.stringify([s]));localStorage.setItem(ACTIVE_KEY,s.id);return;
    }
    setThreads(rem);
    if(activeId===id){
      switching.current=true;
      setActiveId(rem[0].id);setMessages(rem[0].messages?.length?rem[0].messages:INIT);
      localStorage.setItem(ACTIVE_KEY,rem[0].id);
    }
    localStorage.setItem(THREADS_KEY,JSON.stringify(rem));
  }

  function clearImg(){
    if(imgPreview)URL.revokeObjectURL(imgPreview);
    setImgFile(null);setImgPreview("");setImgData("");setImgNote("");
    if(fileRef.current)fileRef.current.value="";
  }

  function onImg(e:React.ChangeEvent<HTMLInputElement>){
    const f=e.target.files?.[0];if(!f)return;
    if(!["image/jpeg","image/png","image/webp"].includes(f.type)){clearImg();setImgNote("JPG, PNG or WEBP only.");return;}
    if(f.size>5*1024*1024){clearImg();setImgNote("Max 5 MB.");return;}
    if(imgPreview)URL.revokeObjectURL(imgPreview);
    setImgFile(f);setImgPreview(URL.createObjectURL(f));
    const r=new FileReader();
    r.onload=()=>{setImgData(typeof r.result==="string"?r.result:"");setImgNote("Photo attached.");};
    r.onerror=()=>{clearImg();setImgNote("Could not read image.");};
    r.readAsDataURL(f);
  }

  function push(next:Msg[]){
    setThinking(true);
    setTimeout(()=>{setMessages(p=>[...p,...next]);setThinking(false);},380);
  }

  function chooseMain(c:MainChoice){
    const item=CHOICES.find(x=>x.key===c);if(!item)return;
    setSelMain(c);setSelTarget(null);
    push([{role:"user",text:item.title},{role:"robot",text:`Understood. Guiding you to a ${c} environment.`},{role:"robot",text:"Select an environment below. I will explain it before you enter."}]);
  }

  function chooseTarget(t:RouteTarget){
    const item=opts.find(x=>x.key===t);if(!item)return;
    setSelTarget(t);
    push([{role:"user",text:item.title},{role:"robot",text:item.explanation},{role:"robot",text:"Enter now or compare another option."}]);
  }

  function enter(){
    if(!selTarget)return;
    const item=opts.find(x=>x.key===selTarget);if(!item)return;
    push([{role:"robot",text:`Opening ${item.title}. Stand by.`}]);
    setTimeout(()=>router.push(item.href),650);
  }

  function restart(){setSelMain(null);setSelTarget(null);setThinking(false);setInput("");clearImg();setMessages([...INIT]);}

  async function send(){
    const text=input.trim();if(thinking)return;
    if(!text){if(imgFile)setImgNote("Add a description with your photo.");return;}
    const hist=[...messages,{role:"user" as const,text}];
    setMessages(hist);setInput("");setThinking(true);
    try{
      const reply=await getRobotReply(text,hist,language,imgData);
      setMessages(p=>[...p,{role:"robot",text:reply}]);
      if(imgFile)clearImg();
    }catch(e){
      setMessages(p=>[...p,{role:"robot",text:`Could not respond. ${e instanceof Error?e.message:"Try again."}`}]);
    }finally{setThinking(false);}
  }

  const scanY=(tick*2)%100;

  return(
    <>
      <style>{`
        @keyframes shb{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-4px)}}
        @keyframes shp{0%,100%{opacity:1;box-shadow:0 0 8px #00ff88,0 0 16px rgba(0,255,136,.4)}50%{opacity:.6;box-shadow:0 0 4px #00ff88}}
        @keyframes shbl{0%,100%{opacity:.6}50%{opacity:.2}}
        .shs::-webkit-scrollbar{width:4px}.shs::-webkit-scrollbar-track{background:transparent}.shs::-webkit-scrollbar-thumb{background:rgba(0,229,255,.2);border-radius:2px}
        .shc{background:#0a1220;border:1px solid rgba(255,255,255,.06);border-radius:4px;padding:14px 16px;cursor:pointer;text-align:left;width:100%;transition:border-color .15s,background .15s}
        .shc:hover{border-color:rgba(0,229,255,.35);background:rgba(0,229,255,.05)}
        .sht{border:1px solid rgba(255,255,255,.06);border-radius:4px;padding:10px 12px;transition:border-color .15s,background .15s}
        .sht:hover{border-color:rgba(0,229,255,.25);background:rgba(0,229,255,.03)}
        .sht.act{border-color:rgba(0,229,255,.4);background:rgba(0,229,255,.06)}
        .shi{background:#0a1220;border:1px solid rgba(255,255,255,.06);border-radius:4px;color:rgba(255,255,255,.92);font-family:var(--font-space-mono,monospace);font-size:13px;padding:12px 14px;outline:none;width:100%;transition:border-color .15s}
        .shi:focus{border-color:rgba(0,229,255,.4)}.shi::placeholder{color:rgba(255,255,255,.22)}
        .ah a{color:#00e5ff;text-decoration:underline}.ah code{font-family:var(--font-space-mono,monospace);background:rgba(0,229,255,.08);padding:1px 5px;border-radius:2px;font-size:12px}
        .ah ul{padding-left:1.2em;margin:6px 0}.ah li{margin:3px 0}.ah strong{color:#00e5ff;font-weight:600}
        .shov{position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:99;opacity:0;pointer-events:none;transition:opacity .2s}
        .shov.on{opacity:1;pointer-events:all}
        .shsb{position:fixed;top:0;left:0;bottom:0;width:272px;background:#040810;border-right:1px solid rgba(0,229,255,.14);z-index:100;transform:translateX(-100%);transition:transform .22s ease;padding:24px 16px;overflow-y:auto}
        .shsb.on{transform:translateX(0)}
        @media(min-width:1280px){.shsb{position:static;transform:none!important;width:auto;border-right:none;padding:0;background:transparent}}
        .shgrid{display:grid;gap:16px;grid-template-columns:1fr}
        @media(min-width:1280px){.shgrid{grid-template-columns:240px minmax(300px,.8fr) 1fr}}
        .shdsk{display:none}@media(min-width:1280px){.shdsk{display:block}}
        .shmob{display:block}@media(min-width:1280px){.shmob{display:none}}
      `}</style>

      <div style={{background:"#040810",minHeight:"100dvh",color:"rgba(255,255,255,.92)",...sans}}>
        <div aria-hidden style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,background:"radial-gradient(ellipse 70% 45% at 15% 8%,rgba(0,229,255,.07) 0%,transparent 60%),radial-gradient(ellipse 60% 40% at 85% 5%,rgba(0,255,136,.05) 0%,transparent 55%),radial-gradient(ellipse 80% 50% at 50% 110%,rgba(168,85,247,.06) 0%,transparent 55%)"}}/>
        <div aria-hidden style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,opacity:.025,backgroundImage:"linear-gradient(rgba(0,229,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,1) 1px,transparent 1px)",backgroundSize:"48px 48px"}}/>

        <div className={`shov ${sideOpen?"on":""}`} onClick={()=>setSideOpen(false)} aria-hidden/>

        <div className={`shsb ${sideOpen?"on":""}`}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
            <span style={{...mono,fontSize:10,color:C,letterSpacing:"0.12em",textTransform:"uppercase"as const}}>Sessions</span>
            <button onClick={()=>setSideOpen(false)} style={{...mono,fontSize:11,color:dim,background:"transparent",border:"1px solid rgba(255,255,255,.06)",borderRadius:3,padding:"6px 10px",cursor:"pointer"}}>✕</button>
          </div>
          <div style={{display:"flex",flexDirection:"column"as const,gap:6}}>
            {threads.slice().sort((a,b)=>b.updatedAt-a.updatedAt).map(th=>(
              <div key={th.id} className={`sht ${activeId===th.id?"act":""}`}>
                <button type="button" onClick={()=>openThread(th.id)} style={{width:"100%",textAlign:"left"as const,background:"none",border:"none",cursor:"pointer",padding:0}}>
                  <div style={{...mono,fontSize:12,color:"rgba(255,255,255,.85)",whiteSpace:"nowrap"as const,overflow:"hidden",textOverflow:"ellipsis"}}>{th.title||"New chat"}</div>
                  <div style={{...mono,fontSize:10,color:faint,marginTop:3}}>{new Date(th.updatedAt).toLocaleDateString()}</div>
                </button>
                <button type="button" onClick={()=>delThread(th.id)} style={{marginTop:8,...mono,fontSize:10,color:faint,background:"none",border:"none",cursor:"pointer",padding:0,textTransform:"uppercase"as const,letterSpacing:"0.08em"}}>Delete</button>
              </div>
            ))}
          </div>
        </div>

        <div style={{position:"relative",zIndex:10,maxWidth:1600,margin:"0 auto",padding:"32px 24px"}}>

          <nav style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"as const}}>
            <Link href="/" style={{...mono,fontSize:11,color:dim,background:"transparent",border:"1px solid rgba(255,255,255,.06)",borderRadius:3,padding:"8px 14px",textDecoration:"none",letterSpacing:"0.08em",textTransform:"uppercase"as const}}>← Home</Link>
            <div style={{...mono,fontSize:10,color:C,opacity:1,border:"1px solid rgba(0,229,255,.2)",padding:"7px 12px",borderRadius:3,letterSpacing:"0.12em",textTransform:"uppercase"as const}}>SH-ROBOT · GUIDE SYSTEM</div>
            <div style={{marginLeft:"auto",...mono,fontSize:10,color:C,opacity:.45,letterSpacing:"0.1em"}}>{new Date().toISOString().slice(11,19)} UTC</div>
            <button className="shmob" onClick={()=>setSideOpen(true)} style={{...mono,fontSize:11,color:dim,background:"none",border:"1px solid rgba(255,255,255,.06)",borderRadius:3,padding:"8px 14px",cursor:"pointer",letterSpacing:"0.08em"}}>≡ CHATS</button>
          </nav>

          <header style={{marginTop:32,display:"flex",flexWrap:"wrap"as const,alignItems:"flex-end",justifyContent:"space-between",gap:16}}>
            <div>
              <div style={{...mono,fontSize:10,color:C,opacity:.65,letterSpacing:"0.12em",textTransform:"uppercase"as const}}>Platform Guide · Intelligent Navigation</div>
              <h1 style={{...sans,fontWeight:800,fontSize:"clamp(2rem,5vw,3.5rem)",letterSpacing:"-0.02em",lineHeight:1.05,color:"#fff",margin:"8px 0 0"}}>
                Shynvo <span style={{color:C}}>Robot</span>
              </h1>
              <p style={{...mono,marginTop:8,fontSize:13,color:dim,maxWidth:420}}>Intelligent guide · multi-environment · multilingual</p>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8,...mono,fontSize:11,color:G,border:"1px solid rgba(0,255,136,.2)",padding:"8px 14px",borderRadius:3,letterSpacing:"0.1em"}}>
              <span style={{width:6,height:6,borderRadius:"50%",background:G,boxShadow:`0 0 8px ${G}`,animation:"shp 2s ease-in-out infinite",display:"inline-block"}}/>
              GUIDE READY
            </div>
          </header>

          <div className="shgrid" style={{marginTop:32}}>

            <Panel className="shdsk" style={{padding:16}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
                <div style={{...mono,fontSize:10,color:C,opacity:.65,letterSpacing:"0.12em",textTransform:"uppercase"as const}}>Sessions</div>
                <button onClick={newChat} style={{...mono,fontSize:10,color:C,background:"transparent",border:"1px solid rgba(0,229,255,.25)",borderRadius:3,padding:"5px 10px",cursor:"pointer",letterSpacing:"0.08em"}}>+ NEW</button>
              </div>
              <div style={{...mono,fontSize:10,color:faint,marginBottom:14}}>Stored on device</div>
              <div className="shs" style={{display:"flex",flexDirection:"column"as const,gap:6,maxHeight:"calc(70vh - 100px)",overflowY:"auto"as const}}>
                {threads.slice().sort((a,b)=>b.updatedAt-a.updatedAt).map(th=>(
                  <div key={th.id} className={`sht ${activeId===th.id?"act":""}`}>
                    <button type="button" onClick={()=>openThread(th.id)} style={{width:"100%",textAlign:"left"as const,background:"none",border:"none",cursor:"pointer",padding:0}}>
                      <div style={{...mono,fontSize:12,color:"rgba(255,255,255,.85)",whiteSpace:"nowrap"as const,overflow:"hidden",textOverflow:"ellipsis"}}>{th.title||"New chat"}</div>
                      <div style={{...mono,fontSize:10,color:faint,marginTop:3}}>{new Date(th.updatedAt).toLocaleDateString()}</div>
                    </button>
                    <button type="button" onClick={()=>delThread(th.id)} style={{marginTop:8,...mono,fontSize:10,color:faint,background:"none",border:"none",cursor:"pointer",padding:0,textTransform:"uppercase"as const,letterSpacing:"0.08em"}}>Delete</button>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel style={{padding:20,display:"flex",flexDirection:"column"as const,gap:14}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div style={{...mono,fontSize:10,color:C,opacity:.65,letterSpacing:"0.12em",textTransform:"uppercase"as const}}>Robot Presence</div>
                <div style={{display:"flex",alignItems:"center",gap:6,...mono,fontSize:10,color:G,border:"1px solid rgba(0,255,136,.2)",padding:"5px 10px",borderRadius:3,letterSpacing:"0.1em"}}>
                  <span style={{width:5,height:5,borderRadius:"50%",background:G,boxShadow:`0 0 6px ${G}`,animation:"shp 2s ease-in-out infinite",display:"inline-block"}}/>ONLINE
                </div>
              </div>
              <div style={{position:"relative",background:"#000",borderRadius:4,overflow:"hidden"}}>
                <div aria-hidden style={{position:"absolute",top:`${scanY}%`,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,rgba(0,229,255,.3),transparent)",pointerEvents:"none",zIndex:5}}/>
                <video src="/robot.mp4" autoPlay muted loop playsInline preload="auto" style={{width:"100%",maxHeight:320,objectFit:"cover",display:"block"}}/>
                <div aria-hidden style={{position:"absolute",inset:0,background:"radial-gradient(circle at 50% 50%,rgba(0,229,255,.1) 0%,transparent 65%)",pointerEvents:"none"}}/>
                {[{top:8,left:8,borderTop:"1px solid rgba(0,229,255,.7)",borderLeft:"1px solid rgba(0,229,255,.7)"},{top:8,right:8,borderTop:"1px solid rgba(0,229,255,.7)",borderRight:"1px solid rgba(0,229,255,.7)"},{bottom:8,left:8,borderBottom:"1px solid rgba(0,229,255,.7)",borderLeft:"1px solid rgba(0,229,255,.7)"},{bottom:8,right:8,borderBottom:"1px solid rgba(0,229,255,.7)",borderRight:"1px solid rgba(0,229,255,.7)"}].map((s,i)=>(
                  <div key={i} aria-hidden style={{position:"absolute",width:14,height:14,...s as any}}/>
                ))}
                <div style={{position:"absolute",bottom:8,left:10,...mono,fontSize:9,color:C,opacity:.55,letterSpacing:"0.12em"}}>SH-ROBOT · UNIT-01 · ACTIVE</div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {[{l:"Mode",v:"Guide"},{l:"Lang",v:(language||"en").toUpperCase()},{l:"Signal",v:"Strong"},{l:"State",v:"Online"}].map(x=>(
                  <div key={x.l} style={{background:bg3,border:`1px solid ${bdim}`,borderRadius:3,padding:"8px 12px"}}>
                    <div style={{...mono,fontSize:9,color:faint,letterSpacing:"0.12em",textTransform:"uppercase"as const,marginBottom:3}}>{x.l}</div>
                    <div style={{...mono,fontSize:12,color:C}}>{x.v}</div>
                  </div>
                ))}
              </div>
              <div style={{background:"rgba(0,229,255,.04)",border:"1px solid rgba(0,229,255,.15)",borderRadius:3,padding:"12px 14px"}}>
                <div style={{...mono,fontSize:9,color:C,letterSpacing:"0.12em",textTransform:"uppercase"as const,marginBottom:6}}>Capabilities</div>
                <div style={{...mono,fontSize:12,color:dim,lineHeight:1.7}}>Environment guidance · Platform navigation · Multi-language · Image analysis</div>
              </div>
              <div style={{...mono,fontSize:11,color:dim,borderTop:`1px solid ${bdim}`,paddingTop:10}}>
                <span style={{color:C,animation:"shbl 2s ease-in-out infinite"}}>▶</span> {STATUS[statusIdx]}
              </div>
            </Panel>

            <Panel style={{display:"flex",flexDirection:"column"as const,minHeight:"75dvh"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 18px",borderBottom:`1px solid ${bdim}`}}>
                <div>
                  <div style={{...mono,fontSize:10,color:C,opacity:.65,letterSpacing:"0.12em",textTransform:"uppercase"as const}}>Robot Channel</div>
                  <div style={{...mono,fontSize:10,color:faint,marginTop:3}}>Navigation · Guidance · Assistance</div>
                </div>
                <button onClick={restart} style={{...mono,fontSize:11,color:dim,background:"transparent",border:`1px solid ${bdim}`,borderRadius:3,padding:"9px 14px",cursor:"pointer",letterSpacing:"0.08em",textTransform:"uppercase"as const}}>↺ RESET</button>
              </div>

              <div ref={listRef} className="shs" style={{flex:1,overflowY:"auto"as const,padding:"14px 18px",display:"flex",flexDirection:"column"as const,gap:10,minHeight:0,height:"42dvh"}}>
                {messages.map((msg,i)=>(
                  <div key={i} style={msg.role==="user"?{background:"rgba(0,229,255,.07)",border:"1px solid rgba(0,229,255,.2)",borderRadius:"6px 2px 2px 6px",padding:"11px 14px",fontSize:13,lineHeight:1.65,color:"rgba(255,255,255,.92)",maxWidth:"88%",marginLeft:"auto",...mono}:{background:bg3,border:`1px solid ${bdim}`,borderLeft:"2px solid rgba(0,229,255,.3)",borderRadius:"2px 6px 6px 2px",padding:"11px 14px",fontSize:13.5,lineHeight:1.65,color:"rgba(255,255,255,.85)",maxWidth:"88%"}}>
                    {msg.role==="robot"&&<div style={{...mono,fontSize:9,color:C,opacity:.6,marginBottom:5,letterSpacing:"0.1em"}}>SH-ROBOT</div>}
                    {msg.role==="user"
                      ?<div style={{whiteSpace:"pre-wrap"}}>{msg.text}</div>
                      :<div className="ah" dangerouslySetInnerHTML={{__html:renderAssistantHtml(msg.text)}}/>
                    }
                  </div>
                ))}
                {thinking&&(
                  <div style={{background:bg3,border:`1px solid ${bdim}`,borderLeft:"2px solid rgba(0,229,255,.3)",borderRadius:"2px 6px 6px 2px",padding:"11px 14px",maxWidth:"88%"}}>
                    <div style={{...mono,fontSize:9,color:C,opacity:.6,marginBottom:5}}>SH-ROBOT · PROCESSING</div>
                    <Dots/>
                  </div>
                )}
              </div>

              <div style={{borderTop:`1px solid ${bdim}`,padding:"12px 18px",display:"flex",flexDirection:"column"as const,gap:8}}>
                {imgPreview&&(
                  <div style={{background:bg3,border:`1px solid ${bdim}`,borderRadius:3,padding:10}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                      <span style={{...mono,fontSize:10,color:dim}}>ATTACHED · {imgFile?.name}</span>
                      <button onClick={clearImg} style={{...mono,fontSize:10,color:dim,background:"transparent",border:`1px solid ${bdim}`,borderRadius:3,padding:"4px 8px",cursor:"pointer"}}>REMOVE</button>
                    </div>
                    <img src={imgPreview} alt="preview" style={{maxHeight:140,width:"100%",objectFit:"contain",borderRadius:2}}/>
                  </div>
                )}
                {imgNote&&<div style={{...mono,fontSize:11,color:C,background:"rgba(0,229,255,.05)",border:"1px solid rgba(0,229,255,.15)",borderRadius:3,padding:"7px 12px"}}>{imgNote}</div>}
                <div style={{display:"flex",gap:8}}>
                  <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={onImg} style={{display:"none"}}/>
                  <button onClick={()=>fileRef.current?.click()} style={{...mono,fontSize:16,color:dim,background:"transparent",border:`1px solid ${bdim}`,borderRadius:3,padding:"0 12px",minWidth:42,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>⊕</button>
                  <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder={t("robot.ask")||"Ask the Robot…"} className="shi" style={{flex:1}}/>
                  <button onClick={send} disabled={thinking||!input.trim()} style={{background:C,color:"#040810",...mono,fontSize:12,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase"as const,padding:"0 18px",borderRadius:3,border:"none",cursor:"pointer",whiteSpace:"nowrap"as const,opacity:(thinking||!input.trim())?.3:1}}>SEND</button>
                </div>
              </div>

              <div style={{padding:"0 18px 18px"}}>
                {!selMain&&(
                  <>
                    <div style={{...mono,fontSize:9,color:faint,letterSpacing:"0.12em",textTransform:"uppercase"as const,marginBottom:10}}>— Select Direction —</div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                      {CHOICES.map(c=>(
                        <button key={c.key} type="button" className="shc" onClick={()=>chooseMain(c.key)}>
                          <div style={{fontSize:20,color:C,marginBottom:6,opacity:.7}}>{c.glyph}</div>
                          <div style={{...sans,fontSize:14,fontWeight:600,color:"#fff",marginBottom:4}}>{c.title}</div>
                          <div style={{...mono,fontSize:11,color:dim,lineHeight:1.5}}>{c.desc}</div>
                        </button>
                      ))}
                    </div>
                  </>
                )}
                {selMain&&!selTarget&&(
                  <>
                    <div style={{...mono,fontSize:9,color:faint,letterSpacing:"0.12em",textTransform:"uppercase"as const,marginBottom:10}}>— Select Environment —</div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                      {opts.map(item=>(
                        <button key={item.key} type="button" className="shc" onClick={()=>chooseTarget(item.key)}>
                          <div style={{fontSize:20,color:C,marginBottom:6,opacity:.7}}>{item.glyph}</div>
                          <div style={{...sans,fontSize:14,fontWeight:600,color:"#fff",marginBottom:4}}>{item.title}</div>
                          <div style={{...mono,fontSize:11,color:dim,lineHeight:1.5}}>{item.desc}</div>
                        </button>
                      ))}
                    </div>
                    <button onClick={restart} style={{marginTop:10,width:"100%",...mono,fontSize:11,color:dim,background:"transparent",border:`1px solid ${bdim}`,borderRadius:3,padding:"9px 14px",cursor:"pointer",letterSpacing:"0.08em",textTransform:"uppercase"as const}}>← Change Direction</button>
                  </>
                )}
                {selMain&&selTarget&&(
                  <div style={{display:"flex",flexWrap:"wrap"as const,gap:8}}>
                    <button onClick={enter} style={{background:C,color:"#040810",...mono,fontSize:12,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase"as const,padding:"11px 20px",borderRadius:3,border:"none",cursor:"pointer"}}>ENTER ENVIRONMENT →</button>
                    <button onClick={()=>{setSelTarget(null);push([{role:"robot",text:"Choose another environment to compare."}]);}} style={{...mono,fontSize:11,color:dim,background:"transparent",border:`1px solid ${bdim}`,borderRadius:3,padding:"9px 14px",cursor:"pointer",letterSpacing:"0.08em",textTransform:"uppercase"as const}}>COMPARE</button>
                    <button onClick={restart} style={{...mono,fontSize:11,color:C,background:"transparent",border:"1px solid rgba(0,229,255,.25)",borderRadius:3,padding:"9px 14px",cursor:"pointer",letterSpacing:"0.08em",textTransform:"uppercase"as const}}>RESTART</button>
                  </div>
                )}
              </div>
            </Panel>
          </div>

          <footer style={{marginTop:20,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap"as const,gap:8}}>
            <div style={{...mono,fontSize:10,color:C,opacity:.4,letterSpacing:"0.1em"}}>SHYNVO · ROBOT SYSTEM · V2.0</div>
            <div style={{...mono,fontSize:10,color:faint,letterSpacing:"0.08em"}}>{STATUS[statusIdx]}</div>
          </footer>
        </div>
      </div>
    </>
  );
}
