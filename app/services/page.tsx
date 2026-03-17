"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  UploadCloud,
  Server,
  GitBranch,
  Shield,
  DollarSign,
  Smartphone,
  RefreshCw,
  Link2,
  Map,
  Lock,
  Users,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────── */

type ServiceItem = {
  id: string;
  icon: React.ElementType;
  title: string;
  copy: string;
  items: string[];
  outcome: string;
  note?: string;
};

type Category = {
  id: string;
  num: string;
  label: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
  accentText: string;
  intro: string;
  services: ServiceItem[];
};

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */

const CATEGORIES: Category[] = [
  {
    id: "cloud",
    num: "01",
    label: "Cloud Services",
    accent: "#00A2FF",
    accentBg: "rgba(0,162,255,0.06)",
    accentBorder: "rgba(0,162,255,0.20)",
    accentText: "#00A2FF",
    intro:
      "Whether you're migrating from on-premise, rationalising a multi-cloud sprawl, or building cloud-native for the first time, EdgeCloud's engineers design and operate infrastructure that is secure, cost-effective, and aligned with Kenya Cloud Policy 2025.",
    services: [
      {
        id: "migration",
        icon: UploadCloud,
        title: "Cloud Migration",
        copy: "Moving to the cloud should be planned, not improvised. Our migration engagements start with discovery - mapping your workloads, data classification, and compliance obligations (DPA, ODPC, sector-specific regulations). We then execute phased migrations with minimal downtime, using Infrastructure-as-Code for repeatability and auditability.",
        items: [
          "Workload assessment and cloud-readiness audit",
          "Architecture design (public, private, or hybrid cloud)",
          "Data classification and DPA compliance mapping",
          "Phased migration execution with rollback plans",
          "Handover documentation and team training",
        ],
        outcome:
          "A compliant, production-ready cloud environment - migrated on time, within budget, and without business disruption.",
      },
      {
        id: "managed",
        icon: Server,
        title: "Managed Infrastructure",
        copy: "Infrastructure management is not a distraction your team should carry. EdgeCloud's managed infrastructure service gives you fully monitored, patched, and optimised cloud environments - backed by Nairobi-based engineers on call. We manage Eza Cloud environments natively and support AWS, Azure, and GCP for hybrid setups.",
        items: [
          "24/7 infrastructure monitoring and alerting",
          "Patch management and vulnerability scanning",
          "Backup, disaster recovery, and RTO/RPO planning",
          "SLA-backed uptime guarantees",
          "Monthly infrastructure health reports",
        ],
        outcome:
          "Zero unplanned surprises. A cloud estate that runs itself - so your team focuses on product, not plumbing.",
      },
      {
        id: "devops",
        icon: GitBranch,
        title: "DevOps Engineering",
        copy: "Slow releases kill momentum. Our DevOps engineers implement CI/CD pipelines, containerisation, Infrastructure-as-Code (Terraform, Pulumi), and automated testing frameworks - aligned with Kenya Cloud Policy 2025's mandate for standardised, auditable deployment practices.",
        items: [
          "CI/CD pipeline design and implementation (GitHub Actions, GitLab CI)",
          "Container orchestration via managed Kubernetes (Eza Cloud native)",
          "Infrastructure-as-Code with Terraform or Pulumi",
          "Automated security scanning in pipelines (DevSecOps)",
          "Deployment runbooks and team enablement",
        ],
        outcome:
          "Faster, safer releases. Compliance-ready deployment pipelines that your regulators - and your engineers - can trust.",
      },
      {
        id: "security",
        icon: Shield,
        title: "Cloud Security",
        copy: "Cloud security is one of the top concerns for Kenyan FinTechs and enterprises, with data accessibility risks, unauthorised access, and inadequate incident response as leading vulnerabilities. EdgeCloud's cloud security service closes those gaps - systematically, not reactively.",
        items: [
          "Cloud security posture assessment (CSPA)",
          "Identity and access management (IAM) hardening",
          "Network security: VPCs, firewalls, WAF configuration",
          "DPA-aligned data encryption at rest and in transit",
          "Incident response plan development and tabletop exercises",
          "SASRA and ODPC alignment reviews for regulated sectors",
        ],
        outcome:
          "A demonstrably secure cloud environment that satisfies auditors, regulators, and - most importantly - your customers.",
      },
      {
        id: "finops",
        icon: DollarSign,
        title: "FinOps - Cloud Financial Management",
        copy: "Cloud costs can spiral without visibility. FinOps - combining financial management with cloud engineering - gives your organisation control over cloud spending without sacrificing performance. Organisations implementing FinOps practices can cut cloud costs by up to 40%. We bring that discipline to Kenyan businesses.",
        items: [
          "Cloud cost audit and tagging architecture",
          "Reserved instance and savings plan strategy",
          "Right-sizing assessments for idle and over-provisioned resources",
          "Budget alerts and anomaly detection setup",
          "Monthly FinOps reporting and optimisation recommendations",
          "Team training on cloud cost culture",
        ],
        outcome:
          "Full visibility into every shilling you spend on cloud - and a clear plan to spend less while getting more.",
      },
    ],
  },
  {
    id: "software",
    num: "02",
    label: "Custom Software",
    accent: "#00C9A7",
    accentBg: "rgba(0,201,167,0.06)",
    accentBorder: "rgba(0,201,167,0.20)",
    accentText: "#00A389",
    intro:
      "Off-the-shelf software rarely fits Kenyan business reality. We build bespoke applications that reflect your workflows, integrate with local payment rails, and comply with Kenya's data protection requirements - from concept to production.",
    services: [
      {
        id: "bespoke",
        icon: Smartphone,
        title: "Bespoke Web & Mobile Applications",
        copy: "Whether it's a customer-facing mobile app, a web platform, or an internal operational tool, our development team builds from the ground up - M-Pesa-native, DPA-compliant, and optimised for Kenyan connectivity conditions (including low-bandwidth resilience). We work in React, Next.js, Flutter, and Node.js.",
        items: [
          "Discovery and requirements workshops",
          "UI/UX design (mobile-first, Swahili/English support)",
          "Full-stack development with M-Pesa and payment gateway integration",
          "DPA-aligned data architecture (consent, retention, DPIA)",
          "Quality assurance and user acceptance testing",
          "Deployment on Eza Cloud or your preferred infrastructure",
          "Post-launch support and feature iteration",
        ],
        outcome: "A production-ready digital product that feels built for Kenya - because it was.",
      },
      {
        id: "legacy",
        icon: RefreshCw,
        title: "Legacy System Modernisation",
        copy: "Aging ERP systems, custom codebases, and on-premise databases are Kenya's hidden tech debt. We analyse, refactor, and re-platform legacy systems - moving them to cloud-native architectures without disrupting your operations or losing your business logic.",
        items: [
          "Legacy codebase audit and risk assessment",
          "Microservices decomposition strategy",
          "Re-platforming to containers and Kubernetes",
          "Database migration (on-premise to cloud)",
          "API layer development for system integrations",
          "Documentation and team knowledge transfer",
        ],
        outcome:
          "Modern, maintainable software that your team can own and evolve - without the fear of touching the legacy system.",
      },
      {
        id: "integration",
        icon: Link2,
        title: "System Integration & API Development",
        copy: "Your business runs on multiple systems - ERP, CRM, accounting, logistics, and payments. We build the integrations that make them work together: RESTful APIs, M-Pesa STK push flows, webhook architectures, and data sync pipelines that are fault-tolerant and well-documented.",
        items: [
          "Integration architecture design",
          "M-Pesa Daraja API integration (STK Push, B2B, B2C, Pay Bill, Till)",
          "Third-party API integrations (banking, logistics, government systems)",
          "Data pipeline development (ETL/ELT)",
          "Integration testing and monitoring",
          "DPA compliance review for data shared across systems",
        ],
        outcome:
          "A connected digital ecosystem where your tools talk to each other - and M-Pesa is a first-class citizen in every transaction.",
      },
    ],
  },
  {
    id: "advisory",
    num: "03",
    label: "Advisory & Training",
    accent: "#8B5CF6",
    accentBg: "rgba(139,92,246,0.06)",
    accentBorder: "rgba(139,92,246,0.20)",
    accentText: "#7C3AED",
    intro:
      "Technology decisions made without strategy cost more than they save. EdgeCloud's advisory services give your leadership team the frameworks, assessments, and knowledge to make confident cloud and compliance decisions - grounded in Kenya's actual regulatory and market reality.",
    services: [
      {
        id: "strategy",
        icon: Map,
        title: "Cloud Strategy & Architecture Advisory",
        copy: "Before you spend a shilling on infrastructure, you need a strategy. Our cloud strategy engagements produce a documented roadmap - covering workload classification, build-vs-buy decisions, vendor selection (with Kenya Cloud Policy 2025 alignment), cost projections, and a 12-month migration and optimisation plan.",
        items: [
          "Current-state infrastructure and cost audit",
          "Cloud-readiness assessment",
          "Architecture options analysis (public, private, hybrid, multi-cloud)",
          "Vendor evaluation aligned with Kenya Cloud Policy 2025",
          "12-month cloud roadmap with investment projections",
          "Executive briefing and board-ready presentation",
        ],
        outcome:
          "A clear, defensible cloud strategy - not a vendor's sales pitch, but an objective roadmap owned by your organisation.",
      },
      {
        id: "dpa",
        icon: Lock,
        title: "Data Sovereignty & DPA Compliance Advisory",
        copy: "Kenya's Data Protection Act 2019 carries real consequences: fines of up to KES 5,000,000 or 1% of annual turnover, enforcement orders, and - for serious violations - prosecution of company directors. The ODPC's 2025–2029 strategy signals even tighter enforcement ahead. We help you get ahead of the risk.",
        items: [
          "Data flow mapping and personal data inventory",
          "DPA compliance gap assessment against ODPC requirements",
          "Data Protection Impact Assessment (DPIA) facilitation",
          "ODPC registration support (data controller/processor)",
          "Privacy policy, consent mechanism, and retention schedule review",
          "Cross-border data transfer compliance review",
          "Ongoing compliance monitoring and quarterly reviews",
        ],
        outcome:
          "A documented, auditor-ready compliance posture - and a team that understands what they're obligated to do.",
        note: "FinTechs, HealthTechs, NGOs, educational institutions, digital credit providers, and any business handling personal data at scale.",
      },
      {
        id: "training",
        icon: Users,
        title: "Team Enablement & Training",
        copy: "Tools and infrastructure only perform as well as the people operating them. EdgeCloud's training programmes are built for Kenyan IT teams, developers, and product managers - covering cloud operations, DevOps practices, DPA obligations, and FinOps principles. Delivered in Nairobi or remotely, in English and Swahili.",
        items: [
          "Cloud fundamentals workshop (AWS, GCP, Azure, Eza Cloud)",
          "DevOps and CI/CD practices for engineering teams",
          "DPA awareness training for all-staff",
          "FinOps literacy for finance and engineering leads",
          "Kubernetes operations for DevOps engineers",
          "Custom curriculum design for enterprise teams",
        ],
        outcome:
          "A team that can own, operate, and evolve your technology - without depending on expensive external consultants for every decision.",
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   SERVICE CARD - accordion
───────────────────────────────────────────────────────────── */

function ServiceCard({ svc, cat, index }: { svc: ServiceItem; cat: Category; index: number }) {
  const [open, setOpen] = useState(false);
  const Icon = svc.icon;

  return (
    <article
      className={`
        border border-wire-300 bg-white
        transition-all duration-250
        ${open ? "shadow-lift-lg" : "shadow-card hover:shadow-lift"}
      `}
    >
      {/* ── Header row ── */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-start gap-5 p-7 group"
        aria-expanded={open}
      >
        {/* Index number */}
        <span className="font-display text-2xs font-bold text-ink-100 pt-1 w-6 shrink-0 tracking-widest">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Icon box */}
        <div
          className="w-11 h-11 shrink-0 flex items-center justify-center border"
          style={{
            background: open ? cat.accentBg : "#F9FAFB",
            borderColor: open ? cat.accentBorder : "#D4DBE2",
          }}
        >
          <Icon size={20} style={{ color: open ? cat.accent : "#7B8FA0" }} strokeWidth={1.5} />
        </div>

        {/* Title + teaser */}
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-md text-ink-900 mb-1 group-hover:text-brand transition-colors duration-150">
            {svc.title}
          </h3>
          {!open && (
            <p className="font-sans text-sm text-ink-300 truncate">{svc.copy.slice(0, 95)}…</p>
          )}
        </div>

        {/* Toggle icon */}
        <div
          className="w-8 h-8 shrink-0 flex items-center justify-center border transition-colors duration-150"
          style={{
            background: open ? cat.accentBg : "transparent",
            borderColor: open ? cat.accentBorder : "#D4DBE2",
          }}
        >
          {open ? (
            <ChevronUp size={14} style={{ color: cat.accent }} />
          ) : (
            <ChevronDown size={14} className="text-ink-300" />
          )}
        </div>
      </button>

      {/* ── Expanded body ── */}
      {open && (
        <div className="px-7 pb-8 pt-0">
          {/* Hairline divider */}
          <div className="border-t border-wire-200 mb-7" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left - copy + outcome */}
            <div className="flex flex-col gap-6">
              <p className="font-sans text-base text-ink-500 leading-relaxed">{svc.copy}</p>

              {/* Outcome block */}
              <div className="border-l-2 pl-5 py-1" style={{ borderColor: cat.accent }}>
                <p
                  className="font-display text-2xs font-bold tracking-widest uppercase mb-2"
                  style={{ color: cat.accent }}
                >
                  Outcome
                </p>
                <p className="font-sans text-base font-medium text-ink-700 leading-snug">
                  {svc.outcome}
                </p>
              </div>

              {/* Who this is for - DPA card only */}
              {svc.note && (
                <div className="border border-wire-300 bg-wire-50 p-4">
                  <p className="font-display text-2xs font-bold tracking-widest uppercase text-ink-300 mb-2">
                    Who this is for
                  </p>
                  <p className="font-sans text-sm text-ink-500">{svc.note}</p>
                </div>
              )}
            </div>

            {/* Right - checklist + CTA */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="font-display text-2xs font-bold tracking-widest uppercase text-ink-300 mb-4">
                  What&apos;s included
                </p>
                <ul className="flex flex-col gap-3">
                  {svc.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2
                        size={15}
                        className="mt-0.5 shrink-0"
                        style={{ color: cat.accent }}
                        strokeWidth={2}
                      />
                      <span className="font-sans text-sm text-ink-500 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-display font-bold text-white transition-all duration-150 hover:-translate-y-px"
                  style={{
                    background: cat.accent,
                    boxShadow: `3px 3px 0px 0px ${cat.accent}66`,
                  }}
                >
                  Start this engagement
                  <ArrowRight size={14} strokeWidth={2.5} />
                </Link>
              </div>
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

export default function ServicesPage() {
  const [activeId, setActiveId] = useState("cloud");
  const active = CATEGORIES.find((c) => c.id === activeId)!;

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Cloud Services, Custom Software Development, Advisory & Training",
            provider: {
              "@type": "Organization",
              name: "EdgeCloud Technologies Limited",
              url: "https://edgecloud.co.ke",
            },
            areaServed: { "@type": "Country", name: "Kenya" },
            description:
              "EdgeCloud provides cloud migration, managed infrastructure, DevOps, FinOps, bespoke software development, and DPA compliance advisory for Kenyan businesses.",
          }),
        }}
      />

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className="relative bg-white border-b border-wire-300 overflow-hidden pt-26 pb-18">
        {/* Structural grid overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,162,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,162,255,0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Right-side accent column */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1 bg-brand" aria-hidden />

        <div className="relative max-w-screen-xl mx-auto px-6 md:px-10 lg:px-14">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <span className="w-6 h-px bg-brand" />
              <span className="font-display text-xs font-bold tracking-widest uppercase text-brand">
                Services
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink-900 mb-6 leading-none">
              Services that move <br className="hidden md:block" />
              <span
                className="italic"
                style={{
                  background: "linear-gradient(90deg, #00A2FF 0%, #00C9A7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Kenya&apos;s businesses forward.
              </span>
            </h1>

            <p className="font-sans text-md text-ink-500 max-w-xl mb-10 leading-relaxed">
              We&apos;re not a hosting panel. We&apos;re a Nairobi-based digital enablement team
              that combines cloud engineering, software development, and compliance advisory - all
              accountable under one roof.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-brand text-white font-display font-bold text-sm px-6 py-3 transition-all duration-150 hover:-translate-y-px"
                style={{ boxShadow: "4px 4px 0px 0px #0A0F1E" }}
              >
                Talk to Our Team
                <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center gap-2 bg-white text-ink-700 font-display font-bold text-sm px-6 py-3 border border-wire-300 transition-all duration-150 hover:border-brand hover:text-brand"
              >
                See All Services
              </Link>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-18 pt-10 border-t border-wire-200 grid grid-cols-2 md:grid-cols-4 gap-0">
            {[
              { n: "3", label: "Service categories" },
              { n: "11", label: "Distinct service lines" },
              { n: "Nairobi", label: "HQ & support base" },
              { n: "EN + SW", label: "Languages of delivery" },
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
          TAB NAV + SERVICE CONTENT
      ════════════════════════════════════════ */}
      <section id="services" className="bg-wire-50">
        {/* Sticky category tabs */}
        <div className="sticky top-[68px] z-40 bg-white border-b border-wire-300">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-14">
            <div className="flex overflow-x-auto">
              {CATEGORIES.map((cat) => {
                const isActive = activeId === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveId(cat.id)}
                    className={`
                      flex items-center gap-2.5 px-6 py-5 shrink-0
                      font-display font-bold text-sm
                      border-b-2 transition-all duration-150
                      ${
                        isActive
                          ? "text-ink-900 border-brand"
                          : "text-ink-300 border-transparent hover:text-ink-500 hover:border-wire-300"
                      }
                    `}
                  >
                    <span
                      className={`
                        font-display text-2xs font-bold tracking-widest
                        w-6 h-6 flex items-center justify-center border
                        transition-colors duration-150
                        ${
                          isActive
                            ? "text-white border-brand bg-brand"
                            : "text-ink-100 border-wire-300 bg-transparent"
                        }
                      `}
                    >
                      {cat.num}
                    </span>
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Category block */}
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-14 py-16">
          {/* Category header - 2 col */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
            <div>
              {/* Category pill */}
              <div
                className="inline-flex items-center gap-2 border px-3 py-1.5 mb-5"
                style={{
                  background: active.accentBg,
                  borderColor: active.accentBorder,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-sm" style={{ background: active.accent }} />
                <span
                  className="font-display text-2xs font-bold tracking-widest uppercase"
                  style={{ color: active.accentText }}
                >
                  {active.label}
                </span>
              </div>

              <h2 className="font-serif text-3xl lg:text-4xl text-ink-900 leading-tight">
                {active.label}
              </h2>
            </div>

            <p className="font-sans text-md text-ink-500 leading-relaxed lg:pt-14">
              {active.intro}
            </p>
          </div>

          {/* Service cards */}
          <div className="flex flex-col gap-2">
            {active.services.map((svc, i) => (
              <ServiceCard key={svc.id} svc={svc} cat={active} index={i} />
            ))}
          </div>

          {/* Category-level CTA strip */}
          <div
            className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-7 border"
            style={{
              background: active.accentBg,
              borderColor: active.accentBorder,
            }}
          >
            <div>
              <p className="font-display font-bold text-base text-ink-900 mb-0.5">
                Ready to explore {active.label}?
              </p>
              <p className="font-sans text-sm text-ink-500">
                Start with a free 30-minute strategy call. No obligation, no sales pressure.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2 text-white font-display font-bold text-sm px-5 py-2.5 transition-all duration-150 hover:-translate-y-px"
              style={{
                background: active.accent,
                boxShadow: `3px 3px 0px 0px ${active.accent}55`,
              }}
            >
              Book a Strategy Call
              <ArrowRight size={14} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          WHY EDGECLOUD
      ════════════════════════════════════════ */}
      <section className="bg-white border-t border-wire-300 py-24">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="w-6 h-px bg-brand" />
                <span className="font-display text-xs font-bold tracking-widest uppercase text-brand">
                  Why EdgeCloud
                </span>
              </div>
              <h2 className="font-serif text-3xl lg:text-4xl text-ink-900 leading-tight mb-8">
                One team.
                <br />
                Full accountability.
              </h2>
              <p className="font-sans text-md text-ink-500 leading-relaxed mb-5">
                We&apos;re not a marketplace of freelancers or a reseller of a foreign platform.
                EdgeCloud&apos;s engineers, developers, and compliance advisors are employed in
                Nairobi - and accountable to you under Kenyan law.
              </p>
              <p className="font-sans text-md text-ink-500 leading-relaxed">
                Because we also build and operate our own products (Eza Cloud, ZuriMail), we have
                skin in the game. The infrastructure we recommend is the infrastructure we trust
                with our own systems.
              </p>
            </div>

            {/* Right - differentiator list */}
            <div className="flex flex-col divide-y divide-wire-200 border border-wire-300">
              {[
                {
                  color: "#00A2FF",
                  title: "Nairobi-based, legally accountable",
                  desc: "Our entire team is in Kenya. Contracts, SLAs, and compliance obligations are governed under Kenyan law.",
                },
                {
                  color: "#00C9A7",
                  title: "Proprietary products + agency services",
                  desc: "We build Eza Cloud and ZuriMail - so our engineering advice is grounded in what actually works in production.",
                },
                {
                  color: "#8B5CF6",
                  title: "Kenya Cloud Policy 2025 alignment",
                  desc: "Every service we deliver is designed with the national cloud policy framework in mind - from the start.",
                },
                {
                  color: "#F59E0B",
                  title: "English & Swahili delivery",
                  desc: "Training, documentation, and support are available in both languages. No translation friction, no cultural gaps.",
                },
              ].map(({ color, title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-5 p-6 group hover:bg-wire-50 transition-colors duration-150"
                >
                  <div className="mt-1 w-2 h-2 shrink-0 rounded-sm" style={{ background: color }} />
                  <div>
                    <p className="font-display font-bold text-sm text-ink-900 mb-1">{title}</p>
                    <p className="font-sans text-sm text-ink-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FINAL CTA - dark section
      ════════════════════════════════════════ */}
      {/* <section className="bg-navy-900 py-24">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-14">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 border border-brand/25 bg-brand/10 px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 bg-brand rounded-sm" />
              <span className="font-display text-2xs font-bold tracking-widest uppercase text-brand">
                Not Sure Where to Start?
              </span>
            </div>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-6">
              Most engagements begin
              <br />
              with a 30-minute call.
            </h2>

            <p className="font-sans text-md text-white/55 leading-relaxed mb-10 max-w-lg mx-auto">
              We&apos;ll ask the right questions, map your biggest risk or opportunity, and
              recommend a starting point - with no obligation and no sales pressure.
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-brand text-white font-display font-bold text-sm px-7 py-3.5 transition-all duration-150 hover:-translate-y-px"
                style={{ boxShadow: "4px 4px 0px 0px rgba(0,162,255,0.35)" }}
              >
                Book a Free Strategy Call
                <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 bg-transparent text-white/80 font-display font-bold text-sm px-7 py-3.5 border border-white/15 transition-all duration-150 hover:border-white/35 hover:text-white"
              >
                Read Our Guides
              </Link>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}
