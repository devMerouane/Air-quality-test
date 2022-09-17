import axios from 'axios';



export class BaseRequest {

  constructor() {}

  init(baseUrl: string) {
    const instance = axios.create({ baseURL: baseUrl });

    return instance;
  }
}
