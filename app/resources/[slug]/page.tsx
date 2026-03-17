import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Eye, Tag } from "lucide-react";
import { getPostBySlug, getAllPublishedSlugs, getRelatedPosts } from "@/lib/blog";
import ViewTracker from "@/components/blog/ViewTracker";
import ShareButtons from "@/components/blog/ShareButtons";
import TableOfContents from "@/components/blog/TableOfContents";

export async function generateStaticParams() {
  const slugs = await getAllPublishedSlugs().catch((_e: unknown) => [] as any);
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch((_e: unknown) => null as any);
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
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && { images: [image] }),
    },
  };
}

export const revalidate = 300;

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch((_e: unknown) => null as any);
  if (!post) notFound();

  const related = await getRelatedPosts(post.id, post.category?.id ?? null, 3).catch(
    (_e: unknown) => [] as any,
  );

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { "@type": "Person", name: post.author.name },
    publisher: {
      "@type": "Organization",
      name: "EdgeCloud Technologies",
      url: "https://edgecloud.co.ke",
    },
    url: `https://edgecloud.co.ke/resources/${post.slug}`,
    ...(post.featuredImage && { image: post.featuredImage }),
    keywords: post.tags.map((t: { name: string }) => t.name).join(", "),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://edgecloud.co.ke" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Resources",
        item: "https://edgecloud.co.ke/resources",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://edgecloud.co.ke/resources/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <ViewTracker slug={post.slug} />

      {/* ════════════════════════════════════════
          ARTICLE HERO — replaces raw image banner
          Dark gradient overlay on featured image,
          with header content on top. Clean & readable.
      ════════════════════════════════════════ */}
      <div
        className="relative w-full mt-[68px] overflow-hidden"
        style={{ minHeight: post.featuredImage ? 480 : "auto" }}
      >
        {/* Background image with overlay */}
        {post.featuredImage && (
          <>
            {/* Image */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${post.featuredImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "brightness(1.15) contrast(0.85) saturate(0.9)",
              }}
            />

            {/* Base wash */}
            <div className="absolute inset-0 bg-white/80" />

            {/* Text safety gradient */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.9) 60%, rgba(255,255,255,0.98) 100%)",
              }}
            />
          </>
        )}

        {/* Hero content */}
        <div
          className={`relative z-10 max-w-3xl mx-auto px-6 md:px-8 ${
            post.featuredImage ? "pt-16 pb-14" : "pt-14 pb-10 bg-white border-b border-wire-200"
          }`}
        >
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8" aria-label="Breadcrumb">
            <Link
              href="/resources"
              className={`inline-flex items-center gap-1.5 font-display text-xs font-bold tracking-wide uppercase transition-colors duration-150 ${
                post.featuredImage
                  ? "text-white/60 hover:text-white"
                  : "text-ink-300 hover:text-brand"
              }`}
            >
              <ArrowLeft size={13} strokeWidth={2.5} />
              Resources
            </Link>
            {post.category && (
              <>
                <span className={post.featuredImage ? "text-white/30" : "text-wire-300"}>/</span>
                <Link
                  href={`/resources?category=${post.category.slug}`}
                  className="font-display text-xs font-bold tracking-wide uppercase transition-colors duration-150"
                  style={{
                    color: post.featuredImage
                      ? "rgba(255,255,255,0.75)"
                      : (post.category.color ?? "#00A2FF"),
                  }}
                >
                  {post.category.name}
                </Link>
              </>
            )}
          </nav>

          {/* Category pill */}
          {post.category && (
            <span
              className="inline-block font-display text-2xs font-bold tracking-widest uppercase px-3 py-1 mb-5 border"
              style={{
                color: post.featuredImage ? "#fff" : (post.category.color ?? "#00A2FF"),
                borderColor: post.featuredImage
                  ? "rgba(255,255,255,0.25)"
                  : (post.category.color ?? "#00A2FF"),
                background: post.featuredImage ? "rgba(255,255,255,0.08)" : "transparent",
              }}
            >
              {post.category.name}
            </span>
          )}

          {/* Title */}
          <h1
            className={`font-serif text-3xl md:text-4xl lg:text-[2.75rem] leading-tight mb-5 ${
              post.featuredImage ? "text-white" : "text-ink-900"
            }`}
            style={{ letterSpacing: "-0.025em" }}
          >
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p
              className={`font-sans text-lg leading-relaxed mb-8 border-l-2 border-brand pl-5 ${
                post.featuredImage ? "text-white/70" : "text-ink-500"
              }`}
            >
              {post.excerpt}
            </p>
          )}

          {/* Meta row */}
          <div
            className={`flex flex-wrap items-center justify-between gap-4 pt-6 border-t ${
              post.featuredImage ? "border-white/15" : "border-wire-200"
            }`}
          >
            <div className="flex flex-wrap items-center gap-5">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 shrink-0 flex items-center justify-center text-white font-display font-bold text-sm"
                  style={{ background: "linear-gradient(135deg, #00A2FF 0%, #00C9A7 100%)" }}
                >
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <p
                    className={`font-display font-bold text-sm leading-none mb-0.5 ${
                      post.featuredImage ? "text-white" : "text-ink-900"
                    }`}
                  >
                    {post.author.name}
                  </p>
                  <p
                    className={`font-sans text-xs ${
                      post.featuredImage ? "text-white/50" : "text-ink-300"
                    }`}
                  >
                    EdgeCloud Team
                  </p>
                </div>
              </div>

              <span
                className={`hidden md:block w-px h-6 ${
                  post.featuredImage ? "bg-white/20" : "bg-wire-200"
                }`}
              />

              {/* Stats */}
              <div
                className={`flex items-center gap-4 font-sans text-xs ${
                  post.featuredImage ? "text-white/55" : "text-ink-300"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Clock size={12} strokeWidth={2} />
                  {post.readingTime ?? 5} min read
                </span>
                <span
                  className={`w-px h-3 ${post.featuredImage ? "bg-white/20" : "bg-wire-200"}`}
                />
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} strokeWidth={2} />
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString("en-KE", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : ""}
                </span>
                <span
                  className={`w-px h-3 ${post.featuredImage ? "bg-white/20" : "bg-wire-200"}`}
                />
                <span className="flex items-center gap-1.5">
                  <Eye size={12} strokeWidth={2} />
                  {(post.viewCount + 1).toLocaleString()} views
                </span>
              </div>
            </div>

            <ShareButtons title={post.title} slug={post.slug} />
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          ARTICLE BODY — 3-column layout:
          [sticky TOC left] [content center] [empty right gutter]
          TOC uses position:sticky + overflow-y:auto so it
          scrolls independently and tracks the reader.
      ════════════════════════════════════════ */}
      <article className="bg-white pb-24">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 lg:px-14">
          <div className="flex gap-12 xl:gap-16 items-start pt-14">
            {/* ── LEFT: Sticky TOC ──────────────────────────── */}
            {/*
              The TOC column is hidden below xl.
              position:sticky + top offset so it hugs the viewport
              as the user scrolls. max-height + overflow-y:auto lets
              it scroll internally on very long tables of contents.
            */}
            <aside
              className="hidden xl:block shrink-0 w-60"
              style={{
                position: "sticky",
                top: "96px" /* clears the fixed navbar */,
                maxHeight: "calc(100vh - 120px)",
                overflowY: "auto",
                scrollbarWidth: "thin",
              }}
            >
              {/* TOC label */}
              <p className="font-display text-2xs font-bold tracking-widest uppercase text-ink-300 mb-4 flex items-center gap-2">
                <span className="w-4 h-px bg-brand inline-block" />
                On this page
              </p>

              {/* TableOfContents renders the actual <nav> with anchor links.
                  The component should add an `id` to each heading in the
                  contentHtml, and use IntersectionObserver to highlight
                  the active heading — that's what makes it "scroll with reader". */}
              <TableOfContents contentHtml={post.contentHtml ?? ""} />
            </aside>

            {/* ── CENTER: Article content ───────────────────── */}
            <div className="flex-1 min-w-0 max-w-[72ch]">
              {/* ── prose-article styles fix bullet points ─── */}
              <div
                className="prose prose-article"
                dangerouslySetInnerHTML={{
                  __html: post.contentHtml || "<p>Content coming soon.</p>",
                }}
              />

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mt-14 pt-8 border-t border-wire-200 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 font-display text-2xs font-bold tracking-widest uppercase text-ink-300 mr-1">
                    <Tag size={12} strokeWidth={2} />
                    Tags
                  </span>
                  {post.tags.map((tag: { id: number; name: string; slug: string }) => (
                    <Link
                      key={tag.slug}
                      href={`/resources?tag=${tag.slug}`}
                      className="font-display text-xs font-bold tracking-wide uppercase px-3 py-1.5 border border-wire-300 text-ink-500 bg-wire-50 hover:border-brand hover:text-brand transition-colors duration-150"
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Author card */}
              <div className="border border-wire-300 bg-wire-50 p-7 flex items-start gap-5 mt-14">
                <div
                  className="w-12 h-12 shrink-0 flex items-center justify-center text-white font-display font-bold text-lg"
                  style={{ background: "linear-gradient(135deg, #00A2FF 0%, #00C9A7 100%)" }}
                >
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <p className="font-display font-bold text-sm text-ink-900 mb-0.5">
                    {post.author.name}
                  </p>
                  <p className="font-sans text-xs text-ink-300 mb-3">
                    EdgeCloud Technologies · Nairobi
                  </p>
                  {post.author.bio && (
                    <p className="font-sans text-sm text-ink-500 leading-relaxed">
                      {post.author.bio}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ── RIGHT: narrow gutter (balances layout) ────── */}
            <div className="hidden xl:block shrink-0 w-14" />
          </div>
        </div>
      </article>

      {/* ════════════════════════════════════════
          RELATED POSTS
      ════════════════════════════════════════ */}
      {related.length > 0 && (
        <section className="bg-wire-50 border-t border-wire-300 py-20">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-14">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <span className="w-6 h-px bg-brand" />
                <span className="font-display text-xs font-bold tracking-widest uppercase text-brand">
                  More from the blog
                </span>
              </div>
              <Link
                href="/resources"
                className="hidden md:inline-flex items-center gap-1.5 font-display text-xs font-bold tracking-wide uppercase text-ink-300 hover:text-brand transition-colors duration-150"
              >
                All articles <ArrowLeft size={12} className="rotate-180" strokeWidth={2.5} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-wire-300">
              {related.map((r: any) => (
                <article
                  key={r.slug}
                  className="bg-white group flex flex-col hover:bg-wire-50 transition-colors duration-150"
                >
                  <div className="h-0.5" style={{ background: r.category?.color ?? "#00A2FF" }} />
                  <div className="flex flex-col flex-1 p-7">
                    {r.category && (
                      <p
                        className="font-display text-2xs font-bold tracking-widest uppercase mb-3"
                        style={{ color: r.category.color ?? "#00A2FF" }}
                      >
                        {r.category.name}
                      </p>
                    )}
                    <h3 className="font-display font-bold text-md text-ink-900 leading-snug mb-4 group-hover:text-brand transition-colors duration-150 flex-1">
                      <Link href={`/resources/${r.slug}`} className="no-underline">
                        {r.title}
                      </Link>
                    </h3>
                    <div className="flex items-center justify-between pt-5 border-t border-wire-200">
                      <span className="font-sans text-xs text-ink-300">
                        {r.readingTime ?? 5} min ·{" "}
                        {r.publishedAt
                          ? new Date(r.publishedAt).toLocaleDateString("en-KE", {
                              month: "short",
                              year: "numeric",
                            })
                          : ""}
                      </span>
                      <Link
                        href={`/resources/${r.slug}`}
                        className="inline-flex items-center gap-1 font-display text-xs font-bold tracking-wide uppercase text-brand hover:gap-2 transition-all duration-150"
                      >
                        Read <ArrowLeft size={11} className="rotate-180" strokeWidth={2.5} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════
          BOTTOM CTA
      ════════════════════════════════════════ */}
      <section className="bg-navy-900 py-20">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-14">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 border border-brand/25 bg-brand/10 px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 bg-brand" />
              <span className="font-display text-2xs font-bold tracking-widest uppercase text-brand">
                Want to go deeper?
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight mb-5">
              Talk to the team behind
              <br />
              the content.
            </h2>
            <p className="font-sans text-md text-white/55 leading-relaxed mb-8 max-w-md mx-auto">
              Every article we write reflects real engagements. If something resonated, let&apos;s
              discuss how it applies to your specific context.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-brand text-white font-display font-bold text-sm px-7 py-3.5 transition-all duration-150 hover:-translate-y-px"
                style={{ boxShadow: "4px 4px 0px 0px rgba(0,162,255,0.35)" }}
              >
                Book a Strategy Call
                <ArrowLeft size={15} className="rotate-180" strokeWidth={2.5} />
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 bg-transparent text-white/80 font-display font-bold text-sm px-7 py-3.5 border border-white/15 hover:border-white/35 hover:text-white transition-all duration-150"
              >
                Browse all articles
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
