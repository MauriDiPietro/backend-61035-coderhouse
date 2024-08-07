import winston from 'winston';

const logConfig = {
    transports: [ new winston.transports.Console() ]
};

const logger = winston.createLogger(logConfig);

/*
SILLY
DEBUG
VERBOSE
INFO
HTTP
WARN
ERROR
*/

logger.level = 'debug';

logger.silly('log silly')
logger.debug('log debug')
logger.verbose('log verbose')
logger.info('log info')
logger.http('')
logger.warn('log warn')
logger.error('log error')
