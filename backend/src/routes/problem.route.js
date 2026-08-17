import express from "express";
import { getProblems, createProblem } from "../controllers/problem.controller.js";

const router = express.Router();

router.get("/", getProblems);
router.post("/", createProblem);


export default router;