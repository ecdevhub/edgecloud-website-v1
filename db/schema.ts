import {
  mysqlTable, varchar, text, tinyint, int, timestamp, boolean,
  mysqlEnum, index, uniqueIndex, bigint,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

/* ─── Authors / Admins ─────────────────────────────────────── */
export const authors = mysqlTable("authors", {
  id:         int("id").autoincrement().primaryKey(),
  name:       varchar("name", { length: 120 }).notNull(),
  email:      varchar("email", { length: 255 }).notNull().unique(),
  password:   varchar("password", { length: 255 }).notNull(),
  bio:        text("bio"),
  avatar:     varchar("avatar", { length: 500 }),
  role:       mysqlEnum("role", ["admin", "editor", "author"]).default("author").notNull(),
  createdAt:  timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt:  timestamp("updated_at").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
}, (t) => ({
  emailIdx: uniqueIndex("authors_email_idx").on(t.email),
}));

/* ─── Categories ───────────────────────────────────────────── */
export const categories = mysqlTable("categories", {
  id:          int("id").autoincrement().primaryKey(),
  name:        varchar("name", { length: 100 }).notNull(),
  slug:        varchar("slug", { length: 120 }).notNull().unique(),
  description: text("description"),
  color:       varchar("color", { length: 20 }).default("#00A2FF"),
  createdAt:   timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (t) => ({
  slugIdx: uniqueIndex("categories_slug_idx").on(t.slug),
}));

/* ─── Tags ──────────────────────────────────────────────────── */
export const tags = mysqlTable("tags", {
  id:       int("id").autoincrement().primaryKey(),
  name:     varchar("name", { length: 80 }).notNull(),
  slug:     varchar("slug", { length: 100 }).notNull().unique(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (t) => ({
  slugIdx: uniqueIndex("tags_slug_idx").on(t.slug),
}));

/* ─── Posts ─────────────────────────────────────────────────── */
export const posts = mysqlTable("posts", {
  id:              int("id").autoincrement().primaryKey(),
  title:           varchar("title", { length: 300 }).notNull(),
  slug:            varchar("slug", { length: 340 }).notNull().unique(),
  excerpt:         text("excerpt"),
  content:         text("content").notNull(),   // TipTap JSON or HTML
  contentHtml:     text("content_html"),         // Rendered HTML for serving
  featuredImage:   varchar("featured_image", { length: 600 }),
  featuredImageAlt: varchar("featured_image_alt", { length: 300 }),

  // SEO
  metaTitle:       varchar("meta_title", { length: 160 }),
  metaDescription: varchar("meta_description", { length: 320 }),
  canonicalUrl:    varchar("canonical_url", { length: 600 }),
  ogImage:         varchar("og_image", { length: 600 }),
  noIndex:         boolean("no_index").default(false),

  // Relations
  authorId:        int("author_id").notNull().references(() => authors.id),
  categoryId:      int("category_id").references(() => categories.id),

  // Status & scheduling
  status:          mysqlEnum("status", ["draft", "published", "archived"]).default("draft").notNull(),
  publishedAt:     timestamp("published_at"),
  scheduledAt:     timestamp("scheduled_at"),

  // Stats
  viewCount:       int("view_count").default(0).notNull(),
  readingTime:     int("reading_time").default(0),   // minutes

  // Flags
  isFeatured:      boolean("is_featured").default(false),
  allowComments:   boolean("allow_comments").default(true),

  createdAt:       timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt:       timestamp("updated_at").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
}, (t) => ({
  slugIdx:     uniqueIndex("posts_slug_idx").on(t.slug),
  statusIdx:   index("posts_status_idx").on(t.status),
  authorIdx:   index("posts_author_idx").on(t.authorId),
  featuredIdx: index("posts_featured_idx").on(t.isFeatured),
  publishedIdx: index("posts_published_idx").on(t.publishedAt),
}));

/* ─── Post → Tags (many-to-many) ───────────────────────────── */
export const postTags = mysqlTable("post_tags", {
  postId: int("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
  tagId:  int("tag_id").notNull().references(() => tags.id, { onDelete: "cascade" }),
}, (t) => ({
  pk: index("post_tags_pk").on(t.postId, t.tagId),
}));

/* ─── Post Views (analytics) ───────────────────────────────── */
export const postViews = mysqlTable("post_views", {
  id:        bigint("id", { mode: "number" }).autoincrement().primaryKey(),
  postId:    int("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
  ip:        varchar("ip", { length: 60 }),
  userAgent: varchar("user_agent", { length: 500 }),
  referer:   varchar("referer", { length: 600 }),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (t) => ({
  postIdx: index("post_views_post_idx").on(t.postId),
  dateIdx: index("post_views_date_idx").on(t.createdAt),
}));

/* ─── Comments ──────────────────────────────────────────────── */
export const comments = mysqlTable("comments", {
  id:          int("id").autoincrement().primaryKey(),
  postId:      int("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
  parentId:    int("parent_id"),   // for threading
  authorName:  varchar("author_name", { length: 120 }).notNull(),
  authorEmail: varchar("author_email", { length: 255 }).notNull(),
  content:     text("content").notNull(),
  status:      mysqlEnum("status", ["pending", "approved", "spam"]).default("pending").notNull(),
  createdAt:   timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (t) => ({
  postIdx:   index("comments_post_idx").on(t.postId),
  statusIdx: index("comments_status_idx").on(t.status),
}));

/* ─── Media ─────────────────────────────────────────────────── */
export const media = mysqlTable("media", {
  id:          int("id").autoincrement().primaryKey(),
  filename:    varchar("filename", { length: 300 }).notNull(),
  originalName: varchar("original_name", { length: 300 }),
  url:         varchar("url", { length: 600 }).notNull(),
  mimeType:    varchar("mime_type", { length: 100 }),
  size:        int("size"),
  width:       int("width"),
  height:      int("height"),
  alt:         varchar("alt", { length: 300 }),
  uploadedBy:  int("uploaded_by").references(() => authors.id),
  createdAt:   timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

/* ─── Settings ──────────────────────────────────────────────── */
export const settings = mysqlTable("settings", {
  key:       varchar("key", { length: 120 }).primaryKey(),
  value:     text("value"),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
});

// Type exports
export type Author   = typeof authors.$inferSelect;
export type NewAuthor = typeof authors.$inferInsert;
export type Post     = typeof posts.$inferSelect;
export type NewPost  = typeof posts.$inferInsert;
export type Category = typeof categories.$inferSelect;
export type Tag      = typeof tags.$inferSelect;
export type Comment  = typeof comments.$inferSelect;
export type Media    = typeof media.$inferSelect;
