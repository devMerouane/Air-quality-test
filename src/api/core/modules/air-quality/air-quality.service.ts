import { AxiosRequestConfig } from 'axios';

import { AirQualityQuery } from './dtos/air-quality-query.dto';
import { AIR_QUALITY } from '../../../config/environment.config';
import { BaseRequest } from '../../../shared/base-request';
import { Scheduler } from '../../../shared/schedular';
import { airQualityRepository } from './air-quality.repo';
import { AirQualityCreateDto } from './dtos/air-quality-create.dto';
import { Cache } from '../../../config/cache.config';

interface AirQualityReponse {
  status: string;
  pollution: AirQualityCreateDto;
}
class AirQualityService {
  async getAirQualityByCoordinates(airQualityParamsDto: AirQualityQuery): Promise<AirQualityReponse> {
    const cachedData = Cache.getCache<AirQualityReponse>(`${airQualityParamsDto.lat}-${airQualityParamsDto.lon}`);

    if (cachedData) {
      return cachedData;
    }

    const configuration: AxiosRequestConfig = {
      params: {
        key: AIR_QUALITY.KEY,
        lat: airQualityParamsDto.lat,
        lon: airQualityParamsDto.lon,
      },
    };

    const response = await new BaseRequest(AIR_QUALITY.URL).get('/nearest_city', configuration);
    Cache.setCache(`${airQualityParamsDto.lat}-${airQualityParamsDto.lon}`, {
      status: response.data.status,
      pollution: response.data.data.current.pollution,
    });

    return { status: response.data.status, pollution: response.data.data.current.pollution } as AirQualityReponse;
  }

  async createParisAirQuality() {
    const parisLat = 48.856613;
    const parisLon = 2.352222;

    const parisAirQuality = await this.getAirQualityByCoordinates({ lat: parisLat, lon: parisLon });

    if (parisAirQuality.status === 'success') {
      await airQualityRepository.create({
        city: parisAirQuality.pollution.city,
        state: parisAirQuality.pollution.state,
        country: parisAirQuality.pollution.country,
        ts: parisAirQuality.pollution.ts,
        aqius: parisAirQuality.pollution.aqius,
        mainus: parisAirQuality.pollution.mainus,
        aqicn: parisAirQuality.pollution.aqicn,
        maincn: parisAirQuality.pollution.maincn,
      });
    }
  }

  async parisAirQualityCron() {
    const scheduler = new Scheduler('* * * * *');
    scheduler.init(async () => {
      await this.createParisAirQuality();
    });
  }

  async getParisAirQualityTimeMostPolluted() {
    const city = 'Paris';
    const state = 'Ile-de-France';
    const country = 'France';

    const cachedData = Cache.getCache<Pick<AirQualityCreateDto, 'ts'>>(`${city}-${state}-${country}`);

    if (cachedData) {
      return cachedData;
    }

    const airQualityTime = await airQualityRepository.getTimeOfMostPollutedCountry({
      city,
      state,
      country,
    });

    Cache.setCache(`${city}-${state}-${country}`, airQualityTime);

    return airQualityTime;
  }
}

export const airQualityService = new AirQualityService();
