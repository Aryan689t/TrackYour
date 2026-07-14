import "./NetworkHeader.css";

function NetworkHeader({ search, onSearch }){
    return(
    <header className="networkHeader">
        <div className="headerTop">
            <div className="headerTitle">
                <h1>My Network</h1>
                <p>Connect, track and grow your professional relationships.</p>
            </div>
        </div>

        <div className="searchBar">
            <span className="searchIcon">🔍</span>
            <input
                type="text"
                placeholder="Search by name, role, company or tag..."
                value={search}
                onChange={(e)=>onSearch(e.target.value)}
            />
        </div>
    </header>
    )
}
export default NetworkHeader
