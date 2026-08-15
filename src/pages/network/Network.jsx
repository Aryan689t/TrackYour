import React, { useState } from "react";
import AppShell from "../../components/layout/AppShell.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import NetworkStats from "./network-components/NetworkStats";
import FilterBar from "./network-components/FilterBar";
import ContactList from "./network-components/ContactList";
import AddContactModal from "./network-components/AddContactModal";
import "./Network.css";

const INITIAL_CONTACTS = [
  {
    id: 1,
    name: "Alice Sharma",
    role: "Senior Software Engineer",
    company: "Microsoft",
    relationship: "Senior",
    tags: ["React", "AI", "Microsoft"],
    reminders: ["Follow up"],
    linkedin: "https://linkedin.com/in/alice",
    email: "alice@microsoft.com",
    phone: "+1 555 0101"
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Engineering Manager",
    company: "Google",
    relationship: "Mentor",
    tags: ["AI", "Hackathon"],
    reminders: ["Wish birthday"],
    linkedin: "https://linkedin.com/in/rahul",
    email: "rahul@google.com",
    phone: "+1 555 0102"
  },
  {
    id: 3,
    name: "Sara Khan",
    role: "Technical Recruiter",
    company: "Amazon",
    relationship: "Recruiter",
    tags: ["Hiring", "React"],
    reminders: ["Follow up"],
    linkedin: "https://linkedin.com/in/sara",
    email: "sara@amazon.com",
    phone: "+1 555 0103"
  },
  {
    id: 4,
    name: "David Lee",
    role: "Alumni · Data Scientist",
    company: "Netflix",
    relationship: "Alumni",
    tags: ["AI", "Microsoft"],
    reminders: [],
    linkedin: "https://linkedin.com/in/david",
    email: "david@netflix.com",
    phone: "+1 555 0104"
  },
  {
    id: 5,
    name: "Priya Nair",
    role: "Frontend Developer",
    company: "Meta",
    relationship: "Friend",
    tags: ["React", "Hackathon"],
    reminders: ["Wish birthday"],
    linkedin: "https://linkedin.com/in/priya",
    email: "priya@meta.com",
    phone: "+1 555 0105"
  },
  {
    id: 6,
    name: "Tom Becker",
    role: "Principal Engineer",
    company: "Microsoft",
    relationship: "Mentor",
    tags: ["Microsoft", "AI"],
    reminders: [],
    linkedin: "https://linkedin.com/in/tom",
    email: "tom@microsoft.com",
    phone: "+1 555 0106"
  },
  {
    id: 7,
    name: "Neha Gupta",
    role: "Product Designer",
    company: "Adobe",
    relationship: "Friend",
    tags: ["Design", "Hackathon"],
    reminders: ["Follow up"],
    linkedin: "https://linkedin.com/in/neha",
    email: "neha@adobe.com",
    phone: "+1 555 0107"
  },
  {
    id: 8,
    name: "Chris Wong",
    role: "Campus Recruiter",
    company: "Apple",
    relationship: "Recruiter",
    tags: ["Hiring"],
    reminders: [],
    linkedin: "https://linkedin.com/in/chris",
    email: "chris@apple.com",
    phone: "+1 555 0108"
  }
];

function Network() {
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("recent");
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddContact = (newContact) => {
    setContacts((prev) => [newContact, ...prev]);
  };

  const handleRemove = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const filtered = contacts
    .filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.role.toLowerCase().includes(search.toLowerCase()) ||
        c.company.toLowerCase().includes(search.toLowerCase()) ||
        (c.tags && c.tags.join(" ").toLowerCase().includes(search.toLowerCase()));
      const matchesFilter = filter === "All" || c.relationship === filter;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "company") return a.company.localeCompare(b.company);
      return 0;
    });

  const stats = [
    { icon: "👥", label: "Total Contacts", value: contacts.length, color: "purple" },
    { icon: "🧭", label: "Mentors", value: contacts.filter((c) => c.relationship === "Mentor").length, color: "purple" },
    { icon: "⭐", label: "Seniors", value: contacts.filter((c) => c.relationship === "Senior").length, color: "purple" },
    { icon: "💼", label: "Recruiters", value: contacts.filter((c) => c.relationship === "Recruiter").length, color: "purple" }
  ];

  return (
    <AppShell containerSize="wide">
      <div className="network-page-root">
        <PageHeader
          eyebrow="Network Workspace"
          title="Network"
          description="Connect, track, and grow your professional relationships, mentors, and industry contacts."
          action={
            <button className="btn-primary" onClick={() => setModalOpen(true)}>
              + Add Contact
            </button>
          }
        />

        <div className="network-search-row">
          <input
            type="text"
            className="input-standard network-search-input"
            placeholder="🔍 Search by name, role, company or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <NetworkStats stats={stats} />

        <div className="networkToolbar">
          <FilterBar
            activeFilter={filter}
            onFilter={setFilter}
            sortBy={sortBy}
            onSort={setSortBy}
          />
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon="👥"
            title="No contacts found"
            description="No contacts match your current search and relationship filter."
          />
        ) : (
          <ContactList contacts={filtered} onRemove={handleRemove} />
        )}
      </div>

      <AddContactModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddContact}
      />
    </AppShell>
  );
}

export default Network;
