import React, { useState, useEffect } from "react";
import "./ProblemBrowserModal.css";

function ProblemBrowserModal({ open, onClose, initialTab = "All", problems = [] }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (open) {
      setActiveTab(initialTab);
      setSearchTerm("");
    }
  }, [open, initialTab]);

  // Handle Escape Key & Background Scroll Lock
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Prevent background scrolling
    const mainContent = document.querySelector(".app-main-content");
    if (mainContent) {
      mainContent.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (mainContent) {
        mainContent.style.overflow = "auto";
      }
    };
  }, [open, onClose]);

  if (!open) return null;

  // Dynamic counts calculated from problems dataset
  const totalAll = problems.length;
  const totalAttempting = problems.filter((p) => p.status === "Attempting").length;
  const totalCompleted = problems.filter((p) => p.status === "Solved" || p.status === "Completed").length;

  // Filter problems by Tab
  const tabFiltered = problems.filter((p) => {
    if (activeTab === "Attempting") return p.status === "Attempting";
    if (activeTab === "Completed") return p.status === "Solved" || p.status === "Completed";
    return true;
  });

  // Filter by Search Term (matches number, name, pattern, difficulty, source)
  const q = searchTerm.trim().toLowerCase();
  const searchFiltered = tabFiltered.filter((p) => {
    if (!q) return true;
    const matchNumber = p.number ? p.number.toString().includes(q) || `#${p.number}`.includes(q) : false;
    const matchName = p.name ? p.name.toLowerCase().includes(q) : false;
    const matchPattern = p.pattern ? p.pattern.toLowerCase().includes(q) : false;
    const matchDiff = p.difficulty ? p.difficulty.toLowerCase().includes(q) : false;
    const matchSource = p.source ? p.source.toLowerCase().includes(q) : false;
    return matchNumber || matchName || matchPattern || matchDiff || matchSource;
  });

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
    return st === "Solved" || st === "Completed" ? "badge-success" : "badge-warning";
  };

  return (
    <div className="problem-modal-backdrop" onClick={onClose}>
      <div className="premium-card problem-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="problem-modal-header">
          <div>
            <h2 className="problem-modal-title">Tracked Problems</h2>
            <p className="problem-modal-subtitle">Search and explore your tracked DSA problems</p>
          </div>
          <button className="problem-modal-close" onClick={onClose} aria-label="Close modal">
            ×
          </button>
        </div>

        {/* Search Bar */}
        <div className="problem-modal-search">
          <input
            type="text"
            className="input-standard"
            placeholder="🔍 Search by problem #, name, pattern, or difficulty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>

        {/* Dynamic Tab Filter Bar */}
        <div className="problem-modal-tabs">
          <button
            className={`tab-btn ${activeTab === "All" ? "active" : ""}`}
            onClick={() => setActiveTab("All")}
          >
            All ({totalAll})
          </button>
          <button
            className={`tab-btn ${activeTab === "Attempting" ? "active" : ""}`}
            onClick={() => setActiveTab("Attempting")}
          >
            Attempting ({totalAttempting})
          </button>
          <button
            className={`tab-btn ${activeTab === "Completed" ? "active" : ""}`}
            onClick={() => setActiveTab("Completed")}
          >
            Completed ({totalCompleted})
          </button>
        </div>

        {/* List Content Area with Internal Scrolling */}
        <div className="problem-modal-list">
          {searchFiltered.length === 0 ? (
            <div className="modal-empty-state">
              <div className="modal-empty-icon">🔍</div>
              <h4 className="modal-empty-title">
                {searchTerm
                  ? "No tracked problem found"
                  : activeTab === "Attempting"
                  ? "No attempting problems found"
                  : "No completed problems found"}
              </h4>
              <p className="modal-empty-desc">
                {searchTerm
                  ? "You don't have this problem in either your Attempting or Completed list. You might want to attempt it first."
                  : "There are no problems matching the selected tab filter."}
              </p>
              {searchTerm && (
                <button className="btn-secondary" onClick={() => setSearchTerm("")}>
                  Clear search
                </button>
              )}
            </div>
          ) : (
            searchFiltered.map((problem) => (
              <div key={problem.id || problem.number || problem.name} className="modal-problem-row">
                <div className="modal-problem-left">
                  <div className="modal-problem-title-row">
                    <span className="problem-num-tag">#{problem.number}</span>
                    <span className="title-dot">·</span>
                    <span className="problem-modal-name">{problem.name}</span>
                  </div>
                  <div className="modal-problem-tags">
                    <span className={`badge ${getDiffBadgeClass(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                    {problem.pattern && (
                      <span className="badge badge-purple">{problem.pattern}</span>
                    )}
                    {problem.source && (
                      <span className="badge badge-neutral">{problem.source}</span>
                    )}
                  </div>
                </div>

                <div className="modal-problem-right">
                  <span className={`badge ${getStatusBadgeClass(problem.status)}`}>
                    {problem.status === "Solved" ? "Completed" : problem.status}
                  </span>
                  {problem.time && <span className="modal-problem-time">{problem.time}</span>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ProblemBrowserModal;
