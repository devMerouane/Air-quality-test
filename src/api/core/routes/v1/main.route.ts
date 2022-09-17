import SwaggerUi from 'swagger-ui-express';

import { Router } from '../../types/classes';
import { MainController } from '../../modules/main';
import { Swagger } from '../../../config/swagger.config';
import { NODE_ENV } from '../../../config/environment.config';
import { ENVIRONMENT_ENUM } from '../../types/enums';

export class MainRouter extends Router {
  constructor() {
    super();
  }

  define(): void {
    this.router.route('/healthcheck').get(MainController.heathCheck);
    if(NODE_ENV === ENVIRONMENT_ENUM.development ||  NODE_ENV === ENVIRONMENT_ENUM.staging) {
      this.router.use('/docs', SwaggerUi.serve, SwaggerUi.setup(Swagger));
    }
  }
}
