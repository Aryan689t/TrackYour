import PlaylistCard from "./PlaylistCard";
import "./PlaylistGrid.css";

function PlaylistGrid({ playlists }) {

    return (

        <div className="playlistGrid">

            <PlaylistCard
                create={true}
            />

            {
                playlists.map((playlist, index) => (

                    <PlaylistCard
    key={index}
    title={playlist.title}
    icon={playlist.icon}
    count={playlist.count}
    description={playlist.description}
    updated={playlist.updated}
/>

                ))
            }

        </div>

    );

}

export default PlaylistGrid;