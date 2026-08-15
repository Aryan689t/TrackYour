import React from "react";
import "./FilterBar.css";

function FilterBar({ activeFilter = "All", onFilter }) {
  return (
    <div className="filterBar">
      <select
        className="input-standard filter-select"
        value={activeFilter}
        onChange={(e) => onFilter && onFilter(e.target.value)}
      >
        <option value="All">All Filter</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
        <option value="Solved">Solved</option>
        <option value="Attempting">Attempting</option>
      </select>
    </div>
  );
}

export default FilterBar;