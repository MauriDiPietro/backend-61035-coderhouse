import { connect } from "mongoose";
import "dotenv/config";

export class ConnectMongoDB {
  static #instance;
  constructor() {
      //OPCION1
      // connect(process.env.MONGO_ATLAS_URL || process.env.MONGO_LOCAL_URL)
      //   .then(()=>console.log('Conectado a MongoDB'))
      //   .catch((error)=>console.log(error))
  }

  async initMongoDB(){
      try {
        await connect(process.env.MONGO_ATLAS_URL || process.env.MONGO_LOCAL_URL);
        console.log('Conectado a la base de datos de MongoDB');
      } catch (error) {
        throw new Error(error);
      }
    };

  static async getInstance() {
    if (this.#instance) {
      console.log("Ya está conectado a MongoDB!");
      return this.#instance;
    } else {
      this.#instance = await this.initMongoDB();    //OPCION2
      // this.#instance = new ConnectMongoDB();     //OPCION1
      // console.log("Conectado a MongoDB!");
      return this.#instance;
    }
  }
}
