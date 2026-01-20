import { Router } from "express";
const submitCodeRoutes=Router();
import verifyToken from "../middleware/verifyToken";
import verifyStudent from "../middleware/verifyStudent";
import { submitUserCode,allSubmission,allPoints } from "../Controllers/SubmissionController";


submitCodeRoutes.get('/allPoints',verifyToken,verifyStudent,allPoints);
submitCodeRoutes.get('/allSubmission',verifyToken,verifyStudent,allSubmission);
submitCodeRoutes.post("/userCode",verifyToken,verifyStudent,submitUserCode);

export default submitCodeRoutes;