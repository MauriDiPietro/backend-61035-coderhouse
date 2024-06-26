import { Router } from "express";
import {
  registerResponse,
  loginResponse,
  githubResponse,
  googleResponse,
  loginJwt,
} from "../controllers/user.controller.js";
import passport from "passport";
import { isAuth } from "../middlewares/isAuth.js";
import { register } from "../services/user.services.js";

const router = Router();

// router.post("/register", passport.authenticate('register'), registerResponse);

// router.post("/login", passport.authenticate('login'), loginResponse);

router.get('/private', passport.authenticate('jwt'), (req, res)=>res.json(
  req.user
 ));

 router.get('/private-cookies', passport.authenticate('jwtCookies'), (req, res)=>res.json(
  req.user
 ));

//!  BOTON: | INICIAR SESION CON GITHUB |
router.get('/register-github', passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/profile', passport.authenticate('github', { scope: [ 'user:email' ] }), githubResponse);

//!  BOTON: | INICIAR SESION CON GOOGLE |
router.get('/oauth2/redirect/accounts.google.com', passport.authenticate('google', { assignProperty: 'user' }), googleResponse);

router.post("/register", register);

router.post('/login', loginJwt);

export default router;
