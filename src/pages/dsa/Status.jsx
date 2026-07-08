import {Link} from 'react-router-dom';
import DSANavbar from "./dsa-components/DSANavbar";
import StatsGrid from "./dsa-components/StatsGrid";
import Heatmap from "./dsa-components/Heatmap";
import ProblemList from "./dsa-components/ProblemList";
//import DailyProgress from "./dsa-components/DailyProgress";
//import ProblemSection from "./dsa-components/ProblemSection";
//import DashboardHeader from "./dsa-components/DashboardHeader";


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