// components/dashboard/PollCard.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MoreHorizontal,
  Vote,
  Clock,
  Eye,
  Edit3,
  Trash2,
  Share2,
  Copy,
  BarChart2,
  Users,
  Lock,
  Globe,
  CheckCircle,
  Circle,
  TrendingUp,
} from "lucide-react";

/**
 * PollCard
 * ────────
 * Props:
 *   poll       — poll object (see shape below)
 *   view       — "grid" | "list"
 *   onDelete   — fn(id)
 *   onDuplicate — fn(id)
 *   onShare    — fn(poll)
 *
 * Poll shape:
 * {
 *   id, title, description, status: "active"|"closed"|"draft",
 *   votes, options: [{text, votes}], createdAt, expiresAt,
 *   visibility: "public"|"private", responseCount, allowMultiple
 * }
 */

const STATUS_CONFIG = {
  active:  { label: "Active",  dot: "#22c55e", bg: "rgba(34,197,94,0.1)",  border: "rgba(34,197,94,0.2)",  text: "#22c55e"  },
  closed:  { label: "Closed",  dot: "#57534e", bg: "rgba(87,83,78,0.15)",  border: "rgba(87,83,78,0.25)",  text: "#78716c"  },
  draft:   { label: "Draft",   dot: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)", text: "#f59e0b"  },
};

function useClickOutside(ref, cb) {
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) cb(); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [ref, cb]);
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.draft;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: cfg.bg, border: `1px solid ${cfg.border}`,
      color: cfg.text, fontSize: 11, fontWeight: 700,
      fontFamily: "'Syne', sans-serif", letterSpacing: "0.06em",
      textTransform: "uppercase", padding: "3px 9px", borderRadius: 100,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: cfg.dot, flexShrink: 0 }} />
      {cfg.label}
    </span>
  );
}

function TopOptionBar({ options = [], totalVotes }) {
  if (!options.length) return null;
  const sorted = [...options].sort((a, b) => b.votes - a.votes).slice(0, 3);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {sorted.map((opt, i) => {
        const pct = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
        return (
          <div key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 11, color: "#78716c", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "75%" }}>
                {opt.text}
              </span>
              <span style={{ fontSize: 11, color: i === 0 ? "#f97316" : "#57534e", fontWeight: 600, fontFamily: "'Syne', sans-serif" }}>
                {pct}%
              </span>
            </div>
            <div style={{ height: 4, background: "rgba(255,255,255,0.05)", borderRadius: 10, overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${pct}%`,
                background: i === 0 ? "linear-gradient(90deg,#ea580c,#f97316)" : "rgba(255,255,255,0.1)",
                borderRadius: 10, transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
              }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ActionMenu({ poll, onDelete, onDuplicate, onShare }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  useClickOutside(ref, () => setOpen(false));

  const actions = [
    { icon: Eye,    label: "View Results", fn: () => navigate(`/dashboard/polls/${poll.id}`) },
    { icon: Edit3,  label: "Edit Poll",    fn: () => navigate(`/dashboard/polls/${poll.id}/edit`) },
    { icon: Share2, label: "Share",        fn: () => onShare?.(poll) },
    { icon: Copy,   label: "Duplicate",    fn: () => onDuplicate?.(poll.id) },
    { divider: true },
    { icon: Trash2, label: "Delete",       fn: () => onDelete?.(poll.id), danger: true },
  ];

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(p => !p); }}
        style={{
          width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
          background: open ? "rgba(255,255,255,0.08)" : "transparent",
          border: "1px solid", borderColor: open ? "rgba(255,255,255,0.12)" : "transparent",
          borderRadius: 7, color: "#57534e", cursor: "pointer", transition: "all 0.15s",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#a8a29e"; }}
        onMouseLeave={e => { if (!open) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#57534e"; } }}
      >
        <MoreHorizontal size={14} />
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", right: 0,
          background: "#131313", border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: 11, boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
          minWidth: 160, zIndex: 50, overflow: "hidden",
          animation: "menuIn 0.15s ease both",
        }}>
          <style>{`@keyframes menuIn { from{opacity:0;transform:translateY(-6px) scale(0.97)} to{opacity:1;transform:none} }`}</style>
          <div style={{ padding: 5 }}>
            {actions.map((a, i) => a.divider
              ? <div key={i} style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "3px 6px" }} />
              : (
                <button key={i} onClick={(e) => { e.stopPropagation(); a.fn(); setOpen(false); }}
                  style={{
                    display: "flex", alignItems: "center", gap: 9, width: "100%",
                    padding: "8px 10px", borderRadius: 7, border: "none",
                    background: "transparent", cursor: "pointer", textAlign: "left",
                    color: a.danger ? "#ef4444" : "#78716c",
                    fontSize: 13, fontFamily: "'DM Sans', sans-serif", transition: "all 0.13s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = a.danger ? "rgba(239,68,68,0.08)" : "rgba(255,255,255,0.05)"; e.currentTarget.style.color = a.danger ? "#ef4444" : "#e8e4dc"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = a.danger ? "#ef4444" : "#78716c"; }}
                >
                  <a.icon size={13} />
                  {a.label}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── GRID CARD ── */
function GridCard({ poll, onDelete, onDuplicate, onShare }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const totalVotes = poll.options?.reduce((s, o) => s + o.votes, 0) ?? poll.votes ?? 0;
  const timeLeft = poll.expiresAt
    ? (() => {
        const diff = new Date(poll.expiresAt) - new Date();
        if (diff < 0) return "Ended";
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        return d > 0 ? `${d}d ${h}h left` : `${h}h left`;
      })()
    : null;

  return (
    <div
      onClick={() => navigate(`/dashboard/polls/${poll._id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#0f0f0f",
        border: `1px solid ${hovered ? "rgba(234,88,12,0.25)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 16,
        padding: "20px",
        cursor: "pointer",
        transition: "border-color 0.25s, transform 0.25s, box-shadow 0.25s",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(234,88,12,0.08)" : "none",
        display: "flex", flexDirection: "column", gap: 14,
        position: "relative", overflow: "hidden",
      }}
    >
      {/* top glow on hover */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: "linear-gradient(90deg, transparent, rgba(234,88,12,0.5), transparent)",
        opacity: hovered ? 1 : 0, transition: "opacity 0.3s",
      }} />

      {/* Header row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <StatusBadge status={poll.status} />
          <h3 style={{
            fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700,
            color: "#f0ece4", marginTop: 8, lineHeight: 1.3,
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>
            {poll.title}
          </h3>
        </div>
        <div onClick={e => e.stopPropagation()}>
          <ActionMenu poll={poll} onDelete={onDelete} onDuplicate={onDuplicate} onShare={onShare} />
        </div>
      </div>

      {/* Description */}
      {poll.description && (
        <p style={{
          fontSize: 12, color: "#57534e", lineHeight: 1.5,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {poll.description}
        </p>
      )}

      {/* Options preview bars */}
      {poll.status !== "draft" && poll.options?.length > 0 && (
        <TopOptionBar options={poll.options} totalVotes={totalVotes} />
      )}

      {poll.status === "draft" && (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          height: 60, borderRadius: 10,
          border: "1px dashed rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)",
        }}>
          <span style={{ fontSize: 12, color: "#3c3836" }}>Not published yet</span>
        </div>
      )}

      {/* Footer stats */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 4, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#57534e" }}>
            <Vote size={12} style={{ color: "#f97316" }} />
            {totalVotes.toLocaleString()}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#57534e" }}>
            {poll.visibility === "private" ? <Lock size={11} /> : <Globe size={11} />}
            {poll.visibility === "private" ? "Private" : "Public"}
          </span>
        </div>
        {timeLeft && poll.status === "active" && (
          <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#57534e" }}>
            <Clock size={11} />{timeLeft}
          </span>
        )}
        {poll.status === "closed" && (
          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#57534e" }}>
            <CheckCircle size={11} /> Closed
          </span>
        )}
      </div>
    </div>
  );
}

/* ── LIST ROW ── */
function ListRow({ poll, onDelete, onDuplicate, onShare }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const totalVotes = poll.options?.reduce((s, o) => s + o.votes, 0) ?? poll.votes ?? 0;

  const topOption = poll.options?.length
    ? [...poll.options].sort((a, b) => b.votes - a.votes)[0]
    : null;
  const topPct = topOption && totalVotes > 0
    ? Math.round((topOption.votes / totalVotes) * 100)
    : 0;

  const timeLeft = poll.expiresAt
    ? (() => {
        const diff = new Date(poll.expiresAt) - new Date();
        if (diff < 0) return "Ended";
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        return d > 0 ? `${d}d left` : `${h}h left`;
      })()
    : "—";

  return (
    <div
      onClick={() => navigate(`/dashboard/polls/${poll.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 90px 90px 120px 100px 40px",
        alignItems: "center",
        gap: 16,
        padding: "14px 20px",
        background: hovered ? "rgba(255,255,255,0.02)" : "transparent",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        cursor: "pointer",
        transition: "background 0.15s",
        borderRadius: hovered ? 10 : 0,
      }}
    >
      {/* Title + description */}
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 600,
          color: "#e8e4dc", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>
          {poll.title}
        </div>
        {topOption && poll.status !== "draft" && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
            <TrendingUp size={10} style={{ color: "#f97316", flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: "#57534e", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {topOption.text} · {topPct}%
            </span>
          </div>
        )}
      </div>

      {/* Status */}
      <div><StatusBadge status={poll.status} /></div>

      {/* Votes */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#78716c" }}>
        <Vote size={12} style={{ color: "#f97316" }} />
        {totalVotes.toLocaleString()}
      </div>

      {/* Visibility + options count */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#57534e" }}>
          {poll.visibility === "private" ? <Lock size={11} /> : <Globe size={11} />}
          {poll.visibility === "private" ? "Private" : "Public"}
        </span>
        <span style={{ fontSize: 11, color: "#3c3836" }}>
          {poll.options?.length ?? 0} options
        </span>
      </div>

      {/* Time left */}
      <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#57534e" }}>
        <Clock size={11} />{timeLeft}
      </div>

      {/* Actions */}
      <div onClick={e => e.stopPropagation()}>
        <ActionMenu poll={poll} onDelete={onDelete} onDuplicate={onDuplicate} onShare={onShare} />
      </div>
    </div>
  );
}

/* ── EXPORTED COMPONENT ── */
const PollCard = ({ poll, view = "grid", onDelete, onDuplicate, onShare }) => {
  if (view === "list") {
    return <ListRow poll={poll} onDelete={onDelete} onDuplicate={onDuplicate} onShare={onShare} />;
  }
  return <GridCard poll={poll} onDelete={onDelete} onDuplicate={onDuplicate} onShare={onShare} />;
};

export default PollCard;