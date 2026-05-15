import React from "react";
import { Plus } from "lucide-react";

const DashboardGreeting = ({ firstName, onCreate }) => {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good morning"
      : hour < 17
        ? "Good afternoon"
        : "Good evening";

  return (
    <div className="greeting-bar">
      <div>
        <p
          style={{
            fontFamily: "'Giest', sans-serif",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#f97316",
            marginBottom: 6,
          }}
        >
          Overview
        </p>

        <h1
          style={{
            fontFamily: "'Giest', sans-serif",
            fontSize: 26,
            fontWeight: 800,
            color: "#f0ece4",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
          }}
        >
          {greeting} {firstName ? `, ${firstName}` : ""} 👋
        </h1>

        <p
          style={{
            fontSize: 14,
            color: "#57534e",
            marginTop: 4,
          }}
        >
          Here's what's happening with your polls today.
        </p>
      </div>

      <button
        onClick={onCreate}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "#ea580c",
          color: "#fff",
          border: "none",
          borderRadius: 11,
          padding: "11px 20px",
          fontFamily: "'Giest', sans-serif",
          fontWeight: 700,
          fontSize: 13,
          cursor: "pointer",
          flexShrink: 0,
          transition: "all 0.25s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#c2410c";
          e.currentTarget.style.transform = "scale(1.03)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#ea580c";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <Plus size={15} />
        New Poll
      </button>
    </div>
  );
};

export default DashboardGreeting;