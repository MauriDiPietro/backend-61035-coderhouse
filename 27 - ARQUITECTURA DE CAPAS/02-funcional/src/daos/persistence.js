import * as ProductDaoMongo from './mongodb/product.dao.js'
import * as UserDaoMongo from './mongodb/user.dao.js'
import * as CartDaoMongo from './mongodb/cart.dao.js'
import { initMongoDB } from '../db/database.js'

let prodDao = null;
let userDao = null;
let cartDao = null;

let persistence = process.argv[2];

switch (persistence) {
    case 'fs':
        console.log(persistence)
        // prodDao = ProductDaoFS('./src/daos/filesystem/products.json');
        // userDao = new UserDaoFS('./src/daos/....
        // cartDao = new
        break;
    case 'mongo':
        console.log(persistence)
        initMongoDB();
        userDao = UserDaoMongo;
        prodDao = ProductDaoMongo;
        cartDao = CartDaoMongo;
        break;
    // case 'sql':
    //     userDao = new UserDaoSql();
    //     prodDao = new ProductDaoSql();
    //     cartDao = new CartDaoSqlDB();
    default:
        // prodDao = new ProductDaoFS('./src/daos/filesystem/products.json');
        // userDao = new UserDaoFS('./src/daos/....
        // cartDao = new
    break;
}

export default { userDao, prodDao, cartDao };