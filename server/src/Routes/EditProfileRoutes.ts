import {Router} from 'express';
const makeProfileRoutes=Router();
import verifyToken from '../middleware/verifyToken';
import verifyStudent from '../middleware/verifyStudent';
import { makeProfile,showProfile } from '../Controllers/EditProfileController';
import upload from '../middleware/upload';

makeProfileRoutes.post('/makeProfile',verifyToken,verifyStudent,upload.single("photo"),makeProfile);
makeProfileRoutes.get('/showProfile',verifyToken,showProfile);

export default makeProfileRoutes;