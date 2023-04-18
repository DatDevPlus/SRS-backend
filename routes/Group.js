import express from "express";
const router = express.Router();
import { get_Group,create_Group} from "../controllers/GroupController.js"


router.post('/', create_Group)


//get
router.get('/', get_Group);
router.get('/:id', get_Group);



export default router
