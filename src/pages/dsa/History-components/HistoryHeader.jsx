import "./HistoryHeader.css";

function HistoryHeader(){
    return(
        <div className="historyHeader">
            <div className="historyTitle">
                <span>03</span>
                <h1>History</h1>
            </div>
            <p>
                The full, permanent log of every problem you've ever touched
            </p>
        </div>
    );
}

export default HistoryHeader;