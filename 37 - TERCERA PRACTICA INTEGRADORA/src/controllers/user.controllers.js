import Controllers from "./class.controller.js";
import UserService from '../services/user.services.js';
import { createResponse } from "../utils.js";
import { sendMail } from "../services/mailing.service.js";

const userService = new UserService();

export default class UserController extends Controllers{
  constructor(){
    super(userService)
  }

  register = async(req, res, next) =>{
    try {
      const data = await this.service.register(req.body);
      !data ? createResponse(res, 404, data) : createResponse(res, 200, data);
    } catch (error) {
      next(error);
    }
  };

  login = async(req, res, next) =>{
    try {
     const token = await this.service.login(req.body);
      res.cookie('token', token, { httpOnly: true });
     !token ? createResponse(res, 404, 'user/pass incorrect') : createResponse(res, 200, token);
    } catch (error) {
      next(error);
    }
  };

  profile =async(req, res, next)=>{
    try {
     if(req.user){
      const { _id } = req.user;
      const user = await this.service.getUserById(_id);
      createResponse(res, 200, user)
     } else createResponse(res, 401, { msg: 'Unhautorized' })
    } catch (error) {
      next(error);
    }
  };

  generateResetPass = async(req, res, next) => {
    try {
      const user = req.user;
      const token = await userService.generateResetPass(user);
      if(token){
        await sendMail(user, 'resetPass', token);
        res.cookie('tokenpass', token);
        createResponse(res, 200, 'Email reset pass send OK')
      } else createResponse(res, 404, 'error email reset pass send')
    } catch (error) {
      next(error)
    }
  }

  async updatePass(req, res,next){
    try {
      const user = req.user;
      const { pass } = req.body;
      const { tokenpass } = req.cookies;
      if(!tokenpass) return createResponse(res, 401, 'Unhautorized');
      const updPass = await userService.updatePass(pass, user);
      if(!updPass) return createResponse(res, 404, 'cannot be the same')
      res.clearCookie('tokenpass');
      return createResponse(res, 200, updPass);
    } catch (error) {
      next(error)
    }
  }

};