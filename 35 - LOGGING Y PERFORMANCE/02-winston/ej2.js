import winston from 'winston';

const logConfig = {
    level: 'info',
    transports: [ 
        new winston.transports.Console({ level: 'debug' }),
        new winston.transports.File({ 
            filename: './logs/ejemplo2-error.log',
            level: 'error'
        }),
        new winston.transports.File({ 
            filename: './logs/ejemplo2-info.log',
        }),
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
