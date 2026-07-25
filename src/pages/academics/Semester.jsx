import {Link , useParams} from "react-router-dom"
import { useState , useEffect} from "react"
import "./semester.css";

function Semester(){

    const { id } = useParams();

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

        if(Number(internal)>100||Number(external)>100){
            alert("Marks can not be greater then 100");
            return 0;
        }
        if(subject === "" ||internal === "" ||external === "" ||credits === "" ) {
         alert("Please fill all the fields.");
        return;
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

    function save() {
        localStorage.setItem(
            "semester"+id,JSON.stringify(subdetail)
        );
    }

    useEffect(()=>{
        const saved=localStorage.getItem("semester"+id)
        if(saved)
        setSubdetail(JSON.parse(saved))
    
    },[]);

    function deleteSub(index){
        const updated = subdetail.filter((sub, i) => i !== index);
        setSubdetail(updated);
         localStorage.setItem(
        "semester" + id,
        JSON.stringify(updated)
    );
    }

    return(
    <div className="semester-page page-container">
     <div className="page-content semester-content">
        <div className="semester-header">
            <Link to="/academics" className="btn-secondary">
                ← Back to Academics
            </Link>
            <h2>Semester {id}</h2>
        </div>

        <div className="premium-card input-section">
            <div className="input-group">
                <label>Subject Name</label>
                <input className="input-standard" value={subject} onChange={(e)=>setSubject(e.target.value)}/>
            </div>
            <div className="input-group">
                <label>Internal Marks</label>
                <input className="input-standard" value={internal} onChange={(e)=>setInternal(e.target.value)}/>
            </div>
            <div className="input-group">
                <label>External Marks</label>
                <input className="input-standard" value={external} onChange={(e)=>setExternal(e.target.value)}/>
            </div>
            <div className="input-group">
                <label>Credits</label>
                <input className="input-standard" value={credits} onChange={(e)=>setCredits(e.target.value)}/>
            </div>
            <div className="action-buttons">
                <button className="btn-primary" onClick={add}>+</button>
                <button className="btn-primary" onClick={save}>Save Semester</button>
            </div>
        </div>

        <div className="premium-card table-section">
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
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {subdetail.map((subdetail, index) => {
                    const total = getTotal(subdetail.Internal, subdetail.External);
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
                            <td><button className="btn-danger" onClick={()=>deleteSub(index)}>Delete</button></td>
                        </tr>
                    );
                })}
            </tbody>
            </table>
        </div>

        <div className="premium-card sgpa-card">
            <p className="sgpa-label">Current SGPA</p>
            <p className="sgpa-value">{calSgpa().toFixed(2)}</p>
        </div>
     </div>
    </div>
    )
}
export default Semester