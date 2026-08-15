import React from "react";
import "./ProblemCard.css";

function ProblemCard({ number, name, difficulty, pattern, source, time }) {
  const getDiffBadgeClass = (diff) => {
    switch (diff?.toLowerCase()) {
      case "easy":
        return "badge-success";
      case "medium":
        return "badge-warning";
      case "hard":
        return "badge-danger";
      default:
        return "badge-neutral";
    }
  };

  return (
    <div className="problemCard">
      <div className="problemLeft">
        <div className="problemTitleRow">
          {number && <span className="problemNumber">#{number}</span>}
          {number && <span className="titleDot">·</span>}
          <h3 className="problemName">{name}</h3>
        </div>

        <div className="problemTags">
          <span className={`badge ${getDiffBadgeClass(difficulty)}`}>
            {difficulty}
          </span>

          {pattern && <span className="badge badge-purple">{pattern}</span>}

          {source && <span className="badge badge-neutral">{source}</span>}
        </div>
      </div>

      {time && <p className="problemTime">{time}</p>}
    </div>
  );
}

export default ProblemCard;