import "./FilterBar.css";

function FilterBar(){

    return(

        <div className="filterBar">

            <select>

                <option>All Difficulty</option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>

            </select>

            <select>

                <option>All Status</option>
                <option>Solved</option>
                <option>Attempting</option>
                <option>Revisit</option>

            </select>

            <select>

                <option>Newest First</option>
                <option>Oldest First</option>
                <option>A-Z</option>
                <option>Z-A</option>

            </select>

        </div>

    );

}

export default FilterBar;