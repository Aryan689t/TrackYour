import "./NetworkStats.css";

function NetworkStats({ stats }){
    return(
    <div className="networkStats">
        {stats.map((stat,index)=>(
            <div className="netStatCard" key={index}>
                <div className={`netStatIcon ${stat.color}`}>
                    {stat.icon}
                </div>
                <div className="netStatBody">
                    <h3>{stat.label}</h3>
                    <div className="netStatValue">{stat.value}</div>
                </div>
            </div>
        ))}
    </div>
    )
}
export default NetworkStats
