import React, { useEffect, useMemo, useState} from "react";
import { Link } from "react-router-dom";
import AppShell from "../../components/layout/AppShell.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import "./Academics.css";

function Academics() {
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  const [semesterData, setSemesterData] = useState({});

  useEffect(() => {
    const fetchSemesters = async () => {
        try {
            const token = localStorage.getItem("token");

            const data = {};

            for (const num of semesters) {
                const semesterResponse = await fetch(
                    `/api/academics/semesters/${num}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (!semesterResponse.ok) {
                    continue;
                }

                const semester = await semesterResponse.json();

                const subjectsResponse = await fetch(
                    `/api/academics/semesters/${semester.id}/subjects`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (!subjectsResponse.ok) {
                    continue;
                }

                const subjects = await subjectsResponse.json();

                data[num] = subjects;
            }

            setSemesterData(data);

             } catch (error) {
                  console.error("ACADEMICS FETCH ERROR:", error);
                }
           };

            fetchSemesters();
         }, []);

  const academicSummary = useMemo(() => {
    let configuredCount = 0;
    let totalSubjectsCount = 0;
    let sgpaSum = 0;

    semesters.forEach((num) => {
      try {
        const data = localStorage.getItem("semester" + num);
        if (data) {
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed) && parsed.length > 0) {
            configuredCount++;
            totalSubjectsCount += parsed.length;

            let sum = 0;
            let credSum = 0;
            parsed.forEach((sub) => {
              const tot = Number(sub.Internal || 0) + Number(sub.External || 0);
              let gp = 0;
              if (tot >= 90) gp = 10;
              else if (tot >= 80) gp = 9;
              else if (tot >= 70) gp = 8;
              else if (tot >= 60) gp = 7;
              else if (tot >= 50) gp = 6;
              else if (tot >= 40) gp = 5;

              sum += gp * Number(sub.Credits || 0);
              credSum += Number(sub.Credits || 0);
            });
            if (credSum > 0) {
              sgpaSum += sum / credSum;
            }
          }
        }
      } catch {
        // ignore errors
      }
    });

    const calculatedCgpa = configuredCount > 0 ? (sgpaSum / configuredCount).toFixed(2) : "N/A";
    return { configuredCount, totalSubjectsCount, calculatedCgpa };
  }, []);

  const getSemesterDetails = (num) => {
    try {
      const data = localStorage.getItem("semester" + num);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return {
            label: `${parsed.length} Subject${parsed.length > 1 ? "s" : ""}`,
            isConfigured: true
          };
        }
      }
    } catch {
      // ignore
    }
    return { label: "Not Configured", isConfigured: false };
  };

  return (
    <AppShell containerSize="wide">
      <div className="academics-page">
        <PageHeader
          eyebrow="Academic Progress"
          title="Academics"
          description="Track course grades, calculate SGPA for each semester, and monitor your overall academic performance."
        />

        {/* Summary Metric Strip */}
        <div className="academics-summary-strip">
          <div className="academic-summary-card">
            <span className="academic-summary-label">Cumulative GPA</span>
            <span className="academic-summary-val">{academicSummary.calculatedCgpa}</span>
            <span className="academic-summary-sub">Across configured semesters</span>
          </div>

          <div className="academic-summary-card">
            <span className="academic-summary-label">Active Semesters</span>
            <span className="academic-summary-val">{academicSummary.configuredCount} / 8</span>
            <span className="academic-summary-sub">Semesters with registered subjects</span>
          </div>

          <div className="academic-summary-card">
            <span className="academic-summary-label">Total Courses</span>
            <span className="academic-summary-val">{academicSummary.totalSubjectsCount}</span>
            <span className="academic-summary-sub">Logged course subjects</span>
          </div>
        </div>

        {/* Semesters Grid */}
        <div className="semester-grid">
          {semesters.map((num) => {
            const { label, isConfigured } = getSemesterDetails(num);
            return (
              <Link to={`/Semester/${num}`} key={num} className="sem-card">
                <div className="sem-card-header">
                  <span className="badge badge-neutral" style={{ fontSize: 11 }}>
                    SEMESTER {num}
                  </span>
                  {isConfigured ? (
                    <span className="badge badge-purple">{label}</span>
                  ) : (
                    <span className="badge badge-neutral">{label}</span>
                  )}
                </div>

                <div className="sem-card-body">
                  <h3>Semester {num} Overview</h3>
                  <p className="sem-subtext">Manage courses & grade calculation</p>
                </div>

                <div className="sem-card-footer">
                  <span className="sem-card-arrow">
                    Configure →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}

export default Academics;