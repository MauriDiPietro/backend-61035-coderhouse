import { UserModel } from "./models/user.model.js";

export default class UserDaoMongoDB {
  async addPetToUser(userId, petId){
    try {
      return await UserModel.findByIdAndUpdate(
        userId,
        { $push: { pets: petId } },
        { new: true }
      );
      /* ------------------------------------ - ----------------------------------- */
      // const user = await UserModel.findById(userId);
      // user.pets.push(petId);
      // user.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserById(id) {
    try {
      const response = await UserModel.findById(id).populate('pets');
      // .explain()
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserByName(name) {
    try {
      return await UserModel.find({ first_name: name }).explain()
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllUsers() {
    try {
      const response = await UserModel.find({});
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createUser(obj) {
    try {
      const response = await UserModel.create(obj);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateUser(id, obj) {
    try {
      return await UserModel.findByIdAndUpdate(id, obj, { new: true });
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(id) {
    try {
      const response = await UserModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
