import express from "express";
import PaymentService from "./services/payment.service.js";
import cors from 'cors'
import 'dotenv/config'

const app = express();

app.use(express.json());
app.use(cors());

const products = [
  { id: 1, name: "papas", price: 1000 },
  { id: 2, name: "queso", price: 500 },
  { id: 3, name: "hamburguesa", price: 1500 },
  { id: 4, name: "soda", price: 1000 },
  { id: 5, name: "golosinas", price: 800 },
];

app.post('/api/payments/payment-intents', async(req, res)=>{
    const { id } = req.query;
    const productRequested = products.find(prod => prod.id === Number(id));
    if(!productRequested) return res.status(404).json({msg: 'Product not found'});
    const paymentIntentInfo = {
        amount: productRequested.price,
        currency: 'usd',
        metadata: {
            userId: 'asdasdas7d8asd7',
            email: 'user@mail.com',
            orderDetails: JSON.stringify({
                [productRequested.name]: 2
            })
        }
    };
    const service = new PaymentService();
    const response = await service.createPaymentIntent(paymentIntentInfo);
    console.log(response);
    res.json({
        status: 'success',
        payload: response
    })
})


app.get('/', (req, res)=>{
    res.send('hola')
})

app.listen(8080, () => console.log("Server ok en puerto 8080"));
