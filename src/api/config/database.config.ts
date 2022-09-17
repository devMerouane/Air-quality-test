import { connect } from 'mongoose';

import { Logger } from './logger.config';

export class DatabaseConfiguration {
  static instance: DatabaseConfiguration;

  private constructor() {}

  static get(): DatabaseConfiguration {
    if (!DatabaseConfiguration.instance) {
      DatabaseConfiguration.instance = new DatabaseConfiguration();
    }

    return DatabaseConfiguration.instance;
  }

  connect(options: Record<string, any>) {
    connect(options.URL)
      .then(() => {
        Logger.log('info', 'Connection to mongodb etablished');
      })
      .catch((error) => {
        process.stdout.write(`error: ${error.message}`);
        process.exit(1);
      });
  }
}

const databaseConfiguration = DatabaseConfiguration.get();

export { databaseConfiguration as Database };
