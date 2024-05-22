import mongoose from "mongoose";

const connectionString = 'mongodb://127.0.0.1:27017/coder61035';

export const initMongoDB = async () => {
    try {
        await mongoose.connect(connectionString);
        console.log('Conectado a la db');
    } catch (error) {
        console.log(error);
    }
}

