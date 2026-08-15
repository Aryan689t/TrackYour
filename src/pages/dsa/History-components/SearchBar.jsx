import React from "react";
import "./SearchBar.css";

function SearchBar({ search = "", onSearch }) {
  return (
    <div className="searchBar">
      <input
        type="text"
        className="input-standard"
        placeholder="🔍 Search by problem or pattern..."
        value={search}
        onChange={(e) => onSearch && onSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;