import pool from "../config/db.js";

export const createSemester = async (req, res) => {
    try {
        const { semester_number } = req.body;

        const userId = req.user.userId;

        const result = await pool.query(
            `INSERT INTO semesters (user_id, semester_number)
             VALUES ($1, $2)
             RETURNING *`,
            [userId, semester_number]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            error: "Database error"
        });
    }
};



export const getSemester = async (req, res) => {
    try {
        const semesterNumber = req.params.semesterNumber;
        const userId = req.user.userId;

        const result = await pool.query(
            `SELECT id, user_id, semester_number
             FROM semesters
             WHERE user_id = $1 AND semester_number = $2`,
            [userId, semesterNumber]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Semester not found"
            });
        }

        res.status(200).json(result.rows[0]);

    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            error: "Database error"
        });
    }
};



export const createSubjects = async (req, res) => {
    try {
        const semesterId = req.params.semesterId;
        const userId = req.user.userId;
        const { subjects } = req.body;

        // 1. Check that this semester belongs to the logged-in user
        const semester = await pool.query(
            `SELECT id
             FROM semesters
             WHERE id = $1 AND user_id = $2`,
            [semesterId, userId]
        );

        if (semester.rows.length === 0) {
            return res.status(403).json({
                error: "You do not have access to this semester"
            });
        }

        await pool.query("BEGIN");

        // Keep track of ALL subjects that should remain in the database
        const subjectIds = [];

        // 2. Update existing subjects / insert new subjects
        for (const subject of subjects) {

            if (subject.id) {

                // Existing subject → update it
                await pool.query(
                    `UPDATE subjects
                     SET subject_name = $1,
                         subject_type = $2,
                         internal_marks = $3,
                         external_marks = $4,
                         credits = $5
                     WHERE id = $6
                     AND semester_id = $7`,
                    [
                        subject.subject_name,
                        subject.subject_type.toUpperCase(),
                        subject.internal_marks,
                        subject.external_marks,
                        subject.credits,
                        subject.id,
                        semesterId
                    ]
                );

                // Keep this subject
                subjectIds.push(subject.id);

            } else {

                // New subject → insert it
                const result = await pool.query(
                    `INSERT INTO subjects
                     (semester_id, subject_name, subject_type,
                      internal_marks, external_marks, credits)
                     VALUES ($1, $2, $3, $4, $5, $6)
                     RETURNING id`,
                    [
                        semesterId,
                        subject.subject_name,
                        subject.subject_type.toUpperCase(),
                        subject.internal_marks,
                        subject.external_marks,
                        subject.credits
                    ]
                );

                // IMPORTANT:
                // Save the newly generated database ID
                subjectIds.push(result.rows[0].id);
            }
        }

        console.log("SUBJECT IDS TO KEEP:", subjectIds);

        // 3. Delete subjects that were removed from the frontend
        if (subjectIds.length > 0) {

            await pool.query(
                `DELETE FROM subjects
                 WHERE semester_id = $1
                 AND id <> ALL($2::int[])`,
                [semesterId, subjectIds]
            );

        } else {

            // No subjects left → delete all subjects for this semester
            await pool.query(
                `DELETE FROM subjects
                 WHERE semester_id = $1`,
                [semesterId]
            );
        }

        await pool.query("COMMIT");

        res.status(201).json({
            message: "Subjects saved successfully"
        });

    } catch (error) {

        await pool.query("ROLLBACK");

        console.error(error.message);

        res.status(500).json({
            error: "Database error"
        });
    }
};



export const getSubjects = async (req, res) => {
    try {
        const semesterId = req.params.semesterId;
        const userId = req.user.userId;

        console.log("GET SUBJECTS");
        console.log("semesterId:", semesterId);
        console.log("userId:", userId);

        const semester = await pool.query(
            `SELECT id
             FROM semesters
             WHERE id = $1 AND user_id = $2`,
            [semesterId, userId]
        );

        console.log("SEMESTER CHECK:", semester.rows);

        if (semester.rows.length === 0) {
            return res.status(403).json({
                error: "You do not have access to this semester"
            });
        }

        const result = await pool.query(
            `SELECT *
             FROM subjects
             WHERE semester_id = $1
             ORDER BY id`,
            [semesterId]
        );

        console.log("SUBJECTS FROM DB:", result.rows);

        res.status(200).json(result.rows);

    } catch (error) {
        console.error("GET SUBJECTS ERROR:", error);
        res.status(500).json({
            error: "Database error"
        });
    }
};