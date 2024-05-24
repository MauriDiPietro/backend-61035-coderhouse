import { Router } from "express";
// import {
//   getAllProducts,
//   getProductById,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// } from "../controllers/product.controllers.js";
import * as controllers from '../controllers/product.controllers.js'

const router = Router();

router.get("/", controllers.getAllProducts);

router.get("/:id", controllers.getProductById);

router.post("/", controllers.createProduct);

router.put("/:id", controllers.updateProduct);

router.delete("/:id", controllers.deleteProduct);

export default router;
