"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Tags,
  Image,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  PlusCircle,
  ExternalLink,
} from "lucide-react";

const NAV = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/posts", icon: FileText, label: "Posts" },
  { href: "/admin/categories", icon: FolderOpen, label: "Categories" },
  { href: "/admin/tags", icon: Tags, label: "Tags" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

export default function AdminShell({
  children,
  user,
}: {
  children: React.ReactNode;
  user: { name: string; email: string; role: string };
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F4F6F8",
        fontFamily: "'Plus Jakarta Sans',sans-serif",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: sidebarOpen ? 240 : 64,
          flexShrink: 0,
          background: "white",
          borderRight: "1px solid #E5E8ED",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.2s ease",
          overflow: "hidden",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        {/* Logo row */}
        <div
          style={{
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
            borderBottom: "1px solid #E5E8ED",
            flexShrink: 0,
          }}
        >
          {sidebarOpen && (
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: "linear-gradient(135deg, #00A2FF, #00C9A7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: 12,
                  color: "white",
                  flexShrink: 0,
                }}
              >
                EC
              </div>
              <div style={{ lineHeight: 1.2 }}>
                <div style={{ fontWeight: 800, fontSize: 13, color: "#0F1923" }}>EdgeCloud</div>
                <div style={{ fontSize: 10, color: "#8B96A3", fontWeight: 500 }}>Admin Panel</div>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#8B96A3",
              display: "flex",
              padding: 4,
              borderRadius: 6,
              flexShrink: 0,
            }}
          >
            {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Quick action */}
        {sidebarOpen && (
          <div style={{ padding: "12px 12px 8px" }}>
            <Link
              href="/admin/posts/new"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "9px 12px",
                background: "#00A2FF",
                color: "white",
                borderRadius: 9,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 13,
              }}
            >
              <PlusCircle size={15} /> New Post
            </Link>
          </div>
        )}

        {/* Nav */}
        <nav style={{ flex: 1, padding: "6px 8px", overflowY: "auto" }}>
          {NAV.map(({ href, icon: Icon, label }) => {
            const active =
              pathname === href || (href !== "/admin/dashboard" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "9px 10px",
                  borderRadius: 8,
                  textDecoration: "none",
                  marginBottom: 2,
                  background: active ? "rgba(0,162,255,0.08)" : "transparent",
                  color: active ? "#00A2FF" : "#4A5568",
                  fontWeight: active ? 600 : 500,
                  fontSize: 14,
                  transition: "all 0.15s",
                }}
              >
                <Icon size={17} style={{ flexShrink: 0 }} />
                {sidebarOpen && <span>{label}</span>}
                {sidebarOpen && active && <ChevronRight size={13} style={{ marginLeft: "auto" }} />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding: "10px 8px", borderTop: "1px solid #E5E8ED", flexShrink: 0 }}>
          {sidebarOpen && (
            <Link
              href="/resources"
              target="_blank"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 10px",
                borderRadius: 8,
                textDecoration: "none",
                color: "#8B96A3",
                fontSize: 13,
                marginBottom: 4,
              }}
            >
              <ExternalLink size={14} /> View Blog
            </Link>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 10px" }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #00A2FF, #00C9A7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 12,
                color: "white",
                flexShrink: 0,
              }}
            >
              {user.name.charAt(0)}
            </div>
            {sidebarOpen && (
              <>
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#0F1923",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {user.name}
                  </div>
                  <div style={{ fontSize: 11, color: "#8B96A3", textTransform: "capitalize" }}>
                    {user.role}
                  </div>
                </div>
                <button
                  onClick={logout}
                  title="Logout"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#8B96A3",
                    display: "flex",
                    padding: 4,
                    borderRadius: 6,
                    flexShrink: 0,
                  }}
                >
                  <LogOut size={15} />
                </button>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflow: "auto" }}>{children}</main>
    </div>
  );
}
