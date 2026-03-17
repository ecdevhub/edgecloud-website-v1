"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      style={{
        minHeight: "100vh",
        background: "white",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        paddingTop: 68,
      }}
    >
      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,162,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,162,255,0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          pointerEvents: "none",
        }}
      />
      {/* Glow blobs */}
      <div
        style={{
          position: "absolute",
          top: -120,
          right: -120,
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(0,162,255,0.07) 0%, transparent 65%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -100,
          left: -80,
          width: 480,
          height: 480,
          background: "radial-gradient(circle, rgba(0,201,167,0.06) 0%, transparent 65%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 40px",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}
        >
          <div>
            {/* Label pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "5px 14px",
                borderRadius: 999,
                background: "rgba(0,162,255,0.07)",
                border: "1px solid rgba(0,162,255,0.18)",
                marginBottom: 24,
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00A2FF" }} />
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
                Kenyan Digital Enablement Agency
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Instrument Serif',serif",
                fontSize: "clamp(40px,5vw,66px)",
                fontWeight: 400,
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                marginBottom: 22,
                color: "#0F1923",
              }}
            >
              We build, host &<br />
              secure{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #00A2FF 0%, #00C9A7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                compliant
                <br />
                digital journeys
              </span>
              <br />
              for Kenya.
            </h1>

            <p
              style={{
                fontSize: 18,
                color: "#4A5568",
                lineHeight: 1.72,
                maxWidth: 500,
                marginBottom: 36,
              }}
            >
              Agency expertise meets proprietary DPA-compliant infrastructure. From strategy to
              go-live, we own the full stack - so you don't have to.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 52 }}>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#00A2FF",
                  color: "white",
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  padding: "13px 26px",
                  borderRadius: 999,
                  textDecoration: "none",
                  boxShadow: "0 4px 20px rgba(0,162,255,0.28)",
                  transition: "all 0.18s",
                }}
              >
                Talk to an Expert <ArrowRight size={16} />
              </Link>
              <Link
                href="/products/eza-cloud"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "white",
                  color: "#0F1923",
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontWeight: 600,
                  fontSize: 15,
                  padding: "12px 26px",
                  borderRadius: 999,
                  textDecoration: "none",
                  border: "1.5px solid #E5E8ED",
                  transition: "all 0.18s",
                }}
              >
                Explore Eza Cloud
              </Link>
            </div>

            <div style={{ display: "flex", gap: 28 }}>
              {[
                { stat: "DPA", label: "Aligned by Default", color: "#00A2FF" },
                { stat: "M-Pesa", label: "Native Integration", color: "#00A389" },
                { stat: "NBI", label: "Nairobi Data Centres", color: "#7C3AED" },
              ].map(({ stat, label, color }) => (
                <div key={stat}>
                  <div
                    style={{
                      fontFamily: "'Instrument Serif',serif",
                      fontSize: 22,
                      color,
                      lineHeight: 1,
                    }}
                  >
                    {stat}
                  </div>
                  <div style={{ fontSize: 12, color: "#8B96A3", marginTop: 3, fontWeight: 500 }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Illustration */}
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}

function HeroIllustration() {
  const nodes = [
    { angle: 0, label: "Eza Cloud", icon: "☁", color: "#00A389", r: 155 },
    { angle: 72, label: "M-Pesa", icon: "💳", color: "#059669", r: 155 },
    { angle: 144, label: "DPA", icon: "🔐", color: "#00A2FF", r: 155 },
    { angle: 216, label: "ZuriMail", icon: "✉", color: "#7C3AED", r: 155 },
    { angle: 288, label: "Kubernetes", icon: "⚙", color: "#D97706", r: 155 },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ position: "relative", width: 460, height: 460 }}>
        {/* Rings */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "1px dashed rgba(0,162,255,0.15)",
            animation: "spin-slow 35s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 44,
            borderRadius: "50%",
            border: "1px dashed rgba(0,201,167,0.12)",
            animation: "spin-slow 25s linear infinite reverse",
          }}
        />

        {/* Center card */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 160,
            height: 160,
            background: "white",
            border: "1.5px solid #E5E8ED",
            borderRadius: 24,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 12px 40px rgba(15,25,35,0.1)",
            animation: "float 6s ease-in-out infinite",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: "linear-gradient(135deg, #00A2FF, #00C9A7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontWeight: 800,
              fontSize: 20,
              color: "white",
              marginBottom: 10,
            }}
          >
            EC
          </div>
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontWeight: 800,
              fontSize: 14,
              color: "#0F1923",
            }}
          >
            EdgeCloud
          </div>
          <div style={{ fontSize: 10, color: "#8B96A3", fontWeight: 500 }}>Full Stack</div>
        </div>

        {/* SVG connector lines */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          {nodes.map(({ angle, color }) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <line
                key={angle}
                x1={230}
                y1={230}
                x2={230 + 155 * Math.cos(rad)}
                y2={230 + 155 * Math.sin(rad)}
                stroke={color}
                strokeWidth={1}
                strokeDasharray="3 4"
                opacity={0.3}
              />
            );
          })}
        </svg>

        {/* Orbit nodes */}
        {nodes.map(({ angle, label, icon, color, r }) => {
          const rad = (angle * Math.PI) / 180;
          const x = 230 + r * Math.cos(rad) - 34;
          const y = 230 + r * Math.sin(rad) - 34;
          return (
            <div
              key={label}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: 68,
                height: 68,
                background: "white",
                border: "1.5px solid #E5E8ED",
                borderRadius: 16,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 16px rgba(15,25,35,0.08)",
                gap: 3,
              }}
            >
              <span style={{ fontSize: 20 }}>{icon}</span>
              <span
                style={{
                  fontSize: 8.5,
                  color,
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  textAlign: "center",
                  lineHeight: 1.2,
                }}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
