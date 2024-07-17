import factory from '../daos/factory.js';
const { prodDao } = factory;
import ProductDTO from '../dtos/product.req.dto.js';
import ProductResDTO from '../dtos/product.res.dto.js';

export default class ProductRepository {
    constructor(){
        this.dao = prodDao;
    }

    async createProd(prod){
        try {
            const prodDTO = new ProductDTO(prod);
            return await this.dao.create(prodDTO);
        } catch (error) {
            throw new Error(error)
        }
    }

    async getProdById(id) {
        try {
          const prod = await this.dao.getById(id);
          return new ProductResDTO(prod);
        } catch (error) {
          throw new Error(error);
        }
    };
}