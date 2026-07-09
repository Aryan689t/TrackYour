import HistoryRow from "./HistoryRow";
import "./HistoryTable.css";

function HistoryTable({ history }) {

    return (
        <div className="historyTable">
            <div className="tableHeader">
                <div>Date</div>
                <div>Problem</div>
                <div>Difficulty</div>
                <div>Pattern</div>
                <div>Status</div>
                <div>Source</div>
            </div>
            <div className="tableBody">
                {
                    history.map((problem, index) => (
                        <HistoryRow
                            key={index}
                            date={problem.date}
                            problem={problem.problem}
                            difficulty={problem.difficulty}
                            pattern={problem.pattern}
                            status={problem.status}
                            source={problem.source}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default HistoryTable;