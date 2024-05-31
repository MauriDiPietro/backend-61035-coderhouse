import { getRandomNumber } from "../../utils.js";
import { UserModel } from "./models/user.model.js";

export default class UserDaoMongoDB {

  async aggregation1(gender){
    try {
      return await UserModel.aggregate([
        {
          $match: { 
            gender: `${gender}`,
            age: { $gte: 18 } 
          }
        }
      ])
    } catch (error) {
      throw new Error(error);
    }
  }

  async aggregation2(){
    try {
      return await UserModel.aggregate([
        {
          $match: {
            // age: { $gte: 18 }
            pets: { name: 'Firulais' }
          }
        }, 
        {
          $group: {
            _id: '$gender',
            average_age: { $avg: '$age' },
            count: { $sum: 1 },
            youngest: { $min: '$age' },
            oldest: { $max: '$age' }
          }
        }, 
        {
          $sort: {
            average_age: 1
          }
        }
      ])
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateManyAge (){
    try {
        const users = await UserModel.find({})
        const updatePromises = users.map(user => {
          return UserModel.findByIdAndUpdate(user._id, {
            $set: { age: getRandomNumber() }
          });
        });
        await Promise.all(updatePromises);
        return { message: 'updated ok' };
    } catch (error) {
      throw new Error(error);
    }
  }

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

  async getAllUsers(page = 1, limit = 10, first_name, sort) {
    try {
      const filter = first_name ? { 'first_name': first_name } : {};
    
      let sortOrder = {};

      if (sort) sortOrder.age = sort === 'asc' ? 1 : sort === 'desc' ? -1 : null; 
      //sort: { age: 1 }
      return await UserModel.paginate(filter, {page, limit, sort: sortOrder});
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
