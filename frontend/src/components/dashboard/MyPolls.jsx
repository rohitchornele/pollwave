// pages/dashboard/MyPolls.jsx
import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PollCard from "../../components/dashboard/PollCard";
import {
    Plus, LayoutGrid, List, Search, SlidersHorizontal,
    ChevronDown, Vote, BarChart2, Trash2, X, AlertTriangle,
} from "lucide-react";
import pollService from "../../services/pollService.js";


const FILTERS = ["All", "Active", "Closed", "Draft"];
const SORT_OPTIONS = [
    { value: "newest", label: "Newest first" },
    { value: "oldest", label: "Oldest first" },
    { value: "most_votes", label: "Most votes" },
    { value: "closing", label: "Closing soon" },
];

/* ── Delete confirmation modal ── */
function DeleteModal({ poll, onConfirm, onCancel }) {
    return (
        <div style={{
            position: "fixed", inset: 0, zIndex: 200,
            background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
        }}>
            <div style={{
                background: "#131313", border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: 18, padding: 32, maxWidth: 400, width: "100%",
                boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
                animation: "modalIn 0.2s ease both",
            }}>
                <style>{`@keyframes modalIn{from{opacity:0;transform:scale(0.95) translateY(8px)}to{opacity:1;transform:none}}`}</style>
                <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20,
                }}>
                    <AlertTriangle size={20} style={{ color: "#ef4444" }} />
                </div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, color: "#f0ece4", marginBottom: 8 }}>
                    Delete Poll?
                </h3>
                <p style={{ fontSize: 14, color: "#57534e", lineHeight: 1.6, marginBottom: 24 }}>
                    <span style={{ color: "#a8a29e", fontWeight: 500 }}>"{poll?.title}"</span> and all its responses will be permanently deleted. This cannot be undone.
                </p>
                <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={onCancel} style={{
                        flex: 1, padding: "11px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)",
                        background: "transparent", color: "#a8a29e", cursor: "pointer",
                        fontFamily: "'DM Sans', sans-serif", fontSize: 14, transition: "all 0.2s",
                    }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"}
                        onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                    >
                        Cancel
                    </button>
                    <button onClick={onConfirm} style={{
                        flex: 1, padding: "11px", borderRadius: 10, border: "none",
                        background: "#ef4444", color: "#fff", cursor: "pointer",
                        fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, transition: "all 0.2s",
                    }}
                        onMouseEnter={e => e.currentTarget.style.background = "#dc2626"}
                        onMouseLeave={e => e.currentTarget.style.background = "#ef4444"}
                    >
                        Delete Poll
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ── Empty state ── */
function EmptyState({ filter, onCreateClick }) {
    const msgs = {
        All: { title: "No polls yet", sub: "Create your first poll and start collecting votes." },
        Active: { title: "No active polls", sub: "Publish a draft or create a new poll to get started." },
        Closed: { title: "No closed polls", sub: "Polls will appear here once they end." },
        Draft: { title: "No drafts", sub: "Saved but unpublished polls will appear here." },
    };
    const { title, sub } = msgs[filter] || msgs.All;
    return (
        <div style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", padding: "80px 20px", textAlign: "center",
        }}>
            <div style={{
                width: 64, height: 64, borderRadius: 18,
                background: "rgba(234,88,12,0.07)", border: "1px solid rgba(234,88,12,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20,
            }}>
                <Vote size={26} style={{ color: "#f97316" }} />
            </div>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, color: "#f0ece4", marginBottom: 8 }}>
                {title}
            </h3>
            <p style={{ fontSize: 14, color: "#57534e", marginBottom: 24, maxWidth: 300 }}>{sub}</p>
            <button onClick={onCreateClick} style={{
                display: "flex", alignItems: "center", gap: 7,
                background: "#ea580c", color: "#fff", border: "none", borderRadius: 10,
                padding: "11px 22px", fontFamily: "'Syne', sans-serif", fontWeight: 700,
                fontSize: 13, cursor: "pointer", transition: "all 0.2s",
            }}
                onMouseEnter={e => e.currentTarget.style.background = "#c2410c"}
                onMouseLeave={e => e.currentTarget.style.background = "#ea580c"}
            >
                <Plus size={15} /> Create Poll
            </button>
        </div>
    );
}

/* ── MAIN PAGE ── */
const MyPolls = () => {
    const navigate = useNavigate();
    const [view, setView] = useState("grid");   // "grid" | "list"
    const [activeFilter, setFilter] = useState("All");
    const [sortBy, setSortBy] = useState("newest");
    const [search, setSearch] = useState("");
    const [sortOpen, setSortOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);   // poll obj

    const [polls, setPolls] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const fetchPolls = async () => {
        try {
            setLoading(true);
            const response =
            await pollService.getAllPolls();
            console.log(response);
            setPolls(response);
            console.log(polls)
        } catch (err) {
            console.error(err);
            setError("Failed to load polls");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPolls();
    }, []);

    console.log(polls)

    /* ── Derived stats ── */
    const stats = useMemo(() => ({
        total: polls?.length,
        active: polls?.filter(p => p.status === "active").length,
        closed: polls?.filter(p => p.status === "closed").length,
        draft: polls?.filter(p => p.status === "draft").length,
        votes: polls?.reduce((s, p) => s + (p.options?.reduce((a, o) => a + o.votes, 0) ?? 0), 0),
    }), [polls]);

    /* ── Filtered + sorted list ── */
    const visible = useMemo(() => {
        let list = [...polls];
        console.log("list = ", list)
        if (activeFilter !== "All") list = list.filter(p => p.status === activeFilter.toLowerCase());
        if (search.trim()) list = list.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
        list.sort((a, b) => {
            if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
            if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
            if (sortBy === "most_votes") {
                const va = a.options?.reduce((s, o) => s + o.votes, 0) ?? 0;
                const vb = b.options?.reduce((s, o) => s + o.votes, 0) ?? 0;
                return vb - va;
            }
            if (sortBy === "closing") {
                const ta = a.expiresAt ? new Date(a.expiresAt) : Infinity;
                const tb = b.expiresAt ? new Date(b.expiresAt) : Infinity;
                return ta - tb;
            }
            return 0;
        });
        return list;
    }, [polls, activeFilter, search, sortBy]);

    /* ── Handlers ── */
    const handleDelete = async (id) => {
        try {
            await pollService.deletePoll(id);
            setPolls((prev) =>
                prev.filter((p) => p._id !== id)
            );
            setDeleteTarget(null);
        } catch (error) {
            console.error(error);
        }
    };
    const handleDuplicate = async (id) => {
        try {
            const src = polls.find(
                (p) => p._id === id
            );

            if (!src) return;
            const duplicatedPoll = {
                ...src,
                title: `${src.title} (copy)`,
                status: "draft",
            };

            delete duplicatedPoll._id;

            const created =
                await pollService.createPoll(
                    duplicatedPoll
                );

            setPolls((prev) => [
                created,
                ...prev,
            ]);

        } catch (error) {
            console.error(error);
        }
    };
    const handleShare = async (poll) => {

        const pollUrl =
            `${window.location.origin}/poll/${poll._id}`;
        try {
            if (navigator.share) {

                await navigator.share({
                    title: poll.title,
                    text: "Vote on this poll",
                    url: pollUrl,
                });

            } else {

                await navigator.clipboard.writeText(
                    pollUrl
                );
                alert("Poll link copied!");
            }

        } catch (error) {
            console.error(error);
        }
    };

    const sortLabel = SORT_OPTIONS.find(s => s.value === sortBy)?.label ?? "Sort";

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500&display=swap');

        .polls-page { max-width: 1200px; }

        /* stat mini cards */
        .stat-mini {
          background: #0f0f0f;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 14px 18px;
          display: flex; flex-direction: column; gap: 2px;
          transition: border-color 0.2s;
        }
        .stat-mini:hover { border-color: rgba(255,255,255,0.12); }
        .stat-mini-value {
          font-family: 'Syne', sans-serif;
          font-size: 22px; font-weight: 800; color: #f0ece4;
        }
        .stat-mini-label { font-size: 12px; color: #3c3836; }

        /* filter tabs */
        .filter-tab {
          padding: 6px 14px; border-radius: 8px; border: 1px solid transparent;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
          cursor: pointer; transition: all 0.2s; background: transparent;
          color: #57534e;
        }
        .filter-tab:hover { color: #a8a29e; }
        .filter-tab.active {
          background: rgba(234,88,12,0.1); border-color: rgba(234,88,12,0.25);
          color: #f97316; font-weight: 600;
        }

        /* view toggle buttons */
        .view-btn {
          width: 34px; height: 34px; display: flex; align-items: center;
          justify-content: center; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);
          background: transparent; color: #57534e; cursor: pointer; transition: all 0.2s;
        }
        .view-btn.active {
          background: rgba(234,88,12,0.1); border-color: rgba(234,88,12,0.25); color: #f97316;
        }
        .view-btn:hover:not(.active) { background: rgba(255,255,255,0.04); color: #a8a29e; }

        /* search input */
        .search-wrap { position: relative; }
        .search-wrap input {
          width: 220px; background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08); border-radius: 9px;
          padding: 8px 12px 8px 34px; color: #e8e4dc;
          font-family: 'DM Sans', sans-serif; font-size: 13px;
          outline: none; transition: all 0.2s;
        }
        .search-wrap input:focus {
          border-color: rgba(234,88,12,0.35);
          box-shadow: 0 0 0 3px rgba(234,88,12,0.08);
        }
        .search-wrap input::placeholder { color: #3c3836; }
        .search-icon-pos {
          position: absolute; left: 10px; top: 50%;
          transform: translateY(-50%); color: #3c3836; pointer-events: none;
        }

        /* sort dropdown */
        .sort-btn {
          display: flex; align-items: center; gap: 7px;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 9px; padding: 8px 12px; color: #57534e;
          font-family: 'DM Sans', sans-serif; font-size: 13px;
          cursor: pointer; transition: all 0.2s; white-space: nowrap;
        }
        .sort-btn:hover { border-color: rgba(255,255,255,0.14); color: #a8a29e; }

        /* grid */
        .polls-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
        }

        /* list container */
        .polls-list {
          background: #0f0f0f;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          overflow: hidden;
        }

        /* stagger animation */
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .card-enter { animation: cardIn 0.35s ease both; }

        @media (max-width: 640px) {
          .search-wrap input { width: 160px; }
          .polls-grid { grid-template-columns: 1fr; }
          .stat-mini { padding: 12px 14px; }
        }
      `}</style>

            <div className="polls-page">

                {/* ── Page heading ── */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
                    <div>
                        <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#f97316", marginBottom: 6 }}>
                            My Polls
                        </p>
                        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "#f0ece4", letterSpacing: "-0.02em" }}>
                            Manage your polls
                        </h1>
                    </div>
                    <button
                        onClick={() => navigate("/dashboard/polls/create")}
                        style={{
                            display: "flex", alignItems: "center", gap: 8,
                            background: "#ea580c", color: "#fff", border: "none",
                            borderRadius: 11, padding: "11px 20px",
                            fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14,
                            cursor: "pointer", transition: "all 0.25s",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = "#c2410c"; e.currentTarget.style.transform = "scale(1.03)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "#ea580c"; e.currentTarget.style.transform = "scale(1)"; }}
                    >
                        <Plus size={16} /> Create Poll
                    </button>
                </div>

                {/* ── Mini stats row ── */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
                    {[
                        { label: "Total Polls", value: stats.total, icon: <BarChart2 size={14} style={{ color: "#f97316" }} /> },
                        { label: "Active", value: stats.active, icon: <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} /> },
                        { label: "Total Votes", value: Number(stats?.votes?.toLocaleString()) || 0, icon: <Vote size={14} style={{ color: "#f97316" }} /> },
                        { label: "Drafts", value: stats.draft, icon: <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} /> },
                    ].map(({ label, value, icon }) => (
                        <div key={label} className="stat-mini">
                            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>{icon}</div>
                            <div className="stat-mini-value">{value}</div>
                            <div className="stat-mini-label">{label}</div>
                        </div>
                    ))}
                </div>

                {/* ── Toolbar ── */}
                <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    flexWrap: "wrap", gap: 12, marginBottom: 20,
                    paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}>
                    {/* Left: filter tabs */}
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                        {FILTERS.map(f => (
                            <button
                                key={f}
                                className={`filter-tab ${activeFilter === f ? "active" : ""}`}
                                onClick={() => setFilter(f)}
                            >
                                {f}
                                {f !== "All" && (
                                    <span style={{ marginLeft: 5, fontSize: 11, opacity: 0.7 }}>
                                        {f === "Active" ? stats.active : f === "Closed" ? stats.closed : stats.draft}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Right: search + sort + view */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {/* Search */}
                        <div className="search-wrap">
                            <Search size={13} className="search-icon-pos" />
                            <input
                                placeholder="Search polls…"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>

                        {/* Sort */}
                        <div style={{ position: "relative" }}>
                            <button className="sort-btn" onClick={() => setSortOpen(p => !p)}>
                                <SlidersHorizontal size={13} />
                                {sortLabel}
                                <ChevronDown size={12} style={{ transition: "transform 0.2s", transform: sortOpen ? "rotate(180deg)" : "none" }} />
                            </button>
                            {sortOpen && (
                                <div style={{
                                    position: "absolute", top: "calc(100% + 6px)", right: 0,
                                    background: "#131313", border: "1px solid rgba(255,255,255,0.09)",
                                    borderRadius: 11, minWidth: 170, zIndex: 50, overflow: "hidden",
                                    boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
                                    animation: "menuIn 0.15s ease both",
                                }}>
                                    <style>{`@keyframes menuIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}`}</style>
                                    <div style={{ padding: 5 }}>
                                        {SORT_OPTIONS.map(opt => (
                                            <button key={opt.value}
                                                onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                                                style={{
                                                    display: "block", width: "100%", textAlign: "left",
                                                    padding: "8px 12px", borderRadius: 7, border: "none",
                                                    background: sortBy === opt.value ? "rgba(234,88,12,0.1)" : "transparent",
                                                    color: sortBy === opt.value ? "#f97316" : "#78716c",
                                                    fontFamily: "'DM Sans', sans-serif", fontSize: 13, cursor: "pointer",
                                                    transition: "all 0.13s",
                                                }}
                                                onMouseEnter={e => { if (sortBy !== opt.value) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#e8e4dc"; } }}
                                                onMouseLeave={e => { if (sortBy !== opt.value) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#78716c"; } }}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* View toggle */}
                        <div style={{ display: "flex", gap: 4 }}>
                            <button className={`view-btn ${view === "grid" ? "active" : ""}`} onClick={() => setView("grid")} title="Grid view">
                                <LayoutGrid size={14} />
                            </button>
                            <button className={`view-btn ${view === "list" ? "active" : ""}`} onClick={() => setView("list")} title="List view">
                                <List size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Results count ── */}
                {search && (
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                        <span style={{ fontSize: 13, color: "#57534e" }}>
                            {visible.length} result{visible.length !== 1 ? "s" : ""} for "{search}"
                        </span>
                        <button onClick={() => setSearch("")} style={{
                            display: "flex", alignItems: "center", gap: 4, background: "rgba(255,255,255,0.05)",
                            border: "none", borderRadius: 6, padding: "2px 8px", color: "#78716c",
                            fontSize: 12, cursor: "pointer",
                        }}>
                            <X size={11} /> Clear
                        </button>
                    </div>
                )}

                {/* ── Empty state ── */}
                {visible.length === 0 && (
                    <EmptyState filter={activeFilter} onCreateClick={() => navigate("/dashboard/polls/create")} />
                )}

                {/* ── GRID VIEW ── */}
                {visible.length > 0 && view === "grid" && (
                    <div className="polls-grid">
                        {visible.map((poll, i) => (
                            <div key={poll._id} className="card-enter" style={{ animationDelay: `${i * 0.05}s` }}>
                                <PollCard
                                    poll={poll}
                                    view="grid"
                                    onDelete={(id) => setDeleteTarget(polls.find(p => p._id === id))}
                                    onDuplicate={handleDuplicate}
                                    onShare={handleShare}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* ── LIST VIEW ── */}
                {visible.length > 0 && view === "list" && (
                    <div className="polls-list">
                        <ListHeader />
                        {visible.map((poll, i) => (
                            <div key={poll._id} className="card-enter" style={{ animationDelay: `${i * 0.04}s` }}>
                                <PollCard
                                    poll={poll}
                                    view="list"
                                    onDelete={(id) => setDeleteTarget(polls.find(p => p._id === id))}
                                    onDuplicate={handleDuplicate}
                                    onShare={handleShare}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ── Delete confirmation modal ── */}
            {deleteTarget && (
                <DeleteModal
                    poll={deleteTarget}
                    onConfirm={() => handleDelete(deleteTarget._id)}
                    onCancel={() => setDeleteTarget(null)}
                />
            )}
        </>
    )
}

/* ── List header (used inside MyPolls, exported for reuse) ── */
export function ListHeader() {
    const cols = ["Poll", "Status", "Votes", "Visibility", "Deadline", ""];
    const widths = ["1fr", "90px", "90px", "120px", "100px", "40px"];
    return (
        <div style={{
            display: "grid", gridTemplateColumns: widths.join(" "),
            gap: 16, padding: "10px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}>
            {cols.map((c, i) => (
                <span key={i} style={{
                    fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase", color: "#3c3836",
                }}>{c}</span>
            ))}
        </div>
    );
}

export default MyPolls;