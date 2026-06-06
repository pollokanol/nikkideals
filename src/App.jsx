import { useState, useEffect, useRef } from "react";

const DEALS = [
  { id:1,  title:"Sony WH-1000XM5",   sub:"Noise Cancelling Headphones", cat:"Electronics", img:"https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop&q=80", was:349,  now:199, store:"Amazon",          storeLogo:"🛒", pct:43, timer:null,          badge:"HOT DEAL",   badgeColor:"#E8174A", accentColor:"#7B61FF", bg:"linear-gradient(135deg,#EEF0FF,#E4E1FF)", code:"SONY43NOW",  url:"https://amazon.com" },
  { id:2,  title:"Stanley Quencher",  sub:"H2.0 40oz Tumbler",           cat:"Home",        img:"https://images.unsplash.com/photo-1635348729200-8b0f2bb00f31?w=400&h=400&fit=crop&q=80", was:40,   now:19,  store:"Target",          storeLogo:"🎯", pct:52, timer:"02:18:45",    badge:"FLASH DEAL", badgeColor:"#16A34A", accentColor:"#16A34A", bg:"linear-gradient(135deg,#F0FDF4,#DCFCE7)", code:"TARGET52",   url:"https://target.com" },
  { id:3,  title:"Ninja Air Fryer",   sub:"4QT Compact",                  cat:"Home",        img:"https://images.unsplash.com/photo-1648845218893-11a9b5c72c3c?w=400&h=400&fit=crop&q=80", was:119,  now:59,  store:"Amazon",          storeLogo:"🛒", pct:50, timer:null,          badge:"TRENDING",   badgeColor:"#EA580C", accentColor:"#EA580C", bg:"linear-gradient(135deg,#FFF7ED,#FFEDD5)", code:"NINJA50OFF", url:"https://amazon.com" },
  { id:4,  title:"Beats Studio Pro",  sub:"Wireless Headphones",          cat:"Electronics", img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&q=80", was:349,  now:179, store:"Best Buy",        storeLogo:"💛", pct:49, timer:null,          badge:"50% OFF",    badgeColor:"#2563EB", accentColor:"#2563EB", bg:"linear-gradient(135deg,#EFF6FF,#DBEAFE)", code:"BEATS49BB",  url:"https://bestbuy.com" },
  { id:5,  title:"iPad 10th Gen",     sub:"64GB Wi-Fi, Blue",             cat:"Electronics", img:"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop&q=80", was:449,  now:329, store:"Best Buy",        storeLogo:"💛", pct:27, timer:"05:44:20",    badge:"FLASH DEAL", badgeColor:"#16A34A", accentColor:"#7B61FF", bg:"linear-gradient(135deg,#F5F3FF,#EDE9FE)", code:"IPAD27SAVE", url:"https://bestbuy.com" },
  { id:6,  title:"Nike Air Max 270",  sub:"Men's Running Shoes",          cat:"Fashion",     img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&q=80", was:150,  now:74,  store:"Nike",            storeLogo:"✔️", pct:51, timer:null,          badge:"HOT DEAL",   badgeColor:"#E8174A", accentColor:"#E8174A", bg:"linear-gradient(135deg,#FFF1F2,#FFE4E6)", code:"NIKE51RUN",  url:"https://nike.com" },
  { id:7,  title:"Dyson V11 Vacuum",  sub:"Cordless, 60-min runtime",     cat:"Home",        img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&q=80", was:599,  now:369, store:"Dyson",           storeLogo:"🌀", pct:38, timer:"01:30:00",    badge:"FLASH DEAL", badgeColor:"#16A34A", accentColor:"#16A34A", bg:"linear-gradient(135deg,#F0FDF4,#DCFCE7)", code:"DYSON38V11", url:"https://dyson.com" },
  { id:8,  title:"MacBook Air M2",    sub:'13" Midnight',                  cat:"Electronics", img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop&q=80", was:1099, now:849, store:"Apple",           storeLogo:"🍎", pct:23, timer:null,          badge:"TRENDING",   badgeColor:"#EA580C", accentColor:"#EA580C", bg:"linear-gradient(135deg,#FFF7ED,#FFEDD5)", code:"MAC23DEAL",  url:"https://apple.com" },
  { id:9,  title:"Levi's 501 Jeans",  sub:"Original Straight Fit",        cat:"Fashion",     img:"https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&q=80", was:89,   now:39,  store:"Levi's",          storeLogo:"👖", pct:56, timer:null,          badge:"50% OFF",    badgeColor:"#2563EB", accentColor:"#2563EB", bg:"linear-gradient(135deg,#EFF6FF,#DBEAFE)", code:"LEVI56OFF",  url:"https://levi.com" },
  { id:10, title:"Kindle Paperwhite", sub:"16GB, Waterproof",             cat:"Electronics", img:"https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop&q=80", was:139,  now:84,  store:"Amazon",          storeLogo:"🛒", pct:40, timer:"03:20:00",    badge:"FLASH DEAL", badgeColor:"#16A34A", accentColor:"#16A34A", bg:"linear-gradient(135deg,#F0FDF4,#DCFCE7)", code:"KINDLE40",   url:"https://amazon.com" },
  { id:11, title:"Instant Pot Duo",   sub:"7-in-1 Electric Cooker",       cat:"Home",        img:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&q=80", was:99,   now:49,  store:"Walmart",         storeLogo:"⭐", pct:50, timer:null,          badge:"HOT DEAL",   badgeColor:"#E8174A", accentColor:"#E8174A", bg:"linear-gradient(135deg,#FFF0F0,#FFE4E4)", code:"INSTANT50",  url:"https://walmart.com" },
  { id:12, title:"Adidas Ultraboost", sub:"Running Shoe, Core Black",     cat:"Fashion",     img:"https://images.unsplash.com/photo-1608231387042-66d1773d3028?w=400&h=400&fit=crop&q=80", was:190,  now:109, store:"Adidas",          storeLogo:"🏃", pct:43, timer:null,          badge:"TRENDING",   badgeColor:"#EA580C", accentColor:"#EA580C", bg:"linear-gradient(135deg,#FFF7ED,#FFEDD5)", code:"ULTRA43",    url:"https://adidas.com" },
];

const CATS = [
  { id:"All",         label:"All",         icon:"🏠" },
  { id:"Electronics", label:"Electronics", icon:"⚡" },
  { id:"Fashion",     label:"Fashion",     icon:"👗" },
  { id:"Home",        label:"Home",        icon:"🏡" },
];

const uid = () => Math.random().toString(36).slice(2,9);
const fp  = p => `$${p}`;

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; -webkit-tap-highlight-color:transparent; }
  html, body { background:#0A0A0A; overscroll-behavior:none; font-family:'Inter',sans-serif; }
  ::-webkit-scrollbar { display:none; }
  input,select,button { -webkit-appearance:none; font-family:inherit; }
  input:focus { outline:none; }

  @keyframes fadeUp  { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  @keyframes sheetUp { from{transform:translateY(100%)} to{transform:translateY(0)} }
  @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:.35} }
  @keyframes timerPulse { 0%,100%{background:rgba(255,255,255,.15)} 50%{background:rgba(255,255,255,.25)} }

  .card { transition:transform .18s ease; }
  .card:active { transform:scale(.985); }
  .tap { transition:transform .12s ease, opacity .12s ease; }
  .tap:active { transform:scale(.93); opacity:.75; }
  .heart-btn { transition:transform .2s cubic-bezier(.34,1.56,.64,1); }
  .heart-btn:active { transform:scale(.8); }
  .live { animation:pulse 2s ease-in-out infinite; }
  .timer-seg { animation:timerPulse 1s ease-in-out infinite; }
`;

function TimerBadge({ time }) {
  const [t, setT] = useState(time);
  useEffect(() => {
    const interval = setInterval(() => {
      setT(prev => {
        const [h,m,s] = prev.split(":").map(Number);
        let ts = h*3600 + m*60 + s - 1;
        if (ts < 0) ts = 0;
        const nh = String(Math.floor(ts/3600)).padStart(2,"0");
        const nm = String(Math.floor((ts%3600)/60)).padStart(2,"0");
        const ns = String(ts%60).padStart(2,"0");
        return `${nh}:${nm}:${ns}`;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const [h,m,s] = t.split(":");
  return (
    <div style={{display:"flex",alignItems:"center",gap:3}}>
      {[h,m,s].map((seg,i) => (
        <div key={i} style={{display:"flex",alignItems:"center",gap:3}}>
          <div className="timer-seg" style={{background:"rgba(255,255,255,.15)",borderRadius:6,padding:"2px 6px",fontWeight:700,fontSize:12,color:"#fff",letterSpacing:.5,minWidth:26,textAlign:"center"}}>{seg}</div>
          {i < 2 && <span style={{color:"rgba(255,255,255,.6)",fontSize:12,fontWeight:700}}>:</span>}
        </div>
      ))}
    </div>
  );
}

// ── Deal Code Sheet ───────────────────────────────────────────────
function DealSheet({ d, onClose }) {
  const [copied, setCopied] = useState(false);
  const saving = d.was - d.now;

  const copyCode = () => {
    navigator.clipboard.writeText(d.code).catch(()=>{});
    setCopied(true);
    setTimeout(()=>setCopied(false), 2500);
  };

  return (
    <div style={{position:"fixed",inset:0,zIndex:800}} onClick={onClose}>
      <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.75)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)"}}/>
      <div onClick={e=>e.stopPropagation()} style={{
        position:"absolute",bottom:0,left:0,right:0,
        background:"#111",borderRadius:"26px 26px 0 0",
        border:"1px solid rgba(255,255,255,.07)",borderBottom:"none",
        padding:"0 20px 48px",
        animation:"sheetUp .38s cubic-bezier(.32,.72,0,1)",
      }}>
        {/* Handle */}
        <div style={{width:38,height:4,borderRadius:2,background:"#2A2A2A",margin:"14px auto 20px"}}/>

        {/* Deal summary */}
        <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:22}}>
          <div style={{width:64,height:64,borderRadius:16,background:d.bg,overflow:"hidden",flexShrink:0}}>
            <img src={d.img} alt={d.title} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontWeight:800,fontSize:16,color:"#fff",marginBottom:2,letterSpacing:"-.2px"}}>{d.title}</div>
            <div style={{fontSize:13,color:"#555",marginBottom:6}}>{d.store}</div>
            <div style={{display:"flex",alignItems:"baseline",gap:8}}>
              <span style={{fontWeight:900,fontSize:20,color:d.accentColor,letterSpacing:"-.5px"}}>{fp(d.now)}</span>
              <span style={{fontSize:13,color:"#444",textDecoration:"line-through"}}>{fp(d.was)}</span>
              <span style={{background:`${d.accentColor}22`,color:d.accentColor,fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:10}}>-{d.pct}%</span>
            </div>
          </div>
        </div>

        {/* Step 1 — Copy code */}
        <div style={{marginBottom:14}}>
          <div style={{fontSize:11,fontWeight:700,color:"#444",letterSpacing:"1px",textTransform:"uppercase",marginBottom:10}}>
            Step 1 — Copy your code
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10,background:"#1A1A1A",borderRadius:14,padding:"14px 16px",border:`1.5px dashed ${copied?"#16A34A":d.accentColor}`,transition:"border-color .3s"}}>
            <span style={{flex:1,fontFamily:"'Courier New',monospace",fontSize:18,fontWeight:900,color:copied?"#16A34A":"#fff",letterSpacing:2,transition:"color .3s"}}>{d.code}</span>
            <button className="tap" onClick={copyCode}
              style={{padding:"8px 18px",borderRadius:10,border:"none",background:copied?"#16A34A":d.accentColor,color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer",flexShrink:0,transition:"background .3s",boxShadow:copied?"0 2px 12px rgba(22,163,74,.4)":`0 2px 12px ${d.accentColor}44`}}>
              {copied?"✓ Copied!":"Copy"}
            </button>
          </div>
          {copied&&(
            <div style={{fontSize:12,color:"#16A34A",fontWeight:600,marginTop:8,paddingLeft:2,animation:"fadeUp .2s ease"}}>
              ✓ Code copied to clipboard — paste it at checkout
            </div>
          )}
        </div>

        {/* Step 2 — Go to store */}
        <div style={{marginBottom:20}}>
          <div style={{fontSize:11,fontWeight:700,color:"#444",letterSpacing:"1px",textTransform:"uppercase",marginBottom:10}}>
            Step 2 — Go to store & paste at checkout
          </div>
          <button className="tap" onClick={()=>{ copyCode(); window.open(d.url,"_blank"); }}
            style={{width:"100%",padding:"16px",borderRadius:16,border:"none",background:d.accentColor,color:"#fff",fontWeight:700,fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10,boxShadow:`0 4px 20px ${d.accentColor}44`}}>
            <span style={{fontSize:18}}>{d.storeLogo}</span>
            Go to {d.store} →
          </button>
        </div>

        {/* Savings callout */}
        <div style={{background:"#1A1A1A",borderRadius:14,padding:"12px 16px",display:"flex",alignItems:"center",gap:10,border:"1px solid rgba(255,255,255,.05)"}}>
          <span style={{fontSize:20}}>💰</span>
          <div>
            <div style={{fontWeight:700,color:"#fff",fontSize:14}}>You're saving {fp(saving)}</div>
            <div style={{fontSize:12,color:"#555",marginTop:1}}>Code valid for limited time · expires soon</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Card v9 — detailed, tall image right ─────────────────────────
function CardDetailed({ d, wishlist, onWish, onToast, onGetDeal, delay=0 }) {
  const saved = wishlist.includes(d.id);
  return (
    <div className="card" style={{borderRadius:24,background:"#1A1A1A",overflow:"hidden",marginBottom:14,animation:`fadeUp .4s ${delay}s both`,border:"1px solid rgba(255,255,255,.06)"}}>
      <div style={{display:"flex",gap:0,position:"relative"}}>
        <div style={{flex:1,padding:"20px 0 20px 20px",display:"flex",flexDirection:"column",justifyContent:"space-between",minWidth:0,zIndex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12,flexWrap:"wrap"}}>
            <div style={{background:d.badgeColor,color:"#fff",fontSize:11,fontWeight:700,padding:"4px 10px",borderRadius:20,display:"flex",alignItems:"center",gap:5,letterSpacing:.3,whiteSpace:"nowrap"}}>
              {d.badge==="FLASH DEAL"&&<span>⚡</span>}{(d.badge==="HOT DEAL"||d.badge==="TRENDING")&&<span>🔥</span>}{d.badge}
            </div>
            {d.timer&&<TimerBadge time={d.timer}/>}
          </div>
          <div style={{fontWeight:800,fontSize:18,color:"#fff",lineHeight:1.2,marginBottom:4,letterSpacing:"-.3px"}}>{d.title}</div>
          <div style={{fontSize:13,color:"#888",marginBottom:14}}>{d.sub}</div>
          <div style={{display:"flex",alignItems:"baseline",gap:8,marginBottom:12}}>
            <span style={{fontWeight:800,fontSize:26,color:d.accentColor,letterSpacing:"-1px"}}>{fp(d.now)}</span>
            <span style={{fontSize:14,color:"#555",textDecoration:"line-through"}}>{fp(d.was)}</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:18}}>
            <span style={{fontSize:15}}>{d.storeLogo}</span>
            <span style={{fontSize:13,color:"#888",fontWeight:600}}>{d.store}</span>
          </div>
          <button className="tap" onClick={()=>onGetDeal(d)} style={{display:"inline-flex",alignItems:"center",gap:8,padding:"12px 22px",borderRadius:50,border:"none",background:d.accentColor,color:"#fff",fontWeight:700,fontSize:14,cursor:"pointer",width:"fit-content",boxShadow:`0 4px 20px ${d.accentColor}55`}}>
            Get Deal ›
          </button>
        </div>
        <div style={{width:155,flexShrink:0,background:d.bg,position:"relative",overflow:"hidden",borderRadius:"0 24px 24px 0",minHeight:220}}>
          <button className="heart-btn tap" onClick={()=>{onWish(d.id);onToast(saved?{msg:"Removed",icon:"💔"}:{msg:"Saved!",icon:"❤️"});}}
            style={{position:"absolute",top:12,right:12,width:34,height:34,borderRadius:"50%",background:saved?"#fff":"rgba(255,255,255,.85)",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",zIndex:2,boxShadow:"0 2px 8px rgba(0,0,0,.15)"}}>
            <span style={{fontSize:16,color:saved?"#E8174A":"#ccc"}}>{saved?"❤️":"🤍"}</span>
          </button>
          <div style={{position:"absolute",top:12,left:12,background:"rgba(0,0,0,.55)",backdropFilter:"blur(6px)",color:"#fff",fontSize:11,fontWeight:700,padding:"3px 8px",borderRadius:10,zIndex:2}}>-{d.pct}%</div>
          <img src={d.img} alt={d.title} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"}} onError={e=>{e.target.style.display="none";}}/>
        </div>
      </div>
    </div>
  );
}

// ── Card v10 — compact, tighter image right ───────────────────────
function CardCompact({ d, wishlist, onWish, onToast, onGetDeal, delay=0 }) {
  const saved  = wishlist.includes(d.id);
  const saving = d.was - d.now;
  return (
    <div className="card" style={{borderRadius:20,background:"#141414",overflow:"hidden",marginBottom:10,animation:`fadeUp .38s ${delay}s both`,border:"1px solid rgba(255,255,255,.055)"}}>
      <div style={{display:"flex",position:"relative"}}>
        <div style={{flex:1,padding:"14px 0 14px 14px",display:"flex",flexDirection:"column",gap:6,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
            <span style={{background:d.badgeColor,color:"#fff",fontSize:10,fontWeight:800,padding:"3px 8px",borderRadius:20,letterSpacing:.4,whiteSpace:"nowrap"}}>
              {d.badge==="FLASH DEAL"?"⚡ ":d.badge==="HOT DEAL"||d.badge==="TRENDING"?"🔥 ":""}{d.badge}
            </span>
            {d.timer&&<TimerBadge time={d.timer}/>}
          </div>
          <div style={{fontWeight:800,fontSize:16,color:"#fff",lineHeight:1.25,letterSpacing:"-.2px"}}>{d.title}</div>
          <div style={{fontSize:12,color:"#555",lineHeight:1.3}}>{d.sub}</div>
          <div style={{display:"flex",alignItems:"baseline",gap:7,marginTop:2}}>
            <span style={{fontWeight:900,fontSize:22,color:d.accentColor,letterSpacing:"-.8px"}}>{fp(d.now)}</span>
            <span style={{fontSize:13,color:"#444",textDecoration:"line-through"}}>{fp(d.was)}</span>
            <span style={{fontSize:11,color:"#555"}}>save {fp(saving)}</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8,marginTop:4}}>
            <span style={{fontSize:13}}>{d.storeLogo}</span>
            <span style={{fontSize:12,color:"#555",fontWeight:600,flex:1}}>{d.store}</span>
            <button className="tap" onClick={()=>onGetDeal(d)} style={{padding:"8px 16px",borderRadius:20,border:"none",background:d.accentColor,color:"#fff",fontWeight:700,fontSize:12,cursor:"pointer",whiteSpace:"nowrap",boxShadow:`0 3px 12px ${d.accentColor}44`,marginRight:8}}>
              Get Deal ›
            </button>
          </div>
        </div>
        <div style={{width:130,flexShrink:0,background:d.bg,position:"relative",borderRadius:"0 20px 20px 0",overflow:"hidden",minHeight:160}}>
          <button className="heart-btn tap" onClick={()=>{onWish(d.id);onToast(saved?{msg:"Removed",icon:"💔"}:{msg:"Saved!",icon:"❤️"});}}
            style={{position:"absolute",top:9,right:9,width:30,height:30,borderRadius:"50%",background:saved?"#fff":"rgba(0,0,0,.4)",backdropFilter:"blur(6px)",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",zIndex:2}}>
            <span style={{fontSize:14,color:saved?"#E8174A":"#888"}}>{saved?"❤️":"🤍"}</span>
          </button>
          <div style={{position:"absolute",bottom:9,left:9,background:"rgba(0,0,0,.6)",backdropFilter:"blur(4px)",color:"#fff",fontSize:10,fontWeight:800,padding:"2px 7px",borderRadius:8,zIndex:2}}>-{d.pct}%</div>
          <img src={d.img} alt={d.title} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"}} onError={e=>{e.target.style.display="none";}}/>
        </div>
      </div>
    </div>
  );
}

// ── Unified card dispatcher ───────────────────────────────────────
function DealCard({ d, wishlist, onWish, onToast, onGetDeal, compact=false, delay=0 }) {
  return compact
    ? <CardCompact d={d} wishlist={wishlist} onWish={onWish} onToast={onToast} onGetDeal={onGetDeal} delay={delay}/>
    : <CardDetailed d={d} wishlist={wishlist} onWish={onWish} onToast={onToast} onGetDeal={onGetDeal} delay={delay}/>;
}

// ── Admin: Add Deal Sheet ─────────────────────────────────────────
const ADMIN_EMAIL = "admin@nikkideals.com"; // change to your email

const STORE_MAP = {
  "amazon.com":  { name:"Amazon",   logo:"🛒", accent:"#FF9900", bg:"linear-gradient(135deg,#FFF8EE,#FFE4B5)" },
  "target.com":  { name:"Target",   logo:"🎯", accent:"#CC0000", bg:"linear-gradient(135deg,#FFF0F0,#FFE0E0)" },
  "bestbuy.com": { name:"Best Buy", logo:"💛", accent:"#0046BE", bg:"linear-gradient(135deg,#EFF6FF,#DBEAFE)" },
  "nike.com":    { name:"Nike",     logo:"✔️", accent:"#111111", bg:"linear-gradient(135deg,#F8F8F8,#EEEEEE)" },
  "apple.com":   { name:"Apple",    logo:"🍎", accent:"#555555", bg:"linear-gradient(135deg,#F5F5F7,#E8E8ED)" },
  "walmart.com": { name:"Walmart",  logo:"⭐", accent:"#0071CE", bg:"linear-gradient(135deg,#EFF6FF,#DBEAFE)" },
  "dyson.com":   { name:"Dyson",    logo:"🌀", accent:"#C8102E", bg:"linear-gradient(135deg,#FFF0F2,#FFE0E5)" },
};

function detectStore(url) {
  try {
    const host = new URL(url).hostname.replace("www.","");
    for (const [domain, info] of Object.entries(STORE_MAP)) {
      if (host.includes(domain)) return { ...info, url };
    }
  } catch {}
  return { name:"Unknown Store", logo:"🔗", accent:"#7B61FF", bg:"linear-gradient(135deg,#EEF0FF,#E4E1FF)", url };
}

function AddDealSheet({ onClose, onAdd }) {
  const [step, setStep]     = useState("url");   // url | loading | edit
  const [url, setUrl]       = useState("");
  const [aiError, setAiError] = useState("");
  const [form, setForm]     = useState({
    title:"", sub:"", was:"", now:"", code:"",
    badge:"HOT DEAL", cat:"Electronics", timer:"",
    img:"", store:"", storeLogo:"", accentColor:"#7B61FF",
    bg:"linear-gradient(135deg,#EEF0FF,#E4E1FF)", url:"",
  });

  const BADGES = ["HOT DEAL","FLASH DEAL","TRENDING","50% OFF","NEW"];
  const BADGE_COLORS = {
    "HOT DEAL":"#E8174A","FLASH DEAL":"#16A34A",
    "TRENDING":"#EA580C","50% OFF":"#2563EB","NEW":"#7B61FF",
  };

  const analyzeUrl = async () => {
    if (!url.trim()) return;
    setStep("loading");
    setAiError("");

    const storeInfo = detectStore(url);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          messages:[{
            role:"user",
            content:`I have this product URL: ${url}

Based on the URL alone (domain, path, product slug), extract as much as you can about the product. Return ONLY valid JSON with these exact fields:
{
  "title": "Product name (short, no brand repeat)",
  "sub": "Brief subtitle/variant (color, size, model)",
  "was": 0,
  "now": 0,
  "code": "Suggested promo code or empty string",
  "cat": "Electronics | Fashion | Home | Other",
  "badge": "HOT DEAL | FLASH DEAL | TRENDING | 50% OFF | NEW",
  "img": ""
}

If you cannot determine a price, use 0. If you cannot determine a field, use a reasonable default. Return ONLY the JSON object, no markdown, no explanation.`
          }]
        })
      });
      const data = await res.json();
      const text = data.content?.find(b=>b.type==="text")?.text || "{}";
      const parsed = JSON.parse(text.replace(/```json|```/g,"").trim());
      const pct = parsed.was > 0 && parsed.now > 0
        ? Math.round((1 - parsed.now / parsed.was) * 100) : 0;

      setForm({
        title:    parsed.title  || "",
        sub:      parsed.sub    || "",
        was:      parsed.was    || "",
        now:      parsed.now    || "",
        code:     parsed.code   || "",
        badge:    parsed.badge  || "HOT DEAL",
        cat:      parsed.cat    || "Electronics",
        timer:    "",
        img:      parsed.img    || "",
        store:    storeInfo.name,
        storeLogo:storeInfo.logo,
        accentColor: storeInfo.accent,
        bg:       storeInfo.bg,
        url:      url,
        pct,
      });
      setStep("edit");
    } catch (e) {
      // Fallback — still open form with store info pre-filled
      setForm(f=>({ ...f, store:storeInfo.name, storeLogo:storeInfo.logo, accentColor:storeInfo.accent, bg:storeInfo.bg, url }));
      setAiError("Couldn't auto-fill — please fill in manually.");
      setStep("edit");
    }
  };

  const save = () => {
    if (!form.title || !form.now) return;
    const was = Number(form.was) || 0;
    const now = Number(form.now) || 0;
    const pct = was > 0 ? Math.round((1 - now/was)*100) : 0;
    onAdd({
      id: Date.now(),
      title:      form.title,
      sub:        form.sub,
      cat:        form.cat,
      img:        form.img || `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80`,
      was, now,
      store:      form.store,
      storeLogo:  form.storeLogo,
      pct,
      timer:      form.timer || null,
      badge:      form.badge,
      badgeColor: BADGE_COLORS[form.badge] || "#E8174A",
      accentColor:form.accentColor,
      bg:         form.bg,
      code:       form.code,
      url:        form.url,
    });
    onClose();
  };

  const inp = (ph, k, type="text", half=false) => (
    <input placeholder={ph} type={type} value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))}
      style={{width:"100%",padding:"11px 14px",borderRadius:12,border:"1.5px solid #222",background:"#1A1A1A",color:"#fff",fontSize:14,fontWeight:500,display:"block",transition:"border .15s",marginBottom:10}}
      onFocus={e=>e.target.style.borderColor="#7B61FF"} onBlur={e=>e.target.style.borderColor="#222"}/>
  );

  return (
    <div style={{position:"fixed",inset:0,zIndex:1100}} onClick={onClose}>
      <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.85)",backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)"}}/>
      <div onClick={e=>e.stopPropagation()} style={{
        position:"absolute",bottom:0,left:0,right:0,
        background:"#111",borderRadius:"26px 26px 0 0",
        border:"1px solid rgba(255,255,255,.08)",borderBottom:"none",
        padding:"0 20px 48px",
        animation:"sheetUp .4s cubic-bezier(.32,.72,0,1)",
        maxHeight:"92vh",overflowY:"auto",
      }}>
        <div style={{width:38,height:4,borderRadius:2,background:"#2A2A2A",margin:"14px auto 20px"}}/>

        {/* ── Step: URL input ── */}
        {step==="url"&&(
          <>
            <div style={{marginBottom:20}}>
              <div style={{fontWeight:800,fontSize:22,color:"#fff",marginBottom:4}}>+ Add a Deal</div>
              <div style={{fontSize:13,color:"#555"}}>Paste the product URL — AI will fill in the details</div>
            </div>
            <div style={{position:"relative",marginBottom:14}}>
              <input autoFocus value={url} onChange={e=>setUrl(e.target.value)}
                placeholder="https://amazon.com/product/..."
                onKeyDown={e=>e.key==="Enter"&&analyzeUrl()}
                style={{width:"100%",padding:"14px 16px",borderRadius:14,border:"1.5px solid #7B61FF",background:"#1A1A1A",color:"#fff",fontSize:15,fontWeight:500,boxShadow:"0 0 0 3px rgba(123,97,255,.15)"}}/>
              {url&&<button onClick={()=>setUrl("")} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"#444",fontSize:16,cursor:"pointer"}}>✕</button>}
            </div>
            <button className="tap" onClick={analyzeUrl} disabled={!url.trim()}
              style={{width:"100%",padding:"15px",borderRadius:16,border:"none",background:url.trim()?"#7B61FF":"#1A1A1A",color:url.trim()?"#fff":"#333",fontWeight:700,fontSize:16,cursor:url.trim()?"pointer":"default",boxShadow:url.trim()?"0 4px 20px rgba(123,97,255,.4)":"none",transition:"all .2s"}}>
              Analyze with AI →
            </button>
            <div style={{textAlign:"center",marginTop:14}}>
              <span onClick={()=>setStep("edit")} style={{color:"#444",fontSize:13,cursor:"pointer"}}>or fill in manually</span>
            </div>
          </>
        )}

        {/* ── Step: loading ── */}
        {step==="loading"&&(
          <div style={{textAlign:"center",padding:"48px 20px"}}>
            <div style={{fontSize:48,marginBottom:16,animation:"pulse 1s ease-in-out infinite"}}>🤖</div>
            <div style={{fontWeight:700,fontSize:17,color:"#fff",marginBottom:6}}>Analyzing URL…</div>
            <div style={{fontSize:13,color:"#555"}}>AI is reading the product details</div>
          </div>
        )}

        {/* ── Step: edit form ── */}
        {step==="edit"&&(
          <>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
              <div>
                <div style={{fontWeight:800,fontSize:20,color:"#fff",marginBottom:2}}>Review & Edit</div>
                <div style={{fontSize:12,color:"#555"}}>AI pre-filled — adjust anything before saving</div>
              </div>
              <button onClick={()=>setStep("url")} style={{background:"none",border:"none",color:"#555",fontSize:12,cursor:"pointer"}}>&larr; Back</button>
            </div>

            {aiError&&<div style={{background:"rgba(234,88,12,.15)",border:"1px solid rgba(234,88,12,.4)",borderRadius:12,padding:"10px 14px",color:"#EA580C",fontSize:13,fontWeight:600,marginBottom:14}}>⚠️ {aiError}</div>}

            {/* Preview mini card */}
            <div style={{background:"#1A1A1A",borderRadius:16,padding:"14px",marginBottom:18,border:"1px solid rgba(255,255,255,.07)",display:"flex",gap:12,alignItems:"center"}}>
              <div style={{width:52,height:52,borderRadius:12,background:form.bg,overflow:"hidden",flexShrink:0}}>
                {form.img&&<img src={form.img} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:700,color:"#fff",fontSize:14,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{form.title||"Product title"}</div>
                <div style={{color:"#555",fontSize:12,marginTop:1}}>{form.store||"Store"}</div>
                <div style={{display:"flex",gap:8,marginTop:4,alignItems:"baseline"}}>
                  <span style={{fontWeight:800,color:form.accentColor,fontSize:16}}>{form.now?`$${form.now}`:"-"}</span>
                  {form.was&&<span style={{color:"#444",fontSize:12,textDecoration:"line-through"}}>${form.was}</span>}
                </div>
              </div>
              <div style={{background:BADGE_COLORS[form.badge]||"#E8174A",color:"#fff",fontSize:10,fontWeight:800,padding:"3px 9px",borderRadius:20,flexShrink:0}}>{form.badge}</div>
            </div>

            {/* Form fields */}
            <div style={{fontSize:11,fontWeight:700,color:"#444",letterSpacing:"1px",textTransform:"uppercase",marginBottom:8}}>Product Info</div>
            {inp("Product title *","title")}
            {inp("Subtitle / variant","sub")}

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:0}}>
              <input placeholder="Original price" type="number" value={form.was} onChange={e=>setForm(f=>({...f,was:e.target.value}))}
                style={{padding:"11px 14px",borderRadius:12,border:"1.5px solid #222",background:"#1A1A1A",color:"#fff",fontSize:14,display:"block",marginBottom:10,transition:"border .15s",width:"100%"}}
                onFocus={e=>e.target.style.borderColor="#7B61FF"} onBlur={e=>e.target.style.borderColor="#222"}/>
              <input placeholder="Sale price *" type="number" value={form.now} onChange={e=>setForm(f=>({...f,now:e.target.value}))}
                style={{padding:"11px 14px",borderRadius:12,border:"1.5px solid #222",background:"#1A1A1A",color:"#fff",fontSize:14,display:"block",marginBottom:10,transition:"border .15s",width:"100%"}}
                onFocus={e=>e.target.style.borderColor="#7B61FF"} onBlur={e=>e.target.style.borderColor="#222"}/>
            </div>
            {inp("Coupon code (optional)","code")}
            {inp("Image URL (optional)","img","url")}
            {inp("Countdown timer e.g. 02:00:00 (optional)","timer")}

            <div style={{fontSize:11,fontWeight:700,color:"#444",letterSpacing:"1px",textTransform:"uppercase",marginBottom:8,marginTop:4}}>Category & Badge</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
              <select value={form.cat} onChange={e=>setForm(f=>({...f,cat:e.target.value}))}
                style={{padding:"11px 14px",borderRadius:12,border:"1.5px solid #222",background:"#1A1A1A",color:"#fff",fontSize:14}}>
                {["Electronics","Fashion","Home","Other"].map(c=><option key={c}>{c}</option>)}
              </select>
              <select value={form.badge} onChange={e=>setForm(f=>({...f,badge:e.target.value}))}
                style={{padding:"11px 14px",borderRadius:12,border:"1.5px solid #222",background:"#1A1A1A",color:"#fff",fontSize:14}}>
                {BADGES.map(b=><option key={b}>{b}</option>)}
              </select>
            </div>

            <button className="tap" onClick={save} disabled={!form.title||!form.now}
              style={{width:"100%",padding:"15px",borderRadius:16,border:"none",background:(form.title&&form.now)?"#7B61FF":"#1A1A1A",color:(form.title&&form.now)?"#fff":"#333",fontWeight:700,fontSize:16,cursor:(form.title&&form.now)?"pointer":"default",boxShadow:(form.title&&form.now)?"0 4px 20px rgba(123,97,255,.4)":"none",transition:"all .2s"}}>
              Publish Deal ✓
            </button>
          </>
        )}
      </div>
    </div>
  );
}


function AuthSheet({ mode, onClose, onAuth }) {
  const [isLogin,setIsLogin] = useState(mode==="login");
  const [form,setForm]       = useState({name:"",email:"",password:""});
  const [prefs,setPrefs]     = useState({deals:true,drops:true,wish:true});
  const [err,setErr]         = useState("");
  const submit = () => {
    if (!form.email||!form.password){setErr("Please fill in all fields");return;}
    if (!isLogin&&!form.name){setErr("What's your name?");return;}
    onAuth({name:form.name||form.email.split("@")[0],email:form.email,prefs});
  };
  const inputSt = {width:"100%",padding:"15px 18px",borderRadius:16,border:"1.5px solid #2A2A2A",background:"#1A1A1A",color:"#fff",fontSize:16,fontWeight:500,marginBottom:12,display:"block",transition:"border .15s"};
  return (
    <div style={{position:"fixed",inset:0,zIndex:1000}} onClick={onClose}>
      <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.8)",backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)"}}/>
      <div onClick={e=>e.stopPropagation()} style={{position:"absolute",bottom:0,left:0,right:0,background:"#111",borderRadius:"28px 28px 0 0",border:"1px solid #222",borderBottom:"none",padding:"0 22px 48px",animation:"sheetUp .4s cubic-bezier(.32,.72,0,1)",maxHeight:"92vh",overflowY:"auto"}}>
        <div style={{width:40,height:4,borderRadius:2,background:"#333",margin:"16px auto 24px"}}/>
        <div style={{marginBottom:24}}>
          <div style={{fontWeight:800,fontSize:26,color:"#fff",letterSpacing:"-.5px",marginBottom:4}}>{isLogin?"Welcome back 👋":"Create account"}</div>
          <div style={{color:"#666",fontSize:15}}>{isLogin?"Your saved deals are waiting":"Free · alerts · wishlist · price tracking"}</div>
        </div>
        {err&&<div style={{background:"rgba(232,23,74,.15)",border:"1px solid rgba(232,23,74,.4)",borderRadius:12,padding:"12px 16px",color:"#FF6B8A",fontSize:14,fontWeight:600,marginBottom:14}}>⚠️ {err}</div>}
        {!isLogin&&<input placeholder="First name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} style={inputSt} onFocus={e=>e.target.style.borderColor="#7B61FF"} onBlur={e=>e.target.style.borderColor="#2A2A2A"}/>}
        <input placeholder="Email" type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} style={inputSt} onFocus={e=>e.target.style.borderColor="#7B61FF"} onBlur={e=>e.target.style.borderColor="#2A2A2A"}/>
        <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} style={inputSt} onFocus={e=>e.target.style.borderColor="#7B61FF"} onBlur={e=>e.target.style.borderColor="#2A2A2A"}/>
        {!isLogin&&(
          <div style={{background:"#1A1A1A",borderRadius:18,padding:"16px",marginBottom:16,border:"1px solid #2A2A2A"}}>
            <div style={{fontSize:11,fontWeight:700,color:"#555",letterSpacing:"1.2px",textTransform:"uppercase",marginBottom:14}}>Notify me about</div>
            {[{k:"deals",l:"🔥  New hot deals"},{k:"drops",l:"📉  Price drops"},{k:"wish",l:"⭐  Wishlist updates"}].map(({k,l})=>(
              <div key={k} onClick={()=>setPrefs(p=>({...p,[k]:!p[k]}))} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:"1px solid #222",cursor:"pointer"}}>
                <span style={{color:"#ccc",fontSize:15,fontWeight:500}}>{l}</span>
                <div style={{width:48,height:27,borderRadius:14,background:prefs[k]?"#7B61FF":"#2A2A2A",transition:"background .2s",position:"relative",flexShrink:0}}>
                  <div style={{position:"absolute",top:3,left:prefs[k]?24:3,width:21,height:21,borderRadius:"50%",background:"#fff",transition:"left .2s"}}/>
                </div>
              </div>
            ))}
          </div>
        )}
        <button className="tap" onClick={submit} style={{width:"100%",padding:"17px",borderRadius:18,border:"none",background:"#7B61FF",color:"#fff",fontWeight:700,fontSize:17,cursor:"pointer",marginBottom:14,boxShadow:"0 6px 24px rgba(123,97,255,.4)"}}>
          {isLogin?"Sign In →":"Create Account →"}
        </button>
        <div style={{textAlign:"center",color:"#555",fontSize:14}}>
          {isLogin?"No account? ":"Already a member? "}
          <span onClick={()=>{setIsLogin(!isLogin);setErr("");}} style={{color:"#7B61FF",fontWeight:700,cursor:"pointer"}}>{isLogin?"Sign up free":"Sign in"}</span>
        </div>
      </div>
    </div>
  );
}

function NotifSheet({ notifs, onClear, onClose }) {
  return (
    <div style={{position:"fixed",inset:0,zIndex:900}} onClick={onClose}>
      <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.75)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)"}}/>
      <div onClick={e=>e.stopPropagation()} style={{position:"absolute",bottom:0,left:0,right:0,background:"#111",borderRadius:"28px 28px 0 0",border:"1px solid #222",borderBottom:"none",padding:"0 20px 48px",animation:"sheetUp .4s cubic-bezier(.32,.72,0,1)",maxHeight:"75vh",overflow:"hidden",display:"flex",flexDirection:"column"}}>
        <div style={{width:40,height:4,borderRadius:2,background:"#333",margin:"16px auto 0"}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"18px 0 16px"}}>
          <span style={{fontWeight:800,fontSize:20,color:"#fff"}}>Notifications</span>
          <div style={{display:"flex",gap:16,alignItems:"center"}}>
            <span onClick={onClear} style={{color:"#7B61FF",fontSize:13,fontWeight:700,cursor:"pointer"}}>Clear all</span>
            <button onClick={onClose} style={{width:32,height:32,borderRadius:10,border:"1px solid #2A2A2A",background:"#1A1A1A",color:"#666",fontSize:16,cursor:"pointer"}}>✕</button>
          </div>
        </div>
        <div style={{overflowY:"auto",flex:1}}>
          {notifs.length===0?(
            <div style={{textAlign:"center",padding:"48px 20px"}}>
              <div style={{fontSize:52,marginBottom:10}}>🔕</div>
              <div style={{fontWeight:800,fontSize:17,color:"#fff",marginBottom:4}}>All caught up!</div>
              <div style={{fontSize:14,color:"#555"}}>We'll alert you when prices drop</div>
            </div>
          ):notifs.map(n=>(
            <div key={n.id} style={{display:"flex",gap:14,padding:"14px 0",borderBottom:"1px solid #1E1E1E",alignItems:"flex-start"}}>
              <div style={{width:46,height:46,borderRadius:14,background:"#1A1A1A",border:"1px solid #2A2A2A",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{n.icon}</div>
              <div style={{flex:1}}>
                <div style={{color:"#fff",fontSize:14,fontWeight:700,marginBottom:2}}>{n.title}</div>
                <div style={{color:"#666",fontSize:13}}>{n.body}</div>
                <div style={{color:"#333",fontSize:11,marginTop:4}}>{n.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SavedTab({ wishlist, onWish, onToast, onGetDeal }) {
  const items = DEALS.filter(d=>wishlist.includes(d.id));
  return (
    <div style={{padding:"24px 16px 110px"}}>
      <div style={{fontWeight:800,fontSize:26,color:"#fff",letterSpacing:"-.5px",marginBottom:4}}>Saved</div>
      <div style={{fontSize:14,color:"#555",marginBottom:24}}>{items.length>0?`${items.length} deal${items.length>1?"s":""} saved`:"Nothing saved yet"}</div>
      {items.length>0?items.map((d,i)=><DealCard key={d.id} d={d} wishlist={wishlist} onWish={onWish} onToast={onToast} onGetDeal={onGetDeal} delay={i*.05}/>):(
        <div style={{textAlign:"center",padding:"60px 0"}}>
          <div style={{fontSize:56,marginBottom:12}}>🤍</div>
          <div style={{fontWeight:800,fontSize:18,color:"#fff",marginBottom:6}}>Nothing saved yet</div>
          <div style={{fontSize:14,color:"#555"}}>Tap the heart on any deal</div>
        </div>
      )}
    </div>
  );
}

function AlertsTab({ user, onSignIn, tracked, onUntrack }) {
  if (!user) return (
    <div style={{textAlign:"center",padding:"80px 28px 110px"}}>
      <div style={{width:80,height:80,borderRadius:24,background:"#7B61FF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,margin:"0 auto 20px",boxShadow:"0 8px 28px rgba(123,97,255,.4)"}}>🔔</div>
      <div style={{fontWeight:800,fontSize:24,color:"#fff",marginBottom:10}}>Price Alerts</div>
      <div style={{color:"#555",fontSize:15,maxWidth:280,margin:"0 auto 28px",lineHeight:1.6}}>Sign in to track prices and get alerted the moment they drop</div>
      <button className="tap" onClick={onSignIn} style={{padding:"16px 36px",borderRadius:18,border:"none",background:"#7B61FF",color:"#fff",fontWeight:700,fontSize:16,cursor:"pointer",boxShadow:"0 6px 24px rgba(123,97,255,.4)"}}>Sign In →</button>
    </div>
  );
  const items = DEALS.filter(d=>tracked.includes(d.id));
  return (
    <div style={{padding:"24px 16px 110px"}}>
      <div style={{fontWeight:800,fontSize:26,color:"#fff",letterSpacing:"-.5px",marginBottom:4}}>Price Alerts</div>
      <div style={{fontSize:14,color:"#555",marginBottom:24}}>{items.length>0?`Tracking ${items.length} item${items.length>1?"s":""}`:"No active alerts"}</div>
      {items.length>0?items.map(d=>(
        <div key={d.id} style={{background:"#1A1A1A",borderRadius:20,padding:"16px",marginBottom:12,display:"flex",alignItems:"center",gap:14,border:"1px solid #222"}}>
          <div style={{width:54,height:54,borderRadius:16,background:d.bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,overflow:"hidden"}}>
            <img src={d.img} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontWeight:700,color:"#fff",fontSize:15,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{d.title}</div>
            <div style={{color:"#555",fontSize:12,marginTop:2}}>{d.store}</div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginTop:6}}>
              <span style={{fontWeight:800,color:d.accentColor,fontSize:18}}>{fp(d.now)}</span>
              <span style={{background:`${d.accentColor}22`,color:d.accentColor,fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:10}}>-{d.pct}%</span>
            </div>
          </div>
          <button className="tap" onClick={()=>onUntrack(d.id)} style={{padding:"8px 14px",borderRadius:12,border:"1px solid #2A2A2A",background:"transparent",color:"#555",fontSize:12,fontWeight:600,cursor:"pointer"}}>Remove</button>
        </div>
      )):(
        <div style={{textAlign:"center",padding:"60px 0"}}>
          <div style={{fontSize:56,marginBottom:12}}>🔕</div>
          <div style={{fontWeight:800,fontSize:18,color:"#fff",marginBottom:6}}>No alerts yet</div>
          <div style={{fontSize:14,color:"#555"}}>Track deals to get price drop alerts</div>
        </div>
      )}
    </div>
  );
}

function ProfileTab({ user, wishlist, tracked, onSignIn, onSignOut, isAdmin, onAddDeal }) {
  if (!user) return (
    <div style={{textAlign:"center",padding:"80px 28px 110px"}}>
      <div style={{width:80,height:80,borderRadius:24,background:"linear-gradient(135deg,#7B61FF,#E8174A)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,margin:"0 auto 20px",boxShadow:"0 8px 28px rgba(123,97,255,.35)"}}>👤</div>
      <div style={{fontWeight:800,fontSize:24,color:"#fff",marginBottom:10}}>Your Profile</div>
      <div style={{color:"#555",fontSize:15,maxWidth:280,margin:"0 auto 28px",lineHeight:1.6}}>Sign in to access your wishlist, alerts, and deal history</div>
      <button className="tap" onClick={onSignIn} style={{padding:"16px 36px",borderRadius:18,border:"none",background:"#7B61FF",color:"#fff",fontWeight:700,fontSize:16,cursor:"pointer",boxShadow:"0 6px 24px rgba(123,97,255,.4)"}}>Sign In →</button>
    </div>
  );
  return (
    <div style={{padding:"24px 16px 110px"}}>
      <div style={{background:"#1A1A1A",borderRadius:24,padding:"24px 20px",marginBottom:16,border:"1px solid #222",textAlign:"center"}}>
        <div style={{width:68,height:68,borderRadius:22,background:"linear-gradient(135deg,#7B61FF,#E8174A)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,color:"#fff",fontSize:26,margin:"0 auto 12px",boxShadow:"0 4px 20px rgba(123,97,255,.4)"}}>{user.name[0].toUpperCase()}</div>
        <div style={{fontWeight:800,fontSize:20,color:"#fff",letterSpacing:"-.3px"}}>{user.name}</div>
        <div style={{color:"#555",fontSize:14,marginTop:3}}>{user.email}</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:1,marginTop:20,background:"#222",borderRadius:16,overflow:"hidden"}}>
          {[[wishlist.length,"❤️","Saved"],[tracked.length,"🔔","Alerts"],["9","🏷️","Deals"]].map(([n,e,l])=>(
            <div key={l} style={{background:"#1A1A1A",padding:"14px 0",textAlign:"center"}}>
              <div style={{fontSize:18}}>{e}</div>
              <div style={{fontWeight:800,fontSize:20,color:"#fff"}}>{n}</div>
              <div style={{fontSize:11,color:"#555",marginTop:1}}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{background:"#1A1A1A",borderRadius:20,overflow:"hidden",border:"1px solid #222",marginBottom:14}}>
        {[{i:"🔔",l:"Notifications",s:"Manage deal alerts"},{i:"🏷️",l:"Preferences",s:"Categories & stores"},{i:"🔒",l:"Security",s:"Password & privacy"},{i:"💬",l:"Help & Support",s:"FAQs and contact us"}].map((r,i)=>(
          <div key={r.l} style={{display:"flex",alignItems:"center",gap:14,padding:"16px 18px",borderBottom:i<3?"1px solid #1E1E1E":"none",cursor:"pointer"}}>
            <div style={{width:40,height:40,borderRadius:12,background:"#111",display:"flex",alignItems:"center",justifyContent:"center",fontSize:19,flexShrink:0}}>{r.i}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:600,color:"#fff",fontSize:15}}>{r.l}</div>
              <div style={{color:"#555",fontSize:13,marginTop:1}}>{r.s}</div>
            </div>
            <span style={{color:"#333",fontSize:20}}>›</span>
          </div>
        ))}
      </div>
      {isAdmin&&(
        <div style={{marginBottom:14}}>
          <div style={{fontSize:11,fontWeight:700,color:"#444",letterSpacing:"1px",textTransform:"uppercase",marginBottom:10}}>Admin</div>
          <button className="tap" onClick={onAddDeal}
            style={{width:"100%",padding:"15px",borderRadius:16,border:"none",background:"linear-gradient(135deg,#7B61FF,#9B4DFF)",color:"#fff",fontWeight:700,fontSize:15,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10,boxShadow:"0 4px 20px rgba(123,97,255,.4)"}}>
            <span style={{fontSize:20}}>+</span> Add New Deal
          </button>
        </div>
      )}
      <button className="tap" onClick={onSignOut} style={{width:"100%",padding:"16px",borderRadius:18,border:"1px solid #2A2A2A",background:"transparent",color:"#666",fontWeight:600,fontSize:15,cursor:"pointer"}}>Sign Out</button>
    </div>
  );
}

export default function NikkiDealsV9() {
  const [user,setUser]           = useState(null);
  const [authMode,setAuthMode]   = useState(null);
  const [tab,setTab]             = useState("home");
  const [cat,setCat]             = useState("All");
  const [search,setSearch]       = useState("");
  const [wishlist,setWishlist]   = useState([]);
  const [tracked,setTracked]     = useState([]);
  const [notifs,setNotifs]       = useState([]);
  const [showNotif,setShowNotif] = useState(false);
  const [searchOpen,setSearchOpen] = useState(false);
  const [activeDeal,setActiveDeal] = useState(null);
  const [compact,setCompact]       = useState(false);
  const [deals,setDeals]           = useState(DEALS);
  const [showAddDeal,setShowAddDeal]= useState(false);
  const isAdmin = user?.email === ADMIN_EMAIL;
  const [toasts,setToasts]       = useState([]);

  useEffect(()=>{
    if (!user) return;
    const t = setTimeout(()=>{
      setNotifs([
        {id:uid(),icon:"📉",title:"Price dropped!",body:"Sony WH-1000XM5 is now $179 🎉",time:"Just now"},
        {id:uid(),icon:"⚡",title:"Flash Deal live!",body:"Stanley Quencher 52% off — 2h left",time:"2 min ago"},
        {id:uid(),icon:"❤️",title:"Wishlist alert",body:"Nike Air Max 270 dropped to $74!",time:"5 min ago"},
      ]);
      addToast({msg:"3 new alerts!",icon:"🔔"});
    },3500);
    return ()=>clearTimeout(t);
  },[user]);

  const addToast    = t  => { const id=uid(); setToasts(p=>[...p,{...t,id}]); setTimeout(()=>setToasts(p=>p.filter(x=>x.id!==id)),4000); };
  const toggleWish  = id => { if(!user){setAuthMode("signup");return;} setWishlist(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]); };
  const toggleTrack = id => { if(!user){setAuthMode("signup");return;} setTracked(t=>t.includes(id)?t.filter(x=>x!==id):[...t,id]); };
  const handleAuth  = u  => { setUser(u);setAuthMode(null); addToast({msg:`Welcome, ${u.name}! 🎉`,icon:"✨"}); };
  const handleOut   = () => { setUser(null);setWishlist([]);setTracked([]);setNotifs([]); addToast({msg:"Signed out",icon:"👋"}); };

  const addDeal = (d) => { setDeals(prev=>[d,...prev]); addToast({msg:"Deal published! 🎉",icon:"✅"}); };
  const filtered = deals.filter(d=>(cat==="All"||d.cat===cat)&&(d.title+d.store).toLowerCase().includes(search.toLowerCase()));

  const NavIcon = ({icon,active}) => {
    const c = active?"#7B61FF":"#555";
    if (icon==="home")   return <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 9.5L12 3l9 6.5V21a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z" stroke={c} strokeWidth="2" strokeLinejoin="round" fill={active?c:"none"}/><path d="M9 21V12h6v9" stroke={c} strokeWidth="2" strokeLinejoin="round"/></svg>;
    if (icon==="heart")  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 21C12 21 3 14 3 8.5a4.5 4.5 0 019 0 4.5 4.5 0 019 0C21 14 12 21 12 21z" stroke={c} strokeWidth="2" strokeLinejoin="round" fill={active?c:"none"}/></svg>;
    if (icon==="bell")   return <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    if (icon==="person") return <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke={c} strokeWidth="2" fill={active?c:"none"}/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>;
    return null;
  };

  const NAV = [
    {id:"home",    icon:"home",   label:"Home"},
    {id:"saved",   icon:"heart",  label:"Saved",  badge:wishlist.length},
    {id:"alerts",  icon:"bell",   label:"Alerts", badge:tracked.length},
    {id:"profile", icon:"person", label:"Profile"},
  ];

  return (
    <div style={{minHeight:"100vh",background:"#0A0A0A",fontFamily:"'Inter',sans-serif",maxWidth:480,margin:"0 auto",position:"relative"}}>
      <style>{CSS}</style>

      {/* ── Header ── */}
      {tab==="home"&&(
        <header style={{background:"rgba(10,10,10,.97)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",position:"sticky",top:0,zIndex:200,borderBottom:"1px solid rgba(255,255,255,.05)"}}>

          {/* Everything on one scrollable row */}
          {!searchOpen&&(
            <div style={{display:"flex",alignItems:"center",gap:7,padding:"9px 12px",overflowX:"auto",WebkitOverflowScrolling:"touch",whiteSpace:"nowrap"}}>
              {/* Logo */}
              <span style={{fontWeight:900,fontSize:18,color:"#fff",letterSpacing:"-.8px",flexShrink:0}}>
                Deals<span style={{color:"#7B61FF"}}>.</span>
              </span>
              {/* Divider */}
              <span style={{color:"#333",flexShrink:0,fontSize:14}}>|</span>
              {/* Category pills */}
              {CATS.map(c=>(
                <button key={c.id} className="tap" onClick={()=>setCat(c.id)}
                  style={{padding:"5px 11px",borderRadius:20,border:`1px solid ${cat===c.id?"#7B61FF":"rgba(255,255,255,.08)"}`,background:cat===c.id?"#7B61FF":"transparent",color:cat===c.id?"#fff":"#555",fontSize:12,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,transition:"all .15s"}}>
                  {c.icon} {c.label}
                </button>
              ))}
              <div style={{flex:1,minWidth:4}}/>
              {/* View toggle pill — Full / Compact */}
              <div style={{display:"flex",background:"#1A1A1A",borderRadius:20,padding:3,border:"1px solid rgba(255,255,255,.08)",flexShrink:0,gap:2}}>
                <button className="tap" onClick={()=>setCompact(false)}
                  style={{padding:"4px 10px",borderRadius:16,border:"none",background:!compact?"#7B61FF":"transparent",color:!compact?"#fff":"#555",fontSize:11,fontWeight:700,cursor:"pointer",transition:"all .15s",whiteSpace:"nowrap"}}>
                  Full
                </button>
                <button className="tap" onClick={()=>setCompact(true)}
                  style={{padding:"4px 10px",borderRadius:16,border:"none",background:compact?"#7B61FF":"transparent",color:compact?"#fff":"#555",fontSize:11,fontWeight:700,cursor:"pointer",transition:"all .15s",whiteSpace:"nowrap"}}>
                  Compact
                </button>
              </div>
              {/* Search icon */}
              <button className="tap" onClick={()=>setSearchOpen(true)}
                style={{width:30,height:30,borderRadius:9,background:"#1A1A1A",border:"1px solid #222",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="#555" strokeWidth="2.5"/>
                  <path d="M21 21l-4.35-4.35" stroke="#555" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </button>
              {/* Bell */}
              <button className="tap" onClick={()=>{if(!user){setAuthMode("login");return;}setShowNotif(true);}}
                style={{width:30,height:30,borderRadius:9,background:"#1A1A1A",border:"1px solid #222",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,position:"relative"}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                {notifs.length>0&&<span style={{position:"absolute",top:5,right:5,width:6,height:6,borderRadius:"50%",background:"#7B61FF",border:"2px solid #0A0A0A"}}/>}
              </button>
            </div>
          )}

          {/* Search expanded — replaces the row */}
          {searchOpen&&(
            <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",animation:"fadeUp .15s ease"}}>
              <div style={{flex:1,position:"relative"}}>
                <svg style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)"}} width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="#555" strokeWidth="2.5"/>
                  <path d="M21 21l-4.35-4.35" stroke="#555" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
                <input autoFocus value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search deals, stores…"
                  style={{width:"100%",padding:"8px 30px 8px 28px",borderRadius:10,border:"1.5px solid #7B61FF",background:"#111",color:"#fff",fontSize:14,fontWeight:500}}/>
                {search&&<button onClick={()=>setSearch("")} style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"#444",fontSize:14,cursor:"pointer",lineHeight:1}}>✕</button>}
              </div>
              <button className="tap" onClick={()=>{setSearchOpen(false);setSearch("");}}
                style={{background:"none",border:"none",color:"#7B61FF",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0,padding:"4px 0"}}>
                Cancel
              </button>
            </div>
          )}

        </header>
      )}

      {tab==="home"&&(
        <div style={{padding:"8px 16px 110px"}}>
          {filtered.map((d,i)=><DealCard key={d.id} d={d} wishlist={wishlist} onWish={toggleWish} onToast={addToast} onGetDeal={setActiveDeal} compact={compact} delay={i*.04}/>)}
          {filtered.length===0&&<div style={{textAlign:"center",padding:"60px 0"}}><div style={{fontSize:52,marginBottom:12}}>🔍</div><div style={{fontWeight:800,fontSize:18,color:"#fff"}}>No deals found</div></div>}
        </div>
      )}

      {tab==="saved"   && <SavedTab wishlist={wishlist} onWish={toggleWish} onToast={addToast} onGetDeal={setActiveDeal}/>}
      {tab==="alerts"  && <AlertsTab user={user} onSignIn={()=>setAuthMode("login")} tracked={tracked} onUntrack={toggleTrack}/>}
      {tab==="profile" && <ProfileTab user={user} wishlist={wishlist} tracked={tracked} onSignIn={()=>setAuthMode("signup")} onSignOut={handleOut} isAdmin={isAdmin} onAddDeal={()=>setShowAddDeal(true)}/>}

      <nav style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"rgba(10,10,10,.97)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderTop:"1px solid #1E1E1E",display:"flex",zIndex:200,paddingBottom:"env(safe-area-inset-bottom,8px)"}}>
        {NAV.map(n=>{
          const active=tab===n.id;
          return (
            <button key={n.id} className="tap" onClick={()=>setTab(n.id)}
              style={{flex:1,padding:"12px 4px 8px",border:"none",background:"transparent",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4,position:"relative"}}>
              <NavIcon icon={n.icon} active={active}/>
              <span style={{fontSize:11,fontWeight:600,color:active?"#7B61FF":"#555"}}>{n.label}</span>
              {n.badge>0&&<span style={{position:"absolute",top:8,right:"calc(50% - 14px)",background:"#E8174A",color:"#fff",fontSize:9,fontWeight:800,minWidth:16,height:16,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 3px",border:"2px solid #0A0A0A"}}>{n.badge}</span>}
            </button>
          );
        })}
      </nav>

      <div style={{position:"fixed",bottom:90,left:"50%",transform:"translateX(-50%)",zIndex:9999,display:"flex",flexDirection:"column",gap:8,width:"calc(100% - 32px)",maxWidth:420,pointerEvents:"none"}}>
        {toasts.map(t=>(
          <div key={t.id} style={{background:"#1A1A1A",border:"1px solid #2A2A2A",borderRadius:16,padding:"14px 18px",display:"flex",alignItems:"center",gap:12,animation:"fadeUp .35s cubic-bezier(.34,1.56,.64,1)",boxShadow:"0 8px 32px rgba(0,0,0,.5)",pointerEvents:"all"}}>
            <span style={{fontSize:22}}>{t.icon}</span>
            <span style={{flex:1,color:"#fff",fontSize:14,fontWeight:600}}>{t.msg}</span>
          </div>
        ))}
      </div>

      {/* ── Admin FAB ── */}
      {isAdmin&&tab==="home"&&(
        <button className="tap" onClick={()=>setShowAddDeal(true)}
          style={{position:"fixed",bottom:90,right:20,width:52,height:52,borderRadius:"50%",border:"none",background:"linear-gradient(135deg,#7B61FF,#9B4DFF)",color:"#fff",fontSize:24,cursor:"pointer",zIndex:300,boxShadow:"0 4px 20px rgba(123,97,255,.6)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          +
        </button>
      )}

      {showAddDeal&&<AddDealSheet onClose={()=>setShowAddDeal(false)} onAdd={addDeal}/>}
      {activeDeal  &&<DealSheet   d={activeDeal} onClose={()=>setActiveDeal(null)}/>}
      {authMode  &&<AuthSheet  mode={authMode} onClose={()=>setAuthMode(null)} onAuth={handleAuth}/>}
      {showNotif &&<NotifSheet notifs={notifs}  onClear={()=>setNotifs([])}    onClose={()=>setShowNotif(false)}/>}
    </div>
  );
}
