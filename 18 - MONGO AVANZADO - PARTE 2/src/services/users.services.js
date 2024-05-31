import UserDaoMongoDB from "../daos/mongodb/users.dao.js";
const userDao = new UserDaoMongoDB();
import PetDaoMongoDB from "../daos/mongodb/pets.dao.js";
const petDao = new PetDaoMongoDB();
import fs from 'fs';
import {__dirname} from '../utils.js';

export const aggregation1 = async(gender)=>{
  try {
    return await userDao.aggregation1(gender)
  } catch (error) {
    throw new Error(error)
  }
}

export const aggregation2 = async()=>{
  try {
    return await userDao.aggregation2()
  } catch (error) {
    throw new Error(error)
  }
}

export const updateManyAge = async()=>{
  try {
    return await userDao.updateManyAge();
  } catch (error) {
    console.log(error);
  }
}

export const addPetToUser = async (userId, petId) => {
  try {
    const exists = await petDao.getPetById(petId);
    if(!exists) return null;
    else return await userDao.addPetToUser(userId, petId);
  } catch (error) {
    throw new Error(error);
  }
}

export const createFileUser = async () => {
  try {
    const usersFile = JSON.parse(fs.readFileSync(`${__dirname}/data/Users.json`, 'utf-8'));
    const newUsers = await userDao.createUser(usersFile);
    if(!newUsers) return null;
    else return newUsers.length;
  } catch (error) {
    throw new Error(error);
  }
};


export const getByNameUser = async (name) => {
  try {
    return await userDao.getUserByName(name);
  } catch (error) {
    throw new Error(error);
  }
};

export const getByIdUser = async (id) => {
  try {
    return await userDao.getUserById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const getByEmailUser = async (email) => {
  try {
    return await userDao.getUserByEmail(email);
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllUsers = async (page, limit, query, sort) => {
  try {
    return await userDao.getAllUsers(page, limit, query, sort);
  } catch (error) {
    throw new Error(error);
  }
};

export const createUser = async (obj) => {
  try {
    return await userDao.createUser(obj);
  } catch (error) {
    throw new Error(error);
  }
};

export const updateUser = async (id, obj) => {
  try {
    return await userDao.updateUser(id, obj);
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteUser = async (id) => {
  try {
    return await userDao.deleteUser(id);
  } catch (error) {
    throw new Error(error);
  }
};
