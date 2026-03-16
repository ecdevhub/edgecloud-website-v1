"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions", children: [
    { label: "SMEs & E-commerce", href: "/solutions/smes-ecommerce" },
    { label: "FinTech & SACCOs", href: "/solutions/fintech-saccos" },
    { label: "Health & NGOs", href: "/solutions/health-ngos" },
    { label: "Agencies & Developers", href: "/solutions/agencies-developers" },
  ]},
  { label: "Products", href: "/products", children: [
    { label: "Eza Cloud", href: "/products/eza-cloud", badge: "DPA-Compliant" },
    { label: "ZuriMail", href: "/products/zurimail", badge: "Early Access" },
  ]},
  { label: "Services", href: "/services" },
  { label: "Resources", href: "/resources" },
  { label: "Company", href: "/company" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <style>{`
        .nav-link { display:flex; align-items:center; gap:4px; padding:7px 12px; font-family:'Plus Jakarta Sans',sans-serif; font-size:14px; font-weight:500; color:#4A5568; text-decoration:none; border-radius:8px; transition:all 0.15s; }
        .nav-link:hover { color:#0F1923; background:rgba(15,25,35,0.04); }
        .dropdown-item { display:flex; align-items:center; justify-content:space-between; padding:10px 14px; border-radius:8px; text-decoration:none; color:#4A5568; font-family:'Plus Jakarta Sans',sans-serif; font-size:14px; transition:all 0.15s; }
        .dropdown-item:hover { background:#F4F6F8; color:#0F1923; }
      `}</style>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        transition: "all 0.25s ease",
        background: scrolled ? "rgba(250,251,252,0.96)" : "rgba(250,251,252,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: scrolled ? "1px solid #E5E8ED" : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 12px rgba(15,25,35,0.06)" : "none",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>

            {/* Logo */}
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 34, height: 34, borderRadius: 9,
                background: "linear-gradient(135deg, #00A2FF 0%, #00C9A7 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 14, color: "white",
                boxShadow: "0 2px 8px rgba(0,162,255,0.3)",
              }}>EC</div>
              <div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 15, color: "#0F1923", letterSpacing: "-0.01em", lineHeight: 1.1 }}>EdgeCloud</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 9.5, fontWeight: 500, color: "#8B96A3", letterSpacing: "0.08em", textTransform: "uppercase" }}>Technologies</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div style={{ display: "flex", alignItems: "center", gap: 2 }} className="hidden md:flex">
              {navItems.map((item) => (
                <div key={item.label} style={{ position: "relative" }}
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}>
                  <Link href={item.href} className="nav-link">
                    {item.label}
                    {item.children && <ChevronDown size={13} style={{ opacity: 0.5 }} />}
                  </Link>
                  {item.children && activeDropdown === item.label && (
                    <div style={{
                      position: "absolute", top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)",
                      background: "white", border: "1px solid #E5E8ED", borderRadius: 14, padding: 6,
                      minWidth: 220, boxShadow: "0 12px 40px rgba(15,25,35,0.12)",
                      animation: "fadeUp 0.15s ease both",
                    }}>
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href} className="dropdown-item">
                          {child.label}
                          {"badge" in child && child.badge && (
                            <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 999, background: "rgba(0,162,255,0.08)", color: "#00A2FF", letterSpacing: "0.06em" }}>{child.badge}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Link href="/contact" className="hidden md:inline-flex" style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                background: "#00A2FF", color: "white",
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 13,
                padding: "9px 18px", borderRadius: 999, textDecoration: "none",
                boxShadow: "0 2px 12px rgba(0,162,255,0.28)", transition: "all 0.18s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#007ACC"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#00A2FF"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                Talk to an Expert <ArrowRight size={13} />
              </Link>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden" style={{ background: "none", border: "1.5px solid #E5E8ED", borderRadius: 8, padding: 7, cursor: "pointer", color: "#4A5568", display: "flex" }}>
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div style={{ borderTop: "1px solid #E5E8ED", padding: "12px 0 20px" }}>
              {[...navItems, { label: "Contact", href: "/contact", children: undefined }].map((item) => (
                <div key={item.label}>
                  <Link href={item.href} onClick={() => setMobileOpen(false)} style={{ display: "block", padding: "12px 8px", fontSize: 16, fontWeight: 500, color: "#0F1923", textDecoration: "none", borderBottom: "1px solid #F4F6F8" }}>{item.label}</Link>
                  {item.children?.map((child) => (
                    <Link key={child.href} href={child.href} onClick={() => setMobileOpen(false)} style={{ display: "block", padding: "9px 24px", fontSize: 14, color: "#4A5568", textDecoration: "none", borderBottom: "1px solid #F4F6F8" }}>{child.label}</Link>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
