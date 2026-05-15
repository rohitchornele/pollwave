import React, { useState } from "react";
import {
  ChevronRight,
  Clock,
  Vote,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { timeLeft, STATUS } from "../utils/dashboardHelpers";

const PollRow = ({ poll, index }) => {
  const navigate = useNavigate();

  const [hovered, setHovered] = useState(false);

  const cfg = STATUS[poll.status] || STATUS.draft;

  const tl = timeLeft(poll.expiresAt);

  return (
    <div
      onClick={() =>
        navigate(`/dashboard/polls/${poll.id}`)
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns:
          "1fr 80px 80px 90px 28px",
        alignItems: "center",
        gap: 16,
        padding: "13px 20px",
        borderBottom:
          "1px solid rgba(255,255,255,0.04)",
        cursor: "pointer",
        background: hovered
          ? "rgba(255,255,255,0.025)"
          : "transparent",
        transition: "background 0.15s",
        animation: `fadeUp 0.4s ease ${index * 60}ms both`,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "'Giest', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: "#e8e4dc",
          }}
        >
          {poll.title}
        </div>
      </div>

      <div>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            background: cfg.bg,
            border: `1px solid ${cfg.border}`,
            color: cfg.text,
            fontSize: 10,
            fontWeight: 700,
            padding: "3px 8px",
            borderRadius: 100,
          }}
        >
          <span
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: cfg.dot,
            }}
          />
          {cfg.label}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          fontSize: 13,
          color: "#78716c",
        }}
      >
        <Vote
          size={12}
          style={{
            color: "#f97316",
          }}
        />

        {poll.votes.toLocaleString()}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          fontSize: 12,
          color: "#57534e",
        }}
      >
        {tl ? (
          <>
            <Clock size={11} />
            <span>{tl}</span>
          </>
        ) : (
          "—"
        )}
      </div>

      <ChevronRight
        size={14}
        style={{
          color: hovered
            ? "#f97316"
            : "#2c2927",
        }}
      />
    </div>
  );
};

export default PollRow;