 import {Link,useParams} from "react-router-dom";
 function DSA(){

    return(
    <>

    <Link to="/">
    <button>←</button>
    </Link>

    <div className="dsaDashboard">

    <div className="heading"><h2>DSA</h2></div>

    <div>
       <Link><div className="status"><p>Status</p></div></Link> 
        <Link><div className="history"><p>History</p></div></Link>
        <Link><div className="playlists"><p>playlists</p></div></Link>
        <Link><div className="roadmap"><p>Roadmap</p></div></Link>
        <Link><div className="journal"><p>Journal</p></div></Link>
    </div>
    
    </div>
    
    </>
    )
}
export default DSA