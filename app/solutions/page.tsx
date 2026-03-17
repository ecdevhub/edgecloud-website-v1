"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CreditCard,
  Heart,
  Building2,
  GraduationCap,
  ShoppingCart,
  Wheat,
  Tv,
  Truck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────── */

type Industry = {
  id: string;
  num: string;
  icon: React.ElementType;
  label: string;
  context: string;
  angle: string;
  solutions: string[];
  bestFor: string;
  cta: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
};

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */

const INDUSTRIES: Industry[] = [
  {
    id: "fintech-saccos",
    num: "01",
    icon: CreditCard,
    label: "FinTech & SACCOs",
    context:
      "Kenya's SACCO and digital finance sector is in full digital transition, with SACCO digital transactions rising by over 14% in 2025. New platforms, shared digital payment rails, and tighter regulation are raising the bar for security, interoperability, and compliance.",
    angle:
      "EdgeCloud builds regulation-ready infrastructure for FinTechs, digital lenders, and SACCOs - from core banking integrations and M-Pesa-native wallets to secure APIs and reporting pipelines. We design on top of Eza Cloud's sovereign pillars so your workloads stay in Kenya, align with SASRA and ODPC expectations, and integrate smoothly with shared payments platforms and USSD channels.",
    solutions: [
      "Core and channel systems hosted on Eza Cloud Sovereign",
      "M-Pesa STK, B2B, and B2C flows integrated into apps and USSD",
      "Secure APIs for partner banks, EFT rails, and shared digital payments platforms",
      "DPA and data governance advisory for credit bureaus, wallets, and SACCOs",
    ],
    bestFor: "SACCOs, digital banks, lenders, wallets, digital payments platforms",
    cta: "Talk to Our FinTech Team",
    accent: "#00A2FF",
    accentBg: "rgba(0,162,255,0.05)",
    accentBorder: "rgba(0,162,255,0.18)",
  },
  {
    id: "healthcare-medtech",
    num: "02",
    icon: Heart,
    label: "Healthcare & MedTech",
    context:
      "Kenya is rolling out national digital health infrastructure - from electronic medical records and telemedicine to real-time disease surveillance - backed by new Digital Health Regulations and certification requirements for e-health platforms. Health data is treated as sensitive personal data.",
    angle:
      "EdgeCloud delivers health-grade cloud architectures for hospitals, clinics, and HealthTech startups, combining Eza Cloud Sovereign with strict access control, encryption, and audit trails. We design systems to align with the Digital Health Agency's certification framework and Kenya's Health Data Governance standards, while our advisory team supports DPIAs and DPA compliance.",
    solutions: [
      "EMR/EHR platforms hosted on dedicated, Kenya-sovereign infrastructure",
      "Telemedicine backends with secure video, messaging, and patient records",
      "Interoperable APIs connecting labs, insurers, and referral networks",
      "Patient communication via ZuriMail with privacy-aware consent flows",
    ],
    bestFor:
      "Hospitals, clinic networks, telehealth providers, health insurers, diagnostic labs, health NGOs",
    cta: "Talk to Our HealthTech Team",
    accent: "#00C9A7",
    accentBg: "rgba(0,201,167,0.05)",
    accentBorder: "rgba(0,201,167,0.18)",
  },
  {
    id: "government-public-sector",
    num: "03",
    icon: Building2,
    label: "Government & Public Sector",
    context:
      "The Kenya Cloud Policy and broader digital government agenda push ministries, counties, and agencies to move away from fragmented on-premise systems toward sovereign, interoperable cloud platforms. New cloud procurement rules demand open standards, local data residency, and vendor transparency.",
    angle:
      "EdgeCloud provides policy-aligned cloud environments and applications for public sector bodies, designing architectures that comply with Kenya Cloud Policy, data sovereignty requirements, and sector-specific regulations. We use Eza Cloud Sovereign with open-standard technologies and provide the documentation procurement teams need.",
    solutions: [
      "Citizen service portals, licensing systems, and registries on Eza Cloud Sovereign",
      "Secure APIs to share data across ministries and counties",
      "Data warehouses and analytics platforms for policy and performance dashboards",
      "Advisory on cloud migration roadmaps and RFP/technical requirement design",
    ],
    bestFor:
      "Ministries, county governments, agencies, regulators, parastatals, donor-funded programmes",
    cta: "Talk to Our Public Sector Team",
    accent: "#F59E0B",
    accentBg: "rgba(245,158,11,0.05)",
    accentBorder: "rgba(245,158,11,0.18)",
  },
  {
    id: "education-edtech",
    num: "04",
    icon: GraduationCap,
    label: "Education & EdTech",
    context:
      "Kenya's education system is undergoing rapid digital transformation, with strong government support for smart classrooms, cloud-based learning platforms, and digital curriculum delivery. Many schools still face connectivity gaps, device constraints, and limited in-house IT capacity.",
    angle:
      "EdgeCloud builds lightweight, resilient learning platforms and student systems that work in real Kenyan conditions - including low bandwidth and shared devices. We host LMS, portals, and assessment tools on Eza Cloud, integrate M-Pesa for tuition and fee payments, and ensure student data is handled in line with Kenya's DPA and child-data protections.",
    solutions: [
      "Hosted LMS and virtual classroom platforms with offline-friendly features",
      "Student, parent, and alumni portals with secure identity management",
      "M-Pesa fee payments, instalment plans, and automated receipting flows",
      "ZuriMail campaigns to parents and students with consent properly tracked",
    ],
    bestFor:
      "Universities, colleges, private schools, TVETs, EdTech startups, NGOs running education programmes",
    cta: "Talk to Our Education Team",
    accent: "#8B5CF6",
    accentBg: "rgba(139,92,246,0.05)",
    accentBorder: "rgba(139,92,246,0.18)",
  },
  {
    id: "retail-ecommerce",
    num: "05",
    icon: ShoppingCart,
    label: "Retail & E-Commerce",
    context:
      "Kenya's B2C e-commerce market is now a multi-billion-dollar opportunity, powered by mobile, M-Pesa, and social commerce. Consumers expect fast, mobile-first shopping experiences and secure checkouts - while regulators expect proper handling of personal and payment data.",
    angle:
      "EdgeCloud equips retailers and brands with M-Pesa-native commerce stacks on Eza Sites and Eza Cloud. We build and host WooCommerce and custom storefronts, integrate M-Pesa and other payment options, and connect inventory, fulfilment, and marketing tools. ZuriMail powers post-purchase journeys, abandoned cart recovery, and loyalty campaigns.",
    solutions: [
      "Managed WooCommerce and custom storefronts on Eza Sites",
      "Payment orchestration with M-Pesa STK, cards, and bank channels",
      "Order management and fulfilment integrations (couriers, warehouses)",
      "ZuriMail campaigns (receipts, offers, win-back sequences) with DPA-compliant consent",
    ],
    bestFor: "Online retailers, supermarkets, D2C brands, marketplaces, social commerce sellers",
    cta: "Talk to Our E-Commerce Team",
    accent: "#EF4444",
    accentBg: "rgba(239,68,68,0.05)",
    accentBorder: "rgba(239,68,68,0.18)",
  },
  {
    id: "agriculture-agritech",
    num: "06",
    icon: Wheat,
    label: "Agriculture & AgriTech",
    context:
      "Kenya's agriculture sector is embracing agri-tech - from digital farmer registries and advisory apps to value-chain traceability and input financing. Connectivity, device affordability, and farmer trust remain key design constraints across rural areas.",
    angle:
      "EdgeCloud designs rural-first digital platforms that work reliably on low-end Android devices and patchy connections. We host agri-tech backends on Eza Cloud, integrate M-Pesa B2C for farmer payments and subsidies, and use ZuriMail SMS to deliver crop advice, alerts, and market information in local languages.",
    solutions: [
      "Farmer onboarding and registry systems with USSD and app frontends",
      "Input marketplace and contract-farming platforms with M-Pesa payouts",
      "Produce traceability and quality-tracking systems for exporters",
      "Advisory SMS and WhatsApp campaigns through ZuriMail",
    ],
    bestFor: "Agri-tech startups, co-operatives, input suppliers, off-takers, NGOs in agriculture",
    cta: "Talk to Our AgriTech Team",
    accent: "#22C55E",
    accentBg: "rgba(34,197,94,0.05)",
    accentBorder: "rgba(34,197,94,0.18)",
  },
  {
    id: "media",
    num: "07",
    icon: Tv,
    label: "Media & Digital Publishing",
    context:
      "Kenya's digital media and entertainment market is growing quickly as audiences shift to streaming, social video, and mobile news. Internet advertising in Kenya is forecast to be among the fastest-growing globally, putting pressure on publishers to build scalable, data-driven platforms.",
    angle:
      "EdgeCloud provides high-availability hosting and engagement tools for publishers, broadcasters, and creators. We host streaming backends and content management systems on Eza Cloud and Eza Kubernetes, optimise for East African traffic, and use ZuriMail to grow subscriber lists, newsletters, and membership programmes in a privacy-aware way.",
    solutions: [
      "Newsroom CMS, paywall, and membership platforms on Eza Cloud",
      "Streaming and VOD workloads orchestrated on Eza Kubernetes",
      "Newsletter programmes and onboarding funnels via ZuriMail",
      "Analytics foundations for privacy-aware audience insights",
    ],
    bestFor:
      "Newsrooms, TV/radio stations, streaming platforms, content networks, digital creators",
    cta: "Talk to Our Media Team",
    accent: "#EC4899",
    accentBg: "rgba(236,72,153,0.05)",
    accentBorder: "rgba(236,72,153,0.18)",
  },
  {
    id: "logistics",
    num: "08",
    icon: Truck,
    label: "Logistics & Supply Chain",
    context:
      "Kenya's logistics and supply chain market is modernising, with strong adoption of cloud-based supply chain management, real-time tracking, and integrated payments. SMEs are expected to use logistics technology and data to compete in regional trade corridors.",
    angle:
      "EdgeCloud builds connected logistics platforms on Eza Cloud - from parcel tracking and fleet management to warehouse and inventory systems - with M-Pesa-based collections and disbursements baked into the flow. Our FinOps practice keeps infrastructure costs sustainable as shipment volumes fluctuate.",
    solutions: [
      "Shipment tracking portals and driver apps with live location",
      "Warehouse management and inventory systems integrated with ERP",
      "M-Pesa collections and driver/partner payouts",
      "Alerting and customer notifications via ZuriMail email/SMS",
    ],
    bestFor:
      "3PLs, couriers, transport companies, warehouse operators, marketplaces with in-house logistics",
    cta: "Talk to Our Logistics Team",
    accent: "#0EA5E9",
    accentBg: "rgba(14,165,233,0.05)",
    accentBorder: "rgba(14,165,233,0.18)",
  },
];

/* ─────────────────────────────────────────────────────────────
   INDUSTRY CARD
───────────────────────────────────────────────────────────── */

function IndustryCard({ industry }: { industry: Industry }) {
  const [open, setOpen] = useState(false);
  const Icon = industry.icon;

  return (
    <article
      className="border border-wire-300 bg-white transition-all duration-250"
      style={open ? { borderLeftColor: industry.accent, borderLeftWidth: "3px" } : {}}
      id={industry.id}
    >
      {/* ── Header ── */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-center gap-5 px-7 py-6 group"
        aria-expanded={open}
      >
        {/* Number */}
        <span
          className="font-display text-2xs font-bold tracking-widest shrink-0 w-7 transition-colors duration-150"
          style={{ color: open ? industry.accent : "#BDC8D2" }}
        >
          {industry.num}
        </span>

        {/* Icon */}
        <div
          className="w-11 h-11 shrink-0 flex items-center justify-center border transition-all duration-150"
          style={{
            background: open ? industry.accentBg : "#F9FAFB",
            borderColor: open ? industry.accentBorder : "#D4DBE2",
          }}
        >
          <Icon size={20} strokeWidth={1.5} style={{ color: open ? industry.accent : "#7B8FA0" }} />
        </div>

        {/* Label */}
        <div className="flex-1 min-w-0">
          <h2 className="font-display font-bold text-md text-ink-900 leading-none transition-colors duration-150 group-hover:text-brand">
            {industry.label}
          </h2>
        </div>

        {/* Toggle */}
        <div
          className="w-8 h-8 shrink-0 flex items-center justify-center border transition-all duration-150"
          style={{
            background: open ? industry.accentBg : "transparent",
            borderColor: open ? industry.accentBorder : "#D4DBE2",
          }}
        >
          {open ? (
            <ChevronUp size={14} style={{ color: industry.accent }} />
          ) : (
            <ChevronDown size={14} className="text-ink-100" />
          )}
        </div>
      </button>

      {/* ── Expanded body ── */}
      {open && (
        <div className="px-7 pb-8 animate-fade-up">
          {/* Divider */}
          <div className="border-t border-wire-200 mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Col 1 - Market context */}
            <div className="lg:col-span-4">
              <p className="font-display text-2xs font-bold tracking-widest uppercase text-ink-100 mb-3">
                Market Context
              </p>
              <p className="font-sans text-base text-ink-500 leading-relaxed">{industry.context}</p>
            </div>

            {/* Col 2 - How EdgeCloud helps */}
            <div className="lg:col-span-4">
              <p className="font-display text-2xs font-bold tracking-widest uppercase text-ink-100 mb-3">
                How EdgeCloud Helps
              </p>
              <p className="font-sans text-base text-ink-500 leading-relaxed">{industry.angle}</p>
            </div>

            {/* Col 3 - Solutions + best for + CTA */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Solutions list */}
              <div
                className="border p-5"
                style={{
                  background: industry.accentBg,
                  borderColor: industry.accentBorder,
                }}
              >
                <p
                  className="font-display text-2xs font-bold tracking-widest uppercase mb-4"
                  style={{ color: industry.accent }}
                >
                  Example Solutions
                </p>
                <ul className="flex flex-col gap-2.5">
                  {industry.solutions.map((s) => (
                    <li key={s} className="flex items-start gap-2.5">
                      <span
                        className="mt-2 w-1 h-1 shrink-0"
                        style={{ background: industry.accent }}
                      />
                      <span className="font-sans text-sm text-ink-500 leading-snug">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Best for */}
              <div>
                <p className="font-display text-2xs font-bold tracking-widest uppercase text-ink-100 mb-2">
                  Best For
                </p>
                <p className="font-sans text-sm text-ink-500">{industry.bestFor}</p>
              </div>

              {/* CTA */}
              <Link
                href="/contact"
                className="self-start inline-flex items-center gap-2 text-white font-display font-bold text-sm px-5 py-2.5 transition-all duration-150 hover:-translate-y-px"
                style={{
                  background: industry.accent,
                  boxShadow: `3px 3px 0px 0px ${industry.accent}55`,
                }}
              >
                {industry.cta}
                <ArrowRight size={14} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */

export default function IndustriesPage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Cloud & Software Solutions by Industry in Kenya | EdgeCloud",
            description:
              "EdgeCloud designs DPA-compliant, M-Pesa-native solutions for eight priority verticals across East Africa.",
            url: "https://edgecloud.co.ke/industries",
          }),
        }}
      />

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className="relative bg-white border-b border-wire-300 overflow-hidden pt-26 pb-18">
        {/* Grid overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,162,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,162,255,0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Right accent bar */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1 bg-brand" aria-hidden />

        <div className="relative max-w-screen-xl mx-auto px-6 md:px-10 lg:px-14">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <span className="w-6 h-px bg-brand" />
              <span className="font-display text-xs font-bold tracking-widest uppercase text-brand">
                Industries
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink-900 mb-6 leading-none">
              Cloud & software built <br className="hidden md:block" />
              <span
                className="italic"
                style={{
                  background: "linear-gradient(90deg, #00A2FF 0%, #00C9A7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                for your industry.
              </span>
            </h1>

            <p className="font-sans text-md text-ink-500 max-w-2xl leading-relaxed mb-10">
              Kenyan industries are digitising fast - from SACCOs and hospitals to schools,
              retailers, and logistics providers. EdgeCloud designs DPA-compliant, M-Pesa-native
              solutions for eight priority verticals, combining cloud services, custom software, and
              our own products (Eza Cloud and ZuriMail) to fit real-world East African conditions.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-brand text-white font-display font-bold text-sm px-6 py-3 transition-all duration-150 hover:-translate-y-px"
                style={{ boxShadow: "4px 4px 0px 0px #0A0F1E" }}
              >
                Talk to an Industry Specialist
                <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 bg-white text-ink-700 font-display font-bold text-sm px-6 py-3 border border-wire-300 transition-all duration-150 hover:border-brand hover:text-brand"
              >
                Explore Our Services
              </Link>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-18 pt-10 border-t border-wire-200 grid grid-cols-2 md:grid-cols-4 gap-0">
            {[
              { n: "8", label: "Industry verticals" },
              { n: "DPA", label: "Compliance in every build" },
              { n: "M-Pesa", label: "Native in every stack" },
              { n: "Nairobi", label: "Based & accountable" },
            ].map(({ n, label }, i, arr) => (
              <div
                key={label}
                className={`py-6 px-8 ${i < arr.length - 1 ? "border-r border-wire-200" : ""}`}
              >
                <p className="font-serif text-2xl text-ink-900 mb-1">{n}</p>
                <p className="font-sans text-sm text-ink-300">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
    QUICK-JUMP NAV
════════════════════════════════════════ */}
      <div className="sticky top-[68px] z-40 bg-white/95 backdrop-blur border-b border-wire-300 overflow-x-auto">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-14">
          <div className="flex">
            {INDUSTRIES.map((ind) => (
              <a
                key={ind.id}
                href={`#${ind.id}`}
                className="shrink-0 flex items-center gap-2 px-5 py-4 font-display text-xs font-bold tracking-wide uppercase text-ink-400 border-b-2 border-transparent hover:text-brand hover:border-brand transition-all duration-150"
              >
                <ind.icon size={13} strokeWidth={2} />
                <span className="hidden lg:inline">{ind.label}</span>
                <span className="lg:hidden">{ind.num}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
    INDUSTRY ACCORDIONS
════════════════════════════════════════ */}
      <section className="bg-wire-50 py-14">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-14">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-wire-200">
            <div className="flex items-center gap-3">
              <span className="w-6 h-px bg-brand" />
              <span className="font-display text-xs font-bold tracking-widest uppercase text-brand">
                Eight Verticals
              </span>
            </div>
            <p className="font-sans text-sm text-ink-400 hidden md:block">
              Click any industry to expand solutions and context.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {INDUSTRIES.map((industry) => (
              <IndustryCard key={industry.id} industry={industry} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
    CROSS-CUTTING PILLARS
════════════════════════════════════════ */}
      <section className="bg-white border-t border-wire-300 py-24">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="w-6 h-px bg-brand" />
                <span className="font-display text-xs font-bold tracking-widest uppercase text-brand">
                  Across Every Industry
                </span>
              </div>

              <h2 className="font-serif text-3xl lg:text-4xl text-ink-900 leading-tight mb-8">
                Three things every
                <br />
                engagement includes.
              </h2>

              <p className="font-sans text-md text-ink-600 leading-relaxed">
                Regardless of your vertical, every EdgeCloud engagement is built on the same
                non-negotiable foundation - DPA compliance, M-Pesa-native architecture, and
                Nairobi-based accountability. These aren&apos;t add-ons. They&apos;re the baseline.
              </p>
            </div>

            <div className="flex flex-col divide-y divide-wire-200 border border-wire-300">
              {[
                {
                  num: "01",
                  color: "#00A2FF",
                  title: "DPA compliance, not a checkbox",
                  desc: "Every product, platform, and pipeline is designed against Kenya's Data Protection Act 2019 from day one - not retrofitted at the end.",
                },
                {
                  num: "02",
                  color: "#00C9A7",
                  title: "M-Pesa as a first-class citizen",
                  desc: "Whether you need STK Push, B2C disbursements, or reconciliation APIs, M-Pesa is integrated natively - not bolted on via a fragile third-party plugin.",
                },
                {
                  num: "03",
                  color: "#8B5CF6",
                  title: "Nairobi-based, legally accountable",
                  desc: "Our engineers, advisors, and support team are in Kenya. Contracts are governed by Kenyan law. When something needs fixing, we answer.",
                },
              ].map(({ num, color, title, desc }) => (
                <div
                  key={num}
                  className="flex items-start gap-5 p-6 hover:bg-wire-50 transition-colors duration-150"
                >
                  <span
                    className="font-display text-xs font-bold tracking-widest shrink-0 pt-0.5"
                    style={{ color }}
                  >
                    {num}
                  </span>
                  <div>
                    <p className="font-display font-bold text-sm text-ink-900 mb-1">{title}</p>
                    <p className="font-sans text-sm text-ink-600 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
    FINAL CTA
════════════════════════════════════════ */}
      <section className="bg-navy-900 py-24">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-14">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 border border-brand/25 bg-brand/10 px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 bg-brand" />
              <span className="font-display text-[10px] font-bold tracking-widest uppercase text-brand">
                One Partner. Every Vertical.
              </span>
            </div>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-6">
              One partner for your
              <br />
              entire digital stack.
            </h2>

            <p className="font-sans text-md text-white/70 leading-relaxed mb-10 max-w-lg mx-auto">
              Every industry faces different regulations, payment patterns, and infrastructure
              constraints in Kenya. EdgeCloud combines cloud architecture, software development, and
              compliance advisory so you don&apos;t have to coordinate multiple vendors.
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-brand text-white font-display font-bold text-sm px-7 py-3.5 transition-all duration-150 hover:-translate-y-px"
                style={{ boxShadow: "4px 4px 0px 0px rgba(0,162,255,0.35)" }}
              >
                Talk to an Industry Specialist
                <ArrowRight size={15} strokeWidth={2.5} />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center gap-2 bg-transparent text-white/80 font-display font-bold text-sm px-7 py-3.5 border border-white/15 hover:border-white/35 hover:text-white transition-all duration-150"
              >
                Explore Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
