import express from 'express';
import dotenv from 'dotenv'
const ENV = process.argv.slice(2)[0];
dotenv.config({ path: ENV === 'prod' ? './.env.prod' : './.env.dev' })

import './database.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`🚀 Server listening on port ${PORT} in ${process.env.NODE_ENV} mode`);
});



