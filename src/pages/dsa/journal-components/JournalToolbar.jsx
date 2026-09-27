import React from "react";
import "./JournalToolbar.css";

function JournalToolbar() {
  return (
    <div className="journalToolbar">
      <div className="journal-search-wrapper">
        <span className="journal-search-icon">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="text"
          className="journalSearch"
          placeholder="Search journal entries..."
        />
      </div>

      <div className="toolbarRight">
        <select className="journalFilter">
          <option>All Entries</option>
          <option>DSA</option>
          <option>React</option>
          <option>Backend</option>
          <option>Projects</option>
        </select>

        <button className="btn-primary">
          + New Entry
        </button>
      </div>
    </div>
  );
}

export default JournalToolbar;
