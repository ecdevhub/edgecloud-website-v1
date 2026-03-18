import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://edgecloud.co.ke";

  return {
    rules: [
      {
        // Main crawler rules for all well-behaved bots
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/", // entire admin area
          "/api/", // all API routes - no value to index
          "/_next/", // Next.js internals
          "/cdn-cgi/", // Cloudflare internals if applicable
        ],
      },
      {
        // Block GPTBot (OpenAI) from training on your content
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        // Block Google-Extended (Bard/Gemini training crawler)
        userAgent: "Google-Extended",
        disallow: "/",
      },
      {
        // Block CCBot (Common Crawl - used for AI training datasets)
        userAgent: "CCBot",
        disallow: "/",
      },
      {
        // Block anthropic's own training crawler (good practice)
        userAgent: "anthropic-ai",
        disallow: "/",
      },
      {
        // Block Meta's AI training crawler
        userAgent: "FacebookBot",
        disallow: "/",
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
