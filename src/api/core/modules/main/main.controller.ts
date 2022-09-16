import { Request, Response, NextFunction } from 'express';

class MainController {
  private static instance: MainController;

  private constructor() {}

  static get() {
    if (!MainController.instance) {
      MainController.instance = new MainController();
    }

    return MainController.instance;
  }

  heathCheck(req: Request, res: Response, _next: NextFunction) {
    res.status(200);
    res.send({
      status: true,
      message: 'server work perfectly!!',
    });
  }
}

const mainController = MainController.get();

export { mainController as MainController };
