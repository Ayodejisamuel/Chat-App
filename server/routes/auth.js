import { Router } from 'express';
import { register, login, setAvatar, getAllUsers } from '../controller/userController.js';

const router = Router(); 

router.post('/register', register);  
router.post('/login', login);  
router.post('/setAvatar/:id', setAvatar);  
router.get('/getAllUsers/:id', getAllUsers);

export default router;
