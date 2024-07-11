import express from 'express';
import morgan from 'morgan';
import userRouter from './routes/users.router.js';
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { initMongoDB } from './db/database.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/carts', cartRouter);

app.use(errorHandler);

initMongoDB();

const PORT = 8080;

app.listen(PORT, () => console.log(`SERVER UP ON PORT ${PORT}`));

