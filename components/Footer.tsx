"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Twitter,
  Github,
  ArrowRight,
  Send,
  CheckCircle2,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────────────── */
const COLS = [
  {
    title: "Services",
    links: [
      { label: "Cloud Services", href: "/services#cloud-services" },
      { label: "Custom Software Dev", href: "/services#custom-software" },
      { label: "Advisory & Training", href: "/services#advisory-training" },
      { label: "DevOps Engineering", href: "/services#cloud-services" },
      { label: "FinOps & Cloud Finance", href: "/services#cloud-services" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "FinTech & SACCOs", href: "/solutions#fintech-saccos" },
      { label: "Healthcare & MedTech", href: "/solutions#healthcare-medtech" },
      { label: "Government & Public Sector", href: "/solutions#government-public-sector" },
      { label: "Education & EdTech", href: "/solutions#education-edtech" },
      { label: "All Industries", href: "/industries" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Eza Cloud", href: "/products/eza-cloud" },
      { label: "ZuriMail", href: "/products/zurimail" },
      { label: "Future Stack", href: "/products#future-stack" },
      { label: "Book a Demo", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/company" },
      { label: "Resources & Blog", href: "/resources" },
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Data Processing", href: "/data-processing-agreement" },
      { label: "Cookie Policy", href: "/cookie-policy" },
    ],
  },
];

const BADGES = [
  "Kenya DPA Aligned",
  "Kenya Data Residency",
  "M-Pesa Native",
  "GDPR-Aware",
  "Cloud Policy Compliant",
];

/* ─── East Africa SVG map illustration ───────────────────────
   Abstract topographic-style linework of the East Africa
   region - Kenya, Tanzania, Uganda silhouettes traced as
   simplified polygons, layered with coordinate grid lines,
   signal-ping circles on Nairobi, and connection arcs to
   regional cloud nodes. Pure SVG, no external assets.
─────────────────────────────────────────────────────────── */
function FooterIllustration() {
  return (
    <svg
      viewBox="0 0 900 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {/* ── Longitude / latitude grid ── */}
      {[100, 200, 300, 400, 500, 600, 700, 800].map((x) => (
        <line key={`v${x}`} x1={x} y1={0} x2={x} y2={320} stroke="#1E293B" strokeWidth="1" />
      ))}
      {[80, 160, 240].map((y) => (
        <line key={`h${y}`} x1={0} y1={y} x2={900} y2={y} stroke="#1E293B" strokeWidth="1" />
      ))}

      {/* ── Diagonal scan line ── */}
      <line x1="0" y1="320" x2="900" y2="0" stroke="#00A2FF" strokeWidth="1" strokeOpacity="0.06" />
      <line
        x1="0"
        y1="260"
        x2="900"
        y2="-60"
        stroke="#00A2FF"
        strokeWidth="1"
        strokeOpacity="0.04"
      />

      {/* ── Kenya simplified polygon - centre-left ── */}
      <polygon
        points="380,40 420,35 455,55 470,90 460,130 430,155 400,160 375,140 360,110 365,75"
        fill="none"
        stroke="#334155"
        strokeWidth="1.5"
      />
      {/* Kenya inner fill - very faint */}
      <polygon
        points="380,40 420,35 455,55 470,90 460,130 430,155 400,160 375,140 360,110 365,75"
        fill="#00A2FF"
        fillOpacity="0.03"
      />

      {/* ── Tanzania simplified polygon - below Kenya ── */}
      <polygon
        points="360,165 400,162 435,158 460,175 465,210 445,245 410,255 375,250 350,230 345,200 355,175"
        fill="none"
        stroke="#1E293B"
        strokeWidth="1.5"
      />

      {/* ── Uganda simplified polygon - top left of Kenya ── */}
      <polygon
        points="330,50 360,42 378,62 370,90 345,98 320,85 318,65"
        fill="none"
        stroke="#1E293B"
        strokeWidth="1.5"
      />

      {/* ── Ethiopia - top ── */}
      <polygon
        points="420,20 470,15 510,30 520,55 490,70 460,60 430,45"
        fill="none"
        stroke="#1E293B"
        strokeWidth="1"
        strokeDasharray="4 3"
      />

      {/* ── Somalia coast - right of Kenya ── */}
      <polyline
        points="472,25 480,50 478,90 468,130 462,158"
        fill="none"
        stroke="#1E293B"
        strokeWidth="1"
        strokeDasharray="3 3"
      />

      {/* ── Indian Ocean coastline arc ── */}
      <path
        d="M462,158 Q490,200 480,240 Q470,265 460,280"
        fill="none"
        stroke="#1E293B"
        strokeWidth="1"
        strokeDasharray="4 4"
      />

      {/* ── Topographic contour rings inside Kenya ── */}
      <ellipse
        cx="415"
        cy="100"
        rx="20"
        ry="14"
        fill="none"
        stroke="#1E293B"
        strokeWidth="1"
        strokeDasharray="2 3"
      />
      <ellipse
        cx="415"
        cy="100"
        rx="34"
        ry="24"
        fill="none"
        stroke="#1E293B"
        strokeWidth="1"
        strokeDasharray="2 4"
      />

      {/* ── Nairobi node - primary ── */}
      {/* Outer ping rings */}
      <circle
        cx="415"
        cy="100"
        r="28"
        fill="none"
        stroke="#00A2FF"
        strokeWidth="1"
        strokeOpacity="0.15"
      >
        <animate attributeName="r" values="28;44;28" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.15;0;0.15" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle
        cx="415"
        cy="100"
        r="20"
        fill="none"
        stroke="#00A2FF"
        strokeWidth="1"
        strokeOpacity="0.2"
      >
        <animate
          attributeName="r"
          values="20;32;20"
          dur="3s"
          begin="0.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.2;0;0.2"
          dur="3s"
          begin="0.5s"
          repeatCount="indefinite"
        />
      </circle>
      {/* Node dot */}
      <circle cx="415" cy="100" r="5" fill="#00A2FF" />
      <circle cx="415" cy="100" r="3" fill="#0D1117" />
      {/* Label */}
      <text x="425" y="96" fill="#00A2FF" fontSize="8" fontFamily="monospace" fontWeight="bold">
        NAIROBI
      </text>
      <text x="425" y="106" fill="#475569" fontSize="6.5" fontFamily="monospace">
        HQ · TIER III+
      </text>

      {/* ── Mombasa node ── */}
      <circle cx="458" cy="148" r="3.5" fill="#334155" stroke="#00A2FF" strokeWidth="1" />
      <circle cx="458" cy="148" r="1.5" fill="#00A2FF" />
      <text x="463" y="152" fill="#475569" fontSize="6" fontFamily="monospace">
        MOMBASA
      </text>

      {/* ── Kampala node ── */}
      <circle cx="334" cy="68" r="3" fill="#334155" stroke="#475569" strokeWidth="1" />
      <circle cx="334" cy="68" r="1.5" fill="#64748B" />
      <text x="340" y="72" fill="#475569" fontSize="6" fontFamily="monospace">
        KAMPALA
      </text>

      {/* ── Dar es Salaam node ── */}
      <circle cx="430" cy="240" r="3" fill="#334155" stroke="#475569" strokeWidth="1" />
      <circle cx="430" cy="240" r="1.5" fill="#64748B" />
      <text x="436" y="244" fill="#475569" fontSize="6" fontFamily="monospace">
        DAR ES SALAAM
      </text>

      {/* ── Addis node ── */}
      <circle cx="480" cy="35" r="3" fill="#334155" stroke="#475569" strokeWidth="1" />
      <circle cx="480" cy="35" r="1.5" fill="#64748B" />
      <text x="486" y="39" fill="#475569" fontSize="6" fontFamily="monospace">
        ADDIS
      </text>

      {/* ── Connection lines: Nairobi → regional nodes ── */}
      <line
        x1="415"
        y1="100"
        x2="334"
        y2="68"
        stroke="#00A2FF"
        strokeWidth="1"
        strokeOpacity="0.2"
        strokeDasharray="4 3"
      />
      <line
        x1="415"
        y1="100"
        x2="458"
        y2="148"
        stroke="#00A2FF"
        strokeWidth="1"
        strokeOpacity="0.2"
        strokeDasharray="4 3"
      />
      <line
        x1="415"
        y1="100"
        x2="430"
        y2="240"
        stroke="#00A2FF"
        strokeWidth="1"
        strokeOpacity="0.15"
        strokeDasharray="4 3"
      />
      <line
        x1="415"
        y1="100"
        x2="480"
        y2="35"
        stroke="#00A2FF"
        strokeWidth="1"
        strokeOpacity="0.15"
        strokeDasharray="4 3"
      />

      {/* ── Travel dot: Nairobi → Mombasa ── */}
      <circle r="2" fill="#00A2FF" opacity="0.8">
        <animateMotion dur="2.5s" repeatCount="indefinite" path="M415,100 L458,148" />
      </circle>
      {/* ── Travel dot: Nairobi → Kampala ── */}
      <circle r="2" fill="#00C9A7" opacity="0.8">
        <animateMotion dur="3s" repeatCount="indefinite" begin="0.8s" path="M415,100 L334,68" />
      </circle>
      {/* ── Travel dot: Nairobi → Dar ── */}
      <circle r="2" fill="#00A2FF" opacity="0.6">
        <animateMotion dur="3.8s" repeatCount="indefinite" begin="1.4s" path="M415,100 L430,240" />
      </circle>

      {/* ── Right panel: cloud infra labels ── */}
      {[
        { x: 620, y: 60, label: "EZA CLOUD", sub: "NAIROBI · TIER III+", color: "#00C9A7" },
        { x: 620, y: 130, label: "ZURIMAIL", sub: "EMAIL · SMS · MARTECH", color: "#8B5CF6" },
        { x: 620, y: 200, label: "DPA · ODPC", sub: "COMPLIANT BY DEFAULT", color: "#00A2FF" },
        {
          x: 620,
          y: 268,
          label: "CLOUD POLICY 25",
          sub: "KENYA SOVEREIGN STACK",
          color: "#475569",
        },
      ].map(({ x, y, label, sub, color }) => (
        <g key={label}>
          <rect
            x={x}
            y={y - 18}
            width={200}
            height={36}
            fill="#0D1117"
            stroke={color}
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <text
            x={x + 10}
            y={y - 3}
            fill={color}
            fontSize="8"
            fontFamily="monospace"
            fontWeight="bold"
          >
            {label}
          </text>
          <text x={x + 10} y={y + 10} fill="#475569" fontSize="6.5" fontFamily="monospace">
            {sub}
          </text>
          {/* Status dot */}
          <circle cx={x + 192} cy={y - 4} r="3" fill={color} opacity="0.7" />
        </g>
      ))}

      {/* ── Connection from Nairobi to right panel ── */}
      <path
        d="M 470 100 Q 550 100 620 60"
        fill="none"
        stroke="#00C9A7"
        strokeWidth="1"
        strokeOpacity="0.2"
        strokeDasharray="3 3"
      />
      <path
        d="M 470 100 Q 550 110 620 130"
        fill="none"
        stroke="#8B5CF6"
        strokeWidth="1"
        strokeOpacity="0.2"
        strokeDasharray="3 3"
      />
      <path
        d="M 470 100 Q 550 140 620 200"
        fill="none"
        stroke="#00A2FF"
        strokeWidth="1"
        strokeOpacity="0.15"
        strokeDasharray="3 3"
      />

      {/* ── Coordinate labels ── */}
      <text x="8" y="14" fill="#1E293B" fontSize="7" fontFamily="monospace">
        04°N
      </text>
      <text x="8" y="94" fill="#1E293B" fontSize="7" fontFamily="monospace">
        01°S
      </text>
      <text x="8" y="172" fill="#1E293B" fontSize="7" fontFamily="monospace">
        04°S
      </text>
      <text x="8" y="250" fill="#1E293B" fontSize="7" fontFamily="monospace">
        08°S
      </text>
      <text x="364" y="316" fill="#1E293B" fontSize="7" fontFamily="monospace">
        36°E
      </text>
      <text x="454" y="316" fill="#1E293B" fontSize="7" fontFamily="monospace">
        38°E
      </text>

      {/* ── Left side: faint ocean fill ── */}
      <rect x="0" y="0" width="310" height="320" fill="#00A2FF" fillOpacity="0.012" />

      {/* ── Watermark text ── */}
      <text x="840" y="312" fill="#1E293B" fontSize="7" fontFamily="monospace" textAnchor="end">
        EAST AFRICA · EdgeCloud Stack
      </text>
    </svg>
  );
}

/* ─── Component ─────────────────────────────────────────────── */
export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <footer
      style={{ background: "#0D1117", color: "white", position: "relative", overflow: "hidden" }}
    >
      {/* ── Top brand line ─────────────────────────────────────── */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-[#00A2FF]" />

      {/* ── CTA strip - hidden on homepage ────────────────────── */}
      {!isHome && (
        <div style={{ background: "#111318", borderBottom: "1.5px solid #1E293B" }}>
          <div className="max-w-[1320px] mx-auto px-5 md:px-10 py-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-[520px]">
                <p className="flex items-center gap-2 text-[11px] font-black tracking-[0.18em] uppercase text-[#00A2FF] mb-4">
                  <span className="block w-5 h-[2px] bg-[#00A2FF] shrink-0" />
                  Get Started
                </p>
                <h3
                  className="font-sans font-black mb-2 leading-tight"
                  style={{
                    fontSize: "clamp(20px,3vw,28px)",
                    color: "#F8FAFC",
                    letterSpacing: "-0.03em",
                  }}
                >
                  Ready to build on Kenya's most compliant cloud?
                </h3>
                <p className="font-sans text-[14px] leading-relaxed" style={{ color: "#64748B" }}>
                  DPA-compliant by default · M-Pesa-native · Locally supported
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0 flex-wrap">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 font-sans font-bold text-[13px] text-white transition-all duration-150 hover:-translate-y-px"
                  style={{ background: "#00A2FF", border: "1.5px solid #00A2FF" }}
                >
                  Book a Free Strategy Call
                  <ArrowRight size={13} className="shrink-0" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-5 py-3 font-sans font-semibold text-[13px] transition-colors duration-150"
                  style={{ border: "1.5px solid #334155", color: "#94A3B8" }}
                >
                  View Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Map illustration zone ─────────────────────────────── */}
      <div
        className="relative h-[320px] overflow-hidden"
        style={{ borderBottom: "1.5px solid #1E293B" }}
      >
        <FooterIllustration />

        {/* Fade gradient - blends illustration into footer body */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #0D1117 0%, transparent 18%, transparent 55%, #0D1117 100%), linear-gradient(to bottom, transparent 60%, #0D1117 100%)",
          }}
        />

        {/* Overlay tagline centred on the left fade */}
        <div className="absolute left-5 md:left-10 bottom-10 max-w-[300px]">
          <p
            className="font-sans font-black mb-1 leading-none"
            style={{ fontSize: 28, color: "#F8FAFC", letterSpacing: "-0.04em" }}
          >
            EdgeCloud
          </p>
          <p
            className="font-sans text-[10px] font-bold tracking-[0.22em] uppercase mb-3"
            style={{ color: "#475569" }}
          >
            Technologies
          </p>
          <p className="font-sans text-[13px] leading-relaxed" style={{ color: "#475569" }}>
            One Stack. Zero Pain. Full Trust.
          </p>
        </div>
      </div>

      {/* ── Main footer body ───────────────────────────────────── */}
      <div className="relative max-w-[1320px] mx-auto px-5 md:px-10 pt-14 pb-8">
        {/* 12-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-y-12 gap-x-6 mb-14">
          {/* Brand column - 4 cols */}
          <div className="sm:col-span-2 lg:col-span-4 lg:pr-10">
            {/* Contact details */}
            <div className="space-y-3 mb-8">
              {[
                { icon: <MapPin size={13} />, text: "Nairobi, Kenya" },
                { icon: <Phone size={13} />, text: "+254 745 188 847" },
                { icon: <Mail size={13} />, text: "hello@edgecloud.co.ke" },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2.5 font-sans text-[13.5px] font-medium"
                  style={{ color: "#94A3B8" }}
                >
                  <span style={{ color: "#00A2FF" }} className="shrink-0">
                    {icon}
                  </span>
                  {text}
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2 mb-8">
              {[
                {
                  href: "https://twitter.com/edgecloud",
                  icon: <Twitter size={15} />,
                  label: "Twitter",
                },
                {
                  href: "https://linkedin.com/company/edgecloud",
                  icon: <Linkedin size={15} />,
                  label: "LinkedIn",
                },
                {
                  href: "https://github.com/edgecloud",
                  icon: <Github size={15} />,
                  label: "GitHub",
                },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center transition-all duration-150 hover:-translate-y-px"
                  style={{ border: "1.5px solid #1E293B", color: "#64748B" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "#00A2FF";
                    (e.currentTarget as HTMLElement).style.borderColor = "#00A2FF";
                    (e.currentTarget as HTMLElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.borderColor = "#1E293B";
                    (e.currentTarget as HTMLElement).style.color = "#64748B";
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div>
              <p className="font-sans font-bold text-[13px] mb-1" style={{ color: "#F1F5F9" }}>
                Stay ahead of Kenya's cloud landscape
              </p>
              <p className="font-sans text-[11.5px] mb-4" style={{ color: "#475569" }}>
                DPA updates, product drops, guides - no spam.
              </p>
              {submitted ? (
                <div
                  className="flex items-center gap-2 font-sans font-semibold text-[13px]"
                  style={{ color: "#00C9A7" }}
                >
                  <CheckCircle2 size={15} />
                  Subscribed - thank you!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 min-w-0 px-3.5 py-2.5 font-sans text-[13px] outline-none transition-all duration-150"
                    style={{
                      background: "#111318",
                      border: "1.5px solid #1E293B",
                      borderRight: "none",
                      color: "#F1F5F9",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#00A2FF")}
                    onBlur={(e) => (e.target.style.borderColor = "#1E293B")}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="shrink-0 flex items-center gap-2 px-4 py-2.5 font-sans font-bold text-[12.5px] text-white transition-colors duration-150 disabled:opacity-50"
                    style={{ background: "#00A2FF", border: "1.5px solid #00A2FF" }}
                  >
                    {loading ? (
                      <span className="w-[12px] h-[12px] border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send size={12} />
                    )}
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Link columns */}
          {COLS.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <p
                className="font-sans font-black text-[9.5px] tracking-[0.2em] uppercase pb-3 mb-5"
                style={{ color: "#334155", borderBottom: "1px solid #1E293B" }}
              >
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="font-sans text-[13px] font-medium inline-block transition-all duration-150 hover:pl-1.5"
                      style={{ color: "#64748B" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#F1F5F9")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#64748B")}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
          style={{ borderTop: "1px solid #1E293B" }}
        >
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {BADGES.map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 font-sans font-black text-[9px] tracking-[0.10em] uppercase"
                style={{ border: "1.5px solid #1E293B", color: "#475569" }}
              >
                <Shield size={9} style={{ color: "#00A2FF" }} />
                {label}
              </span>
            ))}
          </div>

          <p className="font-sans text-[12px] font-medium shrink-0" style={{ color: "#334155" }}>
            © {new Date().getFullYear()} EdgeCloud Technologies Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
