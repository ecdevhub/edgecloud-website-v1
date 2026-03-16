"use client";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Mail, MessageSquare, CreditCard, Bell, TrendingUp, Shield } from "lucide-react";

const useCases = [
  { icon: Mail, color: "#7C3AED", title: "Email Campaigns", desc: "Mobile-first templates, A/B testing, segmentation, and open-rate analytics optimised for Kenyan inboxes." },
  { icon: MessageSquare, color: "#00A2FF", title: "SMS & WhatsApp", desc: "SMS blasts, OTPs, and conversational WhatsApp flows on the channels customers actually use." },
  { icon: CreditCard, color: "#059669", title: "M-Pesa Receipts", desc: "Auto-send branded payment receipts the moment an M-Pesa transaction lands. No code required." },
  { icon: Bell, color: "#D97706", title: "Payment Reminders", desc: "Smart reminder sequences that drive collections without damaging customer relationships." },
  { icon: TrendingUp, color: "#00A389", title: "Marketing Automation", desc: "Trigger email or SMS journeys based on purchases, cart abandonment, or custom M-Pesa events." },
  { icon: Shield, color: "#EC4899", title: "Consent Management", desc: "DPA-compliant opt-in capture, consent logs, and one-click unsubscribe built into every send." },
];

const plans = [
  { name: "Starter", price: "KES — / mo", features: ["Up to 5,000 contacts", "10,000 emails/month", "SMS credits (top-up)", "M-Pesa receipt triggers", "Basic automation"], cta: "Join early access", highlight: false },
  { name: "Growth", price: "KES — / mo", features: ["Up to 50,000 contacts", "Unlimited emails", "Bulk SMS included", "Advanced automation", "WhatsApp integration", "Priority support"], cta: "Join early access", highlight: true },
  { name: "Agency", price: "Custom", features: ["Unlimited contacts", "Multi-brand workspaces", "White-label option", "Custom integrations", "Dedicated account manager", "SLA-backed delivery"], cta: "Talk to us", highlight: false },
];

const faqs = [
  { q: "Is ZuriMail DPA-compliant for Kenya?", a: "Yes. Every send captures consent timestamps, stores opt-in records, and provides one-click unsubscribe. We maintain data processing records you can export for DPA audit purposes." },
  { q: "How does M-Pesa receipt automation work?", a: "Connect your M-Pesa callback to ZuriMail's webhook endpoint. When a payment lands, ZuriMail fires a branded receipt email or SMS within seconds — no developer needed." },
  { q: "Can I use ZuriMail without Eza Cloud?", a: "Absolutely. ZuriMail has its own M-Pesa webhook integration and works standalone with any hosting provider." },
  { q: "When does ZuriMail launch publicly?", a: "We're in private early access now. Join the waitlist and we'll onboard you with a free setup session from our Nairobi team." },
];

export default function ZuriMailPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: 104, paddingBottom: 72, background: "white", borderBottom: "1px solid #E5E8ED", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(124,58,237,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 65%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", position: "relative" }}>
          <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 999, background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.2)", marginBottom: 24 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#7C3AED" }} />
              <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7C3AED" }}>ZuriMail — Early Access</span>
            </div>
            <h1 style={{ fontFamily: "'Instrument Serif',serif", fontSize: "clamp(34px,5vw,58px)", fontWeight: 400, color: "#0F1923", marginBottom: 20, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Email + SMS marketing<br />
              <span style={{ background: "linear-gradient(135deg,#7C3AED,#00A2FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>built for Kenyan business.</span>
            </h1>
            <p style={{ fontSize: 18, color: "#4A5568", lineHeight: 1.72, marginBottom: 32 }}>
              DPA-compliant email and SMS campaigns, M-Pesa-native payment receipts, and marketing automation — all from one platform built for East Africa.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#7C3AED", color: "white", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 15, padding: "13px 26px", borderRadius: 999, textDecoration: "none", boxShadow: "0 4px 20px rgba(124,58,237,0.28)" }}>
                Join Early Access <ArrowRight size={16} />
              </Link>
              <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "white", color: "#0F1923", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, fontSize: 15, padding: "12px 26px", borderRadius: 999, textDecoration: "none", border: "1.5px solid #E5E8ED" }}>
                See a Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section style={{ padding: "72px 0", background: "#FAFBFC" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Instrument Serif',serif", fontWeight: 400, fontSize: 36, color: "#0F1923", marginBottom: 10, letterSpacing: "-0.02em" }}>Every customer communication, one platform.</h2>
            <p style={{ fontSize: 16, color: "#8B96A3", maxWidth: 460, margin: "0 auto" }}>From first hello to payment receipt — every touchpoint, handled.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {useCases.map(uc => {
              const Icon = uc.icon;
              return (
                <div key={uc.title} style={{ background: "white", border: `1px solid ${uc.color}18`, borderRadius: 18, padding: "26px", boxShadow: "0 1px 6px rgba(15,25,35,0.05)", transition: "all 0.22s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${uc.color}35`; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(15,25,35,0.08)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${uc.color}18`; (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 6px rgba(15,25,35,0.05)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                  <div style={{ width: 42, height: 42, background: `${uc.color}12`, border: `1px solid ${uc.color}25`, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                    <Icon size={19} style={{ color: uc.color }} />
                  </div>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 16, color: "#0F1923", marginBottom: 9 }}>{uc.title}</h3>
                  <p style={{ fontSize: 14, color: "#4A5568", lineHeight: 1.65, margin: 0 }}>{uc.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* M-Pesa flows */}
      <section style={{ padding: "72px 0", background: "white" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <div style={{ width: 18, height: 2, background: "#7C3AED", borderRadius: 2 }} />
                <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7C3AED" }}>M-Pesa Native</span>
              </div>
              <h2 style={{ fontFamily: "'Instrument Serif',serif", fontWeight: 400, fontSize: 34, color: "#0F1923", marginBottom: 16, letterSpacing: "-0.02em", lineHeight: 1.15 }}>Your comms, triggered by M-Pesa events.</h2>
              <p style={{ fontSize: 16, color: "#4A5568", lineHeight: 1.75, marginBottom: 24 }}>Connect ZuriMail to your M-Pesa integration once and unlock an entire library of triggered communication flows.</p>
              {[
                { trigger: "Payment received", action: "Send branded receipt + thank-you email within 3 seconds", tc: "#059669", ac: "#7C3AED" },
                { trigger: "Invoice overdue", action: "Auto SMS reminder sequence with payment link", tc: "#059669", ac: "#7C3AED" },
                { trigger: "First purchase", action: "Onboarding email journey to drive retention", tc: "#059669", ac: "#7C3AED" },
                { trigger: "Cart abandoned", action: "Smart recovery sequence with M-Pesa pay link", tc: "#059669", ac: "#7C3AED" },
              ].map(({ trigger, action, tc, ac }) => (
                <div key={trigger} style={{ display: "flex", gap: 14, marginBottom: 14, padding: "14px 18px", background: "#F4F6F8", border: "1px solid #E5E8ED", borderRadius: 12 }}>
                  <div style={{ flexShrink: 0 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", padding: "3px 8px", borderRadius: 999, background: `${tc}12`, color: tc, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>TRIGGER</span>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#0F1923", marginTop: 5 }}>{trigger}</div>
                  </div>
                  <div style={{ width: 1, background: "#E5E8ED", flexShrink: 0 }} />
                  <div style={{ flexShrink: 0, minWidth: 0 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", padding: "3px 8px", borderRadius: 999, background: `${ac}10`, color: ac, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>ACTION</span>
                    <div style={{ fontSize: 13, color: "#4A5568", marginTop: 5 }}>{action}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats mockup */}
            <div style={{ background: "#FAFBFC", border: "1px solid rgba(124,58,237,0.18)", borderRadius: 22, padding: "32px" }}>
              <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 20, color: "#0F1923", marginBottom: 6 }}>ZuriMail Dashboard</div>
              <div style={{ fontSize: 13, color: "#8B96A3", marginBottom: 28 }}>Your M-Pesa-native MarTech platform</div>
              {[
                { label: "Emails delivered this month", value: "—", color: "#7C3AED" },
                { label: "SMS sent", value: "—", color: "#00A2FF" },
                { label: "M-Pesa receipts auto-sent", value: "—", color: "#059669" },
                { label: "Average open rate", value: "—", color: "#D97706" },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 0", borderBottom: "1px solid #E5E8ED" }}>
                  <span style={{ fontSize: 14, color: "#4A5568" }}>{label}</span>
                  <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 16, color }}>{value}</span>
                </div>
              ))}
              <div style={{ marginTop: 22, padding: "13px 18px", background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 10, textAlign: "center" }}>
                <div style={{ fontSize: 12, color: "#7C3AED", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, letterSpacing: "0.06em" }}>EARLY ACCESS — Join the waitlist</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: "72px 0", background: "#FAFBFC" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Instrument Serif',serif", fontWeight: 400, fontSize: 36, color: "#0F1923", marginBottom: 10, letterSpacing: "-0.02em" }}>Pricing for Kenyan budgets.</h2>
            <p style={{ fontSize: 16, color: "#8B96A3" }}>All plans include DPA compliance tooling. KES pricing launching soon.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {plans.map(plan => (
              <div key={plan.name} style={{ background: "white", border: `1.5px solid ${plan.highlight ? "#7C3AED" : "#E5E8ED"}`, borderRadius: 22, padding: "32px", position: "relative", boxShadow: plan.highlight ? "0 8px 32px rgba(124,58,237,0.12)" : "0 1px 6px rgba(15,25,35,0.05)" }}>
                {plan.highlight && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#7C3AED", color: "white", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.08em", padding: "4px 16px", borderRadius: 999 }}>MOST POPULAR</div>}
                <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 21, color: "#0F1923", marginBottom: 6 }}>{plan.name}</h3>
                <div style={{ fontFamily: "'Instrument Serif',serif", fontSize: 32, color: plan.highlight ? "#7C3AED" : "#0F1923", marginBottom: 24 }}>{plan.price}</div>
                <ul style={{ listStyle: "none", margin: "0 0 28px", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <CheckCircle2 size={14} style={{ color: "#7C3AED", flexShrink: 0 }} />
                      <span style={{ fontSize: 14, color: "#4A5568" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" style={{ display: "block", textAlign: "center", padding: "12px 24px", borderRadius: 999, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 14, textDecoration: "none", background: plan.highlight ? "#7C3AED" : "white", color: plan.highlight ? "white" : "#7C3AED", border: `1.5px solid ${plan.highlight ? "#7C3AED" : "rgba(124,58,237,0.35)"}` }}>
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
          <h2 style={{ fontFamily: "'Instrument Serif',serif", fontWeight: 400, fontSize: 36, color: "#0F1923", textAlign: "center", marginBottom: 48, letterSpacing: "-0.02em" }}>Questions answered.</h2>
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
