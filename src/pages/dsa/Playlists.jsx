import {Link} from 'react-router-dom';
import DSANavbar from "./status-components/DSANavbar";

import PlaylistHeader from "./playlists-components/PlaylistHeader";
import PlaylistToolbar from "./playlists-components/PlaylistToolbar";
import PlaylistGrid from "./playlists-components/PlaylistGrid";
import CategorySection from "./playlists-components/CategorySection";

import "./Playlists.css";

function Playlists() {

    const playlists = [

    {
        title: "Blind 75",
        icon: "📘",
        count: 75,
        solved: 39,
        description: "Essential coding interview problems every developer should master.",
        updated: "Today",
        color:"blue"
    },

    {
        title: "Amazon OA",
        icon: "💼",
        count: 48,
        solved: 21,
        description: "Frequently asked Amazon online assessment and interview questions.",
        updated: "Yesterday",
        color:"orange"
    },

    {
        title: "Revision",
        icon: "🔥",
        count: 31,
        solved: 17,
        description: "Problems marked for revision to strengthen weak concepts.",
        updated: "2 days ago",
        color:"red"
    },

    {
        title: "Graphs",
        icon: "🕸️",
        count: 22,
        solved: 0,
        description: "Graph algorithms covering BFS, DFS and shortest paths.",
        updated: "Today",
        color:"purple"
    }

];
    return (
        <>
            <DSANavbar/>
            <main className="playlistPage">
                <PlaylistHeader/>
                <PlaylistToolbar/>
                <PlaylistGrid
                    playlists={playlists}
                />
                <CategorySection/>
            </main>
        </>
    );
}

export default Playlists;