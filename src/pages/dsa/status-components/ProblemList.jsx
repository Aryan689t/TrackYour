import React from "react";
import { FiArrowUpRight, FiArrowUpLeft } from "react-icons/fi";
import ProblemCard from "./ProblemCard";
import "./ProblemList.css";

function ProblemList({ title, problems = [], onViewAll }) {
  // Show first 2 preview problems on the dashboard
  const previewProblems = problems.slice(0, 2);
  const isAttempting = title?.toLowerCase().includes("attempting");
  const ariaLabel = isAttempting
    ? "View all attempting problems"
    : "View all completed problems";

  return (
    <div className="premium-card problemList">
      <div className="problemListHeader">
        <h2>{title}</h2>
        {onViewAll && (
          <button
            className="expand-arrow-btn"
            onClick={onViewAll}
            aria-label={ariaLabel}
            title={ariaLabel}
          >
            {isAttempting ? (
              <FiArrowUpRight size={18} />
            ) : (
              <FiArrowUpLeft size={18} />
            )}
          </button>
        )}
      </div>

      <div className="problemListItems">
        {previewProblems.map((problem, index) => (
          <ProblemCard
            key={problem.id || index}
            number={problem.number}
            name={problem.name}
            difficulty={problem.difficulty}
            pattern={problem.pattern}
            source={problem.source}
            time={problem.time}
          />
        ))}
      </div>
    </div>
  );
}

export default ProblemList;