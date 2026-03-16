"use client";
import Link from "next/link";
import { ShoppingCart, Landmark, Heart, Code2, ArrowRight } from "lucide-react";

const solutions = [
  { icon: ShoppingCart, color: "#00A2FF", title: "SMEs & E-commerce", href: "/solutions/smes-ecommerce", desc: "M-Pesa-enabled WooCommerce stores and DPA-compliant customer data handling, built for Kenyan retail." },
  { icon: Landmark, color: "#00C9A7", title: "FinTech & SACCOs", href: "/solutions/fintech-saccos", desc: "Compliant digital infrastructure for lending, savings, and payment flows in the SACCO ecosystem." },
  { icon: Heart, color: "#F59E0B", title: "Health & NGOs", href: "/solutions/health-ngos", desc: "Secure health data management and donor comms aligned with Kenya's Data Protection Act." },
  { icon: Code2, color: "#8B5CF6", title: "Agencies & Developers", href: "/solutions/agencies-developers", desc: "White-label cloud infrastructure and MarTech APIs for EAC digital agencies and developers." },
];

export default function SolutionsPage() {
  return (
    <section style={{ paddingTop: 120, paddingBottom: 96, background: "var(--color-bg)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ maxWidth: 600, marginBottom: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ width: 20, height: 2, background: "#00A2FF", borderRadius: 2 }} />
            <span style={{ fontFamily: "Syne, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#00A2FF" }}>Solutions by Industry</span>
          </div>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(36px,5vw,52px)", color: "#F0F4FF", marginBottom: 16 }}>
            Solutions for every sector.
          </h1>
          <p style={{ fontSize: 18, color: "rgba(240,244,255,0.6)", lineHeight: 1.7 }}>
            Tailored digital enablement for Kenya's most important industries — built with compliance and M-Pesa-native architecture as the baseline.
          </p>
        </div>
        <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {solutions.map(({ icon: Icon, color, title, href, desc }) => (
            <Link key={href} href={href} style={{
              display: "flex", flexDirection: "column",
              background: "var(--color-surface)", border: `1px solid ${color}25`,
              borderRadius: 20, padding: "28px", textDecoration: "none", transition: "all 0.3s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${color}50`; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${color}25`; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
              <div style={{ width: 44, height: 44, background: `${color}15`, border: `1px solid ${color}30`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <Icon size={20} style={{ color }} />
              </div>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 19, color: "#F0F4FF", marginBottom: 10 }}>{title}</h2>
              <p style={{ fontSize: 15, color: "rgba(240,244,255,0.6)", lineHeight: 1.65, flex: 1, marginBottom: 16 }}>{desc}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 4, color, fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 13 }}>
                Learn more <ArrowRight size={13} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
