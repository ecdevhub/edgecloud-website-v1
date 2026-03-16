"use client";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExt from "@tiptap/extension-image";
import LinkExt from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import CharacterCount from "@tiptap/extension-character-count";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Link as LinkIcon,
  Minus,
  Undo,
  Redo,
  Save,
  Send,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";

interface PostEditorProps {
  postId?: number;
  initialData?: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    contentHtml: string;
    featuredImage: string;
    featuredImageAlt: string;
    metaTitle: string;
    metaDescription: string;
    status: string;
    categoryId: number | null;
    tagIds: number[];
    isFeatured: boolean;
    noIndex: boolean;
    allowComments: boolean;
  };
  categories: {
    id: number;
    name: string;
    slug: string;
    color: string | null;
  }[];
  tags: { id: number; name: string; slug: string }[];
}

const BTN: React.CSSProperties = {
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "6px",
  borderRadius: 6,
  color: "#4A5568",
  display: "flex",
  transition: "all 0.12s",
};
const ACTIVE_BTN: React.CSSProperties = {
  ...BTN,
  background: "rgba(0,162,255,0.1)",
  color: "#00A2FF",
};
const INPUT: React.CSSProperties = {
  width: "100%",
  border: "1.5px solid #E5E8ED",
  borderRadius: 9,
  padding: "9px 12px",
  fontFamily: "'Plus Jakarta Sans',sans-serif",
  fontSize: 14,
  color: "#0F1923",
  outline: "none",
  background: "white",
};

export default function PostEditor({
  postId,
  initialData,
  categories,
  tags,
}: PostEditorProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [seoOpen, setSeoOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(true);

  const [title, setTitle] = useState(initialData?.title || "");

  const [slugManual, setSlugManual] = useState(initialData?.slug || "");
  const slug =
    !postId && !initialData?.slug && title
      ? title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
      : slugManual;

  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [featuredImage, setFeaturedImage] = useState(
    initialData?.featuredImage || "",
  );
  const [featuredImageAlt, setFeaturedImageAlt] = useState(
    initialData?.featuredImageAlt || "",
  );
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || "");
  const [metaDesc, setMetaDesc] = useState(initialData?.metaDescription || "");
  const [status, setStatus] = useState(initialData?.status || "draft");
  const [categoryId, setCategoryId] = useState<number | null>(
    initialData?.categoryId || null,
  );
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>(
    initialData?.tagIds || [],
  );
  const [isFeatured, setIsFeatured] = useState(
    initialData?.isFeatured || false,
  );
  const [noIndex, setNoIndex] = useState(initialData?.noIndex || false);
  const [allowComments, setAllowComments] = useState(
    initialData?.allowComments !== false,
  );

  // Auto-slug from title
  // useEffect(() => {
  //   if (!postId && title && !initialData?.slug) {
  //     setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
  //   }
  // }, [title, postId, initialData?.slug]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      ImageExt.configure({ HTMLAttributes: { class: "rounded-lg" } }),
      LinkExt.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Start writing your article…" }),
      Typography,
      CharacterCount,
    ],
    content: initialData?.content || "",
    editorProps: { attributes: { class: "focus:outline-none" } },
  });

  const addImage = () => {
    const url = window.prompt("Image URL:");
    if (url && editor) editor.chain().focus().setImage({ src: url }).run();
  };
  const addLink = () => {
    const url = window.prompt("Link URL:");
    if (url && editor) editor.chain().focus().setLink({ href: url }).run();
  };

  const save = async (publishNow = false) => {
    if (!title.trim() || !editor) return;
    setSaving(true);
    const targetStatus = publishNow ? "published" : status;
    const payload = {
      title,
      slug,
      excerpt,
      content: editor.getJSON(),
      contentHtml: editor.getHTML(),
      featuredImage,
      featuredImageAlt,
      metaTitle,
      metaDescription: metaDesc,
      status: targetStatus,
      categoryId,
      tagIds: selectedTagIds,
      isFeatured,
      noIndex,
      allowComments,
    };

    const url = postId ? `/api/admin/posts/${postId}` : "/api/admin/posts";
    const method = postId ? "PATCH" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      if (!postId && data.post?.id) router.push(`/admin/posts/${data.post.id}`);
      if (publishNow) setStatus("published");
    } else {
      alert(data.error || "Save failed");
    }
  };

  const toggleTag = (id: number) =>
    setSelectedTagIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );

  if (!editor)
    return (
      <div style={{ padding: 40, textAlign: "center", color: "#8B96A3" }}>
        Loading editor…
      </div>
    );

  const wordCount = editor.storage.characterCount?.words() ?? 0;

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "'Plus Jakarta Sans',sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Main editor area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            height: 56,
            borderBottom: "1px solid #E5E8ED",
            background: "white",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => router.push("/admin/posts")}
              style={{
                ...BTN,
                gap: 5,
                fontSize: 13,
                fontWeight: 500,
                color: "#8B96A3",
              }}
            >
              <ArrowLeft size={14} /> Posts
            </button>
            <span style={{ color: "#E5E8ED" }}>|</span>
            <span
              style={{
                padding: "3px 10px",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                background: status === "published" ? "#ECFDF5" : "#FFFBEB",
                color: status === "published" ? "#059669" : "#D97706",
              }}
            >
              {status}
            </span>
            {saved && (
              <span style={{ fontSize: 12, color: "#059669", fontWeight: 600 }}>
                ✓ Saved
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {status !== "published" && (
              <button
                onClick={() => save(false)}
                disabled={saving}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 16px",
                  borderRadius: 9,
                  border: "1.5px solid #E5E8ED",
                  background: "white",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: 13,
                  color: "#4A5568",
                }}
              >
                <Save size={14} /> {saving ? "Saving…" : "Save Draft"}
              </button>
            )}
            <button
              onClick={() => save(status !== "published")}
              disabled={saving}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                borderRadius: 9,
                border: "none",
                background: "#00A2FF",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: 13,
                color: "white",
                boxShadow: "0 2px 8px rgba(0,162,255,0.3)",
              }}
            >
              <Send size={14} />{" "}
              {status === "published"
                ? saving
                  ? "Saving…"
                  : "Update"
                : "Publish"}
            </button>
          </div>
        </div>

        {/* Editor toolbar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            padding: "6px 20px",
            borderBottom: "1px solid #E5E8ED",
            background: "white",
            flexShrink: 0,
          }}
        >
          {[
            {
              icon: Undo,
              action: () => editor.chain().focus().undo().run(),
              title: "Undo",
            },
            {
              icon: Redo,
              action: () => editor.chain().focus().redo().run(),
              title: "Redo",
            },
            null,
            {
              icon: Bold,
              action: () => editor.chain().focus().toggleBold().run(),
              active: editor.isActive("bold"),
              title: "Bold",
            },
            {
              icon: Italic,
              action: () => editor.chain().focus().toggleItalic().run(),
              active: editor.isActive("italic"),
              title: "Italic",
            },
            {
              icon: Strikethrough,
              action: () => editor.chain().focus().toggleStrike().run(),
              active: editor.isActive("strike"),
              title: "Strike",
            },
            {
              icon: Code,
              action: () => editor.chain().focus().toggleCode().run(),
              active: editor.isActive("code"),
              title: "Code",
            },
            null,
            {
              icon: Heading2,
              action: () =>
                editor.chain().focus().toggleHeading({ level: 2 }).run(),
              active: editor.isActive("heading", { level: 2 }),
              title: "H2",
            },
            {
              icon: Heading3,
              action: () =>
                editor.chain().focus().toggleHeading({ level: 3 }).run(),
              active: editor.isActive("heading", { level: 3 }),
              title: "H3",
            },
            null,
            {
              icon: List,
              action: () => editor.chain().focus().toggleBulletList().run(),
              active: editor.isActive("bulletList"),
              title: "Bullet List",
            },
            {
              icon: ListOrdered,
              action: () => editor.chain().focus().toggleOrderedList().run(),
              active: editor.isActive("orderedList"),
              title: "Numbered List",
            },
            {
              icon: Quote,
              action: () => editor.chain().focus().toggleBlockquote().run(),
              active: editor.isActive("blockquote"),
              title: "Blockquote",
            },
            {
              icon: Minus,
              action: () => editor.chain().focus().setHorizontalRule().run(),
              title: "Divider",
            },
            null,
            {
              icon: LinkIcon,
              action: addLink,
              active: editor.isActive("link"),
              title: "Add Link",
            },
            { icon: ImageIcon, action: addImage, title: "Add Image" },
          ].map((item, i) =>
            item === null ? (
              <div
                key={i}
                style={{
                  width: 1,
                  height: 20,
                  background: "#E5E8ED",
                  margin: "0 4px",
                }}
              />
            ) : (
              <button
                key={i}
                onClick={item.action}
                title={item.title}
                style={item.active ? ACTIVE_BTN : BTN}
                onMouseEnter={(e) => {
                  if (!item.active)
                    (e.currentTarget as HTMLElement).style.background =
                      "#F4F6F8";
                }}
                onMouseLeave={(e) => {
                  if (!item.active)
                    (e.currentTarget as HTMLElement).style.background = "none";
                }}
              >
                <item.icon size={15} />
              </button>
            ),
          )}
          <div style={{ marginLeft: "auto", fontSize: 12, color: "#8B96A3" }}>
            {wordCount.toLocaleString()} words
          </div>
        </div>

        {/* Title + content area */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "40px 60px",
            background: "#FAFBFC",
          }}
        >
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title…"
              style={{
                width: "100%",
                border: "none",
                background: "transparent",
                fontFamily: "'Instrument Serif',serif",
                fontSize: 38,
                fontWeight: 400,
                color: "#0F1923",
                outline: "none",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                marginBottom: 24,
                padding: 0,
              }}
            />
            <div
              style={{
                background: "white",
                borderRadius: 12,
                padding: "24px 32px",
                border: "1px solid #E5E8ED",
                minHeight: 480,
                boxShadow: "0 1px 8px rgba(15,25,35,0.04)",
              }}
            >
              <EditorContent editor={editor} />
            </div>
          </div>
        </div>
      </div>

      {/* Right sidebar */}
      <aside
        style={{
          width: 300,
          background: "white",
          borderLeft: "1px solid #E5E8ED",
          overflowY: "auto",
          flexShrink: 0,
        }}
      >
        {/* Post Settings */}
        <div style={{ borderBottom: "1px solid #E5E8ED" }}>
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              padding: "14px 16px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 13,
              color: "#0F1923",
            }}
          >
            Post Settings{" "}
            <ChevronDown
              size={14}
              style={{
                transform: settingsOpen ? "rotate(180deg)" : "none",
                transition: "transform 0.2s",
              }}
            />
          </button>
          {settingsOpen && (
            <div
              style={{
                padding: "0 16px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              {/* Slug */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#8B96A3",
                    marginBottom: 5,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  URL Slug
                </label>
                <input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  style={INPUT}
                  placeholder="my-post-slug"
                />
              </div>
              {/* Excerpt */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#8B96A3",
                    marginBottom: 5,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Excerpt
                </label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={3}
                  style={{ ...INPUT, resize: "vertical" }}
                  placeholder="Brief description…"
                />
              </div>
              {/* Category */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#8B96A3",
                    marginBottom: 5,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Category
                </label>
                <select
                  value={categoryId ?? ""}
                  onChange={(e) =>
                    setCategoryId(
                      e.target.value ? Number(e.target.value) : null,
                    )
                  }
                  style={{ ...INPUT, cursor: "pointer" }}
                >
                  <option value="">No category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Tags */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#8B96A3",
                    marginBottom: 8,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Tags
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {tags.map((tag) => (
                    <button
                      key={tag.id}
                      onClick={() => toggleTag(tag.id)}
                      style={{
                        padding: "4px 10px",
                        borderRadius: 999,
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                        border: "1.5px solid",
                        background: selectedTagIds.includes(tag.id)
                          ? "#00A2FF"
                          : "white",
                        color: selectedTagIds.includes(tag.id)
                          ? "white"
                          : "#4A5568",
                        borderColor: selectedTagIds.includes(tag.id)
                          ? "#00A2FF"
                          : "#E5E8ED",
                      }}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>
              {/* Featured image */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#8B96A3",
                    marginBottom: 5,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Featured Image URL
                </label>
                <input
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  style={INPUT}
                  placeholder="https://…"
                />

                {featuredImage && (
                  <img
                    src={featuredImage}
                    alt="preview"
                    style={{
                      width: "100%",
                      height: 120,
                      objectFit: "cover",
                      borderRadius: 8,
                      marginTop: 8,
                      border: "1px solid #E5E8ED",
                    }}
                  />
                )}

                <input
                  value={featuredImageAlt}
                  onChange={(e) => setFeaturedImageAlt(e.target.value)}
                  style={{ ...INPUT, marginTop: 6, fontSize: 12 }}
                  placeholder="Alt text"
                />
              </div>
              {/* Toggles */}
              {[
                {
                  label: "Featured post",
                  value: isFeatured,
                  set: setIsFeatured,
                },
                {
                  label: "Allow comments",
                  value: allowComments,
                  set: setAllowComments,
                },
              ].map(({ label, value, set }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{ fontSize: 13, fontWeight: 500, color: "#4A5568" }}
                  >
                    {label}
                  </span>
                  <button
                    onClick={() => set(!value)}
                    style={{
                      width: 40,
                      height: 22,
                      borderRadius: 11,
                      background: value ? "#00A2FF" : "#E5E8ED",
                      border: "none",
                      cursor: "pointer",
                      position: "relative",
                      transition: "background 0.15s",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 2,
                        left: value ? 20 : 2,
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: "white",
                        transition: "left 0.15s",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                      }}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SEO */}
        <div>
          <button
            onClick={() => setSeoOpen(!seoOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              padding: "14px 16px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 13,
              color: "#0F1923",
              borderBottom: seoOpen ? "none" : "1px solid #E5E8ED",
            }}
          >
            SEO & Meta{" "}
            <ChevronDown
              size={14}
              style={{
                transform: seoOpen ? "rotate(180deg)" : "none",
                transition: "transform 0.2s",
              }}
            />
          </button>
          {seoOpen && (
            <div
              style={{
                padding: "0 16px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
                borderBottom: "1px solid #E5E8ED",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#8B96A3",
                    marginBottom: 5,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Meta Title{" "}
                  <span
                    style={{
                      fontWeight: 400,
                      color: metaTitle.length > 60 ? "#DC2626" : "#8B96A3",
                    }}
                  >
                    ({metaTitle.length}/60)
                  </span>
                </label>
                <input
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  style={INPUT}
                  placeholder="SEO title (defaults to post title)"
                  maxLength={80}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#8B96A3",
                    marginBottom: 5,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Meta Description{" "}
                  <span
                    style={{
                      fontWeight: 400,
                      color: metaDesc.length > 160 ? "#DC2626" : "#8B96A3",
                    }}
                  >
                    ({metaDesc.length}/160)
                  </span>
                </label>
                <textarea
                  value={metaDesc}
                  onChange={(e) => setMetaDesc(e.target.value)}
                  rows={3}
                  style={{ ...INPUT, resize: "vertical" }}
                  placeholder="Brief SEO description…"
                  maxLength={200}
                />
              </div>
              {/* SERP preview */}
              {(metaTitle || title) && (
                <div
                  style={{
                    background: "#F4F6F8",
                    border: "1px solid #E5E8ED",
                    borderRadius: 8,
                    padding: "12px 14px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#8B96A3",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: 6,
                    }}
                  >
                    SERP Preview
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      color: "#1A0DAB",
                      fontWeight: 500,
                      marginBottom: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {metaTitle || title}
                  </div>
                  <div
                    style={{ fontSize: 12, color: "#006621", marginBottom: 4 }}
                  >
                    edgecloudtech.co.ke/resources/{slug}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#545454",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical" as const,
                    }}
                  >
                    {metaDesc || excerpt || "No description provided."}
                  </div>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{ fontSize: 13, fontWeight: 500, color: "#4A5568" }}
                >
                  No-index (hide from search)
                </span>
                <button
                  onClick={() => setNoIndex(!noIndex)}
                  style={{
                    width: 40,
                    height: 22,
                    borderRadius: 11,
                    background: noIndex ? "#DC2626" : "#E5E8ED",
                    border: "none",
                    cursor: "pointer",
                    position: "relative",
                    transition: "background 0.15s",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 2,
                      left: noIndex ? 20 : 2,
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: "white",
                      transition: "left 0.15s",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                    }}
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
