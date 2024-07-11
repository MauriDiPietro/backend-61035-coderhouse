import { ProductModel } from "./models/product.model.js";

  export const getAll = async(page = 1, limit = 10, name, sort) => {
    try {
      const filter = name ? { 'name': name } : {};
      let sortOrder = {};
      if(sort) sortOrder.price = sort === 'asc' ? 1 : sort === 'desc' ? -1 : null; 
      return await ProductModel.paginate(filter, { page, limit, sort: sortOrder }); //sort: { price: 1 } 
    } catch (error) {
      console.log(error);
    }
  }

  export const getById = async(id) => {
    try {
      const response = await ProductModel.findById(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  export const create = async(obj) => {
    try {
      const response = await ProductModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  export const update = async(id, obj) => {
    try {
      const response = await ProductModel.findByIdAndUpdate(id, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  export const remove = async(id) =>{
    try {
      const response = await ProductModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
