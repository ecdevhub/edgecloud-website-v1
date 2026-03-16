"use client";
import { Shield, Cpu, MessageSquare, Layers } from "lucide-react";

const pillars = [
  {
    icon: Shield,
    color: "#00A2FF",
    bg: "rgba(0,162,255,0.1)",
    title: "DPA-by-Default Cloud",
    desc: "Every product we ship is architected for Kenya's Data Protection Act. Compliance is not a checkbox — it's baked into the infrastructure itself.",
    tag: "Compliance",
  },
  {
    icon: Cpu,
    color: "#00C9A7",
    bg: "rgba(0,201,167,0.1)",
    title: "M-Pesa-Native Architecture",
    desc: "We've abstracted the M-Pesa integration pain so you don't have to. One-click payment flows, receipt automation, and reconciliation out of the box.",
    tag: "Payments",
  },
  {
    icon: MessageSquare,
    color: "#8B5CF6",
    bg: "rgba(139,92,246,0.1)",
    title: "Nairobi-Based Experts",
    desc: "Our engineers speak Swahili and English, understand EAC market nuances, and are in the same timezone. Real support, not ticket queues.",
    tag: "Support",
  },
  {
    icon: Layers,
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.1)",
    title: "Agency + Products in One Stack",
    desc: "We build your digital products with the same cloud infrastructure and MarTech tools we sell. No middle-man. No dependencies on platforms we don't control.",
    tag: "Full Stack",
  },
];

export default function WhySection() {
  return (
    <section style={{ padding: "96px 0", background: "#FAFBFC", position: "relative" }}>
      {/* Diagonal pattern */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 32px, rgba(0,162,255,0.02) 32px, rgba(0,162,255,0.02) 33px)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", position: "relative" }}>
        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ width: 20, height: 2, background: "#00A2FF", borderRadius: 2 }} />
            <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#00A2FF" }}>Why EdgeCloud</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "#0F1923", maxWidth: 560, marginBottom: 0 }}>
            Built for Kenya.<br />
            <span style={{ background: "linear-gradient(135deg, #00A2FF, #00C9A7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Trusted by builders.
            </span>
          </h2>
        </div>

        {/* Cards — asymmetric staggered grid */}
        <div style={{ display: "grid", gap: 20 }} className="grid-cols-1 md:grid-cols-2">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={p.title} style={{
                background: "white",
                border: "1px solid #E5E8ED",
                borderRadius: 20,
                padding: "32px",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
                marginTop: i % 2 === 1 ? 24 : 0,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${p.color}40`;
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px rgba(0,0,0,0.4)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}>
                {/* Background accent */}
                <div style={{
                  position: "absolute", top: -60, right: -60,
                  width: 160, height: 160,
                  background: `radial-gradient(circle, ${p.bg} 0%, transparent 70%)`,
                  pointerEvents: "none",
                }} />

                <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <div style={{
                    width: 48, height: 48, flexShrink: 0,
                    background: p.bg, border: `1px solid ${p.color}30`,
                    borderRadius: 12,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={22} style={{ color: p.color }} />
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 18, color: "#0F1923", margin: 0 }}>{p.title}</h3>
                      <span style={{
                        fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", padding: "3px 8px", borderRadius: 999,
                        background: `${p.color}15`, color: p.color, fontFamily: "'Plus Jakarta Sans',sans-serif"
                      }}>{p.tag}</span>
                    </div>
                    <p style={{ fontSize: 15, color: "#4A5568", lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
