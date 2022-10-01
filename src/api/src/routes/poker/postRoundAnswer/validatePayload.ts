import { RoundAnswerDto } from '@moby-it/poker-core';
import { NextFunction, Request, Response } from 'express';
import { isLeft } from 'fp-ts/lib/Either';
import { PathReporter } from 'io-ts/lib/PathReporter';

export const validatePayload = (
  req: Request,
  res: Response<unknown, { dto: RoundAnswerDto }>,
  next: NextFunction
) => {
  const dto = RoundAnswerDto.decode(req.body);
  if (isLeft(dto)) {
    res.status(400).send({ error: PathReporter.report(dto) });
  } else {
    res.locals.dto = dto.right;
    next();
  }
};
