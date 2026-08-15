import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AppShell from "../../components/layout/AppShell.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import "./semester.css";

function Semester() {
  const { id } = useParams();

  const [subject, setSubject] = useState("");
  const [internal, setInternal] = useState("");
  const [external, setExternal] = useState("");
  const [credits, setCredits] = useState("");

  const [subdetail, setSubdetail] = useState([]);

  function add() {
    if (subject === "" || internal === "" || external === "" || credits === "") {
      alert("Please fill all the fields.");
      return;
    }

    if (Number(internal) > 100 || Number(external) > 100) {
      alert("Marks can not be greater then 100");
      return;
    }

    const newSub = {
      Subject: subject,
      Internal: internal,
      External: external,
      Credits: credits
    };

    setSubdetail((sub) => [...sub, newSub]);
    setSubject("");
    setInternal("");
    setExternal("");
    setCredits("");
  }

  function getTotal(internal, external) {
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

  function calSgpa() {
    let sum = 0;
    let sumcred = 0;
    if (subdetail.length === 0) return 0;
    for (let i = 0; i < subdetail.length; i++) {
      const total = getTotal(subdetail[i].Internal, subdetail[i].External);
      sum += getGrade(total).gradePoint * Number(subdetail[i].Credits);
      sumcred += Number(subdetail[i].Credits);
    }
    return sumcred === 0 ? 0 : sum / sumcred;
  }

  function save() {
    localStorage.setItem("semester" + id, JSON.stringify(subdetail));
    alert("Semester data saved successfully!");
  }

  useEffect(() => {
    const saved = localStorage.getItem("semester" + id);
    if (saved) {
      try {
        setSubdetail(JSON.parse(saved));
      } catch {
        // handle parse error silently
      }
    }
  }, [id]);

  function deleteSub(index) {
    const updated = subdetail.filter((_, i) => i !== index);
    setSubdetail(updated);
    localStorage.setItem("semester" + id, JSON.stringify(updated));
  }

  const calculatedSgpa = calSgpa();

  return (
    <AppShell containerSize="wide">
      <div className="semester-page">
        <PageHeader
          eyebrow="Semester Overview"
          title={`Semester ${id}`}
          description="Enter course subject details, manage internals & externals, and view your calculated SGPA."
          action={
            <Link to="/academics" className="btn-secondary">
              ← Back to Academics
            </Link>
          }
        />

        {/* Add Subject Card Form */}
        <div className="premium-card semester-form-card">
          <h3 className="section-subtitle">Add Course Subject</h3>
          <div className="form-grid">
            <div className="input-group">
              <label>Subject Name</label>
              <input
                className="input-standard"
                placeholder="e.g. Data Structures"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Internal Marks (max 100)</label>
              <input
                type="number"
                className="input-standard"
                placeholder="e.g. 45"
                value={internal}
                onChange={(e) => setInternal(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>External Marks (max 100)</label>
              <input
                type="number"
                className="input-standard"
                placeholder="e.g. 48"
                value={external}
                onChange={(e) => setExternal(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Credits</label>
              <input
                type="number"
                className="input-standard"
                placeholder="e.g. 4"
                value={credits}
                onChange={(e) => setCredits(e.target.value)}
              />
            </div>
          </div>
          <div className="form-actions">
            <button className="btn-primary" onClick={add}>
              + Add Subject
            </button>
            <button className="btn-secondary" onClick={save}>
              Save Semester Data
            </button>
          </div>
        </div>

        {/* Subjects Table & SGPA Row */}
        <div className="semester-results-grid">
          <div className="premium-card table-section">
            <h3 className="section-subtitle">Registered Subjects</h3>
            {subdetail.length === 0 ? (
              <EmptyState
                icon="📖"
                title="No subjects added"
                description="Use the form above to add subjects and calculate your SGPA for this semester."
              />
            ) : (
              <div className="table-wrapper">
                <table className="semester-table">
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Internal</th>
                      <th>External</th>
                      <th>Credits</th>
                      <th>Total</th>
                      <th>Grade</th>
                      <th>GP</th>
                      <th style={{ textAlign: "right" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subdetail.map((sub, index) => {
                      const total = getTotal(sub.Internal, sub.External);
                      const gradeInfo = getGrade(total);
                      return (
                        <tr key={index}>
                          <td className="font-semibold">{sub.Subject}</td>
                          <td>{sub.Internal}</td>
                          <td>{sub.External}</td>
                          <td>{sub.Credits}</td>
                          <td>{total}</td>
                          <td>
                            <span
                              className={`badge ${
                                gradeInfo.gradePoint >= 8
                                  ? "badge-success"
                                  : gradeInfo.gradePoint >= 6
                                  ? "badge-info"
                                  : "badge-warning"
                              }`}
                            >
                              {gradeInfo.grade}
                            </span>
                          </td>
                          <td>{gradeInfo.gradePoint}</td>
                          <td style={{ textAlign: "right" }}>
                            <button
                              className="btn-danger"
                              onClick={() => deleteSub(index)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="premium-card sgpa-summary-card">
            <span className="sgpa-eyebrow">SEMESTER RESULT</span>
            <div className="sgpa-value-box">
              <span className="sgpa-number display-serif">
                {calculatedSgpa.toFixed(2)}
              </span>
              <span className="sgpa-scale">/ 10.0</span>
            </div>
            <p className="sgpa-desc">
              {calculatedSgpa >= 8.5
                ? "Outstanding Performance!"
                : calculatedSgpa >= 7.0
                ? "Good Progress"
                : calculatedSgpa > 0
                ? "Keep Pushing!"
                : "Add subjects to compute SGPA"}
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default Semester;