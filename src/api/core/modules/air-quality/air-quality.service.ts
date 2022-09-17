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
  private async getParisAirQuality() {
    let parisAirQuality = Cache.getCache<AirQualityReponse>('getParisAirQuality');

    if (!parisAirQuality) {
      const configuration: AxiosRequestConfig = {
        params: {
          key: AIR_QUALITY.KEY,
          lat: '48.856613',
          lon: '2.352222',
        },
      };

      const response = await new BaseRequest().init(AIR_QUALITY.URL).get('/nearest_city', configuration);
      parisAirQuality = { status: response.data.status, pollution: response.data.data.current.pollution };
      Cache.setCache('getParisAirQuality', parisAirQuality);
    }

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
      await this.getParisAirQuality();
    });
  }

  async getParisAirQualityTimeMostPolluted() {
    const cachedData = Cache.getCache<Pick<AirQualityCreateDto, 'ts'>>('getParisAirQualityTimeMostPolluted');

    if (cachedData) {
      return cachedData;
    }

    const airQualityTime = await airQualityRepository.getTimeOfMostPollutedCountry({
      city: 'Paris',
      state: 'Ile-de-France',
      country: 'France',
    });

    Cache.setCache('getParisAirQualityTimeMostPolluted', airQualityTime);

    return airQualityTime;
  }
}

export const airQualityService = new AirQualityService();
