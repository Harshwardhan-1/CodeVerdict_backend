import {Router} from 'express';
const batchRoutes=Router();
import verifyToken from '../middleware/verifyToken';
import verifyStudent from '../middleware/verifyStudent';

import { activeDaysBatch,getBatchCount } from '../Controllers/SubmissionController';


batchRoutes.get('/getBatch',verifyToken,verifyStudent,activeDaysBatch);
batchRoutes.get('/getBatchCount',verifyToken,verifyStudent,getBatchCount);

export default batchRoutes;