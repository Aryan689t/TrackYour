import {Link} from "react-router-dom"
import { useState } from "react"
import "./Semester.css";

function Semester(){
    const [subject , setSubject]=useState("");
    const [internal , setInternal]=useState("");
    const [external , setExternal]=useState("");
    const [credits , setCredits]=useState("");

    const [subdetail,setSubdetail]=useState([]);

    function add(){
        const newSub ={
            Subject:subject,
            Internal:internal,
            External:external,
            Credits:credits
        }

        setSubdetail(sub=>[...sub,newSub])
        setSubject("")
        setInternal("")
        setExternal("")
        setCredits("")
    }

    function getTotal(internal,external){
            return Number(internal) + Number(external);
    }

    function getGrade(total) {
         if (total >= 90) return { grade: "S", gradePoint: 10 };
         if (total >= 80) return { grade: "A", gradePoint: 9 };
         if (total >= 70) return { grade: "B", gradePoint: 8 };
         if (total >= 60) return { grade: "C", gradePoint: 7 };
         if (total >= 50) return { grade: "D", gradePoint: 6 };
         if (total >= 40) return { grade: "E", gradePoint: 5 };
         return { grade: "F", gradePoint: 0 };
    }

    
    function calSgpa(){

        let sum=0;
        let sumcred=0;
        if (subdetail.length === 0)
           return 0;
        for(let i=0;i<subdetail.length;i++){
            const total = getTotal(subdetail[i].Internal, subdetail[i].External);
             sum +=getGrade(total).gradePoint*Number(subdetail[i].Credits);
             sumcred+=Number(subdetail[i].Credits);

        }
        return sum/sumcred;
    }

    return(
    <>

    <div className="semnum">
    <label>Semester number:</label><input/>
    </div>

    <div className="inputmarks">
    <label>Subject Name</label>
    <input value={subject}
    onChange={(e)=>setSubject(e.target.value)}/>

    <label>Internal Makrs</label>
    <input value={internal}
    onChange={(e)=>setInternal(e.target.value)}/>

    <label>External Marks</label>
    <input value={external}
    onChange={(e)=>setExternal(e.target.value)}/>

    <label>Credits</label>
    <input value={credits}
    onChange={(e)=>setCredits(e.target.value)}/>

    <button onClick={add}>+</button>
    </div>

    <table>
    <thead>
        <tr>
            <th>Subject</th>
            <th>Internal</th>
            <th>External</th>
            <th>Credits</th>
            <th>Total</th>
            <th>Grade</th>
            <th>GP</th>
        </tr>
    </thead>

    <tbody>

        {subdetail.map((subdetail, index) => {

            const total = getTotal(
                subdetail.Internal,
                subdetail.External
            );

            const gradeInfo = getGrade(total);

            return (
                <tr key={index}>

                    <td>{subdetail.Subject}</td>

                    <td>{subdetail.Internal}</td>

                    <td>{subdetail.External}</td>

                    <td>{subdetail.Credits}</td>

                    <td>{total}</td>

                    <td>{gradeInfo.grade}</td>

                    <td>{gradeInfo.gradePoint}</td>

                </tr>
            );

        })}

         </tbody>
        </table>

   <p className="sgpa">SGPA : {calSgpa().toFixed(2)}</p>
 
     

    </>
    )
}
export default Semester