import { format, Logger, createLogger, transports } from 'winston';
import Morgan from 'morgan';
import { createWriteStream } from 'fs';

import { LOGS, NODE_ENV } from './environment.config';
import { ENVIRONMENT_ENUM } from '../core/types/enums/environment.enum';

class LoggerConfiguration {
  private static instance: LoggerConfiguration;

  logger: Logger;

  private stream = {
    write: (message: string) => {
      this.logger.info(message.substring(0, message.lastIndexOf('\n')));
    },
  };

  private formater = format.printf(
    ({ level, message, timestamp }) =>
      `${timestamp as string} [${level}] ${message}`
  );

  private options = {
    error: {
      level: 'error',
      format: format.combine(format.timestamp(), this.formater),
      filename: `${LOGS.PATH}/error.log`,
      handleException: true,
      json: true,
      maxSize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    },
    info: {
      level: 'info',
      format: format.combine(format.timestamp(), this.formater),
      filename: `${LOGS.PATH}/combined.log`,
      handleException: false,
      json: true,
      maxSize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    },
    console: {
      format: format.simple(),
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  };

  private constructor() {}

  static get() {
    if (!LoggerConfiguration.instance) {
      LoggerConfiguration.instance = new LoggerConfiguration();
    }

    return LoggerConfiguration.instance;
  }

  init() {
    if (LoggerConfiguration.instance && this.logger) {
      return this;
    }

    this.logger = createLogger({
      level: 'info',
      transports: [
        new transports.File(this.options.error),
        new transports.File(this.options.info),
      ],
      exitOnError: true,
    });

    if (!['production', 'test'].includes(NODE_ENV)) {
      this.logger.add(new transports.Console(this.options.console));
    }

    return this;
  }

  writeStream() {
    return Morgan(LOGS.TOKEN, {
      skip: (req, res) => res.statusCode > 400,
      stream:
        NODE_ENV === ENVIRONMENT_ENUM.production
          ? createWriteStream(`${LOGS.PATH}\\access.log`, { flags: 'a' })
          : this.stream,
    });
  }

  log(level: 'error' | 'info', message: string) {
    this.logger[level](message);
  }
}

const logger = LoggerConfiguration.get().init();

export { logger as Logger };
