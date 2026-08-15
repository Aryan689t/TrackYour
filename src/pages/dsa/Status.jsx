import React, { useState } from "react";
import AppShell from "../../components/layout/AppShell.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import StatsGrid from "./status-components/StatsGrid";
import Heatmap from "./status-components/Heatmap";
import ProblemList from "./status-components/ProblemList";
import ProblemBrowserModal from "./status-components/ProblemBrowserModal";
import "./Status.css";

function Status() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState("All");

  const attempting = [
    { id: "1", number: "1", name: "Two Sum", difficulty: "Easy", pattern: "Array", source: "LeetCode", status: "Attempting", time: "Today" },
    { id: "15", number: "15", name: "3Sum", difficulty: "Medium", pattern: "Two Pointers", source: "LeetCode", status: "Attempting", time: "Today" },
    { id: "20", number: "20", name: "Valid Parentheses", difficulty: "Easy", pattern: "Stack", source: "LeetCode", status: "Attempting", time: "Yesterday" },
    { id: "53", number: "53", name: "Maximum Subarray", difficulty: "Medium", pattern: "Array", source: "LeetCode", status: "Attempting", time: "Yesterday" },
    { id: "121", number: "121", name: "Best Time to Buy and Sell Stock", difficulty: "Easy", pattern: "Array", source: "LeetCode", status: "Attempting", time: "2 days ago" },
    { id: "125", number: "125", name: "Valid Palindrome", difficulty: "Easy", pattern: "Two Pointers", source: "LeetCode", status: "Attempting", time: "2 days ago" },
    { id: "127", number: "127", name: "Word Ladder", difficulty: "Hard", pattern: "Graph", source: "LeetCode", status: "Attempting", time: "3 days ago" },
    { id: "141", number: "141", name: "Linked List Cycle", difficulty: "Easy", pattern: "Linked List", source: "LeetCode", status: "Attempting", time: "3 days ago" },
    { id: "155", number: "155", name: "Min Stack", difficulty: "Medium", pattern: "Stack", source: "LeetCode", status: "Attempting", time: "4 days ago" },
    { id: "200", number: "200", name: "Number of Islands", difficulty: "Medium", pattern: "Graph", source: "LeetCode", status: "Attempting", time: "5 days ago" },
    { id: "215", number: "215", name: "Kth Largest Element in an Array", difficulty: "Medium", pattern: "Heap", source: "LeetCode", status: "Attempting", time: "1 week ago" },
    { id: "322", number: "322", name: "Coin Change", difficulty: "Medium", pattern: "Dynamic Programming", source: "LeetCode", status: "Attempting", time: "1 week ago" },
    { id: "347", number: "347", name: "Top K Frequent Elements", difficulty: "Medium", pattern: "Hash Map", source: "LeetCode", status: "Attempting", time: "2 weeks ago" }
  ];

  const completed = [
    { id: "21", number: "21", name: "Merge Two Sorted Lists", difficulty: "Easy", pattern: "Linked List", source: "LeetCode", status: "Solved", time: "2 days ago" },
    { id: "49", number: "49", name: "Group Anagrams", difficulty: "Medium", pattern: "Hash Map", source: "LeetCode", status: "Solved", time: "3 days ago" },
    { id: "70", number: "70", name: "Climbing Stairs", difficulty: "Easy", pattern: "Dynamic Programming", source: "LeetCode", status: "Solved", time: "3 days ago" },
    { id: "94", number: "94", name: "Binary Tree Inorder Traversal", difficulty: "Easy", pattern: "Tree", source: "LeetCode", status: "Solved", time: "4 days ago" },
    { id: "100", number: "100", name: "Same Tree", difficulty: "Easy", pattern: "Tree", source: "LeetCode", status: "Solved", time: "4 days ago" },
    { id: "102", number: "102", name: "Binary Tree Level Order Traversal", difficulty: "Medium", pattern: "Tree", source: "LeetCode", status: "Solved", time: "5 days ago" },
    { id: "104", number: "104", name: "Maximum Depth of Binary Tree", difficulty: "Easy", pattern: "Tree", source: "LeetCode", status: "Solved", time: "5 days ago" },
    { id: "169", number: "169", name: "Majority Element", difficulty: "Easy", pattern: "Array", source: "LeetCode", status: "Solved", time: "6 days ago" },
    { id: "206", number: "206", name: "Reverse Linked List", difficulty: "Easy", pattern: "Linked List", source: "LeetCode", status: "Solved", time: "1 week ago" },
    { id: "217", number: "217", name: "Contains Duplicate", difficulty: "Easy", pattern: "Array", source: "LeetCode", status: "Solved", time: "1 week ago" },
    { id: "226", number: "226", name: "Invert Binary Tree", difficulty: "Easy", pattern: "Tree", source: "LeetCode", status: "Solved", time: "1 week ago" },
    { id: "242", number: "242", name: "Valid Anagram", difficulty: "Easy", pattern: "Hash Map", source: "LeetCode", status: "Solved", time: "1 week ago" },
    { id: "268", number: "268", name: "Missing Number", difficulty: "Easy", pattern: "Array", source: "LeetCode", status: "Solved", time: "2 weeks ago" },
    { id: "283", number: "283", name: "Move Zeroes", difficulty: "Easy", pattern: "Two Pointers", source: "LeetCode", status: "Solved", time: "2 weeks ago" },
    { id: "349", number: "349", name: "Intersection of Two Arrays", difficulty: "Easy", pattern: "Hash Map", source: "LeetCode", status: "Solved", time: "2 weeks ago" },
    { id: "704", number: "704", name: "Binary Search", difficulty: "Easy", pattern: "Binary Search", source: "LeetCode", status: "Solved", time: "2 weeks ago" },
    { id: "733", number: "733", name: "Flood Fill", difficulty: "Easy", pattern: "Graph", source: "LeetCode", status: "Solved", time: "3 weeks ago" },
    { id: "876", number: "876", name: "Middle of the Linked List", difficulty: "Easy", pattern: "Linked List", source: "LeetCode", status: "Solved", time: "3 weeks ago" }
  ];

  const allProblems = [...attempting, ...completed];

  const handleOpenModal = (tab = "All") => {
    setModalTab(tab);
    setModalOpen(true);
  };

  return (
    <AppShell containerSize="wide">
      <div className="status-page-root">
        <PageHeader
          eyebrow="DSA Progress"
          title="Status"
          description="Overview of your algorithm problem solving stats, activity heatmap, and active practice queues."
        />

        <StatsGrid />

        <Heatmap />

        <div className="problemSection">
          <ProblemList
            title="Attempting"
            problems={attempting}
            onViewAll={() => handleOpenModal("Attempting")}
          />
          <ProblemList
            title="Completed"
            problems={completed}
            onViewAll={() => handleOpenModal("Completed")}
          />
        </div>
      </div>

      <ProblemBrowserModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialTab={modalTab}
        problems={allProblems}
      />
    </AppShell>
  );
}

export default Status;