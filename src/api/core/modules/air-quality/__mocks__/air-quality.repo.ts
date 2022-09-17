import { AirQualityCreateDto } from '../dtos/air-quality-create.dto';
import { AirQualityGetDto } from '../dtos/air-quality-get.dto';

export class AirQualityRepository {
  async create(_airQualityCreateDto: AirQualityCreateDto) {}

  async getTimeOfMostPollutedCountry(_airQualityGetDto: AirQualityGetDto) {
    return { ts: new Date('2022-09-17T09:00:00.000Z') };
  }
}

export const airQualityRepository = new AirQualityRepository();
