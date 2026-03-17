import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getDb, schema } from "@/db";
import { eq, sql } from "drizzle-orm";
import { calculateReadingTime } from "@/lib/reading-time";

const { posts, postTags } = schema;

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = await params;
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = getDb();
  const post = await db
    .select()
    .from(posts)
    .where(eq(posts.id, Number(rawId)))
    .limit(1);
  if (!post[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const tags = await db
    .select({ tag: schema.tags })
    .from(postTags)
    .innerJoin(schema.tags, eq(postTags.tagId, schema.tags.id))
    .where(eq(postTags.postId, Number(rawId)));
  return NextResponse.json({ post: post[0], tags: tags.map((t) => t.tag) });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = await params;
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const db = getDb();
    const id = Number(rawId);
    const existing = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
    if (!existing[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const updates: any = {};
    const fields = [
      "title",
      "slug",
      "excerpt",
      "content",
      "contentHtml",
      "featuredImage",
      "featuredImageAlt",
      "metaTitle",
      "noIndex",
      "categoryId",
      "isFeatured",
      "allowComments",
      "status",
      "scheduledAt",
    ];
    for (const f of fields)
      if (body[f] !== undefined) updates[f.replace(/([A-Z])/g, "_$1").toLowerCase()] = body[f];
    if (body.metaDescription !== undefined) updates.meta_description = body.metaDescription;
    if (body.ogImage !== undefined) updates.og_image = body.ogImage;
    if (body.contentHtml !== undefined)
      updates.reading_time = calculateReadingTime(body.contentHtml);
    if (body.status === "published" && !existing[0].publishedAt) updates.published_at = new Date();

    if (Object.keys(updates).length > 0) {
      // Build update manually to avoid field name issues
      await db
        .update(posts)
        .set({
          ...(body.title !== undefined && { title: body.title }),
          ...(body.slug !== undefined && { slug: body.slug }),
          ...(body.excerpt !== undefined && { excerpt: body.excerpt }),
          ...(body.content !== undefined && { content: body.content }),
          ...(body.contentHtml !== undefined && { contentHtml: body.contentHtml }),
          ...(body.featuredImage !== undefined && { featuredImage: body.featuredImage }),
          ...(body.featuredImageAlt !== undefined && { featuredImageAlt: body.featuredImageAlt }),
          ...(body.metaTitle !== undefined && { metaTitle: body.metaTitle }),
          ...(body.metaDescription !== undefined && { metaDescription: body.metaDescription }),
          ...(body.ogImage !== undefined && { ogImage: body.ogImage }),
          ...(body.noIndex !== undefined && { noIndex: body.noIndex }),
          ...(body.categoryId !== undefined && { categoryId: body.categoryId }),
          ...(body.isFeatured !== undefined && { isFeatured: body.isFeatured }),
          ...(body.allowComments !== undefined && { allowComments: body.allowComments }),
          ...(body.status !== undefined && { status: body.status }),
          ...(body.status === "published" &&
            !existing[0].publishedAt && { publishedAt: new Date() }),
          ...(body.contentHtml !== undefined && {
            readingTime: calculateReadingTime(body.contentHtml),
          }),
        })
        .where(eq(posts.id, id));
    }

    if (body.tagIds !== undefined) {
      await db.delete(postTags).where(eq(postTags.postId, id));
      if (body.tagIds.length > 0)
        await db
          .insert(postTags)
          .values(body.tagIds.map((tagId: number) => ({ postId: id, tagId })));
    }

    const updated = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
    return NextResponse.json({ post: updated[0] });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = await params;
  const user = await getCurrentUser();
  if (!user || user.role !== "admin")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await getDb()
    .delete(posts)
    .where(eq(posts.id, Number(rawId)));
  return NextResponse.json({ ok: true });
}
