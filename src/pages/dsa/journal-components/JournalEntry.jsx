import React from "react";
import "./JournalEntry.css";

function JournalEntry({
  date,
  month,
  year,
  day,
  title,
  content,
  tags,
  edited
}) {
  return (
    <div className="journalEntry">
      <div className="entryDate">
        <h2>{date}</h2>
        <span>{month} {year}</span>
        <p>{day}</p>
      </div>
      <div className="entryContent">
        <div className="entryTop">
          <h3>{title}</h3>
          <button className="entryMenu" aria-label="Entry Actions">•••</button>
        </div>
        <p className="entryText">{content}</p>
        <div className="entryBottom">
          <div className="entryTags">
            {tags.map((tag, index) => (
              <span key={index} className="badge badge-purple">
                {tag}
              </span>
            ))}
          </div>
          <small>Edited {edited}</small>
        </div>
      </div>
    </div>
  );
}

export default JournalEntry;