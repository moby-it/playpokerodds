import { createRoundFromProps, Round } from '@moby-it/ppo-core';
import { NextFunction, Request, Response } from 'express';
import { isRight } from 'fp-ts/lib/Either';
import { decode } from 'jsonwebtoken';
import prisma from 'prisma';
import { DecodedJwt } from 'shared';
import { ExistingAnswerDto } from './existingRoundAnswer/existingAnswer.dto';
import { NewAnswerDto } from './newRoundAnswer/newAnswer.dto';
import { RoundAnswerResponse } from './RoundAnswerResponse';
export const pesistUserScore = async (
  req: Request,
  res: Response<
    RoundAnswerResponse,
    {
      dto: ExistingAnswerDto | NewAnswerDto;
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
    id: roundId,
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
    const decodedToken = DecodedJwt.decode(decode(token));
    if (isRight(decodedToken)) {
      const id = decodedToken.right.userId;
      await prisma.user.update({
        where: { id },
        data: {
          score: { increment: res.locals.score },
        },
      });
    }
    res.send(responsePayload);
  } else {
    return res.send(responsePayload);
  }
};
