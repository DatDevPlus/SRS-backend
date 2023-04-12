import express from "express";
import {
  Get_All_Request,
  Create_Request,
  Update_Request,
  Delete_Request,
} from "../controllers/RequestDetailController.js";
const router = express.Router();

//get
router.get("/getAllRequest", Get_All_Request);
//create
router.post("/Create_Request", Create_Request);
//Update
router.put("/Update_Request/:id", Update_Request);

//delete
router.delete("/Delete_Request/:id", Delete_Request);

export default router;
