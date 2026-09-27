//before doing anything u needimport pg from "pg";

import pg from "pg"//pg is a Node.js library that allows JavaScript to communicate with PostgreSQL.
import dotenv from "dotenv";//Node doesn't automatically read .env.That's what dotenv helps with

dotenv.config();//"Hey dotenv, go find my .env file and load those variables so my Node program can access them."

const { Pool } = pg;//The pg package gives us several things. One of them is called:Pool
//same as const Pool = pg.Pool;


const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

console.log("DB HOST:", process.env.DB_HOST);//"Give me the DB_NAME environment variable available to this Node process."  A process is simply a program that is currently running.
console.log("DB NAME:", process.env.DB_NAME);
console.log("DB USER:", process.env.DB_USER);
console.log("PASSWORD EXISTS:", !!process.env.DB_PASSWORD);

pool.query("SELECT * FROM students")//"Use one of the connections in the pool to execute this SQL query."
    .then(result => {
        console.log("Students:");
        console.log(result.rows);
    })
    .catch(error => {
        console.error("Database query failed:");
        console.error(error.message);
    });

export default pool;

//Because dotenv.config() reads our .env file and puts its values into process.env, the code running in db.js can access those values.