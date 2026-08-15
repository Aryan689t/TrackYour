import React, { useState } from "react";
import AppShell from "../../components/layout/AppShell.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import "./projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newProj = {
      id: Date.now(),
      title,
      description,
      techStack: techStack.split(",").map((s) => s.trim()).filter(Boolean)
    };
    setProjects([newProj, ...projects]);
    setTitle("");
    setDescription("");
    setTechStack("");
    setShowAddForm(false);
  };

  return (
    <AppShell containerSize="medium-wide">
      <div className="projects-page-root">
        <PageHeader
          eyebrow="Portfolio & Workspace"
          title="Projects"
          description="Showcase your software projects, track development milestones, and organize your tech stack."
          action={
            <button
              className="btn-primary"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? "Cancel" : "+ Add Project"}
            </button>
          }
        />

        {showAddForm && (
          <form className="premium-card add-project-form" onSubmit={handleAddProject}>
            <h3 className="section-subtitle">Add New Project</h3>
            <div className="form-group">
              <label>Project Title</label>
              <input
                className="input-standard"
                placeholder="e.g. Portfolio Website"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="input-standard textarea-standard"
                placeholder="Short description of the project..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
            <div className="form-group">
              <label>Tech Stack (comma separated)</label>
              <input
                className="input-standard"
                placeholder="e.g. React, Node.js, Vite"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                Save Project
              </button>
            </div>
          </form>
        )}

        {projects.length === 0 ? (
          <EmptyState
            icon="🚀"
            title="No Projects Added Yet"
            description="Build your developer portfolio by adding your projects, tech stacks, and showcase links."
            action={
              !showAddForm && (
                <button
                  className="btn-primary"
                  onClick={() => setShowAddForm(true)}
                >
                  + Add Your First Project
                </button>
              )
            }
          />
        ) : (
          <div className="projects-grid">
            {projects.map((proj) => (
              <div key={proj.id} className="premium-card project-card">
                <h3 className="project-title">{proj.title}</h3>
                <p className="project-desc">{proj.description || "No description provided."}</p>
                <div className="project-tags">
                  {proj.techStack.map((tech, i) => (
                    <span key={i} className="badge badge-purple">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}

export default Projects;