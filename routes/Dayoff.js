import express from "express";
import {
  Get_All_DayOff,
  Get_Information_Request,
} from "../controllers/DayoffController.js";
import { VerifyToken } from "../middleware/auth.js";
const router = express.Router();

router.get("/", VerifyToken, Get_All_DayOff);
router.get("/:id", Get_Information_Request);

export default router;
