import mongoose from "mongoose";
import "dotenv/config";
import config from "./config.js";



try {
  await mongoose.connect(config.MONGO_URL);
  console.log("Conectado a la base de datos de MongoDB");
} catch (error) {
  console.log(`ERROR => ${error}`);
}

