import { connect } from 'mongoose';
import MongoStore from "connect-mongo";
import config from '../config/index.js';

export const initMongoDB = async () => {
  try {
    await connect(config.MONGO_ATLAS_URL || config.MONGO_LOCAL_URL);
    console.log('Conectado a la base de datos de MongoDB');
  } catch (error) {
    throw new Error(error);
  }
};

export const storeConfig = {
  store: MongoStore.create({
    mongoUrl:
    config.MONGO_ATLAS_URL || config.MONGO_LOCAL_URL,
    crypto: { secret: config.SECRET_KEY || "" },
    ttl: 180,
  }),
  secret: config.SECRET_KEY || "",
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 180000 },
};