// route for signIn and signUp
import  express  from 'express';
import { signIn } from '../controller/userLogin';
import { updateUserProfile } from '../controller/userprofile';
import { signUp } from '../controller/userSingUp';


const router = express.Router();


router.post('/upbase/signUp', signUp);
router.post('/upbase/signIn', signIn); 
router.post('/upbase/updateProfile/:id', updateUserProfile); 

export default router;
