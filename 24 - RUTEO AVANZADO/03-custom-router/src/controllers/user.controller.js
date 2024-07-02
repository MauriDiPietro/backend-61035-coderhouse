import { generateToken } from "../middlewares/jwt.js";
import * as services from "../services/user.services.js";

export const login = async(req,res,next)=>{
  try {
    const user = await services.login(req.body);
    if(!user) res.status(403).json({msg: 'Invalid credentials'});
    const token = generateToken(user);
    res.header('Authorization', token).json({data: token})
  } catch (error) {
    next(error)
  }
}

export const register = async (req, res, next) => {
  try {
    const data = await services.register(req.body)
    res.json({data});
  } catch (error) {
    next(error)
  }
};

export const profile = async(req, res, next)=>{
  console.log(req.user)
  try {
    res.json({data: req.user})
  } catch (error) {
    next(error)
  }

}
