import pino, { Logger as Pino, LoggerOptions } from 'pino';

const loggerOptions: LoggerOptions = {
  base: null,
  prettyPrint: true,
  timestamp: false,
};

const logger: Pino = pino(loggerOptions);

export default logger;
