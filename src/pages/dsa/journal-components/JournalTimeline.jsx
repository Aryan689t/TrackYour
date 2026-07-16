import "./JournalTimeline.css";
import JournalEntry from "./JournalEntry";

function JournalTimeline(){

    const entries=[
        {
            date:"11",
            month:"JUL",
            year:"2026",
            day:"Friday",
            title:"Understanding React Props",
            content:"Today I finally understood how props work in React. The idea of passing data from parent to child components makes much more sense now.",
            tags:["React","Frontend"],
            edited:"Today"
        },
        {
            date:"09",
            month:"JUL",
            year:"2026",
            day:"Thursday",
            title:"Binary Search Intuition",
            content:"Revised Binary Search today. The biggest takeaway is reducing the search space by half every iteration.",
            tags:["DSA","Algorithms"],
            edited:"Yesterday"
        },
        {
            date:"08",
            month:"JUL",
            year:"2026",
            day:"Wednesday",
            title:"Express Middleware",
            content:"Learned about middleware in Express. It acts between the request and response and is useful for authentication.",
            tags:["Backend","NodeJS","Express"],
            edited:"2 days ago"
        },
        {
            date:"07",
            month:"JUL",
            year:"2026",
            day:"Tuesday",
            title:"Solved Blind 75 - Two Sum",
            content:"Solved Two Sum using HashMap. A good reminder that brute force isn't always the best solution.",
            tags:["DSA","Arrays","HashMap"],
            edited:"3 days ago"
        }
    ];

    return(
        <div className="journalTimeline">
            {
                entries.map((entry,index)=>(
                    <JournalEntry
                        key={index}
                        {...entry}
                    />
                ))
            }
        </div>
    );
}

export default JournalTimeline;