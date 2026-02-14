import {Router} from 'express';
const runCodeRoutes=Router();
import verifyToken from '../middleware/verifyToken';
import verifyStudent from '../middleware/verifyStudent';
import { runUserCode } from '../Controllers/RunCodeController';
import { runOrganizeUserCode } from '../Controllers/OrganizeRunCode';
import { runCodeVerdictContestCode } from '../Controllers/CodeVerdictContestRun';


runCodeRoutes.post('/runCode',verifyToken,verifyStudent,runUserCode);
runCodeRoutes.post('/organizeRunCode',verifyToken,verifyStudent,runOrganizeUserCode);
runCodeRoutes.post('/codeVerdictContestRun',verifyToken,verifyStudent,runCodeVerdictContestCode);


export default runCodeRoutes; 