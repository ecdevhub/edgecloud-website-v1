"use client";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Zap } from "lucide-react";

const products = [
  {
    id: "eza-cloud",
    name: "Eza Cloud",
    tagline: "DPA-compliant Kenyan cloud with M-Pesa-native payments.",
    color: "#00C9A7",
    colorMuted: "rgba(0,201,167,0.1)",
    borderColor: "rgba(0,201,167,0.25)",
    href: "/products/eza-cloud",
    bullets: [
      "1-click M-Pesa payment integration",
      "Managed Kubernetes & WooCommerce",
      "Data residency in Nairobi",
    ],
    badge: "Production Ready",
  },
  {
    id: "zurimail",
    name: "ZuriMail",
    tagline: "DPA-compliant email + SMS/MarTech suite, M-Pesa-native.",
    color: "#8B5CF6",
    colorMuted: "rgba(139,92,246,0.1)",
    borderColor: "rgba(139,92,246,0.25)",
    href: "/products/zurimail",
    bullets: [
      "Campaign automation & receipts",
      "M-Pesa-linked payment reminders",
      "Consent management built-in",
    ],
    badge: "Early Access",
  },
  {
    id: "future-stack",
    name: "Future Stack",
    tagline: "More compliant-by-default tools for East Africa — coming soon.",
    color: "#CDD2D9",
    colorMuted: "rgba(255,255,255,0.04)",
    borderColor: "rgba(255,255,255,0.1)",
    href: "/products",
    bullets: [
      "SACCO-native lending products",
      "Health data management",
      "Open-source tooling for devs",
    ],
    badge: "Coming Soon",
    comingSoon: true,
  },
];

export default function ProductStack() {
  return (
    <section style={{ padding: "96px 0", background: "#F4F6F8" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 20, marginBottom: 56 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 20, height: 2, background: "#00A2FF", borderRadius: 2 }} />
              <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#00A2FF" }}>The EdgeCloud Stack</span>
            </div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "#0F1923", margin: 0 }}>
              Products built for<br />
              <span style={{ background: "linear-gradient(135deg, #00A2FF, #00C9A7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                the Kenyan market.
              </span>
            </h2>
          </div>
          <Link href="/products" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, fontWeight: 600,
            color: "#00A2FF", textDecoration: "none",
          }}>
            View all products <ArrowRight size={14} />
          </Link>
        </div>

        {/* Product cards */}
        <div style={{ display: "grid", gap: 24 }} className="grid-cols-1 md:grid-cols-3">
          {products.map((p) => (
            <div key={p.id} style={{
              background: "white",
              border: `1px solid ${p.borderColor}`,
              borderRadius: 24,
              padding: "32px",
              display: "flex", flexDirection: "column",
              position: "relative", overflow: "hidden",
              opacity: p.comingSoon ? 0.7 : 1,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              if (!p.comingSoon) {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 24px 60px rgba(0,0,0,0.4)`;
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}>
              {/* Glow */}
              <div style={{
                position: "absolute", top: -80, right: -80, width: 200, height: 200,
                background: `radial-gradient(circle, ${p.colorMuted}, transparent 70%)`,
                pointerEvents: "none",
              }} />

              {/* Badge */}
              <div style={{ marginBottom: 20 }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", padding: "4px 10px", borderRadius: 999,
                  background: `${p.color}18`, color: p.color, fontFamily: "'Plus Jakarta Sans',sans-serif",
                  border: `1px solid ${p.color}30`,
                }}>{p.badge}</span>
              </div>

              {/* Name */}
              <h3 style={{
                fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 26, marginBottom: 10,
                color: p.comingSoon ? "#8B96A3" : "#0F1923",
              }}>{p.name}</h3>

              <p style={{ fontSize: 15, color: "#4A5568", lineHeight: 1.65, marginBottom: 24 }}>{p.tagline}</p>

              {/* Bullets */}
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                {p.bullets.map((b) => (
                  <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <CheckCircle2 size={15} style={{ color: p.color, marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: "#4A5568" }}>{b}</span>
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: "auto" }}>
                <Link href={p.href} style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, fontWeight: 600,
                  color: p.comingSoon ? "rgba(240,244,255,0.3)" : p.color,
                  textDecoration: "none",
                  transition: "gap 0.2s",
                  pointerEvents: p.comingSoon ? "none" : "auto",
                }}>
                  {p.comingSoon ? "Stay tuned" : "View product"} {!p.comingSoon && <ArrowRight size={14} />}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
