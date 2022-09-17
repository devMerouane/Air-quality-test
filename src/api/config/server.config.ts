import { Application } from 'express';

import { PORT } from './environment.config';
import { airQualityService } from '../core/modules/air-quality';
import { Logger } from './logger.config';

class ServerConfiguration {
  private static instance: ServerConfiguration;

  private constructor() {}

  private options = {
    port: PORT,
  };

  private server: Application;

  static get() {
    if (!ServerConfiguration.instance) {
      ServerConfiguration.instance = new ServerConfiguration();
    }

    return ServerConfiguration.instance;
  }

  init(app: Application) {
    this.server = this.server || app;

    return this;
  }

  listen() {
    const { port } = this.options;
    return this.server.listen(port, async () => {
      Logger.log('info', `server is now running on port ${port}`);
      await airQualityService.parisAirQualityCron();
    });
  }
}

const server = ServerConfiguration.get();

export { server as Server };
