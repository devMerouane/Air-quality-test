import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class BaseRequest {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string) {
    this.init(baseUrl);
  }

  init(baseUrl: string) {
    this.axiosInstance = Axios.create({ baseURL: baseUrl });
  }

  async get(url: string, options: AxiosRequestConfig) {
    const response = await this.axiosInstance.get(url, options);

    return response;
  }
}
