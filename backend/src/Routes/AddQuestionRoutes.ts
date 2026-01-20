import {Router} from 'express';
const addQuestionRoutes=Router();
import verifyToken from '../middleware/verifyToken';
import verifyAdmin from '../middleware/verifyAdmin';
import verifyStudent from '../middleware/verifyStudent';
import { allQuestion,addQuestion,getAllQuestion } from '../Controllers/AddQuestionController';


addQuestionRoutes.get('/seeAllQuestion',verifyToken,verifyStudent,getAllQuestion)
addQuestionRoutes.get('/allQuestion',verifyToken,verifyAdmin,allQuestion);
addQuestionRoutes.post('/addQuestion',verifyToken,verifyAdmin,addQuestion);


export default addQuestionRoutes;