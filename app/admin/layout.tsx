import type { Metadata } from "next";
export const metadata: Metadata = { title: "Admin | EdgeCloud", robots: "noindex" };
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#F4F6F8", marginTop: "60px" }}>{children}</div>
  );
}
