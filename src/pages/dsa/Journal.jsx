import React from "react";
import AppShell from "../../components/layout/AppShell.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import JournalToolbar from "./journal-components/JournalToolbar";
import JournalTimeline from "./journal-components/JournalTimeline";
import "./Journal.css";

function Journal() {
  return (
    <AppShell containerSize="medium-wide">
      <div className="journal-page-root">
        <PageHeader
          eyebrow="DSA Workspace"
          title="Journal"
          description="Log daily learnings, intuition notes, key takeaways, and problem solving observations."
        />
        <JournalToolbar />
        <JournalTimeline />
      </div>
    </AppShell>
  );
}

export default Journal;