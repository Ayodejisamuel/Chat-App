import { Router } from 'express';
import { addMessage, getAllMessage } from '../controller/messagesController.js';

const router = Router();

router.post('/addmsg', addMessage);  
router.post('/getmsg', getAllMessage);  
 




export default router;
