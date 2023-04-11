import express from "express";
const router = express.Router();
import { createUser, updateUser, deleteUser } from "../controllers/UserController.js"

//newUser
router.post('/createUser', createUser)
//Update
router.put('/:id', updateUser);

//delete
router.delete('/:id', deleteUser);

export default router
