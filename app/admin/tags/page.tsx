"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/AdminShell";
import { PlusCircle, Tag } from "lucide-react";

export default function TagsPage() {
  const [user, setUser] = useState<any>(null);
  const [tags, setTags] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me").then(r => r.json()).then(d => setUser(d.user));
    fetch("/api/admin/tags").then(r => r.json()).then(setTags);
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/admin/tags", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name }) });
    setName("");
    fetch("/api/admin/tags").then(r => r.json()).then(setTags);
    setSaving(false);
  };

  if (!user) return <div style={{ padding: 40, color: "#8B96A3", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Loading…</div>;

  return (
    <AdminShell user={user}>
      <div style={{ padding: "32px 36px" }}>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 24, color: "#0F1923", marginBottom: 28 }}>Tags</h1>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 28, alignItems: "start" }}>
          <div style={{ background: "white", border: "1px solid #E5E8ED", borderRadius: 16, padding: "24px" }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#0F1923", marginBottom: 16 }}>All Tags ({tags.length})</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {tags.map(t => (
                <span key={t.id} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 999, background: "#F4F6F8", border: "1.5px solid #E5E8ED", fontSize: 13, fontWeight: 500, color: "#4A5568" }}>
                  <Tag size={11} style={{ color: "#8B96A3" }} /> {t.name}
                </span>
              ))}
              {tags.length === 0 && <p style={{ color: "#8B96A3", fontSize: 14 }}>No tags yet.</p>}
            </div>
          </div>
          <div style={{ background: "white", border: "1px solid #E5E8ED", borderRadius: 16, padding: "24px" }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 16, color: "#0F1923", marginBottom: 18 }}>Add Tag</h2>
            <form onSubmit={save} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input required value={name} onChange={e => setName(e.target.value)} placeholder="Tag name" style={{ width: "100%", border: "1.5px solid #E5E8ED", borderRadius: 9, padding: "9px 12px", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, color: "#0F1923", outline: "none", boxSizing: "border-box" }} />
              <button type="submit" disabled={saving} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, background: "#00A2FF", color: "white", border: "none", borderRadius: 9, padding: "11px", cursor: "pointer", fontWeight: 700, fontSize: 14, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                <PlusCircle size={15} /> {saving ? "Adding…" : "Add Tag"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
