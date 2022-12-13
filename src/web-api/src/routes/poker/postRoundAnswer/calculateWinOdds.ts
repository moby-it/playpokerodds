import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import prisma from 'prisma';
import { PostAnswerDto } from './answer.dto';
export const calculateWinOdds = async (
  req: Request,
  res: Response<unknown, { dto: PostAnswerDto; odds: number }>,
  next: NextFunction
) => {
  const roundId = res.locals.dto.id;
  if (roundId) {
    const round = await prisma.round.findFirst({ where: { id: roundId } });
    if (!round) {
      res.status(404).send(`Round with id:${roundId} not found`);
      return;
    }
    res.locals.odds = Number(round.odds);
  } else {
    const calcOddsUrl = process.env['CALC_ODDS_URL'] ?? '';
    return axios
      .post(calcOddsUrl, {
        round: res.locals.dto.round,
      })
      .then(response => {
        res.locals.odds = response.data;
        next();
      })
      .catch(e => res.status(400).send(e));
  }
};
