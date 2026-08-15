import React from "react";
import AppShell from "../../components/layout/AppShell.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import PlaylistToolbar from "./playlists-components/PlaylistToolbar";
import PlaylistGrid from "./playlists-components/PlaylistGrid";
import CategorySection from "./playlists-components/CategorySection";
import "./Playlists.css";

function Playlists() {
  const playlists = [
    {
      title: "Blind 75",
      icon: "📘",
      count: 75,
      solved: 39,
      description: "Essential coding interview problems every developer should do.",
      updated: "yesterday",
      color: "purple"
    },
    {
      title: "Amazon OA",
      icon: "💼",
      count: 34,
      solved: 25,
      description: "Frequently asked Amazon online assessment and interview questions.",
      updated: "3 days ago",
      color: "purple"
    },
    {
      title: "Revise",
      icon: "🔥",
      count: 31,
      solved: 16,
      description: "Problems marked for revision to strengthen weak concepts.",
      updated: "5 days ago",
      color: "purple"
    },
    {
      title: "Graphs",
      icon: "🕸️",
      count: 22,
      solved: 2,
      description: "Graph algorithms covering BFS, DFS and shortest paths.",
      updated: "Today",
      color: "red"
    }
  ];

  return (
    <AppShell containerSize="wide">
      <div className="playlists-page-root">
        <PageHeader
          eyebrow="DSA Workspace"
          title="Playlists"
          description="Curated problem collections, topic tracks, and revision playlists."
        />
        <PlaylistToolbar />
        <PlaylistGrid playlists={playlists} />
        <CategorySection />
      </div>
    </AppShell>
  );
}

export default Playlists;