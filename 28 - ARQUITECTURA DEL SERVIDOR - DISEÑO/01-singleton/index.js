import mongoose from "mongoose";

class ConnectMongoDB {
    static #instance;

    constructor(){
        mongoose.connect('mongodb://localhost:27017/coderhouse')
    }

    static getInstance(){
        if(this.#instance){
            console.log('Ya está conectado a MongoDB!');
            return this.#instance;
        } else {
            this.#instance = new ConnectMongoDB();
            console.log('Conectado a MongoDB!');
            return this.#instance;
        }
    }
};

const con1 = ConnectMongoDB.getInstance();
const con2 = ConnectMongoDB.getInstance();
const con3 = ConnectMongoDB.getInstance();