import Controllers from "./class.controller.js";
import UserService from '../services/user.services.js';
import { createResponse } from "../utils.js";

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
     res.header('Authorization', token);
     !token ? createResponse(res, 404, token) : createResponse(res, 200, token);
    } catch (error) {
      next(error);
    }
  };

  profile =(req, res, next)=>{
    try {
     if(req.user){
      const { first_name, last_name, email, role } = req.user;
      createResponse(res, 200, {
        first_name, last_name, email, role
      })
     } else createResponse(res, 403, { msg: 'Unhautorized' })
    } catch (error) {
      next(error);
    }
  };

};