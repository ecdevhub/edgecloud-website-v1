"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) { router.push("/admin/dashboard"); router.refresh(); }
    else { setError(data.error || "Login failed"); setLoading(false); }
  };

  const F: React.CSSProperties = { width: "100%", background: "white", border: "1.5px solid #E5E8ED", borderRadius: 10, color: "#0F1923", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, padding: "11px 14px", outline: "none", boxSizing: "border-box" };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #F4F6F8 0%, #EDF2F7 100%)", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 48, height: 48, borderRadius: 13, background: "linear-gradient(135deg, #00A2FF, #00C9A7)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 19, color: "white" }}>EC</div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 22, color: "#0F1923", margin: "0 0 4px" }}>EdgeCloud Admin</h1>
          <p style={{ fontSize: 14, color: "#8B96A3", margin: 0 }}>Sign in to manage your blog and content</p>
        </div>

        <div style={{ background: "white", borderRadius: 18, padding: "36px 32px", boxShadow: "0 8px 40px rgba(15,25,35,0.1)", border: "1px solid #E5E8ED" }}>
          <form onSubmit={submit}>
            {error && <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#DC2626", marginBottom: 20 }}>{error}</div>}

            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#4A5568", marginBottom: 6 }}>Email address</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@edgecloudtech.co.ke" style={F}
                onFocus={e => (e.target.style.borderColor="#00A2FF")} onBlur={e => (e.target.style.borderColor="#E5E8ED")} />
            </div>

            <div style={{ marginBottom: 26 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#4A5568", marginBottom: 6 }}>Password</label>
              <div style={{ position: "relative" }}>
                <input type={show ? "text" : "password"} required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                  style={{ ...F, paddingRight: 44 }}
                  onFocus={e => (e.target.style.borderColor="#00A2FF")} onBlur={e => (e.target.style.borderColor="#E5E8ED")} />
                <button type="button" onClick={() => setShow(!show)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#8B96A3", display: "flex", padding: 4 }}>
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: loading ? "#7CC5FF" : "#00A2FF", color: "white", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 15, padding: "13px", borderRadius: 10, border: "none", cursor: loading ? "not-allowed" : "pointer", transition: "background 0.15s" }}>
              <LogIn size={16} /> {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
        <p style={{ textAlign: "center", fontSize: 12, color: "#8B96A3", marginTop: 20 }}>EdgeCloud Technologies · Admin Panel</p>
      </div>
    </div>
  );
}
