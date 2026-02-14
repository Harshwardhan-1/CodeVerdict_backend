import {Router} from 'express';
const addQuestionRoutes=Router();
import verifyToken from '../middleware/verifyToken';
import verifyAdmin from '../middleware/verifyAdmin';
import verifyStudent from '../middleware/verifyStudent';
import { allQuestion,addQuestion,getAllQuestion,selectedQuestion,getAllAdminQuestion,deleteQuestion,updateQuestion,getQuestionCount } from '../Controllers/AddQuestionController';


addQuestionRoutes.get('/seeAllQuestion',verifyToken,getAllQuestion)
addQuestionRoutes.get('/allQuestion',verifyToken,verifyAdmin,allQuestion);
addQuestionRoutes.post('/addQuestion',verifyToken,verifyAdmin,addQuestion);
addQuestionRoutes.post('/showSelectedQuestion',verifyToken,verifyStudent,selectedQuestion);
addQuestionRoutes.get('/getAllAdminQuestion',verifyToken,verifyAdmin,getAllAdminQuestion);
addQuestionRoutes.post('/deleteQuestion',verifyToken,verifyAdmin,deleteQuestion);
addQuestionRoutes.post('/updateQuestion',verifyToken,verifyAdmin,updateQuestion);
addQuestionRoutes.get('/getQuestionCount',verifyToken,verifyStudent,getQuestionCount);
export default addQuestionRoutes;