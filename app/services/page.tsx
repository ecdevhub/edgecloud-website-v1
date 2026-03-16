"use client";
import Link from "next/link";
import { ArrowRight, Compass, Cloud, ShoppingCart, BarChart2, Headphones, CheckCircle2 } from "lucide-react";

const services = [
  {
    icon: Compass, color: "#00A2FF",
    title: "Digital Enablement Strategy",
    tagline: "Clarity before code.",
    desc: "Discovery workshops, DPA impact assessments, compliance roadmaps, and architecture blueprints tailored to East African regulatory and market realities.",
    deliverables: ["Discovery & requirements workshop", "Data Protection Impact Assessment (DPIA)", "Compliance roadmap report", "Architecture blueprint", "Digital transformation roadmap"],
  },
  {
    icon: Cloud, color: "#00A389",
    title: "Cloud & Kubernetes Implementation",
    tagline: "Infrastructure that runs itself.",
    desc: "We deploy and configure Eza Cloud environments — or work with your existing cloud — giving you production-grade, DPA-compliant Kubernetes without a dedicated DevOps team.",
    deliverables: ["Eza Cloud environment setup", "Kubernetes cluster configuration", "CI/CD pipeline", "Monitoring & alerting", "Security hardening & WAF"],
  },
  {
    icon: ShoppingCart, color: "#059669",
    title: "E-commerce & WooCommerce Enablement",
    tagline: "Sell more. Chase less.",
    desc: "Full-stack WooCommerce builds with M-Pesa STK Push and B2C integrated from day one — on infrastructure that won't embarrass you during a product launch.",
    deliverables: ["WooCommerce store design & build", "M-Pesa STK Push + C2B integration", "Payment reconciliation logic", "DPA-compliant customer data setup", "Performance optimisation on Eza Cloud"],
  },
  {
    icon: BarChart2, color: "#7C3AED",
    title: "MarTech & Customer Journeys",
    tagline: "ZuriMail, deployed properly.",
    desc: "We configure and run ZuriMail as your customer communication engine — email campaigns, SMS flows, M-Pesa-triggered receipts, and automation journeys.",
    deliverables: ["ZuriMail platform setup & onboarding", "Customer journey mapping", "Email & SMS campaign design", "M-Pesa receipt automation", "Consent management & DPA audit logs"],
  },
  {
    icon: Headphones, color: "#D97706",
    title: "Managed Support & Training",
    tagline: "We stay after go-live.",
    desc: "Our Nairobi-based team provides ongoing infrastructure management, proactive monitoring, and hands-on training in Swahili and English.",
    deliverables: ["24/7 infrastructure monitoring", "Monthly performance reports", "Quarterly compliance check-ins", "Team training (English & Swahili)", "Priority WhatsApp support channel"],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: 104, paddingBottom: 64, background: "white", borderBottom: "1px solid #E5E8ED", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,162,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,162,255,0.04) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", position: "relative" }}>
          <div style={{ maxWidth: 640 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 18, height: 2, background: "#00A2FF", borderRadius: 2 }} />
              <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#00A2FF" }}>Agency Services</span>
            </div>
            <h1 style={{ fontFamily: "'Instrument Serif',serif", fontSize: "clamp(36px,5vw,58px)", fontWeight: 400, color: "#0F1923", marginBottom: 20, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              We don't just build.<br />
              <span style={{ background: "linear-gradient(135deg,#00A2FF,#00C9A7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>We enable.</span>
            </h1>
            <p style={{ fontSize: 18, color: "#4A5568", lineHeight: 1.72, maxWidth: 520, marginBottom: 32 }}>
              EdgeCloud is an agency with its own products — which means we bring both deep strategic thinking and real infrastructure ownership to every engagement. No subcontracting the hard parts.
            </p>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#00A2FF", color: "white", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 15, padding: "13px 26px", borderRadius: 999, textDecoration: "none", boxShadow: "0 4px 20px rgba(0,162,255,0.28)" }}>
              Talk to an Expert <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: "72px 0 96px", background: "#FAFBFC" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <div key={svc.title} style={{ background: "white", border: `1px solid ${svc.color}20`, borderRadius: 22, padding: "40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start", boxShadow: "0 1px 6px rgba(15,25,35,0.05)", transition: "all 0.22s ease" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${svc.color}40`; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(15,25,35,0.10)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${svc.color}20`; (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 6px rgba(15,25,35,0.05)"; }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                      <div style={{ width: 50, height: 50, background: `${svc.color}12`, border: `1px solid ${svc.color}25`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon size={22} style={{ color: svc.color }} />
                      </div>
                      <div>
                        <div style={{ fontSize: 12, color: svc.color, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, letterSpacing: "0.06em", marginBottom: 3 }}>{svc.tagline}</div>
                        <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 21, color: "#0F1923", margin: 0 }}>{svc.title}</h2>
                      </div>
                    </div>
                    <p style={{ fontSize: 16, color: "#4A5568", lineHeight: 1.75, marginBottom: 22 }}>{svc.desc}</p>
                    <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, fontWeight: 700, color: svc.color, textDecoration: "none", padding: "9px 18px", borderRadius: 999, background: `${svc.color}10`, border: `1.5px solid ${svc.color}25` }}>
                      Start this engagement <ArrowRight size={13} />
                    </Link>
                  </div>

                  <div>
                    <div style={{ fontSize: 11, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8B96A3", marginBottom: 14 }}>What we deliver</div>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                      {svc.deliverables.map(d => (
                        <li key={d} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "11px 14px", background: `${svc.color}06`, border: `1px solid ${svc.color}15`, borderRadius: 10 }}>
                          <CheckCircle2 size={15} style={{ color: svc.color, marginTop: 1, flexShrink: 0 }} />
                          <span style={{ fontSize: 14, color: "#4A5568" }}>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ padding: "80px 0", background: "white", textAlign: "center", borderTop: "1px solid #E5E8ED" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "0 24px" }}>
          <h2 style={{ fontFamily: "'Instrument Serif',serif", fontWeight: 400, fontSize: 40, color: "#0F1923", marginBottom: 16, letterSpacing: "-0.02em" }}>Ready to start?</h2>
          <p style={{ fontSize: 17, color: "#4A5568", lineHeight: 1.72, marginBottom: 32 }}>
            Every engagement starts with a free 45-minute discovery call. No slides, no generic decks — just a real conversation about your digital goals with our Nairobi team.
          </p>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#00A2FF", color: "white", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 999, textDecoration: "none", boxShadow: "0 4px 20px rgba(0,162,255,0.28)" }}>
            Book a Discovery Call <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
