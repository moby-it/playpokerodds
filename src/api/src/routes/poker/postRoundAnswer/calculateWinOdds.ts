import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { tryCatch } from 'fp-ts/lib/TaskEither';
import { PostAnswerDto } from './answer.dto';
export const calculateWinOdds = (
  req: Request,
  res: Response<unknown, { dto: PostAnswerDto; odds: number }>,
  next: NextFunction
) => {
  tryCatch(
    () =>
      axios
        .post('https://ppocalcodds.azurewebsites.net/api/calcodds', {
          round: res.locals.dto.round,
        })
        .then(response => {
          res.locals.odds = response.data;
        }),
    e => res.status(400).send(e)
  )().then(() => next());
};
