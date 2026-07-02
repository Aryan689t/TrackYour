 import {Link} from "react-router-dom";
 import Semester from "./Semester.jsx";
 import "./Academics.css";
 function Academics(){
    

    return(
    <div className="academics-page">

    <Link to="/">
    <button>←</button>
    </Link>

    <h2>academics</h2>
    <div className="semester-grid">
    <Link to="/Semester/1"><button>Semester 1</button></Link>
    <Link to="/Semester/2"><button>Semester 2</button></Link>
    <Link to="/Semester/3"><button>Semester 3</button></Link>
    <Link to="/Semester/4"><button>Semester 4</button></Link>
    <Link to="/Semester/5"><button>Semester 5</button></Link>
    <Link to="/Semester/6"><button>Semester 6</button></Link>
    <Link to="/Semester/7"><button>Semester 7</button></Link>
    <Link to="/Semester/8"><button>Semester 8</button></Link>
    </div>


    </div>
    )
}
export default Academics