import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getDb, schema } from "@/db";
import { eq, desc, like, and, or, sql } from "drizzle-orm";
import AdminShell from "@/components/AdminShell";
import Link from "next/link";
import { PlusCircle, Eye, Edit2, Trash2, Search, FileText } from "lucide-react";

export default async function AdminPostsPage({ searchParams }: { searchParams: { status?: string; search?: string; page?: string } }) {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  const db = getDb();
  const page = Number(searchParams.page || 1);
  const perPage = 20;
  const conditions: any[] = [];
  if (searchParams.status) conditions.push(eq(schema.posts.status, searchParams.status as any));
  if (searchParams.search) conditions.push(or(like(schema.posts.title, `%${searchParams.search}%`)));

  const where = conditions.length > 0 ? and(...conditions) : undefined;
  const [rows, [{ count: total }]] = await Promise.all([
    db.select({ post: schema.posts, author: schema.authors, category: schema.categories })
      .from(schema.posts)
      .leftJoin(schema.authors, eq(schema.posts.authorId, schema.authors.id))
      .leftJoin(schema.categories, eq(schema.posts.categoryId, schema.categories.id))
      .where(where).orderBy(desc(schema.posts.updatedAt)).limit(perPage).offset((page - 1) * perPage),
    db.select({ count: sql<number>`count(*)` }).from(schema.posts).where(where),
  ]);

  const pages = Math.ceil(total / perPage);
  const statusCounts = await Promise.all(
    ["published", "draft", "archived"].map(async (s) => {
      const [r] = await db.select({ count: sql<number>`count(*)` }).from(schema.posts).where(eq(schema.posts.status, s as any));
      return { status: s, count: r.count };
    })
  );

  return (
    <AdminShell user={user}>
      <div style={{ padding: "32px 36px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 24, color: "#0F1923", margin: "0 0 2px" }}>Posts</h1>
            <p style={{ fontSize: 14, color: "#8B96A3", margin: 0 }}>{total} total · Manage your blog content</p>
          </div>
          <Link href="/admin/posts/new" style={{ display: "flex", alignItems: "center", gap: 7, background: "#00A2FF", color: "white", padding: "10px 18px", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 14, boxShadow: "0 2px 10px rgba(0,162,255,0.25)" }}>
            <PlusCircle size={15} /> New Post
          </Link>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 20, alignItems: "center" }}>
          <form method="GET" style={{ display: "flex", alignItems: "center", background: "white", border: "1.5px solid #E5E8ED", borderRadius: 9, overflow: "hidden", width: 260 }}>
            <span style={{ padding: "0 10px", color: "#8B96A3", display: "flex" }}><Search size={14} /></span>
            <input name="search" defaultValue={searchParams.search || ""} placeholder="Search posts…" style={{ flex: 1, border: "none", padding: "9px 8px 9px 0", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, color: "#0F1923", outline: "none" }} />
            {searchParams.status && <input type="hidden" name="status" value={searchParams.status} />}
          </form>
          <div style={{ display: "flex", gap: 6 }}>
            {[{ label: "All", status: "" }, ...statusCounts.map(s => ({ label: `${s.status.charAt(0).toUpperCase() + s.status.slice(1)} (${s.count})`, status: s.status }))].map(({ label, status }) => {
              const active = (searchParams.status || "") === status;
              return (
                <Link key={status} href={status ? `/admin/posts?status=${status}` : "/admin/posts"} style={{ padding: "7px 14px", borderRadius: 8, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, fontSize: 13, textDecoration: "none", background: active ? "#0F1923" : "white", color: active ? "white" : "#4A5568", border: "1.5px solid", borderColor: active ? "#0F1923" : "#E5E8ED" }}>
                  {label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Table */}
        <div style={{ background: "white", border: "1px solid #E5E8ED", borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 4px rgba(15,25,35,0.05)" }}>
          {rows.length === 0 ? (
            <div style={{ padding: "64px 24px", textAlign: "center" }}>
              <FileText size={32} style={{ color: "#CDD2D9", margin: "0 auto 12px", display: "block" }} />
              <p style={{ color: "#8B96A3", fontSize: 15, marginBottom: 16 }}>No posts found.</p>
              <Link href="/admin/posts/new" style={{ color: "#00A2FF", fontWeight: 600, fontSize: 14 }}>Write your first post →</Link>
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #E5E8ED", background: "#FAFBFC" }}>
                  {["Title", "Category", "Status", "Views", "Date", ""].map(h => (
                    <th key={h} style={{ padding: "11px 16px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#8B96A3", letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(({ post, author, category }, i) => (
                  <tr key={post.id} style={{ borderBottom: i < rows.length - 1 ? "1px solid #F4F6F8" : "none" }}>
                    <td style={{ padding: "14px 16px", maxWidth: 320 }}>
                      <div style={{ fontWeight: 600, fontSize: 14, color: "#0F1923", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 2 }}>{post.title}</div>
                      <div style={{ fontSize: 12, color: "#8B96A3" }}>by {author?.name}</div>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      {category ? <span style={{ fontSize: 12, fontWeight: 600, color: category.color ?? "#00A2FF", background: `${category.color ?? "#00A2FF"}15`, padding: "3px 8px", borderRadius: 999 }}>{category.name}</span> : <span style={{ color: "#CDD2D9", fontSize: 12 }}>—</span>}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" as const, background: post.status === "published" ? "#ECFDF5" : post.status === "draft" ? "#FFFBEB" : "#F3EFFE", color: post.status === "published" ? "#059669" : post.status === "draft" ? "#D97706" : "#7C3AED" }}>{post.status}</span>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "#4A5568" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Eye size={12} style={{ color: "#8B96A3" }} /> {post.viewCount.toLocaleString()}</span>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: 12, color: "#8B96A3", whiteSpace: "nowrap" }}>
                      {new Date(post.updatedAt).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Link href={`/admin/posts/${post.id}`} style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 12px", borderRadius: 7, background: "#F4F6F8", border: "1px solid #E5E8ED", color: "#4A5568", textDecoration: "none", fontSize: 13, fontWeight: 600 }}>
                          <Edit2 size={12} /> Edit
                        </Link>
                        {post.status === "published" && (
                          <Link href={`/resources/${post.slug}`} target="_blank" style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 12px", borderRadius: 7, background: "#E6F5FF", border: "1px solid rgba(0,162,255,0.2)", color: "#00A2FF", textDecoration: "none", fontSize: 13, fontWeight: 600 }}>
                            <Eye size={12} /> View
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 24 }}>
            {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
              <Link key={p} href={`/admin/posts?page=${p}${searchParams.status ? `&status=${searchParams.status}` : ""}`} style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, fontWeight: 600, fontSize: 14, textDecoration: "none", background: p === page ? "#00A2FF" : "white", color: p === page ? "white" : "#4A5568", border: "1.5px solid", borderColor: p === page ? "#00A2FF" : "#E5E8ED" }}>{p}</Link>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
