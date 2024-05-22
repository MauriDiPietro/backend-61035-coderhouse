import { initMongoDB } from "./01-conexion.js";
import { UserModel } from "./02-schema.js";

const actualizar = async() =>{
    await initMongoDB();

    console.log(await UserModel.findByIdAndUpdate('664d32a27f4826995191e7f2', { role: 'user' }, { new:true }));
    console.log(await UserModel.updateOne({ _id: '664d32a27f4826995191e7f2'}, { $set: { role: 'usertest' } }));
}
actualizar()