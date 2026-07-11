import {Link} from 'react-router-dom';
import DSANavbar from "./status-components/DSANavbar";
import JournalHeader from "./Journal-components/JournalHeader";
import JournalToolbar from "./Journal-components/JournalToolbar";
import JournalTimeline from "./Journal-components/JournalTimeline";
import "./Journal.css";

function Journal(){
    return(
        <>
            <DSANavbar/>
            <main className="journalPage">
                <JournalHeader/>
                <JournalToolbar/>
                <JournalTimeline/>
            </main>
        </>
    );
}

export default Journal;