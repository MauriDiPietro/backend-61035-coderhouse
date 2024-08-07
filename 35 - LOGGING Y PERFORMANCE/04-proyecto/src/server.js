import express from 'express';
import { logger } from './utils/logger.js';

const app = express();

app.get('/', (req, res)=>{
    try {
        logger.error('error en el endpoint');
    } catch (error) {
        logger.error(error.message);
        throw new Error(error)
    }
})

app.listen(8080, ()=> logger.info('Server ok en puerto 8080'))