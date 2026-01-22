import {Router} from 'express';
const runCodeRoutes=Router();
import verifyToken from '../middleware/verifyToken';
import verifyStudent from '../middleware/verifyStudent';
import { runUserCode } from '../Controllers/RunCodeController';


runCodeRoutes.post('/runCode',verifyToken,verifyStudent,runUserCode);



export default runCodeRoutes; 