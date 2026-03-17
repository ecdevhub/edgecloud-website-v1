import { getCurrentUser } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { getDb, schema } from "@/db";
import { eq } from "drizzle-orm";
import { getCategories, getAllTags } from "@/lib/blog";
import AdminShell from "@/components/AdminShell";
import PostEditor from "@/components/blog/PostEditor";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  const { id: rawId } = await params;
  const id = Number(rawId);

  const db = getDb();
  const [postRow] = await db.select().from(schema.posts).where(eq(schema.posts.id, id)).limit(1);
  if (!postRow) notFound();

  const postTagsResult = await db
    .select({ tag: schema.tags })
    .from(schema.postTags)
    .innerJoin(schema.tags, eq(schema.postTags.tagId, schema.tags.id))
    .where(eq(schema.postTags.postId, id));

  const [categories, allTags] = await Promise.all([getCategories(), getAllTags()]);

  const initialData = {
    title: postRow.title,
    slug: postRow.slug,
    excerpt: postRow.excerpt ?? "",
    content: postRow.content,
    contentHtml: postRow.contentHtml ?? "",
    featuredImage: postRow.featuredImage ?? "",
    featuredImageAlt: postRow.featuredImageAlt ?? "",
    metaTitle: postRow.metaTitle ?? "",
    metaDescription: postRow.metaDescription ?? "",
    status: postRow.status,
    categoryId: postRow.categoryId ?? null,
    tagIds: postTagsResult.map((r) => r.tag.id),
    isFeatured: postRow.isFeatured ?? false,
    noIndex: postRow.noIndex ?? false,
    allowComments: postRow.allowComments ?? true,
  };

  return (
    <AdminShell user={user}>
      <PostEditor
        postId={id}
        initialData={initialData}
        categories={categories as any}
        tags={allTags}
      />
    </AdminShell>
  );
}
