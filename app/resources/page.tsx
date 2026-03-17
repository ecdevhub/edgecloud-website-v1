import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Search, TrendingUp, BookOpen, Tag } from "lucide-react";
import { getPublishedPosts, getCategories, getAllTags } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Resources — Guides, Engineering & Compliance Insights | EdgeCloud Kenya",
  description:
    "Engineering deep-dives, DPA compliance guides, and East African market insights written by EdgeCloud's Nairobi team.",
  openGraph: {
    title: "EdgeCloud Resources — Practical thinking for Kenya's builders",
    description: "DPA compliance, M-Pesa engineering, Kubernetes for Kenya, and more.",
  },
};

export const revalidate = 60;

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    tag?: string;
    search?: string;
    page?: string;
  }>;
}) {
  const sp = await searchParams;
  const page = Number(sp.page || 1);

  const [{ posts, total, pages }, allCategories, allTags] = await Promise.all([
    getPublishedPosts({
      page,
      perPage: 9,
      categorySlug: sp.category,
      tagSlug: sp.tag,
      search: sp.search,
    }).catch(() => ({ posts: [] as any[], total: 0, pages: 0 })),
    getCategories().catch(() => [] as any[]),
    getAllTags().catch(() => [] as any[]),
  ]);

  const isFiltered = !!(sp.category || sp.tag || sp.search);

  // Separate featured posts from the rest
  const featuredPost = !isFiltered ? posts.find((p: any) => p.isFeatured) : null;
  const gridPosts = featuredPost ? posts.filter((p: any) => p.id !== featuredPost.id) : posts;

  return (
    <div className="min-h-screen bg-wire-50">
      {/* ── Compact header ── */}
      <section className="bg-white border-b border-wire-300 pt-26 pb-10">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-5 h-px bg-brand" />
                <span className="font-display text-xs font-bold tracking-widest uppercase text-brand">
                  Resources
                </span>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl text-ink-900 leading-tight">
                Practical thinking for Kenya&apos;s builders.
              </h1>
            </div>

            {/* Search */}
            <form
              method="GET"
              className="flex items-center gap-0 border border-wire-300 bg-wire-50 w-full md:w-72 shrink-0"
            >
              <span className="pl-4 pr-3 text-ink-300">
                <Search size={14} strokeWidth={2} />
              </span>
              <input
                name="search"
                defaultValue={sp.search ?? ""}
                placeholder="Search articles…"
                className="flex-1 bg-transparent py-2.5 pr-4 font-sans text-sm text-ink-900 placeholder-ink-100 outline-none"
              />
              {sp.category && <input type="hidden" name="category" value={sp.category} />}
            </form>
          </div>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-14 py-10">
        <div className="flex gap-10 items-start">
          {/* ── Main content ── */}
          <main className="flex-1 min-w-0">
            {/* Featured post — hero card, only on unfiltered first page */}
            {featuredPost && page === 1 && (
              <Link
                href={`/resources/${featuredPost.slug}`}
                className="group block mb-8 bg-white border border-wire-300 hover:border-brand transition-all duration-200 hover:shadow-[3px_3px_0_0_#00A2FF]"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Image */}
                  <div
                    className="h-56 md:h-auto bg-wire-100"
                    style={
                      featuredPost.featuredImage
                        ? {
                            backgroundImage: `url(${featuredPost.featuredImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }
                        : { background: "linear-gradient(135deg, #060B14 0%, #0F1828 100%)" }
                    }
                  >
                    {!featuredPost.featuredImage && (
                      <div className="h-full flex items-center justify-center opacity-20">
                        <BookOpen size={48} className="text-brand" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className="font-display text-2xs font-bold tracking-widest uppercase px-2 py-1 border"
                          style={{
                            color: featuredPost.category?.color ?? "#00A2FF",
                            borderColor: featuredPost.category?.color ?? "#00A2FF",
                          }}
                        >
                          {featuredPost.category?.name ?? "Article"}
                        </span>
                        <span className="font-display text-2xs font-bold tracking-widest uppercase text-ink-100 border border-wire-300 px-2 py-1">
                          Featured
                        </span>
                      </div>

                      <h2 className="font-serif text-2xl md:text-3xl text-ink-900 leading-tight mb-4 group-hover:text-brand transition-colors duration-150">
                        {featuredPost.title}
                      </h2>

                      {featuredPost.excerpt && (
                        <p className="font-sans text-sm text-ink-500 leading-relaxed mb-6 line-clamp-3">
                          {featuredPost.excerpt}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 font-sans text-xs text-ink-300">
                        <span className="flex items-center gap-1.5">
                          <Clock size={11} strokeWidth={2} />
                          {featuredPost.readingTime ?? 5} min
                        </span>
                        <span className="w-px h-3 bg-wire-200" />
                        <span>
                          {featuredPost.publishedAt
                            ? new Date(featuredPost.publishedAt).toLocaleDateString("en-KE", {
                                month: "short",
                                year: "numeric",
                              })
                            : ""}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1.5 font-display text-xs font-bold tracking-wide uppercase text-brand group-hover:gap-3 transition-all duration-150">
                        Read <ArrowRight size={12} strokeWidth={2.5} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Result meta */}
            {isFiltered && (
              <div className="flex items-center justify-between mb-6">
                <p className="font-display text-xs font-bold tracking-widest uppercase text-ink-300">
                  {total} result{total !== 1 ? "s" : ""}
                  {sp.search ? ` for "${sp.search}"` : ""}
                  {sp.category ? ` in ${sp.category}` : ""}
                  {sp.tag ? ` tagged ${sp.tag}` : ""}
                </p>
                <Link
                  href="/resources"
                  className="font-display text-xs font-bold tracking-wide uppercase text-brand hover:underline"
                >
                  Clear
                </Link>
              </div>
            )}

            {/* Post list */}
            {gridPosts.length === 0 && !featuredPost ? (
              <div className="border border-wire-300 bg-white py-20 flex flex-col items-center text-center gap-4">
                <p className="font-display font-bold text-lg text-ink-900">No articles found.</p>
                <p className="font-sans text-sm text-ink-400 max-w-xs">
                  {sp.search
                    ? `Nothing matching "${sp.search}".`
                    : "No articles in this category yet."}
                </p>
                <Link
                  href="/resources"
                  className="inline-flex items-center gap-2 font-display text-xs font-bold tracking-wide uppercase text-brand"
                >
                  Clear filters <ArrowRight size={13} strokeWidth={2.5} />
                </Link>
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-wire-200 border border-wire-200 bg-white">
                {gridPosts.map((post: any) => (
                  <article
                    key={post.id}
                    className="group flex flex-col md:flex-row gap-5 p-5 hover:bg-wire-50 transition-colors duration-150"
                  >
                    {/* Image */}
                    {post.featuredImage && (
                      <div
                        className="w-full md:w-[220px] h-[140px] shrink-0 bg-wire-100"
                        style={{
                          backgroundImage: `url(${post.featuredImage})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    )}

                    {/* Content */}
                    <div className="flex flex-col flex-1 min-w-0">
                      {post.category && (
                        <p
                          className="font-display text-[10px] font-bold tracking-widest uppercase mb-1.5"
                          style={{ color: post.category.color ?? "#00A2FF" }}
                        >
                          {post.category.name}
                        </p>
                      )}

                      {/* Smaller title (fixed) */}
                      <h2 className="font-display font-semibold text-[14px] text-ink-900 leading-snug mb-1.5 group-hover:text-brand transition-colors duration-150">
                        <Link href={`/resources/${post.slug}`}>{post.title}</Link>
                      </h2>

                      <p className="font-sans text-sm text-ink-600 leading-relaxed line-clamp-2 mb-3">
                        {post.excerpt
                          ? post.excerpt
                          : post.contentHtml
                            ? post.contentHtml.replace(/<[^>]+>/g, "").slice(0, 120) + "…"
                            : "Read this article on EdgeCloud Resources."}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-xs text-ink-400">
                        <div className="flex items-center gap-2">
                          <Clock size={10} strokeWidth={2} />
                          <span>{post.readingTime ?? 5} min</span>
                          <span className="w-px h-3 bg-wire-200" />
                          <span>
                            {post.publishedAt
                              ? new Date(post.publishedAt).toLocaleDateString("en-KE", {
                                  month: "short",
                                  year: "numeric",
                                })
                              : "Draft"}
                          </span>
                        </div>

                        <Link
                          href={`/resources/${post.slug}`}
                          className="font-display font-bold text-[11px] tracking-wide uppercase text-brand inline-flex items-center gap-1 hover:gap-2 transition-all duration-150"
                        >
                          Read <ArrowRight size={11} strokeWidth={2.5} />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Pagination */}
            {pages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-1">
                {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={`/resources?page=${p}${sp.category ? `&category=${sp.category}` : ""}${sp.search ? `&search=${sp.search}` : ""}`}
                    className={`w-9 h-9 flex items-center justify-center font-display text-xs font-bold border transition-colors duration-150 ${
                      p === page
                        ? "bg-brand text-white border-brand"
                        : "bg-white text-ink-500 border-wire-300 hover:border-brand hover:text-brand"
                    }`}
                  >
                    {p}
                  </Link>
                ))}
              </div>
            )}
          </main>

          {/* ── Sidebar ── */}
          <aside className="hidden lg:flex flex-col gap-6 w-64 shrink-0">
            {/* Categories */}
            <div className="bg-white border border-wire-300">
              <div className="px-5 py-4 border-b border-wire-200">
                <p className="font-display text-xs font-bold tracking-widest uppercase text-ink-900">
                  Categories
                </p>
              </div>
              <div className="p-3 flex flex-col gap-0.5">
                <Link
                  href="/resources"
                  className={`flex items-center justify-between px-3 py-2.5 font-sans text-sm font-medium transition-colors duration-150 ${
                    !sp.category
                      ? "bg-brand text-white"
                      : "text-ink-500 hover:bg-wire-50 hover:text-ink-900"
                  }`}
                >
                  <span>All articles</span>
                  <span className="font-display text-xs font-bold">{total}</span>
                </Link>
                {allCategories.map((cat: any) => {
                  const active = sp.category === cat.slug;
                  return (
                    <Link
                      key={cat.slug}
                      href={`/resources?category=${cat.slug}`}
                      className="flex items-center justify-between px-3 py-2.5 font-sans text-sm font-medium transition-colors duration-150 hover:bg-wire-50"
                      style={{
                        color: active ? (cat.color ?? "#00A2FF") : "#3D4E5C",
                        background: active ? `${cat.color ?? "#00A2FF"}12` : "transparent",
                        borderLeft: active
                          ? `2px solid ${cat.color ?? "#00A2FF"}`
                          : "2px solid transparent",
                      }}
                    >
                      <span>{cat.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Tags */}
            {allTags.length > 0 && (
              <div className="bg-white border border-wire-300">
                <div className="px-5 py-4 border-b border-wire-200">
                  <p className="font-display text-xs font-bold tracking-widest uppercase text-ink-900">
                    Tags
                  </p>
                </div>
                <div className="p-4 flex flex-wrap gap-2">
                  {allTags.map((tag: any) => {
                    const active = sp.tag === tag.slug;
                    return (
                      <Link
                        key={tag.slug}
                        href={`/resources?tag=${tag.slug}`}
                        className="font-display text-xs font-bold tracking-wide uppercase px-2.5 py-1.5 border transition-colors duration-150"
                        style={{
                          background: active ? "#0B1016" : "transparent",
                          color: active ? "white" : "#7B8FA0",
                          borderColor: active ? "#0B1016" : "#D4DBE2",
                        }}
                      >
                        {tag.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CTA box */}
            <div className="bg-navy-900 p-5">
              <div className="w-6 h-px bg-brand mb-4" />
              <p className="font-serif text-lg text-white leading-snug mb-2">
                Need help navigating Kenya&apos;s cloud landscape?
              </p>
              <p className="font-sans text-xs text-white/50 leading-relaxed mb-5">
                Our Nairobi team is available for a free 30-minute strategy call.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-brand text-white font-display font-bold text-xs tracking-wide uppercase px-4 py-2.5 transition-all duration-150 hover:-translate-y-px"
                style={{ boxShadow: "3px 3px 0px 0px rgba(0,162,255,0.35)" }}
              >
                Book a Call <ArrowRight size={12} strokeWidth={2.5} />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
