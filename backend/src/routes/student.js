import express from "express";
import { getStudents , createStudent , updateStudent , login_user} from "../controllers/student.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getStudents);
router.post("/", createStudent);
router.put("/:id",updateStudent);
router.post("/login", login_user);


export default router;