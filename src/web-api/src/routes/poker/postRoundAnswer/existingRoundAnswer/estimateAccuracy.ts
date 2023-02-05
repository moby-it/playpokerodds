import { calculateGuessScore } from '@moby-it/poker-core';
import { NextFunction, Request, Response } from 'express';
import { ExistingAnswerDto } from './existingAnswer.dto';
export const estimateAccuracy = (
  req: Request,
  res: Response<
    unknown,
    { dto: ExistingAnswerDto; score: number; odds: number }
  >,
  next: NextFunction
) => {
  res.locals = {
    ...res.locals,
    score: calculateGuessScore(res.locals.dto.estimate, res.locals.odds),
  };
  next();
};
