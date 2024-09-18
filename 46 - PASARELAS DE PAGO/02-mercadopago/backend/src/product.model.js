import { Schema, model } from "mongoose";

export const productCollectionName = "products";

export const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  image: { type: String }
});


export const ProductModel = model(productCollectionName, productSchema);
