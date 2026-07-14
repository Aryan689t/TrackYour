import "./FilterBar.css";

const RELATIONSHIPS = ["All","Friend","Mentor","Senior","Recruiter","Alumni"];

function FilterBar({ activeFilter, onFilter, sortBy, onSort }){
    return(
    <div className="filterBar">
        <div className="filterChips">
            {RELATIONSHIPS.map((rel)=>(
                <button
                    key={rel}
                    className={`filterChip ${activeFilter===rel ? "active" : ""}`}
                    onClick={()=>onFilter(rel)}
                >
                    {rel}
                </button>
            ))}
        </div>

        <div className="sortWrap">
            <label htmlFor="sort">Sort by</label>
            <select id="sort" value={sortBy} onChange={(e)=>onSort(e.target.value)}>
                <option value="recent">Recently Added</option>
                <option value="name">Name (A-Z)</option>
                <option value="company">Company</option>
            </select>
        </div>
    </div>
    )
}
export default FilterBar
