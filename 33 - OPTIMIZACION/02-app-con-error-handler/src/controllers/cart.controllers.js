import Controllers from "./class.controller.js";
import CartService from '../services/cart.services.js';
const cartService = new CartService();
import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();

export default class CartController extends Controllers{
  constructor(){
    super(cartService)
  }
  addProdToCart = async (req, res, next) => {
    try {
      // const { idCart } = req.params;
      // console.log(req.user)
      const { cart } = req.user;
      const { idProd } = req.params;
      const newProdToUserCart = await this.service.addProdToCart(
        cart,
        idProd,
      );
      if (!newProdToUserCart) return httpResponse.NotFound(res, "Error add product to cart") 
      else return httpResponse.Ok(res, newProdToUserCart);
    } catch (error) {
      next(error);
    }
  };

  removeProdToCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const delProdToUserCart = await this.service.removeProdToCart(
        idCart,
        idProd,
      );
      if (!delProdToUserCart) return httpResponse.NotFound(res, "cart or prod not existant");
      else return httpResponse.Ok(res, delProdToUserCart) 
    } catch (error) {
      next(error);
    }
  };

  updateProdQuantityToCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const { quantity } = req.body;
      const  updateProdQuantity = await this.service.updateProdQuantityToCart(
        idCart,
        idProd,
        quantity
      );
      if (!updateProdQuantity) httpResponse.NotFound(res, "cart or prod not existant") 
      else return httpResponse.Ok(res, updateProdQuantity)
    } catch (error) {
      next(error);
    }
  };

  clearCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const clearCart = await this.service.clearCart(
        idCart,
      );
      if (!clearCart) httpResponse.NotFound(res, "Error clear cart")  
      else return httpResponse.Ok(res, clearCart);
    } catch (error) {
      next(error);
    }
  };

}





  
  