import { AxiosRequestConfig } from 'axios';

import { AirQualityQuery } from './dtos/air-quality-query.dto';
import { AIR_QUALITY } from '../../../config/environment.config';
import { baseRequestHander } from '../../../shared/base-request';

class AirQualityService {
  async getAirQualityByCoordinates(airQualityParamsDto: AirQualityQuery) {
    const configuration: AxiosRequestConfig = {
      params: {
        key: AIR_QUALITY.KEY,
        lat: airQualityParamsDto.lat,
        lon: airQualityParamsDto.lon,
      },
    };

    const response = await baseRequestHander.get('/nearest_city', configuration);
    return response.data;
  }
}

export const airQualityService = new AirQualityService();


