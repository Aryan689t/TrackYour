import "./SearchBar.css";

function SearchBar() {

    return (
        <div className="searchBar">
            <input
                type="text"
                placeholder="🔍 Search by problem, pattern, difficulty..."
            />
        </div>
    );
}

export default SearchBar;