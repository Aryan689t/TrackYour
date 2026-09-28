import express from "express";
import cors from "cors";//CORS lets a server explicitly allow trusted origins.
import healthRouter from "./routes/health.route.js";
import problemRouter from "./routes/problem.route.js";
import studentRouter from "./routes/student.js";
import academicRouter from "./routes/academic.route.js";
const app=express();//creates express application

app.use(cors());//adds CORS middleware.
app.use(express.json());//allows Express to understand JSON sent in requests.
app.use("/api/health",healthRouter);//"Whenever a request starts with /api/health, send it to healthRouter."
app.use("/api/problems", problemRouter);
app.use("/api/students", studentRouter);
app.use("/api/academics", academicRouter);

export default app;