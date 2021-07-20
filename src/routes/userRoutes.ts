// route for signIn and signUp
import express from 'express';
import { signIn } from '../controller/userLogin';
import { signUp } from '../controller/userSingUp';
import { userAuthorization } from '../controller/authorisation';
import {
  updateUserProfile,
  singleUserProfile,
  getAllUsers,
  deleteUserProfile,
} from '../controller/userprofile';

import upload from '../helpers/multer';

const router = express.Router();

router.post('/upbase/signUp', upload.single('image'), signUp);
router.post('/upbase/signIn', signIn);
router.put('/upbase/updateProfile/:id', userAuthorization, upload.single('image'), updateUserProfile);
router.get('/upbase/userProfile/:id', userAuthorization, singleUserProfile);
router.delete('/upbase/userProfile/:id', userAuthorization, deleteUserProfile);
router.get('/upbase/userProfile/', userAuthorization, getAllUsers);

export default router;
