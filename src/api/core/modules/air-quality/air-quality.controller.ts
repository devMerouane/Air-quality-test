import { Request, Response, NextFunction } from 'express';

import { airQualityService } from './air-quality.service';

class AirQualityController {
  async getAirQualityByCoordinates(req: Request, res: Response, next: NextFunction) {
    try {
      const latitude = Number(req.query.lat);
      const longitude = Number(req.query.lon);

      const response = await airQualityService.getAirQualityByCoordinates({
        lat: latitude,
        lon: longitude,
      });

      return res.status(200).send({
        sucess: true,
        data: response,
        message: 'polution return succefuly',
      });
    } catch (error) {
      return next(error);
    }
  }

  async getParisAirQualityMostPolluted(req: Request, res: Response, next: NextFunction) {
    try {
      const airQualityTime = await airQualityService.getParisAirQualityTimeMostPolluted();

      return res.status(200).send({
        success: true,
        data: airQualityTime || [],
        message: airQualityTime ? 'Most polluted data for paris' : 'No data',
      });
    } catch (error) {
      return next(error);
    }
  }
}

export const airQualityController = new AirQualityController();
