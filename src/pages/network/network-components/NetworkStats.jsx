import React from "react";
import "./NetworkStats.css";

function NetworkStats({ stats }) {
  return (
    <div className="networkStats">
      {stats.map((stat, index) => (
        <div className="premium-card netStatCard" key={index}>
          <div className="netStatHeader">
            <span className="netStatLabel">{stat.label}</span>
            <span className="badge badge-purple" style={{ fontSize: 10 }}>
              {stat.tag}
            </span>
          </div>
          <div className="netStatValue">{stat.value}</div>
        </div>
      ))}
    </div>
  );
}

export default NetworkStats;

