import { initMongoDB } from "./01-conexion.js";
import { UserModel } from "./02-schema.js";

const createUser = async (user) => {
  await UserModel.create(user);
};

const test = async () => {
  //conexion a la db
  await initMongoDB();

  const newUser = {
    firstname: "Carlos",
    lastname: "Tevez",
    email: "ctevez@mail.com",
    username: "ctevez",
    password: "1234",
    age: 45,
    role: 'admin'
  };

  await createUser(newUser);
  console.log('usuario creado');
};

test();
