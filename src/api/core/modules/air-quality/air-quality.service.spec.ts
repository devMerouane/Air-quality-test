import { airQualityService } from './air-quality.service';
import { airQualityRepository } from './air-quality.repo';

jest.mock('../../../shared/base-request');
jest.mock('./air-quality.repo');

const airQualityPayload = {
  status: 'success',
  pollution: {
    ts: '2022-09-17T09:00:00.000Z',
    aqius: 21,
    mainus: 'p2',
    aqicn: 7,
    maincn: 'p2',
  },
};

describe('Air Quality Service', () => {
  describe('getAirQualityByCoordinates', () => {
    describe('Given lattitude and longitude', () => {
      it('should return pollution data', async () => {
        const position = {
          lat: 48.856613,
          lon: 2.352222,
        };
        const response = await airQualityService.getAirQualityByCoordinates(position);

        expect(response).toEqual(airQualityPayload);
      });
    });
  });

  describe('createParisAirQuality', () => {
    describe('Given the lattitude and longitude of paris', () => {
      it('Should create air quality for paris', async () => {
        const airQualityRepoMock = jest.spyOn(airQualityRepository, 'create').mockImplementation();

        await airQualityService.createParisAirQuality();

        expect(airQualityRepoMock).toHaveBeenCalledWith(airQualityPayload.pollution);
      });
    });
  });

  describe('getParisAirQualityTimeMostPolluted', () => {
    it('Should return the time where paris is most polluted', async () => {
      const response = await airQualityService.getParisAirQualityTimeMostPolluted();

      expect(response).toEqual({ ts: new Date(airQualityPayload.pollution.ts) });
    });
  });
});
