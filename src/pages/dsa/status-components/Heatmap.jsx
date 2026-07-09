import "./Heatmap.css";

function Heatmap() {

    const boxes = Array(180).fill(0);

    return (
        <div className="heatmapCard">
            <div className="heatmapHeader">
                <h2>Submission Heatmap</h2>
                <button>Last 6 Months ▼</button>
            </div>
            <div className="heatmapGrid">
                {
                    boxes.map((_, index) => (
                        <div
                            key={index}
                            className="heatCell"
                        ></div>
                    ))
                }
            </div>
            <div className="heatmapFooter">
                <span>Less</span>
                <div className="legend">
                    <div className="heatCell"></div>
                    <div className="heatCell level1"></div>
                    <div className="heatCell level2"></div>
                    <div className="heatCell level3"></div>
                    <div className="heatCell level4"></div>
                </div>
                <span>More</span>
            </div>
        </div>
    );
}

export default Heatmap;