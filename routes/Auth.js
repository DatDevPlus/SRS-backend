import express from "express";
import {
  register,
  login,
  checkUser,
  addPermission,
  addRole,
  loginGoogle,
  removePermission,

} from "../controllers/AuthController.js";
import { VerifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/login-with-google", loginGoogle);
router.post("/register", register);

router.get("/", VerifyToken, checkUser);
router.post("/:id", VerifyToken, addRole);
router.post("/add-permission/:id", VerifyToken, addPermission);
router.post("/remove-permission/:id", VerifyToken, removePermission);

export default router;
