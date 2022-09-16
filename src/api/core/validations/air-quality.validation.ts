import { query } from 'express-validator';

export const getAirQaulityValidation = [
  query('lat').isFloat({ min: -90, max: 90 }).withMessage('value must be a float number with min value -90 and max value 90'),
  query('lon').isFloat({ min: -180, max: 180 }).withMessage('value must be a float number with min value -180 and max value 180'),
];
