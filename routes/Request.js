import express from "express";
import {
  Get_All_Request,
  Create_Request,
  Update_Request,
  Delete_Request,
  Get_Request_Detail,
  countRequestsByStatus,
  countRequestsByMonth,
} from "../controllers/RequestDetailController.js";
import { VerifyToken } from "../middleware/auth.js";
const router = express.Router();

router.get("/count-requests-by-status", VerifyToken, countRequestsByStatus);
router.get("/count-requests-by-month", VerifyToken, countRequestsByMonth);

router.get("/:id",VerifyToken, Get_Request_Detail);
router.get("/", Get_All_Request);
router.post("/", VerifyToken, Create_Request);
router.put("/:id",VerifyToken, Update_Request);
router.delete("/:id",VerifyToken, Delete_Request);


export default router;
