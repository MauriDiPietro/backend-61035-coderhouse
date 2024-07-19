import { Router } from 'express';
import ProductController from '../controllers/product.controllers.js';
import { validatorProduct } from '../middlewares/validators/product.validator.js';
const controller = new ProductController();

const router = Router();

router.get('/', controller.getAll);

router.get('/:id', validatorProduct, controller.getById);

router.post('/', controller.create);

router.put('/:id', controller.update);

router.delete('/:id', controller.delete);

export default router;

