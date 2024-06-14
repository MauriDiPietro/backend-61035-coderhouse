import { Router } from 'express'
import passport from 'passport';
import { registerResponse, loginResponse, githubResponse } from '../controllers/user.controller.js';

const router = Router()

router.post('/register', passport.authenticate('register'), registerResponse);

router.post('/login', passport.authenticate('login'), loginResponse);

/* ------------------------------------ - ----------------------------------- */

router.get('/register-github', passport.authenticate('github', { scope: [ 'user:email' ] }))  

router.get('/profile', passport.authenticate( 'github' , {
    failureRedirect: '/login', 
    successRedirect: '/profile-github', 
    passReqToCallback: true
}));

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) res.send(err);
        res.redirect('/login'); 
      });
});

export default router;

