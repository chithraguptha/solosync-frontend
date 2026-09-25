import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

async function call(path: string, options: RequestInit = {}) {
  const r = await fetch(API + path, { ...options, credentials: "include", headers: { "Content-Type": "application/json", ...(options.headers || {}) } });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw Error(data.message || "Request failed");
  return data;
}

function App() {
  const [u, setU] = useState<any>(null);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [wa, setWa] = useState<any>(null);
  const [qr, setQr] = useState("");
  const [chatId, setChatId] = useState("");
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => { call("/api/auth/me").then(x => setU(x.user)).catch(() => {}); }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setError("");
    try { const x = await call("/api/auth/" + mode, { method: "POST", body: JSON.stringify({ email, password }) }); setU(x.user); }
    catch (e: any) { setError(e.message); }
  }

  async function loadStatus() {
    try { const x = await call("/api/whatsapp/status"); setWa(x); if (x.session?.status === "SCAN_QR_CODE") loadQr(); }
    catch (e: any) { setError(e.message); }
  }

  async function loadQr() {
    try { const x = await call("/api/whatsapp/qr"); if (x.data && x.mimetype) setQr("data:" + x.mimetype + ";base64," + x.data); }
    catch {}
  }

  useEffect(() => { if (u) loadStatus(); }, [u]);

  async function connect() {
    try { const x = await call("/api/whatsapp/connect", { method: "POST", body: "{}" }); setWa(x); loadQr(); }
    catch (e: any) { setError(e.message); }
  }

  async function publish() {
    try {
      await call("/api/whatsapp/publish", { method: "POST", body: JSON.stringify({ chatId, text: message, kind: "text" }) });
      setMessage(""); setNotice("Message queued. Test billing records ₹0.10 per successful message.");
    } catch (e: any) { setNotice(e.message); }
  }

  useEffect(() => {
    if (!u || wa?.session?.status === "WORKING") return;
    const timer = setInterval(loadStatus, 4000);
    return () => clearInterval(timer);
  }, [u, wa?.session?.status]);

  async function logout() {
    await call("/api/auth/logout", { method: "POST" }); setU(null); setWa(null);
  }

  if (!u) return <main className="shell"><header><b>SoloSync</b><span>WhatsApp publishing for businesses</span></header><section className="card auth">
    <p className="eyebrow">{mode === "login" ? "WELCOME BACK" : "CREATE ACCOUNT"}</p>
    <h1>{mode === "login" ? "Sign in" : "Get started"}</h1>
    <form onSubmit={submit}><input type="email" placeholder="Business email" value={email} onChange={e => setEmail(e.target.value)} required /><input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} minLength={8} required /><button>{mode === "login" ? "Sign in" : "Create account"}</button></form>
    {error && <p className="error">{error}</p>}<button className="link" onClick={() => setMode(mode === "login" ? "register" : "login")}>{mode === "login" ? "Create an account" : "I already have an account"}</button>
  </section></main>;

  const status = wa?.session?.status || "NOT_CONNECTED";
  return <main className="shell">
    <header><b>SoloSync</b><button className="link" onClick={logout}>Sign out</button></header>
    <section className="card">
      <p className="eyebrow">WHATSAPP CONNECTION</p><h1>{status === "WORKING" ? "Connected." : "Connect your account"}</h1>
      {wa?.connection?.phoneNumber && <p className="muted">+{wa.connection.phoneNumber} · {wa.connection.pushName || "WhatsApp"}</p>}
      {!wa?.connection && <button onClick={connect}>Connect WhatsApp</button>}
      {status === "SCAN_QR_CODE" && <div className="qr"><p>Scan the QR from WhatsApp → Linked devices.</p>{qr ? <img src={qr} alt="Pairing QR" /> : <button onClick={loadQr}>Get QR</button>}</div>}
      {status === "WORKING" && <div className="publisher"><input placeholder="Chat or channel ID, e.g. 123@newsletter" value={chatId} onChange={e => setChatId(e.target.value)} /><textarea placeholder="Message to publish" value={message} onChange={e => setMessage(e.target.value)} rows={5} /><button disabled={!chatId || !message.trim()} onClick={publish}>Publish message</button>{notice && <p className="muted">{notice}</p>}</div>}
      {error && <p className="error">{error}</p>}
    </section>
    <section className="card pricing"><p className="eyebrow">TEST BILLING</p><h2>₹399 activation · ₹0.10 / message</h2><p className="muted">Payments are disabled for testing. Usage is recorded for the future billing integration.</p></section>
  </main>;
}

createRoot(document.getElementById("root")!).render(<App />);
