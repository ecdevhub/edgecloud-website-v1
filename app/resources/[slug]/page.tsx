import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Eye, Tag, Share2 } from "lucide-react";
import { getPostBySlug, getAllPublishedSlugs, getRelatedPosts } from "@/lib/blog";
import ViewTracker from "@/components/blog/ViewTracker";
import ShareButtons from "@/components/blog/ShareButtons";

export async function generateStaticParams() {
  const slugs = await getAllPublishedSlugs().catch((_e: unknown) => [] as any);
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug).catch((_e: unknown) => null as any);
  if (!post) return { title: "Article not found" };

  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt || "";
  const image = post.ogImage || post.featuredImage || undefined;

  return {
    title,
    description,
    robots: post.noIndex ? "noindex" : undefined,
    alternates: post.canonicalUrl ? { canonical: post.canonicalUrl } : undefined,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      authors: [post.author.name],
      tags: post.tags.map((t: { name: string }) => t.name),
      ...(image && { images: [image] }),
    },
    twitter: { card: "summary_large_image", title, description, ...(image && { images: [image] }) },
  };
}

export const revalidate = 300;

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug).catch((_e: unknown) => null as any);
  if (!post) notFound();

  const related = await getRelatedPosts(post.id, post.category?.id ?? null, 3).catch((_e: unknown) => [] as any);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { "@type": "Person", name: post.author.name },
    publisher: { "@type": "Organization", name: "EdgeCloud Technologies", url: "https://edgecloudtech.co.ke" },
    url: `https://edgecloudtech.co.ke/resources/${post.slug}`,
    ...(post.featuredImage && { image: post.featuredImage }),
    keywords: post.tags.map((t: { name: string }) => t.name).join(", "),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://edgecloudtech.co.ke" },
      { "@type": "ListItem", position: 2, name: "Resources", item: "https://edgecloudtech.co.ke/resources" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://edgecloudtech.co.ke/resources/${post.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ViewTracker slug={post.slug} />

      {/* Featured image */}
      {post.featuredImage && (
        <div style={{ height: 420, background: `url(${post.featuredImage}) center/cover no-repeat`, marginTop: 68 }} />
      )}

      <article style={{ paddingTop: post.featuredImage ? 0 : 100, paddingBottom: 96, background: "white" }}>
        {/* Header */}
        <div style={{ maxWidth: 780, margin: "0 auto", padding: post.featuredImage ? "48px 32px 0" : "0 32px" }}>
          {/* Breadcrumb */}
          <nav style={{ marginBottom: 28, display: "flex", alignItems: "center", gap: 8 }}>
            <Link href="/resources" style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 500, color: "#8B96A3", textDecoration: "none" }}>
              <ArrowLeft size={13} /> Resources
            </Link>
            {post.category && (
              <>
                <span style={{ color: "#CDD2D9" }}>/</span>
                <Link href={`/resources?category=${post.category.slug}`} style={{ fontSize: 13, fontWeight: 500, color: post.category.color ?? "#00A2FF", textDecoration: "none" }}>{post.category.name}</Link>
              </>
            )}
          </nav>

          {/* Title */}
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, lineHeight: 1.15, letterSpacing: "-0.02em", color: "#0F1923", marginBottom: 20 }}>
            {post.title}
          </h1>

          {post.excerpt && (
            <p style={{ fontSize: 19, color: "#4A5568", lineHeight: 1.65, fontWeight: 400, marginBottom: 28, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{post.excerpt}</p>
          )}

          {/* Meta bar */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20, paddingBottom: 28, borderBottom: "1px solid #E5E8ED", marginBottom: 48 }}>
            {/* Author */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #00A2FF, #00C9A7)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15, color: "white", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                {post.author.name.charAt(0)}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#0F1923" }}>{post.author.name}</div>
                <div style={{ fontSize: 12, color: "#8B96A3" }}>EdgeCloud Team</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 13, color: "#8B96A3" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Clock size={13} /> {post.readingTime ?? 5} min read</span>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Calendar size={13} /> {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-KE", { day: "numeric", month: "long", year: "numeric" }) : ""}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Eye size={13} /> {(post.viewCount + 1).toLocaleString()} views</span>
            </div>

            <ShareButtons title={post.title} slug={post.slug} />
          </div>
        </div>

        {/* Article content */}
        <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 32px" }}>
          <div className="prose"
            dangerouslySetInnerHTML={{ __html: post.contentHtml || "<p>Content coming soon.</p>" }}
          />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid #E5E8ED", display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 600, color: "#8B96A3" }}><Tag size={13} /> Tags:</span>
              {post.tags.map((tag: { id: number; name: string; slug: string }) => (
                <Link key={tag.slug} href={`/resources?tag=${tag.slug}`} style={{ padding: "5px 12px", borderRadius: 999, background: "#F4F6F8", border: "1.5px solid #E5E8ED", fontSize: 13, fontWeight: 500, color: "#4A5568", textDecoration: "none" }}>
                  {tag.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div style={{ maxWidth: 1280, margin: "72px auto 0", padding: "0 40px" }}>
            <div style={{ borderTop: "1px solid #E5E8ED", paddingTop: 56 }}>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 20, color: "#0F1923", marginBottom: 32 }}>More from the blog</h2>
              <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
                {related.map((r: any) => (
                  <Link key={r.slug} href={`/resources/${r.slug}`} style={{ display: "flex", flexDirection: "column", background: "white", border: "1px solid #E5E8ED", borderRadius: 14, padding: "24px", textDecoration: "none", transition: "all 0.2s" }}>
                    <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 16, lineHeight: 1.4, color: "#0F1923", marginBottom: 8 }}>{r.title}</h3>
                    <p style={{ fontSize: 13, color: "#8B96A3", marginTop: "auto" }}>{r.readingTime ?? 5} min · {r.publishedAt ? new Date(r.publishedAt).toLocaleDateString("en-KE", { month: "short", year: "numeric" }) : ""}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </article>
    </>
  );
}
