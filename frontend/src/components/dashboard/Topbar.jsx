// components/dashboard/Topbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  Plus,
  Menu,
  X,
  CheckCheck,
  Vote,
  TrendingUp,
  AlertCircle,
  ChevronDown,
  User,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

/**
 * Topbar
 * ──────
 * Props:
 *   pageTitle        — string, displayed as breadcrumb
 *   onMobileMenuOpen — fn, triggers mobile sidebar drawer
 *   sidebarCollapsed — boolean (used for subtle layout shift awareness)
 */

/* ── Mock notifications ── */
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: "vote",
    icon: Vote,
    color: "#f97316",
    title: "New votes on your poll",
    body: '"Q3 Retrospective" received 47 new votes',
    time: "2m ago",
    read: false,
  },
  {
    id: 2,
    type: "trend",
    icon: TrendingUp,
    color: "#22c55e",
    title: "Poll trending",
    body: '"Best Feature for Q4?" is gaining traction',
    time: "18m ago",
    read: false,
  },
  {
    id: 3,
    type: "alert",
    icon: AlertCircle,
    color: "#f59e0b",
    title: "Poll closing soon",
    body: '"Team Event Vote" closes in 2 hours',
    time: "1h ago",
    read: false,
  },
  {
    id: 4,
    type: "vote",
    icon: Vote,
    color: "#f97316",
    title: "Poll reached 500 votes",
    body: '"Preferred Meeting Day" hit a milestone',
    time: "3h ago",
    read: true,
  },
  {
    id: 5,
    type: "trend",
    icon: TrendingUp,
    color: "#22c55e",
    title: "Weekly summary ready",
    body: "Your analytics report for this week is ready",
    time: "1d ago",
    read: true,
  },
];

/* ── useClickOutside hook ── */
const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) callback();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref, callback]);
};

const Topbar = ({ pageTitle = "Overview", onMobileMenuOpen, sidebarCollapsed }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const notifRef = useRef(null);
  const userRef  = useRef(null);
  const searchRef = useRef(null);

  useClickOutside(notifRef, () => setNotifOpen(false));
  useClickOutside(userRef,  () => setUserMenuOpen(false));
  useClickOutside(searchRef, () => { setSearchOpen(false); setSearchQuery(""); });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () =>
    setNotifications(ns => ns.map(n => ({ ...n, read: true })));

  const markRead = (id) =>
    setNotifications(ns => ns.map(n => n.id === id ? { ...n, read: true } : n));

  const initials = user?.name
    ? user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  const handleLogout = async () => {
    try { await logout(); navigate("/"); }
    finally { localStorage.clear(); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500&display=swap');

        /* ── Topbar shell ── */
        .topbar {
          height: 64px;
          background: rgba(10,10,10,0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 28px;
          gap: 16px;
          flex-shrink: 0;
          position: sticky;
          top: 0;
          z-index: 20;
        }

        /* ── Left: hamburger + breadcrumb ── */
        .topbar-left {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }
        .hamburger {
          display: none;
          width: 34px;
          height: 34px;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          color: #a8a29e;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .hamburger:hover { background: rgba(255,255,255,0.07); color: #f0ece4; }
        @media (max-width: 768px) { .hamburger { display: flex; } }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .breadcrumb-parent {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: #3c3836;
          text-decoration: none;
          transition: color 0.2s;
        }
        .breadcrumb-parent:hover { color: #78716c; }
        .breadcrumb-sep { color: #2c2927; font-size: 14px; }
        .breadcrumb-current {
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #f0ece4;
          letter-spacing: -0.01em;
        }

        /* ── Center: search ── */
        .topbar-search {
          flex: 1;
          max-width: 380px;
          position: relative;
        }
        .search-trigger {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          padding: 8px 14px;
          color: #3c3836;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
        }
        .search-trigger:hover {
          border-color: rgba(255,255,255,0.12);
          color: #57534e;
          background: rgba(255,255,255,0.05);
        }
        .search-kbd {
          margin-left: auto;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 4px;
          padding: 1px 6px;
          font-size: 10px;
          font-family: 'DM Sans', sans-serif;
          color: #3c3836;
        }
        /* Expanded search input */
        .search-expanded {
          position: absolute;
          top: 0; left: 0; right: 0;
          background: #151515;
          border: 1px solid rgba(234,88,12,0.3);
          border-radius: 10px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 0 3px rgba(234,88,12,0.08);
          overflow: hidden;
          z-index: 50;
        }
        .search-input-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .search-input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #f0ece4;
        }
        .search-input::placeholder { color: #3c3836; }
        .search-close {
          background: none;
          border: none;
          color: #57534e;
          cursor: pointer;
          display: flex;
          padding: 2px;
          border-radius: 4px;
          transition: color 0.2s;
        }
        .search-close:hover { color: #a8a29e; }
        .search-hints {
          padding: 10px 14px 12px;
        }
        .search-hint-label {
          font-size: 10px;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #2c2927;
          margin-bottom: 8px;
        }
        .search-hint-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 7px 8px;
          border-radius: 7px;
          cursor: pointer;
          font-size: 13px;
          color: #57534e;
          transition: all 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
        .search-hint-item:hover {
          background: rgba(255,255,255,0.04);
          color: #a8a29e;
        }

        /* ── Right actions ── */
        .topbar-right {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        /* Create poll quick button */
        .quick-create {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #ea580c;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 7px 14px;
          font-family: 'Syne', sans-serif;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
          white-space: nowrap;
        }
        .quick-create:hover { background: #c2410c; transform: scale(1.03); }
        @media (max-width: 600px) { .quick-create span { display: none; } }

        /* icon action btn */
        .icon-btn {
          position: relative;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 9px;
          color: #57534e;
          cursor: pointer;
          transition: all 0.2s;
        }
        .icon-btn:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.12);
          color: #a8a29e;
        }
        .icon-btn.active {
          background: rgba(234,88,12,0.1);
          border-color: rgba(234,88,12,0.25);
          color: #f97316;
        }

        /* notification badge */
        .notif-badge {
          position: absolute;
          top: -3px;
          right: -3px;
          width: 17px;
          height: 17px;
          background: #ea580c;
          border: 2px solid #0a0a0a;
          border-radius: 50%;
          font-family: 'Syne', sans-serif;
          font-size: 8px;
          font-weight: 800;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── Dropdown shared ── */
        .dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          background: #131313;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.7), 0 4px 16px rgba(0,0,0,0.4);
          z-index: 100;
          overflow: hidden;
          animation: dropIn 0.18s ease both;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ── Notification dropdown ── */
        .notif-dropdown {
          width: 340px;
        }
        .notif-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px 12px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .notif-header-title {
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #f0ece4;
        }
        .mark-all-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          background: none;
          border: none;
          color: #57534e;
          font-size: 11px;
          cursor: pointer;
          transition: color 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .mark-all-btn:hover { color: #f97316; }

        .notif-list {
          max-height: 320px;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.07) transparent;
        }
        .notif-list::-webkit-scrollbar { width: 4px; }
        .notif-list::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.07);
          border-radius: 10px;
        }

        .notif-item {
          display: flex;
          align-items: flex-start;
          gap: 11px;
          padding: 12px 16px;
          cursor: pointer;
          transition: background 0.15s;
          position: relative;
          border-bottom: 1px solid rgba(255,255,255,0.03);
        }
        .notif-item:hover { background: rgba(255,255,255,0.03); }
        .notif-item.unread { background: rgba(234,88,12,0.04); }

        .notif-icon-wrap {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .notif-body { flex: 1; min-width: 0; }
        .notif-title {
          font-family: 'Syne', sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: #e8e4dc;
          margin-bottom: 2px;
        }
        .notif-text {
          font-size: 11px;
          color: #57534e;
          line-height: 1.4;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .notif-time {
          font-size: 10px;
          color: #2c2927;
          margin-top: 3px;
          font-family: 'DM Sans', sans-serif;
        }
        .unread-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #f97316;
          flex-shrink: 0;
          margin-top: 6px;
        }

        .notif-footer {
          padding: 10px 16px;
          border-top: 1px solid rgba(255,255,255,0.05);
          text-align: center;
        }
        .notif-footer a {
          font-size: 11px;
          color: #57534e;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          transition: color 0.2s;
        }
        .notif-footer a:hover { color: #f97316; }

        /* ── User dropdown ── */
        .user-dropdown { width: 220px; }

        .user-dropdown-header {
          padding: 14px 16px 12px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .user-dropdown-name {
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #f0ece4;
          margin-bottom: 2px;
        }
        .user-dropdown-email {
          font-size: 11px;
          color: #3c3836;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .user-dropdown-plan {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(234,88,12,0.1);
          border: 1px solid rgba(234,88,12,0.2);
          color: #f97316;
          font-size: 9px;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 2px 8px;
          border-radius: 100px;
          margin-top: 6px;
        }

        .user-menu-list { padding: 6px; }
        .user-menu-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 10px;
          border-radius: 8px;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: #78716c;
          transition: all 0.15s;
          text-decoration: none;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
        }
        .user-menu-item:hover {
          background: rgba(255,255,255,0.04);
          color: #e8e4dc;
        }
        .user-menu-item.danger:hover {
          background: rgba(239,68,68,0.08);
          color: #ef4444;
        }
        .user-menu-divider {
          height: 1px;
          background: rgba(255,255,255,0.05);
          margin: 4px 6px;
        }

        /* ── User avatar trigger ── */
        .user-trigger {
          display: flex;
          align-items: center;
          gap: 7px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          padding: 5px 10px 5px 6px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .user-trigger:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.12);
        }
        .user-trigger-avatar {
          width: 26px;
          height: 26px;
          border-radius: 6px;
          background: rgba(234,88,12,0.2);
          border: 1px solid rgba(234,88,12,0.3);
          color: #f97316;
          font-family: 'Syne', sans-serif;
          font-size: 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .user-trigger-name {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #a8a29e;
          max-width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        @media (max-width: 500px) { .user-trigger-name { display: none; } }
        .user-trigger-chevron { color: #3c3836; transition: transform 0.2s; }
        .user-trigger-chevron.open { transform: rotate(180deg); }
      `}</style>

      <header className="topbar">

        {/* ── LEFT: hamburger + breadcrumb ── */}
        <div className="topbar-left">
          <button
            className="hamburger"
            onClick={onMobileMenuOpen}
            aria-label="Open menu"
          >
            <Menu size={16} />
          </button>

          <div className="breadcrumb">
            <a href="/dashboard" className="breadcrumb-parent">Dashboard</a>
            {pageTitle !== "Overview" && (
              <>
                <span className="breadcrumb-sep">/</span>
                <span className="breadcrumb-current">{pageTitle}</span>
              </>
            )}
            {pageTitle === "Overview" && (
              <span className="breadcrumb-current">Overview</span>
            )}
          </div>
        </div>

        {/* ── CENTER: search ── */}
        <div className="topbar-search" ref={searchRef}>
          {!searchOpen ? (
            <button
              className="search-trigger"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={14} />
              <span>Search polls…</span>
              <span className="search-kbd">⌘K</span>
            </button>
          ) : (
            <div className="search-expanded">
              <div className="search-input-row">
                <Search size={14} style={{ color: "#f97316", flexShrink: 0 }} />
                <input
                  autoFocus
                  className="search-input"
                  placeholder="Search polls, results, team…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                <button className="search-close" onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>
                  <X size={14} />
                </button>
              </div>
              <div className="search-hints">
                <div className="search-hint-label">Quick links</div>
                {[
                  { label: "My Polls", path: "/dashboard/polls" },
                  { label: "Analytics", path: "/dashboard/analytics" },
                  { label: "Team Settings", path: "/dashboard/team" },
                ].map(({ label, path }) => (
                  <div
                    key={path}
                    className="search-hint-item"
                    onClick={() => { navigate(path); setSearchOpen(false); }}
                  >
                    <ExternalLink size={12} />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT: actions ── */}
        <div className="topbar-right">

          {/* Quick create */}
          <button
            className="quick-create"
            onClick={() => navigate("/dashboard/polls/create")}
          >
            <Plus size={13} />
            <span>New Poll</span>
          </button>

          {/* Notifications */}
          <div style={{ position: "relative" }} ref={notifRef}>
            <button
              className={`icon-btn ${notifOpen ? "active" : ""}`}
              onClick={() => { setNotifOpen(p => !p); setUserMenuOpen(false); }}
              aria-label="Notifications"
            >
              <Bell size={15} />
              {unreadCount > 0 && (
                <span className="notif-badge">{unreadCount}</span>
              )}
            </button>

            {notifOpen && (
              <div className="dropdown notif-dropdown">
                <div className="notif-header">
                  <span className="notif-header-title">
                    Notifications
                    {unreadCount > 0 && (
                      <span style={{ color: "#f97316", marginLeft: 6, fontSize: 11 }}>
                        {unreadCount} new
                      </span>
                    )}
                  </span>
                  {unreadCount > 0 && (
                    <button className="mark-all-btn" onClick={markAllRead}>
                      <CheckCheck size={12} /> Mark all read
                    </button>
                  )}
                </div>

                <div className="notif-list">
                  {notifications.map(n => {
                    const Icon = n.icon;
                    return (
                      <div
                        key={n.id}
                        className={`notif-item ${!n.read ? "unread" : ""}`}
                        onClick={() => markRead(n.id)}
                      >
                        <div
                          className="notif-icon-wrap"
                          style={{ background: `${n.color}18` }}
                        >
                          <Icon size={14} style={{ color: n.color }} />
                        </div>
                        <div className="notif-body">
                          <div className="notif-title">{n.title}</div>
                          <div className="notif-text">{n.body}</div>
                          <div className="notif-time">{n.time}</div>
                        </div>
                        {!n.read && <div className="unread-dot" />}
                      </div>
                    );
                  })}
                </div>

                <div className="notif-footer">
                  <a href="/dashboard/notifications">View all notifications →</a>
                </div>
              </div>
            )}
          </div>

          {/* User menu */}
          <div style={{ position: "relative" }} ref={userRef}>
            <button
              className="user-trigger"
              onClick={() => { setUserMenuOpen(p => !p); setNotifOpen(false); }}
              aria-label="User menu"
            >
              <div className="user-trigger-avatar">{initials}</div>
              <span className="user-trigger-name">
                {user?.name?.split(" ")[0] || "Account"}
              </span>
              <ChevronDown
                size={13}
                className={`user-trigger-chevron ${userMenuOpen ? "open" : ""}`}
              />
            </button>

            {userMenuOpen && (
              <div className="dropdown user-dropdown">
                {/* Header */}
                <div className="user-dropdown-header">
                  <div className="user-dropdown-name">{user?.name || "Guest User"}</div>
                  <div className="user-dropdown-email">{user?.email || "—"}</div>
                  <div className="user-dropdown-plan">⚡ Starter Plan</div>
                </div>

                {/* Menu items */}
                <div className="user-menu-list">
                  <a
                    href="/dashboard/settings"
                    className="user-menu-item"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <User size={14} /> Profile
                  </a>
                  <a
                    href="/dashboard/settings"
                    className="user-menu-item"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <Settings size={14} /> Settings
                  </a>
                  <div className="user-menu-divider" />
                  <button
                    className="user-menu-item danger"
                    onClick={handleLogout}
                  >
                    <LogOut size={14} /> Sign out
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </header>
    </>
  );
};

export default Topbar;