import { CartModel } from "./models/cart.model.js";


  export const create = async()=> {
    try {
      return await CartModel.create({
        products: [],
      });
    } catch (error) {
      console.log(error);
    }
  }

  export const getAll = async() =>{
    try {
      return await CartModel.find({});
    } catch (error) {
      console.log(error);
    }
  }

  export const getById = async(id)=> {
    try {
      return await CartModel.findById(id).populate("products.product");
    } catch (error) {
      console.log(error);
    }
  }

  export const remove = async(id)=> {
    try {
      return await CartModel.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
    }
  }

  export const addProdToCart = async(cartId, prodId, quantity) =>{
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) return null;
      //Buscar si existe el prod en el carrito
      const existProdIndex = cart.products.findIndex(p => p.product.toString() === prodId);

      if(existProdIndex !== -1) {
        //si el prod existe en el carrito
        cart.products[existProdIndex].quantity = quantity;
      } else cart.products.push({ product: prodId, quantity });

      await cart.save();

      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  export const existProdInCart = async(cartId, prodId) =>{
    try {
      return await CartModel.findOne({
        _id: cartId,
        products: { $elemMatch: { product: prodId } }
      })
    } catch (error) {
      throw new Error(error);
    }
  }

  export const removeProdToCart = async(cartId, prodId) =>{
    try {
      return await CartModel.findOneAndUpdate(
        { _id: cartId },
        { $pull: { products: { product: prodId } } },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  export const update = async(id, obj)=> {
    try {
      const response = await CartModel.findByIdAndUpdate(id, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  export const updateProdQuantityToCart = async(cartId, prodId, quantity)=> {
    try {
     return await CartModel.findOneAndUpdate(
      { _id: cartId, 'products.product': prodId },
      { $set: { 'products.$.quantity': quantity } },
      { new: true }
     );
    } catch (error) {
      console.log(error);
    }
  }

  export const clearCart = async(cartId) =>{
    try {
     return await CartModel.findByIdAndUpdate(
      cartId,
      { $set: { products: [] } },
      { new: true }
     );
    } catch (error) {
      console.log(error);
    }
  }

