import StatCard from "./StatsCard.jsx";
import './StatsGrid.css';

function StatsGrid(){

    return(<div className="statsGrid">
    <StatCard
    icon="🔥"
    title="Current Streak"
    value="37"
    subtitle=" days"
    description="Keep it up!"
    color="green"
/>

<StatCard
    icon="🏆"
    title="Longest Streak"
    value="103"
    subtitle=" days"
    description="Personal Best"
    color="purple"
/>

<StatCard
    icon="📚"
    title="Solved"
    value="281"
    subtitle=" problems"
    description="Across all topics"
    color="blue"
/>

<StatCard
    icon="🟢"
    title="Easy"
    value="120"
    subtitle=""
    description="Solved"
    color="lightgreen"
/>

<StatCard
    icon="🟡"
    title="Medium"
    value="130"
    subtitle=""
    description="Solved"
    color="orange"
/>

<StatCard
    icon="🔴"
    title="Hard"
    value="31"
    subtitle=""
    description="Solved"
    color="red"
/></div>

    )

}

export default StatsGrid;