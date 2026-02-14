import {Router} from 'express';
const analyzeComplexityRoutes=Router();
import verifyToken from '../middleware/verifyToken';
import verifyStudent from '../middleware/verifyStudent';

import { analyzeComplexity } from "../Controllers/AnalyzeComplexityController";

analyzeComplexityRoutes.post('/complexity',verifyToken,verifyStudent,analyzeComplexity);


export default analyzeComplexityRoutes;