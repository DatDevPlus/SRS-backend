import express from "express";
const router = express.Router();
import {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  editAccountUser,
} from "../controllers/UserController.js";
import { VerifyToken } from "../middleware/auth.js";

router.post("/", VerifyToken, createUser);
router.put("/:id", VerifyToken, updateUser);
router.put("/editAccount", VerifyToken, editAccountUser);
router.delete("/:id", VerifyToken, deleteUser);
router.get("/:id", VerifyToken, getUser);
router.get("/", VerifyToken, getUsers);

export default router;
