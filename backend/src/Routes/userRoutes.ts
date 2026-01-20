import {Router} from 'express';
const addUserRoutes=Router();
import verifyToken from '../middleware/verifyToken';
import verifyAdmin from '../middleware/verifyAdmin';
import verifyStudent from '../middleware/verifyStudent';
import { addNewUser,checkUser ,allUser} from '../Controllers/userControllers';


addUserRoutes.get('/allUser',verifyToken,verifyAdmin,allUser);
addUserRoutes.post('/addNew',addNewUser);
addUserRoutes.post('/SignIn',checkUser);

export default addUserRoutes;