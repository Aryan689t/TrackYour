import React from "react";
import AppShell from "../../components/layout/AppShell.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import "./Roadmap.css";

function Roadmap() {
  const topics = [
    { title: "Arrays & Hashing", count: "15 Problems", status: "In Progress" },
    { title: "Two Pointers & Sliding Window", count: "12 Problems", status: "Not Started" },
    { title: "Stack & Queue", count: "10 Problems", status: "Not Started" },
    { title: "Trees & Graphs", count: "25 Problems", status: "Not Started" },
    { title: "Dynamic Programming", count: "20 Problems", status: "Not Started" }
  ];

  return (
    <AppShell containerSize="medium-wide">
      <div className="roadmap-page-root">
        <PageHeader
          eyebrow="DSA Workspace"
          title="Roadmap"
          description="Master algorithms step-by-step with structured topic modules and recommended problem sequences."
        />

        <div className="roadmap-overview-grid">
          {topics.map((topic, index) => (
            <div key={index} className="premium-card topic-card">
              <div className="topic-header">
                <span className="topic-num">0{index + 1}</span>
                <span className="badge badge-purple">{topic.count}</span>
              </div>
              <h3 className="topic-title">{topic.title}</h3>
              <div className="topic-footer">
                <span className="badge badge-neutral">{topic.status}</span>
                <span className="topic-link">Explore →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

export default Roadmap;