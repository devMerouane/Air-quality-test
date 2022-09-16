import axios from 'axios';

import { AIR_QUALITY } from '../config/environment.config';

const requestHandler = (baseUrl: string) => {
  const instance = axios.create({ baseURL: baseUrl });

  return instance;
};

export const baseRequestHander = requestHandler(AIR_QUALITY.URL);
