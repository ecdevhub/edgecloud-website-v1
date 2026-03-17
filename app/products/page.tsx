import Link from "next/link";
import {
  ArrowRight,
  Shield,
  CreditCard,
  Database,
  BarChart2,
  Globe,
  ShoppingBag,
  Megaphone,
  Code2,
  Lock,
  Mail,
  Send,
  Zap,
  CheckCircle2,
  Download,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────── */
interface EzaProduct {
  icon: React.ElementType;
  name: string;
  tagline: string;
  description: string;
  bullets: string[];
  href: string;
  accentColor: string;
}

interface ZuriFeature {
  icon: React.ElementType;
  title: string;
  description: string;
  bullets: string[];
  from: string;
}

interface FutureProduct {
  icon: React.ElementType;
  name: string;
  description: string;
  eta: string;
}

/* ─── Data ───────────────────────────────────────────────────── */
const EZA_PRODUCTS: EzaProduct[] = [
  {
    icon: Globe,
    name: "Eza Website",
    tagline: "Nairobi WordPress Cloud",
    description:
      "Managed WordPress hosting on Kenyan infrastructure - with local backups, one-click restores, and human support you can actually reach.",
    bullets: [
      "Managed WordPress with Nairobi edge performance",
      "Daily backups with 30-day retention",
      "Free .co.ke domain and Kenyan SSL",
      "WhatsApp-accessible Nairobi support team",
    ],
    href: "https://eza.co.ke/website",
    accentColor: "#00C9A7",
  },
  {
    icon: ShoppingBag,
    name: "Eza Shop",
    tagline: "M-Pesa Ready Stores",
    description:
      "WooCommerce hosting pre-wired for M-Pesa Daraja - STK Push, Lipa Na M-Pesa, and automated receipts out of the box.",
    bullets: [
      "One-click M-Pesa Daraja API integration",
      "WooCommerce optimised for Kenyan checkout patterns",
      "Managed hosting with CDN and Nairobi edge nodes",
      "ZuriMail integration for order confirmations",
    ],
    href: "https://eza.co.ke/shop",
    accentColor: "#00C9A7",
  },
  {
    icon: Megaphone,
    name: "Eza Promote",
    tagline: "Digital Growth Tools",
    description:
      "Landing pages, email campaigns, basic CRM, and analytics - a lean MarTech stack for Kenyan SMEs that need results without the complexity.",
    bullets: [
      "Drag-and-drop landing page builder",
      "Email and SMS campaigns with DPA consent built in",
      "Basic CRM and contact management",
      "Privacy-first analytics (Kenya-hosted)",
    ],
    href: "https://eza.co.ke/promote",
    accentColor: "#00C9A7",
  },
  {
    icon: Code2,
    name: "Eza Apps",
    tagline: "Managed Dev & Kubernetes",
    description:
      "For developers who want managed containers, databases, and app infrastructure on Kenyan sovereign cloud - without the ops overhead.",
    bullets: [
      "Managed Kubernetes with automated upgrades",
      "Managed databases (Postgres, MySQL, Redis)",
      "CI/CD integration (GitHub Actions, GitLab CI)",
      "Kenya Cloud Policy 2025 open-standards compliant",
    ],
    href: "https://eza.co.ke/apps",
    accentColor: "#00C9A7",
  },
  {
    icon: Lock,
    name: "Eza Private",
    tagline: "DPA Cloud for Regulated Teams",
    description:
      "Dedicated, single-tenant cloud for banks, SACCOs, health providers, and government contractors - with full data residency guarantees and DPA-by-default.",
    bullets: [
      "100% Nairobi data residency - data never leaves Kenya",
      "DPIA-ready documentation included",
      "SASRA, health, and government compliance templates",
      "Role-based access controls and full audit trails",
    ],
    href: "https://eza.co.ke/private",
    accentColor: "#00C9A7",
  },
];

const ZURI_FEATURES: ZuriFeature[] = [
  {
    icon: Mail,
    title: "Corporate Email",
    description:
      "Professional business email hosted in Kenya, DPA-aligned, and fully under your domain.",
    bullets: [
      "Custom domain email (yourname@yourcompany.co.ke)",
      "Kenya-hosted - your data doesn't leave the country",
      "99.9% uptime with Nairobi-based support",
      "Mobile-first webmail (English and Swahili)",
      "Anti-spam and anti-phishing protection",
    ],
    from: "KES 499 / user / month",
  },
  {
    icon: Send,
    title: "SMS & Email Marketing",
    description:
      "Campaign management with Kenya's DPA consent requirements at the core, not as an afterthought.",
    bullets: [
      "Drag-and-drop campaign builder (email and SMS)",
      "Double opt-in and preference centres (DPA-compliant)",
      "M-Pesa-triggered automations and receipt flows",
      "Audience segmentation by behaviour and location",
      "Real-time analytics (opens, clicks, conversions)",
    ],
    from: "KES 2,500 / month (5,000 contacts)",
  },
  {
    icon: Zap,
    title: "Marketing Automation",
    description:
      "Automated customer journeys triggered by M-Pesa payments, website events, or CRM data.",
    bullets: [
      "Visual workflow builder for automated journeys",
      "M-Pesa webhook triggers → email/SMS confirmation",
      "WooCommerce / Eza Shop native integration",
      "Abandoned cart recovery sequences",
      "Every automation mapped to a DPA lawful basis",
    ],
    from: "KES 5,500 / month",
  },
];

const FUTURE_PRODUCTS: FutureProduct[] = [
  {
    icon: CreditCard,
    name: "PayEdge",
    description:
      "Kenya's first fully DPA-compliant, developer-friendly M-Pesa infrastructure layer. One SDK. Every M-Pesa flow. Full reconciliation.",
    eta: "Coming 2026",
  },
  {
    icon: Database,
    name: "EzaVault",
    description:
      "Sovereign data storage and compliance management - DPA documentation, audit trails, and DPIA workflows in one dashboard.",
    eta: "In Design",
  },
  {
    icon: BarChart2,
    name: "EdgeAnalytics",
    description:
      "Privacy-first web analytics, Kenya-hosted and ODPC-aligned - a Plausible-style alternative for East African data sovereignty.",
    eta: "In Design",
  },
];

/* ─── Page ───────────────────────────────────────────────────── */
export default function SolutionsPage() {
  return (
    <main className="bg-[#F9FAFB]">
      {/* ══════════════════════════════════════════════════════
          PAGE HEADER - compact, light
      ══════════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-[#E6EAEE] pt-28 pb-10 md:pt-32 md:pb-12">
        <div className="max-w-[1320px] mx-auto px-5 md:px-10">
          {/* Breadcrumb */}
          <p className="flex items-center gap-2 font-sans text-[11px] text-[#BDC8D2] font-medium mb-4">
            <Link href="/" className="hover:text-[#7B8FA0] transition-colors duration-150">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#7B8FA0]">Solutions</span>
          </p>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="eyebrow mb-3">Our Products & Solutions</p>
              <h1
                className="font-serif text-[#0B1016]"
                style={{
                  fontSize: "clamp(30px, 4vw, 48px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.03em",
                  fontWeight: 400,
                }}
              >
                The EdgeCloud Solutions Portfolio
              </h1>
            </div>
            <p className="font-sans text-[15px] text-[#3D4E5C] leading-relaxed max-w-[480px] lg:text-right">
              Two production-ready products. A growing suite of Kenya-first tools. All designed,
              hosted, and supported by our Nairobi team.
            </p>
          </div>

          {/* Product jump links */}
          <div className="flex flex-wrap gap-2.5 mt-8 pt-8 border-t border-[#E6EAEE]">
            {[
              {
                label: "Eza Cloud",
                href: "#eza-cloud",
                color:
                  "text-[#00C9A7] border-[#00C9A7]/40 hover:border-[#00C9A7] hover:bg-[#00C9A7]/5",
              },
              {
                label: "ZuriMail",
                href: "#zurimail",
                color:
                  "text-[#8B5CF6] border-[#8B5CF6]/40 hover:border-[#8B5CF6] hover:bg-[#8B5CF6]/5",
              },
              {
                label: "Coming Soon",
                href: "#future-stack",
                color:
                  "text-[#F59E0B] border-[#F59E0B]/40 hover:border-[#F59E0B] hover:bg-[#F59E0B]/5",
              },
            ].map(({ label, href, color }) => (
              <a
                key={label}
                href={href}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 border-[1.5px] font-sans font-bold text-[10.5px] tracking-[0.10em] uppercase transition-all duration-150 ${color}`}
              >
                {label} <ArrowRight size={10} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          EZA CLOUD
      ══════════════════════════════════════════════════════ */}
      <section id="eza-cloud" className="py-20 md:py-28 bg-[#F9FAFB] border-b border-[#E6EAEE]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-10">
          {/* Section label */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <p className="font-sans font-black text-[9.5px] tracking-[0.16em] uppercase text-[#00C9A7] mb-2">
                by EdgeCloud Technologies
              </p>
              <div className="flex items-center gap-3">
                <div className="w-1 h-9 bg-[#00C9A7] shrink-0" />
                <div>
                  <h2
                    className="font-serif text-[#0B1016]"
                    style={{
                      fontSize: "clamp(24px, 3vw, 36px)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.025em",
                      fontWeight: 400,
                    }}
                  >
                    Eza Cloud
                  </h2>
                  <p className="font-sans text-[14px] text-[#7B8FA0] mt-0.5">
                    Kenya's DPA-compliant cloud platform - five products, one Nairobi stack.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link
                href="/contact?product=eza-cloud"
                className="inline-flex items-center gap-2 px-5 py-[11px] bg-[#00C9A7] border-[1.5px] border-[#00C9A7] font-sans font-bold text-[12px] text-white hover:bg-[#00b396] hover:-translate-y-px hover:shadow-[3px_3px_0px_0px_rgba(0,201,167,0.20)] transition-all duration-150"
              >
                Book a Demo <ArrowRight size={12} />
              </Link>
              <a
                href="/assets/eza-cloud-overview.pdf"
                className="inline-flex items-center gap-2 px-5 py-[11px] border-[1.5px] border-[#D4DBE2] font-sans font-semibold text-[12px] text-[#3D4E5C] hover:border-[#00C9A7] hover:text-[#00C9A7] transition-all duration-150"
              >
                <Download size={12} /> Overview PDF
              </a>
            </div>
          </div>

          {/* 5 products - 3+2 grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-[1.5px] border-[#D4DBE2] mb-0">
            {EZA_PRODUCTS.slice(0, 3).map(
              ({ icon: Icon, name, tagline, description, bullets, href }, i) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={[
                    "group flex flex-col p-7 bg-white border-[#D4DBE2] hover:bg-[#F9FAFB] transition-colors duration-150",
                    i < 2 ? "border-r-[1.5px]" : "",
                    "border-b-[1.5px]",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-10 h-10 border-[1.5px] border-[#D4DBE2] flex items-center justify-center group-hover:border-[#00C9A7] transition-colors duration-150">
                      <Icon size={16} className="text-[#00C9A7]" />
                    </div>
                    <ArrowRight
                      size={13}
                      className="text-[#BDC8D2] group-hover:text-[#00C9A7] group-hover:translate-x-0.5 transition-all duration-150 mt-1"
                    />
                  </div>

                  <div className="w-0 group-hover:w-5 h-[2px] bg-[#00C9A7] mb-3 transition-all duration-200" />

                  <h3 className="font-sans font-bold text-[15px] text-[#0B1016] mb-0.5 leading-tight">
                    {name}
                  </h3>
                  <p className="font-sans font-semibold text-[11.5px] text-[#00C9A7] tracking-[0.04em] mb-3">
                    {tagline}
                  </p>
                  <p className="font-sans text-[13px] text-[#3D4E5C] leading-relaxed mb-5">
                    {description}
                  </p>

                  <ul className="space-y-1.5 mt-auto">
                    {bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 font-sans text-[12px] text-[#7B8FA0]"
                      >
                        <CheckCircle2 size={11} className="text-[#00C9A7] shrink-0 mt-0.5" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </a>
              ),
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-x-[1.5px] border-b-[1.5px] border-[#D4DBE2]">
            {EZA_PRODUCTS.slice(3).map(
              ({ icon: Icon, name, tagline, description, bullets, href }, i) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={[
                    "group flex flex-col p-7 bg-white border-[#D4DBE2] hover:bg-[#F9FAFB] transition-colors duration-150",
                    i === 0 ? "border-r-[1.5px]" : "",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-10 h-10 border-[1.5px] border-[#D4DBE2] flex items-center justify-center group-hover:border-[#00C9A7] transition-colors duration-150">
                      <Icon size={16} className="text-[#00C9A7]" />
                    </div>
                    <ArrowRight
                      size={13}
                      className="text-[#BDC8D2] group-hover:text-[#00C9A7] group-hover:translate-x-0.5 transition-all duration-150 mt-1"
                    />
                  </div>

                  <div className="w-0 group-hover:w-5 h-[2px] bg-[#00C9A7] mb-3 transition-all duration-200" />

                  <h3 className="font-sans font-bold text-[15px] text-[#0B1016] mb-0.5 leading-tight">
                    {name}
                  </h3>
                  <p className="font-sans font-semibold text-[11.5px] text-[#00C9A7] tracking-[0.04em] mb-3">
                    {tagline}
                  </p>
                  <p className="font-sans text-[13px] text-[#3D4E5C] leading-relaxed mb-5">
                    {description}
                  </p>

                  <ul className="space-y-1.5 mt-auto">
                    {bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 font-sans text-[12px] text-[#7B8FA0]"
                      >
                        <CheckCircle2 size={11} className="text-[#00C9A7] shrink-0 mt-0.5" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </a>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ZURIMAIL
      ══════════════════════════════════════════════════════ */}
      <section id="zurimail" className="py-20 md:py-28 bg-white border-b border-[#E6EAEE]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <p className="font-sans font-black text-[9.5px] tracking-[0.16em] uppercase text-[#8B5CF6] mb-2">
                by EdgeCloud Technologies
              </p>
              <div className="flex items-center gap-3">
                <div className="w-1 h-9 bg-[#8B5CF6] shrink-0" />
                <div>
                  <h2
                    className="font-serif text-[#0B1016]"
                    style={{
                      fontSize: "clamp(24px, 3vw, 36px)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.025em",
                      fontWeight: 400,
                    }}
                  >
                    ZuriMail
                  </h2>
                  <p className="font-sans text-[14px] text-[#7B8FA0] mt-0.5">
                    Corporate email & MarTech suite - DPA-compliant, Kenya-hosted, KES-priced.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link
                href="/contact?product=zurimail"
                className="inline-flex items-center gap-2 px-5 py-[11px] bg-[#8B5CF6] border-[1.5px] border-[#8B5CF6] font-sans font-bold text-[12px] text-white hover:bg-[#7c4fe0] hover:-translate-y-px hover:shadow-[3px_3px_0px_0px_rgba(139,92,246,0.20)] transition-all duration-150"
              >
                Join Early Access <ArrowRight size={12} />
              </Link>
              <Link
                href="/products/zurimail#plans"
                className="inline-flex items-center gap-2 px-5 py-[11px] border-[1.5px] border-[#D4DBE2] font-sans font-semibold text-[12px] text-[#3D4E5C] hover:border-[#8B5CF6] hover:text-[#8B5CF6] transition-all duration-150"
              >
                Compare Plans
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-[1.5px] border-[#D4DBE2]">
            {ZURI_FEATURES.map(({ icon: Icon, title, description, bullets, from }, i) => (
              <div
                key={title}
                className={[
                  "group flex flex-col p-7 bg-white border-[#D4DBE2] hover:bg-[#F9FAFB] transition-colors duration-150",
                  i < 2 ? "border-r-[1.5px]" : "",
                ].join(" ")}
              >
                <div className="w-10 h-10 border-[1.5px] border-[#D4DBE2] flex items-center justify-center mb-5 group-hover:border-[#8B5CF6] transition-colors duration-150">
                  <Icon size={16} className="text-[#8B5CF6]" />
                </div>

                <div className="w-0 group-hover:w-5 h-[2px] bg-[#8B5CF6] mb-3 transition-all duration-200" />

                <h3 className="font-sans font-bold text-[15px] text-[#0B1016] mb-2 leading-tight">
                  {title}
                </h3>
                <p className="font-sans text-[13px] text-[#3D4E5C] leading-relaxed mb-5">
                  {description}
                </p>

                <ul className="space-y-1.5 flex-1 mb-6">
                  {bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 font-sans text-[12px] text-[#7B8FA0]"
                    >
                      <CheckCircle2 size={11} className="text-[#8B5CF6] shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-[#E6EAEE]">
                  <p className="font-sans font-black text-[9px] tracking-[0.12em] uppercase text-[#BDC8D2] mb-1">
                    Plans from
                  </p>
                  <p className="font-sans font-bold text-[13px] text-[#8B5CF6]">{from}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FUTURE STACK
      ══════════════════════════════════════════════════════ */}
      <section id="future-stack" className="py-20 md:py-28 bg-[#0A0F1E] border-b border-[#1E2D45]">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />

        <div className="relative z-10 max-w-[1320px] mx-auto px-5 md:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <p className="flex items-center gap-2 text-[11px] font-black tracking-[0.18em] uppercase text-[#F59E0B] mb-3">
                <span className="block w-5 h-[2px] bg-[#F59E0B]" />
                Coming Next
              </p>
              <h2
                className="text-white"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(24px, 3vw, 36px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.025em",
                  fontWeight: 400,
                  color: "#F59E0B",
                }}
              >
                What's Coming Next
              </h2>
              <p className="font-sans text-[14px] text-white/45 mt-2 max-w-[420px]">
                The next generation of Kenya-first tools, shaped by our customers and the gaps we
                see in the market.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/contact?interest=waitlist"
                className="inline-flex items-center gap-2 px-5 py-[11px] bg-[#F59E0B] border-[1.5px] border-[#F59E0B] font-sans font-bold text-[12px] text-[#0A0F1E] hover:-translate-y-px hover:shadow-[3px_3px_0px_0px_rgba(245,158,11,0.25)] transition-all duration-150"
              >
                Join the Waitlist <ArrowRight size={12} />
              </Link>
              <Link
                href="/contact?interest=roadmap-survey"
                className="inline-flex items-center gap-2 px-5 py-[11px] border-[1.5px] border-white/20 font-sans font-semibold text-[12px] text-white/70 hover:border-white/50 hover:text-white transition-all duration-150"
                style={{ color: "white" }}
              >
                Shape Our Roadmap
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-[1.5px] border-[#1E2D45]">
            {FUTURE_PRODUCTS.map(({ icon: Icon, name, description, eta }, i) => (
              <div
                key={name}
                className={[
                  "group p-7 border-[#1E2D45] hover:bg-[#0F1828] transition-colors duration-150",
                  i < 2 ? "border-r-[1.5px]" : "",
                ].join(" ")}
              >
                <span className="inline-flex items-center px-2.5 py-1 border-[1.5px] border-[#F59E0B]/30 font-sans font-black text-[9px] tracking-[0.12em] uppercase text-[#F59E0B] mb-5">
                  {eta}
                </span>

                <div className="w-10 h-10 border-[1.5px] border-[#1E2D45] flex items-center justify-center mb-4 group-hover:border-[#F59E0B]/40 transition-colors duration-150">
                  <Icon size={16} className="text-[#F59E0B]" />
                </div>

                <div className="w-0 group-hover:w-5 h-[2px] bg-[#F59E0B] mb-3 transition-all duration-200" />

                <h3
                  className="font-sans font-bold text-[15px] text-white mb-2"
                  style={{ color: "white" }}
                >
                  {name}
                </h3>
                <p className="font-sans text-[12.5px] text-white/40 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1320px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-[1.5px] border-[#D4DBE2]">
            <div className="p-10 border-b lg:border-b-0 lg:border-r border-[#D4DBE2] flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-9 bg-[#00C9A7]" />
                <div>
                  <p className="font-sans font-black text-[9px] tracking-[0.14em] uppercase text-[#00C9A7] mb-0.5">
                    Eza Cloud
                  </p>
                  <h3 className="font-sans font-bold text-[18px] text-[#0B1016] leading-tight">
                    Kenya-sovereign cloud for any team size
                  </h3>
                </div>
              </div>
              <p className="font-sans text-[13.5px] text-[#3D4E5C] leading-relaxed mb-8 flex-1">
                From a simple WordPress site to a full sovereign Kubernetes environment. Book a
                30-minute demo with our Nairobi engineers.
              </p>
              <Link
                href="/contact?product=eza-cloud"
                className="inline-flex items-center gap-2 px-6 py-[12px] bg-[#00C9A7] border-[1.5px] border-[#00C9A7] font-sans font-bold text-[12px] text-white hover:bg-[#00b396] hover:-translate-y-px hover:shadow-[3px_3px_0px_0px_rgba(0,201,167,0.20)] transition-all duration-150 self-start"
              >
                Book a Free Demo <ArrowRight size={12} />
              </Link>
            </div>

            <div className="p-10 flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-9 bg-[#8B5CF6]" />
                <div>
                  <p className="font-sans font-black text-[9px] tracking-[0.14em] uppercase text-[#8B5CF6] mb-0.5">
                    ZuriMail
                  </p>
                  <h3 className="font-sans font-bold text-[18px] text-[#0B1016] leading-tight">
                    DPA-compliant email & marketing automation
                  </h3>
                </div>
              </div>
              <p className="font-sans text-[13.5px] text-[#3D4E5C] leading-relaxed mb-8 flex-1">
                Early access is open. Kenya-hosted corporate email, SMS campaigns, and M-Pesa
                automation at KES pricing with ODPC defaults built in.
              </p>
              <Link
                href="/contact?product=zurimail"
                className="inline-flex items-center gap-2 px-6 py-[12px] bg-[#8B5CF6] border-[1.5px] border-[#8B5CF6] font-sans font-bold text-[12px] text-white hover:bg-[#7c4fe0] hover:-translate-y-px hover:shadow-[3px_3px_0px_0px_rgba(139,92,246,0.20)] transition-all duration-150 self-start"
              >
                Join Early Access <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Trust strip */}
          <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-2.5">
            {[
              "Kenya DPA Aligned",
              "KES-Priced Plans",
              "Nairobi-Based Support",
              "No Lock-in",
              "Kenya Cloud Policy 2025 Ready",
            ].map((b) => (
              <span
                key={b}
                className="flex items-center gap-1.5 font-sans font-bold text-[10.5px] tracking-[0.08em] text-[#BDC8D2] uppercase"
              >
                <Shield size={9} className="text-[#00A2FF]" />
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
