import express from 'express';
import cors from 'cors';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { initMongoDB } from './db/connection.js'
import { ProductModel } from './product.model.js'

//USUARIO VENDEDOR
const client = new MercadoPagoConfig({ accessToken: "TEST-8622585947061577-031418-b6984e2b4c92d7e1e4995c62a3a714a4-1479464010" });
const preference = new Preference(client)

const app = express();

app.use(express.json());
app.use(cors());

app.post('/create-preference', async (req, res)=>{
    const { quantity, price, title } = req.body;
    const body = {
        items: [
            {
                title: title,
                quantity: Number(quantity),
                unit_price: Number(price),
                currency_id: 'ARS'
            }
        ],
        back_urls: {
            success: 'http://localhost:3000',
            failure: 'http://localhost:3000',
            pending: 'http://localhost:3000'
        },
        auto_return:'approved'
    };

    const response = await preference.create({body});
    res.json({ id: response.id })
})

app.get('/products', async(req, res)=>{
    res.json(await ProductModel.find())
})

initMongoDB().then(()=>console.log('conectado a la db')).catch((error)=>console.log(error));

app.listen(8080, ()=>console.log('server ok puerto 8080'))