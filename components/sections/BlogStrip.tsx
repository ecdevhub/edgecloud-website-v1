"use client";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

const articles = [
  {
    slug: "dpa-compliance-cloud-kenya",
    tag: "Compliance",
    tagColor: "#00A2FF",
    title: "Kenya's DPA and Your Cloud Infrastructure: A Practical Guide for SMEs",
    excerpt: "What the Data Protection Act 2019 actually means for your cloud setup — and how to build compliant from day one without slowing your product down.",
    readTime: "7 min read",
    date: "Feb 2025",
  },
  {
    slug: "mpesa-woocommerce-integration",
    tag: "Engineering",
    tagColor: "#00C9A7",
    title: "The Right Way to Integrate M-Pesa STK Push in WooCommerce (Without Losing Your Sanity)",
    excerpt: "Sandbox gotchas, callback URL patterns, and the reconciliation logic that nobody talks about — from engineers who've done it across dozens of projects.",
    readTime: "11 min read",
    date: "Jan 2025",
  },
  {
    slug: "kubernetes-kenya-small-team",
    tag: "Cloud",
    tagColor: "#8B5CF6",
    title: "Do You Actually Need Kubernetes? An Honest Answer for Kenyan Startups",
    excerpt: "Managed Kubernetes vs. simpler orchestration — a framework for making the right infrastructure decision at each stage of your East African startup.",
    readTime: "9 min read",
    date: "Dec 2024",
  },
];

export default function BlogStrip() {
  return (
    <section style={{ padding: "80px 0", background: "#F4F6F8" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ width: 20, height: 2, background: "#00A2FF", borderRadius: 2 }} />
              <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#00A2FF" }}>From the Blog</span>
            </div>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 28, color: "#0F1923", margin: 0 }}>Practical thinking for builders.</h2>
          </div>
          <Link href="/resources" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, fontWeight: 600, color: "#00A2FF", textDecoration: "none" }}>
            All articles <ArrowRight size={14} />
          </Link>
        </div>

        <div style={{ display: "grid", gap: 20 }} className="grid-cols-1 md:grid-cols-3">
          {articles.map((a) => (
            <Link key={a.slug} href={`/resources/${a.slug}`} style={{
              display: "flex", flexDirection: "column",
              background: "white",
              border: "1px solid #E5E8ED",
              borderRadius: 18, padding: "28px",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = `${a.tagColor}40`;
              (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}>
              <div style={{ marginBottom: 16 }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", padding: "4px 10px", borderRadius: 999,
                  background: `${a.tagColor}15`, color: a.tagColor, fontFamily: "'Plus Jakarta Sans',sans-serif",
                }}>{a.tag}</span>
              </div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 17, color: "#0F1923", lineHeight: 1.3, marginBottom: 12, flex: 1 }}>{a.title}</h3>
              <p style={{ fontSize: 14, color: "#8B96A3", lineHeight: 1.65, marginBottom: 20 }}>{a.excerpt}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: "#8B96A3" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={11} /> {a.readTime}</span>
                <span>•</span>
                <span>{a.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
