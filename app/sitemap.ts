import { MetadataRoute } from "next";
import { getAllPublishedSlugs } from "@/lib/blog";

const base = "https://edgecloud.co.ke";

// ─── Static routes with tuned priorities & change frequencies ────────────────
// changeFrequency guidance:
//   "always"  - changes on every load (live data)
//   "hourly"  - breaking news, stock tickers
//   "daily"   - blog index, news index
//   "weekly"  - product pages, service pages, solutions
//   "monthly" - about/company, legal pages
//   "yearly"  - truly evergreen / rarely touched
//   "never"   - archived content
const staticRoutes: MetadataRoute.Sitemap = [
  // ── Core ──────────────────────────────────────────────────────────────────
  {
    url: base,
    priority: 1.0,
    changeFrequency: "weekly", // homepage copy updates regularly
  },
  {
    url: `${base}/contact`,
    priority: 0.9, // high commercial intent
    changeFrequency: "monthly",
  },

  // ── Products ──────────────────────────────────────────────────────────────
  {
    url: `${base}/products`,
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    url: `${base}/products/eza-cloud`,
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    url: `${base}/products/zurimail`,
    priority: 0.9,
    changeFrequency: "weekly",
  },

  // ── Services ──────────────────────────────────────────────────────────────
  {
    url: `${base}/services`,
    priority: 0.85,
    changeFrequency: "weekly",
  },

  // ── Solutions ─────────────────────────────────────────────────────────────
  {
    url: `${base}/solutions`,
    priority: 0.8,
    changeFrequency: "weekly",
  },
  {
    url: `${base}/solutions/smes-ecommerce`,
    priority: 0.75,
    changeFrequency: "monthly",
  },
  {
    url: `${base}/solutions/fintech-saccos`,
    priority: 0.75,
    changeFrequency: "monthly",
  },
  {
    url: `${base}/solutions/health-ngos`,
    priority: 0.75,
    changeFrequency: "monthly",
  },
  {
    url: `${base}/solutions/agencies-developers`,
    priority: 0.75,
    changeFrequency: "monthly",
  },

  // ── Resources (blog index) ────────────────────────────────────────────────
  {
    url: `${base}/resources`,
    priority: 0.8,
    changeFrequency: "daily",
  },

  // ── Company ───────────────────────────────────────────────────────────────
  {
    url: `${base}/company`,
    priority: 0.65,
    changeFrequency: "monthly",
  },

  // ── Legal ─────────────────────────────────────────────────────────────────
  {
    url: `${base}/privacy-policy`,
    priority: 0.35,
    changeFrequency: "yearly",
  },
  {
    url: `${base}/cookie-policy`,
    priority: 0.35,
    changeFrequency: "yearly",
  },
  {
    url: `${base}/data-processing-agreement`,
    priority: 0.45,
    changeFrequency: "yearly",
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ── Dynamic blog post routes ───────────────────────────────────────────────
  // getAllPublishedSlugs returns { slug, updatedAt?, publishedAt? }[]
  // Fall back to an empty array if the DB is unreachable at build time.
  let blogRoutes: MetadataRoute.Sitemap = [];

  try {
    const slugs = await getAllPublishedSlugs();

    blogRoutes = slugs.map((post: { slug: string; updatedAt?: Date; publishedAt?: Date }) => ({
      url: `${base}/resources/${post.slug}`,
      // Use real last-modified date so Google re-crawls on genuine updates.
      // Falls back to publishedAt, then current build time.
      lastModified: post.updatedAt ?? post.publishedAt ?? new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (err) {
    // Don't crash the build - just omit blog posts from this run.
    console.warn("[sitemap] Could not fetch blog slugs:", err);
  }

  // ── Stamp static routes with today's date ─────────────────────────────────
  // For static pages we don't have a DB-backed updatedAt, so we use the
  // build time. This is fine - Google ignores lastModified if it never changes.
  const now = new Date();
  const stampedStatic = staticRoutes.map((route) => ({
    ...route,
    lastModified: now,
  }));

  return [...stampedStatic, ...blogRoutes];
}
