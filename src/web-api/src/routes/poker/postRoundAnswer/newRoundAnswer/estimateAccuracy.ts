import { calculateGuessScore } from '@moby-it/ppo-core';
import { NextFunction, Request, Response } from 'express';
import { NewAnswerDto } from './newAnswer.dto';
export const estimateAccuracy = (
  req: Request,
  res: Response<unknown, { dto: NewAnswerDto; score: number; odds: number }>,
  next: NextFunction
) => {
  res.locals = {
    ...res.locals,
    score: calculateGuessScore(res.locals.dto.estimate, res.locals.odds),
  };
  next();
};
