import { getDb, schema } from "@/db";
import { eq, desc, and, sql, or, like, inArray } from "drizzle-orm";

const { posts, authors, categories, tags, postTags } = schema;

export interface PostWithRelations {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  contentHtml: string | null;
  featuredImage: string | null;
  featuredImageAlt: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  ogImage: string | null;
  noIndex: boolean | null;
  canonicalUrl: string | null;
  status: string;
  publishedAt: Date | null;
  viewCount: number;
  readingTime: number | null;
  isFeatured: boolean | null;
  allowComments: boolean | null;
  createdAt: Date;
  updatedAt: Date;
  author: { id: number; name: string; email: string; bio: string | null; avatar: string | null };
  category: { id: number; name: string; slug: string; color: string | null } | null;
  tags: { id: number; name: string; slug: string }[];
}

/** Get a single published post by slug */
export async function getPostBySlug(slug: string): Promise<PostWithRelations | null> {
  const db = getDb();
  const result = await db
    .select()
    .from(posts)
    .leftJoin(authors, eq(posts.authorId, authors.id))
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .where(and(eq(posts.slug, slug), eq(posts.status, "published")))
    .limit(1);

  if (!result[0]) return null;
  const postTagsResult = await db
    .select({ tag: tags })
    .from(postTags)
    .innerJoin(tags, eq(postTags.tagId, tags.id))
    .where(eq(postTags.postId, result[0].posts.id));

  const row = result[0];
  return {
    ...row.posts,
    author: {
      id: row.authors!.id,
      name: row.authors!.name,
      email: row.authors!.email,
      bio: row.authors!.bio,
      avatar: row.authors!.avatar,
    },
    category: row.categories
      ? {
          id: row.categories.id,
          name: row.categories.name,
          slug: row.categories.slug,
          color: row.categories.color,
        }
      : null,
    tags: postTagsResult.map((r) => r.tag),
  };
}

/** List published posts with pagination */
export async function getPublishedPosts(
  opts: {
    page?: number;
    perPage?: number;
    categorySlug?: string;
    tagSlug?: string;
    search?: string;
    featured?: boolean;
  } = {},
): Promise<{ posts: PostWithRelations[]; total: number; pages: number }> {
  const db = getDb();
  const { page = 1, perPage = 9, categorySlug, tagSlug, search, featured } = opts;
  const offset = (page - 1) * perPage;

  const conditions = [eq(posts.status, "published")];
  if (featured) conditions.push(eq(posts.isFeatured, true));
  if (search)
    conditions.push(or(like(posts.title, `%${search}%`), like(posts.excerpt, `%${search}%`))!);

  let query = db
    .select()
    .from(posts)
    .leftJoin(authors, eq(posts.authorId, authors.id))
    .leftJoin(categories, eq(posts.categoryId, categories.id));

  if (categorySlug) {
    query = (query as any).where(and(...conditions, eq(categories.slug, categorySlug)));
  } else if (tagSlug) {
    const tagResult = await db.select().from(tags).where(eq(tags.slug, tagSlug)).limit(1);
    if (!tagResult[0]) return { posts: [], total: 0, pages: 0 };
    const taggedPostIds = await db
      .select({ postId: postTags.postId })
      .from(postTags)
      .where(eq(postTags.tagId, tagResult[0].id));
    const ids = taggedPostIds.map((r) => r.postId);
    conditions.push(inArray(posts.id, ids.length > 0 ? ids : [-1]));
    query = (query as any).where(and(...conditions));
  } else {
    query = (query as any).where(and(...conditions));
  }

  const [rows, countResult] = await Promise.all([
    (query as any).orderBy(desc(posts.publishedAt)).limit(perPage).offset(offset),
    db
      .select({ count: sql<number>`count(*)` })
      .from(posts)
      .where(and(...conditions)),
  ]);

  const total = countResult[0]?.count ?? 0;
  const postsWithTags = await Promise.all(
    rows.map(async (row: any) => {
      const postTagsResult = await db
        .select({ tag: tags })
        .from(postTags)
        .innerJoin(tags, eq(postTags.tagId, tags.id))
        .where(eq(postTags.postId, row.posts.id));
      return {
        ...row.posts,
        author: {
          id: row.authors?.id,
          name: row.authors?.name,
          email: row.authors?.email,
          bio: row.authors?.bio,
          avatar: row.authors?.avatar,
        },
        category: row.categories
          ? {
              id: row.categories.id,
              name: row.categories.name,
              slug: row.categories.slug,
              color: row.categories.color,
            }
          : null,
        tags: postTagsResult.map((r: any) => r.tag),
      };
    }),
  );

  return { posts: postsWithTags, total, pages: Math.ceil(total / perPage) };
}

/** Increment view count */
export async function incrementViewCount(postId: number) {
  const db = getDb();
  await db
    .update(posts)
    .set({ viewCount: sql`${posts.viewCount} + 1` })
    .where(eq(posts.id, postId));
}

/** Get related posts (same category, exclude current) */
export async function getRelatedPosts(postId: number, categoryId: number | null, limit = 3) {
  const db = getDb();
  const conditions = [eq(posts.status, "published")];
  if (categoryId) conditions.push(eq(posts.categoryId, categoryId));

  const rows = await db
    .select({ post: posts, author: authors, category: categories })
    .from(posts)
    .leftJoin(authors, eq(posts.authorId, authors.id))
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .where(and(...conditions, sql`${posts.id} != ${postId}`))
    .orderBy(desc(posts.publishedAt))
    .limit(limit);

  return rows.map((r) => ({ ...r.post, author: r.author!, category: r.category, tags: [] }));
}

/** Get all categories */
export async function getCategories() {
  return getDb().select().from(categories).orderBy(categories.name);
}

/** Get all tags */
export async function getAllTags() {
  return getDb().select().from(tags).orderBy(tags.name);
}

/** Get all published slugs (for generateStaticParams) */
export async function getAllPublishedSlugs() {
  const db = getDb();
  return db.select({ slug: posts.slug }).from(posts).where(eq(posts.status, "published"));
}

/**
 * addHeadingIds.ts
 * ─────────────────────────────────────────────────────
 * Call this in your lib/blog.ts (or wherever you build
 * `post.contentHtml`) to inject `id` attributes into
 * every <h2> and <h3> tag.
 *
 * The TableOfContents component extracts those same ids
 * to build anchor links, and the IntersectionObserver
 * watches them to track the active heading.
 *
 * Usage:
 *   import { addHeadingIds } from "@/lib/addHeadingIds";
 *   post.contentHtml = addHeadingIds(post.contentHtml);
 */

export function addHeadingIds(html: string): string {
  // Track used slugs to deduplicate (e.g. two "Introduction" headings)
  const slugCount: Record<string, number> = {};

  return html.replace(
    /<(h[23])([^>]*)>(.*?)<\/h[23]>/gi,
    (match, tag: string, attrs: string, inner: string) => {
      // If the tag already has an id, leave it alone
      if (/\bid\s*=/i.test(attrs)) return match;

      // Strip any HTML tags inside the heading text to get plain text
      const text = inner.replace(/<[^>]+>/g, "").trim();

      // Build a URL-safe slug
      let slug = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "") // remove special chars
        .replace(/\s+/g, "-") // spaces → hyphens
        .replace(/-+/g, "-") // collapse double hyphens
        .slice(0, 72); // max length

      // Deduplicate: if slug already used, append -2, -3 …
      if (slugCount[slug] !== undefined) {
        slugCount[slug]++;
        slug = `${slug}-${slugCount[slug]}`;
      } else {
        slugCount[slug] = 1;
      }

      return `<${tag}${attrs} id="${slug}">${inner}</${tag}>`;
    },
  );
}
