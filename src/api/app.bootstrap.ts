import { Server } from './config/server.config';
import { Application } from './config/app.config';
import { Database } from './config/database.config';
import { MONGODB } from './config/environment.config';

Database.connect(MONGODB);
Server.init(Application).listen();
