import { RoundInput, RoundInputQueryParams } from '@moby-it/ppo-core';
import { NextFunction, Request, Response } from 'express';
import { chain, isLeft, map } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';
import { PathReporter } from 'io-ts/lib/PathReporter';

export const validatePayload = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return pipe(
    req.query,
    RoundInputQueryParams.decode,
    map(
      ({ boardState, totalHands, totalKnownHands }) =>
        ({
          boardState: Number(boardState),
          totalHands: Number(totalHands),
          totalKnownHands: Number(totalKnownHands),
        } as RoundInput)
    ),
    chain(RoundInput.decode),
    result => {
      if (isLeft(result)) {
        return res.status(400).send({ error: PathReporter.report(result) });
      } else {
        res.locals = result.right;
        next();
      }
    }
  );
};
