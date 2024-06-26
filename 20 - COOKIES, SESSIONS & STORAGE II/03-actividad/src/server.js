import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import userRouter from './routes/user.router.js';
import viewsRouter from './routes/views.router.js';
import MongoStore from 'connect-mongo';
import { initMongoDB } from './db/database.js';
import handlebars from 'express-handlebars';
import { __dirname } from './utils.js';
import 'dotenv/config';

const storeConfig = {
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        crypto: { secret: process.env.SECRET_KEY },
        ttl: 180,
    }),
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 180000 }
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
app.use(session(storeConfig));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

initMongoDB()

app.use('/users', userRouter);
app.use('/', viewsRouter);

app.listen(8080, ()=>console.log('server ok puerto 8080'))