import { config as dotenv } from 'dotenv';
import { existsSync, mkdirSync } from 'fs';

import { ENVIRONMENT_ENUM } from '../core/types/enums';
import { EnvLogs, EnvAirQuality } from '../core/types/types';

export class Environment {
  private static instance: Environment;

  errors: string[] = [];

  base = 'src';

  variables: Record<string, unknown>;

  cluster: Record<string, unknown>;

  private constructor() {}

  get keys(): string[] {
    return ['NODE_ENV', 'PORT', 'LOGS_PATH', 'LOGS_TOKEN', 'AIR_QUALITY_URL', 'AIR_QUALITY_PUBLIC_KEY'];
  }

  get rules(): Record<string, any> {
    return {
      NODE_ENV: (value: string): string => {
        if (!value) {
          this.errors.push('NODE_ENV not found: please define the node env');
        }

        if (!(value in ENVIRONMENT_ENUM)) {
          this.errors.push('NODE_ENV not valid value');
        }

        return value;
      },
      PORT: (value: string): number => {
        if ((value && Number.isNaN(parseInt(value, 10))) || parseInt(value, 10) > 65535) {
          this.errors.push('PORT bad value: please fill a valid TCP port number');
        }

        return parseInt(value, 10);
      },
      LOGS_PATH: (value: string): string => {
        if (!value) {
          this.errors.push('LOGS_PATH not found: please provide the path for logs');
        }

        return value;
      },
      LOGS_TOKEN: (value: string): string => {
        if (!value) {
          this.errors.push('LOGS_PATH not found: please provide the token for logs');
        }

        return value;
      },
      AIR_QUALITY_URL: (value: string): string => {
        if (!value) {
          this.errors.push('AIR_QUALITY_URL not found: please provide the target url for air quality');
        }

        return value;
      },
      AIR_QUALITY_PUBLIC_KEY: (value: string): string => {
        if (!value) {
          this.errors.push('AIR_QUALITY_PUBLIC_KEY not found: please provide the api key for air quality');
        }

        return value;
      },
    };
  }

  static get(): Environment {
    if (!Environment.instance) {
      Environment.instance = new Environment();
    }

    return Environment.instance;
  }

  loads(nodeVersion: string) {
    const [major, minor] = nodeVersion.split('.').map(parseFloat);

    if (major < 16 && minor < 17) {
      this.exit('The node version of the server is too low. Please consider at least v16.17.0.');
    }

    const path = `${process.cwd()}/${this.base}/env/.env`;

    dotenv({ path });

    return this;
  }

  extracts(args: Record<string, unknown>): Environment {
    this.variables = this.keys.reduce((acc, current) => {
      acc[current] = args[current];

      return acc;
    }, {} as Record<string, unknown>);

    return this;
  }

  validates(): Environment {
    this.keys.forEach((key) => {
      this.variables[key] = this.rules[key](this.variables[key]);
    });

    return this;
  }

  aggregate(): Environment {
    this.cluster = {
      NODE_ENV: this.variables.NODE_ENV,
      PORT: this.variables.PORT,
      LOGS: {
        PATH: this.variables.LOGS_PATH,
        TOKEN: this.variables.LOGS_TOKEN,
      },
      AIR_QUALITY: {
        URL: this.variables.AIR_QUALITY_URL,
        KEY: this.variables.AIR_QUALITY_PUBLIC_KEY,
      },
    };

    return this;
  }

  directories(): Environment {
    const log = this.cluster.LOGS as { PATH: string };
    if (!existsSync(log.PATH)) {
      mkdirSync(log.PATH);
    }

    return this;
  }

  isValid(): boolean {
    return this.errors.length === 0;
  }

  exit(messages: string | string[]) {
    process.stdout.write('\n\x1b[41m[ERROR]\x1b[40m\n\n');
    process.stdout.write([].concat(messages).join('\n'));
    process.exit(0);
  }
}

const environment = Environment.get().loads(process.versions.node).extracts(process.env).validates().aggregate();

if (!environment.isValid()) environment.exit(environment.errors);

const NODE_ENV = environment.cluster.NODE_ENV as string;
const PORT = environment.cluster.PORT as number;
const LOGS = environment.cluster.LOGS as EnvLogs;
const AIR_QUALITY = environment.cluster.AIR_QUALITY as EnvAirQuality;

export { PORT, NODE_ENV, LOGS, AIR_QUALITY };
