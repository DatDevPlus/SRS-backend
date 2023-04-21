import express from "express";
const router = express.Router();
import { Get_Workspace_Detail,Get_All_Workspace,Create_Workspace,Update_Workspace,Delete_Workspace } from "../controllers/Workspace.js"
import { VerifyToken } from "../middleware/auth.js";

router.post('/',VerifyToken, createUser)
router.put('/:id',VerifyToken, updateUser);
router.delete('/:id',VerifyToken, deleteUser);
router.get('/:id',VerifyToken, getUser);
router.get('/',VerifyToken, getUsers);

export default router
