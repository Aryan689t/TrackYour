import React from "react";
import "./StatsGrid.css";

function StatsGrid() {
  return (
    <div className="status-inline-summary">
      <div className="summary-item">
        <span className="summary-value">281</span>
        <span className="summary-label">solved</span>
      </div>

      <span className="summary-dot">·</span>

      <div className="summary-item">
        <span className="summary-pill easy">
          <span className="pill-dot easy" />
          <span className="summary-value">120</span> Easy
        </span>
      </div>

      <span className="summary-dot">·</span>

      <div className="summary-item">
        <span className="summary-pill medium">
          <span className="pill-dot medium" />
          <span className="summary-value">130</span> Medium
        </span>
      </div>

      <span className="summary-dot">·</span>

      <div className="summary-item">
        <span className="summary-pill hard">
          <span className="pill-dot hard" />
          <span className="summary-value">31</span> Hard
        </span>
      </div>

      <span className="summary-dot">·</span>

      <div className="summary-item">
        <span className="summary-value">37</span>
        <span className="summary-label">day streak</span>
      </div>

      <span className="summary-dot">·</span>

      <div className="summary-item">
        <span className="summary-value">103</span>
        <span className="summary-label">best streak</span>
      </div>
    </div>
  );
}

export default StatsGrid;