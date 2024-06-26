import { Router } from "express";
const router = Router();

import productsRouter from './products.router.js';
import usersRouter from './users.router.js';
import cartsRouter from './carts.router.js';

router.use('/products', productsRouter);
router.use('/users', usersRouter);
router.use('/carts', cartsRouter);

export default router;
