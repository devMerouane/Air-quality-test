import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../config/logger.config';
import { HttpException } from '../exceptions';
import { HttpStatusEnum } from '../types/enums';

export const errorMiddleware = (error: HttpException, req: Request, res: Response, _next: NextFunction) => {
  Logger.log('error', error.message);
  const message = error.status === 500 ? 'Internal Server Error' : error.message;

  res.status(error.status || HttpStatusEnum.SERVER_ERROR).send(message);
};

export const notFoundMiddleware = (req: Request, res: Response, _next: NextFunction) => {
  res.status(HttpStatusEnum.NOT_FOUND);
  res.json({
    success: false,
    message: 'Ooops... end point was not found',
  });
};
