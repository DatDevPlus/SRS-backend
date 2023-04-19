import express from "express";
import {
  register,
  login,
  checkUser,
  addPermission,
  addRole,
} from "../controllers/AuthController.js";
import { VerifyToken } from "../middleware/auth.js";
const router = express.Router();
router.get("/", VerifyToken, checkUser);
router.post("/register", VerifyToken, register);
router.post("/login", login);
router.post("/:id", VerifyToken, addRole);
router.post("/addPermission/:id", VerifyToken, addPermission);
export default router;
