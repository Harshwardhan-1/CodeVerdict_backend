import {Router} from 'express';
const contestRouter=Router();
import verifyToken from '../middleware/verifyToken';
import verifyStudent from '../middleware/verifyStudent';
import { addContest,deleteContest,seeAllContest,joinContest,showContestQuestion } from '../Controllers/ContestController';
import { showLeaderBoard } from '../Controllers/userOrganizeSubmitCode';

contestRouter.post('/addContest',verifyToken,verifyStudent,addContest);
contestRouter.get('/seeAllContest',verifyToken,verifyStudent,seeAllContest);
contestRouter.post('/deleteContest',verifyToken,verifyStudent,deleteContest);
contestRouter.post('/joinContest',verifyToken,verifyStudent,joinContest);
contestRouter.post('/showContestQuestion',showContestQuestion);
contestRouter.post('/showLeaderBoard',verifyToken,showLeaderBoard);

export default contestRouter; 