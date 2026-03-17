"use client";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  MapPin,
  Mail,
  Users,
  Scale,
  Heart,
  Briefcase,
  Lock,
  Phone,
} from "lucide-react";

/* ─── SEO (add via layout/metadata export):
   title: "ZuriMail - Kenya Business Email Hosting | DPA-Compliant, Nairobi-Hosted"
   description: "Professional business email hosted in Nairobi, billed in KES via M-Pesa, with Swahili and English support. Six plans for Kenyan businesses from micro-SMEs to government agencies."
   canonical: "https://zurimail.co.ke"
──────────────────────────────────────────── */

/* ─── Data ───────────────────────────────────────────────────── */
const TRUST_STATS = [
  { icon: MapPin, label: "Hosted in Nairobi, Kenya" },
  { icon: Shield, label: "Kenya DPA-Compliant by Default" },
  { icon: Phone, label: "M-Pesa Billing · Swahili Support" },
];

const WHY_PILLARS = [
  {
    number: "01",
    heading: "Your data stays in Kenya",
    copy: "Every email is stored in our Tier III+ Nairobi data centres. No cross-border transfers, no foreign jurisdiction exposure - certifiable under Kenya's Data Protection Act 2019.",
  },
  {
    number: "02",
    heading: "Billed in KES, not USD",
    copy: "No card required. No surprise currency conversion. ZuriMail plans are priced and invoiced in Kenyan Shillings, with M-Pesa as a first-class payment method - not an afterthought.",
  },
  {
    number: "03",
    heading: "Support in your language",
    copy: "Our team is in Nairobi. We support you in Swahili and English, in your time zone, on WhatsApp - not a ticket queue routed through a helpdesk on another continent.",
  },
  {
    number: "04",
    heading: "Built for compliance from day one",
    copy: "Law firms, clinics, and government contractors have specific email obligations under Kenyan law. ZuriMail ships with the audit logs, retention controls, and data residency guarantees they require.",
  },
];

const TIERS = [
  {
    icon: Mail,
    name: "Zuri Mail Start",
    slug: "start",
    href: "https://zurimail.co.ke/start",
    niche: "Micro-SMEs",
    tagline: "For businesses leaving @gmail behind",
    price: "KES 350 – 450",
    unit: "/ user / month",
    accentColor: "#00C9A7",
    description:
      "Your first professional email address - yourname@yourcompany.co.ke - hosted in Nairobi, billed via M-Pesa, and set up in under an hour. No USD card needed.",
    bullets: [
      "Custom domain email (yourname@yourcompany.co.ke)",
      "5 GB mailbox storage per user",
      "Webmail + mobile app (iOS & Android)",
      "M-Pesa billing - no credit card required",
      "Swahili & English support via WhatsApp",
      "Kenya DPA data residency guarantee",
      "Anti-spam and anti-phishing protection",
      "Free .co.ke domain with annual plans",
    ],
    idealFor:
      "Sole traders, small retailers, and any business currently using a personal Gmail address for client communication.",
    blueOcean: "M-Pesa billing and Nairobi hosting vs card-billed global SaaS",
  },
  {
    icon: Briefcase,
    name: "Zuri Mail Office",
    slug: "office",
    href: "https://zurimail.co.ke/office",
    niche: "SMEs & Growing Teams",
    tagline: "A private workspace in Nairobi",
    price: "KES 650 – 900",
    unit: "/ user / month",
    accentColor: "#00A2FF",
    description:
      "Full collaboration infrastructure for growing Kenyan businesses - shared calendars, team drives, video meetings, and email - all hosted in Kenya and integrated natively with Eza Cloud.",
    bullets: [
      "Everything in Zuri Mail Start",
      "30 GB mailbox storage per user",
      "Shared team calendars and resource booking",
      "Team drives with granular permission controls",
      "Video conferencing (up to 100 participants)",
      "Native Eza Cloud integration for file storage",
      "Admin console with user provisioning",
      "99.9% uptime SLA with local support escalation",
      "DPA data processing agreement included",
    ],
    idealFor:
      "SMEs with 5–100 staff who need a reliable collaboration workspace without storing data on foreign servers.",
    blueOcean: "Private Nairobi workspace with Eza integration - not generic cloud",
  },
  {
    icon: Users,
    name: "Zuri Mail Agency",
    slug: "agency",
    href: "https://zurimail.co.ke/agency",
    niche: "Agencies & Studios",
    tagline: "Client communication, organised",
    price: "KES 900 – 1,300",
    unit: "/ user / month",
    accentColor: "#F59E0B",
    description:
      "Purpose-built for agencies managing multiple client relationships. Separate mailboxes, shared inboxes, and client-facing folders - structured around how agencies actually work.",
    bullets: [
      "Everything in Zuri Mail Office",
      "Multi-client workspace organisation",
      "Shared team inboxes (hello@, support@, projects@)",
      "Client portal email sharing",
      "Email delegation and send-as controls",
      "50 GB mailbox storage per user",
      "Priority WhatsApp support with dedicated contact",
      "Branded email signatures centrally managed",
      "Monthly usage reports per client workspace",
    ],
    idealFor:
      "PR firms, digital agencies, design studios, consultancies, and any team managing concurrent client email threads.",
    blueOcean: "Client-communication hub with portal-like sharing - not generic email",
  },
  {
    icon: Scale,
    name: "Zuri Mail Legal",
    slug: "legal",
    href: "https://zurimail.co.ke/legal",
    niche: "Law Firms & Legal Departments",
    tagline: "Email built for legal obligations",
    price: "KES 1,200 – 1,800",
    unit: "/ user / month",
    accentColor: "#8B5CF6",
    description:
      "Email infrastructure that meets Kenya's legal professional obligations - 7-year retention, immutable audit logs, and e-discovery export capability built into every deployment.",
    bullets: [
      "Everything in Zuri Mail Office",
      "7-year email retention (configurable per matter)",
      "Immutable audit logs - tamper-proof, exportable",
      "E-discovery export in standard formats (EML, PST)",
      "Per-matter email folder structure",
      "Legal hold: freeze mailboxes under investigation",
      "Conflict-of-interest segregation controls",
      "100 GB mailbox storage per user",
      "Dedicated compliance documentation pack",
      "Priority onboarding with our compliance team",
    ],
    idealFor:
      "Advocates, law firms, in-house legal teams, and any professional handling privileged client correspondence.",
    blueOcean: "Email + retention + logs + e-discovery - not generic email",
  },
  {
    icon: Heart,
    name: "Zuri Mail Health",
    slug: "health",
    href: "https://zurimail.co.ke/health",
    niche: "Clinics, Hospitals & Labs",
    tagline: "Aligned to Kenya's Digital Health Regulations",
    price: "KES 1,500 – 2,200",
    unit: "/ user / month",
    accentColor: "#DC2626",
    description:
      "Healthcare-grade email with controls for patient data handling - aligned to Kenya's Digital Health Act 2023 and the Data Protection Act. Patient identifiers never leave Kenyan servers.",
    bullets: [
      "Everything in Zuri Mail Office",
      "Patient data handling controls (DPA + Digital Health Act 2023)",
      "Sensitive data classification and tagging",
      "Encrypted email in transit and at rest (AES-256)",
      "Role-based access: clinicians, admin, lab, management",
      "PHI segregation - patient data isolated by policy",
      "Audit trail for all patient-related email access",
      "100 GB mailbox storage per user",
      "DPIA documentation pack for health data processing",
      "Dedicated health compliance onboarding session",
    ],
    idealFor:
      "Private clinics, hospitals, diagnostic labs, telemedicine platforms, pharmaceutical companies, and health NGOs.",
    blueOcean: "Tailored to Digital Health Regulations and sensitive data - not generic email",
  },
  {
    icon: Lock,
    name: "Zuri Mail Sovereign",
    slug: "sovereign",
    href: "https://zurimail.co.ke/sovereign",
    niche: "Public Sector & Regulated Entities",
    tagline: "Kenya Cloud Policy 2025-aligned sovereign email",
    price: "KES 2,500+",
    unit: "custom pricing",
    accentColor: "#0B1016",
    description:
      "Dedicated, single-tenant email infrastructure for government agencies, parastatals, financial regulators, and institutions subject to Kenya Cloud Policy 2025 procurement requirements.",
    bullets: [
      "Dedicated single-tenant infrastructure - no shared servers",
      "100% Kenya data residency - certifiable documentation",
      "Kenya Cloud Policy 2025 procurement compliance pack",
      "ODPC data controller registration support",
      "Custom retention policies and legal hold infrastructure",
      "Full e-discovery and audit trail exports",
      "Active Directory / LDAP integration",
      "Unlimited mailbox storage",
      "Dedicated account manager and on-site onboarding",
      "SLA-backed uptime with local escalation path",
      "Annual compliance review included",
    ],
    idealFor:
      "Government agencies, parastatals, financial regulators (CBK, CMA, IRA), SACCOs under SASRA, and any institution required to demonstrate data sovereignty.",
    blueOcean: "Cloud Policy 2025-aligned sovereign email in Kenyan data centres",
  },
];

const FEATURE_MATRIX = [
  { feature: "Custom domain email", vals: [true, true, true, true, true, true] },
  { feature: "Kenya data residency", vals: [true, true, true, true, true, true] },
  { feature: "M-Pesa billing", vals: [true, true, true, true, true, true] },
  { feature: "Shared calendars & drives", vals: [false, true, true, true, true, true] },
  { feature: "Multi-client workspaces", vals: [false, false, true, false, false, false] },
  { feature: "7-year email retention", vals: [false, false, false, true, true, true] },
  { feature: "Immutable audit logs", vals: [false, false, false, true, true, true] },
  { feature: "E-discovery export", vals: [false, false, false, true, false, true] },
  { feature: "Digital Health Act data controls", vals: [false, false, false, false, true, false] },
  { feature: "Single-tenant infrastructure", vals: [false, false, false, false, false, true] },
  {
    feature: "Kenya Cloud Policy 2025 compliance pack",
    vals: [false, false, false, false, false, true],
  },
];

const FAQS = [
  {
    q: "How is ZuriMail different from Google Workspace or Microsoft 365?",
    a: "Google and Microsoft store your email data on servers outside Kenya - typically in South Africa or Europe. ZuriMail stores all data in our Tier III+ Nairobi data centres, billed in KES via M-Pesa, with Swahili support. For businesses subject to Kenya's DPA, this is a meaningful legal and operational difference.",
  },
  {
    q: "Can I migrate my existing email from Gmail or Outlook?",
    a: "Yes. We provide free mailbox migration for all plans - our team handles the full cutover including DNS configuration, email history import, and contact migration. There is no downtime during the migration window.",
  },
  {
    q: "Is ZuriMail compliant with Kenya's Data Protection Act 2019?",
    a: "ZuriMail is designed for DPA alignment. All data is hosted within Kenya, we provide data processing agreements, consent logging, and DPIA documentation. We recommend engaging a certified DPO for formal legal sign-off specific to your organisation.",
  },
  {
    q: "Do I need a credit card to sign up?",
    a: "No. ZuriMail accepts M-Pesa as a first-class payment method across all plans. You can sign up, get set up, and pay your monthly invoice entirely through M-Pesa - no international card required.",
  },
  {
    q: "What happens to my data if I cancel?",
    a: "You own your data. On cancellation we provide a full export of all mailbox data in standard formats (EML, MBOX). We retain your data for 30 days post-cancellation before secure deletion, and we provide a deletion certificate on request.",
  },
  {
    q: "Can ZuriMail work alongside Eza Cloud or other services?",
    a: "Yes. Zuri Mail Office and above integrates natively with Eza Cloud for file storage and collaboration. ZuriMail also works standalone with any hosting provider - you don't need to be an Eza Cloud customer.",
  },
];

/* ─── Page ───────────────────────────────────────────────────── */
export default function ZuriMailPage() {
  return (
    <main className="bg-[#F9FAFB]">
      {/* ══════════════════════════════════════════════════════
          PAGE HEADER
      ══════════════════════════════════════════════════════ */}
      <section className="pt-32 pb-10 md:pt-36 md:pb-12 bg-white border-b border-[#E6EAEE]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-10">
          <p className="flex items-center gap-2 font-sans text-[11px] text-[#BDC8D2] font-medium mb-5">
            <Link href="/" className="hover:text-[#7B8FA0] transition-colors duration-150">
              Home
            </Link>
            <span>/</span>
            <Link href="/solutions" className="hover:text-[#7B8FA0] transition-colors duration-150">
              Solutions
            </Link>
            <span>/</span>
            <span className="text-[#7B8FA0]">ZuriMail</span>
          </p>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-[700px]">
              <p className="font-sans font-black text-[9.5px] tracking-[0.16em] uppercase text-[#8B5CF6] mb-3">
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
                ZuriMail - Kenya Business Email Hosting
              </h1>
              <p className="font-sans text-[16px] md:text-[17px] text-[#3D4E5C] leading-relaxed max-w-[600px]">
                Professional business email hosted in Nairobi, billed in KES via M-Pesa, with
                support in Swahili and English. Six plans - from micro-SMEs getting their first
                custom domain to government agencies requiring sovereign infrastructure.
              </p>
            </div>

            <div className="flex flex-col gap-3 shrink-0">
              <Link
                href="/contact?product=zurimail&intent=early-access"
                className="inline-flex items-center gap-2 px-6 py-[13px] bg-[#8B5CF6] border-[1.5px] border-[#8B5CF6] font-sans font-bold text-[13px] text-white hover:bg-[#7c4fe0] hover:-translate-y-px hover:shadow-[3px_3px_0px_0px_rgba(139,92,246,0.25)] transition-all duration-150"
              >
                Join ZuriMail Early Access <ArrowRight size={13} />
              </Link>
              <a
                href="#plans"
                className="inline-flex items-center gap-2 px-6 py-[13px] border-[1.5px] border-[#D4DBE2] font-sans font-semibold text-[13px] text-[#3D4E5C] hover:border-[#8B5CF6] hover:text-[#8B5CF6] transition-all duration-150"
              >
                Compare Plans & Pricing <ArrowRight size={13} />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-5 mt-8 pt-7 border-t border-[#E6EAEE]">
            {TRUST_STATS.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-2 font-sans font-bold text-[11px] tracking-[0.08em] uppercase text-[#7B8FA0]"
              >
                <Icon size={12} className="text-[#8B5CF6]" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHY ZURIMAIL - 4 PILLARS
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white border-b border-[#E6EAEE]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="max-w-[560px]">
              <p className="eyebrow mb-3">Why ZuriMail</p>
              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(24px, 3vw, 38px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.025em",
                  fontWeight: 400,
                }}
              >
                Kenya-hosted email isn't a nice-to-have.
                <br />
                For many businesses, it's a legal requirement.
              </h2>
            </div>
            <p className="font-sans text-[13px] text-[#7B8FA0] max-w-[320px] leading-relaxed lg:text-right shrink-0">
              Kenya's Data Protection Act 2019 restricts cross-border data transfers. If your email
              is on foreign servers, you may already be non-compliant.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-[1.5px] border-[#D4DBE2]">
            {WHY_PILLARS.map(({ number, heading, copy }, i) => (
              <div
                key={heading}
                className={[
                  "group p-8 bg-white hover:bg-[#F9FAFB] transition-colors duration-150 border-[#D4DBE2]",
                  i < 3 ? "border-r-[1.5px]" : "",
                ].join(" ")}
              >
                <p className="font-sans font-black text-[11px] tracking-[0.18em] uppercase text-[#BDC8D2] mb-5">
                  {number}
                </p>
                <div className="w-0 group-hover:w-5 h-[2px] bg-[#8B5CF6] mb-4 transition-all duration-200" />
                <h3 className="font-sans font-bold text-[15px] text-[#0B1016] mb-3 leading-snug">
                  {heading}
                </h3>
                <p className="font-sans text-[13px] text-[#3D4E5C] leading-relaxed">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          6 TIER PLANS - horizontal row layout
      ══════════════════════════════════════════════════════ */}
      <section id="plans" className="py-20 md:py-28 bg-[#F9FAFB] border-b border-[#E6EAEE]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-10">
          <div className="max-w-[520px] mb-14">
            <p className="eyebrow mb-3">Six Plans. One Platform.</p>
            <h2
              className="font-serif mb-3"
              style={{
                fontSize: "clamp(24px, 3vw, 38px)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                fontWeight: 400,
              }}
            >
              Business email built for your sector.
            </h2>
            <p className="font-sans text-[14px] text-[#7B8FA0] leading-relaxed">
              Every plan is hosted in Nairobi, billed in KES via M-Pesa, and supported in Swahili
              and English. The tier determines the compliance controls, storage, and collaboration
              features on top.
            </p>
          </div>

          <div className="border-[1.5px] border-[#D4DBE2]">
            {TIERS.map(
              (
                {
                  icon: Icon,
                  name,
                  slug,
                  href,
                  niche,
                  tagline,
                  price,
                  unit,
                  accentColor,
                  description,
                  bullets,
                  idealFor,
                  blueOcean,
                },
                i,
              ) => (
                <div
                  key={slug}
                  className={[
                    "group grid grid-cols-1 lg:grid-cols-12 bg-white hover:bg-[#F9FAFB] transition-colors duration-150 border-[#D4DBE2]",
                    i > 0 ? "border-t-[1.5px]" : "",
                  ].join(" ")}
                >
                  {/* Col 1 - identity + price */}
                  <div className="lg:col-span-3 p-8 lg:border-r-[1.5px] border-b lg:border-b-0 border-[#D4DBE2] flex flex-col justify-between gap-6">
                    <div>
                      <div className="w-10 h-10 border-[1.5px] border-[#D4DBE2] flex items-center justify-center mb-5">
                        <Icon size={16} style={{ color: accentColor }} />
                      </div>
                      <div
                        className="w-0 group-hover:w-5 h-[2px] mb-3 transition-all duration-200"
                        style={{ background: accentColor }}
                      />
                      <h3 className="font-sans font-bold text-[16px] text-[#0B1016] mb-1 leading-tight">
                        {name}
                      </h3>
                      <p
                        className="font-sans font-semibold text-[11px] tracking-[0.04em] uppercase mb-3"
                        style={{ color: accentColor }}
                      >
                        {tagline}
                      </p>
                      <span
                        className="inline-flex items-center px-2.5 py-1 border-[1.5px] font-sans font-black text-[9px] tracking-[0.10em] uppercase"
                        style={{ borderColor: `${accentColor}40`, color: accentColor }}
                      >
                        {niche}
                      </span>
                    </div>
                    <div>
                      <p className="font-sans font-black text-[9.5px] tracking-[0.10em] uppercase text-[#BDC8D2] mb-1">
                        From
                      </p>
                      <p
                        className="font-serif leading-tight mb-0.5"
                        style={{
                          fontSize: "clamp(16px, 1.8vw, 22px)",
                          letterSpacing: "-0.02em",
                          color: accentColor,
                        }}
                      >
                        {price}
                      </p>
                      <p className="font-sans text-[11px] text-[#BDC8D2]">{unit}</p>
                    </div>
                  </div>

                  {/* Col 2 - description + features */}
                  <div className="lg:col-span-6 p-8 lg:border-r-[1.5px] border-b lg:border-b-0 border-[#D4DBE2]">
                    <p className="font-sans text-[13.5px] text-[#3D4E5C] leading-relaxed mb-6">
                      {description}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2">
                      {bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2 font-sans text-[12px] text-[#3D4E5C]"
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

                  {/* Col 3 - audience + CTA */}
                  <div className="lg:col-span-3 p-8 flex flex-col justify-between gap-6">
                    <div>
                      <p className="font-sans font-black text-[9.5px] tracking-[0.12em] uppercase text-[#BDC8D2] mb-2">
                        Ideal for
                      </p>
                      <p className="font-sans text-[12.5px] text-[#7B8FA0] leading-relaxed italic mb-5">
                        {idealFor}
                      </p>
                      <div
                        className="px-3 py-2.5 border-[1.5px]"
                        style={{ borderColor: `${accentColor}25`, background: `${accentColor}06` }}
                      >
                        <p
                          className="font-sans font-black text-[9px] tracking-[0.10em] uppercase mb-1"
                          style={{ color: accentColor }}
                        >
                          Our edge
                        </p>
                        <p className="font-sans text-[11.5px] text-[#3D4E5C] leading-snug">
                          {blueOcean}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <Link
                        href="/contact?product=zurimail"
                        className="inline-flex items-center justify-center gap-2 px-5 py-[10px] font-sans font-bold text-[12px] border-[1.5px] text-white transition-all duration-150 hover:-translate-y-px"
                        style={{ background: accentColor, borderColor: accentColor }}
                      >
                        Get started <ArrowRight size={11} />
                      </Link>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-[10px] font-sans font-semibold text-[12px] border-[1.5px] border-[#D4DBE2] text-[#3D4E5C] hover:border-[#8B5CF6] hover:text-[#8B5CF6] transition-all duration-150"
                      >
                        Learn more <ArrowRight size={11} />
                      </a>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FEATURE MATRIX
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white border-b border-[#E6EAEE]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-10">
          <div className="max-w-[480px] mb-12">
            <p className="eyebrow mb-3">Feature Comparison</p>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(24px, 3vw, 38px)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                fontWeight: 400,
              }}
            >
              What's included in each plan.
            </h2>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[700px] border-[1.5px] border-[#D4DBE2]">
              {/* Header */}
              <div className="grid grid-cols-7 bg-[#F9FAFB] border-b-[1.5px] border-[#D4DBE2]">
                <div className="p-4 font-sans font-black text-[9.5px] tracking-[0.12em] uppercase text-[#BDC8D2]">
                  Feature
                </div>
                {TIERS.map(({ name, accentColor }, i) => (
                  <div
                    key={name}
                    className={[
                      "p-4 text-center border-[#D4DBE2]",
                      i > 0 ? "border-l-[1.5px]" : "",
                    ].join(" ")}
                  >
                    <p
                      className="font-sans font-bold text-[11px] leading-tight"
                      style={{ color: accentColor }}
                    >
                      {name.replace("Zuri Mail ", "")}
                    </p>
                  </div>
                ))}
              </div>

              {/* Rows */}
              {FEATURE_MATRIX.map(({ feature, vals }, ri) => (
                <div
                  key={feature}
                  className={[
                    "grid grid-cols-7 border-[#D4DBE2]",
                    ri < FEATURE_MATRIX.length - 1 ? "border-b-[1.5px]" : "",
                    ri % 2 === 1 ? "bg-[#F9FAFB]" : "bg-white",
                  ].join(" ")}
                >
                  <div className="p-4 font-sans text-[12.5px] text-[#3D4E5C]">{feature}</div>
                  {vals.map((has, ci) => (
                    <div
                      key={ci}
                      className={[
                        "p-4 text-center border-[#D4DBE2]",
                        ci > 0 ? "border-l-[1.5px]" : "",
                      ].join(" ")}
                    >
                      {has ? (
                        <span className="text-[#00C9A7] font-bold">✓</span>
                      ) : (
                        <span className="text-[#D4DBE2]">-</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#F9FAFB] border-b border-[#E6EAEE]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
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
                Common questions about ZuriMail.
              </h2>
              <p className="font-sans text-[13.5px] text-[#7B8FA0] leading-relaxed mb-6">
                More questions? Our Nairobi team is on WhatsApp.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-sans font-bold text-[13px] text-[#8B5CF6] hover:gap-3 transition-all duration-150"
              >
                Talk to us <ArrowRight size={12} />
              </Link>
            </div>

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
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1320px] mx-auto px-5 md:px-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-[1.5px] border-[#D4DBE2] p-8 md:p-10">
            <div>
              <h3 className="font-sans font-bold text-[18px] text-[#0B1016] mb-1.5 leading-snug">
                Ready to move your business email to Kenya?
              </h3>
              <p className="font-sans text-[13px] text-[#7B8FA0]">
                Early access is open. Free migration from Gmail or Outlook - our Nairobi team
                handles everything.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href="/contact?product=zurimail&intent=early-access"
                className="inline-flex items-center gap-2 px-6 py-[12px] bg-[#8B5CF6] border-[1.5px] border-[#8B5CF6] font-sans font-bold text-[13px] text-white hover:bg-[#7c4fe0] hover:-translate-y-px hover:shadow-[3px_3px_0px_0px_rgba(139,92,246,0.20)] transition-all duration-150"
              >
                Join Early Access <ArrowRight size={13} />
              </Link>
              <Link
                href="/solutions#zurimail"
                className="inline-flex items-center gap-2 px-6 py-[12px] border-[1.5px] border-[#D4DBE2] font-sans font-semibold text-[13px] text-[#3D4E5C] hover:border-[#8B5CF6] hover:text-[#8B5CF6] transition-all duration-150"
              >
                Solutions Overview <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
