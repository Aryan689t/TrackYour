import React from "react";
import "./PlaylistCard.css";

function PlaylistCard({
  title,
  icon,
  count,
  description,
  updated,
  create
}) {
  if (create) {
    return (
      <div className="playlistCard createCard">
        <div className="plusIcon">+</div>
        <h3>Create Playlist</h3>
        <p>Organize problems into your own custom collections.</p>
      </div>
    );
  }

  return (
    <div className="playlistCard">
      <div className="playlistTop">
        <div className="playlistInfo">
          <span className="badge badge-purple" style={{ fontSize: 11 }}>
            {icon}
          </span>
          <div>
            <h3>{title}</h3>
            <p>{count} Problems</p>
          </div>
        </div>
        <button className="playlistMenu" aria-label="Playlist Options">
          •••
        </button>
      </div>

      <div className="playlistBottom">
        <span>Updated {updated}</span>
        <button>Open →</button>
      </div>
    </div>
  );
}

export default PlaylistCard;