import "./ProblemCard.css";

function ProblemCard({ name, difficulty, pattern, time }) {

    return (

        <div className="problemCard">

            <div className="problemLeft">

                <h3>{name}</h3>

                <div className="problemTags">

                    <span className={`difficulty ${difficulty.toLowerCase()}`}>
                        {difficulty}
                    </span>

                    <span className="pattern">
                        {pattern}
                    </span>

                </div>

            </div>

            <p className="problemTime">
                {time}
            </p>

        </div>

    );

}

export default ProblemCard;