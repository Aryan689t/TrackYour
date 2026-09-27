import React from "react";
import CategoryCard from "./CategoryCard";
import "./CategorySection.css";

function CategorySection() {
  const categories = [
    { name: "Arrays", problems: 42 },
    { name: "Dynamic Programming", problems: 31 },
    { name: "Graphs", problems: 18 },
    { name: "Trees", problems: 27 },
    { name: "Sliding Window", problems: 16 },
    { name: "Binary Search", problems: 24 },
    { name: "Greedy", problems: 19 },
    { name: "Hash Map", problems: 29 }
  ];

  return (
    <section className="categorySection">
      <div className="categoryHeader">
        <h2>Auto Categorized Collections</h2>
        <p>Automatically grouped from solved problems.</p>
      </div>
      <div className="categoryGrid">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            name={category.name}
            problems={category.problems}
          />
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
