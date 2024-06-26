import { Router } from "express";
import {
  registerResponse,
  loginResponse,
  githubResponse,
  loginJwt,
  register
} from "../controllers/user.controller.js";
import passport from "passport";
import { isAuth } from "../middlewares/isAuth.js";
import { checkAuth } from "../middlewares/jwt.js";

const router = Router();

// router.post("/register", passport.authenticate('register'), registerResponse);

// router.post("/login", passport.authenticate('login'), loginResponse);

// router.get('/private', isAuth, (req, res)=>res.json({ msg: 'Ruta PRIVADA' }));

router.post("/register", register);

//!  BOTON: | INICIAR SESION CON GITHUB |
// router.get('/register-github', passport.authenticate('github', { scope: [ 'user:email' ] }));

// router.get('/profile', passport.authenticate('github', { scope: [ 'user:email' ] }), githubResponse)

router.post('/login', loginJwt);

router.get('/private', checkAuth, (req, res)=>res.json({ user: req.user }));

export default router;
