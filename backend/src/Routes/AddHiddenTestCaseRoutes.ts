import { Router } from "express";
const hiddenTestRoutes=Router();
import verifyToken from "../middleware/verifyToken";
import verifyAdmin from "../middleware/verifyAdmin";
import { addHiddenTest, showAllHidden } from "../Controllers/AddHiddenTestController";

hiddenTestRoutes.get('/allHiddenTestCase',verifyToken,verifyAdmin,showAllHidden);
hiddenTestRoutes.post("/addHidden",verifyToken,verifyAdmin,addHiddenTest);

export default hiddenTestRoutes;