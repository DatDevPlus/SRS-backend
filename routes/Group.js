import express from "express";
const router = express.Router();
import {
  get_All_Groups,
  get_Group,
  delete_Group,
  update_Group,
  create_Group,
} from "../controllers/GroupController.js";
import { VerifyToken } from "../middleware/auth.js";

router.post("/", create_Group);
router.get("/", VerifyToken, get_All_Groups);
router.get("/:id", VerifyToken, get_Group);
router.delete("/:id", VerifyToken, delete_Group);
router.put("/:id", VerifyToken, update_Group);

export default router;
