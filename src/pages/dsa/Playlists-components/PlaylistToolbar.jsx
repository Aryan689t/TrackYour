import "./PlaylistToolbar.css";

function PlaylistToolbar(){

    return(

        <div className="playlistToolbar">

            <input
                type="text"
                placeholder="🔍 Search playlists..."
                className="playlistSearch"
            />

            <select className="playlistSort">

                <option>Recently Updated</option>
                <option>Name (A-Z)</option>
                <option>Name (Z-A)</option>
                <option>Most Problems</option>

            </select>

        </div>

    );

}

export default PlaylistToolbar;