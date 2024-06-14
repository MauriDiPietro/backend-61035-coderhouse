import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";
import UserDao from "../daos/user.dao.js";
const userDao = new UserDao();
import 'dotenv/config';

const strategyConfig = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  // console.log(profile);
  const email = profile._json.email;
  const user = await userDao.getByEmail(email);
  if (user) return done(null, user);
  const newUser = await userDao.register({
    first_name: profile._json.name.split(' ')[0],
    last_name: profile._json.name.split(' ').length === 3 ? profile._json.name.split(' ')[1].concat(' ', profile._json.name.split(' ')[2]) : profile._json.name.split(' ')[1],
    email,
    image: profile._json.avatar_url,
    isGithub: true,
    // image: ---
  });
  return done(null, newUser);
};

passport.use("github", new GithubStrategy(strategyConfig, registerOrLogin));
