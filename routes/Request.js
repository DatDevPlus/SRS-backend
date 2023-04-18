import express from "express";
import {
  Get_All_Request,
  Create_Request,
  Update_Request,
  Delete_Request,
  Get_Request_Detail,
} from "../controllers/RequestDetailController.js";
import { VerifyToken } from "../middleware/auth.js";
const router = express.Router();


router.get("/:id", Get_Request_Detail);
//get
router.get("/", VerifyToken, Get_All_Request);
//create
router.post("/", Create_Request);
//Update
router.put("/:id", Update_Request);

//delete
router.delete("/:id", Delete_Request);

export default router;
