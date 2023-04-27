import express from "express";
const router = express.Router();
import {
  getAllChannel,
  addNotification,
  editNotification,
} from "../controllers/SlackController.js";
import { VerifyToken } from "../middleware/auth.js";

router.get("/", VerifyToken, getAllChannel);
router.post("/", VerifyToken, addNotification);
router.put("/:id", VerifyToken, editNotification);

export default router;
