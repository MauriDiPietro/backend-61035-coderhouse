import Controllers from "./class.controller.js";
import ProductService from "../services/product.services.js";
import { createResponse } from "../utils.js";
const prodService = new ProductService();

export default class ProductController extends Controllers {
    constructor(){
        super(prodService);
    }

    createProd = async(req, res, next)=>{
        try {
            const newProd = await this.service.createProd(req.body);
            return createResponse(res, 200, newProd);
        } catch (error) {
            next(error);
        }
    }

    getProdById = async(req, res, next) => {
        try {
            const { id } = req.params;
            const data = await this.service.getProdById(id);
            return createResponse(res, 200, data);
        } catch (error) {
            next(error)
        }
    }
};