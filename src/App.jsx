/*import Academics from "./Academics.jsx";
import DSA from "./DSA.jsx";
import Projects from "./projects.jsx";
import Network from "./network.jsx";*/


import {Link} from "react-router-dom";


function App() {
  

  return (
    <>
    <div className="heroComp">
    <h2>Track Your</h2>
    <div className="buttons">
    <Link to="/academics">
         <button>Academics</button>
    </Link>
     <Link to="/Status">
         <button>DSA</button>
    </Link>
     <Link to="/projects">
         <button>projects</button>
    </Link>
    <Link to="/network">
         <button>Network</button>
    </Link>
    </div>
    </div>
    </>
  );
}

export default App
