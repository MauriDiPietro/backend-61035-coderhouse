import { Router as CustomRouter } from 'express';

export default class Router {
    constructor(){
        this.router = CustomRouter();   //const router = Router()
        this.init();
    }

    getRouter(){
        return this.router
    }

    //.get('/', [middleware, ..., controller])

    get(path, ...cb){
        this.router.get(path, this.generateResponse, this.resolveCallbacks(cb))
    }

    post(path, ...cb){
        this.router.post(path, this.generateResponse, this.resolveCallbacks(cb))
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

    generateResponse(req, res, next) {
        res.success = (statusCode, data) => res.status(statusCode).json({ status: 'success', info: data });
        res.failure = (statusCode, data) => res.status(statusCode).json({ status: 'failure', info: data });
        next();
    }
}