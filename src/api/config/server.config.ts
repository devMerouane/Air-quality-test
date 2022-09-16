import { Application } from 'express';
import { PORT } from './environment.config';

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
    return this.server.listen(port, () => {
      console.log(`server is now running on port ${port}`);
    });
  }
}

const server = ServerConfiguration.get();

export { server as Server };
