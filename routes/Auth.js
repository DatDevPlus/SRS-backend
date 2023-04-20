import express from "express";
import {
  register,
  login,
  checkUser,
  addPermission,
  addRole,
  loginGoogle,
} from "../controllers/AuthController.js";
import { VerifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", VerifyToken, checkUser);
router.post("/register", VerifyToken, register);
router.post("/login", login);
router.post("/login-with-google", loginGoogle);
router.post("/:id", VerifyToken, addRole);
router.post("/add-permission/:id", VerifyToken, addPermission);

export default router;
