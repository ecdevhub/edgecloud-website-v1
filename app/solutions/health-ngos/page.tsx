import Link from "next/link";
import { ArrowRight } from "lucide-react";
export default function SolutionPage() {
  return (
    <section style={{ paddingTop: 120, paddingBottom: 96, background: "var(--color-bg)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 52, color: "#F0F4FF", marginBottom: 20 }}>Solution Details</h1>
        <p style={{ fontSize: 18, color: "rgba(240,244,255,0.6)", marginBottom: 36 }}>Full content for this solution is coming soon. Talk to our team to learn how we serve this sector.</p>
        <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#00A2FF", color: "white", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15, padding: "14px 28px", borderRadius: 999, textDecoration: "none" }}>
          Talk to an Expert <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
