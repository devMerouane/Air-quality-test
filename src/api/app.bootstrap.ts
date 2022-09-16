import { Server } from './config/server.config';
import { Application } from './config/app.config';

Server.init(Application).listen();
