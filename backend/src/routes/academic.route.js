import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import { createSemester, getSemester } from "../controllers/academic.controller.js";

const router = express.Router();

router.post("/semesters",authMiddleware,createSemester);//When a POST request comes to /semesters, first run the authentication middleware, and if authentication succeeds, run createSemester.
router.get("/semesters/:semesterNumber", authMiddleware, getSemester);


export default router;