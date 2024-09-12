import { Router } from 'express';
import { checkAuth } from '../middlewares/authJwt.js';
import { checkAdmin } from '../middlewares/checkAdmin.js';
import UserController from '../controllers/user.controllers.js';
const controller = new UserController();

const router = Router();

router.post('/register', controller.register);

router.post('/login', controller.login);

router.get('/profile', checkAuth, controller.profile);

//boton de restablecer contraseña
router.post('/reset-pass', checkAuth, controller.generateResetPass);

router.put('/new-pass', checkAuth, controller.updatePass);

router.get('/', checkAdmin, controller.checkUsersLastConnection);

export default router;