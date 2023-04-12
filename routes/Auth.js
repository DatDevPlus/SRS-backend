import express from "express";
import { register, login, checkUser } from "../controllers/AuthController.js";
import { VerifyToken } from "../middleware/auth.js";
const router = express.Router();
router.get("/", VerifyToken, checkUser);
router.post("/register", register);
router.post("/login", login);

export default router;
