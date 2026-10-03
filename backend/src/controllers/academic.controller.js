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