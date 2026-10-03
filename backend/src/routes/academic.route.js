import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import { createSemester, getSemester, createSubjects, getSubjects } from "../controllers/academic.controller.js";

const router = express.Router();

router.post("/semesters",authMiddleware,createSemester);//When a POST request comes to /semesters, first run the authentication middleware, and if authentication succeeds, run createSemester.
router.get("/semesters/:semesterNumber", authMiddleware, getSemester);
router.post("/semesters/:semesterId/subjects",authMiddleware,createSubjects);
router.get("/semesters/:semesterId/subjects",authMiddleware, getSubjects);

export default router;