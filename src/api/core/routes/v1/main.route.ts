import { Router } from '../../types/classes';
import { MainController } from '../../modules/main';

export class MainRouter extends Router {
  constructor() {
    super();
  }

  define(): void {
    this.router.route('/healthcheck').get(MainController.heathCheck);
  }
}
