import { NextRequest, NextResponse } from "next/server";
import { incrementViewCount } from "@/lib/blog";
import { getDb, schema } from "@/db";
import { eq } from "drizzle-orm";
export async function POST(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const db = getDb();
  const result = await db.select({ id: schema.posts.id }).from(schema.posts).where(eq(schema.posts.slug, slug)).limit(1);
  if (result[0]) await incrementViewCount(result[0].id);
  return NextResponse.json({ ok: true });
}
