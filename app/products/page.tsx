"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";


export default function ProductsPage() {
  return (
    <section style={{ paddingTop: 120, paddingBottom: 96, background: "var(--color-bg)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ maxWidth: 600, marginBottom: 64 }}>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 52, color: "#F0F4FF", marginBottom: 16 }}>
            Products built for{" "}
            <span style={{ background: "linear-gradient(135deg, #00A2FF, #00C9A7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>East Africa.</span>
          </h1>
          <p style={{ fontSize: 18, color: "rgba(240,244,255,0.6)", lineHeight: 1.7 }}>Two flagship products — each solving a distinct problem for Kenyan businesses. One unified platform underneath.</p>
        </div>

        <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          {[
            { name: "Eza Cloud", color: "#00C9A7", href: "/products/eza-cloud", desc: "DPA-compliant cloud with M-Pesa native payments, managed Kubernetes, and Nairobi data residency.", badge: "Production Ready" },
            { name: "ZuriMail", color: "#8B5CF6", href: "/products/zurimail", desc: "Email + SMS MarTech suite. M-Pesa triggered receipts, consent-first campaigns, and Kenyan inbox delivery.", badge: "Early Access" },
            { name: "Future Stack", color: "rgba(240,244,255,0.3)", href: "#", desc: "SACCO-native lending tools, health data management, and open-source dev tooling. Coming soon.", badge: "Coming Soon", disabled: true },
          ].map((p) => (
            <Link key={p.name} href={p.href} style={{
              display: "flex", flexDirection: "column",
              background: "var(--color-surface)", border: `1px solid ${p.color}30`,
              borderRadius: 24, padding: "36px", textDecoration: "none",
              transition: "all 0.3s", opacity: p.disabled ? 0.6 : 1,
              pointerEvents: p.disabled ? "none" : "auto",
            }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", padding: "4px 10px", borderRadius: 999, background: `${p.color}15`, color: p.color, fontFamily: "Syne, sans-serif", border: `1px solid ${p.color}25`, alignSelf: "flex-start", marginBottom: 20 }}>{p.badge}</span>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 28, color: "#F0F4FF", marginBottom: 12 }}>{p.name}</h2>
              <p style={{ fontSize: 16, color: "rgba(240,244,255,0.6)", lineHeight: 1.65, flex: 1, marginBottom: 20 }}>{p.desc}</p>
              {!p.disabled && <div style={{ display: "flex", alignItems: "center", gap: 6, color: p.color, fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 14 }}>View product <ArrowRight size={14} /></div>}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
