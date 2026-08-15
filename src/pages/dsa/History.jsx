import React, { useState } from "react";
import AppShell from "../../components/layout/AppShell.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import SearchBar from "./history-components/SearchBar";
import FilterBar from "./history-components/FilterBar";
import HistoryTable from "./history-components/HistoryTable";
import RevisionTip from "./history-components/RevisionTip";
import "./History.css";

function History() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const initialHistory = [
    {
      date: "08 Jul 2026",
      problem: "Two Sum",
      difficulty: "Easy",
      pattern: "Array",
      status: "Solved",
      source: "LeetCode"
    },
    {
      date: "07 Jul 2026",
      problem: "Word Ladder",
      difficulty: "Hard",
      pattern: "Graph",
      status: "Attempting",
      source: "LeetCode"
    },
    {
      date: "06 Jul 2026",
      problem: "Merge Two Sorted Lists",
      difficulty: "Easy",
      pattern: "Linked List",
      status: "Solved",
      source: "LeetCode"
    },
    {
      date: "05 Jul 2026",
      problem: "Group Anagrams",
      difficulty: "Medium",
      pattern: "Hash Map",
      status: "Solved",
      source: "LeetCode"
    }
  ];

  const filteredHistory = initialHistory.filter((item) => {
    const matchesSearch =
      item.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.pattern.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      activeFilter === "All" ||
      item.difficulty.toLowerCase() === activeFilter.toLowerCase() ||
      item.status.toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <AppShell containerSize="wide">
      <div className="history-page-root">
        <PageHeader
          eyebrow="DSA Workspace"
          title="History"
          description="Track and review your past submission attempts, patterns practiced, and revision logs."
        />

        <div className="history-controls-row">
          <SearchBar search={searchTerm} onSearch={setSearchTerm} />
          <FilterBar activeFilter={activeFilter} onFilter={setActiveFilter} />
        </div>

        <HistoryTable history={filteredHistory} />
        <RevisionTip />
      </div>
    </AppShell>
  );
}

export default History;