import express from "express";
const router = express.Router();
import { createUser, updateUser, deleteUser, getUser, getUsers } from "../controllers/UserController.js"
import { VerifyToken } from "../middleware/auth.js";

router.post('/', VerifyToken, createUser)
router.put('/:id', VerifyToken, updateUser);
router.delete('/:id', VerifyToken, deleteUser);
router.get('/:id', VerifyToken, getUser);
router.get('/', VerifyToken, getUsers);

export default router;
