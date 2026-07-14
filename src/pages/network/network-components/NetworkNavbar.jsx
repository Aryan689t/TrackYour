import {Link} from "react-router-dom";
import "./NetworkNavbar.css";

function NetworkNavbar({ activePage, onNavClick, onAddContact }){

    const navItems = [
        { id:"home", label:"Home" },
        { id:"contacts", label:"Contacts" },
        { id:"add", label:"Add Contact" },
        { id:"settings", label:"Settings" }
    ];

    return(
    <>
    <div className="networkSidebar">
        <Link to="/" className="backButton">←</Link>
        <h2>Track<span>Your</span></h2>

        <nav className="navLink">
            {navItems.map((item)=>(
                <div
                    key={item.id}
                    className={`networkNavItem ${activePage===item.id ? "active" : ""}`}
                    onClick={()=>{
                        if(item.id==="add") onAddContact();
                        else onNavClick(item.id);
                    }}
                >
                    <p>{item.label}</p>
                </div>
            ))}
        </nav>

        <div className="sidebarFooter">
            <p>TrackYour(Prog)</p>
            <span>v1.0 · Network</span>
        </div>
    </div>
    </>
    )
}
export default NetworkNavbar
