import { Request, Response, NextFunction } from 'express';

import { Logger } from '../../config/logger.config';
import { HttpException } from '../exceptions';
import { HttpStatusEnum } from '../types/enums';

export const errorMiddleware = (error: HttpException, req: Request, res: Response, _next: NextFunction) => {
  Logger.log('error', error.message);

  res.status(error.status || HttpStatusEnum.SERVER_ERROR).send(error.message);
};
