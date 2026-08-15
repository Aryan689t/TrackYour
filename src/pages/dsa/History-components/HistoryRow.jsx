import React from "react";
import "./HistoryRow.css";

function HistoryRow({ date, problem, difficulty, pattern, status, source }) {
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

  const getStatusBadgeClass = (st) => {
    switch (st?.toLowerCase()) {
      case "solved":
        return "badge-success";
      case "attempting":
        return "badge-warning";
      default:
        return "badge-neutral";
    }
  };

  return (
    <div className="historyRow">
      <div className="col-date">{date}</div>
      <div className="col-problem">{problem}</div>
      <div className="col-diff">
        <span className={`badge ${getDiffBadgeClass(difficulty)}`}>
          {difficulty}
        </span>
      </div>
      <div className="col-pattern">
        <span className="badge badge-purple">{pattern}</span>
      </div>
      <div className="col-status">
        <span className={`badge ${getStatusBadgeClass(status)}`}>
          {status}
        </span>
      </div>
      <div className="col-source">{source}</div>
    </div>
  );
}

export default HistoryRow;