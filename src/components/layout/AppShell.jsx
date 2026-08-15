import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMiniUser } from 'react-icons/hi2';
import './AppShell.css';

function AppShell({ children, containerSize = "wide" }) {
  const location = useLocation();
  const path = location.pathname;

  const [mobileOpen, setMobileOpen] = useState(false);

  // Check active module
  const isDSA = ["/Status", "/History", "/Playlists", "/Roadmap", "/Journal"].includes(path);
  const isAcademics = path === "/academics" || path.startsWith("/Semester/");
  const isProjects = path === "/projects";
  const isNetwork = path === "/network";

  const mainNavItems = [
    {
      label: "Overview",
      path: "/",
      isActive: path === "/",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
      )
    },
    {
      label: "Academics",
      path: "/academics",
      isActive: isAcademics,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 2 6 3 6 3s6-1 6-3v-5" />
        </svg>
      )
    },
    {
      label: "DSA",
      path: "/Status",
      isActive: isDSA,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      )
    },
    {
      label: "Projects",
      path: "/projects",
      isActive: isProjects,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      )
    },
    {
      label: "Network",
      path: "/network",
      isActive: isNetwork,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    }
  ];

  const dsaNavItems = [
    { label: "Status", path: "/Status" },
    { label: "History", path: "/History" },
    { label: "Playlists", path: "/Playlists" },
    { label: "Roadmap", path: "/Roadmap" },
    { label: "Journal", path: "/Journal" }
  ];

  const containerClass =
    containerSize === "medium"
      ? "container-medium"
      : containerSize === "medium-wide"
      ? "container-medium-wide"
      : "container-wide";

  return (
    <div className="app-shell-layout page-container">
      {/* Mobile Top Header */}
      <header className="mobile-header">
        <Link to="/" className="sidebar-brand">
          <span className="brand-title">Track<span className="brand-accent">Your</span></span>
        </Link>
        <button
          className="mobile-toggle-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </header>

      {/* Backdrop overlay for mobile drawer */}
      {mobileOpen && (
        <div className="sidebar-backdrop" onClick={() => setMobileOpen(false)} />
      )}

      {/* Global Sidebar */}
      <aside className={`app-sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="sidebar-top">
          <Link to="/" className="sidebar-brand" onClick={() => setMobileOpen(false)}>
            <span className="brand-title">
              Track<span className="brand-accent">Your</span>
            </span>
            <span className="brand-badge">v1.0</span>
          </Link>
        </div>

        <div className="sidebar-scrollable">
          <div className="sidebar-section">
            <span className="sidebar-section-label">MAIN</span>
            <nav className="sidebar-nav">
              {mainNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${item.isActive ? "active" : ""}`}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Contextual Sub-navigation for DSA */}
          {isDSA && (
            <div className="sidebar-section dsa-subnav">
              <span className="sidebar-section-label">DSA WORKSPACE</span>
              <nav className="sidebar-nav sub-nav">
                {dsaNavItems.map((sub) => (
                  <Link
                    key={sub.path}
                    to={sub.path}
                    className={`subnav-item ${path === sub.path ? "active" : ""}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="subnav-dot" />
                    <span>{sub.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>

        {/* Profile / Bottom Area */}
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">
              <HiMiniUser size={22} />
            </div>
            <div className="user-info">
              <span className="user-name">Aryan</span>
              <span className="user-role">Student</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="app-main-content page-content">
        <div className={`shell-container ${containerClass}`}>
          {children}
        </div>
      </main>
    </div>
  );
}

export default AppShell;
