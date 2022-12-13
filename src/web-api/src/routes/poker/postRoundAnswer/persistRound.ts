import { Round } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { Either, isRight } from 'fp-ts/lib/Either';
import { tryCatch } from 'fp-ts/lib/TaskEither';
import prisma from 'prisma';
import { EventType } from 'shared';
import { extractUserDataFromRequest } from '../../../routes/auth/common';
import { PostAnswerDto } from './answer.dto';
export const pesistRound = async (
  req: Request,
  res: Response<unknown, { dto: PostAnswerDto; score: number; odds: number }>,
  next: NextFunction
) => {
  const dto = res.locals.dto;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const eventPayload: Record<string, any> = {
    round: { ...res.locals.dto },
    odds: res.locals.odds,
  };
  let result: Either<Error, Round>;
  const user = extractUserDataFromRequest(req);
  if (user) {
    const userId = user.userId;
    eventPayload.userId = userId;
    result = await createRoundModel(dto, res.locals.odds, userId);
  } else {
    result = await createRoundModel(dto, res.locals.odds);
  }
  if (isRight(result)) {
    await prisma.event.create({
      data: {
        type: EventType.USER_POSTED_ANSWER,
        payload: { ...eventPayload },
      },
    });
    next();
  } else {
    throw result.left;
  }
};

async function createRoundModel(
  dto: PostAnswerDto,
  odds: number,
  _id?: string
) {
  const round = dto.round;
  return tryCatch(
    () =>
      prisma.round.create({
        data: {
          myHand: round.myHand,
          opponentsHands: round.opponentsHands,
          board: round.board,
          odds: odds,
          estimate: dto.estimate,
          userId: _id,
        },
      }),
    error => Error(String(error))
  )();
}
