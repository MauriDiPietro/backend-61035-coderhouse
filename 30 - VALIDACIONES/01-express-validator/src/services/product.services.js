import Services from "./class.services.js";
// import ProductDaoMongo from "../daos/mongodb/product.dao.js";
// const prodDao = new ProductDaoMongo();
import persistence from '../daos/persistence.js';
const { prodDao } = persistence;


export default class ProductService extends Services {
    constructor(){
        super(prodDao);
    }
};