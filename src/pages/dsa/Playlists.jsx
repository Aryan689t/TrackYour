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
        description: "Essential coding interview problems every developer should do.",
        updated: "yesterday",
        color:"purple"
    },

    {
        title: "Amazon ",
        icon: "💼",
        count: 34,
        solved: 21,
        description: "Frequently asked Amazon online assessment and interview questions.",
        updated: "Yesterday",
        color:"purple"
    },

    {
        title: "Revise",
        icon: "🔥",
        count: 31,
        solved: 16,
        description: "Problems marked for revision to strengthen weak concepts.",
        updated: "5 days ago",
        color:"purple"
    },

    {
        title: "Graphs",
        icon: "🕸️",
        count: 22,
        solved: 2,
        description: "Graph algorithms covering BFS, DFS and shortest paths.",
        updated: "Today",
        color:"purple"
    }

];
    return (
        <div className="page-container">
            <DSANavbar/>
            <main className="playlistPage page-content">
                <PlaylistHeader/>
                <PlaylistToolbar/>
                <PlaylistGrid
                    playlists={playlists}
                />
                <CategorySection/>
            </main>
        </div>
    );}

export default Playlists;