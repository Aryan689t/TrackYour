import {Link} from 'react-router-dom';
import DSANavbar from "./status-components/DSANavbar";
import HistoryHeader from "./history-components/HistoryHeader";
import SearchBar from "./history-components/SearchBar";
import FilterBar from "./history-components/FilterBar";
import HistoryTable from "./history-components/HistoryTable";
import RevisionTip from "./history-components/RevisionTip";

import "./History.css";
function History(){
    const history = [
        {
            date:"08 Jul 2026",
            problem:"Two Sum",
            difficulty:"Easy",
            pattern:"Array",
            status:"Solved",
            source:"LeetCode"
        },
        {
            date:"07 Jul 2026",
            problem:"Word Ladder",
            difficulty:"Hard",
            pattern:"Graph",
            status:"Attempting",
            source:"LeetCode"
        },
        {
            date:"06 Jul 2026",
            problem:"Merge Two Sorted Lists",
            difficulty:"Easy",
            pattern:"Linked List",
            status:"Solved",
            source:"LeetCode"
        },
        {
            date:"05 Jul 2026",
            problem:"Group Anagrams",
            difficulty:"Medium",
            pattern:"Hash Map",
            status:"Solved",
            source:"LeetCode"
        }
    ];
    return(
        <>
            <DSANavbar/>
            <main className="historyPage">
                <HistoryHeader/>
                <SearchBar/>
                <FilterBar/>
                <HistoryTable history={history}/>
                <RevisionTip/>
            </main>
        </>
    );
}

export default History;