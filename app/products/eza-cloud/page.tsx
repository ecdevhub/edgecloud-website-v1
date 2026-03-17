"use client";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  MapPin,
  CreditCard,
  Globe,
  ShoppingCart,
  Megaphone,
  Code2,
  Lock,
  Zap,
  Server,
} from "lucide-react";

/* ─── Data ───────────────────────────────────────────────────── */
const TRUST_STATS = [
  { icon: Shield, label: "DPA-Aligned by Default" },
  { icon: MapPin, label: "Nairobi Data Centres" },
  { icon: CreditCard, label: "M-Pesa-Native" },
];

const PRODUCTS = [
  {
    icon: Globe,
    name: "Eza Website",
    tagline: "Nairobi WordPress Cloud",
    href: "https://eza.co.ke/website",
    accentColor: "#00C9A7",
    description:
      "Managed WordPress hosting for Kenyan businesses - local backups, human support, none of the server headaches.",
    bullets: [
      "Managed WordPress on Tier III+ Nairobi infrastructure",
      "Daily backups with 30-day retention",
      "DPA-aligned data residency: your data stays in Kenya",
      "Nairobi-based support in English & Swahili",
    ],
  },
  {
    icon: ShoppingCart,
    name: "Eza Shop",
    tagline: "M-Pesa Ready Stores",
    href: "https://eza.co.ke/shop",
    accentColor: "#00A2FF",
    description:
      "One-click M-Pesa + WooCommerce/Shopify connector, pre-tuned for Kenyan checkout patterns.",
    bullets: [
      "M-Pesa Daraja API (STK Push, Lipa Na M-Pesa) out of the box",
      "WooCommerce and Shopify connectors",
      "Kenyan SSL & .co.ke / .ke domain management",
      "DPA-compliant customer data handling",
    ],
  },
  {
    icon: Megaphone,
    name: "Eza Promote",
    tagline: "Digital Growth Tools",
    href: "https://eza.co.ke/promote",
    accentColor: "#F59E0B",
    description:
      "Landing pages, email, basic CRM, and analytics - everything a Kenyan SME needs to grow.",
    bullets: [
      "Drag-and-drop landing page builder",
      "Email campaigns with DPA consent management built in",
      "Basic CRM and audience segmentation",
      "Privacy-first analytics (Kenya-hosted)",
    ],
  },
  {
    icon: Code2,
    name: "Eza Apps",
    tagline: "Managed Dev & K8s",
    href: "https://eza.co.ke/apps",
    accentColor: "#8B5CF6",
    description:
      "Managed apps, containers, and databases on Kenyan infrastructure - orchestration without the ops burden.",
    bullets: [
      "Managed Kubernetes with auto-scaling node pools",
      "Built-in CI/CD (GitHub Actions, GitLab CI)",
      "Managed databases (Postgres, MySQL, Redis)",
      "Kenya Cloud Policy 2025 open-standards aligned",
    ],
  },
  {
    icon: Lock,
    name: "Eza Private",
    tagline: "DPA Cloud for Regulated Teams",
    href: "https://eza.co.ke/private",
    accentColor: "#DC2626",
    description:
      "Dedicated, single-tenant cloud for banks, SACCOs, health providers, and government contractors.",
    bullets: [
      "Single-tenant infrastructure, fully within Kenya",
      "DPIA-ready documentation and DPA compliance pack",
      "Sector templates: FinTech/SASRA, HealthTech, Education, Government",
      "Government procurement readiness documentation",
    ],
  },
];

const PLATFORM_FEATURES = [
  "Managed infrastructure - no DevOps team required",
  "DPA consent logs stored immutably in-region",
  "M-Pesa STK Push, C2B, B2C APIs pre-integrated",
  "SSL, WAF, and DDoS protection included",
  "KES-priced plans - no USD conversion surprises",
  "Nairobi support in English & Swahili, WhatsApp-accessible",
];

const ARCH_LAYERS = [
  {
    label: "Your Application",
    color: "#00A2FF",
    items: ["WordPress / WooCommerce", "Custom App", "API"],
  },
  {
    label: "Eza Cloud Platform",
    color: "#00C9A7",
    items: ["Managed K8s", "Load Balancer", "DPA Logs"],
  },
  { label: "Integrations", color: "#8B5CF6", items: ["M-Pesa STK", "ZuriMail", "Analytics"] },
  { label: "Nairobi Data Centre", color: "#F59E0B", items: ["Primary", "Backup", "CDN Edge"] },
];

const PLANS = [
  {
    name: "Starter",
    price: "KES - / mo",
    note: "Pricing launching soon",
    features: [
      "2 vCPU / 4 GB RAM",
      "50 GB SSD",
      "M-Pesa STK Push",
      "DPA Audit Logs",
      "Nairobi Support (Email)",
    ],
    cta: "Get started",
    highlight: false,
  },
  {
    name: "Business",
    price: "KES - / mo",
    note: "Most popular",
    features: [
      "8 vCPU / 16 GB RAM",
      "250 GB SSD + Backups",
      "Full M-Pesa Suite",
      "Managed Kubernetes",
      "WooCommerce Pre-config",
      "Priority Support (WhatsApp)",
    ],
    cta: "Book a demo",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    note: "For regulated industries",
    features: [
      "Dedicated infrastructure",
      "Custom compliance reports",
      "DPO consultation",
      "SLA-backed uptime",
      "Dedicated account manager",
      "On-site onboarding",
    ],
    cta: "Contact us",
    highlight: false,
  },
];

const FAQS = [
  {
    q: "Is Eza Cloud certified under Kenya's DPA?",
    a: "Eza Cloud is architected for DPA alignment. We provide DPIA templates, data processing agreements, and audit logs. We recommend engaging a certified DPO for full legal sign-off.",
  },
  {
    q: "How long does M-Pesa integration take?",
    a: "For standard STK Push flows, most clients go live within 3–5 days. Complex reconciliation or B2C flows may take 1–2 weeks depending on your Safaricom API tier.",
  },
  {
    q: "Can I migrate my existing WooCommerce store?",
    a: "Yes. We offer managed migration with zero-downtime deployment. Our team handles DNS cutover, SSL, and M-Pesa reconfiguration.",
  },
  {
    q: "Where are your data centres?",
    a: "Our primary infrastructure is in Nairobi, Kenya. No customer data is transferred outside Kenya without explicit written consent and a Data Processing Agreement.",
  },
];

/* ─── Page ───────────────────────────────────────────────────── */
export default function EzaCloudPage() {
  return (
    <main className="bg-[#F9FAFB]">
      {/* ══════════════════════════════════════════════════════
          PAGE HEADER - compact, light
      ══════════════════════════════════════════════════════ */}
      <section className="pt-32 pb-10 md:pt-36 md:pb-12 bg-white border-b border-[#E6EAEE]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-10">
          {/* Breadcrumb */}
          <p className="flex items-center gap-2 font-sans text-[11px] text-[#BDC8D2] font-medium mb-5">
            <Link href="/" className="hover:text-[#7B8FA0] transition-colors duration-150">
              Home
            </Link>
            <span>/</span>
            <Link href="/solutions" className="hover:text-[#7B8FA0] transition-colors duration-150">
              Solutions
            </Link>
            <span>/</span>
            <span className="text-[#7B8FA0]">Eza Cloud</span>
          </p>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-[680px]">
              <p className="font-sans font-black text-[9.5px] tracking-[0.16em] uppercase text-[#00C9A7] mb-3">
                by EdgeCloud Technologies
              </p>
              <h1
                className="font-serif text-[#0B1016] mb-4"
                style={{
                  fontSize: "clamp(32px, 4vw, 52px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.035em",
                  fontWeight: 400,
                }}
              >
                Eza Cloud
              </h1>
              <p className="font-sans text-[16px] md:text-[17px] text-[#3D4E5C] leading-relaxed max-w-[560px]">
                Kenya's only cloud platform with DPA compliance, M-Pesa-native payments, managed
                Kubernetes, and Tier III+ Nairobi data centres - built into one coherent stack.
              </p>
            </div>

            <div className="flex flex-col gap-3 shrink-0">
              <Link
                href="/contact?product=eza-cloud&intent=demo"
                className="inline-flex items-center gap-2 px-6 py-[13px] bg-[#00C9A7] border-[1.5px] border-[#00C9A7] font-sans font-bold text-[13px] text-white hover:bg-[#00b396] hover:-translate-y-px hover:shadow-[3px_3px_0px_0px_rgba(0,201,167,0.25)] transition-all duration-150"
              >
                Book an Eza Cloud Demo <ArrowRight size={13} />
              </Link>
              <a
                href="#plans"
                className="inline-flex items-center gap-2 px-6 py-[13px] border-[1.5px] border-[#D4DBE2] font-sans font-semibold text-[13px] text-[#3D4E5C] hover:border-[#00C9A7] hover:text-[#00C9A7] transition-all duration-150"
              >
                View Plans & Pricing <ArrowRight size={13} />
              </a>
            </div>
          </div>

          {/* Trust stats */}
          <div className="flex flex-wrap gap-5 mt-8 pt-7 border-t border-[#E6EAEE]">
            {TRUST_STATS.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-2 font-sans font-bold text-[11px] tracking-[0.08em] uppercase text-[#7B8FA0]"
              >
                <Icon size={12} className="text-[#00C9A7]" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PRODUCT SUITE - 5 PRODUCTS
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#F9FAFB] border-b border-[#E6EAEE]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
            <div>
              <p className="eyebrow mb-3">Five Products. One Platform.</p>
              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(24px, 3vw, 38px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.025em",
                  fontWeight: 400,
                }}
              >
                Choose the right Eza Cloud for your needs
              </h2>
            </div>
            <Link
              href="/solutions#eza-cloud"
              className="inline-flex items-center gap-1.5 font-sans font-bold text-[12px] text-[#00C9A7] hover:gap-2.5 transition-all duration-150 shrink-0"
            >
              Full overview on Solutions page <ArrowRight size={12} />
            </Link>
          </div>

          {/* 3-top + 2-bottom grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-[1.5px] border-[#D4DBE2]">
            {PRODUCTS.slice(0, 3).map(
              ({ icon: Icon, name, tagline, description, bullets, href, accentColor }, i) => (
                <div
                  key={name}
                  className={[
                    "group flex flex-col p-7 bg-white border-[#D4DBE2] hover:bg-[#F9FAFB] transition-colors duration-150",
                    i < 2 ? "border-r-[1.5px]" : "",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-10 h-10 border-[1.5px] border-[#D4DBE2] flex items-center justify-center transition-colors duration-150">
                      <Icon size={16} style={{ color: accentColor }} />
                    </div>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans font-black text-[9px] tracking-[0.12em] uppercase opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity duration-150"
                      style={{ color: accentColor }}
                    >
                      Visit <ArrowRight size={9} />
                    </a>
                  </div>
                  <div
                    className="w-0 group-hover:w-5 h-[2px] mb-3 transition-all duration-200"
                    style={{ background: accentColor }}
                  />
                  <h3 className="font-sans font-bold text-[15px] text-[#0B1016] mb-0.5 leading-tight">
                    {name}
                  </h3>
                  <p
                    className="font-sans font-semibold text-[11px] tracking-[0.04em] uppercase mb-3"
                    style={{ color: accentColor }}
                  >
                    {tagline}
                  </p>
                  <p className="font-sans text-[13px] text-[#3D4E5C] leading-relaxed mb-5 flex-1">
                    {description}
                  </p>
                  <ul className="space-y-1.5 pt-4 border-t border-[#E6EAEE]">
                    {bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 font-sans text-[12px] text-[#7B8FA0]"
                      >
                        <CheckCircle2
                          size={11}
                          className="shrink-0 mt-0.5"
                          style={{ color: accentColor }}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-x-[1.5px] border-b-[1.5px] border-[#D4DBE2]">
            {PRODUCTS.slice(3).map(
              ({ icon: Icon, name, tagline, description, bullets, href, accentColor }, i) => (
                <div
                  key={name}
                  className={[
                    "group flex flex-col p-7 bg-white border-[#D4DBE2] hover:bg-[#F9FAFB] transition-colors duration-150 border-t-[1.5px]",
                    i === 0 ? "border-r-[1.5px]" : "",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-10 h-10 border-[1.5px] border-[#D4DBE2] flex items-center justify-center transition-colors duration-150">
                      <Icon size={16} style={{ color: accentColor }} />
                    </div>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans font-black text-[9px] tracking-[0.12em] uppercase opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity duration-150"
                      style={{ color: accentColor }}
                    >
                      Visit <ArrowRight size={9} />
                    </a>
                  </div>
                  <div
                    className="w-0 group-hover:w-5 h-[2px] mb-3 transition-all duration-200"
                    style={{ background: accentColor }}
                  />
                  <h3 className="font-sans font-bold text-[15px] text-[#0B1016] mb-0.5 leading-tight">
                    {name}
                  </h3>
                  <p
                    className="font-sans font-semibold text-[11px] tracking-[0.04em] uppercase mb-3"
                    style={{ color: accentColor }}
                  >
                    {tagline}
                  </p>
                  <p className="font-sans text-[13px] text-[#3D4E5C] leading-relaxed mb-5 flex-1">
                    {description}
                  </p>
                  <ul className="space-y-1.5 pt-4 border-t border-[#E6EAEE]">
                    {bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 font-sans text-[12px] text-[#7B8FA0]"
                      >
                        <CheckCircle2
                          size={11}
                          className="shrink-0 mt-0.5"
                          style={{ color: accentColor }}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PLATFORM FEATURES + ARCHITECTURE
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white border-b border-[#E6EAEE]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-[1.5px] border-[#D4DBE2]">
            {/* Left - platform features */}
            <div className="p-10 md:p-12 border-b lg:border-b-0 lg:border-r-[1.5px] border-[#D4DBE2]">
              <p className="eyebrow mb-4">Platform</p>
              <h2
                className="font-serif mb-4"
                style={{
                  fontSize: "clamp(22px, 2.5vw, 34px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.025em",
                  fontWeight: 400,
                }}
              >
                Everything wired together,
                <br />
                out of the box.
              </h2>
              <p className="font-sans text-[14px] text-[#3D4E5C] leading-relaxed mb-8">
                Eza Cloud isn't a raw VPS. It's a pre-integrated platform where Kubernetes,
                WooCommerce, M-Pesa, and your compliance layer are connected from day one.
              </p>
              <ul className="space-y-3">
                {PLATFORM_FEATURES.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 font-sans text-[13.5px] text-[#3D4E5C]"
                  >
                    <CheckCircle2 size={14} className="text-[#00C9A7] shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right - architecture diagram */}
            <div className="p-10 md:p-12 bg-[#F9FAFB]">
              <p className="eyebrow mb-6">Architecture</p>
              <div className="space-y-0 border-[1.5px] border-[#D4DBE2]">
                {ARCH_LAYERS.map(({ label, color, items }, i) => (
                  <div
                    key={label}
                    className={[
                      "p-5 border-[#D4DBE2]",
                      i < ARCH_LAYERS.length - 1 ? "border-b-[1.5px]" : "",
                    ].join(" ")}
                  >
                    <p
                      className="font-sans font-black text-[9.5px] tracking-[0.12em] uppercase mb-3"
                      style={{ color }}
                    >
                      {label}
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {items.map((item) => (
                        <div
                          key={item}
                          className="py-2.5 px-3 border-[1.5px] font-sans font-semibold text-[11.5px] text-[#0B1016] text-center"
                          style={{ borderColor: `${color}30`, background: `${color}08` }}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                    {i < ARCH_LAYERS.length - 1 && (
                      <div className="text-center mt-3 font-sans text-[#BDC8D2] text-[11px]">↓</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PRICING
      ══════════════════════════════════════════════════════ */}
      <section id="plans" className="py-20 md:py-28 bg-[#F9FAFB] border-b border-[#E6EAEE]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-10">
          <div className="max-w-[480px] mb-12">
            <p className="eyebrow mb-3">Plans & Pricing</p>
            <h2
              className="font-serif mb-3"
              style={{
                fontSize: "clamp(24px, 3vw, 38px)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                fontWeight: 400,
              }}
            >
              Simple, transparent pricing.
            </h2>
            <p className="font-sans text-[13.5px] text-[#7B8FA0] leading-relaxed">
              All plans include DPA compliance tooling and Nairobi-based support. KES pricing
              launching soon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-[1.5px] border-[#D4DBE2]">
            {PLANS.map(({ name, price, note, features, cta, highlight }, i) => (
              <div
                key={name}
                className={[
                  "flex flex-col p-8 border-[#D4DBE2]",
                  i < 2 ? "border-r-[1.5px]" : "",
                  highlight ? "bg-white" : "bg-white",
                ].join(" ")}
              >
                {/* Plan label */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-sans font-bold text-[16px] text-[#0B1016]">{name}</h3>
                  {highlight && (
                    <span className="inline-flex items-center px-2.5 py-1 bg-[#00C9A7] font-sans font-black text-[9px] tracking-[0.10em] uppercase text-white">
                      Most Popular
                    </span>
                  )}
                  {!highlight && (
                    <span className="font-sans text-[11px] text-[#BDC8D2]">{note}</span>
                  )}
                </div>

                {/* Price */}
                <p
                  className="font-serif mb-6"
                  style={{
                    fontSize: "clamp(24px, 2.5vw, 32px)",
                    letterSpacing: "-0.02em",
                    color: highlight ? "#00C9A7" : "#0B1016",
                  }}
                >
                  {price}
                </p>

                {/* Features */}
                <ul className="space-y-2.5 mb-8 flex-1">
                  {features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 font-sans text-[13px] text-[#3D4E5C]"
                    >
                      <CheckCircle2 size={13} className="text-[#00C9A7] shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/contact?product=eza-cloud"
                  className={[
                    "inline-flex items-center justify-center gap-2 px-5 py-[11px] font-sans font-bold text-[13px] border-[1.5px] transition-all duration-150",
                    highlight
                      ? "bg-[#00C9A7] border-[#00C9A7] text-white hover:bg-[#00b396] hover:-translate-y-px hover:shadow-[3px_3px_0px_0px_rgba(0,201,167,0.20)]"
                      : "bg-white border-[#D4DBE2] text-[#3D4E5C] hover:border-[#00C9A7] hover:text-[#00C9A7]",
                  ].join(" ")}
                >
                  {cta} <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white border-b border-[#E6EAEE]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Sticky label col */}
            <div className="lg:col-span-4 lg:pr-12 mb-10 lg:mb-0">
              <p className="eyebrow mb-3">FAQ</p>
              <h2
                className="font-serif mb-4"
                style={{
                  fontSize: "clamp(22px, 2.5vw, 34px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.025em",
                  fontWeight: 400,
                }}
              >
                Frequently asked questions
              </h2>
              <p className="font-sans text-[13.5px] text-[#7B8FA0] leading-relaxed mb-6">
                Still have questions? Our Nairobi team is available on WhatsApp.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-sans font-bold text-[13px] text-[#00C9A7] hover:gap-3 transition-all duration-150"
              >
                Talk to us <ArrowRight size={12} />
              </Link>
            </div>

            {/* FAQ items */}
            <div className="lg:col-span-8 border-[1.5px] border-[#D4DBE2] divide-y divide-[#E6EAEE]">
              {FAQS.map(({ q, a }) => (
                <div key={q} className="p-7">
                  <h4 className="font-sans font-bold text-[14.5px] text-[#0B1016] mb-3 leading-snug">
                    {q}
                  </h4>
                  <p className="font-sans text-[13.5px] text-[#3D4E5C] leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA STRIP
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-[#F9FAFB]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-[1.5px] border-[#D4DBE2] bg-white p-8 md:p-10">
            <div>
              <h3 className="font-sans font-bold text-[18px] text-[#0B1016] mb-1.5 leading-snug">
                Ready to deploy on Kenya's most compliant cloud?
              </h3>
              <p className="font-sans text-[13px] text-[#7B8FA0]">
                Book a 30-minute technical demo with our Nairobi engineers - no commitment required.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href="/contact?product=eza-cloud&intent=demo"
                className="inline-flex items-center gap-2 px-6 py-[12px] bg-[#00C9A7] border-[1.5px] border-[#00C9A7] font-sans font-bold text-[13px] text-white hover:bg-[#00b396] hover:-translate-y-px hover:shadow-[3px_3px_0px_0px_rgba(0,201,167,0.20)] transition-all duration-150"
              >
                Book a Free Demo <ArrowRight size={13} />
              </Link>
              <Link
                href="/solutions#eza-cloud"
                className="inline-flex items-center gap-2 px-6 py-[12px] border-[1.5px] border-[#D4DBE2] font-sans font-semibold text-[13px] text-[#3D4E5C] hover:border-[#00C9A7] hover:text-[#00C9A7] transition-all duration-150"
              >
                Full Solutions Overview <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
