import React from "react";
import "./SearchBar.css";

function SearchBar({ search = "", onSearch }) {
  return (
    <div className="history-search-wrapper">
      <span className="history-search-icon">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
      <input
        type="text"
        className="history-search-input"
        placeholder="Search by problem or pattern..."
        value={search}
        onChange={(e) => onSearch && onSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;