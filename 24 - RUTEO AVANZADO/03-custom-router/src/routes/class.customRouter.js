import { Router as CustomRouter } from 'express';
import { checkAuth } from '../middlewares/jwt.js';

export default class Router {
    constructor(){
        this.router = CustomRouter();   //const router = Router()
        this.init();
    }

    getRouter(){
        return this.router
    }

    //.get('/', [middleware, ..., controller])

    get(path, roles, ...cb){
        this.router.get(path, this.managerRoles(roles), this.resolveCallbacks(cb))
    }

    post(path, roles, ...cb){
        this.router.post(path, this.managerRoles(roles), this.resolveCallbacks(cb))
    }

    put(path, roles, ...cb){
        this.router.put(path, this.managerRoles(roles), this.resolveCallbacks(cb))
    }

    delete(path, roles, ...cb){
        this.router.delete(path, this.managerRoles(roles), this.resolveCallbacks(cb))
    }

    resolveCallbacks(callbacks){
        return callbacks.map((cb) => async(...params) => {
            try {
                await cb.apply(this, params)
            } catch (error) {
                throw new Error(error)
            }
        })
    }

    managerRoles(roles){
        return async(req, res, next) => {
            if(roles.includes('PUBLIC')) return next();
            const authHeader = req.get('Authorization');
            if(!authHeader) return res.json({ msg: 'Unhatorized' });
            const user = await checkAuth(req, res, next);
            if(roles.includes(user.role.toUpperCase())) return next();
            else return res.json({ msg: 'Unhatorized' });
        }
    }
}