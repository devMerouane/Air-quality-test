import supertest from 'supertest';

import { Application } from '../../../config/app.config';
import { airQualityService } from './air-quality.service';

const airQualityServicePayload = {
  status: 'sucsess',
  pollution: {
    ts: '2022-09-17T09:00:00.000Z',
    aqius: 21,
    mainus: 'p2',
    aqicn: 7,
    maincn: 'p2',
  },
};

const getAirQualityPayload = {
  success: true,
  data: airQualityServicePayload.pollution,
  message: 'polution return succefuly',
};

const getimeMostPolluted = {
  success: true,
  data: { ts: airQualityServicePayload.pollution.ts },
  message: 'Most polluted data for paris',
};

const airQualityInput = {
  lat: 48.856613,
  lon: 2.352222,
};

describe('Air Quality', () => {
  describe('Get the pollution', () => {
    describe('Given lattitude and longitude are valid', () => {
      it('should return the air quality payload', async () => {
        const airQualityServiceMock = jest
          .spyOn(airQualityService, 'getAirQualityByCoordinates')
          // @ts-ignore
          .mockReturnValueOnce(airQualityServicePayload);
        const { statusCode, body } = await supertest(Application).get('/api/v1/air-quality').query(airQualityInput);

        expect(statusCode).toBe(200);
        expect(airQualityServiceMock).toHaveBeenCalledWith(airQualityInput);
        expect(body).toEqual(getAirQualityPayload);
      });
    });

    describe('Given false value for lattitude and longitude ', () => {
      it('Should return 400 error', async () => {
        const airQualityServiceMock = jest
          .spyOn(airQualityService, 'getAirQualityByCoordinates')
          // @ts-ignore
          .mockReturnValueOnce(airQualityServicePayload);

        const { statusCode } = await supertest(Application).get('/api/v1/air-quality').query({});

        expect(statusCode).toBe(400);
        expect(airQualityServiceMock).not.toHaveBeenCalled();
      });
    });
  });

  describe('Get the time where paris is most pollution', () => {
    it('should return the time', async () => {
      const airQualityServiceMock = jest
        .spyOn(airQualityService, 'getParisAirQualityTimeMostPolluted')
        // @ts-ignore
        .mockReturnValueOnce({ ts: new Date(airQualityServicePayload.pollution.ts) });
      const { statusCode, body } = await supertest(Application)
        .get('/api/v1/air-quality/paris/most-polluted/time')
        .query(airQualityInput);

      expect(statusCode).toBe(200);
      expect(airQualityServiceMock).toHaveBeenCalled();
      expect(body).toEqual(getimeMostPolluted);
    });
  });
});
