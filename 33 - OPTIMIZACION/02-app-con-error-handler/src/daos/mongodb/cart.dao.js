import MongoDao from "./mongo.dao.js";
import { CartModel } from "./models/cart.model.js";

export default class CartDaoMongoDB extends MongoDao {
  constructor() {
    super(CartModel);
  }
  async create() {
    try {
      return await this.model.create({
        products: [],
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      return await this.model.findById(id).populate("products.product");
    } catch (error) {
      throw new Error(error);
    }
  }

  async addProdToCart(cartId, prodId) {
    try {
      const existProdInCart = await this.existProdInCart(cartId, prodId);
        if(existProdInCart){
          return await this.model.findOneAndUpdate(
            { _id: cartId, 'products.product': prodId },
            { $set: { 'products.$.quantity': existProdInCart.products[0].quantity + 1 } },
            { new: true }
          );
        } else {
          return await this.model.findByIdAndUpdate(
            cartId,
            { $push: { products: { product: prodId } } },
            { new: true }
          )
        }
    } catch (error) {
      throw new Error(error);
    }
  }

  async existProdInCart(cartId, prodId){
    try {
      return await this.model.findOne({
        _id: cartId,
        products: { $elemMatch: { product: prodId } }
      })
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeProdToCart(cartId, prodId) {
    try {
      return await this.model.findOneAndUpdate(
        { _id: cartId },
        { $pull: { products: { product: prodId } } },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, obj) {
    try {
      const response = await this.model.findByIdAndUpdate(id, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProdQuantityToCart(cartId, prodId, quantity) {
    try {
     return await this.model.findOneAndUpdate(
      { _id: cartId, 'products.product': prodId },
      { $set: { 'products.$.quantity': quantity } },
      { new: true }
     );
    } catch (error) {
      throw new Error(error);
    }
  }

  async clearCart(cartId) {
    try {
     return await this.model.findByIdAndUpdate(
      cartId,
      { $set: { products: [] } },
      { new: true }
     );
    } catch (error) {
      throw new Error(error);
    }
  }
}
