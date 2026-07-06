import './Heatmap.css';
function Heatmap(){

    const boxes = Array(180).fill(0);

    return(

        <div className="heatmap">

            <h2>Submission Heatmap</h2>

            <div className="heatmapGrid">

                {
                    boxes.map((_,index)=>(
                        <div
                            key={index}
                            className="heatCell"
                        ></div>
                    ))
                }

            </div>

        </div>

    );
}

export default Heatmap;