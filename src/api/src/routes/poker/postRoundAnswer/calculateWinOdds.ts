import { RoundAnswerDto } from '@moby-it/poker-core';
import { NextFunction, Request, Response } from 'express';
import { tryCatch } from 'fp-ts/lib/TaskEither';
import path from 'path';
import { Worker } from 'worker_threads';
export const calculateWinOdds = (
  req: Request,
  res: Response<unknown, { dto: RoundAnswerDto; odds: number }>,
  next: NextFunction
) => {
  tryCatch(
    () => {
      return new Promise((resolve, reject) => {
        const { board, myHand, opponentsHands } = res.locals.dto;
        const worker = new Worker(
          path.resolve(__dirname, '../../../workers/calculateOdds.js'),
          {
            workerData: {
              board: board,
              myHand: myHand,
              opponentsHands: opponentsHands,
            },
          }
        );
        worker.on('message', (odds: number) => {
          res.locals.odds = odds;
          resolve(odds);
        });
        worker.on('error', err => {
          reject(err);
        });
        worker.on('exit', (code: unknown) => {
          if (code !== 0) reject(new Error(`stopped with  ${code} exit code`));
        });
      });
    },
    e => res.status(400).send(e)
  )().then(() => next());
};
