import { Document, ObjectId } from "mongoose";

export interface Product {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export type ProductType = {
  name: string;
  description: string;
  price: number;
  stock: number;
};

export interface Product2 extends Product {
  color: string;
}

export type ProductType2 = ProductType & {
  color: string;
};

export type Product3 = Pick<ProductType, "name" | "price">;

export type Product4 = Omit<ProductType, "description">;

export interface ProductResponseDB extends Product {
  _id: ObjectId;
  __v: string;
}

export type ProductMongoose = ProductType & Document;
