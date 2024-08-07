import log4js from "log4js";

log4js.configure({
  appenders: {
    fileAppender: { type: "file", filename: "./logs/logger-ejemplo4.log" },
    consoleAppender: { type: "console" },
  },
  categories: {
    default: { appenders: ["fileAppender", "consoleAppender"], level: "warn" },
    myLogger: { appenders: ["consoleAppender"], level: "fatal" },
  },
});

export const logger = log4js.getLogger("myLogger");

const ejemplo4 = () => {
  logger.trace("imprimo un log de tipo trace");
  logger.debug("imprimo un log de tipo debug");
  logger.info("imprimo un log de tipo info");
  logger.warn("imprimo un log de tipo warn");
  logger.error("imprimo un log de tipo error");
  logger.fatal("imprimo un log de tipo fatal");
};

ejemplo4();
