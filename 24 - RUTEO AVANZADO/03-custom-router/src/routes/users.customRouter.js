import { login, profile } from "../controllers/user.controller.js";
import { checkAuth } from "../middlewares/jwt.js";
import Router from "./class.customRouter.js";

export default class UserCustomRouter extends Router{
    init(){
        this.post('/login', login);
        this.get('/private', checkAuth, profile);
    }
}