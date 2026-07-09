import "./StatsCard.css";

function StatCard({ icon, title, value, subtitle, description, color }) {

    return (

        <div className="statCard">

            <div className="statTop">

                <div className={`cardIcon ${color}`}>
                    {icon}
                </div>

                <div className="statHeading">
                    <h3>{title}</h3>
                </div>

            </div>

            <div className="statValue">

                {value}

                <span>{subtitle}</span>

            </div>

            <p className="statDescription">

                {description}

            </p>

        </div>

    );

}

export default StatCard;