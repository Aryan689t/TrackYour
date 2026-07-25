import {Link} from "react-router-dom";
import Semester from "./Semester.jsx";
import "./Academics.css";

function Academics() {
    return(
        <div className="academics-page page-container">
            <div className="page-content academics-content">
                <div className="academics-header">
                    <Link to="/" className="btn-secondary">
                        ← Back to Home
                    </Link>
                    <h2>Academics</h2>
                </div>

                <div className="semester-grid">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <Link to={`/Semester/${num}`} key={num} className="premium-card sem-card">
                            <h3>Semester {num}</h3>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Academics;