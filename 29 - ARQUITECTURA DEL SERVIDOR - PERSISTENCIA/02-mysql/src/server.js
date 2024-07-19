import 'dotenv/config';
import express, { json, urlencoded } from 'express';
import db from './db/connection.js';
import prodRouter from './routes/product.router.js';

const app = express();

db.sync({ force: false }).then(()=>console.log('Conectado a MySQL')).catch((error)=>console.log(error))

app
    .use(json())
    .use(urlencoded({ extended: true }))
    .use('/api/products', prodRouter)

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>console.log(`Server OK PORT: ${PORT}`));