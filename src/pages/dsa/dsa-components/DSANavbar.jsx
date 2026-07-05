 import {Link} from "react-router-dom";
import "./DSANavbar.css";
 
 function DSANavbar(){

    return(
    <>

    <div className="dsaDashboard">
    <div>
       <Link to="/Status"><div className="status"><p>Status</p></div></Link> 
        <Link to="/History"><div className="history"><p>History</p></div></Link>
        <Link to="/Playlists"><div className="playlists"><p>playlists</p></div></Link>
        <Link to="/Roadmap"><div className="roadmap"><p>Roadmap</p></div></Link>
        <Link to="/Journal"><div className="journal"><p>Journal</p></div></Link>
    </div>
    </div>
    </>
    )
}
export default DSANavbar