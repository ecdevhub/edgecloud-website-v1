"use client";
import Link from "next/link";
import { Shield, MapPin, Phone, Mail, Twitter, Linkedin, Github } from "lucide-react";

const cols = {
  Products: [
    { label: "Eza Cloud", href: "/products/eza-cloud" },
    { label: "ZuriMail", href: "/products/zurimail" },
    { label: "Future Stack", href: "/products" },
  ],
  Solutions: [
    { label: "SMEs & E-commerce", href: "/solutions/smes-ecommerce" },
    { label: "FinTech & SACCOs", href: "/solutions/fintech-saccos" },
    { label: "Health & NGOs", href: "/solutions/health-ngos" },
    { label: "Agencies & Devs", href: "/solutions/agencies-developers" },
  ],
  Services: [
    { label: "Digital Strategy", href: "/services" },
    { label: "Cloud & Kubernetes", href: "/services" },
    { label: "E-commerce Build", href: "/services" },
    { label: "MarTech & CRM", href: "/services" },
    { label: "Managed Support", href: "/services" },
  ],
  Company: [
    { label: "About Us", href: "/company" },
    { label: "Resources", href: "/resources" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Data Processing", href: "/data-processing-agreement" },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: "#0F1923", color: "white" }}>
      {/* Top accent */}
      <div style={{ height: 3, background: "linear-gradient(90deg, #00A2FF 0%, #00C9A7 50%, #7C3AED 100%)" }} />

      <style>{`
        .f-link { font-size:14px; color:rgba(255,255,255,0.5); text-decoration:none; transition:color 0.15s; }
        .f-link:hover { color:white; }
        .f-social { display:flex; align-items:center; justify-content:center; width:34px; height:34px; border-radius:8px; background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.1); color:rgba(255,255,255,0.55); text-decoration:none; transition:all 0.15s; }
        .f-social:hover { background:rgba(0,162,255,0.2); color:#00A2FF; border-color:rgba(0,162,255,0.3); }
      `}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 32px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 48, marginBottom: 56 }}
             className="lg:grid-cols-[280px_1fr_1fr_1fr_1fr]">

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg, #00A2FF, #00C9A7)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 14, color: "white" }}>EC</div>
              <div>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 15, color: "white" }}>EdgeCloud</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 9.5, fontWeight: 500, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Technologies</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: 260, marginBottom: 20 }}>
              One Stack. Zero Pain. Full Trust.<br />Kenya's digital enablement cloud agency — DPA-compliant by default.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 20 }}>
              {[{ icon: <MapPin size={12} />, text: "Nairobi, Kenya" }, { icon: <Phone size={12} />, text: "+254 XXX XXX XXX" }, { icon: <Mail size={12} />, text: "hello@edgecloudtech.co.ke" }].map(({ icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
                  <span style={{ color: "#00A2FF" }}>{icon}</span>{text}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <a href="#" className="f-social"><Twitter size={14} /></a>
              <a href="#" className="f-social"><Linkedin size={14} /></a>
              <a href="#" className="f-social"><Github size={14} /></a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(cols).map(([title, links]) => (
            <div key={title}>
              <h4 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.9)", marginBottom: 16 }}>{title}</h4>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 11 }}>
                {links.map((l) => <li key={l.label}><Link href={l.href} className="f-link">{l.label}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "20px 0", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {[{ label: "DPA Aligned", c: "#00A2FF" }, { label: "Kenya Data Residency", c: "#00C9A7" }, { label: "M-Pesa Certified", c: "#22C55E" }, { label: "GDPR-aware", c: "#7C3AED" }].map(({ label, c }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 999, border: `1px solid ${c}30`, background: `${c}12` }}>
                <Shield size={10} style={{ color: c }} />
                <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.06em", color: c, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{label}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", margin: 0 }}>© {new Date().getFullYear()} EdgeCloud Technologies Ltd.</p>
        </div>
      </div>
    </footer>
  );
}
