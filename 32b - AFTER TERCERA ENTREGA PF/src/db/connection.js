import { connect } from 'mongoose';
import 'dotenv/config';
import MongoStore from "connect-mongo";

export const initMongoDB = async () => {
  try {
    await connect(process.env.MONGO_ATLAS_URL || process.env.MONGO_LOCAL_URL);
    console.log('Conectado a la base de datos de MongoDB');
  } catch (error) {
    throw new Error(error);
  }
};

export const storeConfig = {
  store: MongoStore.create({
    mongoUrl:
    process.env.MONGO_ATLAS_URL || process.env.MONGO_LOCAL_URL,
    crypto: { secret: process.env.SECRET_KEY || "" },
    ttl: 180,
  }),
  secret: process.env.SECRET_KEY || "",
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 180000 },
};