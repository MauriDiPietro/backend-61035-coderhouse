import { UserModel } from "./models/user.model.js";

  export const getByEmail = async(email) => {
    try {
      const response = await UserModel.find({ email: email });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  export const getById = async(id) => {
    try {
      const response = await UserModel.findById(id).populate("cart");
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  export const getAll = async(page = 1, limit = 10) => {
    try {
      const response = await UserModel.paginate({}, { page, limit });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  export const create = async(obj) => {
    try {
      const response = await UserModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  export const update = async(id, obj) => {
    try {
      await UserModel.updateOne({ _id: id }, obj);
      return obj;
    } catch (error) {
      console.log(error);
    }
  }

  export const remove = async(id) => {
    try {
      const response = await UserModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

