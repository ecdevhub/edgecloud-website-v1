"use client";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Zap, Globe, Server } from "lucide-react";

const outcomes = [
  { icon: Zap, color: "#00A389", title: "M-Pesa in Minutes", desc: "STK Push, C2B, B2C, and reconciliation APIs pre-integrated. Ship payment flows in days, not months." },
  { icon: Shield, color: "#00A2FF", title: "DPA-Compliant by Default", desc: "Data residency, consent logs, DPIA templates, and audit trails — built into every deployment." },
  { icon: Globe, color: "#D97706", title: "Kenyan Data Sovereignty", desc: "All data stays in Nairobi. No cross-border transfers. Certifiable under the Data Protection Act 2019." },
  { icon: Server, color: "#7C3AED", title: "Managed Kubernetes", desc: "Production-grade orchestration without the DevOps overhead. Autoscaling, monitoring, and updates handled." },
];

const plans = [
  { name: "Starter", price: "KES — / mo", features: ["2 vCPU / 4 GB RAM", "50 GB SSD", "M-Pesa STK Push", "DPA Audit Logs", "Nairobi Support (Email)"], cta: "Get started", highlight: false },
  { name: "Business", price: "KES — / mo", features: ["8 vCPU / 16 GB RAM", "250 GB SSD + Backups", "Full M-Pesa Suite", "Managed Kubernetes", "WooCommerce Pre-config", "Priority Support (WhatsApp)"], cta: "Book a demo", highlight: true },
  { name: "Enterprise", price: "Custom", features: ["Dedicated infrastructure", "Custom compliance reports", "DPO consultation", "SLA-backed uptime", "Dedicated account manager", "On-site onboarding"], cta: "Contact us", highlight: false },
];

const faqs = [
  { q: "Is Eza Cloud certified under Kenya's DPA?", a: "Eza Cloud is architected for DPA alignment. We provide DPIA templates, data processing agreements, and audit logs. We recommend engaging a certified DPO for full legal sign-off." },
  { q: "How long does M-Pesa integration take?", a: "For standard STK Push flows, most clients go live within 3–5 days. Complex reconciliation or B2C flows may take 1–2 weeks depending on your Safaricom API tier." },
  { q: "Can I migrate my existing WooCommerce store?", a: "Yes. We offer managed migration with zero-downtime deployment. Our team handles DNS cutover, SSL, and M-Pesa reconfiguration." },
  { q: "Where are your data centres?", a: "Our primary infrastructure is in Nairobi, Kenya. No customer data is transferred outside Kenya without explicit written consent and a Data Processing Agreement." },
];

export default function EzaCloudPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: 104, paddingBottom: 72, background: "white", borderBottom: "1px solid #E5E8ED", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,163,137,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,163,137,0.04) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, background: "radial-gradient(circle, rgba(0,163,137,0.07) 0%, transparent 65%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", position: "relative" }}>
          <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 999, background: "rgba(0,163,137,0.08)", border: "1px solid rgba(0,163,137,0.22)", marginBottom: 24 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00A389" }} />
              <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#00A389" }}>Eza Cloud — Production Ready</span>
            </div>
            <h1 style={{ fontFamily: "'Instrument Serif',serif", fontSize: "clamp(34px,5vw,58px)", fontWeight: 400, color: "#0F1923", marginBottom: 20, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              DPA-compliant Kenyan cloud<br />with{" "}
              <span style={{ background: "linear-gradient(135deg,#00A389,#00A2FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>M-Pesa built in.</span>
            </h1>
            <p style={{ fontSize: 18, color: "#4A5568", lineHeight: 1.72, marginBottom: 32, maxWidth: 520, margin: "0 auto 32px" }}>
              The only Kenyan cloud platform that ships with native M-Pesa integration, DPA compliance, and managed Kubernetes — from a team that understands EAC markets.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#00A389", color: "white", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 15, padding: "13px 26px", borderRadius: 999, textDecoration: "none", boxShadow: "0 4px 20px rgba(0,163,137,0.28)" }}>
                Book Eza Cloud Demo <ArrowRight size={16} />
              </Link>
              <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "white", color: "#0F1923", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, fontSize: 15, padding: "12px 26px", borderRadius: 999, textDecoration: "none", border: "1.5px solid #E5E8ED" }}>
                Request Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section style={{ padding: "72px 0", background: "#FAFBFC" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <h2 style={{ fontFamily: "'Instrument Serif',serif", fontWeight: 400, fontSize: 36, color: "#0F1923", textAlign: "center", marginBottom: 48, letterSpacing: "-0.02em" }}>What you get with Eza Cloud</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {outcomes.map(o => {
              const Icon = o.icon;
              return (
                <div key={o.title} style={{ background: "white", border: `1px solid ${o.color}20`, borderRadius: 18, padding: "28px", boxShadow: "0 1px 6px rgba(15,25,35,0.05)" }}>
                  <div style={{ width: 44, height: 44, background: `${o.color}12`, border: `1px solid ${o.color}25`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                    <Icon size={20} style={{ color: o.color }} />
                  </div>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 17, color: "#0F1923", marginBottom: 9 }}>{o.title}</h3>
                  <p style={{ fontSize: 14, color: "#4A5568", lineHeight: 1.65, margin: 0 }}>{o.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section style={{ padding: "72px 0", background: "white" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <div style={{ width: 18, height: 2, background: "#00A389", borderRadius: 2 }} />
                <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#00A389" }}>Architecture</span>
              </div>
              <h2 style={{ fontFamily: "'Instrument Serif',serif", fontWeight: 400, fontSize: 36, color: "#0F1923", marginBottom: 16, letterSpacing: "-0.02em", lineHeight: 1.15 }}>Everything wired together, out of the box.</h2>
              <p style={{ fontSize: 16, color: "#4A5568", lineHeight: 1.75, marginBottom: 24 }}>Eza Cloud isn't a raw VPS. It's a pre-integrated platform where Kubernetes, WooCommerce, M-Pesa, and your compliance layer are connected from day one.</p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 11 }}>
                {["Managed Kubernetes cluster with auto-scaling", "WooCommerce pre-configured with Kenyan payment gateways", "M-Pesa STK Push + C2B + B2C APIs abstracted", "DPA consent logs stored immutably in-region", "SSL, WAF, and DDoS protection included"].map(item => (
                  <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <CheckCircle2 size={15} style={{ color: "#00A389", marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: 15, color: "#4A5568" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Layer diagram */}
            <div style={{ background: "#FAFBFC", border: "1px solid rgba(0,163,137,0.2)", borderRadius: 20, padding: "32px" }}>
              {[
                { label: "Your Application", color: "#00A2FF", items: ["WooCommerce", "Custom App", "API"] },
                { label: "Eza Cloud Platform", color: "#00A389", items: ["Managed K8s", "Load Balancer", "DPA Logs"] },
                { label: "Integrations", color: "#7C3AED", items: ["M-Pesa STK", "SMS/Email", "Analytics"] },
                { label: "Nairobi Data Centre", color: "#D97706", items: ["Primary", "Backup", "CDN"] },
              ].map((layer, i, arr) => (
                <div key={layer.label} style={{ marginBottom: i < arr.length - 1 ? 10 : 0 }}>
                  <div style={{ fontSize: 10.5, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: layer.color, marginBottom: 7 }}>{layer.label}</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {layer.items.map(c => (
                      <div key={c} style={{ flex: 1, background: `${layer.color}10`, border: `1px solid ${layer.color}25`, borderRadius: 8, padding: "10px 6px", textAlign: "center", fontSize: 12, color: "#0F1923", fontWeight: 500 }}>{c}</div>
                    ))}
                  </div>
                  {i < arr.length - 1 && <div style={{ textAlign: "center", padding: "6px 0", color: "#CDD2D9", fontSize: 18 }}>↓</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: "72px 0", background: "#FAFBFC" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Instrument Serif',serif", fontWeight: 400, fontSize: 36, color: "#0F1923", marginBottom: 10, letterSpacing: "-0.02em" }}>Simple, transparent pricing.</h2>
            <p style={{ fontSize: 16, color: "#8B96A3" }}>All plans include DPA compliance tooling and Nairobi-based support. KES pricing launching soon.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {plans.map(plan => (
              <div key={plan.name} style={{ background: "white", border: `1.5px solid ${plan.highlight ? "#00A389" : "#E5E8ED"}`, borderRadius: 22, padding: "32px", position: "relative", boxShadow: plan.highlight ? "0 8px 32px rgba(0,163,137,0.12)" : "0 1px 6px rgba(15,25,35,0.05)" }}>
                {plan.highlight && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#00A389", color: "white", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.08em", padding: "4px 16px", borderRadius: 999 }}>MOST POPULAR</div>}
                <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 21, color: "#0F1923", marginBottom: 6 }}>{plan.name}</h3>
                <div style={{ fontFamily: "'Instrument Serif',serif", fontSize: 32, color: plan.highlight ? "#00A389" : "#0F1923", marginBottom: 24 }}>{plan.price}</div>
                <ul style={{ listStyle: "none", margin: "0 0 28px", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <CheckCircle2 size={14} style={{ color: "#00A389", flexShrink: 0 }} />
                      <span style={{ fontSize: 14, color: "#4A5568" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" style={{ display: "block", textAlign: "center", padding: "12px 24px", borderRadius: 999, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 14, textDecoration: "none", background: plan.highlight ? "#00A389" : "white", color: plan.highlight ? "white" : "#00A389", border: `1.5px solid ${plan.highlight ? "#00A389" : "rgba(0,163,137,0.4)"}` }}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "72px 0", background: "white" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
          <h2 style={{ fontFamily: "'Instrument Serif',serif", fontWeight: 400, fontSize: 36, color: "#0F1923", textAlign: "center", marginBottom: 48, letterSpacing: "-0.02em" }}>Frequently asked questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {faqs.map(faq => (
              <div key={faq.q} style={{ background: "#FAFBFC", border: "1px solid #E5E8ED", borderRadius: 14, padding: "22px 26px" }}>
                <h4 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 16, color: "#0F1923", marginBottom: 9 }}>{faq.q}</h4>
                <p style={{ fontSize: 15, color: "#4A5568", lineHeight: 1.72, margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
