import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

const QuickAction = ({
  icon: Icon,
  label,
  desc,
  color,
  onClick,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        background: hovered
          ? "rgba(255,255,255,0.04)"
          : "rgba(255,255,255,0.02)",
        border: `1px solid ${
          hovered
            ? `${color}30`
            : "rgba(255,255,255,0.07)"
        }`,
        borderRadius: 13,
        padding: "14px 16px",
        cursor: "pointer",
        textAlign: "left",
        width: "100%",
        transition: "all 0.2s",
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 9,
          background: `${color}15`,
          border: `1px solid ${color}25`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon
          size={16}
          style={{
            color,
          }}
        />
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: "'Giest', sans-serif",
            fontSize: 13,
            fontWeight: 700,
            color: "#e8e4dc",
          }}
        >
          {label}
        </div>

        <div
          style={{
            fontSize: 11,
            color: "#3c3836",
          }}
        >
          {desc}
        </div>
      </div>

      <ArrowRight
        size={14}
        style={{
          color: hovered
            ? color
            : "#2c2927",
        }}
      />
    </button>
  );
};

export default QuickAction;