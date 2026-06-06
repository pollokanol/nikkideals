import { useState, useEffect, useRef } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const DEALS = [
  { id:1, title:"Sony WH-1000XM5", subtitle:"Noise Cancelling Headphones", category:"Electronics", image:"🎧", originalPrice:349, currentPrice:199, store:"Amazon", discount:43, endsIn:"2h 14m", hot:true, bg:"#FFF0FB", accent:"#E040FB" },
  { id:2, title:"Nike Air Max 270", subtitle:"Men's Running Shoes", category:"Fashion", image:"👟", originalPrice:150, currentPrice:74, store:"Nike", discount:51, endsIn:"5h 30m", hot:true, bg:"#FFF3E0", accent:"#FF6D00" },
  { id:3, title:"Instant Pot Duo 7-in-1", subtitle:"6 Quart Pressure Cooker", category:"Home", image:"🍲", originalPrice:99, currentPrice:49, store:"Walmart", discount:50, endsIn:"1d 2h", hot:false, bg:"#E8F5E9", accent:"#00C853" },
  { id:4, title:"iPad 10th Gen 64GB", subtitle:"Wi-Fi, Blue", category:"Electronics", image:"📱", originalPrice:449, currentPrice:329, store:"Best Buy", discount:27, endsIn:"3h 45m", hot:true, bg:"#EDE7F6", accent:"#651FFF" },
  { id:5, title:"Levi's 501 Jeans", subtitle:"Original Straight Fit", category:"Fashion", image:"👖", originalPrice:89, currentPrice:39, store:"Levi's", discount:56, endsIn:"6h 20m", hot:false, bg:"#E3F2FD", accent:"#2979FF" },
  { id:6, title:"Dyson V11 Vacuum", subtitle:"Cordless, 60-min runtime", category:"Home", image:"🌀", originalPrice:599, currentPrice:369, store:"Dyson", discount:38, endsIn:"8h 10m", hot:true, bg:"#FFF8E1", accent:"#FFB300" },
  { id:7, title:"MacBook Air M2", subtitle:'13" — Midnight', category:"Electronics", image:"💻", originalPrice:1099, currentPrice:849, store:"Apple", discount:23, endsIn:"12h 00m", hot:false, bg:"#FCE4EC", accent:"#F50057" },
  { id:8, title:"Adidas Ultraboost 23", subtitle:"Premium Running Shoe", category:"Fashion", image:"🏃", originalPrice:190, currentPrice:109, store:"Adidas", discount:43, endsIn:"4h 55m", hot:false, bg:"#E0F7FA", accent:"#00B0FF" },
  { id:9, title:"KitchenAid Mixer", subtitle:"5-Qt Stand Mixer, Empire Red", category:"Home", image:"🎂", originalPrice:449, currentPrice:279, store:"Williams Sonoma", discount:38, endsIn:"2d 4h", hot:true, bg:"#F3E5F5", accent:"#AA00FF" },
];

const CATS = [
  { id:"All",         label:"All",         icon:"✦",  color:"#1a1a2e" },
  { id:"Electronics", label:"Electronics", icon:"⚡",  color:"#651FFF" },
  { id:"Fashion",     label:"Fashion",     icon:"✿",  color:"#E040FB" },
  { id:"Home",        label:"Home",        icon:"◈",  color:"#00C853" },
];

const SORT_OPTS = [
  { v:"hot",  l:"🔥 Trending" },
  { v:"disc", l:"💸 Top Discount" },
  { v:"low",  l:"↑ Price" },
  { v:"high", l:"↓ Price" },
];

const fp = p => `$${p.toFixed(0)}`;
const uid = () => Math.random().toString(36).slice(2);

// ─── Fonts & Global CSS ───────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; -webkit-tap-highlight-color:transparent; }
  html, body { overscroll-behavior:none; background:#F5F4FF; }
  ::-webkit-scrollbar { display:none; }
  input,select,button { -webkit-appearance:none; font-family:inherit; }
  input:focus,select:focus { outline:none; }

  @keyframes slideUp   { from{transform:translateY(24px);opacity:0} to{transform:translateY(0);opacity:1} }
  @keyframes sheetUp   { from{transform:translateY(100%)} to{transform:translateY(0)} }
  @keyframes wiggle    { 0%,100%{transform:rotate(-3deg)} 50%{transform:rotate(3deg)} }
  @keyframes popIn     { 0%{transform:scale(.8);opacity:0} 70%{transform:scale(1.05)} 100%{transform:scale(1);opacity:1} }
  @keyframes pulse     { 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} }
  @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
  @keyframes shimmer   { from{background-position:-200% 0} to{background-position:200% 0} }

  .card  { transition:transform .18s cubic-bezier(.34,1.56,.64,1), box-shadow .18s ease; cursor:pointer; }
  .card:hover  { transform:translateY(-3px) scale(1.01); }
  .card:active { transform:scale(.97); }
  .tap:active  { transform:scale(.93); opacity:.8; }

  .hot-badge { animation: wiggle 1.2s ease-in-out infinite; display:inline-block; }
  .float-emoji { animation: float 3s ease-in-out infinite; display:inline-block; }
`;

// ─── Logo SVG ────────────────────────────────────────────────────────────────
function Logo() {
  return (
    <div style={{display:"flex",alignItems:"center",gap:9}}>
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <rect width="34" height="34" rx="10" fill="#1a1a2e"/>
        <text x="5" y="24" fontFamily="Figtree,sans-serif" fontWeight="900" fontSize="18" fill="#fff">N</text>
        <circle cx="26" cy="10" r="5" fill="#FF3CAC"/>
        <circle cx="26" cy="10" r="3" fill="#FFDD00"/>
      </svg>
      <div>
        <div style={{fontSize:18,fontWeight:900,letterSpacing:-.5,color:"#1a1a2e",lineHeight:1}}>
          nikki<span style={{color:"#FF3CAC"}}>deals</span>
        </div>
        <div style={{fontSize:9,fontWeight:700,letterSpacing:1.2,color:"#999",textTransform:"uppercase",lineHeight:1}}>best deals daily</div>
      </div>
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ toasts, remove }) {
  const colors = { s:"#00C853", e:"#FF1744", p:"#FF6D00", n:"#1a1a2e" };
  return (
    <div style={{position:"fixed",bottom:90,left:"50%",transform:"translateX(-50%)",zIndex:9999,display:"flex",flexDirection:"column",gap:8,width:"calc(100% - 28px)",maxWidth:400,pointerEvents:"none"}}>
      {toasts.map(t=>(
        <div key={t.id} onClick={()=>remove(t.id)} style={{
          background:colors[t.type]||"#1a1a2e", borderRadius:20, padding:"14px 18px",
          display:"flex", alignItems:"center", gap:12,
          boxShadow:`0 8px 32px ${colors[t.type]||"#1a1a2e"}55`,
          animation:"slideUp .35s cubic-bezier(.34,1.56,.64,1)",
          pointerEvents:"all", cursor:"pointer",
        }}>
          <span style={{fontSize:22}}>{t.icon}</span>
          <span style={{flex:1,color:"#fff",fontSize:14,fontWeight:700,fontFamily:"Figtree,sans-serif"}}>{t.message}</span>
          <span style={{color:"rgba(255,255,255,.5)",fontSize:13,fontWeight:600}}>✕</span>
        </div>
      ))}
    </div>
  );
}

// ─── Deal Card ────────────────────────────────────────────────────────────────
function DealCard({ deal, wishlist, tracked, onWishlist, onTrack, onToast }) {
  const saved    = wishlist.includes(deal.id);
  const tracking = tracked.includes(deal.id);
  const savings  = deal.originalPrice - deal.currentPrice;

  return (
    <div className="card" style={{
      borderRadius:28, overflow:"hidden", background:"#fff",
      boxShadow:"0 2px 0px 0 rgba(0,0,0,.08), 0 6px 24px rgba(0,0,0,.07)",
      border:"2px solid rgba(0,0,0,.04)",
    }}>
      {/* Coloured header zone */}
      <div style={{background:deal.bg, padding:"22px 16px 18px", position:"relative", minHeight:160, display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
        {/* Decorative blobs */}
        <div style={{position:"absolute",top:-20,right:-20,width:100,height:100,borderRadius:"50%",background:deal.accent,opacity:.08,pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:-10,left:10,width:60,height:60,borderRadius:"50%",background:deal.accent,opacity:.06,pointerEvents:"none"}}/>

        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          {deal.hot
            ? <div className="hot-badge" style={{background:"#FF3CAC",color:"#fff",fontSize:11,fontWeight:800,padding:"5px 10px",borderRadius:20,letterSpacing:.4,fontFamily:"Figtree,sans-serif"}}>🔥 HOT</div>
            : <div/>
          }
          <div style={{background:deal.accent,color:"#fff",fontSize:14,fontWeight:900,padding:"6px 13px",borderRadius:20,boxShadow:`0 4px 14px ${deal.accent}55`,fontFamily:"Figtree,sans-serif"}}>
            -{deal.discount}%
          </div>
        </div>

        <div className="float-emoji" style={{fontSize:72,textAlign:"center",lineHeight:1,marginTop:4}}>{deal.image}</div>
      </div>

      {/* Content */}
      <div style={{padding:"16px 18px 16px"}}>
        <div style={{fontSize:11,color:"#aaa",fontWeight:700,letterSpacing:.7,textTransform:"uppercase",marginBottom:5,fontFamily:"Figtree,sans-serif"}}>{deal.store} · {deal.category}</div>
        <div style={{fontSize:17,fontWeight:800,color:"#1a1a2e",lineHeight:1.25,marginBottom:3,fontFamily:"Figtree,sans-serif"}}>{deal.title}</div>
        <div style={{fontSize:13,color:"#999",marginBottom:14,fontFamily:"Figtree,sans-serif"}}>{deal.subtitle}</div>

        {/* Price strip */}
        <div style={{background:"#F5F4FF",borderRadius:16,padding:"12px 14px",display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <span style={{fontSize:28,fontWeight:900,color:"#1a1a2e",fontFamily:"Figtree,sans-serif"}}>{fp(deal.currentPrice)}</span>
          <div style={{flex:1}}>
            <div style={{fontSize:12,color:"#bbb",textDecoration:"line-through",fontFamily:"Figtree,sans-serif"}}>{fp(deal.originalPrice)}</div>
            <div style={{fontSize:12,color:"#00C853",fontWeight:700,fontFamily:"Figtree,sans-serif"}}>You save {fp(savings)} 💰</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:11,color:"#FF6D00",fontWeight:700,fontFamily:"Figtree,sans-serif"}}>⏱ {deal.endsIn}</div>
            <div style={{fontSize:10,color:"#ccc",fontFamily:"Figtree,sans-serif"}}>left</div>
          </div>
        </div>

        {/* Actions */}
        <div style={{display:"flex",gap:8}}>
          <button className="tap" onClick={()=>{onWishlist(deal.id);onToast(saved?{message:"Removed from wishlist",icon:"💔",type:"n"}:{message:"Saved to wishlist!",icon:"⭐",type:"s"})}}
            style={{flex:1,padding:"12px 0",borderRadius:16,border:`2px solid ${saved?"#FFB300":"#eee"}`,background:saved?"#FFFDE7":"#fafafa",color:saved?"#FF8F00":"#bbb",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"Figtree,sans-serif",transition:"all .15s"}}>
            {saved?"★ Saved":"☆ Save"}
          </button>
          <button className="tap" onClick={()=>{onTrack(deal.id);onToast(tracking?{message:"Stopped tracking",icon:"🔕",type:"n"}:{message:"Tracking price!",icon:"🔔",type:"s"})}}
            style={{flex:1,padding:"12px 0",borderRadius:16,border:`2px solid ${tracking?"#00C853":"#eee"}`,background:tracking?"#F1FFF5":"#fafafa",color:tracking?"#00C853":"#bbb",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"Figtree,sans-serif",transition:"all .15s"}}>
            {tracking?"🔔 On":"Track"}
          </button>
          <button className="tap"
            style={{paddingLeft:20,paddingRight:20,borderRadius:16,border:"none",background:"#1a1a2e",color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer",fontFamily:"Figtree,sans-serif",boxShadow:"0 4px 14px rgba(26,26,46,.3)"}}>
            Get →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Auth Sheet ───────────────────────────────────────────────────────────────
function AuthSheet({ mode, onClose, onAuth }) {
  const [isLogin, setIsLogin] = useState(mode==="login");
  const [form, setForm]       = useState({name:"",email:"",password:""});
  const [prefs, setPrefs]     = useState({deals:true,drops:true,wish:true});
  const [err, setErr]         = useState("");

  const submit = () => {
    if (!form.email||!form.password){setErr("Please fill in all fields");return;}
    if (!isLogin&&!form.name){setErr("Tell us your name!");return;}
    onAuth({name:form.name||form.email.split("@")[0],email:form.email,prefs});
  };

  const Field = ({ph,type,k}) => (
    <input placeholder={ph} type={type} value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))}
      style={{width:"100%",padding:"15px 18px",borderRadius:18,border:"2px solid #eee",background:"#fafafa",color:"#1a1a2e",fontSize:16,fontWeight:600,fontFamily:"Figtree,sans-serif",marginBottom:12,display:"block",transition:"border .15s"}}
      onFocus={e=>e.target.style.border="2px solid #FF3CAC"}
      onBlur={e=>e.target.style.border="2px solid #eee"} />
  );

  return (
    <div style={{position:"fixed",inset:0,zIndex:1000}} onClick={onClose}>
      <div style={{position:"absolute",inset:0,background:"rgba(26,26,46,.6)",backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)"}}/>
      <div onClick={e=>e.stopPropagation()} style={{
        position:"absolute",bottom:0,left:0,right:0,
        background:"#fff",borderRadius:"32px 32px 0 0",
        padding:"0 22px 48px",animation:"sheetUp .4s cubic-bezier(.32,.72,0,1)",
        maxHeight:"92vh",overflowY:"auto",
      }}>
        <div style={{width:44,height:5,borderRadius:3,background:"#eee",margin:"14px auto 22px"}}/>

        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{fontSize:36,marginBottom:8,animation:"popIn .4s ease"}}>{isLogin?"👋":"🎉"}</div>
          <div style={{fontSize:26,fontWeight:900,color:"#1a1a2e",fontFamily:"Figtree,sans-serif",marginBottom:4}}>
            {isLogin?"Welcome back!":"Join nikkideals!"}
          </div>
          <div style={{color:"#999",fontSize:15,fontFamily:"Figtree,sans-serif"}}>
            {isLogin?"Sign in to your deal hub":"Get the best deals every day, free"}
          </div>
        </div>

        {err&&<div style={{background:"#FFF0F0",border:"2px solid #FFCDD2",borderRadius:16,padding:"12px 16px",color:"#D32F2F",fontSize:14,fontWeight:700,marginBottom:14,fontFamily:"Figtree,sans-serif"}}>⚠️ {err}</div>}

        {!isLogin&&<Field ph="Your first name 😊" type="text" k="name"/>}
        <Field ph="Email address" type="email" k="email"/>
        <Field ph="Password" type="password" k="password"/>

        {!isLogin&&(
          <div style={{background:"#F5F4FF",borderRadius:20,padding:"16px",marginBottom:16}}>
            <div style={{fontSize:13,fontWeight:800,color:"#999",letterSpacing:.8,textTransform:"uppercase",marginBottom:14,fontFamily:"Figtree,sans-serif"}}>🔔 Alert me when…</div>
            {[{k:"deals",l:"🔥 New hot deals land"},{k:"drops",l:"📉 A price drops"},{k:"wish",l:"⭐ Wishlist items update"}].map(({k,l})=>(
              <div key={k} onClick={()=>setPrefs(p=>({...p,[k]:!p[k]}))}
                style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 0",borderBottom:"2px dashed #eee",cursor:"pointer"}}>
                <span style={{fontFamily:"Figtree,sans-serif",color:"#1a1a2e",fontSize:15,fontWeight:700}}>{l}</span>
                <div style={{width:50,height:28,borderRadius:14,background:prefs[k]?"#FF3CAC":"#ddd",transition:"background .2s",position:"relative",flexShrink:0}}>
                  <div style={{position:"absolute",top:4,left:prefs[k]?26:4,width:20,height:20,borderRadius:"50%",background:"#fff",transition:"left .2s",boxShadow:"0 2px 6px rgba(0,0,0,.2)"}}/>
                </div>
              </div>
            ))}
          </div>
        )}

        <button className="tap" onClick={submit} style={{width:"100%",padding:"17px",borderRadius:20,border:"none",background:"#1a1a2e",color:"#fff",fontSize:17,fontWeight:900,cursor:"pointer",marginBottom:14,fontFamily:"Figtree,sans-serif",boxShadow:"0 6px 24px rgba(26,26,46,.25)"}}>
          {isLogin?"Sign In →":"Create Account →"}
        </button>

        <div style={{textAlign:"center",fontFamily:"Figtree,sans-serif",color:"#aaa",fontSize:14}}>
          {isLogin?"New here? ":"Have an account? "}
          <span onClick={()=>{setIsLogin(!isLogin);setErr("")}} style={{color:"#FF3CAC",fontWeight:800,cursor:"pointer"}}>
            {isLogin?"Sign up free":"Sign in"}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Notif Sheet ──────────────────────────────────────────────────────────────
function NotifSheet({ notifs, onClear, onClose }) {
  const ICONS = {s:"#00C853",p:"#FF6D00",n:"#651FFF"};
  return (
    <div style={{position:"fixed",inset:0,zIndex:900}} onClick={onClose}>
      <div style={{position:"absolute",inset:0,background:"rgba(26,26,46,.5)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)"}}/>
      <div onClick={e=>e.stopPropagation()} style={{position:"absolute",bottom:0,left:0,right:0,background:"#fff",borderRadius:"32px 32px 0 0",padding:"0 20px 48px",animation:"sheetUp .4s cubic-bezier(.32,.72,0,1)",maxHeight:"75vh",overflow:"hidden",display:"flex",flexDirection:"column"}}>
        <div style={{width:44,height:5,borderRadius:3,background:"#eee",margin:"14px auto 0"}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"18px 0 14px"}}>
          <div style={{fontSize:20,fontWeight:900,color:"#1a1a2e",fontFamily:"Figtree,sans-serif"}}>Notifications 🔔</div>
          <div style={{display:"flex",gap:14,alignItems:"center"}}>
            <span onClick={onClear} style={{color:"#FF3CAC",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"Figtree,sans-serif"}}>Clear all</span>
            <button onClick={onClose} style={{width:34,height:34,borderRadius:12,border:"2px solid #eee",background:"#fafafa",color:"#999",fontSize:16,cursor:"pointer"}}>✕</button>
          </div>
        </div>
        <div style={{overflowY:"auto",flex:1}}>
          {notifs.length===0?(
            <div style={{textAlign:"center",padding:"48px 20px",fontFamily:"Figtree,sans-serif"}}>
              <div style={{fontSize:52,marginBottom:10}}>🔕</div>
              <div style={{fontWeight:800,fontSize:17,color:"#1a1a2e",marginBottom:4}}>All quiet!</div>
              <div style={{fontSize:14,color:"#aaa"}}>We'll ping you when deals drop</div>
            </div>
          ):notifs.map(n=>(
            <div key={n.id} style={{display:"flex",gap:14,padding:"14px 0",borderBottom:"2px dashed #f5f5f5",alignItems:"flex-start"}}>
              <div style={{width:48,height:48,borderRadius:16,background:"#F5F4FF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{n.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontFamily:"Figtree,sans-serif",color:"#1a1a2e",fontSize:14,fontWeight:800,marginBottom:3}}>{n.title}</div>
                <div style={{fontFamily:"Figtree,sans-serif",color:"#aaa",fontSize:13}}>{n.body}</div>
                <div style={{fontFamily:"Figtree,sans-serif",color:"#ccc",fontSize:11,marginTop:4}}>{n.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Wishlist Tab ─────────────────────────────────────────────────────────────
function WishlistTab({ wishlist, tracked, onWishlist, onTrack, onToast }) {
  const items = DEALS.filter(d=>wishlist.includes(d.id));
  return (
    <div style={{padding:"22px 16px 110px"}}>
      <div style={{marginBottom:22}}>
        <div style={{fontSize:26,fontWeight:900,color:"#1a1a2e",fontFamily:"Figtree,sans-serif",marginBottom:4}}>⭐ My Wishlist</div>
        <div style={{fontSize:14,color:"#aaa",fontFamily:"Figtree,sans-serif"}}>{items.length>0?`${items.length} deal${items.length>1?"s":""} saved — alerts active`:"Save deals you love!"}</div>
      </div>
      {items.length>0
        ?<div style={{display:"flex",flexDirection:"column",gap:18}}>{items.map(d=><DealCard key={d.id} deal={d} wishlist={wishlist} tracked={tracked} onWishlist={onWishlist} onTrack={onTrack} onToast={onToast}/>)}</div>
        :<EmptyState icon="🛍️" title="Nothing saved yet" sub='Hit ☆ Save on any deal!'/>
      }
    </div>
  );
}

// ─── Tracking Tab ─────────────────────────────────────────────────────────────
function TrackingTab({ tracked, onTrack, onToast }) {
  const items = DEALS.filter(d=>tracked.includes(d.id));
  return (
    <div style={{padding:"22px 16px 110px"}}>
      <div style={{marginBottom:22}}>
        <div style={{fontSize:26,fontWeight:900,color:"#1a1a2e",fontFamily:"Figtree,sans-serif",marginBottom:4}}>📈 Price Tracker</div>
        <div style={{fontSize:14,color:"#aaa",fontFamily:"Figtree,sans-serif"}}>{items.length>0?`Watching ${items.length} item${items.length>1?"s":""}` :"We'll shout when prices drop"}</div>
      </div>
      {items.length>0?(
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {items.map(d=>(
            <div key={d.id} style={{background:"#fff",borderRadius:22,padding:"16px",display:"flex",alignItems:"center",gap:14,boxShadow:"0 2px 12px rgba(0,0,0,.06)",border:"2px solid #f5f5f5"}}>
              <div style={{width:54,height:54,borderRadius:18,background:d.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,flexShrink:0}}>{d.image}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontFamily:"Figtree,sans-serif",fontWeight:800,color:"#1a1a2e",fontSize:15,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{d.title}</div>
                <div style={{fontFamily:"Figtree,sans-serif",color:"#aaa",fontSize:12,marginTop:2}}>{d.store}</div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginTop:6}}>
                  <span style={{fontFamily:"Figtree,sans-serif",fontWeight:900,color:"#1a1a2e",fontSize:18}}>{fp(d.currentPrice)}</span>
                  <span style={{background:d.bg,color:d.accent,fontSize:11,fontWeight:800,padding:"2px 9px",borderRadius:10,fontFamily:"Figtree,sans-serif"}}>-{d.discount}%</span>
                </div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontFamily:"Figtree,sans-serif",color:"#FF6D00",fontSize:11,fontWeight:700,marginBottom:8}}>⏱ {d.endsIn}</div>
                <button className="tap" onClick={()=>{onTrack(d.id);onToast({message:"Stopped tracking",icon:"🔕",type:"n"})}}
                  style={{padding:"8px 14px",borderRadius:12,border:"2px solid #FFCDD2",background:"#FFF0F0",color:"#E53935",fontSize:12,fontWeight:800,cursor:"pointer",fontFamily:"Figtree,sans-serif"}}>
                  Stop
                </button>
              </div>
            </div>
          ))}
        </div>
      ):<EmptyState icon="📊" title="Not tracking anything" sub='Tap "Track" to monitor a price'/>}
    </div>
  );
}

// ─── Account Tab ─────────────────────────────────────────────────────────────
function AccountTab({ user, wishlist, tracked, onSignIn, onSignOut }) {
  if (!user) return <GatePrompt onSignIn={onSignIn} msg="Sign up free and unlock your personal deal dashboard"/>;
  const initials = user.name.slice(0,2).toUpperCase();
  return (
    <div style={{padding:"22px 16px 110px"}}>
      {/* Avatar card */}
      <div style={{borderRadius:28,overflow:"hidden",marginBottom:18,boxShadow:"0 4px 24px rgba(0,0,0,.08)"}}>
        <div style={{background:"linear-gradient(135deg,#FF3CAC,#784BA0,#2B86C5)",padding:"30px 20px 24px",textAlign:"center"}}>
          <div style={{width:72,height:72,borderRadius:24,background:"rgba(255,255,255,.25)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,color:"#fff",fontSize:26,fontFamily:"Figtree,sans-serif",margin:"0 auto 12px",border:"3px solid rgba(255,255,255,.4)"}}>
            {initials}
          </div>
          <div style={{color:"#fff",fontWeight:900,fontSize:20,fontFamily:"Figtree,sans-serif"}}>{user.name}</div>
          <div style={{color:"rgba(255,255,255,.7)",fontSize:14,fontFamily:"Figtree,sans-serif",marginTop:3}}>{user.email}</div>
        </div>
        <div style={{background:"#fff",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",borderTop:"2px solid #f5f5f5"}}>
          {[[wishlist.length,"⭐","Saved"],[tracked.length,"📈","Tracking"],["3","🔔","Alerts"]].map(([n,e,l])=>(
            <div key={l} style={{padding:"14px 0",textAlign:"center",borderRight:"2px solid #f5f5f5"}}>
              <div style={{fontSize:20}}>{e}</div>
              <div style={{fontFamily:"Figtree,sans-serif",fontWeight:900,fontSize:20,color:"#1a1a2e"}}>{n}</div>
              <div style={{fontFamily:"Figtree,sans-serif",fontSize:11,color:"#aaa"}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Menu rows */}
      <div style={{background:"#fff",borderRadius:22,overflow:"hidden",marginBottom:16,border:"2px solid #f5f5f5"}}>
        {[
          {i:"🔔",l:"Notification Settings",s:"Manage what alerts you get"},
          {i:"🏷️",l:"Deal Preferences",s:"Pick your favourite categories"},
          {i:"🔒",l:"Privacy & Security",s:"Manage your password & data"},
          {i:"💬",l:"Help & Support",s:"FAQs, contact us"},
        ].map((r,idx)=>(
          <div key={r.l} style={{display:"flex",alignItems:"center",gap:14,padding:"16px 18px",borderBottom:idx<3?"2px dashed #f5f5f5":"none",cursor:"pointer"}}>
            <div style={{width:42,height:42,borderRadius:14,background:"#F5F4FF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{r.i}</div>
            <div style={{flex:1}}>
              <div style={{fontFamily:"Figtree,sans-serif",fontWeight:800,color:"#1a1a2e",fontSize:15}}>{r.l}</div>
              <div style={{fontFamily:"Figtree,sans-serif",color:"#aaa",fontSize:13}}>{r.s}</div>
            </div>
            <span style={{color:"#ccc",fontSize:20,fontWeight:300}}>›</span>
          </div>
        ))}
      </div>
      <button className="tap" onClick={onSignOut}
        style={{width:"100%",padding:"16px",borderRadius:20,border:"2px solid #FFCDD2",background:"#FFF0F0",color:"#E53935",fontFamily:"Figtree,sans-serif",fontWeight:800,fontSize:15,cursor:"pointer"}}>
        Sign Out 👋
      </button>
    </div>
  );
}

function EmptyState({icon,title,sub}) {
  return (
    <div style={{textAlign:"center",padding:"72px 20px"}}>
      <div style={{fontSize:64,marginBottom:14,animation:"float 3s ease-in-out infinite",display:"inline-block"}}>{icon}</div>
      <div style={{fontFamily:"Figtree,sans-serif",fontWeight:900,fontSize:20,color:"#1a1a2e",marginBottom:6}}>{title}</div>
      <div style={{fontFamily:"Figtree,sans-serif",fontSize:14,color:"#aaa"}}>{sub}</div>
    </div>
  );
}

function GatePrompt({onSignIn,msg}) {
  return (
    <div style={{textAlign:"center",padding:"80px 28px 110px"}}>
      <div style={{fontSize:68,marginBottom:18,animation:"float 3s ease-in-out infinite",display:"inline-block"}}>🔐</div>
      <div style={{fontFamily:"Figtree,sans-serif",fontWeight:900,fontSize:24,color:"#1a1a2e",marginBottom:10}}>Sign in to continue</div>
      <div style={{fontFamily:"Figtree,sans-serif",color:"#aaa",fontSize:15,maxWidth:290,margin:"0 auto 28px",lineHeight:1.6}}>{msg}</div>
      <button className="tap" onClick={onSignIn}
        style={{padding:"17px 36px",borderRadius:22,border:"none",background:"#1a1a2e",color:"#fff",fontFamily:"Figtree,sans-serif",fontWeight:900,fontSize:17,cursor:"pointer",boxShadow:"0 6px 24px rgba(26,26,46,.25)"}}>
        Create Free Account ✦
      </button>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function NikkiDealsV5() {
  const [user,setUser]           = useState(null);
  const [authMode,setAuthMode]   = useState(null);
  const [tab,setTab]             = useState("deals");
  const [category,setCategory]   = useState("All");
  const [sortBy,setSortBy]       = useState("hot");
  const [search,setSearch]       = useState("");
  const [showSearch,setShowSearch]=useState(false);
  const [wishlist,setWishlist]   = useState([]);
  const [tracked,setTracked]     = useState([]);
  const [notifs,setNotifs]       = useState([]);
  const [showNotif,setShowNotif] = useState(false);
  const [toasts,setToasts]       = useState([]);
  const searchRef = useRef(null);

  useEffect(()=>{
    if(!user)return;
    const t=setTimeout(()=>{
      setNotifs([
        {id:uid(),icon:"📉",title:"Price dropped!",body:"Sony WH-1000XM5 is now $179 🎉",time:"Just now"},
        {id:uid(),icon:"🔥",title:"New hot deal",body:"MacBook Air M2 now 30% off at Apple",time:"2 min ago"},
        {id:uid(),icon:"⭐",title:"Wishlist alert",body:"Nike Air Max 270 dropped to $64!",time:"5 min ago"},
      ]);
      addToast({message:"3 new deal alerts!",icon:"🔔",type:"p"});
    },3500);
    return ()=>clearTimeout(t);
  },[user]);

  useEffect(()=>{ if(showSearch&&searchRef.current) searchRef.current.focus(); },[showSearch]);

  const addToast = t => {
    const id=uid();
    setToasts(p=>[...p,{...t,id}]);
    setTimeout(()=>setToasts(p=>p.filter(x=>x.id!==id)),4000);
  };
  const toggleWish  = id => { if(!user){setAuthMode("signup");return;} setWishlist(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]); };
  const toggleTrack = id => { if(!user){setAuthMode("signup");return;} setTracked(t=>t.includes(id)?t.filter(x=>x!==id):[...t,id]); };
  const handleAuth  = u  => { setUser(u);setAuthMode(null); addToast({message:`Hey ${u.name}! Welcome 🎉`,icon:"🎊",type:"s"}); };
  const handleOut   = () => { setUser(null);setWishlist([]);setTracked([]);setNotifs([]); addToast({message:"See you soon 👋",icon:"👋",type:"n"}); };

  const filtered = DEALS
    .filter(d=>(category==="All"||d.category===category)&&(d.title+d.store).toLowerCase().includes(search.toLowerCase()))
    .sort((a,b)=>sortBy==="hot"?(b.hot?1:0)-(a.hot?1:0):sortBy==="disc"?b.discount-a.discount:sortBy==="low"?a.currentPrice-b.currentPrice:b.currentPrice-a.currentPrice);

  const NAV = [
    {id:"deals",   icon:"⚡", label:"Deals"},
    {id:"wishlist",icon:"⭐", label:"Saved",  badge:wishlist.length},
    {id:"tracking",icon:"📈", label:"Track",  badge:tracked.length},
    {id:"account", icon:"👤", label:"Me"},
  ];

  return (
    <div style={{minHeight:"100vh",background:"#F5F4FF",fontFamily:"Figtree,sans-serif",maxWidth:480,margin:"0 auto",position:"relative"}}>
      <style>{CSS}</style>

      {/* ── Header ── */}
      <header style={{background:"#fff",borderBottom:"2px solid #f5f5f5",position:"sticky",top:0,zIndex:200,padding:"0 16px"}}>
        {showSearch?(
          <div style={{height:62,display:"flex",alignItems:"center",gap:10}}>
            <input ref={searchRef} value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search deals & stores…"
              style={{flex:1,padding:"12px 18px",borderRadius:18,border:"2px solid #FF3CAC",background:"#fff",color:"#1a1a2e",fontSize:16,fontWeight:600,fontFamily:"Figtree,sans-serif"}}/>
            <button onClick={()=>{setShowSearch(false);setSearch("")}} style={{width:42,height:42,borderRadius:14,border:"2px solid #eee",background:"#fafafa",color:"#aaa",fontSize:16,cursor:"pointer"}}>✕</button>
          </div>
        ):(
          <div style={{height:62,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <Logo/>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <button className="tap" onClick={()=>setShowSearch(true)} style={{width:40,height:40,borderRadius:14,border:"2px solid #eee",background:"#fafafa",fontSize:18,cursor:"pointer"}}>🔍</button>
              {user&&(
                <button className="tap" onClick={()=>setShowNotif(true)} style={{width:40,height:40,borderRadius:14,border:"2px solid #eee",background:"#fafafa",fontSize:18,cursor:"pointer",position:"relative"}}>
                  🔔
                  {notifs.length>0&&<span style={{position:"absolute",top:6,right:6,width:9,height:9,borderRadius:"50%",background:"#FF3CAC",border:"2px solid #fff"}}/>}
                </button>
              )}
              {user?(
                <div onClick={()=>addToast({message:user.email,icon:"👤",type:"n"})} style={{width:40,height:40,borderRadius:14,background:"linear-gradient(135deg,#FF3CAC,#784BA0)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,color:"#fff",fontSize:15,cursor:"pointer",fontFamily:"Figtree,sans-serif"}}>
                  {user.name[0].toUpperCase()}
                </div>
              ):(
                <button className="tap" onClick={()=>setAuthMode("signup")} style={{padding:"10px 18px",borderRadius:14,border:"none",background:"#1a1a2e",color:"#fff",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"Figtree,sans-serif"}}>
                  Sign Up ✦
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ── Deals View ── */}
      {tab==="deals"&&(
        <>
          {/* Hero banner */}
          <div style={{margin:"16px 16px 0",borderRadius:28,overflow:"hidden",position:"relative",background:"linear-gradient(135deg,#1a1a2e 0%,#2d1b69 50%,#1a1a2e 100%)",padding:"24px 20px 22px",boxShadow:"0 8px 32px rgba(26,26,46,.2)"}}>
            {/* decorative circles */}
            <div style={{position:"absolute",top:-30,right:-30,width:150,height:150,borderRadius:"50%",background:"#FF3CAC",opacity:.1,pointerEvents:"none"}}/>
            <div style={{position:"absolute",bottom:-20,left:-10,width:100,height:100,borderRadius:"50%",background:"#FFDD00",opacity:.08,pointerEvents:"none"}}/>

            <div style={{fontSize:12,color:"rgba(255,255,255,.5)",fontWeight:700,letterSpacing:.8,textTransform:"uppercase",marginBottom:8}}>🕐 Updated hourly</div>
            <div style={{fontSize:26,fontWeight:900,color:"#fff",lineHeight:1.2,marginBottom:16}}>
              Today's <span style={{color:"#FF3CAC"}}>Hottest</span> Deals 🎯
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
              {[["🔥",DEALS.filter(d=>d.hot).length,"Hot Deals"],["⭐",wishlist.length,"Saved"],["📈",tracked.length,"Tracked"]].map(([e,n,l])=>(
                <div key={l} style={{background:"rgba(255,255,255,.08)",borderRadius:18,padding:"12px 8px",textAlign:"center",border:"1px solid rgba(255,255,255,.1)"}}>
                  <div style={{fontSize:20}}>{e}</div>
                  <div style={{fontWeight:900,color:"#fff",fontSize:20,fontFamily:"Figtree,sans-serif"}}>{n}</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,.4)",fontFamily:"Figtree,sans-serif",marginTop:1}}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Category + sort */}
          <div style={{display:"flex",gap:8,padding:"14px 16px",overflowX:"auto",WebkitOverflowScrolling:"touch",alignItems:"center"}}>
            {CATS.map(c=>(
              <button key={c.id} className="tap" onClick={()=>setCategory(c.id)}
                style={{display:"inline-flex",alignItems:"center",gap:5,padding:"9px 16px",borderRadius:20,border:`2px solid ${category===c.id?c.color:"#eee"}`,background:category===c.id?c.color:"#fff",color:category===c.id?"#fff":"#aaa",fontSize:13,fontWeight:800,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,fontFamily:"Figtree,sans-serif",transition:"all .15s",boxShadow:category===c.id?`0 4px 14px ${c.color}44`:"none"}}>
                <span>{c.icon}</span> {c.label}
              </button>
            ))}
            <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
              style={{padding:"9px 14px",borderRadius:20,border:"2px solid #eee",background:"#fff",color:"#aaa",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0,fontFamily:"Figtree,sans-serif"}}>
              {SORT_OPTS.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
            </select>
          </div>

          {/* Cards */}
          <div style={{padding:"0 16px 110px",display:"flex",flexDirection:"column",gap:18}}>
            {filtered.length>0
              ?filtered.map(d=><DealCard key={d.id} deal={d} wishlist={wishlist} tracked={tracked} onWishlist={toggleWish} onTrack={toggleTrack} onToast={addToast}/>)
              :<EmptyState icon="🔍" title="No deals found" sub="Try a different search or category"/>
            }
          </div>
        </>
      )}

      {tab==="wishlist" &&(user?<WishlistTab wishlist={wishlist} tracked={tracked} onWishlist={toggleWish} onTrack={toggleTrack} onToast={addToast}/>:<GatePrompt onSignIn={()=>setAuthMode("signup")} msg="Save deals you love and get alerts when prices drop"/>)}
      {tab==="tracking"&&(user?<TrackingTab tracked={tracked} onTrack={toggleTrack} onToast={addToast}/>:<GatePrompt onSignIn={()=>setAuthMode("signup")} msg="Track any deal — we'll shout when it drops"/>)}
      {tab==="account" &&<AccountTab user={user} wishlist={wishlist} tracked={tracked} onSignIn={()=>setAuthMode("signup")} onSignOut={handleOut}/>}

      {/* ── Bottom Nav ── */}
      <nav style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"#fff",borderTop:"2px solid #f5f5f5",display:"flex",zIndex:200,paddingBottom:"env(safe-area-inset-bottom,6px)"}}>
        {NAV.map(n=>{
          const active=tab===n.id;
          return (
            <button key={n.id} className="tap" onClick={()=>setTab(n.id)}
              style={{flex:1,padding:"10px 4px 6px",border:"none",background:"transparent",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,position:"relative"}}>
              {active&&<div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:28,height:3,borderRadius:2,background:"#FF3CAC"}}/>}
              <div style={{position:"relative"}}>
                <span style={{fontSize:22,transition:"transform .2s",display:"inline-block",transform:active?"scale(1.15)":"scale(1)"}}>{n.icon}</span>
                {n.badge>0&&<span style={{position:"absolute",top:-5,right:-8,background:"#FF3CAC",color:"#fff",fontSize:9,fontWeight:900,minWidth:17,height:17,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 3px",border:"2px solid #fff",fontFamily:"Figtree,sans-serif"}}>{n.badge}</span>}
              </div>
              <span style={{fontSize:11,fontWeight:800,color:active?"#FF3CAC":"#ccc",fontFamily:"Figtree,sans-serif",transition:"color .15s"}}>{n.label}</span>
            </button>
          );
        })}
      </nav>

      {authMode   &&<AuthSheet  mode={authMode} onClose={()=>setAuthMode(null)}  onAuth={handleAuth}/>}
      {showNotif  &&<NotifSheet notifs={notifs}  onClear={()=>setNotifs([])}      onClose={()=>setShowNotif(false)}/>}
      <Toast toasts={toasts} remove={id=>setToasts(t=>t.filter(x=>x.id!==id))}/>
    </div>
  );
}
