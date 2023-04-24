import express from "express";
const router = express.Router();
import { createUser, updateUser, deleteUser, getUser, getUsers, getUsersWithStaffRole } from "../controllers/UserController.js"
import { VerifyToken } from "../middleware/auth.js";

router.get("/get-all-staffs", VerifyToken, getUsersWithStaffRole);

router.post('/', VerifyToken, createUser);
router.put('/:id', VerifyToken, updateUser);
router.delete('/:id', VerifyToken, deleteUser);
router.get('/:id', VerifyToken, getUser);
router.get('/', VerifyToken, getUsers);

export default router;
