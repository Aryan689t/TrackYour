import React from "react";
import "./StatsCard.css";

function StatCard({ icon, title, value, subtitle, description, color }) {
  return (
    <div className="premium-card statCard">
      <div className="statTop">
        <div className={`cardIcon ${color}`}>{icon}</div>
        <div className="statHeading">
          <h3>{title}</h3>
        </div>
      </div>

      <div className="statMiddle">
        <span className="statValue display-serif">{value}</span>
        {subtitle && <span className="statSubtitle">{subtitle}</span>}
      </div>

      {description && <p className="statDescription">{description}</p>}
    </div>
  );
}

export default StatCard;