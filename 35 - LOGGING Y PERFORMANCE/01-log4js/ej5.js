import log4js from "log4js";

log4js.configure({
  appenders: {
    fileAppender: { type: "file", filename: "./logs/logger-ejemplo5.log" },
    consoleAppender: { type: "console" },
  },
  categories: {
    default: { appenders: ["fileAppender", "consoleAppender"], level: "trace" },
    dev: { appenders: ["consoleAppender"], level: "trace" },
    test: { appenders: ["consoleAppender"], level: "warn" },
    prod: { appenders: ["consoleAppender", "fileAppender"], level: "warn" },
  },
});

const ENV = 'prod' //-> .env

let logger = log4js.getLogger();

if(ENV === 'prod') logger = log4js.getLogger('prod');
if(ENV === 'dev') logger = log4js.getLogger('dev');
if(ENV === 'test') logger = log4js.getLogger('test');

const ejemplo5 = () => {
  logger.trace("imprimo un log de tipo trace");
  logger.debug("imprimo un log de tipo debug");
  logger.info("imprimo un log de tipo info");
  logger.warn("imprimo un log de tipo warn");
  logger.error("imprimo un log de tipo error");
  logger.fatal("imprimo un log de tipo fatal");
};

ejemplo5();
