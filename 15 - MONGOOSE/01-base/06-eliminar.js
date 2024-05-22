import { initMongoDB } from "./01-conexion.js";
import { UserModel } from "./02-schema.js";

const eliminar = async() =>{
    await initMongoDB();

    console.log(await UserModel.findByIdAndDelete('664d32a27f4826995191e7f2'));
    console.log(await UserModel.deleteOne({ _id: '664d316726ffac11253cdf9a'}));
    // console.log(await UserModel.find());
}
eliminar()