"use client";
import Link from "next/link";
import { ArrowRight, MapPin, Users, Zap, Heart } from "lucide-react";

export default function CompanyPage() {
  return (
    <>
      <section style={{ paddingTop: 120, paddingBottom: 80, background: "var(--color-bg)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ maxWidth: 720 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <div style={{ width: 20, height: 2, background: "#00A2FF", borderRadius: 2 }} />
              <span style={{ fontFamily: "Syne, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#00A2FF" }}>About Us</span>
            </div>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(36px,5vw,52px)", color: "#F0F4FF", marginBottom: 20 }}>
              We're the builders of{" "}
              <span style={{ background: "linear-gradient(135deg, #00A2FF, #00C9A7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Kenya's digital backbone.</span>
            </h1>
            <p style={{ fontSize: 18, color: "rgba(240,244,255,0.65)", lineHeight: 1.75, marginBottom: 20 }}>
              EdgeCloud Technologies was founded in Nairobi with a clear-eyed frustration: Kenyan businesses were being forced to choose between international platforms that didn't understand EAC markets, and local providers that weren't serious about compliance or scale.
            </p>
            <p style={{ fontSize: 18, color: "rgba(240,244,255,0.65)", lineHeight: 1.75, marginBottom: 36 }}>
              We exist to close that gap. As both an agency and a product studio, we bring strategic depth and engineering credibility — backed by our own DPA-compliant infrastructure.
            </p>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#00A2FF", color: "white", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15, padding: "14px 28px", borderRadius: 999, textDecoration: "none" }}>
              Work with us <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <section style={{ padding: "60px 0 96px", background: "#070D1B" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            {[
              { icon: MapPin, color: "#00A2FF", title: "100% Nairobi-based", desc: "Our entire engineering and support team is in Nairobi. No offshore queues, no timezone confusion." },
              { icon: Users, color: "#00C9A7", title: "EAC-market specialists", desc: "We've built M-Pesa integrations, SACCO platforms, and health data systems across Kenya and East Africa." },
              { icon: Zap, color: "#8B5CF6", title: "Agency + product studio", desc: "We build bespoke client solutions and ship our own products. Both disciplines make each other sharper." },
              { icon: Heart, color: "#F59E0B", title: "Compliance-first culture", desc: "DPA alignment and privacy-by-design are in our engineering culture — not an upsell for enterprise clients." },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title} style={{ background: "var(--color-surface)", border: `1px solid ${color}20`, borderRadius: 20, padding: "28px" }}>
                <div style={{ width: 44, height: 44, background: `${color}15`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 17, color: "#F0F4FF", marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 14, color: "rgba(240,244,255,0.6)", lineHeight: 1.65, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
