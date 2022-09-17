import { AirQuality } from './air-quality.model';
import { AirQualityCreateDto } from './dtos/air-quality-create.dto';
import { AirQualityGetDto } from './dtos/air-quality-get.dto';

class AirQualityRepository {
  async create(airQualityCreateDto: AirQualityCreateDto) {
    await AirQuality.create(airQualityCreateDto);
  }

  async getTimeOfMostPollutedCountry(airQualityGetDto: AirQualityGetDto) {
    const airqualities = await AirQuality.find({
      country: airQualityGetDto.country,
      state: airQualityGetDto.state,
      city: airQualityGetDto.city,
    })
      .sort({ aqius: -1 })
      .select({ ts: 1, _id: 0 })
      .limit(-1)
      .lean();

    return airqualities[0];
  }
}

export const airQualityRepository = new AirQualityRepository();
