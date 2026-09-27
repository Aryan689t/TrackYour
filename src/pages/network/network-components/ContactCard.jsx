import React from "react";
import "./ContactCard.css";

function initials(name) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const REL_COLORS = {
  Friend: "badge-success",
  Mentor: "badge-purple",
  Senior: "badge-info",
  Recruiter: "badge-warning",
  Alumni: "badge-neutral"
};

function ContactCard({ contact, onRemove }) {
  return (
    <div className="premium-card contactCard">
      <div className="contactCardHead">
        <div className="avatar">{initials(contact.name)}</div>
        <div className="contactHeadInfo">
          <h3>{contact.name}</h3>
          <p className="contactRole">{contact.role}</p>
          <span className="contactCompany">{contact.company}</span>
        </div>
        <span className={`badge ${REL_COLORS[contact.relationship] || "badge-purple"}`}>
          {contact.relationship}
        </span>
      </div>

      <div className="tagRow">
        {contact.tags.map((tag, index) => (
          <span className="contactTag" key={index}>#{tag}</span>
        ))}
      </div>

      {contact.reminders && contact.reminders.length > 0 && (
        <div className="reminderRow">
          {contact.reminders.map((rem, index) => (
            <span className="badge badge-warning" key={index}>
              {rem}
            </span>
          ))}
        </div>
      )}

      <div className="contactActions">
        <a className="btn-primary" style={{ flex: 1, textDecoration: 'none' }} href={contact.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a className="btn-secondary" style={{ flex: 1, textDecoration: 'none' }} href={`mailto:${contact.email}`}>
          Email
        </a>
        <button className="btn-ghost" onClick={() => onRemove(contact.id)}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default ContactCard;

