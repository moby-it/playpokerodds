import { NextFunction, Request, Response } from 'express';
import { validateObject } from 'shared';
import { ExistingAnswerDto } from './existingAnswer.dto';

export const validatePayload = (
  req: Request,
  res: Response<unknown, { dto: ExistingAnswerDto }>,
  next: NextFunction
) => {
  const dto = req.body as ExistingAnswerDto;
  if (validateObject(dto) && 'roundId' in dto && 'estimate' in dto) {
    res.locals.dto = dto;
    next();
    return;
  }
  res.sendStatus(400);
};
