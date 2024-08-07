import log4js from "log4js";

log4js.configure({
  appenders: {
    fileAppender: { type: "file", filename: "./logs/logger-ejemplo2.log" },
  },
  categories: {
    default: { appenders: ["fileAppender"], level: "info" },
  },
});

const logger = log4js.getLogger();

const ejemplo2 = () => {
  logger.trace("imprimo un log de tipo trace");
  logger.debug("imprimo un log de tipo debug");
  logger.info("imprimo un log de tipo info");
  logger.warn("imprimo un log de tipo warn");
  logger.error("imprimo un log de tipo error");
  logger.fatal("imprimo un log de tipo fatal");
};

ejemplo2();
