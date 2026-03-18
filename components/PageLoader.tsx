"use client";
import { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

/* ── Global loader state accessible outside React ── */
let showLoaderFn: (() => void) | null = null;

export function triggerLoader() {
  showLoaderFn?.();
}

export default function PageLoader() {
  const [phase, setPhase] = useState<"hidden" | "enter" | "visible" | "exit">("hidden");
  const pathname = usePathname();

  const show = useCallback(() => {
    setPhase("enter");
    setTimeout(() => setPhase("visible"), 50);
  }, []);

  const hide = useCallback(() => {
    setPhase("exit");
    setTimeout(() => setPhase("hidden"), 400);
  }, []);

  // Register global trigger
  useEffect(() => {
    showLoaderFn = show;
    return () => {
      showLoaderFn = null;
    };
  }, [show]);

  // Hide when pathname changes (new page has rendered)
  useEffect(() => {
    // Small delay so loader is visible for at least 600ms
    const t = setTimeout(hide, 600);
    return () => clearTimeout(t);
  }, [pathname, hide]);

  if (phase === "hidden") return null;

  const opacity = phase === "enter" ? 0 : phase === "visible" ? 1 : 0; // exit

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#060B14",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        opacity,
        transition: phase === "exit" ? "opacity 0.4s ease" : "opacity 0.2s ease",
        pointerEvents: phase === "exit" ? "none" : "all",
      }}
    >
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        {/* Ping rings */}
        {[0, 0.8, 1.6].map((begin, i) => (
          <circle
            key={i}
            cx="60"
            cy="60"
            r="20"
            stroke={i === 2 ? "#00C9A7" : "#00A2FF"}
            strokeWidth="1"
            fill="none"
          >
            <animate
              attributeName="r"
              values="20;50;20"
              dur="2.4s"
              repeatCount="indefinite"
              begin={`${begin}s`}
            />
            <animate
              attributeName="opacity"
              values={i === 0 ? "0.5;0;0.5" : i === 1 ? "0.3;0;0.3" : "0.2;0;0.2"}
              dur="2.4s"
              repeatCount="indefinite"
              begin={`${begin}s`}
            />
          </circle>
        ))}

        {/* Satellite nodes */}
        {[
          { cx: 24, cy: 24, color: "#00A2FF", begin: "0s" },
          { cx: 96, cy: 24, color: "#00C9A7", begin: "0.6s" },
          { cx: 24, cy: 96, color: "#00C9A7", begin: "1.2s" },
          { cx: 96, cy: 96, color: "#00A2FF", begin: "1.8s" },
        ].map(({ cx, cy, color, begin }, i) => (
          <g key={i}>
            <line
              x1={cx}
              y1={cy}
              x2="60"
              y2="60"
              stroke={color}
              strokeWidth="0.75"
              strokeOpacity="0.25"
              strokeDasharray="3 3"
            />
            <circle
              cx={cx}
              cy={cy}
              r="3"
              fill="none"
              stroke={color}
              strokeWidth="1"
              opacity="0.5"
            />
            <circle cx={cx} cy={cy} r="1.5" fill={color} opacity="0.7">
              <animate
                attributeName="opacity"
                values="0.7;1;0.7"
                dur="1.6s"
                repeatCount="indefinite"
                begin={begin}
              />
            </circle>
          </g>
        ))}

        {/* Travel particles */}
        {[
          { path: "M24,24 L60,60", color: "#00A2FF", dur: "1.2s", begin: "0s" },
          { path: "M96,24 L60,60", color: "#00C9A7", dur: "1.4s", begin: "0.4s" },
          { path: "M24,96 L60,60", color: "#00C9A7", dur: "1.1s", begin: "0.8s" },
          { path: "M96,96 L60,60", color: "#00A2FF", dur: "1.3s", begin: "1.2s" },
        ].map(({ path, color, dur, begin }, i) => (
          <circle key={i} r="2" fill={color}>
            <animateMotion dur={dur} repeatCount="indefinite" path={path} begin={begin} />
            <animate
              attributeName="opacity"
              values="0;0.9;0"
              dur={dur}
              repeatCount="indefinite"
              begin={begin}
            />
          </circle>
        ))}

        {/* Central hub */}
        <rect
          x="44"
          y="44"
          width="32"
          height="32"
          fill="#0A0F1E"
          stroke="#00A2FF"
          strokeWidth="1.5"
        />
        <rect
          x="48"
          y="48"
          width="24"
          height="24"
          fill="#060B14"
          stroke="#1E2D45"
          strokeWidth="1"
        />
        {/* Corner accents */}
        <rect x="44" y="44" width="6" height="1.5" fill="#00A2FF" />
        <rect x="44" y="44" width="1.5" height="6" fill="#00A2FF" />
        <rect x="70" y="44" width="6" height="1.5" fill="#00A2FF" />
        <rect x="74.5" y="44" width="1.5" height="6" fill="#00A2FF" />
        <rect x="44" y="74.5" width="6" height="1.5" fill="#00A2FF" />
        <rect x="44" y="70" width="1.5" height="6" fill="#00A2FF" />
        <rect x="70" y="74.5" width="6" height="1.5" fill="#00A2FF" />
        <rect x="74.5" y="70" width="1.5" height="6" fill="#00A2FF" />
        <text
          x="60"
          y="63"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#00A2FF"
          fontSize="10"
          fontFamily="monospace"
          fontWeight="bold"
          letterSpacing="1"
        >
          EC
        </text>

        {/* Status dot */}
        <circle cx="76" cy="44" r="3" fill="#00C9A7">
          <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </svg>

      <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ display: "block", width: 20, height: 1.5, background: "#00A2FF" }} />
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          EdgeCloud
        </span>
        <span style={{ display: "block", width: 20, height: 1.5, background: "#00A2FF" }} />
      </div>

      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "#0F1828",
        }}
      >
        <div
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #00A2FF 0%, #00C9A7 100%)",
            animation: "ec-progress 1.2s ease forwards",
          }}
        />
      </div>

      <style>{`@keyframes ec-progress { from { width: 0% } to { width: 100% } }`}</style>
    </div>
  );
}
