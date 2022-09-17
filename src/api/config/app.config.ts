import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rate from 'express-rate-limit';
import compression from 'compression';

import { Logger } from './logger.config';
import { errorMiddleware, notFoundMiddleware } from '../core/middlewares';
import { ProxyRouter } from './proxy-router.config';

class ExpressConfiguration {
  private static instance: ExpressConfiguration;

  application: express.Application;

  private options = {
    rate: {
      windowMs: 60 * 60 * 1000, // 1 hour
      max: 2500,
      message: 'Too many requests from this IP, please try again after an hour',
    },
  };

  private constructor() {}

  static get(): ExpressConfiguration {
    if (!ExpressConfiguration.instance) {
      ExpressConfiguration.instance = new ExpressConfiguration();
    }

    return ExpressConfiguration.instance;
  }

  init() {
    if (!this.application) {
      this.application = express();
    }

    return this;
  }

  plug() {
    this.application.use(express.urlencoded({ extended: false }));
    this.application.use(express.json());
    this.application.use(cors());
    this.application.use(helmet());
    this.application.use(compression());
    this.application.use('/api/v1', rate(this.options.rate), ProxyRouter.map());
    this.application.use(Logger.writeStream());
    this.application.use(notFoundMiddleware);
    this.application.use(errorMiddleware);

    return this;
  }
}

const Application = ExpressConfiguration.get().init().plug().application;

export { Application };
