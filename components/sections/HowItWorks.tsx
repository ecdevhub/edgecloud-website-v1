"use client";
const steps = [
  {
    number: "01",
    title: "Discover & Design",
    desc: "We run collaborative workshops, data audits, and architecture design sprints to map your ideal digital infrastructure - DPA-compliant from the first whiteboard session.",
    color: "#00A2FF",
    details: ["Strategy workshops", "DPIA & compliance audits", "Architecture blueprints"],
  },
  {
    number: "02",
    title: "Build & Migrate",
    desc: "Our engineering team deploys on Eza Cloud, integrates M-Pesa natively, and migrates your existing systems with zero downtime. WooCommerce, APIs, Kubernetes - we handle the stack.",
    color: "#00C9A7",
    details: ["Eza Cloud deployment", "M-Pesa integration", "Zero-downtime migration"],
  },
  {
    number: "03",
    title: "Operate & Optimise",
    desc: "Post-launch, we become your ongoing digital ops partner. Monitoring, ZuriMail campaigns, customer journey automation, and proactive support from Nairobi.",
    color: "#8B5CF6",
    details: [
      "24/7 infrastructure monitoring",
      "MarTech via ZuriMail",
      "Quarterly performance reviews",
    ],
  },
];

export default function HowItWorks() {
  return (
    <section style={{ padding: "96px 0", background: "#F4F6F8" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <div style={{ width: 20, height: 2, background: "#00A2FF", borderRadius: 2 }} />
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#00A2FF",
              }}
            >
              How It Works
            </span>
            <div style={{ width: 20, height: 2, background: "#00A2FF", borderRadius: 2 }} />
          </div>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              color: "#0F1923",
              margin: 0,
            }}
          >
            From idea to{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00A2FF, #00C9A7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              operational excellence.
            </span>
          </h2>
        </div>

        {/* Steps */}
        <div style={{ position: "relative" }}>
          {/* Connector line */}
          <div
            style={{
              position: "absolute",
              top: 56,
              left: "calc(50% - 120px)",
              width: "100%",
              maxWidth: 800,
              height: 1,
              background: "linear-gradient(90deg, #00A2FF, #00C9A7, #8B5CF6)",
              opacity: 0.25,
              display: "none",
            }}
            className="md:block"
          />

          <div style={{ display: "grid", gap: 32 }} className="grid-cols-1 md:grid-cols-3">
            {steps.map((step, i) => (
              <div
                key={step.number}
                style={{
                  background: "white",
                  border: "1px solid #E5E8ED",
                  borderRadius: 24,
                  padding: "36px 28px",
                  position: "relative",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${step.color}40`;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                {/* Step number */}
                <div
                  style={{
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                    fontWeight: 800,
                    fontSize: 64,
                    lineHeight: 1,
                    marginBottom: 20,
                    background: `linear-gradient(135deg, ${step.color}40, transparent)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {step.number}
                </div>

                <div
                  style={{
                    height: 3,
                    width: 40,
                    borderRadius: 2,
                    background: step.color,
                    marginBottom: 20,
                  }}
                />

                <h3
                  style={{
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                    fontWeight: 700,
                    fontSize: 20,
                    color: "#0F1923",
                    marginBottom: 14,
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ fontSize: 15, color: "#4A5568", lineHeight: 1.7, marginBottom: 24 }}>
                  {step.desc}
                </p>

                <ul
                  style={{
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  {step.details.map((d) => (
                    <li key={d} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div
                        style={{
                          width: 4,
                          height: 4,
                          borderRadius: "50%",
                          background: step.color,
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ fontSize: 13, color: "#8B96A3" }}>{d}</span>
                    </li>
                  ))}
                </ul>

                {/* Arrow connector */}
                {i < steps.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: -24,
                      transform: "translateY(-50%)",
                      color: step.color,
                      fontSize: 20,
                      opacity: 0.4,
                      zIndex: 2,
                      display: "none",
                    }}
                    className="md:block"
                  >
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
