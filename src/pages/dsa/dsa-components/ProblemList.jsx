import ProblemCard from "./ProblemCard";
import './ProblemList.css'

function ProblemList({title,problems}){
    return(
        <div className="problemList">
            <h2>{title}</h2>
            {
            problems.map((problem,index)=>(
            <ProblemCard
            key={index}
            name={problem.name}
            difficulty={problem.difficulty}
            pattern={problem.pattern}
            time={problem.time}
            />
            ))
        }
        </div>
    );
}
export default ProblemList;