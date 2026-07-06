import Statscard from "./Statscard.jsx";
import './statsGrid.css';

function StatsGrid(){

    return(

        <div className="statsGrid">

            <Statscard
                icon="🔥"
                title="Current Streak"
                value="37"
                subtitle="Days"
            />

            <Statscard
                icon="🏆"
                title="Longest Streak"
                value="103"
                subtitle="Days"
            />

            <Statscard
                icon="📚"
                title="Solved"
                value="281"
                subtitle="Problems"
            />

            <Statscard
                icon="🟢"
                title="Easy"
                value="120"
                subtitle="Solved"
            />

            <Statscard
                icon="🟡"
                title="Medium"
                value="130"
                subtitle="Solved"
            />

            <Statscard
                icon="🔴"
                title="Hard"
                value="31"
                subtitle="Solved"
            />

        </div>

    )

}

export default StatsGrid;