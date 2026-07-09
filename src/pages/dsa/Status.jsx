import {Link} from 'react-router-dom';
import DSANavbar from "./status-components/DSANavbar";
import StatsGrid from "./status-components/StatsGrid";
import Heatmap from "./status-components/Heatmap";
import ProblemList from "./status-components/ProblemList";
//import DailyProgress from "./status-components/DailyProgress";
//import ProblemSection from "./status-components/ProblemSection";
//import DashboardHeader from "./status-components/DashboardHeader";


import './Status.css'

function Status(){
     const attempting=[
        {
            name:"Two Sum",
            difficulty:"Easy",
            pattern:"Array",
            time:"Today"
        },
        {
            name:"Word Ladder",
            difficulty:"Hard",
            pattern:"Graph",
            time:"Yesterday"
        }
    ];

    const completed=[
        {
            name:"Merge Sorted Lists",
            difficulty:"Easy",
            pattern:"Linked List",
            time:"2 days ago"
        },
        {
            name:"Group Anagrams",
            difficulty:"Medium",
            pattern:"Hash Map",
            time:"3 days ago"
        }
    ];
    
    return(
        <>
             <DSANavbar/>
            <main className="statusPage">
                <StatsGrid/>
                <Heatmap/>
                <div className="problemSection">
                    <ProblemList
                        title="Attempting"
                        problems={attempting}
                    />
                    <ProblemList
                        title="Completed"
                        problems={completed}
                    />
                </div>
            </main>

        </>
    );
}

export default Status;