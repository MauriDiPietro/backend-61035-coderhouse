import { PetModel } from "./models/pet.model.js";

export default class PetDaoMongoDB {
  async getPetById(id) {
    try {
      return await PetModel.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllPets() {
    try {
      return await PetModel.find({});
    } catch (error) {
      throw new Error(error);
    }
  }

  async createPet(obj) {
    try {
      return await PetModel.create(obj);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updatePet(id, obj) {
    try {
      return await PetModel.findByIdAndUpdate(id, obj, { new: true });
    } catch (error) {
      throw new Error(error);
    }
  }

  async deletePet(id) {
    try {
      return await PetModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
