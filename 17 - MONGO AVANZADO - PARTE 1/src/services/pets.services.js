import PetsDaoMongoDB from "../daos/mongodb/pets.dao.js";
const petsDao = new PetsDaoMongoDB();

export const getByIdPet = async (id) => {
  try {
    return await petsDao.getPetById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const createPet = async (obj) => {
  try {
    return await petsDao.createPet(obj);
  } catch (error) {
    throw new Error(error);
  }
};

export const updatePet = async (id, obj) => {
  try {
    return await petsDao.updatePet(id, obj);
  } catch (error) {
    throw new Error(error);
  }
};

export const deletePet = async (id) => {
  try {
    return await petsDao.deletePet(id);
  } catch (error) {
    throw new Error(error);
  }
};
