import { initMongoDB } from "./01-conexion.js";
import { UserModel } from "./02-schema.js";

const consultas = async() =>{
    await initMongoDB();

    // console.log(await UserModel.find().sort({ age: 1 }));
    // console.log(await UserModel.findOne({ age: { $gt: 40 } }));
    // console.log(await UserModel.findById('664d316726ffac11253cdf9a'));
    console.log(await UserModel.find({ role: 'admin' }, { firstname: true, email: true }));
}

consultas()