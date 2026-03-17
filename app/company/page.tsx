import Link from "next/link";
import { ArrowRight, Shield, MapPin, Users } from "lucide-react";

/* ─── Data ───────────────────────────────────────────────────── */
const VALUES = [
  {
    number: "01",
    heading: "Trust by Design",
    copy: "Compliance is not a feature we add at the end. Data protection, sovereignty, and security are architectural decisions that we make at the start of every engagement and every product.",
  },
  {
    number: "02",
    heading: "Local First",
    copy: "We build for the Kenyan and East African context - M-Pesa-native, low-bandwidth-resilient, ODPC-aligned, and priced in KES. We don't localise global products. We build local originals.",
  },
  {
    number: "03",
    heading: "Accountable Partnership",
    copy: "When something goes wrong - and in technology, it eventually does - you should be able to call a human in Nairobi who knows your system. We prioritise long-term partnership over short-term transactions.",
  },
];

const FACTS = [
  { icon: MapPin, label: "Headquartered in Nairobi, Kenya" },
  { icon: Shield, label: "Tier III+ data centres - 100% Kenya data residency" },
  { icon: Users, label: "Support in Swahili & English · Local time zone · WhatsApp-accessible" },
];

/* ─── Page ───────────────────────────────────────────────────── */
export default function CompanyPage() {
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
            <span className="text-[#7B8FA0]">Company</span>
          </p>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="eyebrow mb-3">About EdgeCloud</p>
              <h1
                className="font-serif text-[#0B1016]"
                style={{
                  fontSize: "clamp(32px, 4vw, 52px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.035em",
                  fontWeight: 400,
                }}
              >
                We're Building Kenya's
                <br />
                Digital Infrastructure Stack
              </h1>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-[12px] bg-[#00A2FF] border-[1.5px] border-[#00A2FF] font-sans font-bold text-[13px] text-white hover:bg-[#007ACC] hover:-translate-y-px hover:shadow-[3px_3px_0px_0px_rgba(0,162,255,0.20)] transition-all duration-150"
              >
                Work With Us <ArrowRight size={13} />
              </Link>
              <Link
                href="/company/team"
                className="inline-flex items-center gap-2 px-6 py-[12px] border-[1.5px] border-[#D4DBE2] font-sans font-semibold text-[13px] text-[#3D4E5C] hover:border-[#00A2FF] hover:text-[#00A2FF] transition-all duration-150"
              >
                Meet the Team <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          MAIN COPY + FACT STRIP
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white border-b border-[#E6EAEE]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-[1.5px] border-[#D4DBE2]">
            {/* Left - primary copy */}
            <div className="lg:col-span-7 p-10 md:p-12 border-b lg:border-b-0 lg:border-r-[1.5px] border-[#D4DBE2]">
              <div className="w-5 h-[2px] bg-[#00A2FF] mb-8" />
              <div className="space-y-5 font-sans text-[15.5px] text-[#3D4E5C] leading-[1.8]">
                <p>
                  EdgeCloud Technologies Limited was founded in Nairobi with one conviction: that
                  Kenyan businesses deserve cloud infrastructure, software, and advisory services
                  that understand local compliance, payment reality, and operational context - not
                  scaled-down versions of global products.
                </p>
                <p>
                  We are a{" "}
                  <span className="font-semibold text-[#0B1016]">
                    digital enablement agency and cloud product studio
                  </span>
                  . That means we do two things simultaneously: we deliver strategic services -
                  cloud migration, software development, compliance advisory - and we build
                  proprietary products: Eza Cloud, ZuriMail, and a growing suite of Kenya-first
                  tools. You get the strategic thinking of an agency and the product depth of a
                  software company, from one accountable partner.
                </p>
                <p>
                  Our team is based in Nairobi. Our data centres are in Kenya. Our pricing is in
                  KES. And our support team speaks your language - literally.
                </p>
              </div>
            </div>

            {/* Right - fast facts */}
            <div className="lg:col-span-5 flex flex-col divide-y divide-[#E6EAEE]">
              {FACTS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-start gap-4 p-8">
                  <div className="w-9 h-9 border-[1.5px] border-[#D4DBE2] flex items-center justify-center shrink-0">
                    <Icon size={14} className="text-[#00A2FF]" />
                  </div>
                  <p className="font-sans text-[13.5px] text-[#3D4E5C] leading-relaxed pt-1.5">
                    {label}
                  </p>
                </div>
              ))}

              {/* KES pricing callout */}
              <div className="p-8 bg-[#F9FAFB] flex-1 flex flex-col justify-center">
                <p className="font-sans font-black text-[9.5px] tracking-[0.14em] uppercase text-[#BDC8D2] mb-2">
                  Pricing
                </p>
                <p
                  className="font-serif text-[28px] text-[#0B1016] leading-tight mb-1"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  KES-first,
                  <br />
                  always.
                </p>
                <p className="font-sans text-[12.5px] text-[#7B8FA0] leading-relaxed">
                  No USD conversion surprises. Every plan priced and invoiced in Kenyan Shillings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          VALUES
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#F9FAFB] border-b border-[#E6EAEE]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-10">
          <div className="max-w-[480px] mb-12">
            <p className="eyebrow mb-3">What We Stand For</p>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(26px, 3.5vw, 42px)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                fontWeight: 400,
              }}
            >
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-[1.5px] border-[#D4DBE2]">
            {VALUES.map(({ number, heading, copy }, i) => (
              <div
                key={heading}
                className={[
                  "group p-8 md:p-10 bg-white hover:bg-[#F9FAFB] transition-colors duration-150 border-[#D4DBE2]",
                  i < 2 ? "border-r-[1.5px]" : "",
                ].join(" ")}
              >
                <p className="font-sans font-black text-[11px] tracking-[0.18em] uppercase text-[#BDC8D2] mb-6">
                  {number}
                </p>
                <div className="w-0 group-hover:w-5 h-[2px] bg-[#00A2FF] mb-4 transition-all duration-200" />
                <h3 className="font-sans font-bold text-[16px] text-[#0B1016] mb-3 leading-snug">
                  {heading}
                </h3>
                <p className="font-sans text-[13.5px] text-[#3D4E5C] leading-relaxed">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA STRIP
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-white border-b border-[#E6EAEE]">
        <div className="max-w-[1320px] mx-auto px-5 md:px-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-[1.5px] border-[#D4DBE2] p-8 md:p-10">
            <div>
              <h3 className="font-sans font-bold text-[18px] text-[#0B1016] mb-1.5 leading-snug">
                Ready to build on Kenya's most compliant cloud stack?
              </h3>
              <p className="font-sans text-[13.5px] text-[#7B8FA0]">
                Talk to our Nairobi team - no commitment required.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-[12px] bg-[#00A2FF] border-[1.5px] border-[#00A2FF] font-sans font-bold text-[13px] text-white hover:bg-[#007ACC] hover:-translate-y-px hover:shadow-[3px_3px_0px_0px_rgba(0,162,255,0.20)] transition-all duration-150"
              >
                Work With Us <ArrowRight size={13} />
              </Link>
              <Link
                href="/company/team"
                className="inline-flex items-center gap-2 px-6 py-[12px] border-[1.5px] border-[#D4DBE2] font-sans font-semibold text-[13px] text-[#3D4E5C] hover:border-[#00A2FF] hover:text-[#00A2FF] transition-all duration-150"
              >
                Meet the Team <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
