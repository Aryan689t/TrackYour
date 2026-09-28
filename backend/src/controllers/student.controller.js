import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

export const getStudents = async (req, res) => {
    console.log("Logged-in user:", req.user);
    try {
        const result = await pool.query(
    "SELECT id, name, email FROM students WHERE id = $1",
    [req.user.userId]
);

        res.json(result.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Database error" });
    }
};



export const createStudent = async (req, res) => {
    try {
        const { name, email , password } = req.body;
        const hashed=await bcrypt.hash(password,10 )
        const result = await pool.query(
            "INSERT INTO students (name, email, password) VALUES ($1, $2, $3) RETURNING id , name , email",
            [name, email ,hashed]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Database error" });
    }
};



export const updateStudent=async(req,res)=>{
    try{
        const { name , email }=req.body;
        const id=req.params.id;
        const update=await pool.query(
            "UPDATE students SET name = $1 , email = $2 WHERE id= $3 RETURNING*",
            [name ,email,id]
        );
        res.status(200).json(update.rows[0])
    }catch(error){
         console.error(error.message);
        res.status(500).json({ error: "updation error"});
    }
};



export const login_user = async (req, res) => {
    try {
        const { email, password } = req.body;

        const update = await pool.query(
            "SELECT * FROM students WHERE email = $1",
            [email]
        );

        if (update.rows.length === 0) {
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

        const user = update.rows[0];

        const passwordMatch = await bcrypt.compare(password,user.password);

        if (passwordMatch) {

            const token=jsonwebtoken.sign(//create a jwt token 
                {userId:user.id},//payload
                process.env.JWT_SECRET,//secret ur server keeps
                
            );
            console.log("NEW TOKEN DATA:");
console.log(jsonwebtoken.decode(token));

            return res.status(200).json({
                message: "Login successful",
                token:token
            });
        } else {
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

    } catch (error) {
        console.error(error.message);

        return res.status(500).json({
            error: "Database error"
        });
    }
};