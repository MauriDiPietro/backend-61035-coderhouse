import { UserModel } from '../models/user.model.js';
import {generateUser} from '../utils/user.utils.js';

export const createUsersMock = async (cant = 50) => {
  try {
    const usersArray = [];
    for (let i = 0; i < cant; i++) {
      const user = generateUser();
      usersArray.push(user);
    }
    return await UserModel.create(usersArray);
  } catch (error) {
    throw new Error(error);
  }
};

export const getUsers = async() => {
  try {
    return await UserModel.find({})
  } catch (error) {
    throw new Error(error);
  }
};

