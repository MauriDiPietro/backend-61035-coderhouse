import express from 'express';
import morgan from 'morgan';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { initMongoDB } from './daos/mongodb/connection.js';
import 'dotenv/config'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use('/users', usersRouter);
app.use('/pets', petsRouter);
app.use(errorHandler);

if(process.env.PERSISTENCE === 'MONGO') initMongoDB();

const PORT = 8080;

app.listen(PORT, () => console.log(`SERVER UP ON PORT ${PORT}`));

