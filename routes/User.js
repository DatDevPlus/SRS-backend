import express from "express";
const router = express.Router();
import { createUser, updateUser, deleteUser, getUser, getUsers } from "../controllers/UserController.js"

//newUser
router.post('/createUser', createUser)
//Update
router.put('/:id', updateUser);

//delete
router.delete('/:id', deleteUser);

//get
router.get('/:id', getUser);

//get all
router.get('/', getUsers);

export default router
