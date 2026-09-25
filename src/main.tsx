import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";
declare global { interface Window { Razorpay?: any } }

async function call(path: string, options: RequestInit = {}, retry = true): Promise<any> {
  const r = await fetch(API + path, { ...options, credentials: "include", headers: { "Content-Type": "application/json", ...(options.headers || {}) } });
  const data = await r.json().catch(() => ({}));
  if (r.status === 401 && retry && !path.includes("/auth/")) {
    const refresh = await fetch(API + "/api/auth/refresh", { method: "POST", credentials: "include" });
    if (refresh.ok) return call(path, options, false);
  }
  if (!r.ok) throw Error(data.message || "Request failed");
  return data;
}
function Stat({label,value,detail}:{label:string;value:string|number;detail?:string}) {
  return <div className="stat"><span>{label}</span><strong>{value}</strong>{detail&&<small>{detail}</small>}</div>;
}
function App() {
  const [u,setU]=useState<any>(null),[mode,setMode]=useState<"login"|"register">("login"),[email,setEmail]=useState(""),[password,setPassword]=useState(""),[error,setError]=useState(""),[wa,setWa]=useState<any>(null),[qr,setQr]=useState(""),[chatId,setChatId]=useState(""),[message,setMessage]=useState(""),[notice,setNotice]=useState(""),[stats,setStats]=useState<any>(null),[messages,setMessages]=useState<any[]>([]),[loadingMessages,setLoadingMessages]=useState(false),[billing,setBilling]=useState<any>(null),[topup,setTopup]=useState("100");
  async function loadBilling(){try{const x=await call("/api/billing/config");setBilling(x)}catch{}}
  async function loadDashboard(){try{const x=await call("/api/dashboard");setStats(x);if(x.connection)setWa((w:any)=>({...w,connection:x.connection,session:{status:x.connection.status}}));}catch{}}
  async function loadMessages(){setLoadingMessages(true);try{const x=await call("/api/messages?limit=50");setMessages(x.messages||[]);}catch(e:any){setError(e.message)}finally{setLoadingMessages(false)}}
  async function loadStatus(){try{const x=await call("/api/whatsapp/status");setWa(x);if(x.session?.status==="SCAN_QR_CODE")loadQr();await loadDashboard()}catch{}}
  async function loadQr(){try{const x=await call("/api/whatsapp/qr");if(x.data&&x.mimetype)setQr("data:"+x.mimetype+";base64,"+x.data)}catch{}}
  useEffect(()=>{call("/api/auth/me").then(x=>setU(x.user)).catch(()=>{});const p=new URLSearchParams(location.search);if(p.get("auth_error"))setError(decodeURIComponent(p.get("auth_error")!));if(p.has("auth_error"))history.replaceState({},"",location.pathname)},[]);
  useEffect(()=>{if(u){loadStatus();loadMessages();loadBilling()}},[u]);
  useEffect(()=>{if(!u||wa?.session?.status==="WORKING")return;const t=setInterval(loadStatus,4000);return()=>clearInterval(t)},[u,wa?.session?.status]);
  async function submit(e:React.FormEvent){e.preventDefault();setError("");try{const x=await call("/api/auth/"+mode,{method:"POST",body:JSON.stringify({email,password})});setU(x.user)}catch(e:any){setError(e.message)}}
  async function connect(){setError("");setNotice("");try{const x=await call("/api/whatsapp/connect",{method:"POST",body:"{}"});setWa(x);await loadQr();await loadDashboard()}catch(e:any){setError(e.message)}}
  async function publish(){setError("");try{await call("/api/whatsapp/publish",{method:"POST",body:JSON.stringify({chatId,text:message,kind:"text"})});setMessage("");setNotice("Message queued.");setTimeout(()=>{loadMessages();loadDashboard()},1200)}catch(e:any){setNotice(e.message)}}
  async function payActivation(){
  setError(""); setNotice("");
  try {
    const x=await call("/api/billing/activation/order",{method:"POST",body:"{}"});
    if(x.disabled||x.alreadyActive){await loadBilling();return;}
    if(!window.Razorpay) throw Error("Razorpay Checkout is not loaded");
    const checkout=new window.Razorpay({key:x.keyId,amount:x.order.amount,currency:x.order.currency,name:"SoloSync",description:"SoloSync activation",order_id:x.order.id,prefill:{name:u.name,email:u.email},handler:async(response:any)=>{
      await call("/api/billing/activation/verify",{method:"POST",body:JSON.stringify(response)});
      setNotice("Activation payment verified."); await loadBilling();
    },modal:{ondismiss:()=>setNotice("Payment window closed.")}});
    checkout.open();
  } catch(e:any){setError(e.message)}
}
async function topUp(){
  setError(""); setNotice("");
  try {
    const amountPaise=Math.round(Number(topup)*100);
    const x=await call("/api/billing/wallet/order",{method:"POST",body:JSON.stringify({amountPaise})});
    if(x.disabled){setNotice("Payments are disabled in local test mode.");return;}
    if(!window.Razorpay) throw Error("Razorpay Checkout is not loaded");
    const checkout=new window.Razorpay({key:x.keyId,amount:x.order.amount,currency:x.order.currency,name:"SoloSync",description:"SoloSync wallet top-up",order_id:x.order.id,prefill:{name:u.name,email:u.email},handler:async(response:any)=>{
      await call("/api/billing/wallet/verify",{method:"POST",body:JSON.stringify(response)});
      setNotice("Wallet credited."); await loadBilling();
    }});
    checkout.open();
  } catch(e:any){setError(e.message)}
}
async function logout(){await call("/api/auth/logout",{method:"POST"});setU(null);setWa(null);setStats(null);setMessages([])}
  if(!u)return <main className="shell auth-shell"><header><b>SoloSync</b><span>WhatsApp operations for businesses</span></header><section className="card auth"><p className="eyebrow">SOLOSYNC</p><h1>{mode==="login"?"Welcome back":"Create your account"}</h1><p className="muted">Sign in with Google to manage your WhatsApp account and messaging activity.</p><a className="google" href={API+"/api/auth/google"}>Continue with Google</a><div className="divider"><span>or</span></div><form onSubmit={submit}><input type="email" placeholder="Business email" value={email} onChange={e=>setEmail(e.target.value)} required/><input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} minLength={8} required/><button>{mode==="login"?"Sign in":"Create account"}</button></form>{error&&<p className="error">{error}</p>}<button className="link" onClick={()=>setMode(mode==="login"?"register":"login")}>{mode==="login"?"Create an account with email":"I already have an account"}</button></section></main>;
  const status=wa?.session?.status||wa?.connection?.status||"NOT_CONNECTED";
  return <main className="shell"><header className="topbar"><div><b>SoloSync</b><span>WhatsApp dashboard</span></div><div className="profile">{u.avatarUrl&&<img src={u.avatarUrl} alt=""/>}<span>{u.name||u.email}</span><button className="link" onClick={logout}>Sign out</button></div></header>
  <section className="hero"><div><p className="eyebrow">OVERVIEW</p><h1>Messaging dashboard</h1><p className="muted">Connect your WhatsApp account, send messages and keep a complete history.</p></div><span className={"pill "+(status==="WORKING"?"ok":"")}>{status==="WORKING"?"● Connected":status.replaceAll("_"," ")}</span></section>
  <section className="stats"><Stat label="Messages" value={stats?.stats?.total??"—"} detail="all time"/><Stat label="Successful" value={stats?.stats?.successful??"—"} detail={`${stats?.stats?.successRate??0}% success rate`}/><Stat label="Failed" value={stats?.stats?.failed??"—"} detail={`${stats?.stats?.failureRate??0}% failure rate`}/><Stat label="Last 24 hours" value={stats?.stats?.last24Hours??"—"} detail="messages queued"/></section>
  <section className="card billing-card"><div className="section-head"><div><p className="eyebrow">BILLING</p><h2>{billing?.billingStatus==="ACTIVE"?"Account active":"Activation required"}</h2></div><span className="pill">{billing?.enabled?"Razorpay":"Local test mode"}</span></div>{billing?.billingStatus!=="ACTIVE"?<><p className="muted">Activate your SoloSync account for ₹{((billing?.activationFeePaise||39900)/100).toFixed(0)} before linking WhatsApp.</p><button onClick={payActivation}>Activate for ₹{((billing?.activationFeePaise||39900)/100).toFixed(0)}</button></>:<div className="billing-row"><div><strong>Wallet</strong><p className="muted">₹{((billing?.wallet?.balancePaise||0)/100).toFixed(2)} available · ₹{((billing?.wallet?.reservedPaise||0)/100).toFixed(2)} reserved</p></div>{billing?.enabled&&<div className="topup"><input type="number" min="100" step="100" value={topup} onChange={e=>setTopup(e.target.value)}/><button onClick={topUp}>Top up</button></div>}</div>}</section>
  <section className="grid"><div className="card"><div className="section-head"><div><p className="eyebrow">WHATSAPP ACCOUNT</p><h2>{status==="WORKING"?"Connected":"Connect your account"}</h2></div></div>{wa?.connection?.phoneNumber&&<p className="muted">+{wa.connection.phoneNumber} · {wa.connection.pushName||"WhatsApp"}</p>}{!wa?.connection&&<><p className="muted">Link the WhatsApp account you use for your business. Pair it from WhatsApp → Linked devices.</p><button onClick={connect}>Link WhatsApp</button></>}{status==="SCAN_QR_CODE"&&<div className="qr"><p>Open WhatsApp on your phone and scan this QR from Linked devices.</p>{qr?<img src={qr} alt="WhatsApp pairing QR"/>:<button onClick={loadQr}>Show QR</button>}</div>}{status==="WORKING"&&<div className="connected"><span className="dot"></span> Ready to send messages</div>}</div>
  <div className="card"><p className="eyebrow">SEND MESSAGE</p><h2>New message</h2><input placeholder="Recipient / chat ID" value={chatId} onChange={e=>setChatId(e.target.value)} disabled={status!=="WORKING"}/><textarea placeholder="Write your message…" value={message} onChange={e=>setMessage(e.target.value)} rows={5} disabled={status!=="WORKING"}/><button disabled={status!=="WORKING"||!chatId||!message.trim()} onClick={publish}>Send message</button>{notice&&<p className="muted">{notice}</p>}</div></section>
  <section className="card history"><div className="section-head"><div><p className="eyebrow">MESSAGE HISTORY</p><h2>Sent messages</h2></div><button className="secondary" onClick={()=>{loadMessages();loadDashboard()}}>Refresh</button></div>{loadingMessages?<p className="muted">Loading history…</p>:messages.length===0?<p className="muted">No messages yet. Your sent messages will appear here.</p>:<div className="table-wrap"><table><thead><tr><th>Recipient</th><th>Message</th><th>Status</th><th>Sent at</th></tr></thead><tbody>{messages.map(m=><tr key={m._id}><td className="recipient">{m.chatId}</td><td>{m.text||m.kind}</td><td><span className={"status "+m.status}>{m.status}</span>{m.error&&<small className="error-line">{m.error}</small>}</td><td>{m.publishedAt?new Date(m.publishedAt).toLocaleString():new Date(m.createdAt).toLocaleString()}</td></tr>)}</tbody></table></div>}</section>
  {error&&<div className="toast error">{error}<button className="link" onClick={()=>setError("")}>×</button></div>}</main>;
}
createRoot(document.getElementById("root")!).render(<App />);
