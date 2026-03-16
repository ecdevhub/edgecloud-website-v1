"use client";
import Link from "next/link";
import { ShoppingCart, Landmark, Heart, Code2, ArrowRight } from "lucide-react";

const solutions = [
  {
    icon: ShoppingCart, color: "#00A2FF",
    title: "SMEs & E-commerce",
    desc: "Launch and scale M-Pesa-enabled WooCommerce stores with DPA-compliant customer data handling.",
    href: "/solutions/smes-ecommerce",
  },
  {
    icon: Landmark, color: "#00C9A7",
    title: "FinTech & SACCOs",
    desc: "Compliant digital infrastructure for lending, savings, and payment flows in the Kenyan SACCO ecosystem.",
    href: "/solutions/fintech-saccos",
  },
  {
    icon: Heart, color: "#F59E0B",
    title: "Health & NGOs",
    desc: "Secure health data management and donor communication platforms aligned with Kenya's Data Protection Act.",
    href: "/solutions/health-ngos",
  },
  {
    icon: Code2, color: "#8B5CF6",
    title: "Agencies & Developers",
    desc: "White-label cloud infrastructure and MarTech APIs for digital agencies building on the East African stack.",
    href: "/solutions/agencies-developers",
  },
];

export default function SolutionsSection() {
  return (
    <section style={{ padding: "96px 0", background: "#FAFBFC", position: "relative" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(rgba(0,162,255,0.12) 1.5px, transparent 1.5px)",
        backgroundSize: "28px 28px",
        pointerEvents: "none",
      }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", position: "relative" }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ width: 20, height: 2, background: "#00A2FF", borderRadius: 2 }} />
            <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#00A2FF" }}>Solutions by Industry</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "#0F1923", margin: 0, maxWidth: 480 }}>
            Your sector,<br />our expertise.
          </h2>
        </div>

        <div style={{ display: "grid", gap: 16 }} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {solutions.map((s) => {
            const Icon = s.icon;
            return (
              <Link key={s.title} href={s.href} style={{
                display: "flex", flexDirection: "column",
                background: "white",
                border: "1px solid #E5E8ED",
                borderRadius: 20,
                padding: "28px",
                textDecoration: "none",
                transition: "all 0.3s ease",
                position: "relative", overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${s.color}40`;
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px rgba(0,0,0,0.4)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}>
                <div style={{
                  width: 44, height: 44,
                  background: `${s.color}15`, border: `1px solid ${s.color}30`,
                  borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 16,
                }}>
                  <Icon size={20} style={{ color: s.color }} />
                </div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 17, color: "#0F1923", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "#8B96A3", lineHeight: 1.65, flex: 1, marginBottom: 16 }}>{s.desc}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 4, color: s.color, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, fontSize: 13 }}>
                  Learn more <ArrowRight size={13} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
