const fs = require("fs");
const crypto = require("crypto");

class UserManager {
  constructor(path) {
    this.path = path;
  }

  async getUsers() {
    if (fs.existsSync(this.path)) {
      const usersFile = await fs.promises.readFile(this.path, "utf8");
      const users = JSON.parse(usersFile);
      return users;
    } else return [];
  }

  async createUser(user){
    const usersFile = await this.getUsers();
    const userExist = usersFile.find((usr) => usr.username === user.username);
    if(userExist) return 'Usuario existente'
    user.salt = crypto.randomBytes(128).toString(); 
    // user.password = crypto.createHmac('sha256', user.salt).update(user.password).digest('hex');
    user.password = crypto.createHmac('sha256', user.salt).update(user.password).digest('base64');
    usersFile.push(user);
    await fs.promises.writeFile(this.path, JSON.stringify(usersFile));
  }

  async validateUser(username, password){
    const usersFile = await this.getUsers();
    const user = usersFile.find((usr) => usr.username === username);
    if(!user) return 'Error: user o password incorrecto'
    // const nuevaCrypto = crypto.createHmac('sha256', user.salt).update(password).digest('hex')
    const nuevaCrypto = crypto.createHmac('sha256', user.salt).update(password).digest('base64')
    if(user.password === nuevaCrypto) return 'Login OK'
    else return 'User o password incorrectos'
  }
}

const manager = new UserManager('./Users.json')

const user1 = {
    firstname: 'Juan',
    lastname: 'Gomez',
    username: 'JGomez',
    password: '1234'   
}

const user2 = {
    firstname: 'Leandro',
    lastname: 'Maximino',
    username: 'LeanElmejor',
    password: '12345'   
}

const test = async() =>{
    await manager.createUser(user2)
    console.log(await manager.createUser(user1))
    // console.log(await manager.getUsers());
    console.log(await manager.validateUser('LeanElmejor', '12345'));
} 

test()
