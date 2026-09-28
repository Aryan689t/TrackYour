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