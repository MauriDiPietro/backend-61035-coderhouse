import { UserModel } from "../daos/models/user.model.js";
import UserDao from "../daos/user.dao.js";
import { createHash, isValidPassword } from "../utils.js";

const userDao = new UserDao(UserModel);

export const getUserById = async (id) => {
  try {
    return await userDao.getById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserByEmail = async (email) => {
  try {
    return await userDao.getByEmail(email);
  } catch (error) {
    throw new Error(error);
  }
};

export const register = async (user) => {
  try {
    const { email, password } = user;
    const existUser = await getUserByEmail(email);
    if (!existUser) {
      if (email === "adminCoder@coder.com" && password === "adminCoder123") {
        const newUser = await userDao.register({
          ...user,
          password: createHash(password),
          role: "admin",
        });
        return newUser;
      } else {
        const newUser = await userDao.register({
          ...user,
          password: createHash(password),
        });
        return newUser;
      }
    } else return null;
  } catch (error) {
    throw new Error(error);
  }
};

export const login = async (user) => {
  try {
    const { email, password } = user;
    const userExist = await getUserByEmail(email);
    if (!userExist) return null;
    const passValid = isValidPassword(password, userExist);
    if (!passValid) return null;
    return userExist;
  } catch (error) {
    throw new Error(error);
  }
};
