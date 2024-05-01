import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class UserManager {
  constructor(path) {
    this.path = path;
  }

  async getUsers() {
    try {
      if (fs.existsSync(this.path)) {
        const users = await fs.promises.readFile(this.path, "utf8");
        return JSON.parse(users);
      } else return [];
    } catch (error) {
      console.log(error);
    }
  }

  async createUser(obj) {
    try {
      const user = {
        id: uuidv4(),
        ...obj,
      };
      const users = await this.getUsers();
      const userExist = users.find((u) => u.username === user.username);
      if (userExist) return "User already exists";
      users.push(user);
      await fs.promises.writeFile(this.path, JSON.stringify(users));
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async getUserById(id) {
    try {
      const users = await this.getUsers();
      const userExist = users.find((u) => u.id === id);
      if (!userExist) return null;
      return userExist;
    } catch (error) {
      console.log(error);
    }
  }

  async updateUser(obj, id) {
    try {
      const users = await this.getUsers();
      let userExist = await this.getUserById(id);
            // console.log(userExist);
      if (!userExist) return null;
      userExist = { ...userExist, ...obj };
      // console.log(userExist);
      const newArray = users.filter((u) => u.id !== id);
      newArray.push(userExist)
      await fs.promises.writeFile(this.path, JSON.stringify(newArray));
      return userExist;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(id) {
    const users = await this.getUsers();
    if (users.length > 0) {
      const userExist = await this.getUserById(id);
      // console.log(userExist);
      if (userExist) {
        const newArray = users.filter((u) => u.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(newArray));
        return userExist
      } 
    } else return null
  }

  async deleteFile() {
    try {
      await fs.promises.unlink(this.path);
      console.log("archivo eliminado");
    } catch (error) {
      console.log(error);
    }
  }
}
