import ProductDaoMongo from "./mongodb/product.dao.js";
import ProductDaoFS from './filesystem/product.dao.js';
import CartDaoMongoDB from "./mongodb/cart.dao.js";
import UserDaoMongo from "./mongodb/user.dao.js";
import { initMongoDB } from '../db/connection.js'

let prodDao = null;
let userDao = null;
let cartDao = null;

let persistence = process.argv[2];

switch (persistence) {
    case 'fs':
        console.log(persistence)
        prodDao = new ProductDaoFS('./src/daos/filesystem/products.json');
        // userDao = new UserDaoFS('./src/daos/....
        // cartDao = new
        break;
    case 'mongo':
        console.log(persistence)
        initMongoDB();
        userDao = new UserDaoMongo();
        prodDao = new ProductDaoMongo();
        cartDao = new CartDaoMongoDB();
        break;
    // case 'sql':
    //     userDao = new UserDaoSql();
    //     prodDao = new ProductDaoSql();
    //     cartDao = new CartDaoSqlDB();
    default:
        prodDao = new ProductDaoFS('./src/daos/filesystem/products.json');
        // userDao = new UserDaoFS('./src/daos/....
        // cartDao = new
    break;
}

export default { userDao, prodDao, cartDao };