"use client";
import { useState } from "react";
import { MapPin, Phone, Mail, MessageCircle, ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

const topics = [
  "Eza Cloud - Cloud & Hosting",
  "ZuriMail - Email & SMS Marketing",
  "WooCommerce & M-Pesa Build",
  "Digital Strategy & Consultation",
  "DPA Compliance Audit",
  "Managed Support Plan",
  "Partnership & Reseller",
  "Other",
];

const INP: React.CSSProperties = {
  width: "100%",
  background: "white",
  border: "1.5px solid #E5E8ED",
  borderRadius: 10,
  color: "#0F1923",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: 15,
  padding: "11px 14px",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.18s, box-shadow 0.18s",
};

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    topic: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set =
    (k: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const onFocus = (e: React.FocusEvent<any>) => {
    e.target.style.borderColor = "#00A2FF";
    e.target.style.boxShadow = "0 0 0 3px rgba(0,162,255,0.1)";
  };
  const onBlur = (e: React.FocusEvent<any>) => {
    e.target.style.borderColor = "#E5E8ED";
    e.target.style.boxShadow = "none";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section
        style={{
          paddingTop: 104,
          paddingBottom: 56,
          background: "white",
          borderBottom: "1px solid #E5E8ED",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ maxWidth: 600 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 18, height: 2, background: "#00A2FF", borderRadius: 2 }} />
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#00A2FF",
                }}
              >
                Get in touch
              </span>
            </div>
            <h1
              style={{
                fontFamily: "'Instrument Serif',serif",
                fontSize: "clamp(36px,5vw,54px)",
                fontWeight: 400,
                color: "#0F1923",
                marginBottom: 16,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Let's build something{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#00A2FF,#00C9A7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                remarkable.
              </span>
            </h1>
            <p style={{ fontSize: 18, color: "#4A5568", lineHeight: 1.72 }}>
              Start with a free 45-minute discovery call. No pitches, no decks - just honest
              conversation about your digital goals. <em>Piga simu au tuma ujumbe.</em>
            </p>
          </div>
        </div>
      </section>

      {/* Form + sidebar */}
      <section style={{ padding: "56px 0 96px", background: "#FAFBFC" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 380px",
              gap: 36,
              alignItems: "start",
            }}
          >
            {/* Form card */}
            <div
              style={{
                background: "white",
                border: "1px solid #E5E8ED",
                borderRadius: 20,
                padding: "40px",
                boxShadow: "0 2px 16px rgba(15,25,35,0.06)",
              }}
            >
              {submitted ? (
                <div style={{ textAlign: "center", padding: "48px 0" }}>
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      background: "rgba(0,162,255,0.08)",
                      border: "1px solid rgba(0,162,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                    }}
                  >
                    <ArrowRight size={26} style={{ color: "#00A2FF" }} />
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Instrument Serif',serif",
                      fontWeight: 400,
                      fontSize: 28,
                      color: "#0F1923",
                      marginBottom: 10,
                    }}
                  >
                    Asante! Message received.
                  </h3>
                  <p style={{ fontSize: 16, color: "#4A5568", lineHeight: 1.7 }}>
                    Our Nairobi team will be in touch within one business day. For urgent matters,
                    WhatsApp us directly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2
                    style={{
                      fontFamily: "'Plus Jakarta Sans',sans-serif",
                      fontWeight: 800,
                      fontSize: 20,
                      color: "#0F1923",
                      marginBottom: 28,
                    }}
                  >
                    Send us a message
                  </h2>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 16,
                      marginBottom: 16,
                    }}
                  >
                    {[
                      {
                        key: "name",
                        label: "Full name *",
                        placeholder: "Wanjiru Kamau",
                        type: "text",
                        required: true,
                      },
                      {
                        key: "email",
                        label: "Work email *",
                        placeholder: "wanjiru@company.co.ke",
                        type: "email",
                        required: true,
                      },
                      {
                        key: "company",
                        label: "Company",
                        placeholder: "Your company name",
                        type: "text",
                      },
                      {
                        key: "role",
                        label: "Your role",
                        placeholder: "CTO, Founder, Developer…",
                        type: "text",
                      },
                    ].map(({ key, label, placeholder, type, required }) => (
                      <div key={key}>
                        <label
                          style={{
                            display: "block",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#4A5568",
                            marginBottom: 6,
                          }}
                        >
                          {label}
                        </label>
                        <input
                          type={type}
                          required={required}
                          placeholder={placeholder}
                          value={(form as any)[key]}
                          onChange={set(key)}
                          style={INP}
                          onFocus={onFocus}
                          onBlur={onBlur}
                        />
                      </div>
                    ))}
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#4A5568",
                        marginBottom: 6,
                      }}
                    >
                      How can we help? *
                    </label>
                    <select
                      required
                      value={form.topic}
                      onChange={set("topic")}
                      style={{ ...INP, cursor: "pointer", background: "white" }}
                      onFocus={onFocus}
                      onBlur={onBlur}
                    >
                      <option value="" disabled>
                        Select a topic…
                      </option>
                      {topics.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={{ marginBottom: 28 }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#4A5568",
                        marginBottom: 6,
                      }}
                    >
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us about your project, current setup, timeline, and goals. The more context, the better."
                      value={form.message}
                      onChange={set("message")}
                      style={{ ...INP, resize: "vertical" }}
                      onFocus={onFocus}
                      onBlur={onBlur}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      background: loading ? "#7CC5FF" : "#00A2FF",
                      color: "white",
                      fontFamily: "'Plus Jakarta Sans',sans-serif",
                      fontWeight: 700,
                      fontSize: 15,
                      padding: "13px 28px",
                      borderRadius: 999,
                      border: "none",
                      cursor: loading ? "not-allowed" : "pointer",
                      boxShadow: "0 4px 20px rgba(0,162,255,0.28)",
                      transition: "all 0.18s",
                    }}
                  >
                    {loading ? "Sending…" : "Send message"} {!loading && <ArrowRight size={16} />}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {/* Contact details */}
              <div
                style={{
                  background: "white",
                  border: "1px solid #E5E8ED",
                  borderRadius: 18,
                  padding: "28px",
                  boxShadow: "0 1px 8px rgba(15,25,35,0.05)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                    fontWeight: 700,
                    fontSize: 16,
                    color: "#0F1923",
                    marginBottom: 20,
                  }}
                >
                  Reach us directly
                </h3>
                {[
                  {
                    icon: MessageCircle,
                    color: "#059669",
                    label: "WhatsApp",
                    value: "+254 745 188 847",
                    sub: "Fastest - usually same-day response",
                  },
                  {
                    icon: Phone,
                    color: "#00A2FF",
                    label: "Phone",
                    value: "+254 745 188 847",
                    sub: "Mon–Fri, 8 am – 6 pm EAT",
                  },
                  {
                    icon: Mail,
                    color: "#7C3AED",
                    label: "Email",
                    value: "hello@edgecloud.co.ke",
                    sub: "Response within 1 business day",
                  },
                  {
                    icon: MapPin,
                    color: "#D97706",
                    label: "Office",
                    value: "Nairobi, Kenya",
                    sub: "Westlands (by appointment)",
                  },
                ].map(({ icon: Icon, color, label, value, sub }) => (
                  <div key={label} style={{ display: "flex", gap: 13, marginBottom: 18 }}>
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        background: `${color}12`,
                        border: `1px solid ${color}25`,
                        borderRadius: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={17} style={{ color }} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 10.5,
                          fontWeight: 700,
                          color: "#8B96A3",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          marginBottom: 2,
                        }}
                      >
                        {label}
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#0F1923" }}>{value}</div>
                      <div style={{ fontSize: 12, color: "#8B96A3", marginTop: 1 }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Calendly placeholder */}
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(0,162,255,0.04), rgba(0,201,167,0.04))",
                  border: "1px solid rgba(0,162,255,0.15)",
                  borderRadius: 18,
                  padding: "28px",
                  textAlign: "center",
                }}
              >
                <Calendar
                  size={26}
                  style={{ color: "#00A2FF", margin: "0 auto 12px", display: "block" }}
                />
                <h4
                  style={{
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                    fontWeight: 700,
                    fontSize: 16,
                    color: "#0F1923",
                    marginBottom: 8,
                  }}
                >
                  Book a discovery call
                </h4>
                <p style={{ fontSize: 14, color: "#4A5568", lineHeight: 1.6, marginBottom: 16 }}>
                  45 minutes with our team. Free, no commitment.
                </p>
                <div
                  style={{
                    background: "#F4F6F8",
                    border: "1.5px dashed #CDD2D9",
                    borderRadius: 10,
                    padding: "20px 16px",
                    fontSize: 13,
                    color: "#8B96A3",
                  }}
                >
                  Calendly widget - add your link here
                </div>
              </div>

              {/* Language support */}
              <div
                style={{
                  background: "white",
                  border: "1px solid #E5E8ED",
                  borderRadius: 14,
                  padding: "18px 22px",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#8B96A3",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 10,
                  }}
                >
                  We support in
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  {["🇬🇧 English", "🇰🇪 Swahili"].map((lang) => (
                    <span
                      key={lang}
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        padding: "6px 14px",
                        borderRadius: 999,
                        background: "rgba(0,162,255,0.07)",
                        border: "1px solid rgba(0,162,255,0.18)",
                        color: "#0F1923",
                      }}
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
