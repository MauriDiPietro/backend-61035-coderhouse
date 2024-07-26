import { Router } from 'express';
import { sendGmail, sendGmailSendgrid, sendMailEthereal } from '../controllers/email.controller.js';

const router = Router();

router.post('/send', sendMailEthereal);
// router.post('/gmail', sendGmail);
router.post('/gmail', sendGmailSendgrid);

export default router;