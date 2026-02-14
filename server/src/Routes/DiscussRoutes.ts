import {Router} from 'express';
const discussSolutionRoutes=Router();
import verifyToken from '../middleware/verifyToken';
import verifyStudent from '../middleware/verifyStudent';

import { discussSolution,checkDiscuss,allDiscussions,getDiscussion,allDiscussionsOfThisQuestion } from '../Controllers/DiscussController';

discussSolutionRoutes.post("/addDiscuss",verifyToken,verifyStudent,discussSolution);
discussSolutionRoutes.post('/checkDiscuss',checkDiscuss);
discussSolutionRoutes.get('/allDiscussions',verifyToken,verifyStudent,allDiscussions);
discussSolutionRoutes.post('/getDiscussion',verifyToken,verifyStudent,getDiscussion);
discussSolutionRoutes.post('/AllDiscussionOfThisQuestion',verifyToken,verifyStudent,allDiscussionsOfThisQuestion);
export default discussSolutionRoutes;