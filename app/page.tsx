"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  CreditCard,
  Layers,
  CheckCircle2,
  Cloud,
  Code2,
  Compass,
  TrendingUp,
  Activity,
  BookOpen,
  Flag,
  ShoppingBag,
  Sun,
  Radio,
  Truck,
  Search,
  Wrench,
} from "lucide-react";

/* ─── Static data ─────────────────────────────────────────────── */
const SERVICES = [
  {
    icon: Cloud,
    title: "Cloud Services",
    teaser:
      "Cloud migration, managed infrastructure, DevOps pipelines, security hardening, and FinOps cost optimisation — tuned for Kenya Cloud Policy 2025.",
    href: "/services",
  },
  {
    icon: Code2,
    title: "Custom Software Development",
    teaser:
      "Bespoke web and mobile apps, legacy modernisation, API integration, and M-Pesa-native payment flows — built by Nairobi engineers who know your context.",
    href: "/services",
  },
  {
    icon: Compass,
    title: "Advisory & Training",
    teaser:
      "Cloud strategy workshops, DPA compliance audits, and team enablement programmes — so your people grow alongside your technology.",
    href: "/services",
  },
];

const PRODUCTS = [
  {
    label: "by EdgeCloud",
    heading: "Eza Cloud",
    oneLiner:
      "Kenya's DPA-compliant cloud platform — managed Kubernetes, WooCommerce hosting, 1-click M-Pesa.",
    bullets: [
      "Tier III+ Nairobi data centres for sovereignty",
      "Four pillars: Core, Kubernetes, Sovereign, Sites",
      "DPIA-ready compliance docs with every plan",
    ],
    href: "/products/eza-cloud",
    cta: "Discover Eza Cloud",
    borderColor: "#00C9A7",
    textColor: "#00C9A7",
    dotColor: "bg-[#00C9A7]",
  },
  {
    label: "by EdgeCloud",
    heading: "ZuriMail",
    oneLiner:
      "DPA-compliant corporate email, SMS marketing, and MarTech automation — Kenya-hosted and M-Pesa-native.",
    bullets: [
      "KES-priced plans, hosted entirely within Kenya",
      "Consent management built into every campaign flow",
      "Competes with Zoho & Mailchimp — built for East Africa",
    ],
    href: "/products/zurimail",
    cta: "Discover ZuriMail",
    borderColor: "#8B5CF6",
    textColor: "#8B5CF6",
    dotColor: "bg-[#8B5CF6]",
  },
  {
    label: "Coming Soon",
    heading: "The Stack Grows",
    oneLiner:
      "We're building the next wave of Kenya-first software. Join our early-access list to shape what comes next.",
    bullets: [
      "PayEdge — M-Pesa reconciliation automation",
      "EzaVault — Encrypted sovereign data storage",
      "EdgeAnalytics — Privacy-first analytics",
    ],
    href: "/products#future-stack",
    cta: "Join the Waitlist",
    borderColor: "#F59E0B",
    textColor: "#F59E0B",
    dotColor: "bg-[#F59E0B]",
  },
];

const INDUSTRIES = [
  {
    icon: TrendingUp,
    name: "FinTech & SACCOs",
    blurb: "SASRA-aligned cloud and M-Pesa-native APIs.",
    href: "/industries#fintech-saccos",
  },
  {
    icon: Activity,
    name: "Healthcare & MedTech",
    blurb: "DPA-compliant EHR, telemedicine, and analytics.",
    href: "/industries#healthcare-medtech",
  },
  {
    icon: BookOpen,
    name: "Education & EdTech",
    blurb: "LMS hosting, student data protection, M-Pesa fees.",
    href: "/industries#education-edtech",
  },
  {
    icon: Flag,
    name: "Government & Public Sector",
    blurb: "Kenya Cloud Policy 2025-compliant sovereign cloud.",
    href: "/industries#government-public-sector",
  },
  {
    icon: ShoppingBag,
    name: "Retail & E-Commerce",
    blurb: "WooCommerce, M-Pesa checkout, ZuriMail retention.",
    href: "/industries#retail-ecommerce",
  },
  {
    icon: Sun,
    name: "Agriculture & AgriTech",
    blurb: "Rural-accessible apps and M-Pesa farmer flows.",
    href: "/industries#agriculture-agritech",
  },
  {
    icon: Radio,
    name: "Media & Digital Publishing",
    blurb: "High-availability streaming and audience engagement.",
    href: "/industries#media",
  },
  {
    icon: Truck,
    name: "Logistics & Supply Chain",
    blurb: "Tracking APIs and M-Pesa disbursement automation.",
    href: "/industries#logistics",
  },
];

const STEPS = [
  {
    icon: Search,
    step: "01",
    heading: "Discover & Design",
    copy: "A structured workshop — auditing your infrastructure, mapping DPA/ODPC/Kenya Cloud Policy gaps, and designing an architecture that fits your budget.",
  },
  {
    icon: Wrench,
    step: "02",
    heading: "Build & Migrate",
    copy: "Our engineers build or migrate your stack onto Eza Cloud, integrating M-Pesa, deploying managed Kubernetes, and wiring ZuriMail for customer comms.",
  },
  {
    icon: TrendingUp,
    step: "03",
    heading: "Operate & Optimise",
    copy: "Post-launch, we don't disappear. FinOps practices that reduce cloud spend by up to 40%, continuous monitoring, and ongoing product iteration.",
  },
];

const ARTICLES = [
  {
    tag: "DPA & Compliance",
    title: "What Kenya's ODPC 2025–2029 Strategy Means for Your Business",
    excerpt:
      "7,223 data controllers registered. 96+ enforcement actions. Here's what the next five years look like — and how to prepare.",
    href: "/resources",
  },
  {
    tag: "Cloud Strategy",
    title: "Kenya Cloud Policy 2025: A Plain-Language Guide for SMEs",
    excerpt:
      "Data sovereignty mandates, interoperability rules, government procurement requirements — everything in one place.",
    href: "/resources",
  },
  {
    tag: "M-Pesa & FinTech",
    title: "Why M-Pesa Is an Architecture Decision, Not a Plugin",
    excerpt:
      "$16.82B in digital payments in 2025. Integrating M-Pesa at the infrastructure level changes everything for your product.",
    href: "/resources",
  },
];

const BADGES = [
  "Kenya DPA Aligned",
  "Nairobi-Based Support",
  "Tier III+ Data Centres",
  "Kenya Cloud Policy 2025",
  "M-Pesa-Native",
];

/* ─── Hero background canvas ─────────────────────────────────── */
function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = 0,
      H = 0;

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * window.devicePixelRatio;
      canvas.height = H * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    /* ── Nodes ── */
    type Node = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      color: string;
      pulse: number;
      pulseSpeed: number;
      label?: string;
    };

    const LABELS = ["EZA CLOUD", "M-PESA", "DPA / ODPC", "KUBERNETES", "SOVEREIGN", "KCP 2025"];
    const LCOLORS = ["#00C9A7", "#00A2FF", "#00A2FF", "#00C9A7", "#8B5CF6", "#00A2FF"];

    const count = 22;
    const nodes: Node[] = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.18, // slower
      vy: (Math.random() - 0.5) * 0.18,
      r: i < 6 ? 20 : Math.random() * 2.5 + 1.5,
      color: i < 6 ? LCOLORS[i] : Math.random() > 0.65 ? "#00A2FF" : "#1E2D45",
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.008 + Math.random() * 0.006, // slower pulse
      label: i < 6 ? LABELS[i] : undefined,
    }));

    /* ── Particles ── */
    type Particle = { fi: number; ti: number; t: number; speed: number; color: string };
    const particles: Particle[] = Array.from({ length: 12 }, () => ({
      fi: Math.floor(Math.random() * count),
      ti: Math.floor(Math.random() * count),
      t: Math.random(),
      speed: 0.0015 + Math.random() * 0.002, // slower travel
      color: Math.random() > 0.5 ? "#00A2FF" : "#00C9A7",
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      /* Grid — very faint */
      ctx.strokeStyle = "rgba(255,255,255,0.015)";
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 72) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += 72) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      /* Edges */
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxD = nodes[i].label || nodes[j].label ? 260 : 140;
          if (dist < maxD) {
            const alpha = 1 - dist / maxD;
            const named = nodes[i].label && nodes[j].label;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = named
              ? `rgba(0,162,255,${alpha * 0.18})`
              : `rgba(30,45,69,${alpha * 0.35})`;
            ctx.lineWidth = named ? 0.8 : 0.4;
            ctx.stroke();
          }
        }
      }

      /* Travelling particles */
      for (const p of particles) {
        const from = nodes[p.fi],
          to = nodes[p.ti];
        const px = from.x + (to.x - from.x) * p.t;
        const py = from.y + (to.y - from.y) * p.t;

        /* Soft glow */
        const grd = ctx.createRadialGradient(px, py, 0, px, py, 7);
        grd.addColorStop(0, p.color === "#00A2FF" ? "rgba(0,162,255,0.25)" : "rgba(0,201,167,0.2)");
        grd.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(px, py, 7, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        /* Dot */
        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.8;
        ctx.fill();
        ctx.globalAlpha = 1;

        p.t += p.speed;
        if (p.t >= 1) {
          p.t = 0;
          p.fi = p.ti;
          p.ti = Math.floor(Math.random() * count);
        }
      }

      /* Nodes */
      for (const node of nodes) {
        node.pulse += node.pulseSpeed;
        const pf = Math.sin(node.pulse) * 0.12 + 1;

        if (node.label) {
          const bw = 86,
            bh = 32;
          const bx = node.x - bw / 2,
            by = node.y - bh / 2;

          /* Fill */
          ctx.fillStyle = "rgba(10,15,30,0.85)";
          ctx.fillRect(bx, by, bw, bh);

          /* Border */
          ctx.strokeStyle = node.color + "80"; // 50% alpha border
          ctx.lineWidth = 1;
          ctx.strokeRect(bx, by, bw, bh);

          /* Corner accents — small, subtle */
          const ca = 5;
          ctx.fillStyle = node.color + "99";
          [
            [bx, by, ca, 1],
            [bx, by, 1, ca],
            [bx + bw - ca, by, ca, 1],
            [bx + bw - 1, by, 1, ca],
            [bx, by + bh - 1, ca, 1],
            [bx, by + bh - ca, 1, ca],
            [bx + bw - ca, by + bh - 1, ca, 1],
            [bx + bw - 1, by + bh - ca, 1, ca],
          ].forEach(([x, y, w, h]) => ctx.fillRect(x, y, w, h));

          /* Label */
          ctx.fillStyle = node.color + "CC";
          ctx.font = "bold 6.5px monospace";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(node.label, node.x, node.y);

          /* Soft pulse ring */
          const rr = 48 * pf;
          ctx.beginPath();
          ctx.arc(node.x, node.y, rr, 0, Math.PI * 2);
          ctx.strokeStyle = node.color;
          ctx.globalAlpha = 0.04;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.globalAlpha = 1;
        } else {
          const r = node.r * pf;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
          ctx.fillStyle = node.r > 2 ? node.color + "CC" : "#1E2D45";
          ctx.globalAlpha = node.r > 2 ? 0.7 : 0.5;
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        /* Move + bounce */
        node.x += node.vx;
        node.y += node.vy;
        const pad = node.label ? 50 : node.r + 6;
        if (node.x < pad || node.x > W - pad) node.vx *= -1;
        if (node.y < pad || node.y > H - pad) node.vy *= -1;
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.4 }} // ← subtle: 40% opacity so copy reads clearly
    />
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <main className="hero-dark-nav">
      {/* ══════════════════════════════════════════
          DARK ZONE — hero + badges
      ══════════════════════════════════════════ */}
      <div className="relative overflow-hidden" style={{ background: "#060B14" }}>
        {/* Animated topology background */}
        <HeroBackground />

        {/* Top brand line */}
        <div aria-hidden className="absolute top-0 inset-x-0 h-[2px] bg-[#00A2FF]" />

        {/* Left edge glow */}
        <div
          aria-hidden
          className="absolute top-0 left-0 w-[2px]"
          style={{
            height: "200px",
            background: "linear-gradient(to bottom, #00A2FF, transparent)",
          }}
        />

        {/* ── HERO ── */}
        <section className="relative pt-32 pb-20 md:pt-44 md:pb-28">
          <div className="max-w-[1320px] mx-auto px-5 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left — copy */}
              <div className="relative z-10">
                <p
                  className="flex items-center gap-2.5 font-sans font-black text-[11px] tracking-[0.18em] uppercase mb-7"
                  style={{ color: "#00A2FF" }}
                >
                  <span className="block w-5 h-[2px] shrink-0" style={{ background: "#00A2FF" }} />
                  Kenya's Digital Enablement Cloud Agency
                </p>

                <h1
                  className="mb-7 max-w-[580px]"
                  style={{
                    fontFamily: "var(--font-serif, 'Instrument Serif', serif)",
                    fontSize: "clamp(40px, 5.5vw, 68px)",
                    lineHeight: 1.06,
                    letterSpacing: "-0.04em",
                    fontWeight: 400,
                    color: "#F1F5F9",
                  }}
                >
                  One Stack.
                  <br />
                  <span
                    style={{
                      background: "linear-gradient(135deg, #00A2FF 0%, #00C9A7 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Zero Pain.
                  </span>
                  <br />
                  Full Trust.
                </h1>

                <p
                  className="font-sans leading-relaxed mb-10 max-w-[500px]"
                  style={{ fontSize: "clamp(15px, 1.5vw, 17px)", color: "rgba(241,245,249,0.52)" }}
                >
                  We design, build, host, and secure compliant digital journeys for Kenyan and East
                  African businesses — DPA-by-default cloud, M-Pesa-native payments, Nairobi
                  support. All under one roof.
                </p>

                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2.5 font-sans font-bold text-[13.5px] text-white transition-all duration-150"
                    style={{
                      padding: "13px 28px",
                      background: "#00A2FF",
                      border: "1.5px solid #00A2FF",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "#007ACC";
                      (e.currentTarget as HTMLElement).style.borderColor = "#007ACC";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "3px 3px 0 0 rgba(255,255,255,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "#00A2FF";
                      (e.currentTarget as HTMLElement).style.borderColor = "#00A2FF";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    Talk to an Expert <ArrowRight size={14} className="shrink-0" />
                  </Link>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2.5 font-sans font-semibold text-[13.5px] transition-all duration-150"
                    style={{
                      padding: "13px 28px",
                      border: "1.5px solid rgba(255,255,255,0.22)",
                      color: "rgba(255,255,255,0.82)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.5)";
                      (e.currentTarget as HTMLElement).style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.22)";
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.82)";
                    }}
                  >
                    Explore Our Products
                  </Link>
                </div>

                <p
                  className="font-sans text-[11px] font-medium"
                  style={{ color: "rgba(255,255,255,0.2)" }}
                >
                  No lock-in · Kenya Cloud Policy 2025 aligned · ODPC-compliant stack
                </p>
              </div>

              {/* Right — static topology SVG (not competing with bg canvas) */}
              <div className="hidden lg:flex items-center justify-center relative z-10">
                <div className="w-full max-w-[480px] h-[380px]">
                  <HeroTopology />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Trust badges ── */}
        <div style={{ borderTop: "1px solid rgba(30,45,69,0.8)" }}>
          <div className="max-w-[1320px] mx-auto px-5 md:px-10 py-5 flex flex-wrap gap-3">
            {BADGES.map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 font-sans font-black text-[9px] tracking-[0.12em] uppercase"
                style={{
                  border: "1.5px solid rgba(255,255,255,0.07)",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                <Shield size={9} style={{ color: "#00A2FF" }} />
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          WHY EDGECLOUD
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-white border-b border-[#E6EAEE]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-10">
          <div className="max-w-[640px] mb-16">
            <p className="eyebrow mb-4">Why EdgeCloud</p>
            <h2
              className="font-serif mb-5"
              style={{
                fontSize: "clamp(28px,4vw,46px)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
              }}
            >
              Built for Kenya.
              <br />
              Designed for Trust.
            </h2>
            <p className="font-sans text-[16px] leading-relaxed" style={{ color: "#3D4E5C" }}>
              Generic hosting leaves your business exposed — to compliance risk, latency, and
              vendors who've never heard of M-Pesa. EdgeCloud bundles proprietary cloud products,
              expert implementation, and ongoing managed support in a single, accountable Nairobi
              partner.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-[1.5px] border-[#D4DBE2]">
            {[
              {
                icon: Shield,
                heading: "DPA-by-Default Infrastructure",
                copy: "Every EdgeCloud product ships with data minimisation defaults, consent templates, and DPIA-ready documentation. Kenya's DPA carries fines of up to KES 5,000,000 — we make sure you're covered.",
                num: "01",
              },
              {
                icon: CreditCard,
                heading: "M-Pesa Woven Into the Architecture",
                copy: "M-Pesa isn't a plugin here — it's a first-class citizen. Payments, reconciliation, automated receipts, and marketing triggers. Kenya's digital payments market hit $16.82B in 2025.",
                num: "02",
              },
              {
                icon: Layers,
                heading: "Strategy, Products & Support Together",
                copy: "Most providers give you servers. We give you a roadmap, a build team, proprietary cloud tools, and managed support in Swahili and English, Nairobi time zone, WhatsApp-accessible.",
                num: "03",
              },
              {
                icon: CheckCircle2,
                heading: "Built for Kenya's Digital Future",
                copy: "The Kenya Cloud Policy 2025 mandates open standards, data sovereignty, and interoperability. Our stack meets those standards from day one — so FinTech, healthcare, and government can procure with confidence.",
                num: "04",
              },
            ].map(({ icon: Icon, heading, copy, num }, i) => (
              <div
                key={heading}
                className="p-8 group hover:bg-[#F9FAFB] transition-colors duration-150 border-[#D4DBE2]"
                style={{ borderRight: i < 3 ? "1.5px solid #D4DBE2" : "none" }}
              >
                <p
                  className="font-sans font-black text-[11px] tracking-[0.18em] uppercase mb-5"
                  style={{ color: "#BDC8D2" }}
                >
                  {num}
                </p>
                <div
                  className="w-10 h-10 flex items-center justify-center mb-5 transition-colors duration-150"
                  style={{ background: "#F2F5F7", border: "1.5px solid #D4DBE2" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#00A2FF";
                    (e.currentTarget as HTMLElement).style.background = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#D4DBE2";
                    (e.currentTarget as HTMLElement).style.background = "#F2F5F7";
                  }}
                >
                  <Icon size={17} style={{ color: "#00A2FF" }} />
                </div>
                <div
                  className="w-0 group-hover:w-5 h-[2px] mb-3 transition-all duration-200"
                  style={{ background: "#00A2FF" }}
                />
                <h3
                  className="font-sans font-bold text-[15px] leading-snug mb-3"
                  style={{ color: "#0B1016" }}
                >
                  {heading}
                </h3>
                <p className="font-sans text-[13.5px] leading-relaxed" style={{ color: "#3D4E5C" }}>
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════ */}
      <section
        className="py-24 md:py-32 border-b border-[#E6EAEE]"
        style={{ background: "#F9FAFB" }}
      >
        <div className="max-w-[1320px] mx-auto px-5 md:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <div className="max-w-[520px]">
              <p className="eyebrow mb-4">What We Do</p>
              <h2
                className="font-serif mb-4"
                style={{
                  fontSize: "clamp(26px,3.5vw,44px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.025em",
                }}
              >
                Services Built Around Results
              </h2>
              <p className="font-sans text-[15px] leading-relaxed" style={{ color: "#3D4E5C" }}>
                Strategy, engineering, and managed operations — together, so you get outcomes, not
                just infrastructure.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-sans font-bold text-[13px] shrink-0 transition-all duration-150 hover:gap-3"
              style={{ color: "#00A2FF" }}
            >
              View all services <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border-[1.5px] border-[#D4DBE2]">
            {SERVICES.map(({ icon: Icon, title, teaser, href }, i) => (
              <Link
                key={title}
                href={href}
                className="group flex flex-col p-8 bg-white hover:bg-[#F9FAFB] transition-colors duration-150"
                style={{ borderRight: i < 2 ? "1.5px solid #D4DBE2" : "none" }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center mb-6 transition-colors duration-150"
                  style={{ border: "1.5px solid #D4DBE2" }}
                >
                  <Icon size={16} style={{ color: "#00A2FF" }} />
                </div>
                <h3 className="font-sans font-bold text-[15.5px] mb-3" style={{ color: "#0B1016" }}>
                  {title}
                </h3>
                <p
                  className="font-sans text-[13px] leading-relaxed flex-1 mb-6"
                  style={{ color: "#3D4E5C" }}
                >
                  {teaser}
                </p>
                <span
                  className="inline-flex items-center gap-1.5 font-sans font-bold text-[13px] group-hover:gap-2.5 transition-all duration-150"
                  style={{ color: "#00A2FF" }}
                >
                  Explore {title.split(" ")[0]} <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PRODUCTS
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-white border-b border-[#E6EAEE]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-10">
          <div className="max-w-[560px] mb-14">
            <p className="eyebrow mb-4">Our Proprietary Products</p>
            <h2
              className="font-serif mb-4"
              style={{
                fontSize: "clamp(26px,3.5vw,44px)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
              }}
            >
              We Don't Just Recommend Tools. We Build Them.
            </h2>
            <p className="font-sans text-[15px] leading-relaxed" style={{ color: "#3D4E5C" }}>
              Production-ready Kenya-first products — available standalone or as part of a managed
              engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {PRODUCTS.map(
              ({
                label,
                heading,
                oneLiner,
                bullets,
                href,
                cta,
                borderColor,
                textColor,
                dotColor,
              }) => (
                <div
                  key={heading}
                  className="flex flex-col p-8 group hover:-translate-y-1 hover:shadow-[3px_3px_0_0_#D4DBE2] transition-all duration-200"
                  style={{ background: "#F9FAFB", border: `1.5px solid ${borderColor}` }}
                >
                  <p
                    className="font-sans font-black text-[9px] tracking-[0.18em] uppercase mb-4"
                    style={{ color: textColor }}
                  >
                    {label}
                  </p>
                  <h3
                    className="font-sans font-bold text-[19px] leading-tight mb-2.5"
                    style={{ color: "#0B1016" }}
                  >
                    {heading}
                  </h3>
                  <p
                    className="font-sans text-[13px] leading-relaxed mb-6"
                    style={{ color: "#3D4E5C" }}
                  >
                    {oneLiner}
                  </p>
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2.5 font-sans text-[12.5px]"
                        style={{ color: "#3D4E5C" }}
                      >
                        <span className={`mt-[5px] shrink-0 w-1.5 h-1.5 ${dotColor}`} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={href}
                    className="inline-flex items-center gap-2 font-sans font-bold text-[13px] group-hover:gap-3 transition-all duration-150"
                    style={{ color: textColor }}
                  >
                    {cta} <ArrowRight size={13} />
                  </Link>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          INDUSTRIES
      ══════════════════════════════════════════ */}
      <section
        className="py-24 md:py-32 border-b border-[#E6EAEE]"
        style={{ background: "#F9FAFB" }}
      >
        <div className="max-w-[1320px] mx-auto px-5 md:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <div className="max-w-[500px]">
              <p className="eyebrow mb-4">Built for Your Industry</p>
              <h2
                className="font-serif mb-4"
                style={{
                  fontSize: "clamp(26px,3.5vw,44px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.025em",
                }}
              >
                Eight Sectors. One Trusted Partner.
              </h2>
              <p className="font-sans text-[15px] leading-relaxed" style={{ color: "#3D4E5C" }}>
                Every industry in Kenya has unique compliance, integration, and scalability
                requirements. Relevant, not generic, guidance.
              </p>
            </div>
            <Link
              href="/industries"
              className="inline-flex items-center gap-2 font-sans font-bold text-[13px] shrink-0 transition-all duration-150 hover:gap-3"
              style={{ color: "#00A2FF" }}
            >
              View all industries <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 border-[1.5px] border-[#D4DBE2]">
            {INDUSTRIES.map(({ icon: Icon, name, blurb, href }, i) => (
              <Link
                key={name}
                href={href}
                className="group flex flex-col p-6 bg-white hover:bg-[#F9FAFB] transition-colors duration-150"
                style={{
                  borderRight: i % 4 !== 3 ? "1.5px solid #D4DBE2" : "none",
                  borderBottom: i < 4 ? "1.5px solid #D4DBE2" : "none",
                }}
              >
                <div
                  className="w-8 h-8 flex items-center justify-center mb-4 transition-colors duration-150"
                  style={{ border: "1.5px solid #D4DBE2" }}
                >
                  <Icon size={14} style={{ color: "#00A2FF" }} />
                </div>
                <h3
                  className="font-sans font-bold text-[13.5px] leading-snug mb-1.5"
                  style={{ color: "#0B1016" }}
                >
                  {name}
                </h3>
                <p
                  className="font-sans text-[12px] leading-relaxed flex-1 mb-3"
                  style={{ color: "#7B8FA0" }}
                >
                  {blurb}
                </p>
                <span
                  className="inline-flex items-center gap-1 font-sans font-bold text-[11.5px] opacity-0 group-hover:opacity-100 transition-all duration-150"
                  style={{ color: "#00A2FF" }}
                >
                  Explore <ArrowRight size={10} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-white border-b border-[#E6EAEE]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-10">
          <div className="max-w-[500px] mb-16">
            <p className="eyebrow mb-4">Our Process</p>
            <h2
              className="font-serif mb-4"
              style={{
                fontSize: "clamp(26px,3.5vw,44px)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
              }}
            >
              From First Call to Live Production.
            </h2>
            <p className="font-sans text-[15px] leading-relaxed" style={{ color: "#3D4E5C" }}>
              Clear, accountable, and local — every step of the way.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 border-[1.5px] border-[#D4DBE2]">
            {STEPS.map(({ icon: Icon, step, heading, copy }, i) => (
              <div
                key={heading}
                className="relative p-8 bg-white"
                style={{ borderRight: i < 2 ? "1.5px solid #D4DBE2" : "none" }}
              >
                <p
                  className="font-sans font-black text-[52px] leading-none select-none -ml-1 mb-4"
                  style={{ color: "#F2F5F7" }}
                >
                  {step}
                </p>
                <div
                  className="w-9 h-9 flex items-center justify-center mb-5"
                  style={{ border: "1.5px solid #D4DBE2" }}
                >
                  <Icon size={15} style={{ color: "#00A2FF" }} />
                </div>
                {i < 2 && (
                  <div
                    className="hidden md:block absolute top-[58px] right-0 translate-x-1/2 w-2.5 h-2.5 rotate-45 z-10"
                    style={{ background: "#00A2FF", border: "1.5px solid white" }}
                  />
                )}
                <h3 className="font-sans font-bold text-[15.5px] mb-3" style={{ color: "#0B1016" }}>
                  {heading}
                </h3>
                <p className="font-sans text-[13px] leading-relaxed" style={{ color: "#3D4E5C" }}>
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BLOG
      ══════════════════════════════════════════ */}
      <section
        className="py-24 md:py-32 border-b border-[#E6EAEE]"
        style={{ background: "#F9FAFB" }}
      >
        <div className="max-w-[1320px] mx-auto px-5 md:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <div className="max-w-[460px]">
              <p className="eyebrow mb-4">From the Blog</p>
              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(26px,3.5vw,44px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.025em",
                }}
              >
                Insights for Kenyan Digital Leaders
              </h2>
            </div>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 font-sans font-bold text-[13px] shrink-0 transition-all duration-150 hover:gap-3"
              style={{ color: "#00A2FF" }}
            >
              Visit the Resources Hub <ArrowRight size={13} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 border-[1.5px] border-[#D4DBE2]">
            {ARTICLES.map(({ tag, title, excerpt, href }, i) => (
              <Link
                key={title}
                href={href}
                className="group flex flex-col p-8 bg-white hover:bg-[#F9FAFB] transition-colors duration-150"
                style={{ borderRight: i < 2 ? "1.5px solid #D4DBE2" : "none" }}
              >
                <span
                  className="self-start px-2.5 py-1 font-sans font-black text-[9px] tracking-[0.12em] uppercase mb-5"
                  style={{ border: "1.5px solid #00A2FF", color: "#00A2FF" }}
                >
                  {tag}
                </span>
                <h3
                  className="font-sans font-bold text-[15px] leading-snug mb-3 group-hover:text-[#00A2FF] transition-colors duration-150"
                  style={{ color: "#0B1016" }}
                >
                  {title}
                </h3>
                <p
                  className="font-sans text-[13px] leading-relaxed flex-1 mb-6"
                  style={{ color: "#3D4E5C" }}
                >
                  {excerpt}
                </p>
                <span
                  className="inline-flex items-center gap-1.5 font-sans font-bold text-[13px] group-hover:gap-2.5 transition-all duration-150"
                  style={{ color: "#00A2FF" }}
                >
                  Read more <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════ */}
      <section
        className="py-24 md:py-32 relative overflow-hidden"
        style={{ background: "#0D1117" }}
      >
        <div
          aria-hidden
          className="absolute top-0 inset-x-0 h-[2px]"
          style={{ background: "#00A2FF" }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,162,255,0.07) 0%, transparent 100%)",
          }}
        />

        <div className="relative max-w-[1320px] mx-auto px-5 md:px-10">
          <div className="max-w-[620px] mx-auto text-center">
            <p
              className="flex items-center justify-center gap-3 font-sans font-black text-[11px] tracking-[0.18em] uppercase mb-7"
              style={{ color: "#00A2FF" }}
            >
              <span className="block w-5 h-[2px]" style={{ background: "#00A2FF" }} />
              Get Started
              <span className="block w-5 h-[2px]" style={{ background: "#00A2FF" }} />
            </p>
            <h2
              className="font-serif mb-6"
              style={{
                fontSize: "clamp(28px,4.5vw,52px)",
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
                fontWeight: 400,
                color: "#F8FAFC",
              }}
            >
              Ready to Build on Kenya's Most Compliant Cloud Stack?
            </h2>
            <p
              className="font-sans text-[15px] leading-relaxed mb-10 max-w-[480px] mx-auto"
              style={{ color: "#94A3B8" }}
            >
              Full cloud migration, bespoke application, or DPA compliance audit — EdgeCloud's
              Nairobi team is ready to help.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-7">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 font-sans font-bold text-[13.5px] text-white transition-all duration-150"
                style={{
                  padding: "13px 28px",
                  background: "#00A2FF",
                  border: "1.5px solid #00A2FF",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#007ACC";
                  (e.currentTarget as HTMLElement).style.borderColor = "#007ACC";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#00A2FF";
                  (e.currentTarget as HTMLElement).style.borderColor = "#00A2FF";
                }}
              >
                Book a Free Strategy Call <ArrowRight size={14} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2.5 font-sans font-semibold text-[13.5px] transition-all duration-150"
                style={{ padding: "13px 28px", border: "1.5px solid #334155", color: "#CBD5E1" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#00A2FF";
                  (e.currentTarget as HTMLElement).style.color = "#F8FAFC";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#334155";
                  (e.currentTarget as HTMLElement).style.color = "#CBD5E1";
                }}
              >
                View Our Services
              </Link>
            </div>
            <p className="font-sans text-[12px]" style={{ color: "#475569" }}>
              No commitment required. We'll map your biggest risk and opportunity in the first call.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ─── Static hero topology (right column) ────────────────────── */
// Kept as a crisp, readable SVG — separate from the animated canvas bg
function HeroTopology() {
  return (
    <svg
      viewBox="0 0 480 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden
    >
      <defs>
        <filter id="hglow">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Ambient glow */}
      <ellipse
        cx="240"
        cy="190"
        rx="180"
        ry="140"
        fill="rgba(0,162,255,0.06)"
        filter="url(#hglow)"
      />

      {/* Connections */}
      {[
        ["240", "190", "90", "95"],
        ["240", "190", "390", "95"],
        ["240", "190", "70", "245"],
        ["240", "190", "410", "255"],
        ["240", "190", "185", "320"],
        ["240", "190", "310", "325"],
        ["90", "95", "390", "95"],
        ["70", "245", "410", "255"],
        ["185", "320", "310", "325"],
        ["90", "95", "70", "245"],
        ["390", "95", "410", "255"],
      ].map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={i < 6 ? "rgba(0,162,255,0.2)" : "rgba(30,45,69,0.8)"}
          strokeWidth="1"
        />
      ))}

      {/* Animated travel dots */}
      {[
        { path: "M240,190 L90,95", dur: "3.2s", col: "#00A2FF" },
        { path: "M90,95 L390,95", dur: "2.8s", col: "#00A2FF", begin: "0.8s" },
        { path: "M240,190 L310,325", dur: "3.6s", col: "#00C9A7", begin: "1.2s" },
        { path: "M410,255 L185,320", dur: "2.4s", col: "#00C9A7", begin: "0.4s" },
      ].map(({ path, dur, col, begin }, i) => (
        <circle key={i} r="2.5" fill={col} opacity="0.9">
          <animateMotion dur={dur} repeatCount="indefinite" path={path} begin={begin || "0s"} />
        </circle>
      ))}

      {/* Central hub */}
      {[
        { x: 216, y: 166, w: 48, h: 48, fill: "#0F1828", stroke: "#00A2FF", sw: 1.5 },
        { x: 222, y: 172, w: 36, h: 36, fill: "#0A0F1E", stroke: "#1E2D45", sw: 1 },
      ].map((r, i) => (
        <rect
          key={i}
          x={r.x}
          y={r.y}
          width={r.w}
          height={r.h}
          fill={r.fill}
          stroke={r.stroke}
          strokeWidth={r.sw}
        />
      ))}
      <text
        x="240"
        y="194"
        textAnchor="middle"
        fill="#00A2FF"
        fontSize="10"
        fontFamily="monospace"
        fontWeight="bold"
      >
        EC
      </text>
      <line x1="226" y1="200" x2="254" y2="200" stroke="#1E2D45" strokeWidth="1" />
      <text x="240" y="210" textAnchor="middle" fill="#3D4E5C" fontSize="6" fontFamily="monospace">
        CORE
      </text>
      {/* Corner accents */}
      {[
        [216, 166],
        [256, 166],
        [216, 206],
        [256, 206],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <rect
            x={cx + (i % 2 === 0 ? 0 : -6)}
            y={cy + (i < 2 ? 0 : -2)}
            width={i % 2 === 0 ? 2 : 6}
            height={i % 2 === 0 ? 6 : 2}
            fill="#00A2FF"
          />
          <rect
            x={cx + (i % 2 === 0 ? 0 : -2)}
            y={cy + (i < 2 ? 0 : -6)}
            width={i % 2 === 0 ? 6 : 2}
            height={i % 2 === 0 ? 2 : 6}
            fill="#00A2FF"
          />
        </g>
      ))}

      {/* Peripheral nodes */}
      {[
        {
          x: 56,
          y: 71,
          w: 68,
          h: 48,
          stroke: "#00C9A7",
          label: "EZA CLOUD",
          sub1: "KUBERNETES",
          sub2: "TIER III+",
          tc: "#00C9A7",
        },
        {
          x: 356,
          y: 71,
          w: 68,
          h: 48,
          stroke: "#8B5CF6",
          label: "ZURIMAIL",
          sub1: "EMAIL + SMS",
          sub2: "MARTECH",
          tc: "#8B5CF6",
        },
        {
          x: 32,
          y: 223,
          w: 72,
          h: 44,
          stroke: "#00A2FF",
          label: "M-PESA",
          sub1: "PAYMENTS",
          sub2: "NATIVE API",
          tc: "#00A2FF",
          dash: "3 2",
        },
        {
          x: 376,
          y: 233,
          w: 72,
          h: 44,
          stroke: "#00A2FF",
          label: "DPA / ODPC",
          sub1: "COMPLIANCE",
          sub2: "BY DEFAULT",
          tc: "#00A2FF",
          dash: "3 2",
        },
        {
          x: 141,
          y: 300,
          w: 88,
          h: 40,
          stroke: "#1E2D45",
          label: "CLOUD POLICY",
          sub1: "KENYA 2025",
          tc: "#7B8FA0",
        },
        {
          x: 271,
          y: 305,
          w: 88,
          h: 40,
          stroke: "#1E2D45",
          label: "SOVEREIGNTY",
          sub1: "NAIROBI HOSTED",
          tc: "#7B8FA0",
        },
      ].map(({ x, y, w, h, stroke, label, sub1, sub2, tc, dash }, i) => {
        const cx = x + w / 2;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              fill="#0F1828"
              stroke={stroke}
              strokeWidth={dash ? "1" : "1.5"}
              strokeDasharray={dash || undefined}
            />
            <text
              x={cx}
              y={y + h * 0.38}
              textAnchor="middle"
              fill={tc}
              fontSize="7"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {label}
            </text>
            {sub1 && (
              <text
                x={cx}
                y={y + h * 0.62}
                textAnchor="middle"
                fill="#3D4E5C"
                fontSize="5.5"
                fontFamily="monospace"
              >
                {sub1}
              </text>
            )}
            {sub2 && (
              <text
                x={cx}
                y={y + h * 0.82}
                textAnchor="middle"
                fill="#3D4E5C"
                fontSize="5.5"
                fontFamily="monospace"
              >
                {sub2}
              </text>
            )}
          </g>
        );
      })}

      {/* Ping rings */}
      {[44, 72, 108].map((r, i) => (
        <circle
          key={i}
          cx="240"
          cy="190"
          r={r}
          fill="none"
          stroke="#00A2FF"
          strokeWidth="1"
          strokeOpacity={0.1 - i * 0.03}
        />
      ))}

      {/* Status dots */}
      <circle cx="118" cy="71" r="3.5" fill="#00C9A7" />
      <circle cx="118" cy="71" r="3.5" fill="#00C9A7" opacity="0.4">
        <animate attributeName="r" values="3.5;7;3.5" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="356" cy="71" r="3.5" fill="#8B5CF6" />
      <circle cx="448" cy="233" r="3.5" fill="#00A2FF" />
    </svg>
  );
}
