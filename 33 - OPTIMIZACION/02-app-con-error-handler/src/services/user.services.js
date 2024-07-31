import Services from "./class.services.js";
import UserDaoMongo from "../daos/mongodb/user.dao.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { createHash, isValidPassword } from "../utils/utils.js";
import CartDaoMongo from "../daos/mongodb/cart.dao.js";
import UserRepository from "../repository/user.repository.js";
const userRepository = new UserRepository();

const userDao = new UserDaoMongo();
const cartDao = new CartDaoMongo();

export default class UserService extends Services {
  constructor() {
    super(userDao);
  }

  generateToken(user, time = "5m") {
    const payload = {
      userId: user._id,
    };
    return jwt.sign(payload, process.env.SECRET_KEY_JWT, { expiresIn: time });
  }

  async register(user) {
    try {
      const { email, password } = user;
      const existUser = await this.dao.getByEmail(email);
      if (!existUser) {
        const cartUser = await cartDao.create();
        if (
          email === process.env.EMAIL_ADMIN &&
          password === process.env.PASS_ADMIN
        ) {
          const newUser = await this.dao.create({
            ...user,
            password: createHash(password),
            role: "admin",
            cart: cartUser._id,
          });
          return newUser;
        } else {
          const newUser = await this.dao.create({
            ...user,
            password: createHash(password),
            cart: cartUser._id,
          });
          return newUser;
        }
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(user) {
    try {
      const { email, password } = user;
      const userExist = await this.dao.getByEmail(email);
      if (!userExist) return null;
      const passValid = isValidPassword(password, userExist);
      if (!passValid) return null;
      if (userExist && passValid) return this.generateToken(userExist);
    } catch (error) {
      throw new Error(error);
    }
  }

  getUserById = async (id) => {
    try {
      return await userRepository.getUserById(id);
    } catch (error) {
      throw new Error(error);
    }
  };
}
