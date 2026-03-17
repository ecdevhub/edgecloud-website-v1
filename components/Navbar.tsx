"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Shield,
  Mail,
  BarChart3,
  Layers,
  BookOpen,
  Building2,
  Zap,
  Phone,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────── */
type BadgeVariant = "brand" | "outline" | "dark";

interface ChildItem {
  label: string;
  href: string;
  note?: string;
  icon?: React.ReactNode;
  badge?: string;
  badgeVariant?: BadgeVariant;
}

interface NavItem {
  label: string;
  href: string;
  children?: ChildItem[];
}

/* ─── Data ───────────────────────────────────────────────────── */
const NAV: NavItem[] = [
  { label: "Services", href: "/services" },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      {
        label: "FinTech & SACCOs",
        href: "/solutions#fintech-saccos",
        note: "Regulation-ready stack",
        icon: <BarChart3 size={13} />,
      },
      {
        label: "Healthcare & MedTech",
        href: "/solutions#healthcare-medtech",
        note: "DPA-aligned by default",
        icon: <Shield size={13} />,
      },
      {
        label: "Government & Public Sector",
        href: "/solutions#government-public-sector",
        note: "Sovereign cloud infra",
        icon: <Building2 size={13} />,
      },
      {
        label: "Education & EdTech",
        href: "/solutions#education-edtech",
        note: "Scale without complexity",
        icon: <BookOpen size={13} />,
      },
      {
        label: "Retail & E-Commerce",
        href: "/solutions#retail-ecommerce",
        note: "M-Pesa-native commerce",
        icon: <Layers size={13} />,
      },
      {
        label: "Agriculture & AgriTech",
        href: "/solutions#agriculture-agritech",
        note: "Rural-first connectivity",
        icon: <Zap size={13} />,
      },
    ],
  },
  {
    label: "Products",
    href: "/products",
    children: [
      {
        label: "Eza Cloud",
        href: "/products/eza-cloud",
        note: "Kenya's sovereign cloud platform",
        icon: <Shield size={13} />,
        badge: "DPA-Compliant",
        badgeVariant: "brand",
      },
      {
        label: "ZuriMail",
        href: "/products/zurimail",
        note: "Corporate email & MarTech suite",
        icon: <Mail size={13} />,
        badge: "Early Access",
        badgeVariant: "outline",
      },
      {
        label: "Future Stack",
        href: "/products#future-stack",
        note: "PayEdge · EzaVault · EdgeAnalytics",
        icon: <Layers size={13} />,
        badge: "Coming Soon",
        badgeVariant: "dark",
      },
    ],
  },
  { label: "Resources", href: "/resources" },
  { label: "Company", href: "/company" },
];

const BADGE_STYLES: Record<BadgeVariant, React.CSSProperties> = {
  brand: { background: "#00A2FF", color: "white", border: "1.5px solid #00A2FF" },
  outline: { background: "transparent", color: "#00A2FF", border: "1.5px solid #00A2FF" },
  dark: { background: "#0B1016", color: "white", border: "1.5px solid #0B1016" },
};

/* ─── Dropdown ───────────────────────────────────────────────── */
function Dropdown({ items, wide }: { items: ChildItem[]; wide: boolean }) {
  return (
    <div
      className="
        absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50
        opacity-0 invisible translate-y-2 pointer-events-none
        group-hover:opacity-100 group-hover:visible
        group-hover:translate-y-0 group-hover:pointer-events-auto
        transition-all duration-200 ease-out
      "
    >
      {/* Invisible bridge keeps hover alive */}
      <div className="absolute inset-x-0 -top-3 h-3" />
      <div
        style={{
          background: "white",
          border: "1.5px solid #D4DBE2",
          boxShadow: "0 8px 32px rgba(11,16,22,0.12), 0 2px 8px rgba(11,16,22,0.06)",
          padding: "6px",
        }}
        className={wide ? "w-[540px] grid grid-cols-2" : "min-w-[268px]"}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group/item flex items-start gap-3 px-3.5 py-3 hover:bg-[#F2F5F7] transition-colors duration-150"
          >
            {item.icon && (
              <span className="mt-0.5 shrink-0 text-[#7B8FA0] group-hover/item:text-[#00A2FF] transition-colors duration-150">
                {item.icon}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <span
                  className="font-sans font-bold text-sm leading-tight group-hover/item:text-[#00A2FF] transition-colors duration-150"
                  style={{ color: "#0B1016" }}
                >
                  {item.label}
                </span>
                {item.badge && item.badgeVariant && (
                  <span
                    className="shrink-0 inline-flex items-center text-[9.5px] font-black tracking-[0.1em] uppercase px-1.5 py-px"
                    style={BADGE_STYLES[item.badgeVariant]}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              {item.note && (
                <p className="text-xs leading-tight font-normal" style={{ color: "#7B8FA0" }}>
                  {item.note}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ─── Navbar ─────────────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Dark mode = on home page AND not yet scrolled past threshold
  const dark = isHome && !scrolled;

  /* ── Active link helper ──────────────────────────────────────
     Matches exact paths and prefix paths.
     Strips hash from href so /solutions#fintech-saccos
     correctly marks /solutions as active.
  ─────────────────────────────────────────────────────────── */
  const isActive = (href: string): boolean => {
    const base = href.split("#")[0]; // strip hash fragment
    if (base === "/") return pathname === "/";
    return pathname === base || pathname.startsWith(base + "/");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll(); // run on mount so SSR hydration is consistent
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const toggleGroup = (label: string) => setOpenGroup((prev) => (prev === label ? null : label));

  /* ── Resolved style helpers (inline styles, not Tailwind
     dynamic classes, so purge can never drop them) ──────── */
  const headerStyle: React.CSSProperties = scrolled
    ? {
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid #D4DBE2",
        boxShadow: "0 1px 0 rgba(11,16,22,0.06)",
      }
    : { background: "transparent", borderBottom: "1px solid transparent" };

  // Per-link resolved colors
  const linkColor = (href: string): React.CSSProperties => {
    const active = isActive(href);
    if (dark) {
      return {
        color: active ? "white" : "rgba(255,255,255,0.78)",
        borderBottom: active ? "2px solid rgba(255,255,255,0.7)" : "2px solid transparent",
        marginBottom: "-1px",
      };
    }
    return {
      color: active ? "#00A2FF" : "#3D4E5C",
      borderBottom: active ? "2px solid #00A2FF" : "2px solid transparent",
      marginBottom: "-1px",
    };
  };

  const linkHoverColor = (href: string) =>
    isActive(href) ? undefined : dark ? "white" : "#0B1016";
  const linkHoverBg = (href: string) => (isActive(href) ? undefined : dark ? undefined : "#F2F5F7");
  const chevronColor = (href: string): React.CSSProperties => ({
    color: dark
      ? isActive(href)
        ? "rgba(255,255,255,0.6)"
        : "rgba(255,255,255,0.3)"
      : isActive(href)
        ? "#00A2FF"
        : "#BDC8D2",
  });

  const mobileToggleStyle: React.CSSProperties = dark
    ? {
        border: "1.5px solid rgba(255,255,255,0.2)",
        background: "rgba(255,255,255,0.08)",
        color: "white",
      }
    : { border: "1.5px solid #D4DBE2", background: "white", color: "#0B1016" };

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[100] transition-all duration-300"
        style={headerStyle}
      >
        <nav className="max-w-[1320px] mx-auto px-5 md:px-10 h-[68px] flex items-center justify-between gap-6">
          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src={dark ? "/logo-dark.png" : "/logo-light.png"}
              alt="EdgeCloud Technologies"
              width={200}
              height={35}
              priority
            />
          </Link>

          {/* ── Desktop nav links ── */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <div key={item.label} className="relative group">
                  <Link
                    href={item.href}
                    className="flex items-center gap-1.5 px-3.5 py-2 font-sans font-semibold text-sm transition-all duration-150"
                    style={linkColor(item.href)}
                    onMouseEnter={(e) => {
                      const hc = linkHoverColor(item.href);
                      const hb = linkHoverBg(item.href);
                      if (hc) (e.currentTarget as HTMLElement).style.color = hc;
                      if (hb) (e.currentTarget as HTMLElement).style.background = hb;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = linkColor(item.href)
                        .color as string;
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }}
                  >
                    {item.label}
                    {item.children && <ChevronDown size={12} style={chevronColor(item.href)} />}
                  </Link>
                  {item.children && (
                    <Dropdown items={item.children} wide={item.children.length > 3} />
                  )}
                </div>
              );
            })}
          </div>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-2">
            {/* Contact link */}
            <Link
              href="/contact"
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 font-sans font-semibold text-sm transition-colors duration-150"
              style={{
                color: isActive("/contact")
                  ? dark
                    ? "white"
                    : "#00A2FF"
                  : dark
                    ? "rgba(255,255,255,0.65)"
                    : "#3D4E5C",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = dark ? "white" : "#0B1016";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = isActive("/contact")
                  ? dark
                    ? "white"
                    : "#00A2FF"
                  : dark
                    ? "rgba(255,255,255,0.65)"
                    : "#3D4E5C";
              }}
            >
              <Phone size={12} style={{ color: "#00A2FF" }} />
              Contact
            </Link>

            {/* Primary CTA - always solid blue */}
            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center gap-2 px-5 py-[10px] font-sans font-bold text-[13px] text-white tracking-[0.01em] transition-all duration-150"
              style={{ background: "#00A2FF", border: "1.5px solid #00A2FF" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#007ACC";
                el.style.borderColor = "#007ACC";
                el.style.transform = "translateY(-1px)";
                el.style.boxShadow = "3px 3px 0px 0px #0A0F1E";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#00A2FF";
                el.style.borderColor = "#00A2FF";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              Talk to an Expert <ArrowRight size={13} className="shrink-0" />
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation"
              className="lg:hidden w-9 h-9 flex items-center justify-center transition-colors duration-150"
              style={mobileToggleStyle}
            >
              {mobileOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile backdrop ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[90] lg:hidden"
          style={{ background: "rgba(11,16,22,0.5)" }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile drawer ── */}
      <aside
        ref={drawerRef}
        className="fixed top-0 right-0 bottom-0 z-[110] lg:hidden overflow-y-auto transition-transform duration-300 ease-out"
        style={{
          width: "min(340px, 100vw)",
          background: "white",
          borderLeft: "1.5px solid #D4DBE2",
          boxShadow: "-8px 0 32px rgba(11,16,22,0.12)",
          transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 h-[68px]"
          style={{ borderBottom: "1.5px solid #D4DBE2" }}
        >
          <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
            <div
              className="w-8 h-8 flex items-center justify-center shrink-0"
              style={{ background: "#00A2FF" }}
            >
              <span className="font-sans font-black text-[12px] text-white">EC</span>
            </div>
            <span
              className="font-sans font-black text-[14px] tracking-[-0.03em]"
              style={{ color: "#0B1016" }}
            >
              EdgeCloud
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="w-8 h-8 flex items-center justify-center"
            style={{ color: "#3D4E5C" }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav items */}
        <div className="px-2 py-3">
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <div key={item.label} style={{ borderBottom: "1px solid #E6EAEE" }}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleGroup(item.label)}
                      className="w-full flex items-center justify-between px-4 py-3.5 font-sans font-bold text-sm text-left transition-colors duration-150"
                      style={{
                        color: active ? "#00A2FF" : "#0B1016",
                        borderLeft: `2px solid ${active ? "#00A2FF" : "transparent"}`,
                        background: active ? "#F2F5F7" : "transparent",
                      }}
                    >
                      {item.label}
                      <ChevronDown
                        size={13}
                        style={{
                          color: openGroup === item.label ? "#00A2FF" : "#BDC8D2",
                          transform: openGroup === item.label ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.2s, color 0.15s",
                        }}
                      />
                    </button>
                    {openGroup === item.label && (
                      <div style={{ background: "#F9FAFB", borderTop: "1px solid #E6EAEE" }}>
                        {item.children.map((child) => {
                          const childActive = pathname === child.href.split("#")[0];
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-2.5 px-6 py-3 font-sans text-sm font-medium transition-colors duration-150"
                              style={{
                                color: childActive ? "#00A2FF" : "#3D4E5C",
                                borderLeft: `2px solid ${childActive ? "#00A2FF" : "transparent"}`,
                                background: childActive ? "#EBF6FF" : "transparent",
                              }}
                            >
                              {child.icon && (
                                <span style={{ color: childActive ? "#00A2FF" : "#BDC8D2" }}>
                                  {child.icon}
                                </span>
                              )}
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center px-4 py-3.5 font-sans font-bold text-sm transition-colors duration-150"
                    style={{
                      color: active ? "#00A2FF" : "#0B1016",
                      borderLeft: `2px solid ${active ? "#00A2FF" : "transparent"}`,
                      background: active ? "#F2F5F7" : "transparent",
                    }}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* CTAs */}
        <div className="px-5 pt-4 pb-8 flex flex-col gap-2.5">
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3.5 font-sans font-bold text-[14px] text-white transition-colors duration-150"
            style={{ background: "#00A2FF", border: "1.5px solid #00A2FF" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#007ACC";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#00A2FF";
            }}
          >
            Talk to an Expert <ArrowRight size={14} />
          </Link>
          <Link
            href="/services"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3 font-sans font-semibold text-sm transition-colors duration-150"
            style={{
              border: "1.5px solid #D4DBE2",
              color: isActive("/services") ? "#00A2FF" : "#3D4E5C",
              borderColor: isActive("/services") ? "#00A2FF" : "#D4DBE2",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#00A2FF";
              (e.currentTarget as HTMLElement).style.color = "#00A2FF";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = isActive("/services")
                ? "#00A2FF"
                : "#D4DBE2";
              (e.currentTarget as HTMLElement).style.color = isActive("/services")
                ? "#00A2FF"
                : "#3D4E5C";
            }}
          >
            View Services
          </Link>
        </div>
      </aside>
    </>
  );
}
