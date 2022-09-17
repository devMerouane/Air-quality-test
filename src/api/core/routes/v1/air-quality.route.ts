import { Router } from '../../types/classes';

import { airQualityController } from '../../modules/air-quality';
import { getAirQaulityValidation } from '../../validations';
import { validateMiddleware } from '../../middlewares';

export class AirQualityRouter extends Router {
  constructor() {
    super();
  }

  define(): void {
    this.router
      .route('/')
      .get(getAirQaulityValidation, validateMiddleware, airQualityController.getAirQualityByCoordinates);
    this.router.route('/paris/most-polluted/time').get(airQualityController.getParisAirQualityMostPolluted);
  }
}
