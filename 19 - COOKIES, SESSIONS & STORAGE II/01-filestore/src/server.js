import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import userRouter from './routes/user.router.js';
import 'dotenv/config'

const FileStore = sessionFileStore(session);

const fileStoreConfig = {
    store: new FileStore({
        path: './sessions',
        ttl: 180,
        reapInterval: 200
    }),
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 180000
    }
};

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(session(fileStoreConfig));

app.use('/api', userRouter);

app.listen(8080, ()=>console.log('server ok puerto 8080'))