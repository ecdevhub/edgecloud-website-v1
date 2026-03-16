"use client";
import { useEffect } from "react";
export default function ViewTracker({ slug }: { slug: string }): null {
  useEffect(() => {
    fetch(`/api/blog/posts/${slug}/view`, { method: "POST" }).catch(() => {});
  }, [slug]);
  return null;
}
