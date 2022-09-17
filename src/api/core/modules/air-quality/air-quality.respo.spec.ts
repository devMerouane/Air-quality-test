import { AirQuality } from './air-quality.model';
import { airQualityRepository } from './air-quality.repo';
import { AirQualityCreateDto } from './dtos/air-quality-create.dto';
import { AirQualityGetDto } from './dtos/air-quality-get.dto';

const airQualityCreateInput: AirQualityCreateDto = {
  city: 'Paris',
  state: 'Ile-de-France',
  country: 'France',
  ts: '2022-09-11T20:00:00.000Z',
  aqius: 55,
  mainus: 'p2',
  aqicn: 20,
  maincn: 'p2',
};

const airQualityGetInput: AirQualityGetDto = {
  city: 'Paris',
  state: 'Ile-de-France',
  country: 'France',
};

describe('Air Quality Repository', () => {
  describe('Given Air Quality create input', () => {
    it('should create an Air quality document', async () => {
      const airQualityCreateMock = jest.spyOn(AirQuality, 'create').mockImplementation();

      await airQualityRepository.create(airQualityCreateInput);

      expect(airQualityCreateMock).toHaveBeenCalledWith(airQualityCreateInput);
    });
  });

  describe('Given Air Quality find input', () => {
    it('should return the time where the city is most polluted', async () => {
      const mockResult = { ts: new Date('2022-09-11T20:00:00.000Z') };
      AirQuality.find = jest.fn().mockImplementation(() => ({
        sort: jest.fn().mockImplementation(() => ({
          select: jest.fn().mockImplementation(() => ({
            limit: jest.fn().mockImplementation(() => ({
              lean: jest.fn().mockReturnValueOnce([mockResult]),
            })),
          })),
        })),
      }));

      const result = await airQualityRepository.getTimeOfMostPollutedCountry(airQualityGetInput);

      expect(AirQuality.find).toHaveBeenCalledWith(airQualityGetInput);
      expect(result).toEqual(mockResult);
    });
  });
});
