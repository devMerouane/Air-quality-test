import { Router } from 'express';

import { MainRouter } from '../core/routes/v1/main.route';

class ProxyRouter {
  private static instance: ProxyRouter;

  private router: Router = Router();

  private readonly routes = [{ path: '/', provider: MainRouter }];

  private constructor() {}

  static get() {
    if (!ProxyRouter.instance) {
      ProxyRouter.instance = new ProxyRouter();
    }

    return ProxyRouter.instance;
  }

  map(): Router {
    this.routes.forEach((route) => {
      const instance = new route.provider();
      this.router.use(route.path, instance.router);
    });

    return this.router;
  }
}

const proxyRouter = ProxyRouter.get();

export { proxyRouter as ProxyRouter };
