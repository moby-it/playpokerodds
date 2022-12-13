import { createRoundFromProps, RoundAnswerDto } from '@moby-it/ppo-core';
import { NextFunction, Request, Response } from 'express';
import { isRight } from 'fp-ts/lib/Either';
import { decode } from 'jsonwebtoken';
import prisma from 'prisma';
import { DecodedJwt } from 'shared';
import { PostAnswerDto } from './answer.dto';
export const pesistUserScore = async (
  req: Request,
  res: Response<
    RoundAnswerDto,
    { dto: PostAnswerDto; score: number; odds: number }
  >,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const round = res.locals.dto.round;
  const roundId = res.locals.dto.id;
  if (!roundId) throw new Error('Round with no id');
  if (!round) throw new Error('No round in answer');
  const responsePayload: RoundAnswerDto & { id: string } = {
    id: roundId,
    estimate: res.locals.dto.estimate,
    odds: res.locals.odds,
    score: res.locals.score,
    round: createRoundFromProps({
      board: round.board,
      myHand: round.myHand,
      opponentsHands: round.opponentsHands,
    }),
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
