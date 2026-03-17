"use client";

import { useEffect, useRef, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface Props {
  contentHtml: string;
}

export default function TableOfContents({ contentHtml }: Props) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // ─── Step 1: Read headings from the LIVE DOM ──────────────────────────────
  // We do this instead of parsing contentHtml so we always use the exact `id`
  // values that are actually on the page — no slug mismatch possible.
  useEffect(() => {
    function scanHeadings() {
      // Scope to the prose container so we don't accidentally pick up
      // headings from the hero or related-posts section.
      const prose =
        document.querySelector(".prose") ?? document.querySelector("article") ?? document;

      const els = Array.from(prose.querySelectorAll("h2, h3")) as HTMLElement[];

      if (els.length === 0) return false; // signal: not ready yet

      const extracted: TocItem[] = els.map((el, i) => {
        // If the heading has no id (addHeadingIds wasn't run server-side),
        // generate one now and set it on the element so the anchor works.
        if (!el.id) {
          const text = el.textContent?.trim() ?? "";
          el.id =
            text
              .toLowerCase()
              .replace(/[^a-z0-9\s-]/g, "")
              .replace(/\s+/g, "-")
              .replace(/-+/g, "-")
              .slice(0, 60) || `heading-${i}`;
        }
        return {
          id: el.id,
          text: el.textContent?.trim() ?? "",
          level: parseInt(el.tagName[1], 10),
        };
      });

      setItems(extracted);
      return true; // signal: done
    }

    // Try immediately; if the prose hasn't rendered yet (e.g. hydration lag),
    // retry once after a short delay.
    if (!scanHeadings()) {
      const t = setTimeout(scanHeadings, 300);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentHtml]);

  // ─── Step 2: IntersectionObserver — highlight active heading ─────────────
  useEffect(() => {
    if (items.length === 0) return;

    const headingEls = items
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (headingEls.length === 0) return;

    observerRef.current?.disconnect();

    // Keep a map of id → whether it's currently intersecting
    const intersecting = new Map<string, boolean>(headingEls.map((el) => [el.id, false]));

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          intersecting.set(entry.target.id, entry.isIntersecting);
        });

        // Active = the topmost heading that is currently intersecting.
        // If nothing is intersecting (user is between headings), keep last active.
        const firstVisible = headingEls.find((el) => intersecting.get(el.id));
        if (firstVisible) setActiveId(firstVisible.id);
      },
      {
        // Fire when heading crosses the upper ~25% of the viewport.
        // Negative bottom margin means we ignore headings in the lower 65%.
        rootMargin: "-88px 0px -65% 0px",
        threshold: 0,
      },
    );

    headingEls.forEach((el) => observerRef.current!.observe(el));

    return () => observerRef.current?.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {items.map((item) => {
          const isActive = activeId === item.id;
          const isH3 = item.level === 3;

          return (
            <li key={item.id} style={{ paddingLeft: isH3 ? "14px" : "0" }}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(item.id);
                  if (!target) return;
                  // 96px = fixed navbar height; adjust if yours differs
                  const y = target.getBoundingClientRect().top + window.scrollY - 96;
                  window.scrollTo({ top: y, behavior: "smooth" });
                  // Optimistically set active so the highlight is instant
                  setActiveId(item.id);
                }}
                style={{
                  display: "block",
                  padding: "5px 10px",
                  marginBottom: "1px",
                  fontSize: isH3 ? "11.5px" : "12.5px",
                  fontFamily: "var(--font-display)",
                  fontWeight: isActive ? 700 : 500,
                  lineHeight: 1.45,
                  color: isActive
                    ? "var(--color-brand)"
                    : isH3
                      ? "var(--color-ink-300)"
                      : "var(--color-ink-500)",
                  borderLeft: `2px solid ${
                    isActive ? "var(--color-brand)" : "var(--color-wire-200)"
                  }`,
                  background: isActive ? "rgba(0,162,255,0.05)" : "transparent",
                  textDecoration: "none",
                  transition: "color 0.15s ease, border-color 0.15s ease, background 0.15s ease",
                  wordBreak: "break-word",
                  borderRadius: "0 2px 2px 0",
                }}
                onMouseEnter={(e) => {
                  if (isActive) return;
                  const a = e.currentTarget as HTMLAnchorElement;
                  a.style.color = "var(--color-ink-900)";
                  a.style.borderLeftColor = "var(--color-ink-300)";
                }}
                onMouseLeave={(e) => {
                  if (isActive) return;
                  const a = e.currentTarget as HTMLAnchorElement;
                  a.style.color = isH3 ? "var(--color-ink-300)" : "var(--color-ink-500)";
                  a.style.borderLeftColor = "var(--color-wire-200)";
                }}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
