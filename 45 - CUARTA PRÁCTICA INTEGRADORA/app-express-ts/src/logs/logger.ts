import log4js from "log4js";

log4js.configure({
  appenders: {
    fileAppender: { type: "file", filename: "./src/logs/logs.log" },
    console: { type: "console" },
  },
  categories: {
    default: { appenders: ["fileAppender", "console"], level: "warn" },
  },
});

export const logger = log4js.getLogger();
