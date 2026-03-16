import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Calendar, Search } from "lucide-react";
import { getPublishedPosts, getCategories } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Resources – Blog & Guides | EdgeCloud Technologies",
  description: "Engineering guides, compliance explainers, and EAC market insights written for Kenya's digital builders.",
  openGraph: {
    title: "EdgeCloud Resources — Practical thinking for builders",
    description: "DPA compliance, M-Pesa engineering, Kubernetes for Kenya, and more.",
  },
};

export const revalidate = 60; // ISR: refresh every 60s

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: { category?: string; tag?: string; search?: string; page?: string };
}) {
  const page = Number(searchParams.page || 1);
  const { posts, total, pages } = await getPublishedPosts({
    page,
    perPage: 9,
    categorySlug: searchParams.category,
    tagSlug: searchParams.tag,
    search: searchParams.search,
  }).catch((_e: unknown) => ({ posts: [] as any[], total: 0, pages: 0 }));

  const allCategories = await getCategories().catch((_e: unknown) => [] as any[]);

  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: 104, paddingBottom: 64, background: "white", borderBottom: "1px solid #E5E8ED" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ maxWidth: 680 }}>
            <div className="section-eyebrow">Resources</div>
            <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(36px,5vw,52px)", fontWeight: 400, color: "#0F1923", marginBottom: 16, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Practical thinking<br />for Kenya's builders.
            </h1>
            <p style={{ fontSize: 18, color: "#4A5568", lineHeight: 1.7, maxWidth: 500 }}>
              Engineering deep-dives, DPA compliance guides, and East African market insights — written by our Nairobi team.
            </p>
          </div>

          {/* Search + filter bar */}
          <div style={{ marginTop: 36, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
            <form method="GET" style={{ display: "flex", alignItems: "center", gap: 0, background: "#F4F6F8", border: "1.5px solid #E5E8ED", borderRadius: 10, overflow: "hidden", maxWidth: 340, width: "100%" }}>
              <span style={{ padding: "0 12px", color: "#8B96A3" }}><Search size={15} /></span>
              <input name="search" defaultValue={searchParams.search || ""} placeholder="Search articles..." style={{ flex: 1, border: "none", background: "transparent", padding: "10px 8px 10px 0", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, color: "#0F1923", outline: "none" }} />
            </form>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Link href="/resources" style={{ padding: "7px 14px", borderRadius: 999, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, fontSize: 13, textDecoration: "none", background: !searchParams.category ? "#00A2FF" : "#F4F6F8", color: !searchParams.category ? "white" : "#4A5568", border: "1.5px solid", borderColor: !searchParams.category ? "#00A2FF" : "#E5E8ED" }}>All</Link>
              {allCategories.map((cat) => (
                <Link key={cat.slug} href={`/resources?category=${cat.slug}`} style={{ padding: "7px 14px", borderRadius: 999, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, fontSize: 13, textDecoration: "none", background: searchParams.category === cat.slug ? cat.color ?? "#00A2FF" : "#F4F6F8", color: searchParams.category === cat.slug ? "white" : "#4A5568", border: "1.5px solid", borderColor: searchParams.category === cat.slug ? (cat.color ?? "#00A2FF") : "#E5E8ED" }}>
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Post grid */}
      <section style={{ padding: "64px 0 96px", background: "#FAFBFC" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          {posts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <p style={{ fontSize: 18, color: "#8B96A3" }}>No articles found{searchParams.search ? ` for "${searchParams.search}"` : ""}.</p>
              <Link href="/resources" style={{ color: "#00A2FF", fontWeight: 600, fontSize: 14 }}>Clear filters →</Link>
            </div>
          ) : (
            <>
              <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
                {posts.map((post, i) => (
                  <article key={post.id} style={{
                    background: "white", border: "1px solid #E5E8ED",
                    borderRadius: 16, overflow: "hidden",
                    boxShadow: "0 1px 4px rgba(15,25,35,0.06)",
                    transition: "all 0.22s ease",
                    display: "flex", flexDirection: "column",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(15,25,35,0.10)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(15,25,35,0.06)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                    {/* Featured image or gradient placeholder */}
                    {post.featuredImage ? (
                      <div style={{ height: 200, background: `url(${post.featuredImage}) center/cover no-repeat`, borderBottom: "1px solid #E5E8ED" }} />
                    ) : (
                      <div style={{ height: 6, background: post.category?.color ? `linear-gradient(90deg, ${post.category.color}, ${post.category.color}88)` : "linear-gradient(90deg, #00A2FF, #00C9A7)" }} />
                    )}

                    <div style={{ padding: "24px 28px 28px", display: "flex", flexDirection: "column", flex: 1 }}>
                      {post.category && (
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: post.category.color ?? "#00A2FF", marginBottom: 12 }}>
                          {post.category.name}
                        </span>
                      )}
                      <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 18, lineHeight: 1.35, color: "#0F1923", marginBottom: 10 }}>
                        <Link href={`/resources/${post.slug}`} style={{ textDecoration: "none", color: "inherit" }}>{post.title}</Link>
                      </h2>
                      {post.excerpt && (
                        <p style={{ fontSize: 14, color: "#4A5568", lineHeight: 1.65, flex: 1, marginBottom: 18, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" as any, overflow: "hidden" }}>{post.excerpt}</p>
                      )}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "#8B96A3" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={11} /> {post.readingTime ?? 5} min</span>
                          <span>·</span>
                          <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-KE", { month: "short", year: "numeric" }) : "Draft"}</span>
                        </div>
                        <Link href={`/resources/${post.slug}`} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, color: "#00A2FF", textDecoration: "none" }}>
                          Read <ArrowRight size={12} />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {pages > 1 && (
                <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 56 }}>
                  {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                    <Link key={p} href={`/resources?page=${p}${searchParams.category ? `&category=${searchParams.category}` : ""}`} style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, fontWeight: 600, fontSize: 14, textDecoration: "none", background: p === page ? "#00A2FF" : "white", color: p === page ? "white" : "#4A5568", border: "1.5px solid", borderColor: p === page ? "#00A2FF" : "#E5E8ED" }}>{p}</Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
