import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppShell from './components/layout/AppShell.jsx';
import PageHeader from './components/common/PageHeader.jsx';
import EmptyState from './components/common/EmptyState.jsx';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("/api/students", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Failed to fetch user");
      })
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.error("Failed to load user profile in Dashboard:", err);
      });
  }, []);
  // Read real academic data from localStorage if configured
  const academicStats = useMemo(() => {
    let configuredSemesters = 0;
    let totalSgpaSum = 0;

    for (let i = 1; i <= 8; i++) {
      try {
        const raw = localStorage.getItem("semester" + i);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) {
            configuredSemesters++;
            let sum = 0;
            let credSum = 0;
            parsed.forEach((item) => {
              const tot = Number(item.Internal || 0) + Number(item.External || 0);
              let gp = 0;
              if (tot >= 90) gp = 10;
              else if (tot >= 80) gp = 9;
              else if (tot >= 70) gp = 8;
              else if (tot >= 60) gp = 7;
              else if (tot >= 50) gp = 6;
              else if (tot >= 40) gp = 5;

              sum += gp * Number(item.Credits || 0);
              credSum += Number(item.Credits || 0);
            });
            if (credSum > 0) {
              totalSgpaSum += sum / credSum;
            }
          }
        }
      } catch {
        // ignore errors
      }
    }

    const avgCgpa = configuredSemesters > 0 ? (totalSgpaSum / configuredSemesters).toFixed(2) : "N/A";
    return { configuredSemesters, avgCgpa };
  }, []);

  // Practice items queue preview
  const activePracticeQueue = [
    { id: "1", name: "Two Sum", difficulty: "Easy", pattern: "Array", status: "Attempting", time: "Today" },
    { id: "15", name: "3Sum", difficulty: "Medium", pattern: "Two Pointers", status: "Attempting", time: "Today" },
    { id: "20", name: "Valid Parentheses", difficulty: "Easy", pattern: "Stack", status: "Attempting", time: "Yesterday" },
    { id: "53", name: "Maximum Subarray", difficulty: "Medium", pattern: "Array", status: "Attempting", time: "Yesterday" }
  ];

  return (
    <AppShell containerSize="wide">
      <div className="dashboard-root">
        <PageHeader
          eyebrow="Overview"
          title={`Good evening, ${user?.name || "Student"}`}
          description="Here's a summary of your academic progress, algorithm practice, and active projects."
          action={
            <span className="badge badge-success">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
              System Nominal
            </span>
          }
        />

        {/* Top Metric Summary Strip */}
        <div className="metrics-strip">
          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-title">Cumulative GPA</span>
              <span className="metric-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c0 2 6 3 6 3s6-1 6-3v-5" />
                </svg>
              </span>
            </div>
            <div className="metric-value-row">
              <span className="metric-value">{academicStats.avgCgpa}</span>
              <span className="metric-subtext">
                {academicStats.configuredSemesters > 0 ? `${academicStats.configuredSemesters} sems configured` : "No sem data yet"}
              </span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-title">DSA Problems</span>
              <span className="metric-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </span>
            </div>
            <div className="metric-value-row">
              <span className="metric-value">31</span>
              <span className="metric-subtext">18 solved · 13 active</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-title">Active Projects</span>
              <span className="metric-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
              </span>
            </div>
            <div className="metric-value-row">
              <span className="metric-value">4</span>
              <span className="metric-subtext">Portfolio & apps</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-title">Current Streak</span>
              <span className="metric-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </span>
            </div>
            <div className="metric-value-row">
              <span className="metric-value">12 days</span>
              <span className="metric-subtext">Best: 24 days</span>
            </div>
          </div>
        </div>

        {/* 2-Column Main Layout */}
        <div className="dashboard-grid">
          {/* Main Left Column */}
          <div className="dashboard-main-col">
            {/* Active Practice Queue Block */}
            <div className="section-block">
              <div className="section-block-header">
                <h2 className="section-block-title">Active Practice Queue</h2>
                <Link to="/Status" className="section-block-action">
                  View all in DSA →
                </Link>
              </div>

              <div className="overview-table-wrapper">
                <table className="overview-table">
                  <thead>
                    <tr>
                      <th>Problem</th>
                      <th>Difficulty</th>
                      <th>Pattern</th>
                      <th>Status</th>
                      <th>Activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activePracticeQueue.map((item) => (
                      <tr key={item.id}>
                        <td style={{ fontWeight: 500 }}>{item.name}</td>
                        <td>
                          <span className={`badge ${item.difficulty === 'Easy' ? 'badge-success' : item.difficulty === 'Medium' ? 'badge-warning' : 'badge-danger'}`}>
                            {item.difficulty}
                          </span>
                        </td>
                        <td>
                          <span className="badge badge-neutral">{item.pattern}</span>
                        </td>
                        <td>
                          <span className="badge badge-purple">{item.status}</span>
                        </td>
                        <td style={{ color: 'var(--text-dark)' }}>{item.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Academic Semesters Summary Block */}
            <div className="section-block">
              <div className="section-block-header">
                <h2 className="section-block-title">Academic Semesters</h2>
                <Link to="/academics" className="section-block-action">
                  Manage Academics →
                </Link>
              </div>

              <div className="sem-summary-strip">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((semNum) => {
                  const data = localStorage.getItem("semester" + semNum);
                  let subCount = 0;
                  if (data) {
                    try {
                      const parsed = JSON.parse(data);
                      if (Array.isArray(parsed)) subCount = parsed.length;
                    } catch {
                      // ignore
                    }
                  }

                  return (
                    <Link to={`/Semester/${semNum}`} key={semNum} className="sem-pill-card">
                      <span className="sem-pill-title">Semester {semNum}</span>
                      <span className="sem-pill-val">
                        {subCount > 0 ? `${subCount} Subjects` : "Not set"}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side Column */}
          <div className="dashboard-side-col">
            {/* Quick Navigation Hub */}
            <div className="section-block">
              <h2 className="section-block-title">Workspaces</h2>
              <div className="quick-modules-grid">
                <Link to="/academics" className="quick-module-card">
                  <div className="quick-module-top">
                    <span className="quick-module-title">Academics</span>
                    <span className="quick-module-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c0 2 6 3 6 3s6-1 6-3v-5" />
                      </svg>
                    </span>
                  </div>
                  <span className="quick-module-desc">Grades & SGPA calculator</span>
                </Link>

                <Link to="/Status" className="quick-module-card">
                  <div className="quick-module-top">
                    <span className="quick-module-title">DSA Tracker</span>
                    <span className="quick-module-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                    </span>
                  </div>
                  <span className="quick-module-desc">Problem sets & heatmap</span>
                </Link>

                <Link to="/projects" className="quick-module-card">
                  <div className="quick-module-top">
                    <span className="quick-module-title">Projects</span>
                    <span className="quick-module-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                      </svg>
                    </span>
                  </div>
                  <span className="quick-module-desc">Portfolio showcase</span>
                </Link>

                <Link to="/network" className="quick-module-card">
                  <div className="quick-module-top">
                    <span className="quick-module-title">Network</span>
                    <span className="quick-module-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                      </svg>
                    </span>
                  </div>
                  <span className="quick-module-desc">Contacts & CRM</span>
                </Link>
              </div>
            </div>

            {/* Recent Milestones / Log */}
            <div className="section-block">
              <h2 className="section-block-title">Recent Activity</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13 }}>
                  <span className="subnav-dot" style={{ marginTop: 6, flexShrink: 0, background: 'var(--accent-purple)' }} />
                  <div>
                    <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>Solved "Merge Two Sorted Lists"</span>
                    <p style={{ color: 'var(--text-dark)', fontSize: 12, margin: 0 }}>Linked List · LeetCode · 2 days ago</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13 }}>
                  <span className="subnav-dot" style={{ marginTop: 6, flexShrink: 0, background: 'var(--success)' }} />
                  <div>
                    <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>Added Microsoft mentor contact</span>
                    <p style={{ color: 'var(--text-dark)', fontSize: 12, margin: 0 }}>Network · 3 days ago</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13 }}>
                  <span className="subnav-dot" style={{ marginTop: 6, flexShrink: 0, background: 'var(--info)' }} />
                  <div>
                    <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>Logged Journal observation</span>
                    <p style={{ color: 'var(--text-dark)', fontSize: 12, margin: 0 }}>Two Pointers technique · 4 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default App;

