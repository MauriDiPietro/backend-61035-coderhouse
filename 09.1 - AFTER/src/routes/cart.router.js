import { Router } from "express";
const router = Router();

import CartManager from "../managers/cart.manager.js";
import { __dirname } from "../path.js";
const cartManager = new CartManager(`${__dirname}/db/carts.json`);

router.post("/:idCart/product/:idProd", async (req, res, next) => {
   try {
    
   } catch (error) {
   }
});

router.post("/", async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
});

router.get("/:idCart", async (req, res) => {
  try {
    const {idCart} = req.params
    res.json(await cartManager.getCartById(idCart))
  } catch (error) {
    console.log(error);
  }
});

export default router;
