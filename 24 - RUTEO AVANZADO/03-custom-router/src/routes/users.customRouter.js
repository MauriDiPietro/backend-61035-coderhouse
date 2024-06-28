import { login, profile, register } from "../controllers/user.controller.js";
import { checkAuth } from "../middlewares/jwt.js";
import Router from "./class.customRouter.js";

export default class UserCustomRouter extends Router{
    init(){
        this.post('/register', ['PUBLIC'], register)
        this.post('/login', ['PUBLIC'], login);
        this.get('/private', ['USER'], checkAuth, profile);
        this.get('/admin', ['ADMIN'], (req, res)=>res.success(200, 'ruta admin'))
        this.get('/user', ['USER'], (req, res)=>res.success(200, 'ruta user'));
    }
}