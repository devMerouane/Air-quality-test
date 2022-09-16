import express from 'express';

import { Logger } from './logger.config';
import { errorMiddleware } from '../core/middlewares';
import { ProxyRouter } from './proxy-router.config';

class ExpressConfiguration {
  private static instance: ExpressConfiguration;

  application: express.Application;

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
    this.application.use('/api/v1', ProxyRouter.map());
    this.application.use(Logger.writeStream());
    this.application.use(errorMiddleware);

    return this;
  }
}

const Application = ExpressConfiguration.get().init().plug().application;

export { Application };
