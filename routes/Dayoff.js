import express from "express";
import {
  Get_All_DayOff,
  informationRequest,
} from "../controllers/DayoffController.js";
import { VerifyToken } from "../middleware/auth.js";
const router = express.Router();

router.get("/", VerifyToken, Get_All_DayOff);
router.post("/:id", VerifyToken, informationRequest);

export default router;
