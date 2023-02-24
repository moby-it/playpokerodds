import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { NewAnswerDto } from './newAnswer.dto';
export const calculateWinOdds = async (
  req: Request,
  res: Response<unknown, { dto: NewAnswerDto; odds: number }>,
  next: NextFunction
) => {
  const calcOddsUrl = process.env['CALC_ODDS_URL'] ?? '';
  if (calcOddsUrl === '') {
    console.error('3301: calc odds url not set');
    res.status(500).send('3301: calc odds url not set');
    return;
  }
  return axios
    .post(calcOddsUrl, {
      round: res.locals.dto.round,
    })
    .then((response) => {
      if (typeof response.data.odds !== 'number') {
        throw new Error('3303: invalid response type');
      }
      res.locals.odds = response.data.odds;
      next();
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};
