import "./JournalToolbar.css";

function JournalToolbar(){
    return(
        <div className="journalToolbar">
            <input
                type="text"
                className="journalSearch"
                placeholder="🔍 Search journal..."
            />

            <div className="toolbarRight">
                <select className="journalFilter">
                    <option>All Entries</option>
                    <option>DSA</option>
                    <option>React</option>
                    <option>Backend</option>
                    <option>Projects</option>
                </select>

                <button className="newEntryBtn">
                    + New Entry
                </button>
            </div>
        </div>
    );
}

export default JournalToolbar;