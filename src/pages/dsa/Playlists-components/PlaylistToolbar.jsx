import React from "react";
import "./PlaylistToolbar.css";

function PlaylistToolbar() {
  return (
    <div className="playlistToolbar">
      <input
        type="text"
        placeholder="Search playlists..."
        className="input-standard playlistSearch"
      />
      <select className="input-standard playlistSort">
        <option>Recently Updated</option>
        <option>Name (A-Z)</option>
        <option>Name (Z-A)</option>
        <option>Most Problems</option>
      </select>
    </div>
  );
}

export default PlaylistToolbar;