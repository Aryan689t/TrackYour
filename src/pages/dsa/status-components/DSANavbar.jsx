 import {Link} from "react-router-dom";
import "./DSANavbar.css";
 
 function DSANavbar(){

    return(
    <>
    <div className="dsaDashboard">
            <Link to="/" className="backButton">←</Link>
        <h2>DSA Tracker</h2>
    <div className="navLink">
       <Link to="/Status"><div className="dsanavitem"><p>Status</p></div></Link> 
        <Link to="/History"><div className="dsanavitem"><p>History</p></div></Link>
        <Link to="/Playlists"><div className="dsanavitem"><p>playlists</p></div></Link>
        <Link to="/Roadmap"><div className="dsanavitem"><p>Roadmap</p></div></Link>
        <Link to="/Journal"><div className="dsanavitem"><p>Journal</p></div></Link>
    </div>

    </div>
    </>
    )
}
export default DSANavbar