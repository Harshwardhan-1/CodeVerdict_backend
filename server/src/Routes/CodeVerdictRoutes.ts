import {Router} from 'express';
const codeVerdictRouter=Router();
import verifyToken from '../middleware/verifyToken';
import verifyAdmin from '../middleware/verifyAdmin';
import { codeVerdictContest,adminAddVerdictContest,allCodeVerdictContest,showAllContest,deleteVerdictContest } from '../Controllers/CodeVerdictController';
import { joinCodeVerdictContest } from '../Controllers/CodeVerdictController';

codeVerdictRouter.get('/codeVerdict',verifyToken,codeVerdictContest);
codeVerdictRouter.post('/AdminAddCodeVerdictContest',verifyToken,adminAddVerdictContest);
codeVerdictRouter.get('/allCodeVerdictContest',verifyToken,allCodeVerdictContest);
codeVerdictRouter.get('/join/:contestId',verifyToken,joinCodeVerdictContest);
codeVerdictRouter.get('/showAllContest',verifyToken,verifyAdmin,showAllContest);
codeVerdictRouter.post('/deleteVerdictContest',verifyToken,verifyAdmin,deleteVerdictContest);
export default codeVerdictRouter;