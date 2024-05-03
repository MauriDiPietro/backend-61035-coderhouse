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
      console.log(error);
    }
  }

  async createCart() {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById(id) {
    try {
      const carts = await this.getAllCarts();
      const cart = carts.find((c) => c.id === id);
      if (!cart) return null;
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async saveProductToCart(idCart, idProduct) {}
}
