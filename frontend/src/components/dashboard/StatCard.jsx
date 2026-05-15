import React, { useEffect, useState } from "react";
import {
  BarChart2,
  Vote,
  Activity,
  TrendingUp,
} from "lucide-react";

const ICONS = {
  polls: BarChart2,
  votes: Vote,
  active: Activity,
  rate: TrendingUp,
};

const COLORS = {
  polls: "#f97316",
  votes: "#22c55e",
  active: "#f59e0b",
  rate: "#a78bfa",
};

const StatCard = ({ stat, delay }) => {
  const Icon = ICONS[stat.id];

  const color = COLORS[stat.id];

  const [counted, setCounted] = useState(0);

  const numericVal =
    parseInt(String(stat.value).replace(/[^0-9]/g, "")) || 0;

  useEffect(() => {
    let start = 0;

    const duration = 1000;
    const step = 16;

    const increment = numericVal / (duration / step);

    const timer = setInterval(() => {
      start += increment;

      if (start >= numericVal) {
        setCounted(numericVal);
        clearInterval(timer);
      } else {
        setCounted(Math.floor(start));
      }
    }, step);

    return () => clearInterval(timer);
  }, [numericVal]);

  const displayVal =
    typeof stat.value === "string" &&
    stat.value.includes("%")
      ? counted + "%"
      : counted.toLocaleString();

  return (
    <div
      style={{
        background: "#0f0f0f",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 16,
        padding: "22px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        position: "relative",
        overflow: "hidden",
        animation: `fadeUp 0.5s ease ${delay}ms both`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -20,
          right: -20,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
        }}
      />

      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          background: `${color}15`,
          border: `1px solid ${color}25`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={17} style={{ color }} />
      </div>

      <div>
        <div
          style={{
            fontFamily: "'Giest', sans-serif",
            fontSize: 32,
            fontWeight: 800,
            color: "#f0ece4",
            letterSpacing: "-0.03em",
          }}
        >
          {displayVal}
        </div>

        <div
          style={{
            fontSize: 13,
            color: "#57534e",
            marginTop: 6,
          }}
        >
          {stat.label}
        </div>
      </div>
    </div>
  );
};

export default StatCard;