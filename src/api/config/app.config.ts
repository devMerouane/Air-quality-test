import express from 'express';

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

    return this;
  }
}

const Application = ExpressConfiguration.get().init().plug().application;

export { Application };
