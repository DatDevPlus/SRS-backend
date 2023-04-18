import express from "express";
const router = express.Router();
import { get_Group,create_Group} from "../controllers/GroupController.js"


router.post('/createGroup', create_Group)


//get
router.get('/getGroup', get_Group);



export default router
