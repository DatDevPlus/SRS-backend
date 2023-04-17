import express from "express";
import {
  Get_All_Request,
  Create_Request,
  Update_Request,
  Delete_Request,
  Get_Request_Detail,
} from "../controllers/RequestDetailController.js";
import { create } from "../controllers/PermissionController.js";
const router = express.Router();

router.post("/Create_date", create);

router.get("/getRequestDetail/:id", Get_Request_Detail);
//get
router.get("/getAllRequest", Get_All_Request);
//create
router.post("/Create_Request", Create_Request);
//Update
router.put("/Update_Request/:id", Update_Request);

//delete
router.delete("/Delete_Request/:id", Delete_Request);

export default router;
