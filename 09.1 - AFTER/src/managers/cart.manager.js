import { __dirname } from "../path.js";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

import ProductManager from "./product.manager.js";
const productManager = new ProductManager(`${__dirname}/db/products.json`);

export default class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getAllCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const carts = await fs.promises.readFile(this.path, "utf-8");
        const cartsJSON = JSON.parse(carts);
        return cartsJSON;
      } else {
        return [];
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async createCart() {
    try {
      const cart = {
        id: uuidv4(),
        products: []
      };
      const cartsFile = await this.getAllCarts();
      cartsFile.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCartById(id) {
    try {
      const carts = await this.getAllCarts();
      const cart = carts.find((c) => c.id === id);
      if (!cart) return null;
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async saveProductToCart(idCart, idProduct) {
    try {
      const prodExist = await productManager.getProductById(idProduct); //verificamos si el prod existe en el json
      if(!prodExist) throw new Error('product not exist');
      const cartExist = await this.getCartById(idCart); //verificamos si el cart existe en el json
      if(!cartExist) throw new Error('cart not exist');
      let cartsFile = await this.getAllCarts();
      const existProdInCart = cartExist.products.find((prod) => prod.id === idProduct); //verificamos si el prod existe en el cart 
      if(!existProdInCart) {
        //si no existe, lo agregamos
        const product = {
          id: idProduct,
          quantity: 1
        };
        cartExist.products.push(product);
      } else existProdInCart.quantity++;
      const updatedCarts = cartsFile.map((cart) => {
        if(cart.id === idCart) return cartExist
        return cart
      })
      await fs.promises.writeFile(this.path, JSON.stringify(updatedCarts));
      return cartExist 
    } catch (error) {
      throw new Error(error)
    }
  }
}
