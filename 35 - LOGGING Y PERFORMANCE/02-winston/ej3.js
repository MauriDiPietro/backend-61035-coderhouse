import winston from 'winston';
import 'winston-mongodb';

const logConfig = {
    transports: [ 
        new winston.transports.Console({ level: 'silly' }),
        winston.add(new winston.transports.MongoDB({
            options: { useUnifiedTopology: true },
            db: 'mongodb://localhost:27017/coderhouse',
            collection: 'logs',
            tryReconnect: true,
            level: 'error'
        }))
    ]
};

const logger = winston.createLogger(logConfig);

logger.silly('log silly')
logger.debug('log debug')
logger.verbose('log verbose')
logger.info('log info')
logger.http('log http')
logger.warn('log warn')
logger.error('log error')
