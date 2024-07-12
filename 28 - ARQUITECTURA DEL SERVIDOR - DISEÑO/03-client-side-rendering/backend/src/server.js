import 'dotenv/config';
import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';
import MainRouter from './routes/index.js';
const mainRouter = new MainRouter();

const app = express();

app
    .use(cors({ origin: process.env.REACT_APP, credentials: true }))
    .use(json())
    .use(urlencoded({ extended: true }))
    .use(morgan('dev'))
    .use('/api', mainRouter.getRouter())
    .use(errorHandler)

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>console.log(`Server OK PORT: ${PORT}`));