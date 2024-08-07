import winston, { format } from 'winston';

const { combine, colorize, printf, timestamp } = format;

const logConfig = {
    level: 'info',
    format: combine(
        timestamp({
            format: 'MM-DD-YYYY HH:mm:ss'
        }),
        colorize(),
        printf((info) => `${info.level}  |  ${info.timestamp}  |  ${info.message}`)
    ),
    transports: [ 
        new winston.transports.Console(),
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
