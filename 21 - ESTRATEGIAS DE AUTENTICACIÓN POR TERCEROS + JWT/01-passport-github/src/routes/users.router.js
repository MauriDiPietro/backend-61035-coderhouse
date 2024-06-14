import { Router } from "express";
import {
  registerResponse,
  loginResponse,
  githubResponse,
} from "../controllers/user.controller.js";
import passport from "passport";
import { isAuth } from "../middlewares/isAuth.js";

const router = Router();

router.post("/register", passport.authenticate('register'), registerResponse);

router.post("/login", passport.authenticate('login'), loginResponse);

router.get('/private', isAuth, (req, res)=>res.json({ msg: 'Ruta PRIVADA' }));

//!  BOTON: | INICIAR SESION CON GITHUB |
router.get('/register-github', passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/profile', passport.authenticate('github', { scope: [ 'user:email' ] }), githubResponse)

export default router;
