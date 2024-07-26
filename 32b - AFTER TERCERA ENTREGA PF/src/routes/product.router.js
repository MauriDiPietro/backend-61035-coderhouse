import { Router } from 'express';
import ProductController from '../controllers/product.controllers.js';
import { checkAdmin } from '../middlewares/checkAdmin.js';
import { checkAuth } from '../middlewares/authJwt.js';
const controller = new ProductController();

const router = Router();

router.get('/', [checkAuth], controller.getAll);

router.get('/:id', [checkAuth], controller.getById);

router.post('/', [checkAuth, checkAdmin], controller.create);

router.put('/:id', [checkAuth, checkAdmin], controller.update);

router.delete('/:id', [checkAuth, checkAdmin], controller.delete);

export default router;

