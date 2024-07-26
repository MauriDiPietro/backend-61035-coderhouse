import { Router } from 'express';
import { sendSms, sendWS } from '../controllers/twilio.controller.js';

const router = Router();

router.post('/sms', sendSms);
router.post('/whatsapp', sendWS);


export default router;