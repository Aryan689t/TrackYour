 import {Link} from "react-router-dom";
 import Semester from "./Semester.jsx";
 function Academics(){

    return(
    <>

    <Link to="/">
    <button>←</button>
    </Link>

    <h2>academics</h2>
    <Link to="/Semester"><button>add new sem</button></Link>
    </>
    )
}
export default Academics