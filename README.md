# EdgeCloud Technologies – Marketing Website + Blog CMS

> **One Stack. Zero Pain. Full Trust.**

A complete Next.js 16 marketing website with a **fully functional MySQL-backed blog CMS** for EdgeCloud Technologies. Built with App Router, TypeScript, Drizzle ORM, TipTap rich-text editor, and a clean light-mode design system using **Plus Jakarta Sans** + **Instrument Serif**.

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
# Edit .env.local with your MySQL credentials and JWT secret
```

### 3. Set up MySQL database

```bash
# Create database and run schema migration
mysql -u root -p < db/migrations/0001_init.sql
```

### 4. Create your admin user

```bash
npx ts-node scripts/create-admin.ts
```

### 5. Start development

```bash
npm run dev
# → http://localhost:3000
# → Admin: http://localhost:3000/admin/login
```

---

## 🗄️ Database Schema

All tables are in `db/migrations/0001_init.sql`. Run it once to create everything.

| Table        | Purpose                                                 |
| ------------ | ------------------------------------------------------- |
| `authors`    | Admin/editor user accounts (bcrypt passwords, JWT auth) |
| `posts`      | Blog posts with full SEO fields, scheduling, status     |
| `categories` | Post categories with custom colour codes                |
| `tags`       | Many-to-many post tags                                  |
| `post_tags`  | Junction table (post ↔ tag)                             |
| `post_views` | View tracking per post                                  |
| `comments`   | Reader comments with moderation status                  |
| `media`      | Media library metadata                                  |
| `settings`   | Key-value blog configuration store                      |

### Entity relationships

```
authors ──< posts >──< post_tags >──< tags
posts   >──  categories
posts   ──<  post_views
posts   ──<  comments
```

---

## 📝 Blog Features

### Public

- **`/resources`** , Paginated blog index with category filters, tag filters, full-text search
- **`/resources/[slug]`** , Article page with:
  - Structured data (Article + BreadcrumbList JSON-LD)
  - `generateMetadata` for per-post Open Graph, Twitter cards, canonical URLs
  - `generateStaticParams` for SSG + ISR (revalidate every 5 min)
  - Reading time, view counter, social share buttons
  - Related posts by category
  - Tag links
  - Author byline

### Admin Panel (`/admin/*`)

- **Dashboard** , Stats overview (total posts, published, drafts, total views) + recent posts table
- **Posts list** (`/admin/posts`) , Sortable table with status filter, search, pagination
- **Post editor** (`/admin/posts/new` + `/admin/posts/[id]`) , Full TipTap rich-text editor with:
  - Toolbar: bold, italic, strike, code, H2, H3, lists, blockquote, links, images
  - Slug auto-generation from title
  - Category + tag assignment
  - Featured image with preview
  - Featured post / allow comments toggles
  - **SEO panel**: meta title/description with character counters + live SERP preview
  - No-index toggle
  - Save draft / Publish buttons
- **Categories** (`/admin/categories`) , Create categories with custom colour pickers
- **Tags** (`/admin/tags`) , Create and view tags
- **Settings** (`/admin/settings`) , Blog config + environment variable reference

---

## 🔑 Authentication

JWT-based, stored in an `httpOnly` cookie (`ec_admin_token`).

- Tokens expire after **7 days**
- Roles: `admin`, `editor`, `author`
- Only `admin` role can delete posts

**Create admin user:**

```bash
npx ts-node scripts/create-admin.ts
```

---

## 🎨 Design System

**Fonts:** `Plus Jakarta Sans` (UI / body) + `Instrument Serif` (editorial headings, hero text)

| Token       | Value     | Usage           |
| ----------- | --------- | --------------- |
| `--brand`   | `#00A2FF` | EdgeCloud Blue  |
| `--eza`     | `#00A389` | Eza Cloud Teal  |
| `--zuri`    | `#7C3AED` | ZuriMail Purple |
| `--bg`      | `#FAFBFC` | Page background |
| `--surface` | `#FFFFFF` | Cards / panels  |
| `--text`    | `#0F1923` | Primary text    |

---

## 📁 Project Structure

```
edgecloud/
├── app/
│   ├── admin/                   # CMS admin interface
│   │   ├── login/               # Login page
│   │   ├── dashboard/           # Stats + recent posts
│   │   ├── posts/               # Posts list
│   │   ├── posts/new/           # New post editor
│   │   ├── posts/[id]/          # Edit post editor
│   │   ├── categories/          # Category management
│   │   ├── tags/                # Tag management
│   │   └── settings/            # Blog settings
│   ├── api/
│   │   ├── auth/                # login / logout / me
│   │   ├── admin/posts/         # CRUD for posts (admin)
│   │   ├── admin/categories/    # Category CRUD
│   │   ├── admin/tags/          # Tag CRUD
│   │   └── blog/posts/[slug]/view/  # View counter
│   ├── resources/               # Public blog index (ISR)
│   ├── resources/[slug]/        # Public article page (SSG+ISR)
│   └── [... marketing pages]
├── components/
│   ├── AdminShell.tsx           # Admin sidebar + layout
│   ├── blog/
│   │   ├── PostEditor.tsx       # TipTap rich-text editor
│   │   ├── ViewTracker.tsx      # Client-side view counter
│   │   └── ShareButtons.tsx     # Social share buttons
│   └── sections/                # Home page sections
├── db/
│   ├── schema.ts                # Drizzle ORM table definitions
│   ├── index.ts                 # DB connection pool singleton
│   └── migrations/
│       └── 0001_init.sql        # Full schema + seed data SQL
├── lib/
│   ├── auth.ts                  # JWT auth, bcrypt helpers
│   ├── blog.ts                  # Data access layer for blog queries
│   ├── slugify.ts               # Slug generation utility
│   └── reading-time.ts          # Reading time calculator
├── scripts/
│   └── create-admin.ts          # CLI to create first admin user
├── drizzle.config.ts            # Drizzle Kit config (CLI only)
└── .env.local.example           # Environment variable template
```

---

## 🌐 SEO Implementation

Every blog post gets:

- `generateMetadata` , dynamic `<title>`, description, OG, Twitter card, canonical URL
- **Article JSON-LD** , `@type: Article` with author, dates, keywords
- **BreadcrumbList JSON-LD** , Home → Resources → Post
- ISR revalidation every 300 seconds (`export const revalidate = 300`)
- `generateStaticParams` , pre-renders all published slugs at build time

Global JSON-LD (in root layout):

- `Organization` , EdgeCloud Technologies entity
- `WebSite` + `SearchAction` , enables sitelinks search box

---

## 🔧 Adding Content

1. Go to `/admin/login`
2. Sign in with the admin account you created
3. Click **New Post** → write with the rich-text editor
4. Fill in SEO fields in the right sidebar
5. Click **Publish**

The post immediately appears at `/resources/[your-slug]`.

---

## 🚢 Deployment

### Vercel + PlanetScale / Aiven MySQL

```bash
npx vercel
# Set env vars: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, JWT_SECRET
```

### Self-hosted on Eza Cloud (recommended)

```bash
npm run build && npm start
# Run behind Nginx/Caddy reverse proxy on port 3000
# MySQL on the same server or a managed instance
```

### Generate Drizzle migrations (when schema changes)

```bash
npx drizzle-kit generate:mysql
npx drizzle-kit push:mysql
```

---

## ⚡ Environment Variables

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your-secure-password
DB_NAME=edgecloud_blog
JWT_SECRET=your-256-bit-random-secret
NEXT_PUBLIC_SITE_URL=https://edgecloud.co.ke
```

---

_Built with ❤️ for Kenya's digital ecosystem._
