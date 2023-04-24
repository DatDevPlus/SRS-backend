import express from "express";
import {
  Get_All_DayOff,
  revertDayOff,
} from "../controllers/DayoffController.js";
import { VerifyToken } from "../middleware/auth.js";
const router = express.Router();

router.get("/",VerifyToken, Get_All_DayOff);
router.put("/:id",VerifyToken, revertDayOff);

export default router;
