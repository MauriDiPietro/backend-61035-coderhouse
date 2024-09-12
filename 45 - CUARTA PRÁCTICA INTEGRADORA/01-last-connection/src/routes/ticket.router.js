import { Router } from 'express';
import TicketController from '../controllers/ticket.controller.js';
import { checkAuth } from '../middlewares/authJwt.js';
const controller = new TicketController();

const router = Router();

router.post('/purchase', [checkAuth], controller.generateTicket)

export default router;





