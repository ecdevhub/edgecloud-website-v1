import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getDb, schema } from "@/db";
import { eq, desc, sql, and } from "drizzle-orm";
import AdminShell from "@/components/AdminShell";
import Link from "next/link";
import {
  FileText,
  Eye,
  MessageSquare,
  TrendingUp,
  PlusCircle,
  ArrowRight,
  Clock,
} from "lucide-react";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  const db = getDb();
  const [totalPosts] = await db.select({ count: sql<number>`count(*)` }).from(schema.posts);
  const [publishedPosts] = await db
    .select({ count: sql<number>`count(*)` })
    .from(schema.posts)
    .where(eq(schema.posts.status, "published"));
  const [draftPosts] = await db
    .select({ count: sql<number>`count(*)` })
    .from(schema.posts)
    .where(eq(schema.posts.status, "draft"));
  const [totalViews] = await db.select({ total: sql<number>`sum(view_count)` }).from(schema.posts);
  const recentPosts = await db
    .select({ post: schema.posts, author: schema.authors })
    .from(schema.posts)
    .leftJoin(schema.authors, eq(schema.posts.authorId, schema.authors.id))
    .orderBy(desc(schema.posts.updatedAt))
    .limit(6);

  const stats = [
    {
      label: "Total Posts",
      value: totalPosts.count,
      icon: FileText,
      color: "#00A2FF",
      bg: "#E6F5FF",
    },
    {
      label: "Published",
      value: publishedPosts.count,
      icon: TrendingUp,
      color: "#059669",
      bg: "#ECFDF5",
    },
    { label: "Drafts", value: draftPosts.count, icon: Clock, color: "#D97706", bg: "#FFFBEB" },
    {
      label: "Total Views",
      value: (totalViews.total ?? 0).toLocaleString(),
      icon: Eye,
      color: "#7C3AED",
      bg: "#F3EFFE",
    },
  ];

  return (
    <AdminShell user={user}>
      <div style={{ padding: "32px 36px" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 32,
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontWeight: 800,
                fontSize: 24,
                color: "#0F1923",
                margin: "0 0 4px",
              }}
            >
              Karibu, {user.name.split(" ")[0]} 👋
            </h1>
            <p style={{ fontSize: 14, color: "#8B96A3", margin: 0 }}>
              Here's what's happening with your blog today.
            </p>
          </div>
          <Link
            href="/admin/posts/new"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              background: "#00A2FF",
              color: "white",
              padding: "10px 18px",
              borderRadius: 10,
              textDecoration: "none",
              fontWeight: 600,
              fontSize: 14,
              boxShadow: "0 2px 10px rgba(0,162,255,0.25)",
            }}
          >
            <PlusCircle size={15} /> New Post
          </Link>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 20,
            marginBottom: 36,
          }}
        >
          {stats.map(({ label, value, icon: Icon, color, bg }) => (
            <div
              key={label}
              style={{
                background: "white",
                border: "1px solid #E5E8ED",
                borderRadius: 14,
                padding: "22px 24px",
                boxShadow: "0 1px 4px rgba(15,25,35,0.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 14,
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 600, color: "#8B96A3" }}>{label}</span>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 9,
                    background: bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
              </div>
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontWeight: 800,
                  fontSize: 30,
                  color: "#0F1923",
                  lineHeight: 1,
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Recent posts */}
        <div
          style={{
            background: "white",
            border: "1px solid #E5E8ED",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 1px 4px rgba(15,25,35,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "18px 24px",
              borderBottom: "1px solid #E5E8ED",
            }}
          >
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontWeight: 700,
                fontSize: 16,
                color: "#0F1923",
                margin: 0,
              }}
            >
              Recent Posts
            </h2>
            <Link
              href="/admin/posts"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: 13,
                fontWeight: 600,
                color: "#00A2FF",
                textDecoration: "none",
              }}
            >
              View all <ArrowRight size={13} />
            </Link>
          </div>
          <div>
            {recentPosts.length === 0 ? (
              <div style={{ padding: "48px 24px", textAlign: "center" }}>
                <p style={{ color: "#8B96A3", fontSize: 14 }}>No posts yet.</p>
                <Link
                  href="/admin/posts/new"
                  style={{ color: "#00A2FF", fontWeight: 600, fontSize: 14 }}
                >
                  Create your first post →
                </Link>
              </div>
            ) : (
              recentPosts.map(({ post, author }, i) => (
                <div
                  key={post.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "14px 24px",
                    borderBottom: i < recentPosts.length - 1 ? "1px solid #F4F6F8" : "none",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 14,
                        color: "#0F1923",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        marginBottom: 3,
                      }}
                    >
                      {post.title}
                    </div>
                    <div style={{ fontSize: 12, color: "#8B96A3" }}>
                      {author?.name} ·{" "}
                      {new Date(post.updatedAt).toLocaleDateString("en-KE", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                  <span
                    style={{
                      padding: "3px 10px",
                      borderRadius: 999,
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      background:
                        post.status === "published"
                          ? "#ECFDF5"
                          : post.status === "draft"
                            ? "#FFFBEB"
                            : "#F3EFFE",
                      color:
                        post.status === "published"
                          ? "#059669"
                          : post.status === "draft"
                            ? "#D97706"
                            : "#7C3AED",
                    }}
                  >
                    {post.status}
                  </span>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#8B96A3",
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      minWidth: 60,
                    }}
                  >
                    <Eye size={11} /> {post.viewCount.toLocaleString()}
                  </div>
                  <Link
                    href={`/admin/posts/${post.id}`}
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#00A2FF",
                      textDecoration: "none",
                      flexShrink: 0,
                    }}
                  >
                    Edit
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
