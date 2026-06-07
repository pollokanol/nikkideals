import { useState, useEffect, useRef, useCallback } from "react";

const ADMIN_EMAIL = "admin@nikkideals.com";

const DEALS_DATA = [
  { id:1,  title:"Sony WH-1000XM5",    sub:"Industry-leading noise cancellation",   cat:"Electronics", img:"https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&h=600&fit=crop&q=90", was:349,  now:199, store:"Amazon",   pct:43, hot:true,  timer:"05:14:22", code:"SONY43",  accent:"#6EE7B7" },
  { id:2,  title:"Nike Air Max 270",   sub:"Lightweight everyday running shoe",     cat:"Fashion",     img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop&q=90", was:150,  now:74,  store:"Nike",     pct:51, hot:true,  timer:null,       code:"NIKE51",  accent:"#FCA5A5" },
  { id:3,  title:"iPad 10th Gen",      sub:"64GB Wi-Fi — Sky Blue",                 cat:"Electronics", img:"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=600&fit=crop&q=90", was:449,  now:329, store:"Best Buy", pct:27, hot:true,  timer:"03:45:10", code:"IPAD27",  accent:"#93C5FD" },
  { id:4,  title:"Dyson V11",          sub:"Cordless vacuum, 60-min runtime",       cat:"Home",        img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=90", was:599,  now:369, store:"Dyson",    pct:38, hot:true,  timer:"08:10:00", code:"DYSON38", accent:"#FCD34D" },
  { id:5,  title:"MacBook Air M2",     sub:"13-inch Midnight, 8-core GPU",          cat:"Electronics", img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop&q=90", was:1099, now:849, store:"Apple",    pct:23, hot:false, timer:null,       code:"MAC23",   accent:"#C4B5FD" },
  { id:6,  title:"Stanley Quencher",  sub:"40oz H2.0 Flow State Tumbler",          cat:"Home",        img:"https://images.unsplash.com/photo-1635348729200-8b0f2bb00f31?w=800&h=600&fit=crop&q=90", was:40,   now:19,  store:"Target",   pct:52, hot:true,  timer:"02:18:44", code:"STAN52",  accent:"#6EE7B7" },
  { id:7,  title:"Levi's 501 Jeans",  sub:"Original straight fit, stonewash",      cat:"Fashion",     img:"https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=600&fit=crop&q=90", was:89,   now:39,  store:"Levi's",   pct:56, hot:false, timer:null,       code:"LEVI56",  accent:"#93C5FD" },
  { id:8,  title:"Kindle Paperwhite", sub:"16GB waterproof, 3-month battery",      cat:"Electronics", img:"https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=600&fit=crop&q=90", was:139,  now:84,  store:"Amazon",   pct:40, hot:false, timer:"03:20:00", code:"KIND40",  accent:"#FCA5A5" },
  { id:9,  title:"KitchenAid Mixer",  sub:"5-Qt tilt-head, Empire Red",            cat:"Home",        img:"https://images.unsplash.com/photo-1556909211-36987daf7b4d?w=800&h=600&fit=crop&q=90", was:449,  now:279, store:"W.Sonoma", pct:38, hot:true,  timer:null,       code:"KAID38",  accent:"#FCD34D" },
  { id:10, title:"Beats Studio Pro",  sub:"Wireless ANC, USB-C, 40hr battery",     cat:"Electronics", img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop&q=90", was:349,  now:179, store:"Best Buy", pct:49, hot:true,  timer:null,       code:"BEAT49",  accent:"#C4B5FD" },
  { id:11, title:"Adidas Ultraboost", sub:"Premium running, Primeknit upper",      cat:"Fashion",     img:"https://images.unsplash.com/photo-1608231387042-66d1773d3028?w=800&h=600&fit=crop&q=90", was:190,  now:109, store:"Adidas",   pct:43, hot:false, timer:"04:55:00", code:"ULTR43",  accent:"#6EE7B7" },
  { id:12, title:"Instant Pot Duo",   sub:"7-in-1 electric pressure cooker",       cat:"Home",        img:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&q=90", was:99,   now:49,  store:"Walmart",  pct:50, hot:false, timer:null,       code:"INST50",  accent:"#FCA5A5" },
];

const CATS = ["All","Electronics","Fashion","Home"];
const fp = p => `$${Number(p).toFixed(0)}`;
const uid = () => Math.random().toString(36).slice(2,9);

// ─── Design tokens ────────────────────────────────────────────────
const DARK = {
  bg:     "#080810",
  s1:     "#0F0F1A",
  s2:     "#151524",
  s3:     "#1C1C2E",
  s4:     "#242438",
  border: "rgba(255,255,255,.07)",
  borderHov: "rgba(255,255,255,.13)",
  text:   "#F0EFFF",
  text2:  "#8B8AA8",
  text3:  "#44435A",
  glow:   "rgba(110,231,183,.12)",
};

const LIGHT = {
  bg:     "#F7F6FF",
  s1:     "#FFFFFF",
  s2:     "#F0EFFA",
  s3:     "#E8E7F5",
  s4:     "#DDDCEE",
  border: "rgba(0,0,0,.08)",
  borderHov: "rgba(0,0,0,.15)",
  text:   "#0A0A18",
  text2:  "#5A5978",
  text3:  "#AAAACC",
  glow:   "rgba(110,231,183,.08)",
};

// ─── CSS ──────────────────────────────────────────────────────────
const makeCSS = (dark) => {
  const c = dark ? DARK : LIGHT;
  return `
    @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=Mona+Sans:wght@300;400;500;600&display=swap');
    @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700,800,900&f[]=satoshi@300,400,500&display=swap');

    *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; -webkit-tap-highlight-color:transparent; }
    html { scroll-behavior:smooth; }
    body {
      font-family:'Satoshi','DM Sans',system-ui,sans-serif;
      background:${c.bg};
      color:${c.text};
      min-height:100vh;
      overscroll-behavior-y:none;
      -webkit-font-smoothing:antialiased;
    }
    ::-webkit-scrollbar { width:3px; height:3px; }
    ::-webkit-scrollbar-track { background:transparent; }
    ::-webkit-scrollbar-thumb { background:${c.s4}; border-radius:2px; }
    img { display:block; }
    input,select,button,textarea { font-family:inherit; -webkit-appearance:none; }
    input:focus,select:focus { outline:none; }

    /* Noise texture overlay */
    body::before {
      content:'';
      position:fixed;inset:0;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
      pointer-events:none;z-index:0;opacity:${dark?".4":".25"};
    }

    @keyframes fadeUp    { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
    @keyframes slideUp   { from{transform:translateY(100%)} to{transform:translateY(0)} }
    @keyframes scaleIn   { from{opacity:0;transform:scale(.95) translateY(8px)} to{opacity:1;transform:scale(1) translateY(0)} }
    @keyframes glow      { 0%,100%{opacity:.6} 50%{opacity:1} }
    @keyframes spin      { to{transform:rotate(360deg)} }
    @keyframes ticker    { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    @keyframes pulse     { 0%,100%{opacity:1} 50%{opacity:.25} }
    @keyframes shimmer   { 0%{background-position:-400px 0} 100%{background-position:400px 0} }

    .reveal { animation:fadeUp .6s cubic-bezier(.22,1,.36,1) both; }
    .tap { transition:transform .14s cubic-bezier(.34,1.2,.64,1),opacity .14s ease; cursor:pointer; }
    .tap:active { transform:scale(.92)!important; opacity:.7; }

    .card {
      transition:transform .3s cubic-bezier(.34,1.1,.64,1), box-shadow .3s ease, border-color .2s ease;
    }
    .card:hover {
      transform:translateY(-6px) scale(1.008);
      border-color:${c.borderHov}!important;
      box-shadow:0 24px 60px rgba(0,0,0,${dark?".6":".12"}),0 0 0 1px ${c.borderHov};
    }
    .card:active { transform:scale(.98) translateY(0); }

    .page {
      max-width:1320px;
      margin:0 auto;
      padding:0 20px;
    }
    @media(min-width:640px)  { .page { padding:0 32px; } }
    @media(min-width:1024px) { .page { padding:0 56px; } }

    /* Responsive deal grid */
    .deal-grid {
      display:grid;
      grid-template-columns:1fr;
      gap:16px;
    }
    @media(min-width:520px)  { .deal-grid { grid-template-columns:repeat(2,1fr); } }
    @media(min-width:900px)  { .deal-grid { grid-template-columns:repeat(3,1fr); } }
    @media(min-width:1200px) { .deal-grid { grid-template-columns:repeat(4,1fr); } }

    .overlay { position:fixed;inset:0;z-index:900; animation:fadeIn .2s ease; }
    .sheet {
      position:absolute;bottom:0;left:0;right:0;
      border-radius:28px 28px 0 0;
      padding:0 22px 52px;
      animation:slideUp .4s cubic-bezier(.32,.72,0,1);
      max-height:92vh;overflow-y:auto;
    }
    .modal {
      position:absolute;top:50%;left:50%;
      transform:translate(-50%,-50%);
      border-radius:24px;
      padding:32px;
      animation:scaleIn .28s cubic-bezier(.34,1.2,.64,1);
      width:min(500px,calc(100vw - 32px));
      max-height:90vh;overflow-y:auto;
    }
    @media(min-width:768px) {
      .sheet { max-width:580px;left:50%;right:auto;transform:translateX(-50%); }
    }

    .ticker-track { display:flex;animation:ticker 30s linear infinite;width:max-content; }
    .ticker-track:hover { animation-play-state:paused; }
    .live-dot { animation:pulse 2s ease-in-out infinite; }

    @media(max-width:767px) { .desktop-only{display:none!important;} }
    @media(min-width:768px) { .mobile-only{display:none!important;} }

    .glass {
      background:${dark?"rgba(15,15,26,.8)":"rgba(255,255,255,.8)"};
      backdrop-filter:blur(20px);
      -webkit-backdrop-filter:blur(20px);
    }

    /* Gradient text */
    .grad { background:linear-gradient(135deg,#6EE7B7,#93C5FD,#C4B5FD); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

    /* Skeleton shimmer */
    .skel { background:linear-gradient(90deg,${c.s2} 0%,${c.s3} 50%,${c.s2} 100%); background-size:400px 100%; animation:shimmer 1.4s infinite; border-radius:8px; }

    .field {
      width:100%;padding:13px 16px;
      border-radius:14px;
      border:1.5px solid ${c.border};
      background:${c.s2};
      color:${c.text};
      font-size:15px;font-weight:400;
      margin-bottom:12px;display:block;
      transition:border .15s,box-shadow .15s;
    }
    .field:focus {
      border-color:#6EE7B7;
      box-shadow:0 0 0 3px rgba(110,231,183,.15);
    }
  `;
};

// ─── useTheme ──────────────────────────────────────────────────────
function useTheme() {
  const [dark,setDark] = useState(()=>{ try{return localStorage.getItem("nd3-dark")!=="0";}catch{return true;} });
  const toggle = ()=>setDark(d=>{try{localStorage.setItem("nd3-dark",!d?"1":"0");}catch{}return !d;});
  return { dark, toggle, c:dark?DARK:LIGHT };
}

// ─── useBreakpoint ─────────────────────────────────────────────────
function useBreakpoint() {
  const [w,setW] = useState(typeof window!=="undefined"?window.innerWidth:1280);
  useEffect(()=>{ const f=()=>setW(window.innerWidth); window.addEventListener("resize",f); return ()=>window.removeEventListener("resize",f); },[]);
  return { isDesktop:w>=768, isMobile:w<768, isWide:w>=1100 };
}

// ─── Timer ────────────────────────────────────────────────────────
function Timer({ time, style }) {
  const [v,setV] = useState(time);
  useEffect(()=>{
    const iv=setInterval(()=>setV(p=>{
      const [h,m,s]=p.split(":").map(Number); let t=h*3600+m*60+s-1; if(t<0)t=0;
      return [Math.floor(t/3600),Math.floor((t%3600)/60),t%60].map(n=>String(n).padStart(2,"0")).join(":");
    }),1000);
    return ()=>clearInterval(iv);
  },[]);
  return <span style={{fontVariantNumeric:"tabular-nums",...style}}>{v}</span>;
}

// ─── Ticker ───────────────────────────────────────────────────────
function Ticker({ deals }) {
  const hot = deals.filter(d=>d.hot);
  const items = [...hot,...hot];
  return (
    <div style={{background:"#6EE7B7",overflow:"hidden",height:36,display:"flex",alignItems:"center",position:"relative",zIndex:200}}>
      <div className="ticker-track">
        {items.map((d,i)=>(
          <span key={i} style={{display:"inline-flex",alignItems:"center",gap:12,padding:"0 32px",whiteSpace:"nowrap",fontSize:12,fontWeight:700,letterSpacing:".06em",color:"#080810",textTransform:"uppercase"}}>
            <span style={{background:"#080810",color:"#6EE7B7",fontSize:10,fontWeight:800,padding:"2px 8px",borderRadius:20}}>-{d.pct}%</span>
            {d.title}
            <span style={{opacity:.3}}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Deal Card ────────────────────────────────────────────────────
function DealCard({ d, wishlist, tracked, onWish, onTrack, onGet, c, delay=0, dark }) {
  const saved    = wishlist.includes(d.id);
  const tracking = tracked.includes(d.id);
  const saving   = d.was - d.now;

  return (
    <div className="card reveal" onClick={()=>onGet(d)}
      style={{
        borderRadius:20,overflow:"hidden",
        background:c.s1,
        border:`1px solid ${c.border}`,
        animationDelay:`${delay}s`,
        display:"flex",flexDirection:"column",
        position:"relative",cursor:"pointer",
        boxShadow:dark?`0 4px 24px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.04)`:`0 4px 20px rgba(0,0,0,.07)`,
      }}>

      {/* Image — tall, immersive */}
      <div style={{position:"relative",overflow:"hidden",flexShrink:0}} onClick={e=>{e.stopPropagation();onGet(d);}}>
        <div style={{paddingBottom:"72%",position:"relative",background:c.s2}}>
          <img src={d.img} alt={d.title}
            style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",transition:"transform .6s cubic-bezier(.25,.46,.45,.94)"}}
            onError={e=>e.target.style.display="none"}/>
          {/* Rich gradient overlay */}
          <div style={{position:"absolute",inset:0,background:`linear-gradient(160deg,transparent 30%,${dark?"rgba(8,8,16,.92)":"rgba(10,10,24,.7)"} 100%)`}}/>
          {/* Subtle top vignette */}
          <div style={{position:"absolute",top:0,left:0,right:0,height:80,background:"linear-gradient(to bottom,rgba(0,0,0,.3),transparent)"}}/>
        </div>

        {/* Overlaid price — bottom of image */}
        <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"16px 18px"}}>
          <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between"}}>
            <div>
              <div style={{display:"flex",alignItems:"baseline",gap:8,marginBottom:2}}>
                <span style={{fontSize:28,fontWeight:900,color:"#fff",letterSpacing:"-1px",lineHeight:1}}>{fp(d.now)}</span>
                <span style={{fontSize:14,color:"rgba(255,255,255,.45)",textDecoration:"line-through",fontWeight:400}}>{fp(d.was)}</span>
              </div>
              <div style={{fontSize:12,fontWeight:600,color:d.accent||"#6EE7B7"}}>Save {fp(saving)}</div>
            </div>
            {/* Discount badge */}
            <div style={{background:d.accent||"#6EE7B7",borderRadius:10,padding:"6px 12px",boxShadow:`0 4px 16px ${d.accent||"#6EE7B7"}55`}}>
              <span style={{fontSize:14,fontWeight:900,color:"#080810",letterSpacing:"-.5px"}}>-{d.pct}%</span>
            </div>
          </div>
        </div>

        {/* Top-left: store pill + hot badge */}
        <div style={{position:"absolute",top:12,left:12,display:"flex",flexDirection:"column",gap:5,alignItems:"flex-start"}}>
          {d.hot && (
            <div style={{background:"rgba(0,0,0,.6)",backdropFilter:"blur(10px)",borderRadius:20,padding:"4px 10px",border:"1px solid rgba(255,255,255,.12)",display:"flex",alignItems:"center",gap:5}}>
              <span style={{fontSize:10}}>🔥</span>
              <span style={{fontSize:10,fontWeight:700,color:"#fff",letterSpacing:".05em",textTransform:"uppercase"}}>Hot deal</span>
            </div>
          )}
          {d.timer && (
            <div style={{background:"rgba(0,0,0,.65)",backdropFilter:"blur(10px)",borderRadius:20,padding:"4px 10px",border:"1px solid rgba(255,255,255,.1)"}}>
              <Timer time={d.timer} style={{fontSize:11,fontWeight:700,color:d.accent||"#6EE7B7",letterSpacing:".04em"}}/>
            </div>
          )}
        </div>

        {/* Heart */}
        <button className="tap" onClick={e=>{e.stopPropagation();onWish(d.id);}}
          style={{position:"absolute",top:12,right:12,width:36,height:36,borderRadius:"50%",border:"none",background:saved?"#fff":"rgba(0,0,0,.55)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,boxShadow:saved?"0 2px 12px rgba(255,59,92,.4)":"none"}}>
          {saved?"❤️":"🤍"}
        </button>
      </div>

      {/* Body */}
      <div style={{padding:"16px 18px 18px",flex:1,display:"flex",flexDirection:"column",gap:10}}>
        {/* Store + category */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span style={{fontSize:11,fontWeight:700,letterSpacing:".07em",textTransform:"uppercase",color:c.text3}}>{d.store}</span>
          <span style={{fontSize:11,fontWeight:600,color:d.accent||"#6EE7B7",background:`${d.accent||"#6EE7B7"}18`,padding:"2px 8px",borderRadius:6}}>{d.cat}</span>
        </div>

        {/* Title */}
        <div>
          <div style={{fontSize:17,fontWeight:800,color:c.text,lineHeight:1.2,letterSpacing:"-.3px",marginBottom:4}}>{d.title}</div>
          <div style={{fontSize:13,color:c.text2,lineHeight:1.4,fontWeight:400}}>{d.sub}</div>
        </div>

        {/* Action row */}
        <div style={{display:"flex",gap:8,marginTop:"auto",paddingTop:4}} onClick={e=>e.stopPropagation()}>
          <button className="tap" onClick={()=>onTrack(d.id)}
            style={{flex:1,padding:"10px 0",borderRadius:12,border:`1.5px solid ${tracking?d.accent||"#6EE7B7":c.border}`,background:tracking?`${d.accent||"#6EE7B7"}15`:"transparent",color:tracking?d.accent||"#6EE7B7":c.text2,fontSize:12,fontWeight:700,transition:"all .15s",letterSpacing:".02em"}}>
            {tracking?"🔔 On":"Track"}
          </button>
          <button className="tap" onClick={()=>onGet(d)}
            style={{flex:2,padding:"10px 0",borderRadius:12,border:"none",background:dark?c.s4:"#0A0A18",color:dark?"#F0EFFF":"#fff",fontSize:13,fontWeight:700,letterSpacing:".02em",boxShadow:dark?"none":`0 2px 12px rgba(0,0,0,.2)`}}>
            Get Deal →
          </button>
        </div>
      </div>

      {/* Glow accent line at bottom */}
      <div style={{height:2,background:`linear-gradient(90deg,transparent,${d.accent||"#6EE7B7"},transparent)`,opacity:.4,flexShrink:0}}/>
    </div>
  );
}

// ─── Coupon Sheet ─────────────────────────────────────────────────
function DealSheet({ d, c, isDesktop, dark, onClose }) {
  const [copied,setCopied] = useState(false);
  const saving = d.was - d.now;
  const code = d.code || `SAVE${d.pct}`;
  const copy = () => {
    navigator.clipboard.writeText(code).catch(()=>{});
    setCopied(true);
    setTimeout(()=>setCopied(false),2500);
  };
  const ac = d.accent||"#6EE7B7";
  const Cls = isDesktop?"modal":"sheet";
  return (
    <div className="overlay" onClick={onClose} style={{background:"rgba(0,0,0,.7)",backdropFilter:"blur(16px)"}}>
      <div className={Cls} onClick={e=>e.stopPropagation()} style={{background:c.s1,border:`1px solid ${c.border}`,boxShadow:dark?"0 32px 80px rgba(0,0,0,.7)":"0 24px 60px rgba(0,0,0,.2)"}}>
        {!isDesktop && <div style={{width:38,height:4,borderRadius:2,background:c.s4,margin:"16px auto 24px"}}/>}
        {isDesktop && <button onClick={onClose} className="tap" style={{position:"absolute",top:20,right:20,width:32,height:32,borderRadius:10,border:`1px solid ${c.border}`,background:c.s2,color:c.text2,fontSize:15,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>}

        {/* Product row */}
        <div style={{display:"flex",gap:16,alignItems:"center",marginBottom:28}}>
          <div style={{width:80,height:80,borderRadius:16,overflow:"hidden",background:c.s2,flexShrink:0,boxShadow:`0 0 0 1px ${c.border}`}}>
            <img src={d.img} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:19,fontWeight:800,color:c.text,marginBottom:3,letterSpacing:"-.3px"}}>{d.title}</div>
            <div style={{fontSize:13,color:c.text2,marginBottom:10}}>{d.store} · {d.cat}</div>
            <div style={{display:"flex",alignItems:"baseline",gap:10}}>
              <span style={{fontSize:24,fontWeight:900,color:c.text,letterSpacing:"-.8px"}}>{fp(d.now)}</span>
              <span style={{fontSize:14,color:c.text3,textDecoration:"line-through"}}>{fp(d.was)}</span>
              <span style={{fontSize:12,background:`${ac}20`,color:ac,padding:"3px 10px",borderRadius:8,fontWeight:700}}>-{d.pct}%</span>
            </div>
          </div>
        </div>

        {/* Step 1 */}
        <div style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:c.text3,marginBottom:12}}>Step 1 — Copy code</div>
        <div onClick={copy} style={{display:"flex",alignItems:"center",gap:14,background:c.s2,borderRadius:16,padding:"16px 20px",border:`1.5px dashed ${copied?"#6EE7B7":c.border}`,marginBottom:copied?8:24,cursor:"pointer",transition:"all .25s",boxShadow:copied?`0 0 24px rgba(110,231,183,.2)`:"none"}}>
          <span style={{flex:1,fontFamily:"'JetBrains Mono','Courier New',monospace",fontSize:22,fontWeight:700,color:copied?"#6EE7B7":c.text,letterSpacing:"3px",transition:"color .25s"}}>{code}</span>
          <button className="tap" onClick={e=>{e.stopPropagation();copy();}}
            style={{padding:"10px 22px",borderRadius:12,border:"none",background:copied?"#6EE7B7":dark?c.s4:"#0A0A18",color:copied?"#080810":dark?c.text:"#fff",fontWeight:700,fontSize:13,transition:"all .25s",boxShadow:copied?"0 4px 16px rgba(110,231,183,.4)":"none"}}>
            {copied?"Copied!":"Copy"}
          </button>
        </div>
        {copied && <div style={{fontSize:12,color:"#6EE7B7",fontWeight:600,marginBottom:20,paddingLeft:2}}>✓ Paste at checkout — save {fp(saving)}</div>}

        {/* Step 2 */}
        <div style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:c.text3,marginBottom:12}}>Step 2 — Go to store</div>
        <button className="tap" onClick={()=>{copy();window.open("#","_blank");}}
          style={{width:"100%",padding:"16px",borderRadius:16,border:"none",background:"#6EE7B7",color:"#080810",fontWeight:800,fontSize:16,marginBottom:20,display:"flex",alignItems:"center",justifyContent:"center",gap:10,boxShadow:"0 6px 28px rgba(110,231,183,.35)"}}>
          Go to {d.store} →
        </button>

        <div style={{background:c.s2,borderRadius:14,padding:"14px 18px",display:"flex",gap:12,alignItems:"center",border:`1px solid ${c.border}`}}>
          <span style={{fontSize:22}}>💰</span>
          <div>
            <div style={{fontSize:14,fontWeight:600,color:c.text}}>You save {fp(saving)} on this deal</div>
            <div style={{fontSize:12,color:c.text3,marginTop:2}}>Limited time · code expires soon</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Auth ──────────────────────────────────────────────────────────
function AuthSheet({ mode, c, dark, isDesktop, onClose, onAuth }) {
  const [isLogin,setIsLogin] = useState(mode==="login");
  const [form,setForm] = useState({name:"",email:"",password:""});
  const [prefs,setPrefs] = useState({deals:true,drops:true,wish:true});
  const [err,setErr] = useState("");

  const submit = () => {
    if(!form.email||!form.password){setErr("Fill in all fields");return;}
    if(!isLogin&&!form.name){setErr("What's your name?");return;}
    onAuth({name:form.name||form.email.split("@")[0],email:form.email,prefs});
  };
  const Cls = isDesktop?"modal":"sheet";

  return (
    <div className="overlay" onClick={onClose} style={{background:"rgba(0,0,0,.75)",backdropFilter:"blur(16px)"}}>
      <div className={Cls} onClick={e=>e.stopPropagation()} style={{background:c.s1,border:`1px solid ${c.border}`}}>
        {!isDesktop && <div style={{width:38,height:4,borderRadius:2,background:c.s4,margin:"16px auto 24px"}}/>}
        {isDesktop && <button onClick={onClose} className="tap" style={{position:"absolute",top:20,right:20,width:32,height:32,borderRadius:10,border:`1px solid ${c.border}`,background:c.s2,color:c.text2,fontSize:15,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>}

        <div style={{marginBottom:28}}>
          <div style={{fontSize:28,fontWeight:900,color:c.text,letterSpacing:"-.5px",marginBottom:6,lineHeight:1.1}}>
            {isLogin?"Welcome back.":"Create account."}
          </div>
          <div style={{fontSize:14,color:c.text2,lineHeight:1.5}}>
            {isLogin?"Your deals are waiting.":"Free. No spam. Real savings."}
          </div>
        </div>

        {err && <div style={{background:"rgba(248,113,113,.12)",border:"1px solid rgba(248,113,113,.25)",borderRadius:12,padding:"11px 14px",color:"#FCA5A5",fontSize:13,fontWeight:500,marginBottom:16}}>{err}</div>}

        {!isLogin && <input className="field" placeholder="First name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/>}
        <input className="field" placeholder="Email address" type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/>
        <input className="field" placeholder="Password" type="password" value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))}/>

        {!isLogin && (
          <div style={{background:c.s2,borderRadius:16,padding:"16px",marginBottom:16,border:`1px solid ${c.border}`}}>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:c.text3,marginBottom:14}}>Alert me when</div>
            {[{k:"deals",l:"New hot deals"},{k:"drops",l:"Price drops"},{k:"wish",l:"Wishlist updates"}].map(({k,l})=>(
              <div key={k} onClick={()=>setPrefs(p=>({...p,[k]:!p[k]}))}
                style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:`1px solid ${c.border}`,cursor:"pointer"}}>
                <span style={{fontSize:14,color:c.text,fontWeight:400}}>{l}</span>
                <div style={{width:46,height:25,borderRadius:13,background:prefs[k]?"#6EE7B7":c.s4,transition:"background .2s",position:"relative",flexShrink:0}}>
                  <div style={{position:"absolute",top:3,left:prefs[k]?23:3,width:19,height:19,borderRadius:"50%",background:prefs[k]?"#080810":"#fff",transition:"left .2s",boxShadow:"0 1px 4px rgba(0,0,0,.3)"}}/>
                </div>
              </div>
            ))}
          </div>
        )}

        <button className="tap" onClick={submit}
          style={{width:"100%",padding:"15px",borderRadius:14,border:"none",background:"#6EE7B7",color:"#080810",fontWeight:800,fontSize:15,marginBottom:14,boxShadow:"0 6px 28px rgba(110,231,183,.35)"}}>
          {isLogin?"Sign in →":"Create account →"}
        </button>
        <div style={{textAlign:"center",fontSize:13,color:c.text3}}>
          {isLogin?"No account? ":"Already a member? "}
          <span onClick={()=>{setIsLogin(!isLogin);setErr("");}} style={{color:"#6EE7B7",fontWeight:600,cursor:"pointer"}}>{isLogin?"Sign up free":"Sign in"}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Add Deal ──────────────────────────────────────────────────────
const SMAP = {
  "amazon.com":{name:"Amazon",logo:"🛒"},"target.com":{name:"Target",logo:"🎯"},
  "bestbuy.com":{name:"Best Buy",logo:"💛"},"nike.com":{name:"Nike",logo:"✔"},
  "apple.com":{name:"Apple",logo:"🍎"},"walmart.com":{name:"Walmart",logo:"⭐"},
};

function AddSheet({ c, dark, isDesktop, onClose, onAdd }) {
  const [step,setStep] = useState("url");
  const [url,setUrl]   = useState("");
  const [err,setErr]   = useState("");
  const [form,setForm] = useState({title:"",sub:"",was:"",now:"",code:"",cat:"Electronics",timer:"",img:"",store:"",hot:false});

  const ds = u=>{ try{ const h=new URL(u).hostname.replace("www.",""); for(const[d,i]of Object.entries(SMAP))if(h.includes(d))return i; }catch{} return {name:"Store",logo:"🔗"}; };

  const analyze = async ()=>{
    if(!url.trim())return;
    setStep("loading");setErr("");
    const s=ds(url);
    try {
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:600,
          messages:[{role:"user",content:`URL: ${url}\nReturn ONLY JSON:\n{"title":"","sub":"","was":0,"now":0,"code":"","cat":"Electronics","img":""}`}]})});
      const data=await res.json();
      const p=JSON.parse((data.content?.find(b=>b.type==="text")?.text||"{}").replace(/```json|```/g,"").trim());
      setForm({...p,was:Number(p.was)||0,now:Number(p.now)||0,store:s.name,storeLogo:s.logo,timer:"",hot:false});
      setStep("edit");
    } catch {
      setForm(f=>({...f,store:s.name,storeLogo:s.logo}));
      setErr("Auto-fill failed — fill in manually.");
      setStep("edit");
    }
  };

  const save=()=>{
    if(!form.title||!form.now)return;
    const was=Number(form.was)||0,now=Number(form.now)||0;
    onAdd({id:Date.now(),title:form.title,sub:form.sub,cat:form.cat||"Electronics",
      img:form.img||"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
      was,now,store:form.store,pct:was>0?Math.round((1-now/was)*100):0,
      timer:form.timer||null,hot:form.hot,code:form.code||`SAVE${Math.round((1-now/was)*100)}`,
      accent:"#6EE7B7"});
    onClose();
  };

  const Cls=isDesktop?"modal":"sheet";
  const fSt={width:"100%",padding:"12px 14px",borderRadius:12,border:`1px solid ${c.border}`,background:c.s2,color:c.text,fontSize:14,marginBottom:10,display:"block",transition:"border .15s"};

  return (
    <div className="overlay" onClick={onClose} style={{background:"rgba(0,0,0,.75)",backdropFilter:"blur(16px)"}}>
      <div className={Cls} onClick={e=>e.stopPropagation()} style={{background:c.s1,border:`1px solid ${c.border}`}}>
        {!isDesktop&&<div style={{width:38,height:4,borderRadius:2,background:c.s4,margin:"16px auto 20px"}}/>}
        {isDesktop&&<button onClick={onClose} className="tap" style={{position:"absolute",top:20,right:20,width:32,height:32,borderRadius:10,border:`1px solid ${c.border}`,background:c.s2,color:c.text2,fontSize:15,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>}

        {step==="url"&&(
          <>
            <div style={{fontSize:26,fontWeight:900,color:c.text,marginBottom:6,letterSpacing:"-.5px"}}>Add a deal</div>
            <div style={{fontSize:13,color:c.text2,marginBottom:20}}>Paste a product URL — AI fills the details automatically</div>
            <input autoFocus className="field" value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://amazon.com/dp/..."
              onKeyDown={e=>e.key==="Enter"&&analyze()} style={{fontSize:15,marginBottom:14}}/>
            <button className="tap" onClick={analyze} disabled={!url.trim()}
              style={{width:"100%",padding:"14px",borderRadius:14,border:"none",background:url.trim()?"#6EE7B7":c.s4,color:url.trim()?"#080810":c.text3,fontWeight:800,fontSize:14,marginBottom:12,boxShadow:url.trim()?"0 4px 20px rgba(110,231,183,.3)":"none"}}>
              Analyze with AI →
            </button>
            <div style={{textAlign:"center"}}><span onClick={()=>setStep("edit")} style={{fontSize:12,color:c.text3,cursor:"pointer",textDecoration:"underline"}}>fill in manually</span></div>
          </>
        )}

        {step==="loading"&&(
          <div style={{textAlign:"center",padding:"56px 0"}}>
            <div style={{fontSize:52,marginBottom:14,animation:"spin 2s linear infinite",display:"inline-block"}}>🤖</div>
            <div style={{fontSize:20,fontWeight:800,color:c.text,marginBottom:6}}>Analyzing...</div>
            <div style={{fontSize:13,color:c.text2}}>AI is reading the product</div>
          </div>
        )}

        {step==="edit"&&(
          <>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <div style={{fontSize:22,fontWeight:900,color:c.text,letterSpacing:"-.4px"}}>Review & edit</div>
              <button onClick={()=>setStep("url")} style={{background:"none",border:"none",color:c.text3,fontSize:12,cursor:"pointer",textDecoration:"underline"}}>Back</button>
            </div>
            {err&&<div style={{background:c.s2,borderRadius:12,padding:"10px 14px",color:"#FCA5A5",fontSize:13,marginBottom:14}}>{err}</div>}
            <div style={{display:"flex",gap:12,alignItems:"center",padding:"14px",background:c.s2,borderRadius:16,marginBottom:20,border:`1px solid ${c.border}`}}>
              <div style={{width:52,height:52,borderRadius:12,overflow:"hidden",background:c.s3,flexShrink:0}}>
                {form.img&&<img src={form.img} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:14,fontWeight:700,color:c.text,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{form.title||"—"}</div>
                <div style={{fontSize:12,color:c.text3,marginTop:2}}>{form.store}</div>
                <div style={{display:"flex",gap:8,alignItems:"baseline",marginTop:4}}>
                  <span style={{fontSize:16,fontWeight:800,color:c.text}}>{form.now?fp(form.now):"—"}</span>
                  {form.was&&<span style={{fontSize:12,color:c.text3,textDecoration:"line-through"}}>{fp(form.was)}</span>}
                </div>
              </div>
            </div>
            <input className="field" placeholder="Title *" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} style={fSt}/>
            <input className="field" placeholder="Subtitle" value={form.sub} onChange={e=>setForm(f=>({...f,sub:e.target.value}))} style={fSt}/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <input className="field" placeholder="Was $" type="number" value={form.was} onChange={e=>setForm(f=>({...f,was:e.target.value}))} style={fSt}/>
              <input className="field" placeholder="Now $ *" type="number" value={form.now} onChange={e=>setForm(f=>({...f,now:e.target.value}))} style={fSt}/>
            </div>
            <input className="field" placeholder="Coupon code" value={form.code} onChange={e=>setForm(f=>({...f,code:e.target.value}))} style={fSt}/>
            <input className="field" placeholder="Image URL" value={form.img} onChange={e=>setForm(f=>({...f,img:e.target.value}))} style={fSt}/>
            <input className="field" placeholder="Timer e.g. 02:00:00" value={form.timer} onChange={e=>setForm(f=>({...f,timer:e.target.value}))} style={fSt}/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
              <select className="field" value={form.cat} onChange={e=>setForm(f=>({...f,cat:e.target.value}))} style={fSt}>
                {["Electronics","Fashion","Home","Other"].map(x=><option key={x}>{x}</option>)}
              </select>
              <select className="field" value={form.hot?"hot":"normal"} onChange={e=>setForm(f=>({...f,hot:e.target.value==="hot"}))} style={fSt}>
                <option value="normal">Regular</option>
                <option value="hot">Hot deal</option>
              </select>
            </div>
            <button className="tap" onClick={save} disabled={!form.title||!form.now}
              style={{width:"100%",padding:"14px",borderRadius:14,border:"none",background:(form.title&&form.now)?"#6EE7B7":c.s4,color:(form.title&&form.now)?"#080810":c.text3,fontWeight:800,fontSize:14,boxShadow:(form.title&&form.now)?"0 4px 20px rgba(110,231,183,.3)":"none"}}>
              Publish deal
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Notif Sheet ──────────────────────────────────────────────────
function NotifSheet({ notifs, c, isDesktop, onClear, onClose }) {
  const Cls=isDesktop?"modal":"sheet";
  return (
    <div className="overlay" onClick={onClose} style={{background:"rgba(0,0,0,.7)",backdropFilter:"blur(14px)"}}>
      <div className={Cls} onClick={e=>e.stopPropagation()} style={{background:c.s1,border:`1px solid ${c.border}`}}>
        {!isDesktop&&<div style={{width:38,height:4,borderRadius:2,background:c.s4,margin:"16px auto 0"}}/>}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 0 18px"}}>
          <div style={{fontSize:22,fontWeight:900,color:c.text,letterSpacing:"-.4px"}}>Notifications</div>
          <div style={{display:"flex",gap:14,alignItems:"center"}}>
            <span onClick={onClear} style={{fontSize:12,color:c.text3,cursor:"pointer",textDecoration:"underline"}}>Clear all</span>
            {isDesktop&&<button onClick={onClose} className="tap" style={{width:30,height:30,borderRadius:8,border:`1px solid ${c.border}`,background:c.s2,color:c.text2,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>}
          </div>
        </div>
        <div style={{maxHeight:"55vh",overflowY:"auto"}}>
          {notifs.length===0?(
            <div style={{textAlign:"center",padding:"48px 0",color:c.text3}}>
              <div style={{fontSize:40,marginBottom:10}}>🔕</div>
              <div style={{fontSize:16,fontWeight:600,color:c.text,marginBottom:4}}>All caught up</div>
              <div style={{fontSize:13}}>Alerts land here when prices drop</div>
            </div>
          ):notifs.map(n=>(
            <div key={n.id} style={{display:"flex",gap:14,padding:"14px 0",borderBottom:`1px solid ${c.border}`,alignItems:"flex-start"}}>
              <div style={{width:44,height:44,borderRadius:12,background:c.s2,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0,border:`1px solid ${c.border}`}}>{n.icon}</div>
              <div>
                <div style={{fontSize:14,fontWeight:600,color:c.text,marginBottom:3}}>{n.title}</div>
                <div style={{fontSize:13,color:c.text2,lineHeight:1.4}}>{n.body}</div>
                <div style={{fontSize:11,color:c.text3,marginTop:4}}>{n.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────
function Header({ c, dark, toggle, user, notifCount, onSignIn, onNotif, onAddDeal, isAdmin }) {
  const { isDesktop } = useBreakpoint();
  return (
    <header className="glass" style={{borderBottom:`1px solid ${c.border}`,position:"sticky",top:0,zIndex:100}}>
      <div className="page" style={{height:62,display:"flex",alignItems:"center",gap:16}}>
        {/* Logo */}
        <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
          <div style={{width:32,height:32,borderRadius:10,background:"linear-gradient(135deg,#6EE7B7,#93C5FD)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(110,231,183,.4)"}}>
            <span style={{fontSize:15,fontWeight:900,color:"#080810",fontFamily:"serif",lineHeight:1}}>N</span>
          </div>
          <div>
            <span style={{fontSize:17,fontWeight:900,color:c.text,letterSpacing:"-.5px"}}>nikki</span>
            <span className="grad" style={{fontSize:17,fontWeight:900,letterSpacing:"-.5px"}}>deals</span>
            <span style={{fontSize:11,color:c.text3,fontWeight:400}}>.com</span>
          </div>
        </div>

        <div style={{flex:1}}/>

        <div style={{display:"flex",alignItems:"center",gap:8}}>
          {isAdmin&&isDesktop&&(
            <button className="tap" onClick={onAddDeal}
              style={{padding:"8px 16px",borderRadius:10,border:`1px solid ${c.border}`,background:"transparent",color:c.text2,fontSize:13,fontWeight:600,letterSpacing:".01em"}}>
              + Add deal
            </button>
          )}
          <button className="tap" onClick={toggle}
            style={{width:36,height:36,borderRadius:10,border:`1px solid ${c.border}`,background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>
            {dark?"☀️":"🌙"}
          </button>
          {user&&(
            <button className="tap" onClick={onNotif}
              style={{width:36,height:36,borderRadius:10,border:`1px solid ${c.border}`,background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,position:"relative"}}>
              🔔
              {notifCount>0&&<span style={{position:"absolute",top:7,right:7,width:7,height:7,borderRadius:"50%",background:"#6EE7B7",border:`2px solid ${c.s1}`}}/>}
            </button>
          )}
          {user?(
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:32,height:32,borderRadius:9,background:"linear-gradient(135deg,#6EE7B7,#93C5FD)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,color:"#080810",fontSize:13}}>
                {user.name[0].toUpperCase()}
              </div>
              {isDesktop&&<span style={{fontSize:13,color:c.text2,fontWeight:500}}>{user.name}</span>}
            </div>
          ):(
            <button className="tap" onClick={onSignIn}
              style={{padding:"9px 20px",borderRadius:10,border:"none",background:"#6EE7B7",color:"#080810",fontSize:13,fontWeight:700,boxShadow:"0 4px 16px rgba(110,231,183,.35)"}}>
              Sign in
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────
function Hero({ deals, c, dark }) {
  const hot = deals.filter(d=>d.hot).length;
  const topPct = Math.max(...deals.map(d=>d.pct));
  const topSave = Math.max(...deals.map(d=>d.was-d.now));
  return (
    <div style={{borderBottom:`1px solid ${c.border}`,padding:"64px 0 56px",position:"relative",overflow:"hidden"}}>
      {/* Background glow orbs */}
      <div style={{position:"absolute",top:-100,left:"10%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(110,231,183,.08),transparent 70%)",pointerEvents:"none",animation:"glow 6s ease-in-out infinite"}}/>
      <div style={{position:"absolute",top:-60,right:"5%",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(147,197,253,.06),transparent 70%)",pointerEvents:"none",animation:"glow 8s ease-in-out infinite 2s"}}/>

      <div className="page" style={{position:"relative"}}>
        {/* Live badge */}
        <div style={{display:"inline-flex",alignItems:"center",gap:8,background:dark?"rgba(110,231,183,.1)":"rgba(110,231,183,.15)",border:"1px solid rgba(110,231,183,.25)",borderRadius:20,padding:"5px 14px",marginBottom:20}}>
          <span className="live-dot" style={{width:6,height:6,borderRadius:"50%",background:"#6EE7B7",display:"inline-block"}}/>
          <span style={{fontSize:11,fontWeight:700,color:"#6EE7B7",letterSpacing:".06em",textTransform:"uppercase"}}>Live · {deals.length} deals today</span>
        </div>

        {/* Headline */}
        <h1 style={{fontSize:"clamp(38px,5.5vw,74px)",fontWeight:900,letterSpacing:"-2px",lineHeight:1.02,marginBottom:16,maxWidth:760}}>
          <span style={{color:c.text}}>The internet's</span><br/>
          <span className="grad">best deals</span>
          <span style={{color:c.text2,fontWeight:300,fontStyle:"italic"}}> — curated daily.</span>
        </h1>

        <p style={{fontSize:16,color:c.text2,maxWidth:520,lineHeight:1.65,marginBottom:40,fontWeight:400}}>
          Save up to {topPct}% on electronics, fashion, and home. Real-time price tracking and alerts when things drop.
        </p>

        {/* Stat chips */}
        <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
          {[
            {n:hot,l:"Hot deals",c:"#6EE7B7"},
            {n:`${topPct}%`,l:"Top discount",c:"#93C5FD"},
            {n:`$${topSave}`,l:"Max savings",c:"#C4B5FD"},
          ].map(s=>(
            <div key={s.l} style={{background:dark?"rgba(255,255,255,.04)":"rgba(0,0,0,.04)",border:`1px solid ${c.border}`,borderRadius:14,padding:"14px 20px",minWidth:110,backdropFilter:"blur(10px)"}}>
              <div style={{fontSize:26,fontWeight:900,color:s.c,letterSpacing:"-1px"}}>{s.n}</div>
              <div style={{fontSize:11,color:c.text3,fontWeight:600,letterSpacing:".05em",textTransform:"uppercase",marginTop:3}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Filter Bar ───────────────────────────────────────────────────
function FilterBar({ cat, setCat, sort, setSort, search, setSearch, c, dark }) {
  return (
    <div className="glass" style={{borderBottom:`1px solid ${c.border}`,position:"sticky",top:62,zIndex:90}}>
      <div className="page" style={{height:54,display:"flex",alignItems:"center",gap:10,overflowX:"auto",scrollbarWidth:"none"}}>
        {CATS.map(x=>{
          const active=cat===x;
          return (
            <button key={x} className="tap" onClick={()=>setCat(x)}
              style={{padding:"5px 16px",borderRadius:20,border:`1px solid ${active?"#6EE7B7":c.border}`,background:active?"#6EE7B7":"transparent",color:active?"#080810":c.text2,fontSize:13,fontWeight:active?700:500,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,transition:"all .15s",boxShadow:active?"0 4px 16px rgba(110,231,183,.3)":"none"}}>
              {x}
            </button>
          );
        })}
        <div style={{width:1,height:20,background:c.border,flexShrink:0,margin:"0 4px"}}/>
        <select value={sort} onChange={e=>setSort(e.target.value)}
          style={{padding:"5px 12px",borderRadius:10,border:`1px solid ${c.border}`,background:"transparent",color:c.text2,fontSize:12,fontWeight:500,cursor:"pointer",flexShrink:0}}>
          <option value="hot">🔥 Trending</option>
          <option value="disc">💸 Biggest discount</option>
          <option value="low">↑ Price</option>
          <option value="high">↓ Price</option>
        </select>
        <div style={{flex:1,maxWidth:200,marginLeft:"auto"}}>
          <div style={{position:"relative"}}>
            <svg style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)"}} width="12" height="12" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke={c.text3} strokeWidth="2.5"/>
              <path d="M21 21l-4.35-4.35" stroke={c.text3} strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..."
              style={{width:"100%",padding:"5px 10px 5px 28px",borderRadius:10,border:`1px solid ${c.border}`,background:"transparent",color:c.text,fontSize:13}}/>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tab Navigation ───────────────────────────────────────────────
function TabNav({ tab, setTab, c, wishlist, tracked }) {
  const items=[{id:"deals",l:"Deals"},{id:"saved",l:"Saved",b:wishlist.length},{id:"tracking",l:"Tracking",b:tracked.length},{id:"account",l:"Account"}];
  return (
    <div className="glass desktop-only" style={{borderBottom:`1px solid ${c.border}`}}>
      <div className="page" style={{display:"flex",height:46}}>
        {items.map(n=>{
          const a=tab===n.id;
          return (
            <button key={n.id} className="tap" onClick={()=>setTab(n.id)}
              style={{padding:"0 18px",height:"100%",border:"none",borderBottom:`2px solid ${a?"#6EE7B7":"transparent"}`,background:"transparent",color:a?c.text:c.text2,fontSize:13,fontWeight:a?700:400,cursor:"pointer",display:"flex",alignItems:"center",gap:7,marginBottom:-1,transition:"color .15s"}}>
              {n.l}
              {n.b>0&&<span style={{background:"#6EE7B7",color:"#080810",fontSize:10,fontWeight:800,padding:"1px 7px",borderRadius:10}}>{n.b}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Bottom Nav ───────────────────────────────────────────────────
function BottomNav({ tab, setTab, c, wishlist, tracked }) {
  const items=[{id:"deals",icon:"⚡",l:"Deals"},{id:"saved",icon:"⭐",l:"Saved",b:wishlist.length},{id:"tracking",icon:"📈",l:"Track",b:tracked.length},{id:"account",icon:"👤",l:"Me"}];
  return (
    <nav className="glass mobile-only" style={{position:"fixed",bottom:0,left:0,right:0,borderTop:`1px solid ${c.border}`,display:"flex",zIndex:200,paddingBottom:"env(safe-area-inset-bottom,8px)"}}>
      {items.map(n=>{
        const a=tab===n.id;
        return (
          <button key={n.id} className="tap" onClick={()=>setTab(n.id)}
            style={{flex:1,padding:"10px 4px 6px",border:"none",background:"transparent",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,position:"relative"}}>
            {a&&<div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:20,height:2,borderRadius:"0 0 2px 2px",background:"#6EE7B7"}}/>}
            <span style={{fontSize:20,position:"relative"}}>
              {n.icon}
              {n.b>0&&<span style={{position:"absolute",top:-4,right:-7,background:"#6EE7B7",color:"#080810",fontSize:9,fontWeight:900,minWidth:15,height:15,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 2px",border:`2px solid ${c.bg}`}}>{n.b}</span>}
            </span>
            <span style={{fontSize:10,fontWeight:a?700:400,color:a?"#6EE7B7":c.text3}}>{n.l}</span>
          </button>
        );
      })}
    </nav>
  );
}

// ─── Pages ────────────────────────────────────────────────────────
function SavedPage({ wishlist, tracked, deals, onWish, onTrack, onGet, c, dark }) {
  const items=deals.filter(d=>wishlist.includes(d.id));
  return (
    <div className="page" style={{padding:"40px 0 100px"}}>
      <div style={{fontSize:28,fontWeight:900,color:c.text,letterSpacing:"-.6px",marginBottom:4}}>Saved deals</div>
      <div style={{fontSize:13,color:c.text3,marginBottom:32}}>{items.length} saved</div>
      {items.length>0
        ?<div className="deal-grid">{items.map((d,i)=><DealCard key={d.id} d={d} wishlist={wishlist} tracked={tracked} onWish={onWish} onTrack={onTrack} onGet={onGet} c={c} dark={dark} delay={i*.04}/>)}</div>
        :<div style={{textAlign:"center",padding:"80px 0",color:c.text3}}><div style={{fontSize:40,marginBottom:12}}>🤍</div><div style={{fontSize:18,fontWeight:600,color:c.text2}}>Nothing saved yet</div></div>
      }
    </div>
  );
}

function TrackingPage({ tracked, deals, onTrack, c }) {
  const items=deals.filter(d=>tracked.includes(d.id));
  return (
    <div className="page" style={{padding:"40px 0 100px"}}>
      <div style={{fontSize:28,fontWeight:900,color:c.text,letterSpacing:"-.6px",marginBottom:4}}>Price tracker</div>
      <div style={{fontSize:13,color:c.text3,marginBottom:32}}>Watching {items.length} item{items.length!==1?"s":""}</div>
      {items.length>0
        ?<div style={{display:"flex",flexDirection:"column",gap:12}}>
          {items.map(d=>(
            <div key={d.id} style={{display:"flex",alignItems:"center",gap:16,padding:"18px 20px",background:c.s1,borderRadius:18,border:`1px solid ${c.border}`,boxShadow:`0 2px 12px rgba(0,0,0,.15)`}}>
              <div style={{width:60,height:60,borderRadius:14,overflow:"hidden",background:c.s2,flexShrink:0}}>
                <img src={d.img} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:16,fontWeight:800,color:c.text,letterSpacing:"-.2px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{d.title}</div>
                <div style={{fontSize:12,color:c.text3,marginTop:2}}>{d.store}</div>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <div style={{fontSize:22,fontWeight:900,color:c.text,letterSpacing:"-.8px"}}>{fp(d.now)}</div>
                <div style={{fontSize:11,color:d.accent||"#6EE7B7",fontWeight:600,marginTop:2}}>-{d.pct}% off</div>
              </div>
              {d.timer&&<Timer time={d.timer} style={{fontSize:11,color:c.text3,fontWeight:600,minWidth:56,textAlign:"right"}}/>}
              <button className="tap" onClick={()=>onTrack(d.id)}
                style={{padding:"8px 14px",borderRadius:10,border:`1px solid ${c.border}`,background:"transparent",color:c.text3,fontSize:12,fontWeight:500,cursor:"pointer",flexShrink:0}}>
                Stop
              </button>
            </div>
          ))}
        </div>
        :<div style={{textAlign:"center",padding:"80px 0",color:c.text3}}><div style={{fontSize:40,marginBottom:12}}>📊</div><div style={{fontSize:18,fontWeight:600,color:c.text2}}>Nothing tracked yet</div></div>
      }
    </div>
  );
}

function AccountPage({ user, wishlist, tracked, c, dark, toggle, onSignIn, onSignOut, isAdmin, onAddDeal }) {
  if(!user) return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"60vh"}}>
      <div style={{textAlign:"center",maxWidth:360,padding:"0 24px"}}>
        <div style={{width:72,height:72,borderRadius:20,background:"linear-gradient(135deg,#6EE7B7,#93C5FD)",margin:"0 auto 20px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,boxShadow:"0 8px 28px rgba(110,231,183,.3)"}}>👤</div>
        <div style={{fontSize:28,fontWeight:900,color:c.text,letterSpacing:"-.6px",marginBottom:8}}>Your account</div>
        <p style={{fontSize:14,color:c.text2,lineHeight:1.6,marginBottom:28}}>Sign in to manage your wishlist, price alerts, and deal history.</p>
        <button className="tap" onClick={onSignIn}
          style={{padding:"14px 32px",borderRadius:14,border:"none",background:"#6EE7B7",color:"#080810",fontWeight:800,fontSize:15,boxShadow:"0 6px 24px rgba(110,231,183,.35)"}}>
          Sign in →
        </button>
      </div>
    </div>
  );
  return (
    <div className="page" style={{padding:"40px 0 100px",maxWidth:600}}>
      {/* Profile card */}
      <div style={{borderRadius:20,overflow:"hidden",marginBottom:20,border:`1px solid ${c.border}`}}>
        <div style={{background:"linear-gradient(135deg,#6EE7B7 0%,#93C5FD 50%,#C4B5FD 100%)",padding:"28px 24px",display:"flex",alignItems:"center",gap:16}}>
          <div style={{width:56,height:56,borderRadius:16,background:"rgba(8,8,16,.3)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,color:"#fff",fontSize:22,flexShrink:0}}>
            {user.name[0].toUpperCase()}
          </div>
          <div>
            <div style={{fontSize:20,fontWeight:900,color:"#080810",letterSpacing:"-.4px"}}>{user.name}</div>
            <div style={{fontSize:13,color:"rgba(8,8,16,.6)",marginTop:2}}>{user.email}</div>
          </div>
        </div>
        <div style={{background:c.s1,display:"grid",gridTemplateColumns:"1fr 1fr 1fr"}}>
          {[[wishlist.length,"Saved"],[tracked.length,"Tracking"],[DEALS_DATA.length,"Deals"]].map(([n,l],i)=>(
            <div key={l} style={{padding:"16px",textAlign:"center",borderRight:i<2?`1px solid ${c.border}`:"none"}}>
              <div style={{fontSize:24,fontWeight:900,color:c.text,letterSpacing:"-.8px"}}>{n}</div>
              <div style={{fontSize:11,color:c.text3,fontWeight:600,letterSpacing:".05em",textTransform:"uppercase",marginTop:3}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Theme toggle */}
      <div style={{background:c.s1,borderRadius:16,marginBottom:14,border:`1px solid ${c.border}`}}>
        <div onClick={toggle} style={{display:"flex",alignItems:"center",gap:14,padding:"16px 20px",cursor:"pointer"}}>
          <span style={{fontSize:20}}>{dark?"☀️":"🌙"}</span>
          <div style={{flex:1,fontSize:14,fontWeight:500,color:c.text}}>{dark?"Switch to light":"Switch to dark"}</div>
          <div style={{width:44,height:24,borderRadius:12,background:dark?"#6EE7B7":c.s4,position:"relative",transition:"background .25s"}}>
            <div style={{position:"absolute",top:3,left:dark?22:3,width:18,height:18,borderRadius:"50%",background:dark?"#080810":"#fff",transition:"left .25s",boxShadow:"0 1px 3px rgba(0,0,0,.3)"}}/>
          </div>
        </div>
      </div>

      {isAdmin&&(
        <div style={{marginBottom:14}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:c.text3,marginBottom:10}}>Admin</div>
          <button className="tap" onClick={onAddDeal}
            style={{width:"100%",padding:"14px",borderRadius:14,border:"none",background:"#6EE7B7",color:"#080810",fontWeight:800,fontSize:14,boxShadow:"0 4px 20px rgba(110,231,183,.3)"}}>
            + Add New Deal
          </button>
        </div>
      )}

      <div style={{background:c.s1,borderRadius:16,overflow:"hidden",border:`1px solid ${c.border}`,marginBottom:14}}>
        {[{i:"🔔",l:"Notifications"},{i:"🏷️",l:"Preferences"},{i:"🔒",l:"Security"},{i:"💬",l:"Help"}].map((r,i,arr)=>(
          <div key={r.l} style={{display:"flex",alignItems:"center",gap:14,padding:"15px 20px",borderBottom:i<arr.length-1?`1px solid ${c.border}`:"none",cursor:"pointer"}}>
            <span style={{fontSize:18}}>{r.i}</span>
            <span style={{flex:1,fontSize:14,fontWeight:400,color:c.text}}>{r.l}</span>
            <span style={{color:c.text3,fontSize:16}}>›</span>
          </div>
        ))}
      </div>
      <button className="tap" onClick={onSignOut}
        style={{width:"100%",padding:"14px",borderRadius:14,border:`1px solid ${c.border}`,background:"transparent",color:c.text3,fontSize:14,cursor:"pointer"}}>
        Sign out
      </button>
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────
function Toasts({ items, remove, c }) {
  return (
    <div style={{position:"fixed",bottom:80,right:20,zIndex:9999,display:"flex",flexDirection:"column",gap:8,pointerEvents:"none",maxWidth:320}}>
      {items.map(it=>(
        <div key={it.id} onClick={()=>remove(it.id)} style={{
          background:c.s2,border:`1px solid ${c.border}`,
          borderRadius:14,padding:"13px 16px",
          display:"flex",alignItems:"center",gap:12,
          boxShadow:"0 8px 32px rgba(0,0,0,.4)",
          animation:"fadeUp .35s cubic-bezier(.34,1.2,.64,1)",
          pointerEvents:"all",cursor:"pointer",
        }}>
          <span style={{fontSize:18}}>{it.icon}</span>
          <span style={{flex:1,fontSize:13,fontWeight:500,color:c.text}}>{it.msg}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────
function Footer({ c }) {
  return (
    <footer style={{borderTop:`1px solid ${c.border}`,marginTop:64}}>
      <div className="page" style={{padding:"28px 0",display:"flex",flexWrap:"wrap",gap:12,alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:22,height:22,borderRadius:7,background:"linear-gradient(135deg,#6EE7B7,#93C5FD)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{fontSize:10,fontWeight:900,color:"#080810",fontFamily:"serif"}}>N</span>
          </div>
          <span style={{fontSize:14,fontWeight:700,color:c.text,letterSpacing:"-.3px"}}>nikkideals<span style={{color:c.text3,fontWeight:400}}>.com</span></span>
        </div>
        <div style={{fontSize:12,color:c.text3}}>Best deals daily · Updated hourly · admin@nikkideals.com</div>
      </div>
    </footer>
  );
}

// ─── Main ─────────────────────────────────────────────────────────
export default function App() {
  const { dark, toggle, c } = useTheme();
  const { isDesktop, isMobile } = useBreakpoint();

  const [tab,setTab]           = useState("deals");
  const [cat,setCat]           = useState("All");
  const [sort,setSort]         = useState("hot");
  const [search,setSearch]     = useState("");
  const [user,setUser]         = useState(null);
  const [deals,setDeals]       = useState(DEALS_DATA);
  const [wishlist,setWishlist] = useState([]);
  const [tracked,setTracked]   = useState([]);
  const [notifs,setNotifs]     = useState([]);
  const [activeDeal,setActiveDeal]   = useState(null);
  const [showAuth,setShowAuth]       = useState(null);
  const [showNotif,setShowNotif]     = useState(false);
  const [showAdd,setShowAdd]         = useState(false);
  const [toasts,setToasts]           = useState([]);

  const isAdmin = user?.email === ADMIN_EMAIL;

  // Inject CSS
  useEffect(()=>{
    let el=document.getElementById("nd3css");
    if(!el){el=document.createElement("style");el.id="nd3css";document.head.appendChild(el);}
    el.textContent=makeCSS(dark);
  },[dark]);

  // Notifications on login
  useEffect(()=>{
    if(!user)return;
    const tm=setTimeout(()=>{
      setNotifs([
        {id:uid(),icon:"📉",title:"Price dropped",body:"Sony WH-1000XM5 → $179",time:"Just now"},
        {id:uid(),icon:"⏱",title:"Flash deal expiring",body:"Stanley Quencher — 2h left",time:"4m ago"},
        {id:uid(),icon:"⭐",title:"Wishlist alert",body:"Nike Air Max 270 → $74",time:"11m ago"},
      ]);
      addToast({msg:"3 new price alerts",icon:"📉"});
    },4000);
    return ()=>clearTimeout(tm);
  },[user]);

  const addToast = useCallback(({msg,icon})=>{
    const id=uid();
    setToasts(p=>[...p,{id,msg,icon}]);
    setTimeout(()=>setToasts(p=>p.filter(x=>x.id!==id)),4000);
  },[]);

  const toggleWish  = id=>{if(!user){setShowAuth("signup");return;}setWishlist(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]);};
  const toggleTrack = id=>{if(!user){setShowAuth("signup");return;}setTracked(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);};
  const handleAuth  = u =>{setUser(u);setShowAuth(null);addToast({msg:`Welcome, ${u.name}`,icon:"👋"});};
  const handleOut   = () =>{setUser(null);setWishlist([]);setTracked([]);setNotifs([]);addToast({msg:"Signed out",icon:"✓"});};
  const handleAdd   = d =>{setDeals(p=>[d,...p]);addToast({msg:"Deal published",icon:"✓"});};

  const filtered=deals
    .filter(d=>(cat==="All"||d.cat===cat)&&(d.title+d.store).toLowerCase().includes(search.toLowerCase()))
    .sort((a,b)=>sort==="hot"?(b.hot?1:0)-(a.hot?1:0):sort==="disc"?b.pct-a.pct:sort==="low"?a.now-b.now:b.now-a.now);

  return (
    <div style={{minHeight:"100vh",background:c.bg,color:c.text,position:"relative",zIndex:1}}>
      <Ticker deals={deals}/>
      <Header c={c} dark={dark} toggle={toggle} user={user} notifCount={notifs.length}
        onSignIn={()=>setShowAuth("login")} onNotif={()=>setShowNotif(true)}
        onAddDeal={()=>setShowAdd(true)} isAdmin={isAdmin}/>
      <TabNav tab={tab} setTab={setTab} c={c} wishlist={wishlist} tracked={tracked}/>

      {tab==="deals"&&(
        <>
          <Hero deals={deals} c={c} dark={dark}/>
          <FilterBar cat={cat} setCat={setCat} sort={sort} setSort={setSort} search={search} setSearch={setSearch} c={c} dark={dark}/>
          <div className="page" style={{padding:"28px 0",paddingBottom:isMobile?100:60}}>
            {isAdmin&&isMobile&&(
              <button className="tap" onClick={()=>setShowAdd(true)}
                style={{width:"100%",padding:"12px",borderRadius:12,border:`1px solid ${c.border}`,background:"transparent",color:c.text2,fontSize:13,fontWeight:500,marginBottom:20,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                + Add a deal
              </button>
            )}
            {filtered.length>0
              ?<div className="deal-grid">{filtered.map((d,i)=><DealCard key={d.id} d={d} wishlist={wishlist} tracked={tracked} onWish={toggleWish} onTrack={toggleTrack} onGet={setActiveDeal} c={c} dark={dark} delay={Math.min(i*.04,.35)}/>)}</div>
              :<div style={{textAlign:"center",padding:"80px 0",color:c.text3}}><div style={{fontSize:32,marginBottom:12}}>—</div><div style={{fontSize:18,fontWeight:600,color:c.text2}}>No deals match</div></div>
            }
          </div>
          <Footer c={c}/>
        </>
      )}

      {tab==="saved"    &&<><SavedPage wishlist={wishlist} tracked={tracked} deals={deals} onWish={toggleWish} onTrack={toggleTrack} onGet={setActiveDeal} c={c} dark={dark}/><Footer c={c}/></>}
      {tab==="tracking" &&<><TrackingPage tracked={tracked} deals={deals} onTrack={toggleTrack} c={c}/><Footer c={c}/></>}
      {tab==="account"  &&<><AccountPage user={user} wishlist={wishlist} tracked={tracked} c={c} dark={dark} toggle={toggle} onSignIn={()=>setShowAuth("signup")} onSignOut={handleOut} isAdmin={isAdmin} onAddDeal={()=>setShowAdd(true)}/><Footer c={c}/></>}

      <BottomNav tab={tab} setTab={setTab} c={c} wishlist={wishlist} tracked={tracked}/>

      {isAdmin&&isMobile&&tab==="deals"&&(
        <button className="tap" onClick={()=>setShowAdd(true)}
          style={{position:"fixed",bottom:84,right:20,width:50,height:50,borderRadius:"50%",border:"none",background:"#6EE7B7",color:"#080810",fontSize:22,cursor:"pointer",zIndex:300,boxShadow:"0 6px 24px rgba(110,231,183,.45)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>
          +
        </button>
      )}

      {activeDeal &&<DealSheet  d={activeDeal}  c={c} dark={dark} isDesktop={isDesktop} onClose={()=>setActiveDeal(null)}/>}
      {showAuth   &&<AuthSheet  mode={showAuth}  c={c} dark={dark} isDesktop={isDesktop} onClose={()=>setShowAuth(null)}   onAuth={handleAuth}/>}
      {showNotif  &&<NotifSheet notifs={notifs}  c={c} isDesktop={isDesktop} onClear={()=>setNotifs([])} onClose={()=>setShowNotif(false)}/>}
      {showAdd    &&<AddSheet   c={c} dark={dark} isDesktop={isDesktop} onClose={()=>setShowAdd(false)} onAdd={handleAdd}/>}
      <Toasts items={toasts} remove={id=>setToasts(p=>p.filter(x=>x.id!==id))} c={c}/>
    </div>
  );
}
