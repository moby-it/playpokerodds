import { NextFunction, Request, Response } from 'express';
import { validateObject } from 'shared';
import { NewAnswerDto } from './newAnswer.dto';

export const validatePayload = (
  req: Request,
  res: Response<unknown, { dto: NewAnswerDto }>,
  next: NextFunction
) => {
  const dto = req.body as NewAnswerDto;
  if (
    validateObject(dto) &&
    'estimate' in dto &&
    'round' in dto &&
    'myHand' in dto.round &&
    'opponentsHands' in dto.round &&
    'board' in dto.round
  ) {
    res.locals.dto = dto;
    next();
    return;
  } else {
    res.sendStatus(400);
  }
};
