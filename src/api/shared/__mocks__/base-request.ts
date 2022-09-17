import { AxiosRequestConfig } from 'axios';

export class BaseRequest {
  public async get(_url: string, _options: AxiosRequestConfig) {
    return {
      data: {
        status: 'success',
        data: {
          city: 'Paris',
          state: 'Ile-de-France',
          country: 'France',
          location: {
            type: 'Point',
            coordinates: [2.351666, 48.859425],
          },
          current: {
            pollution: {
              ts: '2022-09-17T09:00:00.000Z',
              aqius: 21,
              mainus: 'p2',
              aqicn: 7,
              maincn: 'p2',
            },
            weather: {
              ts: '2022-09-17T10:00:00.000Z',
              tp: 14,
              pr: 1021,
              hu: 60,
              ws: 5.66,
              wd: 330,
              ic: '02d',
            },
          },
        },
      },
      status: 200,
      statusText: 'Ok',
      header: {},
      config: {},
    };
  }
}
