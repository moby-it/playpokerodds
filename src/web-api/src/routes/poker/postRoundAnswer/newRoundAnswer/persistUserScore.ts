import { Round } from '@moby-it/poker-core';
import { NextFunction, Request, Response } from 'express';
import { decode } from 'jsonwebtoken';
import prisma from 'prisma';
import { decodedJwtIsValid } from 'shared';
import { countUniqueRoundsPlayed } from '../countRoundsPlayed';
import { RoundAnswerResponse } from '../RoundAnswerResponse';
import { NewAnswerDto } from './newAnswer.dto';
export const pesistUserScore = async (
  req: Request,
  res: Response<
    RoundAnswerResponse,
    {
      dto: NewAnswerDto;
      round: Round;
      roundId: string;
      estimate: number;
      score: number;
      odds: number;
    }
  >,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const { roundId, round, estimate, score, odds } = res.locals;
  if (!roundId) throw new Error('Round with no id');
  if (!round) throw new Error('No round in answer');
  const responsePayload: RoundAnswerResponse = {
    roundId: roundId,
    estimate,
    odds,
    score,
    round: {
      board: round.board,
      myHand: round.myHand,
      opponentsHands: round.opponentsHands,
    },
  };
  if (authHeader) {
    const token = authHeader.substring(7, authHeader.length);
    const decodedToken = decode(token);
    if (decodedJwtIsValid(decodedToken)) {
      const id = decodedToken.userId;
      const roundsPlayed = await countUniqueRoundsPlayed(id);
      const currentScore = Number(
        (await prisma.user.findFirst({ where: { id } }))?.score
      );
      await prisma.user.update({
        where: { id },
        data: {
          score:
            (currentScore * (roundsPlayed - 1) + res.locals.score) /
            roundsPlayed,
        },
      });
    }
    res.send(responsePayload);
  } else {
    return res.send(responsePayload);
  }
};
