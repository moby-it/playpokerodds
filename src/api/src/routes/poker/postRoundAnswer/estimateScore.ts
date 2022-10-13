import { calculateGuessAccuracy } from '@moby-it/ppo-core';
import { NextFunction, Request, Response } from 'express';
import { pipe } from 'fp-ts/lib/function';
import { PostAnswerDto } from './answer.dto';
export const estimateAccuracy = (
  req: Request,
  res: Response<unknown, { dto: PostAnswerDto; score: number; odds: number }>,
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
