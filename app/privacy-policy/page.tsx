import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy | EdgeCloud Technologies", description: "EdgeCloud Technologies Privacy Policy." };
export default function LegalPage() {
  return (
    <section style={{ paddingTop: 120, paddingBottom: 96, background: "var(--color-bg)" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
        <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 42, color: "#F0F4FF", marginBottom: 20 }}>Privacy Policy</h1>
        <p style={{ fontSize: 16, color: "rgba(240,244,255,0.5)", marginBottom: 32 }}>Last updated: January 2025</p>
        <div style={{ background: "var(--color-surface)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "32px" }}>
          <p style={{ fontSize: 16, color: "rgba(240,244,255,0.65)", lineHeight: 1.75 }}>This is a placeholder for the Privacy Policy. In production, this page will contain full legal content reviewed by a certified DPO and legal counsel familiar with Kenya's Data Protection Act 2019, the Computer Misuse and Cybercrimes Act, and applicable EAC regulations.</p>
          <p style={{ fontSize: 16, color: "rgba(240,244,255,0.65)", lineHeight: 1.75, marginTop: 16 }}>Contact us at <strong style={{ color: "#00A2FF" }}>legal@edgecloudtech.co.ke</strong> for enquiries.</p>
        </div>
      </div>
    </section>
  );
}
