import Services from "./class.services.js";
// import ProductDaoMongo from "../daos/mongodb/product.dao.js";
// const prodDao = new ProductDaoMongo();
import factory from '../persistence/daos/factory.js';
const { prodDao } = factory;
import ProductRepository from "../persistence/repository/product.repository.js";
const prodRepository = new ProductRepository();


export default class ProductService extends Services {
    constructor(){
        super(prodDao);
    }

    createProd = async(prod) => {
        try {
            return await prodRepository.createProd(prod);
        } catch (error) {
            throw new Error(error)
        }
    }

    getProdById = async(id)=>{
        try {
            return await prodRepository.getProdById(id);
        } catch (error) {
            throw new Error(error)
        }
    }
};