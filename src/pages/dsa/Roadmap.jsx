import React from "react";
import AppShell from "../../components/layout/AppShell.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import "./Roadmap.css";

function Roadmap() {
  const topics = [
    { title: "Arrays & Hashing", count: "15 Problems", status: "In Progress", isStarted: true },
    { title: "Two Pointers & Sliding Window", count: "12 Problems", status: "Not Started", isStarted: false },
    { title: "Stack & Queue", count: "10 Problems", status: "Not Started", isStarted: false },
    { title: "Trees & Graphs", count: "25 Problems", status: "Not Started", isStarted: false },
    { title: "Dynamic Programming", count: "20 Problems", status: "Not Started", isStarted: false }
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
            <div key={index} className="topic-card">
              <div className="topic-main-info">
                <span className="topic-num">{index + 1}</span>
                <div className="topic-title-box">
                  <h3 className="topic-title">{topic.title}</h3>
                  <span className="topic-sub">{topic.count}</span>
                </div>
              </div>

              <div className="topic-meta-right">
                <span className={`badge ${topic.isStarted ? "badge-purple" : "badge-neutral"}`}>
                  {topic.status}
                </span>
                <span className="topic-link">Explore module →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

export default Roadmap;