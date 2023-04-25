import express from "express";
const router = express.Router();
import {
  Get_Workspace_Detail,
  Get_All_Workspace,
  Create_Workspace,
  Update_Workspace,
  Delete_Workspace,
} from "../controllers/Workspace.js";
import { VerifyToken } from "../middleware/auth.js";

router.get("/", VerifyToken, Get_All_Workspace);
router.put("/:id", VerifyToken, Update_Workspace);
router.delete("/:id", VerifyToken, Delete_Workspace);
router.get("/:id", VerifyToken, Get_Workspace_Detail);
router.post("/createWorkspace", Create_Workspace);

export default router;
