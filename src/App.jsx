import { useState, useEffect, useRef, useCallback } from "react";

// ─── Config ───────────────────────────────────────────────────────
const ADMIN_EMAIL = "admin@nikkideals.com";

const DEALS = [
  { id:1,  title:"Sony WH-1000XM5",    sub:"Noise Cancelling Headphones",      cat:"Electronics", img:"https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&h=500&fit=crop&q=85", was:349,  now:199, store:"Amazon",   storeLogo:"https://logo.clearbit.com/amazon.com",   pct:43, hot:true,  timer:"05:14:22", code:"SONY43",  rating:4.8, reviews:2341 },
  { id:2,  title:"Nike Air Max 270",   sub:"Men's Running Shoes",               cat:"Fashion",     img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=500&fit=crop&q=85", was:150,  now:74,  store:"Nike",     storeLogo:"https://logo.clearbit.com/nike.com",     pct:51, hot:true,  timer:null,       code:"NIKE51",  rating:4.6, reviews:891  },
  { id:3,  title:"iPad 10th Gen",      sub:"64GB Wi-Fi — Sky Blue",             cat:"Electronics", img:"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=500&fit=crop&q=85", was:449,  now:329, store:"Best Buy", storeLogo:"https://logo.clearbit.com/bestbuy.com",  pct:27, hot:true,  timer:"03:45:10", code:"IPAD27",  rating:4.7, reviews:1203 },
  { id:4,  title:"Dyson V11 Vacuum",   sub:"Cordless, 60-min Runtime",          cat:"Home",        img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=500&fit=crop&q=85", was:599,  now:369, store:"Dyson",    storeLogo:"https://logo.clearbit.com/dyson.com",    pct:38, hot:true,  timer:"08:10:00", code:"DYSON38", rating:4.5, reviews:567  },
  { id:5,  title:"MacBook Air M2",     sub:'13" Midnight, 8-core GPU',          cat:"Electronics", img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=500&fit=crop&q=85", was:1099, now:849, store:"Apple",    storeLogo:"https://logo.clearbit.com/apple.com",    pct:23, hot:false, timer:null,       code:"MAC23",   rating:4.9, reviews:3210 },
  { id:6,  title:"Stanley Quencher",  sub:"40oz H2.0 Flow State Tumbler",      cat:"Home",        img:"https://images.unsplash.com/photo-1635348729200-8b0f2bb00f31?w=600&h=500&fit=crop&q=85", was:40,   now:19,  store:"Target",   storeLogo:"https://logo.clearbit.com/target.com",   pct:52, hot:true,  timer:"02:18:44", code:"STAN52",  rating:4.7, reviews:4502 },
  { id:7,  title:"Levi's 501 Jeans",  sub:"Original Straight Fit",             cat:"Fashion",     img:"https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=500&fit=crop&q=85", was:89,   now:39,  store:"Levi's",   storeLogo:"https://logo.clearbit.com/levi.com",     pct:56, hot:false, timer:null,       code:"LEVI56",  rating:4.4, reviews:678  },
  { id:8,  title:"Kindle Paperwhite", sub:"16GB Waterproof E-Reader",           cat:"Electronics", img:"https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=500&fit=crop&q=85", was:139,  now:84,  store:"Amazon",   storeLogo:"https://logo.clearbit.com/amazon.com",   pct:40, hot:false, timer:"03:20:00", code:"KIND40",  rating:4.6, reviews:1876 },
  { id:9,  title:"KitchenAid Mixer",  sub:"5-Qt Tilt-Head Stand Mixer",        cat:"Home",        img:"https://images.unsplash.com/photo-1556909211-36987daf7b4d?w=600&h=500&fit=crop&q=85", was:449,  now:279, store:"W.Sonoma", storeLogo:"https://logo.clearbit.com/williams-sonoma.com", pct:38, hot:true, timer:null, code:"KAID38", rating:4.8, reviews:923  },
  { id:10, title:"Beats Studio Pro",  sub:"Wireless ANC Headphones",           cat:"Electronics", img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=500&fit=crop&q=85", was:349,  now:179, store:"Best Buy", storeLogo:"https://logo.clearbit.com/bestbuy.com",  pct:49, hot:true,  timer:null,       code:"BEAT49",  rating:4.5, reviews:1102 },
  { id:11, title:"Adidas Ultraboost", sub:"Premium Running Shoe",               cat:"Fashion",     img:"https://images.unsplash.com/photo-1608231387042-66d1773d3028?w=600&h=500&fit=crop&q=85", was:190,  now:109, store:"Adidas",   storeLogo:"https://logo.clearbit.com/adidas.com",   pct:43, hot:false, timer:"04:55:00", code:"ULTR43",  rating:4.6, reviews:745  },
  { id:12, title:"Instant Pot Duo",   sub:"7-in-1 Electric Pressure Cooker",   cat:"Home",        img:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=500&fit=crop&q=85", was:99,   now:49,  store:"Walmart",  storeLogo:"https://logo.clearbit.com/walmart.com",  pct:50, hot:false, timer:null,       code:"INST50",  rating:4.7, reviews:3891 },
];

const STORES = [
  { name:"Amazon",   logo:"https://logo.clearbit.com/amazon.com",   color:"#FF9900" },
  { name:"Walmart",  logo:"https://logo.clearbit.com/walmart.com",  color:"#0071CE" },
  { name:"Best Buy", logo:"https://logo.clearbit.com/bestbuy.com",  color:"#0046BE" },
  { name:"Target",   logo:"https://logo.clearbit.com/target.com",   color:"#CC0000" },
  { name:"Nike",     logo:"https://logo.clearbit.com/nike.com",     color:"#111111" },
  { name:"Apple",    logo:"https://logo.clearbit.com/apple.com",    color:"#555555" },
  { name:"Adidas",   logo:"https://logo.clearbit.com/adidas.com",   color:"#000000" },
];

const CATEGORIES = [
  { id:"All",         label:"All Deals",   emoji:"✦",  color:"#6366F1" },
  { id:"Electronics", label:"Electronics", emoji:"⚡",  color:"#6366F1" },
  { id:"Fashion",     label:"Fashion",     emoji:"👗",  color:"#EC4899" },
  { id:"Home",        label:"Home & Living",emoji:"🏠", color:"#10B981" },
  { id:"Beauty",      label:"Beauty",      emoji:"✨",  color:"#F59E0B" },
  { id:"Sports",      label:"Sports",      emoji:"🏀",  color:"#EF4444" },
];

const fp  = p => `$${Number(p).toFixed(2)}`;
const uid = () => Math.random().toString(36).slice(2,9);

// ─── Theme ────────────────────────────────────────────────────────
const LIGHT = {
  bg:      "#F3F4F8",
  surface: "#FFFFFF",
  surf2:   "#F8F9FB",
  surf3:   "#EEF0F5",
  border:  "#E4E6EF",
  text:    "#111827",
  text2:   "#6B7280",
  text3:   "#9CA3AF",
  accent:  "#6366F1",
  accentD: "#4F46E5",
  accentL: "#EEF2FF",
  badge:   "#FFF7ED",
  badgeT:  "#EA580C",
  shadow:  "rgba(0,0,0,0.06)",
  shadowM: "rgba(0,0,0,0.12)",
};

const DARK = {
  bg:      "#0F1117",
  surface: "#1A1D27",
  surf2:   "#1F2232",
  surf3:   "#252840",
  border:  "#2E3150",
  text:    "#F1F1F9",
  text2:   "#9095B0",
  text3:   "#555A78",
  accent:  "#818CF8",
  accentD: "#6366F1",
  accentL: "#1E2040",
  badge:   "#2A1F12",
  badgeT:  "#FB923C",
  shadow:  "rgba(0,0,0,0.3)",
  shadowM: "rgba(0,0,0,0.5)",
};

function useTheme() {
  const [dark,setDark] = useState(()=>{ try{return localStorage.getItem("nd4-dark")==="1";}catch{return false;} });
  const toggle = ()=>setDark(d=>{ try{localStorage.setItem("nd4-dark",!d?"1":"0");}catch{}; return !d; });
  return { dark, toggle, t: dark?DARK:LIGHT };
}

function useBreakpoint() {
  const [w,setW] = useState(typeof window!=="undefined"?window.innerWidth:1280);
  useEffect(()=>{ const f=()=>setW(window.innerWidth); window.addEventListener("resize",f); return ()=>window.removeEventListener("resize",f); },[]);
  return { isDesktop:w>=768, isMobile:w<768, isWide:w>=1100, width:w };
}

// ─── Global styles ────────────────────────────────────────────────
const CSS = (t) => `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; -webkit-tap-highlight-color:transparent; }
  html { scroll-behavior:smooth; }
  body { font-family:'Plus Jakarta Sans',system-ui,sans-serif; background:${t.bg}; color:${t.text}; -webkit-font-smoothing:antialiased; overscroll-behavior-y:none; transition:background .25s,color .25s; }
  ::-webkit-scrollbar { width:4px; height:4px; }
  ::-webkit-scrollbar-thumb { background:${t.border}; border-radius:2px; }
  ::-webkit-scrollbar-track { background:transparent; }
  img { display:block; }
  input,select,button,textarea { font-family:inherit; -webkit-appearance:none; }
  input:focus,select:focus { outline:none; }

  @keyframes fadeUp  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
  @keyframes slideUp { from{transform:translateY(100%)} to{transform:translateY(0)} }
  @keyframes scaleIn { from{opacity:0;transform:scale(.96)} to{opacity:1;transform:scale(1)} }
  @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:.3} }

  .reveal { animation:fadeUp .5s cubic-bezier(.22,1,.36,1) both; }
  .tap { transition:transform .12s ease,opacity .12s ease; cursor:pointer; }
  .tap:active { transform:scale(.93); opacity:.75; }

  .card-hover { transition:transform .22s cubic-bezier(.34,1.1,.64,1),box-shadow .22s ease; }
  .card-hover:hover { transform:translateY(-4px); box-shadow:0 12px 40px ${t.shadowM}!important; }
  .card-hover:active { transform:scale(.985); }

  .overlay { position:fixed;inset:0;z-index:900; animation:fadeIn .18s ease; }
  .sheet   { position:absolute;bottom:0;left:0;right:0; border-radius:24px 24px 0 0; padding:0 22px 48px; animation:slideUp .38s cubic-bezier(.32,.72,0,1); max-height:92vh;overflow-y:auto; }
  .modal   { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%); border-radius:20px; padding:32px; animation:scaleIn .25s cubic-bezier(.34,1.2,.64,1); width:min(500px,calc(100vw - 32px)); max-height:90vh;overflow-y:auto; }
  @media(min-width:768px) { .sheet { max-width:560px;left:50%;right:auto;transform:translateX(-50%); border-radius:20px 20px 0 0; } }

  .page { max-width:1280px; margin:0 auto; padding:0 20px; }
  @media(min-width:640px)  { .page { padding:0 32px; } }
  @media(min-width:1100px) { .page { padding:0 56px; } }

  .grid-4 { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:20px; }
  @media(min-width:900px) { .grid-4 { grid-template-columns:repeat(4,1fr); } }

  .list-view { display:flex; flex-direction:column; gap:16px; }

  @media(max-width:767px) { .desktop-only{display:none!important;} }
  @media(min-width:768px) { .mobile-only{display:none!important;} }

  .field {
    width:100%; padding:12px 16px;
    border-radius:12px;
    border:1.5px solid ${t.border};
    background:${t.surf2};
    color:${t.text};
    font-size:14px; font-weight:400;
    margin-bottom:12px; display:block;
    transition:border .15s, box-shadow .15s;
  }
  .field:focus { border-color:${t.accent}; box-shadow:0 0 0 3px ${t.accentL}; }
  .live { animation:pulse 2s ease-in-out infinite; }
`;

// ─── Timer ────────────────────────────────────────────────────────
function Timer({ time, style }) {
  const [v,setV] = useState(time);
  useEffect(()=>{
    const iv=setInterval(()=>setV(p=>{
      const [h,m,s]=p.split(":").map(Number); let ts=h*3600+m*60+s-1; if(ts<0)ts=0;
      return [Math.floor(ts/3600),Math.floor((ts%3600)/60),ts%60].map(n=>String(n).padStart(2,"0")).join(":");
    }),1000);
    return ()=>clearInterval(iv);
  },[]);
  return <span style={{fontVariantNumeric:"tabular-nums",...style}}>{v}</span>;
}

// ─── Stars ────────────────────────────────────────────────────────
function Stars({ rating, t }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:4}}>
      <div style={{display:"flex",gap:1}}>
        {[1,2,3,4,5].map(i=>(
          <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i<=Math.round(rating)?"#F59E0B":"none"} stroke="#F59E0B" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        ))}
      </div>
      <span style={{fontSize:11,color:t.text3,fontWeight:500}}>{rating}</span>
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────
function Toast({ toasts, remove, t }) {
  return (
    <div style={{position:"fixed",bottom:86,right:20,zIndex:9999,display:"flex",flexDirection:"column",gap:8,maxWidth:320,pointerEvents:"none"}}>
      {toasts.map(x=>(
        <div key={x.id} onClick={()=>remove(x.id)} style={{background:t.surface,border:`1px solid ${t.border}`,borderRadius:14,padding:"12px 16px",display:"flex",alignItems:"center",gap:12,boxShadow:`0 8px 28px ${t.shadow}`,animation:"fadeUp .3s cubic-bezier(.34,1.2,.64,1)",pointerEvents:"all",cursor:"pointer"}}>
          <span style={{fontSize:18}}>{x.icon}</span>
          <span style={{flex:1,fontSize:13,fontWeight:500,color:t.text}}>{x.msg}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Grid Card ────────────────────────────────────────────────────
function GridCard({ d, wishlist, onWish, onGet, t, delay=0 }) {
  const saved  = wishlist.includes(d.id);
  const saving = d.was - d.now;
  return (
    <div className="card-hover reveal" onClick={()=>onGet(d)}
      style={{background:t.surface,borderRadius:16,overflow:"hidden",border:`1px solid ${t.border}`,boxShadow:`0 2px 12px ${t.shadow}`,animationDelay:`${delay}s`,cursor:"pointer",display:"flex",flexDirection:"column"}}>

      {/* Image */}
      <div style={{position:"relative",paddingBottom:"68%",background:t.surf2,overflow:"hidden",flexShrink:0}}>
        <img src={d.img} alt={d.title}
          style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",transition:"transform .5s ease"}}
          onError={e=>e.target.style.display="none"}/>
        {/* Discount badge */}
        <div style={{position:"absolute",top:12,left:12,background:t.accent,color:"#fff",borderRadius:8,padding:"4px 10px",fontSize:12,fontWeight:700}}>
          -{d.pct}%
        </div>
        {/* Heart */}
        <button className="tap" onClick={e=>{e.stopPropagation();onWish(d.id);}}
          style={{position:"absolute",top:10,right:10,width:34,height:34,borderRadius:"50%",border:`1.5px solid ${saved?"#EF4444":t.border}`,background:saved?"#FEF2F2":t.surface,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,boxShadow:`0 2px 8px ${t.shadow}`}}>
          {saved?"❤️":"🤍"}
        </button>
        {/* Timer */}
        {d.timer && (
          <div style={{position:"absolute",bottom:10,left:12,background:"rgba(0,0,0,.65)",backdropFilter:"blur(8px)",borderRadius:8,padding:"3px 8px",display:"flex",alignItems:"center",gap:4}}>
            <span style={{fontSize:10,color:"#fff"}}>⏱</span>
            <Timer time={d.timer} style={{fontSize:11,fontWeight:700,color:"#fff"}}/>
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{padding:"14px 16px 16px",flex:1,display:"flex",flexDirection:"column",gap:8}}>
        {/* Store */}
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <img src={d.storeLogo} alt={d.store} width={14} height={14} style={{borderRadius:3,objectFit:"contain"}} onError={e=>e.target.style.display="none"}/>
          <span style={{fontSize:11,color:t.text3,fontWeight:600,letterSpacing:".04em",textTransform:"uppercase"}}>{d.store}</span>
          {d.hot && <span style={{marginLeft:"auto",fontSize:10,color:t.badgeT,background:t.badge,padding:"2px 7px",borderRadius:8,fontWeight:700}}>🔥 Hot</span>}
        </div>

        {/* Title */}
        <div style={{fontSize:14,fontWeight:700,color:t.text,lineHeight:1.3,letterSpacing:"-.1px"}}>{d.title}</div>
        <div style={{fontSize:12,color:t.text3,lineHeight:1.4}}>{d.sub}</div>

        {/* Rating */}
        <Stars rating={d.rating} t={t}/>

        {/* Price + CTA */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"auto",paddingTop:8,borderTop:`1px solid ${t.border}`}}>
          <div>
            <span style={{fontSize:18,fontWeight:800,color:t.accent,letterSpacing:"-.5px"}}>{fp(d.now)}</span>
            <span style={{fontSize:12,color:t.text3,textDecoration:"line-through",marginLeft:6}}>{fp(d.was)}</span>
          </div>
          <button className="tap" onClick={e=>{e.stopPropagation();onGet(d);}}
            style={{padding:"7px 14px",borderRadius:20,border:"none",background:t.accent,color:"#fff",fontSize:12,fontWeight:700,boxShadow:`0 4px 12px ${t.accent}44`}}>
            View Deal
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── List Card (full detail) ──────────────────────────────────────
function ListCard({ d, wishlist, onWish, onGet, t, delay=0 }) {
  const saved  = wishlist.includes(d.id);
  const saving = d.was - d.now;
  return (
    <div className="card-hover reveal" onClick={()=>onGet(d)}
      style={{background:t.surface,borderRadius:16,overflow:"hidden",border:`1px solid ${t.border}`,boxShadow:`0 2px 12px ${t.shadow}`,animationDelay:`${delay}s`,cursor:"pointer",display:"flex"}}>

      {/* Image — fixed width */}
      <div style={{position:"relative",width:200,flexShrink:0,background:t.surf2,overflow:"hidden"}}>
        <img src={d.img} alt={d.title}
          style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",minHeight:180}}
          onError={e=>e.target.style.display="none"}/>
        <div style={{position:"absolute",top:12,left:12,background:t.accent,color:"#fff",borderRadius:8,padding:"4px 10px",fontSize:12,fontWeight:700}}>
          -{d.pct}%
        </div>
        {d.timer && (
          <div style={{position:"absolute",bottom:10,left:12,background:"rgba(0,0,0,.65)",backdropFilter:"blur(8px)",borderRadius:8,padding:"3px 8px",display:"flex",alignItems:"center",gap:4}}>
            <span style={{fontSize:10,color:"#fff"}}>⏱</span>
            <Timer time={d.timer} style={{fontSize:11,fontWeight:700,color:"#fff"}}/>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{flex:1,padding:"20px 24px",display:"flex",flexDirection:"column",gap:10,minWidth:0}}>
        {/* Top row: store + badges */}
        <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <img src={d.storeLogo} alt={d.store} width={16} height={16} style={{borderRadius:4,objectFit:"contain"}} onError={e=>e.target.style.display="none"}/>
            <span style={{fontSize:12,color:t.text3,fontWeight:600,letterSpacing:".04em",textTransform:"uppercase"}}>{d.store}</span>
          </div>
          <span style={{fontSize:11,color:t.text3,background:t.surf2,padding:"2px 8px",borderRadius:8,border:`1px solid ${t.border}`}}>{d.cat}</span>
          {d.hot && <span style={{fontSize:11,color:t.badgeT,background:t.badge,padding:"2px 8px",borderRadius:8,fontWeight:700}}>🔥 Hot Deal</span>}
          {d.timer && <span style={{fontSize:11,color:"#10B981",background:"#ECFDF5",padding:"2px 8px",borderRadius:8,fontWeight:600,border:"1px solid #A7F3D0"}}>⚡ Flash Deal</span>}
        </div>

        {/* Title + sub */}
        <div>
          <h3 style={{fontSize:18,fontWeight:800,color:t.text,lineHeight:1.25,letterSpacing:"-.3px",marginBottom:4}}>{d.title}</h3>
          <p style={{fontSize:13,color:t.text2,lineHeight:1.5}}>{d.sub}</p>
        </div>

        {/* Rating + reviews */}
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <Stars rating={d.rating} t={t}/>
          <span style={{fontSize:12,color:t.text3}}>({d.reviews.toLocaleString()} reviews)</span>
        </div>

        {/* Coupon code */}
        <div style={{display:"inline-flex",alignItems:"center",gap:8,background:t.accentL,border:`1.5px dashed ${t.accent}`,borderRadius:10,padding:"6px 14px",width:"fit-content"}}>
          <span style={{fontSize:11,color:t.accent,fontWeight:600,letterSpacing:".04em",textTransform:"uppercase"}}>Coupon</span>
          <span style={{fontSize:13,fontWeight:800,color:t.accent,letterSpacing:"1px"}}>{d.code}</span>
        </div>

        {/* Bottom row: price + actions */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12,marginTop:"auto",paddingTop:12,borderTop:`1px solid ${t.border}`}}>
          <div style={{display:"flex",alignItems:"baseline",gap:10}}>
            <span style={{fontSize:26,fontWeight:800,color:t.accent,letterSpacing:"-1px"}}>{fp(d.now)}</span>
            <span style={{fontSize:14,color:t.text3,textDecoration:"line-through"}}>{fp(d.was)}</span>
            <span style={{fontSize:12,background:`#ECFDF5`,color:"#065F46",padding:"3px 10px",borderRadius:8,fontWeight:700,border:"1px solid #A7F3D0"}}>
              Save {fp(saving)}
            </span>
          </div>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <button className="tap" onClick={e=>{e.stopPropagation();onWish(d.id);}}
              style={{width:38,height:38,borderRadius:"50%",border:`1.5px solid ${saved?"#EF4444":t.border}`,background:saved?"#FEF2F2":t.surf2,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>
              {saved?"❤️":"🤍"}
            </button>
            <button className="tap" onClick={e=>{e.stopPropagation();onGet(d);}}
              style={{padding:"11px 28px",borderRadius:50,border:"none",background:t.accent,color:"#fff",fontSize:14,fontWeight:700,boxShadow:`0 4px 16px ${t.accent}44`,letterSpacing:".02em"}}>
              View Deal →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Deal Modal (coupon) ──────────────────────────────────────────
function DealModal({ d, t, isDesktop, onClose }) {
  const [copied,setCopied] = useState(false);
  const saving = d.was - d.now;
  const copy = () => { navigator.clipboard.writeText(d.code||`SAVE${d.pct}`).catch(()=>{}); setCopied(true); setTimeout(()=>setCopied(false),2500); };
  const Cls = isDesktop?"modal":"sheet";
  return (
    <div className="overlay" onClick={onClose} style={{background:"rgba(0,0,0,.6)",backdropFilter:"blur(12px)"}}>
      <div className={Cls} onClick={e=>e.stopPropagation()} style={{background:t.surface,border:`1px solid ${t.border}`,boxShadow:`0 24px 60px ${t.shadowM}`}}>
        {!isDesktop && <div style={{width:40,height:4,borderRadius:2,background:t.border,margin:"14px auto 24px"}}/>}
        {isDesktop && <button onClick={onClose} className="tap" style={{position:"absolute",top:20,right:20,width:32,height:32,borderRadius:10,border:`1px solid ${t.border}`,background:t.surf2,color:t.text2,fontSize:15,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>}

        {/* Product */}
        <div style={{display:"flex",gap:16,alignItems:"center",marginBottom:24}}>
          <div style={{width:80,height:80,borderRadius:14,overflow:"hidden",background:t.surf2,flexShrink:0,border:`1px solid ${t.border}`}}>
            <img src={d.img} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:17,fontWeight:800,color:t.text,marginBottom:3,letterSpacing:"-.2px"}}>{d.title}</div>
            <div style={{fontSize:13,color:t.text2,marginBottom:8}}>{d.store} · {d.cat}</div>
            <div style={{display:"flex",alignItems:"baseline",gap:8}}>
              <span style={{fontSize:22,fontWeight:800,color:t.accent,letterSpacing:"-.8px"}}>{fp(d.now)}</span>
              <span style={{fontSize:13,color:t.text3,textDecoration:"line-through"}}>{fp(d.was)}</span>
              <span style={{fontSize:12,color:"#065F46",background:"#ECFDF5",padding:"2px 8px",borderRadius:8,fontWeight:700}}>-{d.pct}%</span>
            </div>
          </div>
        </div>

        <div style={{fontSize:11,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:t.text3,marginBottom:10}}>Step 1 — Copy your code</div>
        <div onClick={copy} style={{display:"flex",alignItems:"center",gap:12,background:t.surf2,borderRadius:14,padding:"14px 18px",border:`2px dashed ${copied?"#10B981":t.accent}`,marginBottom:copied?8:20,cursor:"pointer",transition:"all .25s",boxShadow:copied?"0 0 20px rgba(16,185,129,.15)":"none"}}>
          <span style={{flex:1,fontSize:20,fontWeight:800,color:copied?"#10B981":t.text,letterSpacing:"2px",fontVariantNumeric:"tabular-nums",transition:"color .25s"}}>{d.code||`SAVE${d.pct}`}</span>
          <button className="tap" onClick={e=>{e.stopPropagation();copy();}}
            style={{padding:"9px 20px",borderRadius:10,border:"none",background:copied?"#10B981":t.accent,color:"#fff",fontWeight:700,fontSize:13,transition:"all .25s"}}>
            {copied?"Copied!":"Copy"}
          </button>
        </div>
        {copied && <div style={{fontSize:12,color:"#10B981",fontWeight:600,marginBottom:16,paddingLeft:2}}>✓ Paste at checkout — save {fp(saving)}</div>}

        <div style={{fontSize:11,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:t.text3,marginBottom:10}}>Step 2 — Shop at {d.store}</div>
        <button className="tap" onClick={()=>{copy();window.open("#","_blank");}}
          style={{width:"100%",padding:"15px",borderRadius:14,border:"none",background:t.accent,color:"#fff",fontWeight:700,fontSize:15,display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:16,boxShadow:`0 6px 24px ${t.accent}44`}}>
          <img src={d.storeLogo} width={18} height={18} style={{borderRadius:4,objectFit:"contain",filter:"brightness(0) invert(1)"}} onError={e=>e.target.style.display="none"}/>
          Go to {d.store} →
        </button>

        <div style={{background:t.surf2,borderRadius:12,padding:"14px 16px",display:"flex",gap:12,alignItems:"center",border:`1px solid ${t.border}`}}>
          <span style={{fontSize:20}}>💰</span>
          <div>
            <div style={{fontSize:13,fontWeight:600,color:t.text}}>You're saving {fp(saving)} on this deal</div>
            <div style={{fontSize:11,color:t.text3,marginTop:2}}>Limited time offer · expires soon</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Auth ─────────────────────────────────────────────────────────
function AuthModal({ mode, t, isDesktop, onClose, onAuth }) {
  const [isLogin,setIsLogin] = useState(mode==="login");
  const [form,setForm] = useState({name:"",email:"",password:""});
  const [prefs,setPrefs] = useState({deals:true,drops:true,wish:true});
  const [err,setErr] = useState("");
  const submit = () => {
    if(!form.email||!form.password){setErr("Fill in all fields");return;}
    if(!isLogin&&!form.name){setErr("What's your name?");return;}
    onAuth({name:form.name||form.email.split("@")[0],email:form.email,prefs});
  };
  const Cls=isDesktop?"modal":"sheet";
  return (
    <div className="overlay" onClick={onClose} style={{background:"rgba(0,0,0,.6)",backdropFilter:"blur(14px)"}}>
      <div className={Cls} onClick={e=>e.stopPropagation()} style={{background:t.surface,border:`1px solid ${t.border}`}}>
        {!isDesktop&&<div style={{width:40,height:4,borderRadius:2,background:t.border,margin:"14px auto 24px"}}/>}
        {isDesktop&&<button onClick={onClose} className="tap" style={{position:"absolute",top:20,right:20,width:32,height:32,borderRadius:10,border:`1px solid ${t.border}`,background:t.surf2,color:t.text2,fontSize:15,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>}
        <div style={{marginBottom:24}}>
          <h2 style={{fontSize:24,fontWeight:800,color:t.text,letterSpacing:"-.4px",marginBottom:4}}>{isLogin?"Welcome back 👋":"Create account"}</h2>
          <p style={{fontSize:14,color:t.text2}}>{isLogin?"Sign in to see your saved deals.":"Free forever. No spam."}</p>
        </div>
        {err&&<div style={{background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:10,padding:"10px 14px",color:"#DC2626",fontSize:13,fontWeight:500,marginBottom:14}}>⚠️ {err}</div>}
        {!isLogin&&<input className="field" placeholder="First name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/>}
        <input className="field" placeholder="Email address" type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/>
        <input className="field" placeholder="Password" type="password" value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))}/>
        {!isLogin&&(
          <div style={{background:t.surf2,borderRadius:14,padding:"14px",marginBottom:14,border:`1px solid ${t.border}`}}>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:t.text3,marginBottom:12}}>Alert preferences</div>
            {[{k:"deals",l:"🔥 New hot deals"},{k:"drops",l:"📉 Price drops"},{k:"wish",l:"⭐ Wishlist alerts"}].map(({k,l})=>(
              <div key={k} onClick={()=>setPrefs(p=>({...p,[k]:!p[k]}))}
                style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${t.border}`,cursor:"pointer"}}>
                <span style={{fontSize:14,color:t.text}}>{l}</span>
                <div style={{width:44,height:24,borderRadius:12,background:prefs[k]?t.accent:t.surf3,transition:"background .2s",position:"relative",flexShrink:0}}>
                  <div style={{position:"absolute",top:3,left:prefs[k]?22:3,width:18,height:18,borderRadius:"50%",background:"#fff",transition:"left .2s",boxShadow:"0 1px 4px rgba(0,0,0,.2)"}}/>
                </div>
              </div>
            ))}
          </div>
        )}
        <button className="tap" onClick={submit} style={{width:"100%",padding:"14px",borderRadius:14,border:"none",background:t.accent,color:"#fff",fontWeight:700,fontSize:15,marginBottom:14,boxShadow:`0 4px 20px ${t.accent}44`}}>
          {isLogin?"Sign In →":"Create Account →"}
        </button>
        <div style={{textAlign:"center",fontSize:13,color:t.text3}}>
          {isLogin?"No account? ":"Already a member? "}
          <span onClick={()=>{setIsLogin(!isLogin);setErr("");}} style={{color:t.accent,fontWeight:600,cursor:"pointer"}}>{isLogin?"Sign up free":"Sign in"}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Add Deal ─────────────────────────────────────────────────────
const SMAP={"amazon.com":{name:"Amazon",logo:"https://logo.clearbit.com/amazon.com"},"target.com":{name:"Target",logo:"https://logo.clearbit.com/target.com"},"bestbuy.com":{name:"Best Buy",logo:"https://logo.clearbit.com/bestbuy.com"},"nike.com":{name:"Nike",logo:"https://logo.clearbit.com/nike.com"},"apple.com":{name:"Apple",logo:"https://logo.clearbit.com/apple.com"},"walmart.com":{name:"Walmart",logo:"https://logo.clearbit.com/walmart.com"}};
function AddModal({ t, isDesktop, onClose, onAdd }) {
  const [step,setStep]=useState("url"); const [url,setUrl]=useState(""); const [aiErr,setAiErr]=useState("");
  const [form,setForm]=useState({title:"",sub:"",was:"",now:"",code:"",cat:"Electronics",timer:"",img:"",store:"",storeLogo:"",hot:false,rating:4.5,reviews:100});
  const ds=u=>{try{const h=new URL(u).hostname.replace("www.","");for(const[d,i]of Object.entries(SMAP))if(h.includes(d))return i;}catch{}return{name:"Store",logo:""};};
  const analyze=async()=>{
    if(!url.trim())return; setStep("loading"); setAiErr("");
    const s=ds(url);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:600,messages:[{role:"user",content:`URL: ${url}\nReturn ONLY JSON:\n{"title":"","sub":"","was":0,"now":0,"code":"","cat":"Electronics","img":""}`}]})});
      const data=await res.json();
      const p=JSON.parse((data.content?.find(b=>b.type==="text")?.text||"{}").replace(/```json|```/g,"").trim());
      setForm({...p,was:Number(p.was)||0,now:Number(p.now)||0,store:s.name,storeLogo:s.logo,timer:"",hot:false,rating:4.5,reviews:100}); setStep("edit");
    }catch{setForm(f=>({...f,store:s.name,storeLogo:s.logo}));setAiErr("Auto-fill failed — fill in manually.");setStep("edit");}
  };
  const save=()=>{
    if(!form.title||!form.now)return;
    const was=Number(form.was)||0,now=Number(form.now)||0;
    onAdd({id:Date.now(),title:form.title,sub:form.sub,cat:form.cat||"Electronics",img:form.img||"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=500&fit=crop",was,now,store:form.store,storeLogo:form.storeLogo||"",pct:was>0?Math.round((1-now/was)*100):0,timer:form.timer||null,hot:form.hot,code:form.code||`SAVE${Math.round((1-now/was)*100)}`,rating:Number(form.rating)||4.5,reviews:Number(form.reviews)||0}); onClose();
  };
  const fSt={width:"100%",padding:"11px 14px",borderRadius:12,border:`1.5px solid ${t.border}`,background:t.surf2,color:t.text,fontSize:14,marginBottom:10,display:"block",transition:"border .15s"};
  const Cls=isDesktop?"modal":"sheet";
  return (
    <div className="overlay" onClick={onClose} style={{background:"rgba(0,0,0,.65)",backdropFilter:"blur(14px)"}}>
      <div className={Cls} onClick={e=>e.stopPropagation()} style={{background:t.surface,border:`1px solid ${t.border}`}}>
        {!isDesktop&&<div style={{width:40,height:4,borderRadius:2,background:t.border,margin:"14px auto 20px"}}/>}
        {isDesktop&&<button onClick={onClose} className="tap" style={{position:"absolute",top:20,right:20,width:32,height:32,borderRadius:10,border:`1px solid ${t.border}`,background:t.surf2,color:t.text2,fontSize:15,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>}
        {step==="url"&&(<><h2 style={{fontSize:22,fontWeight:800,color:t.text,marginBottom:6,letterSpacing:"-.3px"}}>Add a deal</h2><p style={{fontSize:13,color:t.text2,marginBottom:20}}>Paste a URL — AI fills the details</p><input className="field" autoFocus value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://amazon.com/dp/..." onKeyDown={e=>e.key==="Enter"&&analyze()} style={{fontSize:15,marginBottom:14}}/><button className="tap" onClick={analyze} disabled={!url.trim()} style={{width:"100%",padding:"13px",borderRadius:14,border:"none",background:url.trim()?t.accent:t.surf3,color:url.trim()?"#fff":t.text3,fontWeight:700,fontSize:14,marginBottom:12,boxShadow:url.trim()?`0 4px 16px ${t.accent}44`:"none"}}>Analyze with AI →</button><div style={{textAlign:"center"}}><span onClick={()=>setStep("edit")} style={{fontSize:12,color:t.text3,cursor:"pointer",textDecoration:"underline"}}>fill in manually</span></div></>)}
        {step==="loading"&&(<div style={{textAlign:"center",padding:"52px 0"}}><div style={{fontSize:48,marginBottom:14,animation:"pulse 1s ease-in-out infinite"}}>🤖</div><div style={{fontSize:18,fontWeight:700,color:t.text,marginBottom:6}}>Analyzing...</div><div style={{fontSize:13,color:t.text2}}>AI is reading the product</div></div>)}
        {step==="edit"&&(<>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
            <h2 style={{fontSize:20,fontWeight:800,color:t.text,letterSpacing:"-.3px"}}>Review & edit</h2>
            <button onClick={()=>setStep("url")} style={{background:"none",border:"none",color:t.text3,fontSize:12,cursor:"pointer",textDecoration:"underline"}}>Back</button>
          </div>
          {aiErr&&<div style={{background:t.badge,borderRadius:10,padding:"10px 14px",color:t.badgeT,fontSize:13,marginBottom:14}}>{aiErr}</div>}
          <input className="field" placeholder="Title *" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} style={fSt}/>
          <input className="field" placeholder="Subtitle" value={form.sub} onChange={e=>setForm(f=>({...f,sub:e.target.value}))} style={fSt}/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}><input className="field" placeholder="Was $" type="number" value={form.was} onChange={e=>setForm(f=>({...f,was:e.target.value}))} style={fSt}/><input className="field" placeholder="Now $ *" type="number" value={form.now} onChange={e=>setForm(f=>({...f,now:e.target.value}))} style={fSt}/></div>
          <input className="field" placeholder="Coupon code" value={form.code} onChange={e=>setForm(f=>({...f,code:e.target.value}))} style={fSt}/>
          <input className="field" placeholder="Image URL" value={form.img} onChange={e=>setForm(f=>({...f,img:e.target.value}))} style={fSt}/>
          <input className="field" placeholder="Timer e.g. 02:00:00" value={form.timer} onChange={e=>setForm(f=>({...f,timer:e.target.value}))} style={fSt}/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
            <select className="field" value={form.cat} onChange={e=>setForm(f=>({...f,cat:e.target.value}))} style={fSt}>{["Electronics","Fashion","Home","Beauty","Sports","Other"].map(c=><option key={c}>{c}</option>)}</select>
            <select className="field" value={form.hot?"hot":"normal"} onChange={e=>setForm(f=>({...f,hot:e.target.value==="hot"}))} style={fSt}><option value="normal">Regular</option><option value="hot">Hot deal</option></select>
          </div>
          <button className="tap" onClick={save} disabled={!form.title||!form.now} style={{width:"100%",padding:"13px",borderRadius:14,border:"none",background:(form.title&&form.now)?t.accent:t.surf3,color:(form.title&&form.now)?"#fff":t.text3,fontWeight:700,fontSize:14,boxShadow:(form.title&&form.now)?`0 4px 16px ${t.accent}44`:"none"}}>Publish Deal</button>
        </>)}
      </div>
    </div>
  );
}

// ─── Notif Sheet ──────────────────────────────────────────────────
function NotifSheet({ notifs, t, isDesktop, onClear, onClose }) {
  const Cls=isDesktop?"modal":"sheet";
  return (
    <div className="overlay" onClick={onClose} style={{background:"rgba(0,0,0,.55)",backdropFilter:"blur(10px)"}}>
      <div className={Cls} onClick={e=>e.stopPropagation()} style={{background:t.surface,border:`1px solid ${t.border}`}}>
        {!isDesktop&&<div style={{width:40,height:4,borderRadius:2,background:t.border,margin:"14px auto 0"}}/>}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"18px 0 16px"}}>
          <h2 style={{fontSize:20,fontWeight:800,color:t.text,letterSpacing:"-.3px"}}>Notifications</h2>
          <div style={{display:"flex",gap:14,alignItems:"center"}}>
            <span onClick={onClear} style={{fontSize:12,color:t.accent,fontWeight:600,cursor:"pointer",textDecoration:"underline"}}>Clear all</span>
            {isDesktop&&<button onClick={onClose} className="tap" style={{width:30,height:30,borderRadius:8,border:`1px solid ${t.border}`,background:t.surf2,color:t.text2,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>}
          </div>
        </div>
        <div style={{maxHeight:"55vh",overflowY:"auto"}}>
          {notifs.length===0?(<div style={{textAlign:"center",padding:"44px 0",color:t.text3}}><div style={{fontSize:36,marginBottom:8}}>🔕</div><div style={{fontSize:15,fontWeight:600,color:t.text,marginBottom:4}}>All caught up</div><div style={{fontSize:13}}>We'll alert you when prices drop</div></div>)
          :notifs.map(n=>(<div key={n.id} style={{display:"flex",gap:14,padding:"13px 0",borderBottom:`1px solid ${t.border}`,alignItems:"flex-start"}}><div style={{width:42,height:42,borderRadius:12,background:t.surf2,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{n.icon}</div><div><div style={{fontSize:14,fontWeight:600,color:t.text,marginBottom:2}}>{n.title}</div><div style={{fontSize:13,color:t.text2,lineHeight:1.4}}>{n.body}</div><div style={{fontSize:11,color:t.text3,marginTop:4}}>{n.time}</div></div></div>))}
        </div>
      </div>
    </div>
  );
}

// ─── Hero Banner ──────────────────────────────────────────────────
function HeroBanner({ deals, t }) {
  const topPct = Math.max(...deals.map(d=>d.pct));
  return (
    <div style={{background:"linear-gradient(135deg,#4F46E5 0%,#7C3AED 60%,#6D28D9 100%)",borderRadius:20,padding:"40px 48px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:32,overflow:"hidden",position:"relative",margin:"24px 0"}}>
      {/* BG decoration */}
      <div style={{position:"absolute",top:-60,right:200,width:300,height:300,borderRadius:"50%",background:"rgba(255,255,255,.05)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:-80,right:0,width:400,height:400,borderRadius:"50%",background:"rgba(255,255,255,.04)",pointerEvents:"none"}}/>

      {/* Left content */}
      <div style={{flex:1,position:"relative",zIndex:1}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(255,255,255,.15)",borderRadius:20,padding:"5px 14px",marginBottom:16}}>
          <span style={{fontSize:13}}>🔥</span>
          <span style={{fontSize:12,fontWeight:600,color:"rgba(255,255,255,.9)",letterSpacing:".04em"}}>Top Deals, Best Prices!</span>
        </div>
        <h1 style={{fontSize:"clamp(28px,4vw,48px)",fontWeight:800,color:"#fff",lineHeight:1.1,letterSpacing:"-1.5px",marginBottom:12}}>
          Save More.<br/>Shop Smarter.
        </h1>
        <p style={{fontSize:14,color:"rgba(255,255,255,.75)",lineHeight:1.6,maxWidth:380,marginBottom:28}}>
          Find the best deals, discounts and promo codes from your favorite stores — all in one place.
        </p>
        <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
          <button className="tap"
            style={{display:"flex",alignItems:"center",gap:8,padding:"12px 24px",borderRadius:50,border:"none",background:"#fff",color:"#4F46E5",fontSize:14,fontWeight:700,boxShadow:"0 4px 20px rgba(0,0,0,.2)"}}>
            Explore Deals →
          </button>
          <button className="tap"
            style={{display:"flex",alignItems:"center",gap:8,padding:"12px 24px",borderRadius:50,border:"1.5px solid rgba(255,255,255,.4)",background:"transparent",color:"#fff",fontSize:14,fontWeight:600}}>
            <span style={{width:28,height:28,borderRadius:"50%",background:"rgba(255,255,255,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>▶</span>
            How it works
          </button>
        </div>
      </div>

      {/* Right: deal cards */}
      <div className="desktop-only" style={{position:"relative",flexShrink:0,width:340,height:220}}>
        {/* Featured product */}
        <div style={{position:"absolute",left:0,top:10,width:160,height:160,borderRadius:20,overflow:"hidden",background:"rgba(255,255,255,.1)",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 12px 40px rgba(0,0,0,.3)"}}>
          <img src={deals[0]?.img} alt="" style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:20}} onError={e=>e.target.style.display="none"}/>
          <div style={{position:"absolute",top:10,left:10,background:"#EC4899",color:"#fff",borderRadius:8,padding:"3px 9px",fontSize:12,fontWeight:700}}>-{deals[0]?.pct}%</div>
          <div style={{position:"absolute",bottom:8,left:0,right:0,textAlign:"center"}}>
            <div style={{display:"inline-flex",gap:2}}>{"★★★★★".split("").map((s,i)=><span key={i} style={{fontSize:11,color:"#FBBF24"}}>{s}</span>)}</div>
            <div style={{fontSize:10,color:"rgba(255,255,255,.7)"}}>({deals[0]?.reviews})</div>
          </div>
        </div>
        {/* Mini deal cards */}
        {deals.slice(1,3).map((d,i)=>(
          <div key={d.id} style={{position:"absolute",right:0,top:i*100,width:180,background:"rgba(255,255,255,.95)",borderRadius:14,padding:"10px 14px",boxShadow:"0 8px 24px rgba(0,0,0,.25)"}}>
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              <div style={{width:36,height:36,borderRadius:8,overflow:"hidden",background:"#f5f5f5",flexShrink:0}}>
                <img src={d.img} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:11,fontWeight:700,color:"#111",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{d.title}</div>
                <div style={{display:"flex",alignItems:"center",gap:6,marginTop:3}}>
                  <span style={{fontSize:13,fontWeight:800,color:"#4F46E5"}}>{fp(d.now)}</span>
                  <span style={{fontSize:10,color:"#9CA3AF",textDecoration:"line-through"}}>{fp(d.was)}</span>
                  <span style={{fontSize:9,background:"#EEF2FF",color:"#4F46E5",padding:"1px 5px",borderRadius:6,fontWeight:700,marginLeft:"auto"}}>-{d.pct}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Category Strip ───────────────────────────────────────────────
function CategoryStrip({ cat, setCat, t }) {
  return (
    <div style={{display:"flex",gap:10,overflowX:"auto",scrollbarWidth:"none",WebkitOverflowScrolling:"touch",padding:"4px 0 12px"}}>
      {CATEGORIES.map(c=>{
        const active=cat===c.id;
        return (
          <button key={c.id} className="tap" onClick={()=>setCat(c.id)}
            style={{display:"inline-flex",alignItems:"center",gap:8,padding:"10px 18px",borderRadius:50,border:`1.5px solid ${active?c.color:t.border}`,background:active?c.color:t.surface,color:active?"#fff":t.text2,fontSize:13,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,transition:"all .18s",boxShadow:active?`0 4px 16px ${c.color}44`:`0 1px 4px ${t.shadow}`}}>
            <span style={{fontSize:16}}>{c.emoji}</span>
            {c.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Store Logos Strip ────────────────────────────────────────────
function StoreStrip({ t }) {
  return (
    <div style={{padding:"28px 0 8px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <h2 style={{fontSize:18,fontWeight:800,color:t.text,letterSpacing:"-.3px"}}>Popular Stores</h2>
        <button className="tap" style={{fontSize:13,color:t.accent,fontWeight:600,background:"none",border:"none",cursor:"pointer"}}>View All Stores ›</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:12}}>
        {STORES.map(s=>(
          <div key={s.name} className="tap card-hover"
            style={{background:t.surface,borderRadius:14,padding:"16px",display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid ${t.border}`,boxShadow:`0 1px 4px ${t.shadow}`,cursor:"pointer",height:60}}>
            <img src={s.logo} alt={s.name} style={{height:24,maxWidth:90,objectFit:"contain"}} onError={e=>{e.target.style.display="none";e.target.parentNode.innerHTML=`<span style="font-weight:700;font-size:13px;color:${t.text}">${s.name}</span>`;}}/>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Feature Badges ───────────────────────────────────────────────
function FeatureBadges({ t }) {
  const items = [
    {icon:"🏷️",title:"Exclusive Deals",sub:"Handpicked offers just for you"},
    {icon:"✅",title:"Verified & Trusted",sub:"100% verified coupons and deals"},
    {icon:"🔔",title:"Deal Alerts",sub:"Never miss a deal again"},
    {icon:"💰",title:"Big Savings",sub:"Save more on every purchase"},
  ];
  return (
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12,padding:"20px 0 32px"}}>
      {items.map(f=>(
        <div key={f.title} style={{background:t.surface,borderRadius:14,padding:"18px 20px",display:"flex",alignItems:"center",gap:14,border:`1px solid ${t.border}`,boxShadow:`0 1px 4px ${t.shadow}`}}>
          <div style={{width:44,height:44,borderRadius:12,background:t.accentL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{f.icon}</div>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:t.text,marginBottom:2}}>{f.title}</div>
            <div style={{fontSize:11,color:t.text3,lineHeight:1.4}}>{f.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────
function Navbar({ t, dark, toggle, user, notifCount, onSignIn, onNotif, onAddDeal, isAdmin, tab, setTab, search, setSearch }) {
  const { isDesktop,isMobile } = useBreakpoint();
  const [searchFocus, setSearchFocus] = useState(false);
  return (
    <nav style={{background:t.surface,borderBottom:`1px solid ${t.border}`,position:"sticky",top:0,zIndex:100,boxShadow:`0 1px 8px ${t.shadow}`}}>
      <div className="page" style={{height:64,display:"flex",alignItems:"center",gap:16}}>

        {/* Logo */}
        <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0,marginRight:isDesktop?8:0}}>
          <div style={{width:34,height:34,borderRadius:10,background:`linear-gradient(135deg,${t.accent},#7C3AED)`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 4px 12px ${t.accent}55`}}>
            <span style={{fontSize:16,fontWeight:900,color:"#fff"}}>N</span>
          </div>
          <div>
            <span style={{fontSize:18,fontWeight:800,color:t.text,letterSpacing:"-.5px"}}>Nikki</span>
            <span style={{fontSize:18,fontWeight:800,color:t.accent,letterSpacing:"-.5px"}}>Deals</span>
          </div>
        </div>

        {/* Desktop nav links */}
        {isDesktop && (
          <div style={{display:"flex",gap:2}}>
            {[{id:"home",l:"Home"},{id:"deals",l:"Top Deals"},{id:"stores",l:"Stores"}].map(n=>(
              <button key={n.id} className="tap" onClick={()=>setTab(n.id)}
                style={{padding:"6px 14px",borderRadius:8,border:"none",background:"transparent",color:tab===n.id?t.accent:t.text2,fontSize:13,fontWeight:tab===n.id?700:500,cursor:"pointer",borderBottom:tab===n.id?`2px solid ${t.accent}`:"2px solid transparent",transition:"all .15s"}}>
                {n.l}
              </button>
            ))}
          </div>
        )}

        {/* Search bar */}
        <div style={{flex:1,maxWidth:isDesktop?360:undefined,position:"relative"}}>
          <svg style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)"}} width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke={t.text3} strokeWidth="2.2"/>
            <path d="M21 21l-4.35-4.35" stroke={t.text3} strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search deals, stores..."
            onFocus={()=>setSearchFocus(true)} onBlur={()=>setSearchFocus(false)}
            style={{width:"100%",padding:"9px 14px 9px 34px",borderRadius:50,border:`1.5px solid ${searchFocus?t.accent:t.border}`,background:t.surf2,color:t.text,fontSize:13,fontWeight:400,transition:"border .15s,box-shadow .15s",boxShadow:searchFocus?`0 0 0 3px ${t.accentL}`:"none"}}/>
        </div>

        <div style={{display:"flex",gap:8,alignItems:"center",flexShrink:0}}>
          {/* Theme */}
          <button className="tap" onClick={toggle}
            style={{width:36,height:36,borderRadius:10,border:`1px solid ${t.border}`,background:t.surf2,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>
            {dark?"☀️":"🌙"}
          </button>

          {/* Wishlist icon */}
          <button className="tap" onClick={()=>setTab("saved")}
            style={{width:36,height:36,borderRadius:10,border:`1px solid ${t.border}`,background:t.surf2,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>
            🤍
          </button>

          {/* Bell */}
          {user && (
            <button className="tap" onClick={onNotif}
              style={{width:36,height:36,borderRadius:10,border:`1px solid ${t.border}`,background:t.surf2,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,position:"relative"}}>
              🔔
              {notifCount>0&&<span style={{position:"absolute",top:6,right:6,width:7,height:7,borderRadius:"50%",background:t.accent,border:`2px solid ${t.surface}`}}/>}
            </button>
          )}

          {/* Admin add */}
          {isAdmin && isDesktop && (
            <button className="tap" onClick={onAddDeal}
              style={{padding:"8px 16px",borderRadius:50,border:`1.5px solid ${t.border}`,background:t.surf2,color:t.text2,fontSize:13,fontWeight:600,letterSpacing:".01em"}}>
              + Add Deal
            </button>
          )}

          {/* Auth */}
          {user ? (
            <div style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
              <div style={{width:34,height:34,borderRadius:10,background:`linear-gradient(135deg,${t.accent},#7C3AED)`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,color:"#fff",fontSize:13}}>
                {user.name[0].toUpperCase()}
              </div>
              {isDesktop&&<span style={{fontSize:13,color:t.text2,fontWeight:500}}>{user.name}</span>}
            </div>
          ) : (
            <button className="tap" onClick={onSignIn}
              style={{display:"flex",alignItems:"center",gap:6,padding:"9px 18px",borderRadius:50,border:"none",background:t.accent,color:"#fff",fontSize:13,fontWeight:700,boxShadow:`0 4px 14px ${t.accent}44`}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#fff" strokeWidth="2"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

// ─── View Toggle ──────────────────────────────────────────────────
function ViewToggle({ view, setView, t }) {
  return (
    <div style={{display:"flex",background:t.surf2,borderRadius:10,padding:3,border:`1px solid ${t.border}`,gap:2}}>
      <button className="tap" onClick={()=>setView("grid")}
        style={{width:32,height:32,borderRadius:8,border:"none",background:view==="grid"?t.surface:"transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",boxShadow:view==="grid"?`0 1px 4px ${t.shadow}`:"none",transition:"all .15s"}}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <rect x="1" y="1" width="6" height="6" rx="1.5" fill={view==="grid"?t.accent:t.text3}/>
          <rect x="9" y="1" width="6" height="6" rx="1.5" fill={view==="grid"?t.accent:t.text3}/>
          <rect x="1" y="9" width="6" height="6" rx="1.5" fill={view==="grid"?t.accent:t.text3}/>
          <rect x="9" y="9" width="6" height="6" rx="1.5" fill={view==="grid"?t.accent:t.text3}/>
        </svg>
      </button>
      <button className="tap" onClick={()=>setView("list")}
        style={{width:32,height:32,borderRadius:8,border:"none",background:view==="list"?t.surface:"transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",boxShadow:view==="list"?`0 1px 4px ${t.shadow}`:"none",transition:"all .15s"}}>
        <svg width="14" height="12" viewBox="0 0 16 14" fill="none">
          <rect x="0" y="0.5" width="16" height="3" rx="1.5" fill={view==="list"?t.accent:t.text3}/>
          <rect x="0" y="5.5" width="16" height="3" rx="1.5" fill={view==="list"?t.accent:t.text3}/>
          <rect x="0" y="10.5" width="16" height="3" rx="1.5" fill={view==="list"?t.accent:t.text3}/>
        </svg>
      </button>
    </div>
  );
}

// ─── Bottom Nav ───────────────────────────────────────────────────
function BottomNav({ tab, setTab, t, wishlist, tracked }) {
  const items=[{id:"home",icon:"🏠",l:"Home"},{id:"saved",icon:"🤍",l:"Saved",b:wishlist.length},{id:"tracking",icon:"📈",l:"Alerts",b:tracked.length},{id:"account",icon:"👤",l:"Profile"}];
  return (
    <nav className="mobile-only" style={{position:"fixed",bottom:0,left:0,right:0,background:t.surface,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderTop:`1px solid ${t.border}`,display:"flex",zIndex:200,paddingBottom:"env(safe-area-inset-bottom,8px)",boxShadow:`0 -4px 20px ${t.shadow}`}}>
      {items.map(n=>{
        const a=tab===n.id;
        return (
          <button key={n.id} className="tap" onClick={()=>setTab(n.id)}
            style={{flex:1,padding:"10px 4px 6px",border:"none",background:"transparent",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,position:"relative"}}>
            {a&&<div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:20,height:3,borderRadius:"0 0 3px 3px",background:t.accent}}/>}
            <span style={{fontSize:20,position:"relative"}}>
              {n.icon}
              {n.b>0&&<span style={{position:"absolute",top:-4,right:-8,background:t.accent,color:"#fff",fontSize:9,fontWeight:800,minWidth:15,height:15,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 2px",border:`2px solid ${t.surface}`}}>{n.b}</span>}
            </span>
            <span style={{fontSize:10,fontWeight:a?700:400,color:a?t.accent:t.text3}}>{n.l}</span>
          </button>
        );
      })}
    </nav>
  );
}

// ─── Pages ────────────────────────────────────────────────────────
function SavedPage({ wishlist, tracked, deals, onWish, onGet, t }) {
  const { isMobile } = useBreakpoint();
  const [view,setView] = useState("grid");
  const items=deals.filter(d=>wishlist.includes(d.id));
  return (
    <div className="page" style={{padding:"32px 0",paddingBottom:isMobile?100:60}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
        <div><h1 style={{fontSize:24,fontWeight:800,color:t.text,letterSpacing:"-.4px"}}>Saved Deals</h1><p style={{fontSize:13,color:t.text3,marginTop:3}}>{items.length} saved</p></div>
        <ViewToggle view={view} setView={setView} t={t}/>
      </div>
      {items.length>0
        ? view==="grid"
          ? <div className="grid-4">{items.map((d,i)=><GridCard key={d.id} d={d} wishlist={wishlist} onWish={onWish} onGet={onGet} t={t} delay={i*.04}/>)}</div>
          : <div className="list-view">{items.map((d,i)=><ListCard key={d.id} d={d} wishlist={wishlist} onWish={onWish} onGet={onGet} t={t} delay={i*.04}/>)}</div>
        : <div style={{textAlign:"center",padding:"80px 0"}}><div style={{fontSize:40,marginBottom:12}}>🤍</div><div style={{fontSize:18,fontWeight:700,color:t.text2}}>Nothing saved yet</div><p style={{fontSize:13,color:t.text3,marginTop:6}}>Tap the heart on any deal to save it</p></div>
      }
    </div>
  );
}

function TrackingPage({ tracked, deals, onUntrack, t }) {
  const { isMobile } = useBreakpoint();
  const items=deals.filter(d=>tracked.includes(d.id));
  return (
    <div className="page" style={{padding:"32px 0",paddingBottom:isMobile?100:60}}>
      <h1 style={{fontSize:24,fontWeight:800,color:t.text,letterSpacing:"-.4px",marginBottom:4}}>Price Alerts</h1>
      <p style={{fontSize:13,color:t.text3,marginBottom:28}}>Watching {items.length} item{items.length!==1?"s":""}</p>
      {items.length>0?(
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {items.map(d=>(
            <div key={d.id} style={{display:"flex",alignItems:"center",gap:16,padding:"16px 20px",background:t.surface,borderRadius:16,border:`1px solid ${t.border}`,boxShadow:`0 2px 8px ${t.shadow}`}}>
              <div style={{width:60,height:60,borderRadius:12,overflow:"hidden",background:t.surf2,flexShrink:0}}>
                <img src={d.img} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:15,fontWeight:700,color:t.text,marginBottom:2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{d.title}</div>
                <div style={{fontSize:12,color:t.text3}}>{d.store}</div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginTop:5}}>
                  <span style={{fontSize:18,fontWeight:800,color:t.accent,letterSpacing:"-.5px"}}>{fp(d.now)}</span>
                  <span style={{fontSize:11,background:t.accentL,color:t.accent,padding:"2px 8px",borderRadius:8,fontWeight:600}}>-{d.pct}%</span>
                  {d.timer&&<Timer time={d.timer} style={{fontSize:11,color:t.text3,fontWeight:600}}/>}
                </div>
              </div>
              <button className="tap" onClick={()=>onUntrack(d.id)}
                style={{padding:"8px 14px",borderRadius:10,border:`1px solid ${t.border}`,background:t.surf2,color:t.text3,fontSize:12,fontWeight:500,cursor:"pointer",flexShrink:0}}>
                Remove
              </button>
            </div>
          ))}
        </div>
      ):<div style={{textAlign:"center",padding:"80px 0"}}><div style={{fontSize:40,marginBottom:12}}>📊</div><div style={{fontSize:18,fontWeight:700,color:t.text2}}>No active alerts</div><p style={{fontSize:13,color:t.text3,marginTop:6}}>Track a deal to get notified when the price drops</p></div>}
    </div>
  );
}

function AccountPage({ user, wishlist, tracked, t, dark, toggle, onSignIn, onSignOut, isAdmin, onAddDeal }) {
  const { isMobile } = useBreakpoint();
  if(!user) return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"60vh",padding:"0 20px"}}>
      <div style={{textAlign:"center",maxWidth:360}}>
        <div style={{width:80,height:80,borderRadius:24,background:`linear-gradient(135deg,${t.accent},#7C3AED)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,margin:"0 auto 20px",boxShadow:`0 8px 24px ${t.accent}44`}}>👤</div>
        <h2 style={{fontSize:26,fontWeight:800,color:t.text,letterSpacing:"-.4px",marginBottom:8}}>Your Profile</h2>
        <p style={{fontSize:14,color:t.text2,lineHeight:1.6,marginBottom:28}}>Sign in to access your saved deals, price alerts, and more.</p>
        <button className="tap" onClick={onSignIn} style={{padding:"14px 36px",borderRadius:50,border:"none",background:t.accent,color:"#fff",fontWeight:700,fontSize:15,boxShadow:`0 4px 20px ${t.accent}44`}}>Sign In →</button>
      </div>
    </div>
  );
  return (
    <div className="page" style={{padding:"32px 0",paddingBottom:isMobile?100:60,maxWidth:640}}>
      <div style={{borderRadius:20,overflow:"hidden",marginBottom:20,boxShadow:`0 4px 20px ${t.shadow}`}}>
        <div style={{background:`linear-gradient(135deg,${t.accent},#7C3AED)`,padding:"28px 24px",display:"flex",alignItems:"center",gap:16}}>
          <div style={{width:60,height:60,borderRadius:18,background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,color:"#fff",fontSize:24,flexShrink:0}}>
            {user.name[0].toUpperCase()}
          </div>
          <div>
            <div style={{fontSize:20,fontWeight:800,color:"#fff",letterSpacing:"-.3px"}}>{user.name}</div>
            <div style={{color:"rgba(255,255,255,.7)",fontSize:13,marginTop:2}}>{user.email}</div>
          </div>
        </div>
        <div style={{background:t.surface,display:"grid",gridTemplateColumns:"1fr 1fr 1fr"}}>
          {[[wishlist.length,"❤️","Saved"],[tracked.length,"🔔","Tracking"],[DEALS.length,"🏷️","Deals"]].map(([n,em,l],i)=>(
            <div key={l} style={{padding:"16px",textAlign:"center",borderRight:i<2?`1px solid ${t.border}`:"none"}}>
              <div style={{fontSize:20}}>{em}</div>
              <div style={{fontSize:22,fontWeight:800,color:t.text,letterSpacing:"-.5px"}}>{n}</div>
              <div style={{fontSize:11,color:t.text3,marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{background:t.surface,borderRadius:16,overflow:"hidden",marginBottom:14,border:`1px solid ${t.border}`}}>
        <div onClick={toggle} style={{display:"flex",alignItems:"center",gap:14,padding:"16px 20px",cursor:"pointer",borderBottom:`1px solid ${t.border}`}}>
          <span style={{fontSize:20}}>{dark?"☀️":"🌙"}</span>
          <div style={{flex:1,fontSize:14,fontWeight:500,color:t.text}}>{dark?"Light Mode":"Dark Mode"}</div>
          <div style={{width:44,height:24,borderRadius:12,background:dark?t.accent:t.surf3,position:"relative",transition:"background .2s"}}>
            <div style={{position:"absolute",top:3,left:dark?22:3,width:18,height:18,borderRadius:"50%",background:"#fff",transition:"left .2s",boxShadow:"0 1px 3px rgba(0,0,0,.25)"}}/>
          </div>
        </div>
        {isAdmin && (
          <div onClick={onAddDeal} style={{display:"flex",alignItems:"center",gap:14,padding:"16px 20px",cursor:"pointer",borderBottom:`1px solid ${t.border}`,background:t.accentL}}>
            <span style={{fontSize:20}}>+</span>
            <span style={{flex:1,fontSize:14,fontWeight:600,color:t.accent}}>Add New Deal</span>
            <span style={{color:t.text3}}>›</span>
          </div>
        )}
        {[{i:"🔔",l:"Notifications"},{i:"🏷️",l:"Preferences"},{i:"🔒",l:"Security"},{i:"💬",l:"Help & Support"}].map((r,i,arr)=>(
          <div key={r.l} style={{display:"flex",alignItems:"center",gap:14,padding:"15px 20px",borderBottom:i<arr.length-1?`1px solid ${t.border}`:"none",cursor:"pointer"}}>
            <span style={{fontSize:18}}>{r.i}</span>
            <span style={{flex:1,fontSize:14,color:t.text}}>{r.l}</span>
            <span style={{color:t.text3,fontSize:16}}>›</span>
          </div>
        ))}
      </div>
      <button className="tap" onClick={onSignOut} style={{width:"100%",padding:"14px",borderRadius:14,border:`1px solid ${t.border}`,background:"transparent",color:t.text3,fontSize:14,cursor:"pointer"}}>
        Sign Out
      </button>
    </div>
  );
}

// ─── Right Sidebar (desktop only) ────────────────────────────────
function RightSidebar({ t, user, wishlist, tracked, deals, onSignIn, onGet }) {
  const savedItems   = deals.filter(d=>wishlist.includes(d.id)).slice(0,4);
  const trackedItems = deals.filter(d=>tracked.includes(d.id)).slice(0,4);
  const trendingDeals = [...deals].sort((a,b)=>(b.hot?1:0)-(a.hot?1:0)).slice(0,5);

  const SideCard = ({d}) => (
    <div className="tap" onClick={()=>onGet(d)}
      style={{display:"flex",gap:10,alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${t.border}`,cursor:"pointer"}}>
      <div style={{width:46,height:46,borderRadius:10,overflow:"hidden",background:t.surf2,flexShrink:0}}>
        <img src={d.img} alt={d.title} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>
      </div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:13,fontWeight:700,color:t.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",marginBottom:2}}>{d.title}</div>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <span style={{fontSize:13,fontWeight:800,color:t.accent}}>${d.now}</span>
          <span style={{fontSize:11,color:t.text3,textDecoration:"line-through"}}>${d.was}</span>
          <span style={{fontSize:10,background:t.accentL,color:t.accent,padding:"1px 6px",borderRadius:6,fontWeight:700,marginLeft:"auto"}}>-{d.pct}%</span>
        </div>
      </div>
    </div>
  );

  const Section = ({title, icon, children, empty, emptyMsg}) => (
    <div style={{background:t.surface,borderRadius:16,padding:"16px",border:`1px solid ${t.border}`,boxShadow:`0 2px 8px ${t.shadow}`,marginBottom:16}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
        <span style={{fontSize:16}}>{icon}</span>
        <span style={{fontSize:14,fontWeight:800,color:t.text,letterSpacing:"-.2px"}}>{title}</span>
      </div>
      {children || (
        <div style={{textAlign:"center",padding:"16px 0"}}>
          <div style={{fontSize:28,marginBottom:6}}>{empty}</div>
          <div style={{fontSize:12,color:t.text3,lineHeight:1.4}}>{emptyMsg}</div>
          {!user && (
            <button className="tap" onClick={onSignIn}
              style={{marginTop:12,padding:"7px 16px",borderRadius:20,border:"none",background:t.accent,color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",boxShadow:`0 2px 10px ${t.accent}44`}}>
              Sign In
            </button>
          )}
        </div>
      )}
    </div>
  );

  return (
    <aside style={{width:280,flexShrink:0,position:"sticky",top:80,alignSelf:"flex-start",maxHeight:"calc(100vh - 96px)",overflowY:"auto",scrollbarWidth:"none",paddingBottom:24}}>

      {/* Ad banner */}
      <div style={{background:`linear-gradient(135deg,#6366F1,#7C3AED)`,borderRadius:16,padding:"20px 18px",marginBottom:16,position:"relative",overflow:"hidden",boxShadow:`0 4px 20px ${t.accent}44`}}>
        <div style={{position:"absolute",top:-20,right:-20,width:100,height:100,borderRadius:"50%",background:"rgba(255,255,255,.08)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:-30,left:-10,width:80,height:80,borderRadius:"50%",background:"rgba(255,255,255,.05)",pointerEvents:"none"}}/>
        <div style={{fontSize:10,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"rgba(255,255,255,.6)",marginBottom:8}}>Sponsored</div>
        <div style={{fontSize:16,fontWeight:800,color:"#fff",lineHeight:1.25,marginBottom:6,letterSpacing:"-.3px"}}>Get 3 months of Prime free</div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.75)",marginBottom:14,lineHeight:1.5}}>Exclusive deals, fast shipping & more for new members.</div>
        <button className="tap" style={{padding:"8px 18px",borderRadius:20,border:"none",background:"#fff",color:"#6366F1",fontSize:12,fontWeight:700,cursor:"pointer"}}>
          Claim Offer →
        </button>
      </div>

      {/* Trending Now */}
      <Section title="Trending Now" icon="🔥">
        <div>
          {trendingDeals.map((d,i)=>(
            <div key={d.id}>
              <div className="tap" onClick={()=>onGet(d)}
                style={{display:"flex",gap:10,alignItems:"center",padding:"10px 0",borderBottom:i<trendingDeals.length-1?`1px solid ${t.border}`:"none",cursor:"pointer"}}>
                <div style={{width:22,height:22,borderRadius:6,background:t.accentL,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:11,color:t.accent,flexShrink:0}}>
                  {i+1}
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:12,fontWeight:700,color:t.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{d.title}</div>
                  <div style={{fontSize:11,color:t.text3,marginTop:1}}>{d.store}</div>
                </div>
                <span style={{fontSize:12,fontWeight:800,color:t.accent,flexShrink:0}}>${d.now}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Saved deals */}
      <Section title="Your Saved" icon="❤️"
        empty="🤍" emptyMsg={user?"No saved deals yet.\nHeart any deal to save it.":"Sign in to save your favorite deals."}>
        {savedItems.length>0 && (
          <div>
            {savedItems.map((d,i)=>(
              <div key={d.id} style={{borderBottom:i<savedItems.length-1?`1px solid ${t.border}`:"none"}}>
                <SideCard d={d}/>
              </div>
            ))}
            {wishlist.length>4 && (
              <div style={{fontSize:12,color:t.accent,fontWeight:600,paddingTop:10,textAlign:"center",cursor:"pointer"}}>+{wishlist.length-4} more saved →</div>
            )}
          </div>
        )}
      </Section>

      {/* Tracked deals */}
      <Section title="Price Alerts" icon="🔔"
        empty="🔕" emptyMsg={user?"No active alerts.\nTrack a deal to get notified.":"Sign in to track price drops."}>
        {trackedItems.length>0 && (
          <div>
            {trackedItems.map((d,i)=>(
              <div key={d.id} style={{borderBottom:i<trackedItems.length-1?`1px solid ${t.border}`:"none"}}>
                <div className="tap" onClick={()=>onGet(d)}
                  style={{display:"flex",gap:10,alignItems:"center",padding:"10px 0",cursor:"pointer"}}>
                  <div style={{width:46,height:46,borderRadius:10,overflow:"hidden",background:t.surf2,flexShrink:0}}>
                    <img src={d.img} alt={d.title} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:700,color:t.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",marginBottom:2}}>{d.title}</div>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <span style={{fontSize:13,fontWeight:800,color:t.accent}}>${d.now}</span>
                      {d.timer && <span style={{fontSize:10,color:"#10B981",fontWeight:600,background:"#ECFDF5",padding:"1px 6px",borderRadius:6}}>⏱ expires soon</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {tracked.length>4 && (
              <div style={{fontSize:12,color:t.accent,fontWeight:600,paddingTop:10,textAlign:"center",cursor:"pointer"}}>+{tracked.length-4} more tracked →</div>
            )}
          </div>
        )}
      </Section>

      {/* Second ad */}
      <div style={{background:t.surface,borderRadius:16,padding:"18px",border:`1px solid ${t.border}`,boxShadow:`0 2px 8px ${t.shadow}`,textAlign:"center"}}>
        <div style={{fontSize:10,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:t.text3,marginBottom:10}}>Advertisement</div>
        <div style={{width:60,height:60,borderRadius:16,background:"linear-gradient(135deg,#10B981,#059669)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,margin:"0 auto 10px",boxShadow:"0 4px 14px rgba(16,185,129,.35)"}}>💳</div>
        <div style={{fontSize:14,fontWeight:800,color:t.text,marginBottom:4,letterSpacing:"-.2px"}}>Cashback on every deal</div>
        <div style={{fontSize:12,color:t.text2,lineHeight:1.5,marginBottom:14}}>Earn up to 10% cashback when you shop through NikkiDeals.</div>
        <button className="tap" style={{width:"100%",padding:"9px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#10B981,#059669)",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",boxShadow:"0 3px 12px rgba(16,185,129,.35)"}}>
          Learn More
        </button>
      </div>

    </aside>
  );
}

// ─── Main App ─────────────────────────────────────────────────────
export default function App() {
  const { dark, toggle, t } = useTheme();
  const { isDesktop, isMobile } = useBreakpoint();

  const [tab,setTab]           = useState("home");
  const [cat,setCat]           = useState("All");
  const [sort,setSort]         = useState("hot");
  const [search,setSearch]     = useState("");
  const [view,setView]         = useState("grid");
  const [user,setUser]         = useState(null);
  const [deals,setDeals]       = useState(DEALS);
  const [wishlist,setWishlist] = useState([]);
  const [tracked,setTracked]   = useState([]);
  const [notifs,setNotifs]     = useState([]);
  const [activeDeal,setActiveDeal] = useState(null);
  const [showAuth,setShowAuth]     = useState(null);
  const [showNotif,setShowNotif]   = useState(false);
  const [showAdd,setShowAdd]       = useState(false);
  const [toasts,setToasts]         = useState([]);

  const isAdmin = user?.email === ADMIN_EMAIL;

  useEffect(()=>{
    let el=document.getElementById("nd4css");
    if(!el){el=document.createElement("style");el.id="nd4css";document.head.appendChild(el);}
    el.textContent=CSS(t);
  },[t,dark]);

  useEffect(()=>{
    if(!user)return;
    const tm=setTimeout(()=>{
      setNotifs([
        {id:uid(),icon:"📉",title:"Price dropped!",body:"Sony WH-1000XM5 now $179",time:"Just now"},
        {id:uid(),icon:"⚡",title:"Flash Deal",body:"Stanley Quencher 52% off",time:"3m ago"},
        {id:uid(),icon:"⭐",title:"Wishlist alert",body:"Nike Air Max 270 now $74",time:"8m ago"},
      ]);
      addToast({msg:"3 new price alerts",icon:"📉"});
    },4000);
    return ()=>clearTimeout(tm);
  },[user]);

  const addToast = useCallback(({msg,icon})=>{
    const id=uid(); setToasts(p=>[...p,{id,msg,icon}]);
    setTimeout(()=>setToasts(p=>p.filter(x=>x.id!==id)),4000);
  },[]);

  const toggleWish  = id=>{ if(!user){setShowAuth("signup");return;} setWishlist(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]); };
  const toggleTrack = id=>{ if(!user){setShowAuth("signup");return;} setTracked(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]); };
  const handleAuth  = u =>{ setUser(u);setShowAuth(null); addToast({msg:`Welcome, ${u.name}!`,icon:"🎉"}); };
  const handleOut   = ()=>{ setUser(null);setWishlist([]);setTracked([]);setNotifs([]); addToast({msg:"Signed out",icon:"👋"}); };
  const handleAdd   = d =>{ setDeals(p=>[d,...p]); addToast({msg:"Deal published!",icon:"✅"}); };

  const filtered = deals
    .filter(d=>(cat==="All"||d.cat===cat)&&(d.title+d.store).toLowerCase().includes(search.toLowerCase()))
    .sort((a,b)=>sort==="hot"?(b.hot?1:0)-(a.hot?1:0):sort==="disc"?b.pct-a.pct:sort==="low"?a.now-b.now:b.now-a.now);

  return (
    <div style={{minHeight:"100vh",background:t.bg,color:t.text}}>
      <Navbar t={t} dark={dark} toggle={toggle} user={user} notifCount={notifs.length}
        onSignIn={()=>setShowAuth("login")} onNotif={()=>setShowNotif(true)}
        onAddDeal={()=>setShowAdd(true)} isAdmin={isAdmin}
        tab={tab} setTab={setTab} search={search} setSearch={setSearch}/>

      {tab==="home"&&(
        <div className="page" style={{paddingBottom:isMobile?100:60}}>
          <HeroBanner deals={deals} t={t}/>
          <CategoryStrip cat={cat} setCat={setCat} t={t}/>

          {/* Two-column layout on desktop */}
          <div style={{display:"flex",gap:24,alignItems:"flex-start",padding:"8px 0 28px"}}>

            {/* Main content — 3/4 width */}
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
                <h2 style={{fontSize:20,fontWeight:800,color:t.text,letterSpacing:"-.3px"}}>Top Deals of the Day</h2>
                <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
                  <select value={sort} onChange={e=>setSort(e.target.value)}
                    style={{padding:"6px 12px",borderRadius:10,border:`1px solid ${t.border}`,background:t.surface,color:t.text2,fontSize:12,fontWeight:500,cursor:"pointer"}}>
                    <option value="hot">Trending</option>
                    <option value="disc">Top Discount</option>
                    <option value="low">Price Low</option>
                    <option value="high">Price High</option>
                  </select>
                  <ViewToggle view={view} setView={setView} t={t}/>
                  <button className="tap" style={{fontSize:13,color:t.accent,fontWeight:600,background:"none",border:"none",cursor:"pointer",whiteSpace:"nowrap"}}>View All ›</button>
                </div>
              </div>
              {filtered.length>0
                ? view==="grid"
                  ? <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:16}}>{filtered.map((d,i)=><GridCard key={d.id} d={d} wishlist={wishlist} onWish={toggleWish} onGet={setActiveDeal} t={t} delay={Math.min(i*.04,.4)}/>)}</div>
                  : <div className="list-view">{filtered.map((d,i)=><ListCard key={d.id} d={d} wishlist={wishlist} onWish={toggleWish} onGet={setActiveDeal} t={t} delay={Math.min(i*.04,.4)}/>)}</div>
                : <div style={{textAlign:"center",padding:"60px 0",color:t.text3}}><div style={{fontSize:40,marginBottom:12}}>🔍</div><div style={{fontSize:18,fontWeight:600,color:t.text2}}>No deals match</div></div>
              }
              <StoreStrip t={t}/>
              <FeatureBadges t={t}/>
            </div>

            {/* Right sidebar — desktop only, ~1/4 width */}
            {isDesktop && (
              <RightSidebar t={t} user={user} wishlist={wishlist} tracked={tracked} deals={deals} onSignIn={()=>setShowAuth("login")} onGet={setActiveDeal}/>
            )}
          </div>
        </div>
      )}

      {tab==="saved"    && <SavedPage wishlist={wishlist} tracked={tracked} deals={deals} onWish={toggleWish} onGet={setActiveDeal} t={t}/>}
      {tab==="tracking" && <TrackingPage tracked={tracked} deals={deals} onUntrack={toggleTrack} t={t}/>}
      {tab==="account"  && <AccountPage user={user} wishlist={wishlist} tracked={tracked} t={t} dark={dark} toggle={toggle} onSignIn={()=>setShowAuth("signup")} onSignOut={handleOut} isAdmin={isAdmin} onAddDeal={()=>setShowAdd(true)}/>}

      {isAdmin && isMobile && tab==="home" && (
        <button className="tap" onClick={()=>setShowAdd(true)}
          style={{position:"fixed",bottom:84,right:20,width:52,height:52,borderRadius:"50%",border:"none",background:t.accent,color:"#fff",fontSize:22,cursor:"pointer",zIndex:300,boxShadow:`0 6px 20px ${t.accent}55`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>+</button>
      )}

      <BottomNav tab={tab} setTab={setTab} t={t} wishlist={wishlist} tracked={tracked}/>

      {activeDeal && <DealModal  d={activeDeal} t={t} isDesktop={isDesktop} onClose={()=>setActiveDeal(null)}/>}
      {showAuth   && <AuthModal  mode={showAuth} t={t} isDesktop={isDesktop} onClose={()=>setShowAuth(null)} onAuth={handleAuth}/>}
      {showNotif  && <NotifSheet notifs={notifs} t={t} isDesktop={isDesktop} onClear={()=>setNotifs([])} onClose={()=>setShowNotif(false)}/>}
      {showAdd    && <AddModal   t={t} isDesktop={isDesktop} onClose={()=>setShowAdd(false)} onAdd={handleAdd}/>}
      <Toast toasts={toasts} remove={id=>setToasts(p=>p.filter(x=>x.id!==id))} t={t}/>
    </div>
  );
}
