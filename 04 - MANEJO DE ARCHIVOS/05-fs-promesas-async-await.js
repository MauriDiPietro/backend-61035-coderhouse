const fs = require("fs");

class ManagerUsers {
  constructor(path) {
    this.path = path;
  }

  async getUsers() {
    try {
      if (fs.existsSync(this.path)) {
        const users = await fs.promises.readFile(this.path, "utf8");
        return JSON.parse(users); //javascript
      } else return [];
    } catch (error) {
      console.log(error);
    }
  }

  async createUser(user) {
    try {
      const users = await this.getUsers();
      users.push(user);
      await fs.promises.writeFile(this.path, JSON.stringify(users));
    } catch (error) {
      console.log(error);
    }
  }

  async deleteFile(){
    try {
        await fs.promises.unlink(this.path);
        console.log('archivo eliminado');
    } catch (error) {
        console.log(error);
    }
  }
}

const manager = new ManagerUsers("./users.json");

const user1 = {
  firstname: "Juan",
  lastname: "Perez",
  age: 45,
};

const user2 = {
  firstname: "Lucas",
  lastname: "Pereyra",
  age: 30,
};

const test = async() =>{
    console.log(await manager.getUsers())
    await manager.createUser(user1)
    await manager.createUser(user2)
    console.log(await manager.getUsers())
    // await manager.deleteFile()
}

test()
