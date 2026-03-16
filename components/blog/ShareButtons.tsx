"use client";
import React, { useState } from "react";
import { Link as LinkIcon, Twitter, Linkedin } from "lucide-react";

interface ShareButtonsProps { title: string; slug: string; }

export default function ShareButtons({ title, slug }: ShareButtonsProps): React.ReactElement {
  const [copied, setCopied] = useState(false);
  const url = `https://edgecloudtech.co.ke/resources/${slug}`;
  const copy = (): void => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const btnStyle = (active?: boolean): React.CSSProperties => ({
    width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center",
    borderRadius: 6, background: active ? "rgba(0,162,255,0.08)" : "#F4F6F8",
    color: active ? "#00A2FF" : "#4A5568",
    border: `1px solid ${active ? "rgba(0,162,255,0.25)" : "#E5E8ED"}`,
    textDecoration: "none", cursor: "pointer",
  });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: "auto" }}>
      <span style={{ fontSize: 12, color: "#8B96A3", fontWeight: 500 }}>Share:</span>
      <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
         target="_blank" rel="noopener noreferrer" style={btnStyle()}><Twitter size={13} /></a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
         target="_blank" rel="noopener noreferrer" style={btnStyle()}><Linkedin size={13} /></a>
      <button onClick={copy} title="Copy link" style={btnStyle(copied) as React.CSSProperties & { cursor: string }}>
        <LinkIcon size={13} />
      </button>
    </div>
  );
}
