import {Router} from 'express';
const addUserRoutes=Router();
import verifyToken from '../middleware/verifyToken';
import verifyAdmin from '../middleware/verifyAdmin';
import verifyStudent from '../middleware/verifyStudent';
import { addNewUser,checkUser ,allUser,logout,profile} from '../Controllers/userControllers';


addUserRoutes.get('/allUser',verifyToken,verifyAdmin,allUser);
addUserRoutes.post('/addNew',addNewUser);
addUserRoutes.post('/SignIn',checkUser);
addUserRoutes.get('/logout',verifyToken,logout);
addUserRoutes.get('/profile',verifyToken,profile);
export default addUserRoutes;