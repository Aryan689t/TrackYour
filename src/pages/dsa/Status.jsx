import {Link} from 'react-router-dom';
import DSANavbar from "./dsa-components/DSANavbar";
import StatsGrid from "./dsa-components/StatsGrid";
import Heatmap from "./dsa-components/Heatmap";
import ProblemList from "./dsa-components/ProblemList";
import DailyProgress from "./dsa-components/DailyProgress";
import ProblemSection from "./dsa-components/ProblemSection";
import DashboardHeader from "./dsa-components/DashboardHeader";


import './Status.css'

function Status(){
    
    return(
        <>
             <DSANavbar/>
            <main className="statusPage">
                <DashboardHeader/>
                <StatsGrid/>
                <Heatmap/>
                <ProblemSection/>
                <DailyProgress/>
            </main>

        </>
    );
}

export default Status;