import { calculateGuessAccuracy, RoundAnswerDto } from '@moby-it/poker-core';
import { NextFunction, Request, Response } from 'express';
import { pipe } from 'fp-ts/lib/function';
export const estimateAccuracy = (
  req: Request,
  res: Response<unknown, { dto: RoundAnswerDto; score: number; odds: number }>,
  next: NextFunction
) => {
  res.locals = {
    ...res.locals,
    score: pipe(
      res.locals.odds,
      calculateGuessAccuracy(res.locals.dto.estimate)
    ),
  };
  next();
};
