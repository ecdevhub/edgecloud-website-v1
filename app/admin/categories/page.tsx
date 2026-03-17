"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/AdminShell";
import { PlusCircle, Edit2 } from "lucide-react";

// This page fetches user on client - simpler for categories mgmt
export default function CategoriesPage() {
  const [user, setUser] = useState<any>(null);
  const [cats, setCats] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [color, setColor] = useState("#00A2FF");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setUser(d.user));
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then(setCats);
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description: desc, color }),
    });
    if (res.ok) {
      const data = await res.json();
      setName("");
      setDesc("");
      setColor("#00A2FF");
      fetch("/api/admin/categories")
        .then((r) => r.json())
        .then(setCats);
    }
    setSaving(false);
  };

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

  return (
    <AdminShell user={user}>
      <div style={{ padding: "32px 36px" }}>
        <h1
          style={{
            fontFamily: "'Plus Jakarta Sans',sans-serif",
            fontWeight: 800,
            fontSize: 24,
            color: "#0F1923",
            marginBottom: 28,
          }}
        >
          Categories
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 360px",
            gap: 28,
            alignItems: "start",
          }}
        >
          {/* List */}
          <div
            style={{
              background: "white",
              border: "1px solid #E5E8ED",
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "14px 20px",
                borderBottom: "1px solid #E5E8ED",
                fontWeight: 700,
                fontSize: 14,
                color: "#0F1923",
              }}
            >
              All Categories ({cats.length})
            </div>
            {cats.length === 0 ? (
              <div style={{ padding: 32, textAlign: "center", color: "#8B96A3", fontSize: 14 }}>
                No categories yet.
              </div>
            ) : (
              cats.map((c, i) => (
                <div
                  key={c.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "13px 20px",
                    borderBottom: i < cats.length - 1 ? "1px solid #F4F6F8" : "none",
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: c.color || "#00A2FF",
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: "#0F1923" }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: "#8B96A3" }}>
                      /resources?category={c.slug}
                    </div>
                  </div>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#8B96A3",
                      display: "flex",
                      padding: 4,
                    }}
                  >
                    <Edit2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Add form */}
          <div
            style={{
              background: "white",
              border: "1px solid #E5E8ED",
              borderRadius: 16,
              padding: "24px",
            }}
          >
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontWeight: 700,
                fontSize: 16,
                color: "#0F1923",
                marginBottom: 20,
              }}
            >
              Add Category
            </h2>
            <form onSubmit={save} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#8B96A3",
                    marginBottom: 5,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Name *
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={INP}
                  placeholder="Engineering"
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#8B96A3",
                    marginBottom: 5,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Description
                </label>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  rows={2}
                  style={{ ...INP, resize: "vertical" }}
                  placeholder="Short description…"
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#8B96A3",
                    marginBottom: 5,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Color
                </label>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    style={{
                      width: 40,
                      height: 36,
                      border: "1.5px solid #E5E8ED",
                      borderRadius: 8,
                      cursor: "pointer",
                      padding: 2,
                    }}
                  />
                  <input
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    style={{ ...INP, flex: 1 }}
                    placeholder="#00A2FF"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={saving}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 7,
                  background: "#00A2FF",
                  color: "white",
                  border: "none",
                  borderRadius: 9,
                  padding: "11px",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: 14,
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                }}
              >
                <PlusCircle size={15} /> {saving ? "Adding…" : "Add Category"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
