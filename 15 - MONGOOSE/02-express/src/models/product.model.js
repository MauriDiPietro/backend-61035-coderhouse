import {Schema, model} from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

export const ProductModel = model(
  "product",
  ProductSchema
);
