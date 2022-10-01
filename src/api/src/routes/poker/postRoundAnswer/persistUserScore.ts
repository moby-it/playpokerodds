import {
  createRoundFromProps,
  EventType,
  RoundAnswerDto,
} from '@moby-it/poker-core';
import { NextFunction, Request, Response } from 'express';
import { isRight } from 'fp-ts/lib/Either';
import { decode } from 'jsonwebtoken';
import prisma from 'prisma';
import { DecodedJwt } from 'shared';
import { PostAnswerResponse } from './response';
export const pesistUserScore = async (
  req: Request,
  res: Response<
    PostAnswerResponse,
    { dto: RoundAnswerDto; score: number; odds: number }
  >,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const dto = res.locals.dto;
  const responsePayload: PostAnswerResponse = {
    estimate: res.locals.dto.estimate,
    odds: res.locals.odds,
    score: res.locals.score,
    round: createRoundFromProps({
      board: dto.board,
      myHand: dto.myHand,
      opponentsHands: dto.opponentsHands,
    }),
  };
  if (authHeader) {
    const token = authHeader.substring(7, authHeader.length);
    const decodedToken = DecodedJwt.decode(decode(token));
    if (isRight(decodedToken)) {
      await prisma.event.create({
        data: {
          type: EventType.USER_POSTED_ANSWER,
          payload: {
            round: { ...res.locals.dto },
            email: decodedToken.right.email,
            userId: decodedToken.right.userId,
            odds: res.locals.odds,
          },
        },
      });
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
