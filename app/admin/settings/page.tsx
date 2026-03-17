"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/AdminShell";
import { Save } from "lucide-react";

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setUser(d.user));
  }, []);
  if (!user)
    return (
      <div style={{ padding: 40, color: "#8B96A3", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
        Loading…
      </div>
    );
  const INP: React.CSSProperties = {
    width: "100%",
    border: "1.5px solid #E5E8ED",
    borderRadius: 9,
    padding: "9px 12px",
    fontFamily: "'Plus Jakarta Sans',sans-serif",
    fontSize: 14,
    color: "#0F1923",
    outline: "none",
    background: "white",
    boxSizing: "border-box",
  };
  const LBL: React.CSSProperties = {
    display: "block",
    fontSize: 12,
    fontWeight: 600,
    color: "#8B96A3",
    marginBottom: 5,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  };
  return (
    <AdminShell user={user}>
      <div style={{ padding: "32px 36px", maxWidth: 640 }}>
        <h1
          style={{
            fontFamily: "'Plus Jakarta Sans',sans-serif",
            fontWeight: 800,
            fontSize: 24,
            color: "#0F1923",
            marginBottom: 28,
          }}
        >
          Settings
        </h1>
        <div
          style={{
            background: "white",
            border: "1px solid #E5E8ED",
            borderRadius: 16,
            padding: "28px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontWeight: 700,
              fontSize: 16,
              color: "#0F1923",
              marginBottom: 4,
            }}
          >
            Blog Configuration
          </h2>
          {[
            { key: "blog_title", label: "Blog Title", placeholder: "EdgeCloud Resources" },
            {
              key: "blog_description",
              label: "Blog Description",
              placeholder: "Practical guides for Kenya's digital builders",
            },
            { key: "posts_per_page", label: "Posts Per Page", placeholder: "9" },
          ].map((f) => (
            <div key={f.key}>
              <label style={LBL}>{f.label}</label>
              <input defaultValue="" style={INP} placeholder={f.placeholder} />
            </div>
          ))}
          <button
            onClick={() => {
              setSaved(true);
              setTimeout(() => setSaved(false), 2000);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              background: saved ? "#059669" : "#00A2FF",
              color: "white",
              border: "none",
              borderRadius: 9,
              padding: "11px 20px",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 14,
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              alignSelf: "flex-start",
            }}
          >
            <Save size={15} /> {saved ? "Saved!" : "Save Settings"}
          </button>
        </div>

        <div
          style={{
            background: "white",
            border: "1px solid #E5E8ED",
            borderRadius: 16,
            padding: "28px",
            marginTop: 20,
          }}
        >
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontWeight: 700,
              fontSize: 16,
              color: "#0F1923",
              marginBottom: 16,
            }}
          >
            Database Setup
          </h2>
          <div
            style={{
              background: "#F4F6F8",
              borderRadius: 10,
              padding: "14px 16px",
              fontFamily: "monospace",
              fontSize: 13,
              color: "#4A5568",
              lineHeight: 1.8,
            }}
          >
            <div style={{ marginBottom: 4, color: "#8B96A3" }}># Run to initialise schema:</div>
            <div>mysql -u root -p edgecloud_blog &lt; db/migrations/0001_init.sql</div>
            <div style={{ marginTop: 8, color: "#8B96A3" }}># Create your first admin user:</div>
            <div>npx ts-node scripts/create-admin.ts</div>
          </div>
        </div>

        <div
          style={{
            background: "#FFFBEB",
            border: "1px solid #FDE68A",
            borderRadius: 16,
            padding: "20px 24px",
            marginTop: 20,
          }}
        >
          <h3
            style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontWeight: 700,
              fontSize: 14,
              color: "#92400E",
              marginBottom: 8,
            }}
          >
            Environment Variables
          </h3>
          <div style={{ fontFamily: "monospace", fontSize: 12, color: "#78350F", lineHeight: 1.9 }}>
            {[
              "DB_HOST=localhost",
              "DB_PORT=3306",
              "DB_USER=root",
              "DB_PASSWORD=yourpassword",
              "DB_NAME=edgecloud_blog",
              "JWT_SECRET=your-strong-secret-here",
            ].map((v) => (
              <div key={v}>{v}</div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
