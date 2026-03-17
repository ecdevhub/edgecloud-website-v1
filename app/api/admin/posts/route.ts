import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getDb, schema } from "@/db";
import { eq, desc, like, and, or, sql } from "drizzle-orm";
import { slugify } from "@/lib/slugify";
import { calculateReadingTime } from "@/lib/reading-time";

const { posts, authors, categories } = schema;

function requireAuth(req: NextRequest) {
  return getCurrentUser();
}

// GET /api/admin/posts  - list all posts (draft + published)
export async function GET(req: NextRequest) {
  const user = await requireAuth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getDb();
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1);
  const perPage = Number(searchParams.get("per_page") || 20);
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  const conditions: any[] = [];
  if (status) conditions.push(eq(posts.status, status as any));
  if (search)
    conditions.push(or(like(posts.title, `%${search}%`), like(posts.excerpt, `%${search}%`)));

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const [rows, countRows] = await Promise.all([
    db
      .select({ post: posts, author: authors, category: categories })
      .from(posts)
      .leftJoin(authors, eq(posts.authorId, authors.id))
      .leftJoin(categories, eq(posts.categoryId, categories.id))
      .where(where)
      .orderBy(desc(posts.updatedAt))
      .limit(perPage)
      .offset((page - 1) * perPage),
    db
      .select({ count: sql<number>`count(*)` })
      .from(posts)
      .where(where),
  ]);

  return NextResponse.json({
    posts: rows.map((r) => ({ ...r.post, author: r.author, category: r.category })),
    total: countRows[0]?.count ?? 0,
    page,
    pages: Math.ceil((countRows[0]?.count ?? 0) / perPage),
  });
}

// POST /api/admin/posts - create post
export async function POST(req: NextRequest) {
  const user = await requireAuth(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const db = getDb();

    // Generate slug
    const existingSlugs = await db.select({ slug: posts.slug }).from(posts);
    let slug = body.slug || slugify(body.title);
    const slugs = existingSlugs.map((r) => r.slug);
    if (slugs.includes(slug)) {
      let i = 2;
      while (slugs.includes(`${slug}-${i}`)) i++;
      slug = `${slug}-${i}`;
    }

    const readingTime = calculateReadingTime(body.contentHtml || body.content || "");
    const now = new Date();
    const publishedAt =
      body.status === "published" ? (body.publishedAt ? new Date(body.publishedAt) : now) : null;

    const [result] = await db.insert(posts).values({
      title: body.title,
      slug,
      excerpt: body.excerpt || null,
      content: body.content || "",
      contentHtml: body.contentHtml || null,
      featuredImage: body.featuredImage || null,
      featuredImageAlt: body.featuredImageAlt || null,
      metaTitle: body.metaTitle || null,
      metaDescription: body.metaDescription || null,
      ogImage: body.ogImage || null,
      noIndex: body.noIndex || false,
      authorId: user.id,
      categoryId: body.categoryId || null,
      status: body.status || "draft",
      publishedAt,
      readingTime,
      isFeatured: body.isFeatured || false,
      allowComments: body.allowComments !== false,
    });

    const postId = (result as any).insertId;

    // Save tags
    if (body.tagIds?.length > 0) {
      await db
        .insert(schema.postTags)
        .values(body.tagIds.map((tagId: number) => ({ postId, tagId })))
        .onDuplicateKeyUpdate({ set: { postId: sql`post_id` } });
    }

    const post = await db.select().from(posts).where(eq(posts.id, postId)).limit(1);
    return NextResponse.json({ post: post[0], slug }, { status: 201 });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message || "Create failed" }, { status: 500 });
  }
}
