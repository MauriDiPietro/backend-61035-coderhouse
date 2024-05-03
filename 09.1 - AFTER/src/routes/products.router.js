import { Router } from "express";
const router = Router();

import { __dirname } from "../path.js";

import ProductManager from "../managers/product.manager.js";
const productManager = new ProductManager(`${__dirname}/db/products.json`);

import { productValidator } from "../middlewares/productValidator.js";

router.get("/", async (req, res, next) => {
  try {
    const products = await productManager.getProducts();
    res.status(200).json(products);
    // throw new Error('error de prueba')
  } catch (error) {
    next(error);
  }
});

router.get("/:idProd", async (req, res) => {
  try {
    const { idProd } = req.params;
    const product = await productManager.getProductById(idProd);
    if (!product) res.status(404).json({ msg: "product not found" });
    else res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

router.post("/", productValidator, async (req, res) => {
  try {
    console.log(req.body);
    const product = req.body;
    const newProduct = await productManager.createProduct(product);
    res.json(newProduct);
  } catch (error) {
    next(error);
  }
});

router.put("/:idProd", async (req, res) => {
  try {
    const { idProd } = req.params;
    const prodUpd = await productManager.updateProduct(req.body, idProd);
    if (!prodUpd) res.status(404).json({ msg: "Error updating prod" });
    res.status(200).json(prodUpd);
  } catch (error) {
    next(error);
  }
});

router.delete("/:idProd", async (req, res) => {
  try {
    const { idProd } = req.params;
    const delProd = await productManager.deleteProduct(idProd);
    if (!delProd) res.status(404).json({ msg: "Error delete product" });
    else
      res
        .status(200)
        .json({ msg: `product id: ${idProd} deleted successfully` });
  } catch (error) {
    next(error);
  }
});

router.delete("/", async (req, res) => {
  try {
    await productManager.deleteFile();
    res.send("products deleted successfully");
  } catch (error) {
    next(error);
  }
});

export default router;
