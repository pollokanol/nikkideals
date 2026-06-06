import { useState, useEffect, useRef } from "react";

// ─── Admin ────────────────────────────────────────────────────────
const ADMIN_EMAIL = "admin@nikkideals.com";

// ─── Deals Data ───────────────────────────────────────────────────
const INITIAL_DEALS = [
  { id:1,  title:"Sony WH-1000XM5",   sub:"Noise Cancelling Headphones", cat:"Electronics", img:"https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&h=400&fit=crop", was:349,  now:199, store:"Amazon",    storeLogo:"🛒", pct:43, timer:"05:14:00", badge:"HOT",      hot:true  },
  { id:2,  title:"Nike Air Max 270",  sub:"Men's Running Shoes",          cat:"Fashion",     img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=400&fit=crop", was:150,  now:74,  store:"Nike",      storeLogo:"✔",  pct:51, timer:null,       badge:"TRENDING", hot:true  },
  { id:3,  title:"Instant Pot Duo",   sub:"7-in-1 Pressure Cooker",       cat:"Home",        img:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=400&fit=crop", was:99,   now:49,  store:"Walmart",   storeLogo:"⭐", pct:50, timer:null,       badge:"DEAL",     hot:false },
  { id:4,  title:"iPad 10th Gen",     sub:"64GB Wi-Fi — Blue",            cat:"Electronics", img:"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=400&fit=crop", was:449,  now:329, store:"Best Buy",  storeLogo:"💛", pct:27, timer:"03:45:00", badge:"FLASH",    hot:true  },
  { id:5,  title:"Levi's 501 Jeans",  sub:"Original Straight Fit",        cat:"Fashion",     img:"https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=400&fit=crop", was:89,   now:39,  store:"Levi's",    storeLogo:"👖", pct:56, timer:null,       badge:"SALE",     hot:false },
  { id:6,  title:"Dyson V11 Vacuum",  sub:"Cordless, 60-min runtime",     cat:"Home",        img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop", was:599,  now:369, store:"Dyson",     storeLogo:"🌀", pct:38, timer:"08:10:00", badge:"FLASH",    hot:true  },
  { id:7,  title:"MacBook Air M2",    sub:"13\" Midnight",                 cat:"Electronics", img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=400&fit=crop", was:1099, now:849, store:"Apple",    storeLogo:"🍎", pct:23, timer:null,       badge:"DEAL",     hot:false },
  { id:8,  title:"Adidas Ultraboost", sub:"Running — Core Black",         cat:"Fashion",     img:"https://images.unsplash.com/photo-1608231387042-66d1773d3028?w=500&h=400&fit=crop", was:190,  now:109, store:"Adidas",    storeLogo:"🏃", pct:43, timer:"04:55:00", badge:"TRENDING", hot:false },
  { id:9,  title:"KitchenAid Mixer",  sub:"5-Qt Stand Mixer, Red",        cat:"Home",        img:"https://images.unsplash.com/photo-1556909211-36987daf7b4d?w=500&h=400&fit=crop", was:449,  now:279, store:"W. Sonoma",  storeLogo:"🎂", pct:38, timer:null,       badge:"HOT",      hot:true  },
  { id:10, title:"Kindle Paperwhite", sub:"16GB Waterproof E-Reader",     cat:"Electronics", img:"https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&h=400&fit=crop", was:139,  now:84,  store:"Amazon",    storeLogo:"🛒", pct:40, timer:"03:20:00", badge:"FLASH",    hot:false },
  { id:11, title:"Stanley Quencher",  sub:"H2.0 40oz Tumbler",            cat:"Home",        img:"https://images.unsplash.com/photo-1635348729200-8b0f2bb00f31?w=500&h=400&fit=crop", was:40,   now:19,  store:"Target",    storeLogo:"🎯", pct:52, timer:"02:18:00", badge:"FLASH",    hot:true  },
  { id:12, title:"Beats Studio Pro",  sub:"Wireless Headphones, Black",   cat:"Electronics", img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop", was:349,  now:179, store:"Best Buy",  storeLogo:"💛", pct:49, timer:null,       badge:"SALE",     hot:true  },
];

const BADGE_META = {
  HOT:     { label:"🔥 Hot",     bg:"#FF3B5C", text:"#fff" },
  FLASH:   { label:"⚡ Flash",   bg:"#00C06A", text:"#fff" },
  TRENDING:{ label:"📈 Trending",bg:"#FF6B00", text:"#fff" },
  SALE:    { label:"🏷 Sale",    bg:"#6366F1", text:"#fff" },
  DEAL:    { label:"💸 Deal",    bg:"#0EA5E9", text:"#fff" },
};

const CATS = ["All","Electronics","Fashion","Home"];
const fp  = p => `$${Number(p).toFixed(0)}`;
const uid = () => Math.random().toString(36).slice(2,9);

// ─── Theme tokens ─────────────────────────────────────────────────
const THEMES = {
  light: {
    bg:       "#F8F8FC",
    surface:  "#FFFFFF",
    surface2: "#F2F2F8",
    border:   "#EBEBF0",
    text:     "#0F0F18",
    text2:    "#6B6B80",
    text3:    "#AEAEBB",
    accent:   "#6366F1",
    accentBg: "#EEF0FF",
    nav:      "rgba(255,255,255,0.92)",
    header:   "rgba(248,248,252,0.92)",
    shadow:   "rgba(0,0,0,0.07)",
    shadowMd: "rgba(0,0,0,0.12)",
  },
  dark: {
    bg:       "#0C0C14",
    surface:  "#15151F",
    surface2: "#1E1E2C",
    border:   "#2A2A3A",
    text:     "#F0F0FF",
    text2:    "#8888AA",
    text3:    "#4A4A66",
    accent:   "#818CF8",
    accentBg: "#1E1E3A",
    nav:      "rgba(15,15,22,0.94)",
    header:   "rgba(12,12,20,0.94)",
    shadow:   "rgba(0,0,0,0.4)",
    shadowMd: "rgba(0,0,0,0.6)",
  }
};

// ─── CSS ──────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@700&display=swap');

  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; -webkit-tap-highlight-color:transparent; }
  html { scroll-behavior:smooth; }
  body { font-family:'Outfit',sans-serif; overscroll-behavior-y:none; }
  ::-webkit-scrollbar { width:6px; height:6px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:rgba(128,128,160,0.3); border-radius:3px; }
  input, select, button, textarea { font-family:inherit; -webkit-appearance:none; }
  input:focus, select:focus, textarea:focus { outline:none; }
  img { display:block; }

  /* Animations */
  @keyframes fadeUp    { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
  @keyframes sheetUp   { from{transform:translateY(100%)} to{transform:translateY(0)} }
  @keyframes scaleIn   { from{opacity:0;transform:scale(.94)} to{opacity:1;transform:scale(1)} }
  @keyframes pulse     { 0%,100%{opacity:1} 50%{opacity:.4} }
  @keyframes shimmer   { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes timerBlink{ 0%,100%{opacity:1} 50%{opacity:.55} }
  @keyframes spinOnce  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

  .tap { transition:transform .12s ease,opacity .12s ease; cursor:pointer; }
  .tap:active { transform:scale(.93); opacity:.75; }
  .card-hover { transition:transform .22s cubic-bezier(.34,1.2,.64,1), box-shadow .22s ease; }
  .card-hover:hover { transform:translateY(-4px); }
  .card-hover:active { transform:scale(.98); }
  .live { animation:pulse 2s ease-in-out infinite; }
  .timer { animation:timerBlink 1s ease-in-out infinite; font-family:'JetBrains Mono',monospace; }

  /* Responsive grid */
  .deals-grid {
    display:grid;
    gap:20px;
    grid-template-columns:1fr;
  }
  @media(min-width:600px) {
    .deals-grid { grid-template-columns:repeat(2,1fr); }
  }
  @media(min-width:900px) {
    .deals-grid { grid-template-columns:repeat(3,1fr); }
  }
  @media(min-width:1200px) {
    .deals-grid { grid-template-columns:repeat(4,1fr); }
  }

  /* Desktop sidebar layout */
  .app-layout {
    display:flex;
    flex-direction:column;
    min-height:100vh;
  }
  @media(min-width:768px) {
    .app-layout { flex-direction:row; }
    .sidebar { display:flex!important; }
    .mobile-nav { display:none!important; }
    .main-content { margin-left:220px; }
  }
  @media(max-width:767px) {
    .sidebar { display:none!important; }
    .main-content { margin-left:0; padding-bottom:80px; }
  }

  /* Sheet backdrop */
  .sheet-backdrop {
    position:fixed; inset:0; z-index:900;
    animation:fadeIn .2s ease;
  }
  .sheet-panel {
    position:absolute; bottom:0; left:0; right:0;
    border-radius:28px 28px 0 0;
    padding:0 22px 48px;
    animation:sheetUp .38s cubic-bezier(.32,.72,0,1);
    max-height:92vh; overflow-y:auto;
  }
  .modal-panel {
    position:absolute; top:50%; left:50%;
    transform:translate(-50%,-50%);
    border-radius:24px;
    padding:32px;
    animation:scaleIn .25s cubic-bezier(.34,1.2,.64,1);
    width:min(480px,calc(100vw - 40px));
    max-height:90vh; overflow-y:auto;
  }
  @media(min-width:768px) {
    .sheet-panel { max-width:560px; left:50%; right:auto; transform:translateX(-50%); border-radius:24px 24px 0 0; }
  }
`;

// ─── useTheme ──────────────────────────────────────────────────────
function useTheme() {
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem("nd-theme")==="dark"; } catch { return false; }
  });
  const toggle = () => setDark(d => {
    try { localStorage.setItem("nd-theme", !d?"dark":"light"); } catch {}
    return !d;
  });
  const t = dark ? THEMES.dark : THEMES.light;
  return { dark, toggle, t };
}

// ─── useBreakpoint ─────────────────────────────────────────────────
function useBreakpoint() {
  const [w, setW] = useState(typeof window!=="undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return { isDesktop: w >= 768, isMobile: w < 768, isWide: w >= 1200, width: w };
}

// ─── Timer component ───────────────────────────────────────────────
function TimerDisplay({ time, t }) {
  const [val, setVal] = useState(time);
  useEffect(() => {
    const iv = setInterval(() => {
      setVal(p => {
        const [h,m,s] = p.split(":").map(Number);
        let ts = h*3600+m*60+s-1; if(ts<0) ts=0;
        return [Math.floor(ts/3600),Math.floor((ts%3600)/60),ts%60].map(n=>String(n).padStart(2,"0")).join(":");
      });
    }, 1000);
    return () => clearInterval(iv);
  }, []);
  return (
    <span className="timer" style={{fontSize:11,color:t.text2,background:t.surface2,padding:"3px 8px",borderRadius:8,letterSpacing:.5}}>
      ⏱ {val}
    </span>
  );
}

// ─── DealCard ──────────────────────────────────────────────────────
function DealCard({ d, wishlist, tracked, onWish, onTrack, onGet, t, delay=0 }) {
  const saved    = wishlist.includes(d.id);
  const tracking = tracked.includes(d.id);
  const saving   = d.was - d.now;
  const bm       = BADGE_META[d.badge] || BADGE_META.DEAL;

  return (
    <div className="card-hover" style={{
      background:t.surface, borderRadius:20,
      border:`1px solid ${t.border}`,
      boxShadow:`0 2px 16px ${t.shadow}`,
      overflow:"hidden",
      animation:`fadeUp .4s ${delay}s both`,
      display:"flex", flexDirection:"column",
    }}>
      {/* Image */}
      <div style={{position:"relative",height:180,background:t.surface2,overflow:"hidden",flexShrink:0}}>
        <img src={d.img} alt={d.title}
          style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"}}
          onError={e=>e.target.style.display="none"}/>
        {/* Gradient overlay */}
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.5) 0%,transparent 50%)"}}/>
        {/* Top badges */}
        <div style={{position:"absolute",top:12,left:12,display:"flex",flexDirection:"column",gap:5}}>
          <span style={{background:bm.bg,color:bm.text,fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20,letterSpacing:.3}}>
            {bm.label}
          </span>
          {d.timer && <TimerDisplay time={d.timer} t={t}/>}
        </div>
        {/* Discount */}
        <div style={{position:"absolute",top:12,right:12,background:"rgba(0,0,0,.6)",backdropFilter:"blur(8px)",color:"#fff",fontSize:12,fontWeight:800,padding:"4px 10px",borderRadius:12}}>
          -{d.pct}%
        </div>
        {/* Heart */}
        <button className="tap" onClick={()=>onWish(d.id)}
          style={{position:"absolute",bottom:12,right:12,width:32,height:32,borderRadius:"50%",border:"none",background:saved?"#FF3B5C":"rgba(0,0,0,.45)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15}}>
          {saved ? "❤️" : "🤍"}
        </button>
        {/* Store chip */}
        <div style={{position:"absolute",bottom:12,left:12,background:"rgba(0,0,0,.55)",backdropFilter:"blur(6px)",borderRadius:10,padding:"4px 10px",display:"flex",alignItems:"center",gap:5}}>
          <span style={{fontSize:13}}>{d.storeLogo}</span>
          <span style={{fontSize:11,color:"#fff",fontWeight:600}}>{d.store}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{padding:"14px 16px 14px",flex:1,display:"flex",flexDirection:"column",gap:6}}>
        <div style={{fontSize:11,fontWeight:600,color:t.accent,letterSpacing:.5,textTransform:"uppercase"}}>{d.cat}</div>
        <div style={{fontWeight:800,fontSize:16,color:t.text,lineHeight:1.25,letterSpacing:"-.2px"}}>{d.title}</div>
        <div style={{fontSize:13,color:t.text3,fontStyle:"italic",flex:1}}>{d.sub}</div>

        {/* Price row */}
        <div style={{display:"flex",alignItems:"center",gap:8,marginTop:6}}>
          <span style={{fontWeight:900,fontSize:24,color:t.text,letterSpacing:"-.8px"}}>{fp(d.now)}</span>
          <span style={{fontSize:13,color:t.text3,textDecoration:"line-through"}}>{fp(d.was)}</span>
          <span style={{marginLeft:"auto",fontSize:12,color:"#00C06A",fontWeight:700}}>Save {fp(saving)}</span>
        </div>

        {/* Actions */}
        <div style={{display:"flex",gap:8,marginTop:4}}>
          <button className="tap" onClick={()=>onTrack(d.id)}
            style={{flex:1,padding:"9px 0",borderRadius:12,border:`1.5px solid ${tracking?"#00C06A":t.border}`,background:tracking?`#00C06A18`:"transparent",color:tracking?"#00C06A":t.text3,fontSize:12,fontWeight:700}}>
            {tracking ? "🔔 On" : "Track"}
          </button>
          <button className="tap" onClick={()=>onGet(d)}
            style={{flex:2,padding:"9px 0",borderRadius:12,border:"none",background:t.accent,color:"#fff",fontSize:13,fontWeight:800,boxShadow:`0 4px 16px ${t.accent}55`}}>
            Get Deal →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Deal Code Sheet ───────────────────────────────────────────────
function DealSheet({ d, t, onClose }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(d.code||"NODEAL").catch(()=>{});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };
  const code = d.code || `SAVE${d.pct}`;
  const saving = d.was - d.now;
  return (
    <div className="sheet-backdrop" onClick={onClose} style={{background:"rgba(0,0,0,.6)",backdropFilter:"blur(10px)"}}>
      <div className="sheet-panel" onClick={e=>e.stopPropagation()} style={{background:t.surface,borderTop:`1px solid ${t.border}`}}>
        <div style={{width:38,height:4,borderRadius:2,background:t.border,margin:"14px auto 22px"}}/>

        {/* Product summary */}
        <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:24}}>
          <div style={{width:68,height:68,borderRadius:16,overflow:"hidden",background:t.surface2,flexShrink:0}}>
            <img src={d.img} alt={d.title} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontWeight:800,fontSize:16,color:t.text,marginBottom:2}}>{d.title}</div>
            <div style={{fontSize:13,color:t.text2,marginBottom:6}}>{d.store}</div>
            <div style={{display:"flex",alignItems:"baseline",gap:8}}>
              <span style={{fontWeight:900,fontSize:20,color:t.accent}}>{fp(d.now)}</span>
              <span style={{fontSize:13,color:t.text3,textDecoration:"line-through"}}>{fp(d.was)}</span>
              <span style={{fontSize:12,background:`${t.accent}22`,color:t.accent,padding:"2px 8px",borderRadius:8,fontWeight:700}}>-{d.pct}%</span>
            </div>
          </div>
        </div>

        {/* Step 1 */}
        <div style={{fontSize:11,fontWeight:700,color:t.text3,letterSpacing:"1px",textTransform:"uppercase",marginBottom:10}}>Step 1 — Copy your code</div>
        <div style={{display:"flex",alignItems:"center",gap:12,background:t.surface2,borderRadius:16,padding:"14px 16px",border:`2px dashed ${copied?"#00C06A":t.accent}`,marginBottom:copied?6:20,transition:"border-color .3s"}}>
          <span style={{flex:1,fontFamily:"'JetBrains Mono',monospace",fontSize:18,fontWeight:700,color:copied?"#00C06A":t.text,letterSpacing:2,transition:"color .3s"}}>{code}</span>
          <button className="tap" onClick={copy}
            style={{padding:"9px 20px",borderRadius:10,border:"none",background:copied?"#00C06A":t.accent,color:"#fff",fontWeight:700,fontSize:13,boxShadow:`0 2px 10px ${copied?"#00C06A":t.accent}44`}}>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        {copied && <div style={{fontSize:12,color:"#00C06A",fontWeight:700,marginBottom:16,paddingLeft:2}}>Paste at checkout — saves you {fp(saving)}</div>}

        {/* Step 2 */}
        <div style={{fontSize:11,fontWeight:700,color:t.text3,letterSpacing:"1px",textTransform:"uppercase",marginBottom:10}}>Step 2 — Go to store</div>
        <button className="tap" onClick={()=>{copy();window.open(d.url||"#","_blank");}}
          style={{width:"100%",padding:"16px",borderRadius:16,border:"none",background:t.accent,color:"#fff",fontWeight:800,fontSize:15,display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:16,boxShadow:`0 4px 20px ${t.accent}44`}}>
          <span>{d.storeLogo}</span> Go to {d.store} →
        </button>

        {/* Savings callout */}
        <div style={{background:t.surface2,borderRadius:14,padding:"12px 16px",display:"flex",alignItems:"center",gap:10,border:`1px solid ${t.border}`}}>
          <span style={{fontSize:22}}>💰</span>
          <div>
            <div style={{fontWeight:700,color:t.text,fontSize:14}}>You're saving {fp(saving)} on this deal</div>
            <div style={{fontSize:12,color:t.text3,marginTop:1}}>Limited time · expires soon</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Auth Modal/Sheet ──────────────────────────────────────────────
function AuthModal({ mode, t, isDesktop, onClose, onAuth }) {
  const [isLogin, setIsLogin] = useState(mode==="login");
  const [form, setForm]       = useState({name:"",email:"",password:""});
  const [prefs, setPrefs]     = useState({deals:true,drops:true,wish:true});
  const [err, setErr]         = useState("");

  const submit = () => {
    if(!form.email||!form.password){setErr("Please fill in all fields");return;}
    if(!isLogin&&!form.name){setErr("What should we call you?");return;}
    onAuth({name:form.name||form.email.split("@")[0],email:form.email,prefs});
  };

  const inpSt = {
    width:"100%",padding:"13px 16px",borderRadius:14,
    border:`1.5px solid ${t.border}`,background:t.surface2,
    color:t.text,fontSize:15,fontWeight:500,marginBottom:12,display:"block",transition:"border .15s"
  };

  const PanelClass = isDesktop ? "modal-panel" : "sheet-panel";

  return (
    <div className="sheet-backdrop" onClick={onClose} style={{background:"rgba(0,0,0,.65)",backdropFilter:"blur(12px)"}}>
      <div className={PanelClass} onClick={e=>e.stopPropagation()} style={{background:t.surface,border:`1px solid ${t.border}`,...(!isDesktop?{borderTop:"none"}:{})}}>
        {!isDesktop && <div style={{width:38,height:4,borderRadius:2,background:t.border,margin:"14px auto 22px"}}/>}
        {isDesktop && <button onClick={onClose} style={{position:"absolute",top:16,right:16,width:32,height:32,borderRadius:10,border:`1px solid ${t.border}`,background:t.surface2,color:t.text2,fontSize:16,cursor:"pointer"}}>✕</button>}

        <div style={{textAlign:"center",marginBottom:24,marginTop:isDesktop?8:0}}>
          <div style={{fontSize:36,marginBottom:8}}>{isLogin?"👋":"🎉"}</div>
          <div style={{fontWeight:900,fontSize:24,color:t.text,marginBottom:4,letterSpacing:"-.4px"}}>{isLogin?"Welcome back":"Join nikkideals"}</div>
          <div style={{color:t.text2,fontSize:14}}>{isLogin?"Your deals are waiting":"Free · alerts · wishlist · tracking"}</div>
        </div>

        {err && <div style={{background:"rgba(255,59,92,.12)",border:"1.5px solid rgba(255,59,92,.3)",borderRadius:12,padding:"11px 14px",color:"#FF3B5C",fontSize:13,fontWeight:700,marginBottom:14}}>⚠️ {err}</div>}

        {!isLogin && <input placeholder="First name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} style={inpSt} onFocus={e=>e.target.style.borderColor=t.accent} onBlur={e=>e.target.style.borderColor=t.border}/>}
        <input placeholder="Email address" type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} style={inpSt} onFocus={e=>e.target.style.borderColor=t.accent} onBlur={e=>e.target.style.borderColor=t.border}/>
        <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} style={inpSt} onFocus={e=>e.target.style.borderColor=t.accent} onBlur={e=>e.target.style.borderColor=t.border}/>

        {!isLogin && (
          <div style={{background:t.surface2,borderRadius:18,padding:"14px",marginBottom:16,border:`1px solid ${t.border}`}}>
            <div style={{fontSize:11,fontWeight:700,color:t.text3,letterSpacing:"1.2px",textTransform:"uppercase",marginBottom:12}}>Alert preferences</div>
            {[{k:"deals",l:"🔥 New hot deals"},{k:"drops",l:"📉 Price drops"},{k:"wish",l:"⭐ Wishlist updates"}].map(({k,l})=>(
              <div key={k} onClick={()=>setPrefs(p=>({...p,[k]:!p[k]}))}
                style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${t.border}`,cursor:"pointer"}}>
                <span style={{color:t.text,fontSize:14,fontWeight:600}}>{l}</span>
                <div style={{width:46,height:26,borderRadius:13,background:prefs[k]?t.accent:t.border,transition:"background .2s",position:"relative",flexShrink:0}}>
                  <div style={{position:"absolute",top:3,left:prefs[k]?23:3,width:20,height:20,borderRadius:"50%",background:"#fff",transition:"left .2s",boxShadow:"0 1px 4px rgba(0,0,0,.2)"}}/>
                </div>
              </div>
            ))}
          </div>
        )}

        <button className="tap" onClick={submit}
          style={{width:"100%",padding:"15px",borderRadius:16,border:"none",background:t.accent,color:"#fff",fontWeight:800,fontSize:16,marginBottom:14,boxShadow:`0 4px 20px ${t.accent}44`}}>
          {isLogin ? "Sign In →" : "Create Account →"}
        </button>
        <div style={{textAlign:"center",color:t.text3,fontSize:13}}>
          {isLogin ? "No account? " : "Already a member? "}
          <span onClick={()=>{setIsLogin(!isLogin);setErr("");}} style={{color:t.accent,fontWeight:700,cursor:"pointer"}}>
            {isLogin ? "Sign up free" : "Sign in"}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Add Deal Sheet ────────────────────────────────────────────────
const STORE_MAP = {
  "amazon.com": {name:"Amazon",  logo:"🛒",url:"https://amazon.com"},
  "target.com": {name:"Target",  logo:"🎯",url:"https://target.com"},
  "bestbuy.com":{name:"Best Buy",logo:"💛",url:"https://bestbuy.com"},
  "nike.com":   {name:"Nike",    logo:"✔", url:"https://nike.com"},
  "apple.com":  {name:"Apple",   logo:"🍎",url:"https://apple.com"},
  "walmart.com":{name:"Walmart", logo:"⭐",url:"https://walmart.com"},
};

function AddDealSheet({ t, onClose, onAdd }) {
  const [step,setStep] = useState("url");
  const [url,setUrl]   = useState("");
  const [aiErr,setAiErr] = useState("");
  const [form,setForm] = useState({title:"",sub:"",was:"",now:"",code:"",badge:"HOT",cat:"Electronics",timer:"",img:"",store:"",storeLogo:"",url:""});

  const detectStore = u => {
    try {
      const host = new URL(u).hostname.replace("www.","");
      for(const [d,i] of Object.entries(STORE_MAP)) if(host.includes(d)) return {...i};
    } catch {}
    return {name:"Store",logo:"🔗",url:u};
  };

  const analyze = async () => {
    if(!url.trim()) return;
    setStep("loading"); setAiErr("");
    const s = detectStore(url);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:800,
          messages:[{role:"user",content:`Product URL: ${url}\nReturn ONLY this JSON (no markdown):\n{"title":"","sub":"","was":0,"now":0,"code":"","cat":"Electronics","badge":"HOT","img":""}`}]
        })
      });
      const data = await res.json();
      const text = data.content?.find(b=>b.type==="text")?.text||"{}";
      const p = JSON.parse(text.replace(/```json|```/g,"").trim());
      setForm({...p,store:s.name,storeLogo:s.logo,url:s.url||url,timer:""});
      setStep("edit");
    } catch {
      setForm(f=>({...f,store:s.name,storeLogo:s.logo,url:s.url||url}));
      setAiErr("Auto-fill failed — please fill in manually.");
      setStep("edit");
    }
  };

  const save = () => {
    if(!form.title||!form.now) return;
    const was=Number(form.was)||0, now=Number(form.now)||0;
    onAdd({id:Date.now(),title:form.title,sub:form.sub,cat:form.cat||"Electronics",
      img:form.img||"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop",
      was,now,store:form.store,storeLogo:form.storeLogo,
      pct:was>0?Math.round((1-now/was)*100):0,
      timer:form.timer||null,badge:form.badge||"DEAL",
      code:form.code,url:form.url,hot:false});
    onClose();
  };

  const inpSt = {width:"100%",padding:"11px 14px",borderRadius:12,border:`1.5px solid ${t.border}`,background:t.surface2,color:t.text,fontSize:14,fontWeight:500,marginBottom:10,display:"block",transition:"border .15s"};
  const focus = e=>e.target.style.borderColor=t.accent;
  const blur  = e=>e.target.style.borderColor=t.border;

  return (
    <div className="sheet-backdrop" onClick={onClose} style={{background:"rgba(0,0,0,.7)",backdropFilter:"blur(12px)"}}>
      <div className="sheet-panel" onClick={e=>e.stopPropagation()} style={{background:t.surface,borderTop:`1px solid ${t.border}`}}>
        <div style={{width:38,height:4,borderRadius:2,background:t.border,margin:"14px auto 20px"}}/>

        {step==="url" && (
          <>
            <div style={{marginBottom:20}}>
              <div style={{fontWeight:900,fontSize:22,color:t.text,marginBottom:4}}>+ Add a Deal</div>
              <div style={{fontSize:13,color:t.text2}}>Paste a product URL — AI fills in the details</div>
            </div>
            <input autoFocus value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://amazon.com/product/..."
              onKeyDown={e=>e.key==="Enter"&&analyze()}
              style={{...inpSt,border:`1.5px solid ${t.accent}`,fontSize:15,marginBottom:14}} onFocus={focus} onBlur={blur}/>
            <button className="tap" onClick={analyze} disabled={!url.trim()}
              style={{width:"100%",padding:"14px",borderRadius:16,border:"none",background:url.trim()?t.accent:t.border,color:url.trim()?"#fff":t.text3,fontWeight:800,fontSize:15,marginBottom:12}}>
              Analyze with AI →
            </button>
            <div style={{textAlign:"center"}}>
              <span onClick={()=>setStep("edit")} style={{color:t.text3,fontSize:13,cursor:"pointer"}}>or fill in manually</span>
            </div>
          </>
        )}

        {step==="loading" && (
          <div style={{textAlign:"center",padding:"52px 20px"}}>
            <div style={{fontSize:52,marginBottom:14,animation:"spinOnce 2s linear infinite",display:"inline-block"}}>🤖</div>
            <div style={{fontWeight:800,fontSize:18,color:t.text,marginBottom:6}}>Analyzing URL...</div>
            <div style={{fontSize:13,color:t.text2}}>AI is extracting product details</div>
          </div>
        )}

        {step==="edit" && (
          <>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div>
                <div style={{fontWeight:900,fontSize:20,color:t.text,marginBottom:2}}>Review & Edit</div>
                <div style={{fontSize:12,color:t.text2}}>AI pre-filled — adjust before publishing</div>
              </div>
              <button onClick={()=>setStep("url")} style={{background:"none",border:"none",color:t.text3,fontSize:12,cursor:"pointer"}}>Back</button>
            </div>
            {aiErr && <div style={{background:"rgba(255,107,0,.12)",border:`1px solid rgba(255,107,0,.3)`,borderRadius:12,padding:"10px 14px",color:"#FF6B00",fontSize:13,fontWeight:700,marginBottom:14}}>⚠️ {aiErr}</div>}

            {/* Preview card */}
            <div style={{background:t.surface2,borderRadius:16,padding:"14px",marginBottom:18,display:"flex",gap:12,alignItems:"center",border:`1px solid ${t.border}`}}>
              <div style={{width:52,height:52,borderRadius:12,overflow:"hidden",background:t.border,flexShrink:0}}>
                {form.img && <img src={form.img} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:800,color:t.text,fontSize:14,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{form.title||"Product title"}</div>
                <div style={{color:t.text2,fontSize:12,marginTop:1}}>{form.store}</div>
                <div style={{display:"flex",gap:8,marginTop:4,alignItems:"baseline"}}>
                  <span style={{fontWeight:800,color:t.accent,fontSize:16}}>{form.now?fp(form.now):"-"}</span>
                  {form.was&&<span style={{color:t.text3,fontSize:12,textDecoration:"line-through"}}>{fp(form.was)}</span>}
                </div>
              </div>
            </div>

            <input placeholder="Product title *" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} style={inpSt} onFocus={focus} onBlur={blur}/>
            <input placeholder="Subtitle / variant" value={form.sub} onChange={e=>setForm(f=>({...f,sub:e.target.value}))} style={inpSt} onFocus={focus} onBlur={blur}/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:0}}>
              <input placeholder="Original price" type="number" value={form.was} onChange={e=>setForm(f=>({...f,was:e.target.value}))} style={inpSt} onFocus={focus} onBlur={blur}/>
              <input placeholder="Sale price *" type="number" value={form.now} onChange={e=>setForm(f=>({...f,now:e.target.value}))} style={inpSt} onFocus={focus} onBlur={blur}/>
            </div>
            <input placeholder="Coupon code" value={form.code} onChange={e=>setForm(f=>({...f,code:e.target.value}))} style={inpSt} onFocus={focus} onBlur={blur}/>
            <input placeholder="Image URL (optional)" value={form.img} onChange={e=>setForm(f=>({...f,img:e.target.value}))} style={inpSt} onFocus={focus} onBlur={blur}/>
            <input placeholder="Timer e.g. 02:00:00 (optional)" value={form.timer} onChange={e=>setForm(f=>({...f,timer:e.target.value}))} style={inpSt} onFocus={focus} onBlur={blur}/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
              <select value={form.cat} onChange={e=>setForm(f=>({...f,cat:e.target.value}))} style={{padding:"11px 14px",borderRadius:12,border:`1.5px solid ${t.border}`,background:t.surface2,color:t.text,fontSize:14}}>
                {["Electronics","Fashion","Home","Other"].map(c=><option key={c}>{c}</option>)}
              </select>
              <select value={form.badge} onChange={e=>setForm(f=>({...f,badge:e.target.value}))} style={{padding:"11px 14px",borderRadius:12,border:`1.5px solid ${t.border}`,background:t.surface2,color:t.text,fontSize:14}}>
                {Object.keys(BADGE_META).map(b=><option key={b}>{b}</option>)}
              </select>
            </div>
            <button className="tap" onClick={save} disabled={!form.title||!form.now}
              style={{width:"100%",padding:"15px",borderRadius:16,border:"none",background:(form.title&&form.now)?t.accent:t.border,color:(form.title&&form.now)?"#fff":t.text3,fontWeight:800,fontSize:15,boxShadow:(form.title&&form.now)?`0 4px 20px ${t.accent}44`:"none"}}>
              Publish Deal
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Sidebar (desktop) ─────────────────────────────────────────────
function Sidebar({ tab, setTab, t, dark, toggleTheme, user, wishlist, tracked, onSignIn, onSignOut, dealsCount }) {
  const items = [
    {id:"deals",    icon:"⚡", label:"Deals",    badge:dealsCount},
    {id:"saved",    icon:"⭐", label:"Saved",    badge:wishlist.length},
    {id:"tracking", icon:"📈", label:"Tracking", badge:tracked.length},
    {id:"account",  icon:"👤", label:"Account"},
  ];
  return (
    <div className="sidebar" style={{
      position:"fixed",top:0,left:0,bottom:0,width:220,
      background:t.surface,borderRight:`1px solid ${t.border}`,
      display:"flex",flexDirection:"column",padding:"24px 0",
      zIndex:100,
    }}>
      {/* Logo */}
      <div style={{padding:"0 20px 28px"}}>
        <div style={{fontWeight:900,fontSize:22,color:t.text,letterSpacing:"-.6px",lineHeight:1}}>
          nikki<span style={{color:t.accent}}>deals</span>
          <span style={{color:t.text3,fontSize:12,fontWeight:500}}>.com</span>
        </div>
        <div style={{fontSize:10,fontWeight:700,color:t.text3,letterSpacing:1.5,textTransform:"uppercase",marginTop:3}}>Best Deals Daily</div>
      </div>

      {/* Nav items */}
      <nav style={{flex:1,padding:"0 10px"}}>
        {items.map(item=>{
          const active=tab===item.id;
          return (
            <button key={item.id} className="tap" onClick={()=>setTab(item.id)}
              style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:"11px 14px",borderRadius:14,border:"none",background:active?t.accentBg:"transparent",color:active?t.accent:t.text2,fontSize:14,fontWeight:active?700:500,marginBottom:4,position:"relative",textAlign:"left"}}>
              <span style={{fontSize:18,lineHeight:1}}>{item.icon}</span>
              {item.label}
              {item.badge>0 && (
                <span style={{marginLeft:"auto",background:active?t.accent:"rgba(99,102,241,.2)",color:active?"#fff":t.accent,fontSize:10,fontWeight:800,padding:"2px 7px",borderRadius:10}}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom controls */}
      <div style={{padding:"16px 10px 0",borderTop:`1px solid ${t.border}`}}>
        {/* Theme toggle */}
        <button className="tap" onClick={toggleTheme}
          style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:"11px 14px",borderRadius:14,border:"none",background:"transparent",color:t.text2,fontSize:14,fontWeight:500,marginBottom:4,textAlign:"left"}}>
          <span style={{fontSize:18}}>{dark?"☀️":"🌙"}</span>
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
        {/* User */}
        {user ? (
          <div style={{padding:"10px 14px",display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:34,height:34,borderRadius:10,background:t.accent,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,color:"#fff",fontSize:14,flexShrink:0}}>
              {user.name[0].toUpperCase()}
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontWeight:700,color:t.text,fontSize:13,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{user.name}</div>
              <button onClick={onSignOut} style={{background:"none",border:"none",color:t.text3,fontSize:11,cursor:"pointer",padding:0,textAlign:"left"}}>Sign out</button>
            </div>
          </div>
        ) : (
          <button className="tap" onClick={onSignIn}
            style={{width:"100%",padding:"11px 14px",borderRadius:14,border:"none",background:t.accent,color:"#fff",fontSize:14,fontWeight:700,marginTop:4,boxShadow:`0 4px 16px ${t.accent}44`}}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Mobile Nav ────────────────────────────────────────────────────
function MobileNav({ tab, setTab, t, wishlist, tracked }) {
  const items = [
    {id:"deals",    icon:"⚡", label:"Deals"},
    {id:"saved",    icon:"⭐", label:"Saved",    badge:wishlist.length},
    {id:"tracking", icon:"📈", label:"Track",    badge:tracked.length},
    {id:"account",  icon:"👤", label:"Me"},
  ];
  return (
    <nav className="mobile-nav" style={{
      position:"fixed",bottom:0,left:0,right:0,
      background:t.nav,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",
      borderTop:`1px solid ${t.border}`,display:"flex",zIndex:200,
      paddingBottom:"env(safe-area-inset-bottom,6px)",
    }}>
      {items.map(n=>{
        const active=tab===n.id;
        return (
          <button key={n.id} className="tap" onClick={()=>setTab(n.id)}
            style={{flex:1,padding:"10px 4px 6px",border:"none",background:"transparent",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,position:"relative"}}>
            {active && <div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:20,height:3,borderRadius:"0 0 3px 3px",background:t.accent}}/>}
            <span style={{fontSize:21,display:"inline-block",position:"relative"}}>
              {n.icon}
              {n.badge>0 && <span style={{position:"absolute",top:-4,right:-7,background:"#FF3B5C",color:"#fff",fontSize:9,fontWeight:900,minWidth:16,height:16,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 3px",border:`2px solid ${t.nav}`}}>{n.badge}</span>}
            </span>
            <span style={{fontSize:10,fontWeight:700,color:active?t.accent:t.text3}}>{n.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

// ─── Page: Deals ───────────────────────────────────────────────────
function DealsPage({ deals, wishlist, tracked, onWish, onTrack, onGet, t, user, onSignIn, isAdmin, onAddDeal }) {
  const [cat,setCat] = useState("All");
  const [sort,setSort] = useState("hot");
  const [search,setSearch] = useState("");
  const [searchOpen,setSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const { isDesktop } = useBreakpoint();

  useEffect(()=>{ if(searchOpen&&searchRef.current) searchRef.current.focus(); },[searchOpen]);

  const filtered = deals
    .filter(d=>(cat==="All"||d.cat===cat)&&(d.title+d.store).toLowerCase().includes(search.toLowerCase()))
    .sort((a,b)=>sort==="hot"?(b.hot?1:0)-(a.hot?1:0):sort==="disc"?b.pct-a.pct:sort==="low"?a.now-b.now:b.now-a.now);

  return (
    <div>
      {/* Page header */}
      <div style={{
        background:t.header,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",
        borderBottom:`1px solid ${t.border}`,
        position:"sticky",top:0,zIndex:50,
        padding:isDesktop?"14px 32px":"0 16px",
      }}>
        {/* Mobile: single row */}
        {!isDesktop && (
          searchOpen ? (
            <div style={{height:56,display:"flex",alignItems:"center",gap:10}}>
              <input ref={searchRef} value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search deals..."
                style={{flex:1,padding:"9px 14px",borderRadius:12,border:`1.5px solid ${t.accent}`,background:t.surface2,color:t.text,fontSize:14,fontWeight:500}}/>
              <button onClick={()=>{setSearchOpen(false);setSearch("");}} style={{background:"none",border:"none",color:t.text3,fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>Cancel</button>
            </div>
          ) : (
            <div style={{height:56,display:"flex",alignItems:"center",gap:8,overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
              <span style={{fontWeight:900,fontSize:17,color:t.text,flexShrink:0,marginRight:4,letterSpacing:"-.5px"}}>Deals<span style={{color:t.accent}}>.</span></span>
              {CATS.map(c=>(
                <button key={c} className="tap" onClick={()=>setCat(c)}
                  style={{padding:"5px 12px",borderRadius:20,border:`1px solid ${cat===c?t.accent:t.border}`,background:cat===c?t.accent:"transparent",color:cat===c?"#fff":t.text2,fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,transition:"all .15s"}}>
                  {c}
                </button>
              ))}
              <div style={{flex:1}}/>
              <button className="tap" onClick={()=>setSearchOpen(true)} style={{width:32,height:32,borderRadius:10,border:`1px solid ${t.border}`,background:t.surface2,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke={t.text3} strokeWidth="2.5"/><path d="M21 21l-4.35-4.35" stroke={t.text3} strokeWidth="2.5" strokeLinecap="round"/></svg>
              </button>
            </div>
          )
        )}

        {/* Desktop: full header row */}
        {isDesktop && (
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <div>
              <h1 style={{fontWeight:900,fontSize:24,color:t.text,letterSpacing:"-.6px",lineHeight:1}}>
                Today's Best Deals
                <span className="live" style={{display:"inline-block",width:8,height:8,borderRadius:"50%",background:"#00C06A",marginLeft:10,verticalAlign:"middle"}}/>
              </h1>
              <p style={{fontSize:13,color:t.text3,marginTop:2}}>{filtered.length} deals · updated hourly</p>
            </div>
            <div style={{flex:1}}/>
            {/* Search */}
            <div style={{position:"relative",width:260}}>
              <svg style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)"}} width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke={t.text3} strokeWidth="2.2"/><path d="M21 21l-4.35-4.35" stroke={t.text3} strokeWidth="2.2" strokeLinecap="round"/></svg>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search deals..."
                style={{width:"100%",padding:"9px 14px 9px 34px",borderRadius:12,border:`1.5px solid ${t.border}`,background:t.surface2,color:t.text,fontSize:14,fontWeight:500,transition:"border .15s"}}
                onFocus={e=>e.target.style.borderColor=t.accent} onBlur={e=>e.target.style.borderColor=t.border}/>
            </div>
            {/* Sort */}
            <select value={sort} onChange={e=>setSort(e.target.value)}
              style={{padding:"9px 14px",borderRadius:12,border:`1.5px solid ${t.border}`,background:t.surface2,color:t.text2,fontSize:13,fontWeight:600,cursor:"pointer"}}>
              <option value="hot">🔥 Trending</option>
              <option value="disc">💸 Top Discount</option>
              <option value="low">$ Low to High</option>
              <option value="high">$ High to Low</option>
            </select>
            {/* Categories */}
            <div style={{display:"flex",gap:6}}>
              {CATS.map(c=>(
                <button key={c} className="tap" onClick={()=>setCat(c)}
                  style={{padding:"7px 14px",borderRadius:20,border:`1px solid ${cat===c?t.accent:t.border}`,background:cat===c?t.accent:t.surface2,color:cat===c?"#fff":t.text2,fontSize:13,fontWeight:700,cursor:"pointer",transition:"all .15s",boxShadow:cat===c?`0 4px 14px ${t.accent}44`:"none"}}>
                  {c}
                </button>
              ))}
            </div>
            {isAdmin && (
              <button className="tap" onClick={onAddDeal}
                style={{padding:"9px 18px",borderRadius:12,border:"none",background:t.accent,color:"#fff",fontWeight:700,fontSize:13,boxShadow:`0 4px 14px ${t.accent}44`,flexShrink:0}}>
                + Add Deal
              </button>
            )}
          </div>
        )}
      </div>

      {/* Desktop sort row */}
      {isDesktop && (
        <div style={{padding:"0 32px",marginTop:0}}/>
      )}

      {/* Cards grid */}
      <div style={{padding:isDesktop?"24px 32px 40px":"12px 16px 100px"}}>
        {/* Stats row (mobile) */}
        {!isDesktop && (
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:16}}>
            {[["🔥",deals.filter(d=>d.hot).length,"Hot"],["🏷",deals.length,"Deals"],["⚡",deals.filter(d=>d.timer).length,"Flash"]].map(([e,n,l])=>(
              <div key={l} style={{background:t.surface,borderRadius:14,padding:"12px 8px",textAlign:"center",border:`1px solid ${t.border}`}}>
                <div style={{fontSize:18}}>{e}</div>
                <div style={{fontWeight:900,fontSize:18,color:t.text}}>{n}</div>
                <div style={{fontSize:10,color:t.text3,marginTop:1}}>{l}</div>
              </div>
            ))}
          </div>
        )}

        {/* Mobile sort */}
        {!isDesktop && (
          <div style={{display:"flex",gap:8,marginBottom:16,overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
            {[["hot","🔥 Hot"],["disc","% Off"],["low","$ Low"],["high","$ High"]].map(([v,l])=>(
              <button key={v} className="tap" onClick={()=>setSort(v)}
                style={{padding:"6px 14px",borderRadius:20,border:`1px solid ${sort===v?t.accent:t.border}`,background:sort===v?t.accentBg:"transparent",color:sort===v?t.accent:t.text3,fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
                {l}
              </button>
            ))}
          </div>
        )}

        <div className="deals-grid">
          {filtered.length > 0
            ? filtered.map((d,i)=><DealCard key={d.id} d={d} wishlist={wishlist} tracked={tracked} onWish={onWish} onTrack={onTrack} onGet={onGet} t={t} delay={i*.04}/>)
            : <div style={{gridColumn:"1/-1",textAlign:"center",padding:"80px 20px",color:t.text3}}>
                <div style={{fontSize:48,marginBottom:12}}>🔍</div>
                <div style={{fontWeight:800,fontSize:18,color:t.text2}}>No deals found</div>
              </div>
          }
        </div>
      </div>

      {/* Admin FAB (mobile only) */}
      {isAdmin && !isDesktop && (
        <button className="tap" onClick={onAddDeal}
          style={{position:"fixed",bottom:90,right:20,width:52,height:52,borderRadius:"50%",border:"none",background:t.accent,color:"#fff",fontSize:22,cursor:"pointer",zIndex:300,boxShadow:`0 4px 20px ${t.accent}66`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>
          +
        </button>
      )}
    </div>
  );
}

// ─── Page: Saved ───────────────────────────────────────────────────
function SavedPage({ wishlist, tracked, deals, onWish, onTrack, onGet, t }) {
  const { isDesktop } = useBreakpoint();
  const items = deals.filter(d=>wishlist.includes(d.id));
  return (
    <div style={{padding:isDesktop?"32px":"20px 16px 100px"}}>
      <h2 style={{fontWeight:900,fontSize:22,color:t.text,letterSpacing:"-.4px",marginBottom:4}}>Saved Deals</h2>
      <p style={{fontSize:13,color:t.text3,marginBottom:24}}>{items.length>0?`${items.length} saved`:"Nothing saved yet"}</p>
      {items.length>0 ? (
        <div className="deals-grid">
          {items.map((d,i)=><DealCard key={d.id} d={d} wishlist={wishlist} tracked={tracked} onWish={onWish} onTrack={onTrack} onGet={onGet} t={t} delay={i*.04}/>)}
        </div>
      ) : (
        <div style={{textAlign:"center",padding:"80px 20px"}}>
          <div style={{fontSize:52,marginBottom:12}}>🤍</div>
          <div style={{fontWeight:800,fontSize:18,color:t.text2,marginBottom:6}}>Nothing saved yet</div>
          <div style={{fontSize:14,color:t.text3}}>Tap the heart icon on any deal</div>
        </div>
      )}
    </div>
  );
}

// ─── Page: Tracking ────────────────────────────────────────────────
function TrackingPage({ tracked, deals, onTrack, t }) {
  const { isDesktop } = useBreakpoint();
  const items = deals.filter(d=>tracked.includes(d.id));
  return (
    <div style={{padding:isDesktop?"32px":"20px 16px 100px"}}>
      <h2 style={{fontWeight:900,fontSize:22,color:t.text,letterSpacing:"-.4px",marginBottom:4}}>Price Tracker</h2>
      <p style={{fontSize:13,color:t.text3,marginBottom:24}}>{items.length>0?`Watching ${items.length} item${items.length>1?"s":""}`:"No items being tracked"}</p>
      {items.length>0 ? (
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {items.map(d=>(
            <div key={d.id} style={{background:t.surface,borderRadius:18,padding:"16px",display:"flex",alignItems:"center",gap:14,border:`1px solid ${t.border}`,boxShadow:`0 2px 10px ${t.shadow}`}}>
              <div style={{width:56,height:56,borderRadius:14,overflow:"hidden",background:t.surface2,flexShrink:0}}>
                <img src={d.img} alt={d.title} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:800,color:t.text,fontSize:15,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{d.title}</div>
                <div style={{color:t.text3,fontSize:12,marginTop:2}}>{d.store}</div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginTop:5}}>
                  <span style={{fontWeight:900,color:t.accent,fontSize:18}}>{fp(d.now)}</span>
                  <span style={{background:t.accentBg,color:t.accent,fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:8}}>-{d.pct}%</span>
                  {d.timer && <TimerDisplay time={d.timer} t={t}/>}
                </div>
              </div>
              <button className="tap" onClick={()=>onTrack(d.id)}
                style={{padding:"8px 14px",borderRadius:12,border:`1px solid rgba(255,59,92,.3)`,background:"rgba(255,59,92,.08)",color:"#FF3B5C",fontSize:12,fontWeight:700,cursor:"pointer",flexShrink:0}}>
                Stop
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div style={{textAlign:"center",padding:"80px 20px"}}>
          <div style={{fontSize:52,marginBottom:12}}>📊</div>
          <div style={{fontWeight:800,fontSize:18,color:t.text2,marginBottom:6}}>Nothing tracked yet</div>
          <div style={{fontSize:14,color:t.text3}}>Track deals to get price drop alerts</div>
        </div>
      )}
    </div>
  );
}

// ─── Page: Account ─────────────────────────────────────────────────
function AccountPage({ user, wishlist, tracked, t, dark, toggleTheme, onSignIn, onSignOut, isAdmin, onAddDeal }) {
  const { isDesktop } = useBreakpoint();
  if (!user) return (
    <div style={{textAlign:"center",padding:"80px 28px 100px"}}>
      <div style={{width:80,height:80,borderRadius:24,background:t.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,margin:"0 auto 20px",boxShadow:`0 8px 28px ${t.accent}44`}}>👤</div>
      <h2 style={{fontWeight:900,fontSize:24,color:t.text,marginBottom:10}}>Your Account</h2>
      <p style={{color:t.text3,fontSize:15,maxWidth:280,margin:"0 auto 28px",lineHeight:1.6}}>Sign in to access your wishlist, alerts and preferences</p>
      <button className="tap" onClick={onSignIn} style={{padding:"15px 36px",borderRadius:16,border:"none",background:t.accent,color:"#fff",fontWeight:700,fontSize:16,cursor:"pointer",boxShadow:`0 4px 20px ${t.accent}44`}}>Sign In →</button>
    </div>
  );
  return (
    <div style={{padding:isDesktop?"32px":"20px 16px 100px",maxWidth:isDesktop?600:undefined}}>
      {/* Profile card */}
      <div style={{borderRadius:22,overflow:"hidden",marginBottom:20,boxShadow:`0 4px 24px ${t.shadow}`}}>
        <div style={{background:`linear-gradient(135deg,${t.accent},#a855f7)`,padding:"28px 22px 24px",textAlign:"center"}}>
          <div style={{width:66,height:66,borderRadius:20,background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,color:"#fff",fontSize:26,margin:"0 auto 12px",border:"2px solid rgba(255,255,255,.35)"}}>{user.name[0].toUpperCase()}</div>
          <div style={{fontWeight:900,fontSize:20,color:"#fff"}}>{user.name}</div>
          <div style={{color:"rgba(255,255,255,.7)",fontSize:14,marginTop:3}}>{user.email}</div>
        </div>
        <div style={{background:t.surface,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",borderTop:`1px solid ${t.border}`}}>
          {[[wishlist.length,"⭐","Saved"],[tracked.length,"📈","Tracking"],["12","🏷","Deals"]].map(([n,e,l],i)=>(
            <div key={l} style={{padding:"14px 0",textAlign:"center",borderRight:i<2?`1px solid ${t.border}`:"none"}}>
              <div style={{fontSize:18}}>{e}</div>
              <div style={{fontWeight:900,fontSize:20,color:t.text}}>{n}</div>
              <div style={{fontSize:11,color:t.text3,marginTop:1}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Dark mode toggle */}
      <div style={{background:t.surface,borderRadius:18,overflow:"hidden",border:`1px solid ${t.border}`,marginBottom:14}}>
        <div onClick={toggleTheme} style={{display:"flex",alignItems:"center",gap:14,padding:"16px 18px",cursor:"pointer"}}>
          <div style={{width:40,height:40,borderRadius:12,background:t.surface2,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{dark?"☀️":"🌙"}</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:700,color:t.text,fontSize:15}}>{dark?"Switch to Light Mode":"Switch to Dark Mode"}</div>
            <div style={{color:t.text3,fontSize:13,marginTop:1}}>Currently {dark?"dark":"light"}</div>
          </div>
          <div style={{width:44,height:26,borderRadius:13,background:dark?t.accent:t.border,position:"relative",transition:"background .2s",flexShrink:0}}>
            <div style={{position:"absolute",top:3,left:dark?22:3,width:20,height:20,borderRadius:"50%",background:"#fff",transition:"left .2s",boxShadow:"0 1px 4px rgba(0,0,0,.2)"}}/>
          </div>
        </div>
      </div>

      {/* Admin section */}
      {isAdmin && (
        <div style={{marginBottom:14}}>
          <div style={{fontSize:11,fontWeight:700,color:t.text3,letterSpacing:"1px",textTransform:"uppercase",marginBottom:10}}>Admin</div>
          <button className="tap" onClick={onAddDeal}
            style={{width:"100%",padding:"14px",borderRadius:16,border:"none",background:t.accent,color:"#fff",fontWeight:700,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",gap:10,boxShadow:`0 4px 16px ${t.accent}44`}}>
            + Add New Deal
          </button>
        </div>
      )}

      {/* Settings */}
      <div style={{background:t.surface,borderRadius:18,overflow:"hidden",border:`1px solid ${t.border}`,marginBottom:14}}>
        {[{i:"🔔",l:"Notifications",s:"Manage alerts"},{i:"🏷️",l:"Preferences",s:"Categories & stores"},{i:"🔒",l:"Security",s:"Password & privacy"},{i:"💬",l:"Help",s:"FAQs & contact"}].map((r,i)=>(
          <div key={r.l} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 18px",borderBottom:i<3?`1px solid ${t.border}`:"none",cursor:"pointer"}}>
            <div style={{width:40,height:40,borderRadius:12,background:t.surface2,display:"flex",alignItems:"center",justifyContent:"center",fontSize:19}}>{r.i}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,color:t.text,fontSize:14}}>{r.l}</div>
              <div style={{color:t.text3,fontSize:12,marginTop:1}}>{r.s}</div>
            </div>
            <span style={{color:t.text3,fontSize:18}}>›</span>
          </div>
        ))}
      </div>
      <button className="tap" onClick={onSignOut}
        style={{width:"100%",padding:"14px",borderRadius:16,border:`1px solid ${t.border}`,background:"transparent",color:t.text3,fontWeight:700,fontSize:14,cursor:"pointer"}}>
        Sign Out
      </button>
    </div>
  );
}

// ─── Notif Sheet ───────────────────────────────────────────────────
function NotifSheet({ notifs, t, onClear, onClose }) {
  return (
    <div className="sheet-backdrop" onClick={onClose} style={{background:"rgba(0,0,0,.6)",backdropFilter:"blur(10px)"}}>
      <div className="sheet-panel" onClick={e=>e.stopPropagation()} style={{background:t.surface,borderTop:`1px solid ${t.border}`}}>
        <div style={{width:38,height:4,borderRadius:2,background:t.border,margin:"14px auto 0"}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 0 14px"}}>
          <span style={{fontWeight:900,fontSize:20,color:t.text}}>Notifications</span>
          <div style={{display:"flex",gap:14,alignItems:"center"}}>
            <span onClick={onClear} style={{color:t.accent,fontSize:13,fontWeight:700,cursor:"pointer"}}>Clear all</span>
            <button onClick={onClose} style={{width:30,height:30,borderRadius:10,border:`1px solid ${t.border}`,background:t.surface2,color:t.text3,fontSize:14,cursor:"pointer"}}>✕</button>
          </div>
        </div>
        <div style={{overflowY:"auto",maxHeight:"55vh"}}>
          {notifs.length===0 ? (
            <div style={{textAlign:"center",padding:"44px 20px"}}>
              <div style={{fontSize:44,marginBottom:8}}>🔕</div>
              <div style={{fontWeight:700,fontSize:15,color:t.text,marginBottom:3}}>All quiet</div>
              <div style={{fontSize:13,color:t.text3}}>We'll alert you when prices drop</div>
            </div>
          ) : notifs.map(n=>(
            <div key={n.id} style={{display:"flex",gap:12,padding:"12px 0",borderBottom:`1px solid ${t.border}`,alignItems:"flex-start"}}>
              <div style={{width:44,height:44,borderRadius:13,background:t.surface2,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{n.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,color:t.text,fontSize:14,marginBottom:2}}>{n.title}</div>
                <div style={{color:t.text2,fontSize:13}}>{n.body}</div>
                <div style={{color:t.text3,fontSize:11,marginTop:3}}>{n.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Mobile Header ─────────────────────────────────────────────────
function MobileHeader({ t, dark, toggleTheme, user, onSignIn, notifCount, onNotif }) {
  return null; // handled inside DealsPage for deals, other pages use their own titles
}

// ─── Main App ──────────────────────────────────────────────────────
export default function NikkiDeals() {
  const { dark, toggle: toggleTheme, t } = useTheme();
  const { isDesktop } = useBreakpoint();

  const [tab,setTab]             = useState("deals");
  const [user,setUser]           = useState(null);
  const [authMode,setAuthMode]   = useState(null);
  const [deals,setDeals]         = useState(INITIAL_DEALS);
  const [wishlist,setWishlist]   = useState([]);
  const [tracked,setTracked]     = useState([]);
  const [notifs,setNotifs]       = useState([]);
  const [showNotif,setShowNotif] = useState(false);
  const [activeDeal,setActiveDeal]= useState(null);
  const [showAddDeal,setShowAddDeal]= useState(false);
  const [toasts,setToasts]       = useState([]);

  const isAdmin = user?.email === ADMIN_EMAIL;

  useEffect(()=>{
    if(!user) return;
    const t2=setTimeout(()=>{
      setNotifs([
        {id:uid(),icon:"📉",title:"Price dropped!",body:"Sony WH-1000XM5 is now $179 🎉",time:"Just now"},
        {id:uid(),icon:"⚡",title:"Flash Deal!",body:"Stanley Quencher 52% off — hurry!",time:"2m ago"},
        {id:uid(),icon:"⭐",title:"Wishlist alert",body:"Nike Air Max 270 dropped to $74!",time:"5m ago"},
      ]);
      addToast({msg:"3 new deal alerts!",icon:"🔔",bg:t.accent});
    },3500);
    return ()=>clearTimeout(t2);
  },[user]);

  const addToast = ({msg,icon,bg}) => {
    const id=uid();
    setToasts(p=>[...p,{id,msg,icon,bg}]);
    setTimeout(()=>setToasts(p=>p.filter(x=>x.id!==id)),4000);
  };

  const toggleWish  = id => { if(!user){setAuthMode("signup");return;} setWishlist(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]); };
  const toggleTrack = id => { if(!user){setAuthMode("signup");return;} setTracked(t=>t.includes(id)?t.filter(x=>x!==id):[...t,id]); };
  const handleAuth  = u  => { setUser(u);setAuthMode(null); addToast({msg:`Welcome, ${u.name}! 🎉`,icon:"🎊",bg:"#00C06A"}); };
  const handleOut   = () => { setUser(null);setWishlist([]);setTracked([]);setNotifs([]); addToast({msg:"Signed out",icon:"👋",bg:t.text2}); };
  const addDeal     = d  => { setDeals(p=>[d,...p]); addToast({msg:"Deal published!",icon:"✅",bg:"#00C06A"}); };

  // Desktop top bar
  const DesktopTopBar = () => (
    <div style={{
      position:"fixed",top:0,left:220,right:0,
      height:0,zIndex:50,
    }}/>
  );

  return (
    <div style={{minHeight:"100vh",background:t.bg,fontFamily:"'Outfit',sans-serif",color:t.text}}>
      <style>{CSS}</style>

      {/* Desktop sidebar */}
      <Sidebar
        tab={tab} setTab={setTab} t={t} dark={dark} toggleTheme={toggleTheme}
        user={user} wishlist={wishlist} tracked={tracked}
        onSignIn={()=>setAuthMode("login")} onSignOut={handleOut}
        dealsCount={deals.length}
      />

      {/* Desktop notification bell in top-right */}
      {isDesktop && user && (
        <button className="tap" onClick={()=>setShowNotif(true)}
          style={{position:"fixed",top:20,right:24,width:40,height:40,borderRadius:12,border:`1px solid ${t.border}`,background:t.surface,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,zIndex:150,cursor:"pointer"}}>
          🔔
          {notifs.length>0 && <span style={{position:"absolute",top:7,right:7,width:7,height:7,borderRadius:"50%",background:"#FF3B5C",border:`2px solid ${t.surface}`}}/>}
        </button>
      )}

      {/* Main content */}
      <div className="main-content" style={{minHeight:"100vh"}}>
        {tab==="deals"    && <DealsPage deals={deals} wishlist={wishlist} tracked={tracked} onWish={toggleWish} onTrack={toggleTrack} onGet={setActiveDeal} t={t} user={user} onSignIn={()=>setAuthMode("login")} isAdmin={isAdmin} onAddDeal={()=>setShowAddDeal(true)}/>}
        {tab==="saved"    && <SavedPage wishlist={wishlist} tracked={tracked} deals={deals} onWish={toggleWish} onTrack={toggleTrack} onGet={setActiveDeal} t={t}/>}
        {tab==="tracking" && <TrackingPage tracked={tracked} deals={deals} onTrack={toggleTrack} t={t}/>}
        {tab==="account"  && <AccountPage user={user} wishlist={wishlist} tracked={tracked} t={t} dark={dark} toggleTheme={toggleTheme} onSignIn={()=>setAuthMode("signup")} onSignOut={handleOut} isAdmin={isAdmin} onAddDeal={()=>setShowAddDeal(true)}/>}
      </div>

      {/* Mobile nav */}
      <MobileNav tab={tab} setTab={setTab} t={t} wishlist={wishlist} tracked={tracked}/>

      {/* Toasts */}
      <div style={{position:"fixed",bottom:isDesktop?24:88,right:isDesktop?24:"50%",transform:isDesktop?"none":"translateX(50%)",zIndex:9999,display:"flex",flexDirection:"column",gap:8,width:isDesktop?340:"calc(100% - 28px)",maxWidth:isDesktop?340:400,pointerEvents:"none",left:isDesktop?"auto":undefined}}>
        {toasts.map(toast=>(
          <div key={toast.id} style={{background:toast.bg||t.accent,borderRadius:16,padding:"13px 18px",display:"flex",alignItems:"center",gap:12,boxShadow:`0 6px 24px rgba(0,0,0,.3)`,animation:"fadeUp .3s cubic-bezier(.34,1.2,.64,1)",pointerEvents:"all"}}>
            <span style={{fontSize:20}}>{toast.icon}</span>
            <span style={{flex:1,color:"#fff",fontSize:14,fontWeight:700}}>{toast.msg}</span>
          </div>
        ))}
      </div>

      {/* Overlays */}
      {activeDeal   && <DealSheet     d={activeDeal}    t={t} onClose={()=>setActiveDeal(null)}/>}
      {showAddDeal  && <AddDealSheet  t={t} onClose={()=>setShowAddDeal(false)} onAdd={addDeal}/>}
      {showNotif    && <NotifSheet    notifs={notifs} t={t} onClear={()=>setNotifs([])} onClose={()=>setShowNotif(false)}/>}
      {authMode     && <AuthModal     mode={authMode} t={t} isDesktop={isDesktop} onClose={()=>setAuthMode(null)} onAuth={handleAuth}/>}
    </div>
  );
}
