import React from "react";
import "./CategoryCard.css";

function CategoryCard({ name, problems }) {
  return (
    <div className="category-row-item">
      <div className="category-row-left">
        <span className="category-row-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        </span>
        <span className="category-row-title">{name}</span>
      </div>

      <div className="category-row-right">
        <span className="category-row-count">{problems} problems</span>
        <span className="category-row-arrow">→</span>
      </div>
    </div>
  );
}

export default CategoryCard;