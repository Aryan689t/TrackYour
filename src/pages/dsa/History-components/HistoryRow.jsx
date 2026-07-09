import "./HistoryRow.css";

function HistoryRow({

    date,
    problem,
    difficulty,
    pattern,
    status,
    source

}){

    return(

        <div className="historyRow">

            <div>{date}</div>

            <div className="problemName">
                {problem}
            </div>

            <div>
                <span className={`difficulty ${difficulty.toLowerCase()}`}>
                    {difficulty}
                </span>
            </div>

            <div>{pattern}</div>

            <div>
                <span className={`status ${status.toLowerCase()}`}>
                    {status}
                </span>
            </div>

            <div>{source}</div>

        </div>

    );

}

export default HistoryRow;