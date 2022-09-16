import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { HttpException } from '../exceptions';

export const validateMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpException(
      400,
      JSON.stringify({
        sucess: false,
        message: errors.array(),
      })
    );
  }

  next();
};
