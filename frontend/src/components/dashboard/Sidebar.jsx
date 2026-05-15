// import React from 'react'

// import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Map,
//   Wallet,
//   CheckSquare,
//   FileText,
//   LogOut,
//   ArrowRight,
//   ArrowLeft
// } from "lucide-react";
// import authService from '../../services/authService';
// import { useAuth } from '../../context/AuthContext';

// const Sidebar = () => {

//   const { logout } = useAuth();
//   const navigate = useNavigate()

//   const { tripId } = useParams();

//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate("/")
//     } finally {
//       localStorage.clear();
//     }
//   }

//   return (
//     <div className="w-64 bg-gray-200 dark:bg-[#111111] border-r dark:border-r-neutral-600 dark:text-white">
//       <div className="text-xl font-bold text-orange-400 my-8 border-b p-3 dark:border-b-neutral-600">
//         {
//           !tripId ? (
//             <h1 className='mb-7'>Trip Sarthi</h1>
//           ) :
//             (
//               <NavLink
//                 to="/dashboard"
//                 className="flex items-center gap-2 mb-7 justify-center"
//               >
//                 <ArrowLeft/> Exit Trip
//               </NavLink>
//             )
//         }
//       </div>
//       <div className='flex flex-col justify-between min-h-[80vh] overflow-x-hidden'>
//         <>
//           {!tripId ? (
//             <div className="flex flex-col">
//               <NavLink to="/dashboard" className="block group rounded hover:bg-gray-800 dark:hover:bg-orange-500 shadow-sm shadow-orange-600/20 py-5">
//                 <h2 className='group-hover:scale-108 transition-all duration-400'>
//                   Dashboard
//                 </h2>
//               </NavLink>

//               <NavLink to="/dashboard/my-trips" className="block group rounded hover:bg-gray-800 dark:hover:bg-orange-500 shadow-sm shadow-orange-600/20 py-5">
//                 <h2 className='group-hover:scale-108 transition-all duration-400'>
//                   My Trips
//                 </h2>
//               </NavLink>

//               <NavLink to="/dashboard/shared-trips" className="block group rounded hover:bg-gray-800 dark:hover:bg-orange-500 shadow-sm shadow-orange-600/20 py-5">
//                 <h2 className='group-hover:scale-108 transition-all duration-400'>
//                   Shared Trips
//                 </h2>
//               </NavLink>

//             </div>
//           ) : (
//             <div className="space-y-2 px-4">

//               <NavLink to={`/dashboard/trip/${tripId}`} className="block group rounded hover:bg-gray-800 dark:hover:bg-orange-500 shadow-sm shadow-orange-600/20 py-5">
//                 <h2 className='group-hover:scale-108 transition-all duration-400'>
//                   Summary
//                 </h2>
//               </NavLink>

//               <NavLink to={`/dashboard/trip/${tripId}/planner`} className="block group rounded hover:bg-gray-800 dark:hover:bg-orange-500 shadow-sm shadow-orange-600/20 py-5">
//                 <h2 className='group-hover:scale-108 transition-all duration-400'>
//                   Planner
//                 </h2>
//               </NavLink>

//               <NavLink to={`/dashboard/trip/${tripId}/budget`} className="block group rounded hover:bg-gray-800 dark:hover:bg-orange-500 shadow-sm shadow-orange-600/20 py-5">
//                 <h2 className='group-hover:scale-108 transition-all duration-400'>
//                   Budget
//                 </h2>
//               </NavLink>

//               <NavLink to={`/dashboard/trip/${tripId}/checklist`} className="block group rounded hover:bg-gray-800 dark:hover:bg-orange-500 shadow-sm shadow-orange-600/20 py-5">
//                 <h2 className='group-hover:scale-108 transition-all duration-400'>
//                   Checklist
//                 </h2>
//               </NavLink>

//               <NavLink to={`/dashboard/trip/${tripId}/documents`} className="block group rounded hover:bg-gray-800 dark:hover:bg-orange-500 shadow-sm shadow-orange-600/20 py-5">
//                 <h2 className='group-hover:scale-108 transition-all duration-400'>
//                   Documents
//                 </h2>
//               </NavLink>

//             </div>
//           )}

//         </>

//         <div className="">
//           <div className="p-4 border-t border-gray-700 flex items-center gap-2">
//             <div className="flex items-center ">
//               <img
//                 src="/avatar.png"
//                 className="w-14 h-14 rounded-full border border-orange-500"
//               />

//             </div>

//             <div className='flex flex-col items-start justify-start flex-1 gap-2 ml-2'>
//               <p className="text-md font-semibold text-white">Rohit Chornele</p>
//               <button
//                 onClick={handleLogout}
//                 className="text-sm text-red-400 hover:text-red-300 rounded-lg cursor-pointer"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>

//       </div>


//     </div>
//   );


// };

// export default Sidebar;







// components/dashboard/Sidebar.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  BarChart2,
  LayoutDashboard,
  Vote,
  TrendingUp,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus,
  Zap,
  LogOut,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

/**
 * Sidebar
 * ───────
 * Props:
 *   collapsed         — boolean, controls narrow/wide mode
 *   onToggleCollapse  — fn, called when collapse button clicked
 *   isMobile          — boolean, shows X close button instead of collapse arrow
 */

const NAV_ITEMS = [
  {
    group: "Main",
    items: [
      { to: "/dashboard",           icon: LayoutDashboard, label: "Overview" },
      { to: "/dashboard/polls",     icon: Vote,            label: "My Polls" },
      // { to: "/dashboard/analytics", icon: TrendingUp,      label: "Analytics" },
      // { to: "/dashboard/team",      icon: Users,           label: "Team" },
    ],
  },
  {
    group: "Account",
    items: [
      { to: "/dashboard/settings",  icon: Settings,        label: "Settings" },
    ],
  },
];

const Sidebar = ({ collapsed, onToggleCollapse, isMobile = false }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } finally {
      localStorage.clear();
    }
  };

  /* ── initials fallback for avatar ── */
  const initials = user?.name
    ? user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500&display=swap');

        /* ── Sidebar shell ── */
        .sidebar {
          width: 100%;
          height: 100vh;
          background: #0d0d0d;
          border-right: 1px solid rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
        }

        /* ── Logo row ── */
        .sidebar-logo {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 16px 20px 18px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          flex-shrink: 0;
          min-height: 64px;
        }

        .logo-mark {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .logo-icon-wrap {
          position: relative;
          width: 28px;
          height: 28px;
          flex-shrink: 0;
        }
        .logo-icon-bg {
          width: 28px;
          height: 28px;
          background: #ea580c;
          border-radius: 7px;
          transform: rotate(10deg);
        }
        .logo-icon-inner {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
        }
        .logo-text {
          font-family: 'Syne', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #f0ece4;
          letter-spacing: -0.02em;
          white-space: nowrap;
          overflow: hidden;
          transition: opacity 0.2s, width 0.3s;
        }

        /* ── Collapse toggle button ── */
        .collapse-btn {
          width: 26px;
          height: 26px;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          color: #57534e;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.2s;
        }
        .collapse-btn:hover {
          border-color: rgba(255,255,255,0.15);
          color: #a8a29e;
          background: rgba(255,255,255,0.06);
        }

        /* ── Create Poll button ── */
        .create-btn {
          margin: 14px 12px 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          background: #ea580c;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 10px 14px;
          cursor: pointer;
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: -0.01em;
          transition: all 0.25s ease;
          white-space: nowrap;
          overflow: hidden;
          flex-shrink: 0;
        }
        .create-btn:hover {
          background: #c2410c;
          transform: scale(1.02);
        }
        .create-btn.icon-only {
          justify-content: center;
          padding: 10px;
        }

        /* ── Nav scroll area ── */
        .sidebar-nav {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 8px 0 12px;
          scrollbar-width: none;
        }
        .sidebar-nav::-webkit-scrollbar { display: none; }

        /* ── Nav group label ── */
        .nav-group-label {
          font-family: 'Syne', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #3c3836;
          padding: 14px 20px 6px;
          white-space: nowrap;
          overflow: hidden;
          transition: opacity 0.2s;
        }

        /* ── Nav item ── */
        .nav-item {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 9px 14px 9px 18px;
          margin: 1px 8px;
          border-radius: 9px;
          text-decoration: none;
          color: #57534e;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s ease;
          white-space: nowrap;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          border: 1px solid transparent;
        }
        .nav-item:hover {
          color: #a8a29e;
          background: rgba(255,255,255,0.03);
        }
        .nav-item.active {
          color: #f0ece4;
          background: rgba(234,88,12,0.1);
          border-color: rgba(234,88,12,0.2);
        }
        .nav-item.active .nav-icon { color: #f97316; }

        /* active left indicator */
        .nav-item.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 20%;
          bottom: 20%;
          width: 3px;
          background: #f97316;
          border-radius: 0 3px 3px 0;
        }

        .nav-icon {
          flex-shrink: 0;
          transition: color 0.2s;
        }
        .nav-label {
          transition: opacity 0.2s, width 0.3s;
          overflow: hidden;
        }

        /* ── Divider ── */
        .sidebar-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
          margin: 8px 12px;
        }

        /* ── Upgrade CTA ── */
        .upgrade-card {
          margin: 8px 10px;
          background: rgba(234,88,12,0.07);
          border: 1px solid rgba(234,88,12,0.18);
          border-radius: 12px;
          padding: 14px;
          flex-shrink: 0;
          overflow: hidden;
          transition: all 0.3s;
        }
        .upgrade-card:hover {
          background: rgba(234,88,12,0.11);
          border-color: rgba(234,88,12,0.3);
        }
        .upgrade-title {
          font-family: 'Syne', sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: #f97316;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .upgrade-desc {
          font-size: 11px;
          color: #57534e;
          line-height: 1.5;
          margin-bottom: 10px;
        }
        .upgrade-btn {
          width: 100%;
          background: #ea580c;
          color: #fff;
          border: none;
          border-radius: 7px;
          padding: 7px;
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 0.04em;
          transition: all 0.2s;
        }
        .upgrade-btn:hover { background: #c2410c; }

        /* ── User row at bottom ── */
        .sidebar-user {
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 12px 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
          overflow: hidden;
        }
        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(234,88,12,0.2);
          border: 1px solid rgba(234,88,12,0.3);
          color: #f97316;
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .user-info { overflow: hidden; flex: 1; }
        .user-name {
          font-family: 'Syne', sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: #e8e4dc;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .user-email {
          font-size: 10px;
          color: #57534e;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .logout-btn {
          background: none;
          border: none;
          color: #3c3836;
          cursor: pointer;
          padding: 4px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          transition: color 0.2s;
          flex-shrink: 0;
        }
        .logout-btn:hover { color: #ef4444; }

        /* ── Tooltip for collapsed state ── */
        .nav-item-wrap {
          position: relative;
        }
        .nav-item-wrap:hover .nav-tooltip {
          opacity: 1;
          pointer-events: auto;
          transform: translateX(0);
        }
        .nav-tooltip {
          position: absolute;
          left: calc(100% + 10px);
          top: 50%;
          transform: translateY(-50%) translateX(-6px);
          background: #1c1917;
          border: 1px solid rgba(255,255,255,0.1);
          color: #e8e4dc;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          padding: 5px 10px;
          border-radius: 7px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.15s, transform 0.15s;
          z-index: 100;
        }
        .nav-tooltip::before {
          content: '';
          position: absolute;
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
          border: 5px solid transparent;
          border-right-color: rgba(255,255,255,0.1);
        }
      `}</style>

      <aside className="sidebar">

        {/* ── Logo + collapse ── */}
        <div className="sidebar-logo">
          <a href="/dashboard" className="logo-mark">
            <div className="logo-icon-wrap">
              <div className="logo-icon-bg" />
              <div className="logo-icon-inner">
                <BarChart2 size={13} />
              </div>
            </div>
            {!collapsed && (
              <span className="logo-text">PollWave</span>
            )}
          </a>
          <button
            className="collapse-btn"
            onClick={onToggleCollapse}
            aria-label={isMobile ? "Close menu" : collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isMobile
              ? <X size={13} />
              : collapsed
                ? <ChevronRight size={13} />
                : <ChevronLeft size={13} />
            }
          </button>
        </div>

        {/* ── Create Poll CTA ── */}
        <button
          className={`create-btn ${collapsed ? "icon-only" : ""}`}
          onClick={() => navigate("/dashboard/polls/create")}
        >
          <Plus size={15} style={{ flexShrink: 0 }} />
          {!collapsed && "New Poll"}
        </button>

        {/* ── Navigation ── */}
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((group, gi) => (
            <div key={gi}>
              {gi > 0 && <div className="sidebar-divider" />}

              {!collapsed && (
                <div className="nav-group-label">{group.group}</div>
              )}

              {group.items.map(({ to, icon: Icon, label }) => (
                <div key={to} className="nav-item-wrap">
                  <NavLink
                    to={to}
                    end={to === "/dashboard"}
                    className={({ isActive }) =>
                      `nav-item${isActive ? " active" : ""}`
                    }
                  >
                    <Icon size={16} className="nav-icon" />
                    {!collapsed && <span className="nav-label">{label}</span>}
                  </NavLink>
                  {/* Tooltip — only shown when collapsed */}
                  {collapsed && (
                    <div className="nav-tooltip">{label}</div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </nav>

        {/* ── Upgrade CTA (hidden when collapsed) ── */}
        {!collapsed && (
          <div className="upgrade-card">
            <div className="upgrade-title">
              <Zap size={11} />
              Upgrade to Team
            </div>
            <p className="upgrade-desc">
              Unlock unlimited polls, advanced analytics & team workspaces.
            </p>
            <button
              className="upgrade-btn"
              onClick={() => navigate("/pricing")}
            >
              UPGRADE NOW
            </button>
          </div>
        )}

        {/* ── User row ── */}
        <div className="sidebar-user">
          <div className="user-avatar">{initials}</div>
          {!collapsed && (
            <div className="user-info">
              <div className="user-name">{user?.name || "Guest User"}</div>
              <div className="user-email">{user?.email || "—"}</div>
            </div>
          )}
          <button
            className="logout-btn"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut size={14} />
          </button>
        </div>

      </aside>
    </>
  );
};

export default Sidebar;