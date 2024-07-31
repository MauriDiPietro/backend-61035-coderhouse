import Controllers from "./class.controller.js";
import UserService from '../services/user.services.js';
import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();

const userService = new UserService();

export default class UserController extends Controllers{
  constructor(){
    super(userService)
  }

  register = async(req, res, next) =>{
    try {
      const data = await this.service.register(req.body);
      if(!data) return httpResponse.NotFound(res, data);
      else httpResponse.Ok(res, data);
    } catch (error) {
      next(error);
    }
  };

  login = async(req, res, next) =>{
    try {
     const token = await this.service.login(req.body);
      res.cookie('token', token, { httpOnly: true });
      if(!token) return httpResponse.NotFound(res, token);
      else return httpResponse.Ok(res, token)
    } catch (error) {
      next(error);
    }
  };

  profile =async(req, res, next)=>{
    try {
     if(req.user){
      const { _id } = req.user;
      const user = await this.service.getUserById(_id);
      return httpResponse.Ok(res, user);
     } else httpResponse.Unauthorized(res, 'Unauthorized');
    } catch (error) {
      next(error);
    }
  };

};