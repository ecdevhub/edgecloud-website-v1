import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getDb, schema } from "@/db";
import { slugify } from "@/lib/slugify";
export async function GET() {
  return NextResponse.json(await getDb().select().from(schema.categories).orderBy(schema.categories.name));
}
export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { name, description, color } = await req.json();
  const slug = slugify(name);
  const [r] = await getDb().insert(schema.categories).values({ name, slug, description, color });
  return NextResponse.json({ id: (r as any).insertId, slug }, { status: 201 });
}
