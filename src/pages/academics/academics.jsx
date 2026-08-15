import React from "react";
import { Link } from "react-router-dom";
import AppShell from "../../components/layout/AppShell.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import "./Academics.css";

function Academics() {
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  const getSemesterSummary = (num) => {
    try {
      const data = localStorage.getItem("semester" + num);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return `${parsed.length} Subject${parsed.length > 1 ? "s" : ""}`;
        }
      }
    } catch {
      // ignore
    }
    return null;
  };

  return (
    <AppShell containerSize="wide">
      <div className="academics-page">
        <PageHeader
          eyebrow="Academic Progress"
          title="Academics"
          description="Track your course grades, manage semesters, and monitor your cumulative academic performance."
        />

        <div className="semester-grid">
          {semesters.map((num) => {
            const summary = getSemesterSummary(num);
            return (
              <Link to={`/Semester/${num}`} key={num} className="premium-card sem-card">
                <div className="sem-card-header">
                  <span className="sem-icon">🎓</span>
                  {summary ? (
                    <span className="badge badge-purple">{summary}</span>
                  ) : (
                    <span className="badge badge-neutral">Not Configured</span>
                  )}
                </div>
                <div className="sem-card-body">
                  <h3>Semester {num}</h3>
                  <p className="sem-subtext">View & Calculate SGPA</p>
                </div>
                <div className="sem-card-arrow">
                  <span>Open →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}

export default Academics;