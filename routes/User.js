import express from "express";
const router = express.Router();
import { createUser, updateUser, deleteUser, getUser, getUsers } from "../controllers/UserController.js"
import { VerifyToken } from "../middleware/auth.js";
//newUser
router.post('/createUser',VerifyToken, createUser)
//Update
router.put('/:id',VerifyToken, updateUser);

//delete
router.delete('/:id',VerifyToken, deleteUser);

//get
router.get('/:id',VerifyToken, getUser);

//get all
router.get('/',VerifyToken, getUsers);

export default router
