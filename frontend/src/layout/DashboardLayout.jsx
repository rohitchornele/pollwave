// components/dashboard/DashboardLayout.jsx
import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Topbar from "../components/dashboard/Topbar";
import Sidebar from "../components/dashboard/Sidebar";

/**
 * DashboardLayout
 * ───────────────
 * Shell wrapper — use as a layout route in React Router v6.
 *
 * Router setup (in your router file):
 *
 *   <Route element={<DashboardLayout />}>
 *     <Route path="/dashboard"              element={<Overview />} />
 *     <Route path="/dashboard/polls"        element={<MyPolls />} />
 *     <Route path="/dashboard/polls/create" element={<CreatePoll />} />
 *     <Route path="/dashboard/polls/:id"    element={<PollDetail />} />
 *     <Route path="/dashboard/analytics"    element={<Analytics />} />
 *     <Route path="/dashboard/team"         element={<Team />} />
 *     <Route path="/dashboard/settings"     element={<Settings />} />
 *   </Route>
 *
 * No props needed — page title is derived automatically from the URL.
 * Override the title map below to customise labels.
 */

/* ── Maps pathname → breadcrumb label ── */
const PAGE_TITLES = {
  "/dashboard":              "Overview",
  "/dashboard/polls":        "My Polls",
  "/dashboard/polls/create": "Create Poll",
  "/dashboard/analytics":    "Analytics",
  "/dashboard/team":         "Team",
  "/dashboard/settings":     "Settings",
};

function usePageTitle() {
  const { pathname } = useLocation();
  // exact match first
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];
  // dynamic segments: /dashboard/polls/:id/edit → "Edit Poll"
  if (/\/dashboard\/polls\/.+\/edit/.test(pathname)) return "Edit Poll";
  if (/\/dashboard\/polls\/.+/.test(pathname))       return "Poll Results";
  return "Dashboard";
}

const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const pageTitle = usePageTitle();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        /* ── Reset & base ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .dash-root {
          font-family: 'DM Sans', sans-serif;
          background: #0a0a0a;
          color: #e8e4dc;
          min-height: 100vh;
          display: flex;
          overflow: hidden;
        }

        /* ── Grain overlay ── */
        .dash-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        /* ── Subtle grid ── */
        .dash-root::after {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
        }

        /* ── Orange ambient glow (top-left, subtle) ── */
        .dash-glow {
          position: fixed;
          top: -200px;
          left: -100px;
          width: 600px;
          height: 600px;
          background: radial-gradient(ellipse at center, rgba(234,88,12,0.07) 0%, transparent 65%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Sidebar slot ── */
        .dash-sidebar-slot {
          position: relative;
          z-index: 30;
          flex-shrink: 0;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .dash-sidebar-slot.expanded { width: 240px; }
        .dash-sidebar-slot.collapsed { width: 68px; }

        /* ── Main area ── */
        .dash-main {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 1;
          overflow: hidden;
        }

        /* ── Page content scroll area ── */
        .dash-content {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 28px 32px 48px;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.08) transparent;
        }
        .dash-content::-webkit-scrollbar { width: 5px; }
        .dash-content::-webkit-scrollbar-track { background: transparent; }
        .dash-content::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.08);
          border-radius: 10px;
        }
        .dash-content::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.14);
        }

        /* ── Mobile overlay backdrop ── */
        .mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(4px);
          z-index: 25;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .mobile-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }

        /* ── Mobile sidebar drawer ── */
        .mobile-sidebar-drawer {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 240px;
          z-index: 40;
          transform: translateX(-100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .mobile-sidebar-drawer.open {
          transform: translateX(0);
        }

        /* ── Responsive: hide desktop sidebar on mobile ── */
        @media (max-width: 768px) {
          .dash-sidebar-slot { display: none; }
          .dash-content { padding: 20px 16px 40px; }
        }

        /* ── Page fade-in ── */
        @keyframes pageFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .page-enter {
          animation: pageFadeIn 0.4s ease both;
        }
      `}</style>

      <div className="dash-root">
        {/* Ambient glow */}
        <div className="dash-glow" />

        {/* ── Desktop Sidebar ── */}
        <div className={`dash-sidebar-slot ${sidebarCollapsed ? "collapsed" : "expanded"}`}>
          <Sidebar
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(p => !p)}
          />
        </div>

        {/* ── Mobile Sidebar Drawer ── */}
        <div
          className={`mobile-overlay ${mobileSidebarOpen ? "open" : ""}`}
          onClick={() => setMobileSidebarOpen(false)}
        />
        <div className={`mobile-sidebar-drawer ${mobileSidebarOpen ? "open" : ""}`}>
          <Sidebar
            collapsed={false}
            onToggleCollapse={() => setMobileSidebarOpen(false)}
            isMobile
          />
        </div>

        {/* ── Main content area ── */}
        <div className="dash-main">
          <Topbar
            pageTitle={pageTitle}
            onMobileMenuOpen={() => setMobileSidebarOpen(true)}
            sidebarCollapsed={sidebarCollapsed}
          />
          <main className="dash-content">
            {/* key={pathname} remounts page-enter on every route change, re-triggering the fade-up */}
            <div className="page-enter" key={pageTitle}>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;