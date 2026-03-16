import { Shield, MapPin, Cpu, Lock } from "lucide-react";

const trustPillars = [
  { icon: Shield, color: "#00A2FF", title: "DPA Aligned", desc: "Every product ships with Data Protection Act alignment baked in — not bolted on." },
  { icon: MapPin, color: "#00C9A7", title: "Kenyan Data Centres", desc: "Your data stays in Nairobi. No cross-border transfers without explicit consent." },
  { icon: Cpu, color: "#22C55E", title: "M-Pesa Certified", desc: "Direct Safaricom integration, audited and production-tested for EAC markets." },
  { icon: Lock, color: "#8B5CF6", title: "Privacy by Design", desc: "GDPR-aware architecture — a high bar that makes us ready for future regulations." },
];

const testimonialPlaceholders = [
  { name: "Wanjiru N.", role: "CTO, Nairobi Fintech", text: "EdgeCloud understood our SACCO data needs immediately. Migration was seamless, and M-Pesa integration took days, not months." },
  { name: "David O.", role: "Founder, E-commerce Startup", text: "Finally a hosting partner that speaks both tech and Swahili. Our WooCommerce store went live compliant and fast." },
  { name: "Amina K.", role: "Engineering Lead, NGO", text: "The DPA-by-default approach saved us weeks of compliance work. Support team is genuinely Nairobi-based." },
];

export default function TrustSection() {
  return (
    <section style={{ padding: "96px 0", background: "#FAFBFC" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        {/* Compliance pillars */}
        <div style={{ marginBottom: 72 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ width: 20, height: 2, background: "#00A2FF", borderRadius: 2 }} />
            <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#00A2FF" }}>Trust & Compliance</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: "#0F1923", marginBottom: 40, maxWidth: 480 }}>
            Compliance isn't a feature.<br />
            <span style={{ background: "linear-gradient(135deg, #00A2FF, #00C9A7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              It's our default.
            </span>
          </h2>

          <div style={{ display: "grid", gap: 16 }} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {trustPillars.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} style={{
                  background: "white",
                  border: `1px solid ${p.color}25`,
                  borderRadius: 16, padding: "24px",
                  position: "relative", overflow: "hidden",
                }}>
                  <div style={{
                    position: "absolute", top: -40, right: -40, width: 100, height: 100,
                    background: `radial-gradient(circle, ${p.color}15, transparent 70%)`,
                    pointerEvents: "none",
                  }} />
                  <div style={{
                    width: 40, height: 40,
                    background: `${p.color}15`, border: `1px solid ${p.color}30`,
                    borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 14,
                  }}>
                    <Icon size={18} style={{ color: p.color }} />
                  </div>
                  <h4 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 15, color: "#0F1923", marginBottom: 8 }}>{p.title}</h4>
                  <p style={{ fontSize: 13, color: "#8B96A3", lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 18, color: "#8B96A3", marginBottom: 24, letterSpacing: "0.02em" }}>
            What clients say — <span style={{ color: "#00A2FF" }}>real words, coming soon.</span>
          </h3>
          <div style={{ display: "grid", gap: 20 }} className="grid-cols-1 md:grid-cols-3">
            {testimonialPlaceholders.map((t) => (
              <div key={t.name} style={{
                background: "white",
                border: "1px solid #E5E8ED",
                borderRadius: 18, padding: "28px",
                position: "relative",
              }}>
                {/* Quote mark */}
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 48, color: "#00A2FF", opacity: 0.3, lineHeight: 1, marginBottom: 8 }}>"</div>
                <p style={{ fontSize: 15, color: "#4A5568", lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>{t.text}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "linear-gradient(135deg, #00A2FF, #00C9A7)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 13, color: "white",
                  }}>{t.name[0]}</div>
                  <div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 14, color: "#0F1923" }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "rgba(240,244,255,0.45)" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
