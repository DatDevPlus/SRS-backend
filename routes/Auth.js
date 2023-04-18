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
router.post("/register", register);
router.post("/login", login);
router.post("/:id", addRole);
router.post("/addPermission", addPermission);
export default router;
