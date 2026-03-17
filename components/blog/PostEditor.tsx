"use client";
import { useState, useRef } from "react";
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
  ImageIcon,
  Link as LinkIcon,
  Minus,
  Undo,
  Redo,
  Save,
  Send,
  ArrowLeft,
  ChevronDown,
  Upload,
  X,
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
  categories: { id: number; name: string; slug: string; color: string | null }[];
  tags: { id: number; name: string; slug: string }[];
}

const BTN: React.CSSProperties = {
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "6px",
  borderRadius: 4,
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
  border: "1.5px solid #D4DBE2",
  borderRadius: 4,
  padding: "8px 11px",
  fontFamily: "'Plus Jakarta Sans',sans-serif",
  fontSize: 13,
  color: "#0B1016",
  outline: "none",
  background: "white",
  boxSizing: "border-box",
};
const LABEL: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#7B8FA0",
  marginBottom: 5,
};

/* ── Reusable image uploader ───────────────────────────────── */
function ImageUploader({
  value,
  onChange,
  onUpload,
  placeholder = "https://…",
  label = "Image URL",
}: {
  value: string;
  onChange: (url: string) => void;
  onUpload?: (url: string) => void;
  placeholder?: string;
  label?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file: File) => {
    setUploading(true);
    setError("");
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/admin/media/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      onChange(data.url);
      onUpload?.(data.url);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label style={LABEL}>{label}</label>

      {/* URL input row */}
      <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ ...INPUT, flex: 1 }}
        />
        <button
          type="button"
          title="Upload from computer"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          style={{
            ...BTN,
            border: "1.5px solid #D4DBE2",
            borderRadius: 4,
            padding: "0 10px",
            height: 36,
            background: uploading ? "#F4F6F8" : "white",
            color: "#00A2FF",
            flexShrink: 0,
          }}
        >
          <Upload size={14} />
        </button>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        style={{ display: "none" }}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
          e.target.value = "";
        }}
      />

      {uploading && <p style={{ fontSize: 11, color: "#00A2FF", marginTop: 4 }}>Uploading…</p>}
      {error && <p style={{ fontSize: 11, color: "#DC2626", marginTop: 4 }}>{error}</p>}

      {/* Preview */}
      {value && !uploading && (
        <div style={{ position: "relative", marginTop: 8 }}>
          <img
            src={value}
            alt="preview"
            style={{
              width: "100%",
              height: 120,
              objectFit: "cover",
              borderRadius: 4,
              border: "1.5px solid #D4DBE2",
              display: "block",
            }}
          />
          <button
            type="button"
            onClick={() => onChange("")}
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              background: "rgba(0,0,0,0.55)",
              border: "none",
              borderRadius: "50%",
              width: 22,
              height: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "white",
            }}
          >
            <X size={12} />
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Main editor ───────────────────────────────────────────── */
export default function PostEditor({ postId, initialData, categories, tags }: PostEditorProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [seoOpen, setSeoOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(true);

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [featuredImage, setFeaturedImage] = useState(initialData?.featuredImage || "");
  const [featuredImageAlt, setFeaturedImageAlt] = useState(initialData?.featuredImageAlt || "");
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || "");
  const [metaDesc, setMetaDesc] = useState(initialData?.metaDescription || "");
  const [status, setStatus] = useState(initialData?.status || "draft");
  const [categoryId, setCategoryId] = useState<number | null>(initialData?.categoryId || null);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>(initialData?.tagIds || []);
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured || false);
  const [noIndex, setNoIndex] = useState(initialData?.noIndex || false);
  const [allowComments, setAllowComments] = useState(initialData?.allowComments !== false);

  // Auto-slug from title (new posts only)
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!postId && !initialData?.slug) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
      );
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      ImageExt.configure({ HTMLAttributes: { class: "rounded" } }),
      LinkExt.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Start writing your article…" }),
      Typography,
      CharacterCount,
    ],
    content: (() => {
      const raw = initialData?.content;
      if (!raw) return "";
      if (typeof raw === "string" && raw.startsWith("{")) {
        try {
          return JSON.parse(raw);
        } catch {
          return raw;
        }
      }
      return raw;
    })(),
    editorProps: { attributes: { class: "focus:outline-none" } },
  });

  const inlineImageRef = useRef<HTMLInputElement>(null);

  const insertImageByUrl = () => {
    const url = window.prompt("Image URL:");
    if (url && editor) editor.chain().focus().setImage({ src: url }).run();
  };

  const insertImageByUpload = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/media/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (res.ok && editor) {
      editor.chain().focus().setImage({ src: data.url }).run();
    }
  };

  const addLink = () => {
    const url = window.prompt("Link URL:");
    if (url && editor) editor.chain().focus().setLink({ href: url }).run();
  };

  /* ── Save ── */
  const save = async (publishNow = false) => {
    if (!title.trim() || !editor) return;
    setSaving(true);
    const targetStatus = publishNow ? "published" : status;
    const payload = {
      title,
      slug,
      excerpt,
      content: JSON.stringify(editor.getJSON()),
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
    setSelectedTagIds((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button
      type="button"
      onClick={onChange}
      style={{
        width: 40,
        height: 22,
        borderRadius: 11,
        background: value ? "#00A2FF" : "#D4DBE2",
        border: "none",
        cursor: "pointer",
        position: "relative",
        transition: "background 0.15s",
        flexShrink: 0,
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
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }}
      />
    </button>
  );

  if (!editor)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          color: "#7B8FA0",
          fontFamily: "'Plus Jakarta Sans',sans-serif",
        }}
      >
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
        background: "#F9FAFB",
      }}
    >
      {/* ── Main area ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top bar */}
        <div
          style={{
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
            borderBottom: "1px solid #D4DBE2",
            background: "white",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => router.push("/admin/posts")}
              style={{ ...BTN, gap: 5, fontSize: 13, fontWeight: 500, color: "#7B8FA0" }}
            >
              <ArrowLeft size={14} /> Posts
            </button>
            <span style={{ color: "#D4DBE2" }}>|</span>
            <span
              style={{
                padding: "3px 10px",
                borderRadius: 2,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                background: status === "published" ? "#ECFDF5" : "#FFFBEB",
                color: status === "published" ? "#059669" : "#D97706",
              }}
            >
              {status}
            </span>
            {saved && (
              <span style={{ fontSize: 12, color: "#059669", fontWeight: 600 }}>✓ Saved</span>
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
                  padding: "8px 14px",
                  border: "1.5px solid #D4DBE2",
                  background: "white",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: 13,
                  color: "#3D4E5C",
                  borderRadius: 4,
                }}
              >
                <Save size={13} /> {saving ? "Saving…" : "Save Draft"}
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
                border: "none",
                background: "#00A2FF",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: 13,
                color: "white",
                borderRadius: 4,
                boxShadow: "0 2px 8px rgba(0,162,255,0.3)",
              }}
            >
              <Send size={13} />
              {status === "published" ? (saving ? "Saving…" : "Update") : "Publish"}
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
            padding: "6px 16px",
            borderBottom: "1px solid #D4DBE2",
            background: "white",
            flexShrink: 0,
          }}
        >
          {[
            { icon: Undo, action: () => editor.chain().focus().undo().run(), title: "Undo" },
            { icon: Redo, action: () => editor.chain().focus().redo().run(), title: "Redo" },
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
              title: "Inline code",
            },
            null,
            {
              icon: Heading2,
              action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
              active: editor.isActive("heading", { level: 2 }),
              title: "H2",
            },
            {
              icon: Heading3,
              action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
              active: editor.isActive("heading", { level: 3 }),
              title: "H3",
            },
            null,
            {
              icon: List,
              action: () => editor.chain().focus().toggleBulletList().run(),
              active: editor.isActive("bulletList"),
              title: "Bullet list",
            },
            {
              icon: ListOrdered,
              action: () => editor.chain().focus().toggleOrderedList().run(),
              active: editor.isActive("orderedList"),
              title: "Numbered list",
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
            { icon: LinkIcon, action: addLink, active: editor.isActive("link"), title: "Add link" },
            { icon: ImageIcon, action: insertImageByUrl, title: "Insert image (URL)" },
          ].map((item, i) =>
            item === null ? (
              <div
                key={i}
                style={{ width: 1, height: 20, background: "#E6EAEE", margin: "0 3px" }}
              />
            ) : (
              <button
                key={i}
                onClick={item.action}
                title={item.title}
                style={item.active ? ACTIVE_BTN : BTN}
              >
                <item.icon size={14} />
              </button>
            ),
          )}

          {/* Upload image button */}
          <button
            onClick={() => inlineImageRef.current?.click()}
            title="Upload image from computer"
            style={{
              ...BTN,
              border: "1.5px solid #D4DBE2",
              padding: "5px 8px",
              marginLeft: 4,
              color: "#00A2FF",
            }}
          >
            <Upload size={13} />
          </button>
          <input
            ref={inlineImageRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            style={{ display: "none" }}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) insertImageByUpload(f);
              e.target.value = "";
            }}
          />

          <div style={{ marginLeft: "auto", fontSize: 11, color: "#BDC8D2", fontWeight: 500 }}>
            {wordCount.toLocaleString()} words
          </div>
        </div>

        {/* Title + content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "40px 48px", background: "#F9FAFB" }}>
          <div style={{ maxWidth: 740, margin: "0 auto" }}>
            <input
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Post title…"
              style={{
                width: "100%",
                border: "none",
                background: "transparent",
                fontFamily: "'Instrument Serif', serif",
                fontSize: 38,
                fontWeight: 400,
                color: "#0B1016",
                outline: "none",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                marginBottom: 24,
                padding: 0,
                boxSizing: "border-box",
              }}
            />
            <div
              style={{
                background: "white",
                border: "1px solid #D4DBE2",
                padding: "24px 28px",
                minHeight: 480,
                boxShadow: "0 1px 4px rgba(11,16,22,0.04)",
              }}
            >
              <EditorContent editor={editor} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Right sidebar ── */}
      <aside
        style={{
          width: 288,
          background: "white",
          borderLeft: "1px solid #D4DBE2",
          overflowY: "auto",
          flexShrink: 0,
        }}
      >
        {/* Post Settings */}
        <div style={{ borderBottom: "1px solid #E6EAEE" }}>
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              padding: "13px 16px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 12,
              color: "#0B1016",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Post Settings
            <ChevronDown
              size={13}
              style={{
                transform: settingsOpen ? "rotate(180deg)" : "none",
                transition: "transform 0.2s",
                color: "#BDC8D2",
              }}
            />
          </button>

          {settingsOpen && (
            <div
              style={{ padding: "0 14px 16px", display: "flex", flexDirection: "column", gap: 14 }}
            >
              {/* Slug */}
              <div>
                <label style={LABEL}>URL Slug</label>
                <input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  style={INPUT}
                  placeholder="my-post-slug"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label style={LABEL}>Excerpt</label>
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
                <label style={LABEL}>Category</label>
                <select
                  value={categoryId ?? ""}
                  onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : null)}
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
                <label style={LABEL}>Tags</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {tags.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(tag.id)}
                      style={{
                        padding: "3px 9px",
                        borderRadius: 2,
                        fontSize: 11,
                        fontWeight: 600,
                        cursor: "pointer",
                        border: "1.5px solid",
                        background: selectedTagIds.includes(tag.id) ? "#00A2FF" : "white",
                        color: selectedTagIds.includes(tag.id) ? "white" : "#3D4E5C",
                        borderColor: selectedTagIds.includes(tag.id) ? "#00A2FF" : "#D4DBE2",
                      }}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Featured image — uses the uploader component */}
              <ImageUploader
                label="Featured Image"
                value={featuredImage}
                onChange={setFeaturedImage}
                placeholder="https://… or upload ↑"
              />

              {featuredImage && (
                <div>
                  <label style={LABEL}>Image Alt Text</label>
                  <input
                    value={featuredImageAlt}
                    onChange={(e) => setFeaturedImageAlt(e.target.value)}
                    style={INPUT}
                    placeholder="Describe the image…"
                  />
                </div>
              )}

              {/* Toggles */}
              {[
                {
                  label: "Featured post",
                  value: isFeatured,
                  onChange: () => setIsFeatured(!isFeatured),
                },
                {
                  label: "Allow comments",
                  value: allowComments,
                  onChange: () => setAllowComments(!allowComments),
                },
              ].map(({ label, value, onChange }) => (
                <div
                  key={label}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                >
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#3D4E5C" }}>{label}</span>
                  <Toggle value={value} onChange={onChange} />
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
              padding: "13px 16px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 12,
              color: "#0B1016",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            SEO & Meta
            <ChevronDown
              size={13}
              style={{
                transform: seoOpen ? "rotate(180deg)" : "none",
                transition: "transform 0.2s",
                color: "#BDC8D2",
              }}
            />
          </button>

          {seoOpen && (
            <div
              style={{ padding: "0 14px 16px", display: "flex", flexDirection: "column", gap: 14 }}
            >
              <div>
                <label style={LABEL}>
                  Meta Title{" "}
                  <span
                    style={{
                      fontWeight: 400,
                      color: metaTitle.length > 60 ? "#DC2626" : "#BDC8D2",
                    }}
                  >
                    ({metaTitle.length}/60)
                  </span>
                </label>
                <input
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  style={INPUT}
                  placeholder="SEO title"
                  maxLength={80}
                />
              </div>

              <div>
                <label style={LABEL}>
                  Meta Description{" "}
                  <span
                    style={{
                      fontWeight: 400,
                      color: metaDesc.length > 160 ? "#DC2626" : "#BDC8D2",
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

              {/* SERP Preview */}
              {(metaTitle || title) && (
                <div
                  style={{
                    background: "#F9FAFB",
                    border: "1px solid #E6EAEE",
                    padding: "12px 14px",
                  }}
                >
                  <p
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#BDC8D2",
                      marginBottom: 6,
                    }}
                  >
                    SERP Preview
                  </p>
                  <p
                    style={{
                      fontSize: 15,
                      color: "#1A0DAB",
                      fontWeight: 500,
                      marginBottom: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {metaTitle || title}
                  </p>
                  <p style={{ fontSize: 12, color: "#006621", marginBottom: 4 }}>
                    edgecloud.co.ke/resources/{slug}
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#545454",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical" as const,
                    }}
                  >
                    {metaDesc || excerpt || "No description."}
                  </p>
                </div>
              )}

              <div
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                <span style={{ fontSize: 13, fontWeight: 500, color: "#3D4E5C" }}>No-index</span>
                <Toggle value={noIndex} onChange={() => setNoIndex(!noIndex)} />
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
