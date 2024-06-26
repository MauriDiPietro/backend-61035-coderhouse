import { generateToken } from "../middlewares/jwt.js";
import * as services from "../services/user.services.js";

export const registerResponse = (req, res, next) => {
  try {
    res.json({
      msg: 'Register OK',
      session: req.session
    })
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res) => {
  try {
    res.json(await services.register(req.body));
  } catch (error) {
    throw new Error(error);
  }
};

export const loginJwt = async(req,res,next)=>{
  try {
    const user = await services.login(req.body);
    if(!user) res.json({msg: 'Invalid credentials'});
    const token = generateToken(user);
    res
      // .header('Authorization', token)
      .cookie('token', token, { httpOnly: true })
      .json({ msg: 'Login JWT OK', token })
  } catch (error) {
    next(error)
  }
}

export const loginResponse = async (req, res, next) => {
  //req.session.passport.user
  try {
    let id = null;
    if(req.session.passport && req.session.passport.user) id = req.session.passport.user;
    const user = await services.getUserById(id);
    if(!user) res.status(401).json({ msg: 'Error de autenticacion' });
    const { first_name, last_name, email, age, role } = user;
    res.json({
      msg: 'LOGIN OK!',
      user: {
        first_name,
        last_name,
        email,
        age,
        role
      }
    })
  } catch (error) {
    next(error);
  }
};

export const githubResponse = async(req, res, next) => {
  try {
    // console.log(req.user);
    const { first_name, last_name, email, role } = req.user;
    res.json({
      msg: 'LOGIN CON GITHUB OK!',
      user: {
        first_name,
        last_name,
        email,
        role
      }
    })
    } catch (error) {
    next(error)
  }
}

export const googleResponse = async(req, res, next) => {
  try {
    // console.log(req.user);
    const { first_name, last_name, email, role } = req.user;
    res.json({
      msg: 'LOGIN CON GOOGLE OK!',
      user: {
        first_name,
        last_name,
        email,
        role
      }
    })
    } catch (error) {
    next(error)
  }
}
