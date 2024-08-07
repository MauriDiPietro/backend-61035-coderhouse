import log4js from 'log4js';

const logger = log4js.getLogger();

/*
TRACE
DEBUG
INFO
WARN
ERROR
FATAL
*/

logger.level = 'trace';

const ejemplo1 = () => {
    logger.trace('imprimo un log de tipo trace')
    logger.debug('imprimo un log de tipo debug')
    logger.info('imprimo un log de tipo info')
    logger.warn('imprimo un log de tipo warn')
    logger.error('imprimo un log de tipo error')
    logger.fatal('imprimo un log de tipo fatal')
};

ejemplo1()

/* ------------------------------------ - ----------------------------------- */
