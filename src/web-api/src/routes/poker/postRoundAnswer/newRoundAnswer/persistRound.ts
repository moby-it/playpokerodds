import { Round } from '@moby-it/ppo-core';
import { NextFunction, Request, Response } from 'express';
import { isLeft } from 'fp-ts/lib/Either';
import { tryCatch } from 'fp-ts/lib/TaskEither';
import prisma from 'prisma';
import { EventType } from 'shared';
import { extractUserDataFromRequest } from '../../../auth/common';
import { NewAnswerDto } from './newAnswer.dto';
export const pesistRound = async (
  req: Request,
  res: Response<
    unknown,
    {
      dto: NewAnswerDto;
      score: number;
      odds: number;
      round: Round;
      roundId: string;
      estimate: number;
    }
  >,
  next: NextFunction
) => {
  const dto = res.locals.dto;
  const round = dto.round;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const eventPayload: Record<string, any> = {
    round: { ...res.locals.dto },
    odds: res.locals.odds,
  };
  const user = extractUserDataFromRequest(req);
  if (user) {
    const userId = user.userId;
    eventPayload.userId = userId;
  }
  const roundSaveResult = await createRoundModel(round, res.locals.odds);
  if (isLeft(roundSaveResult)) {
    throw roundSaveResult.left;
  }
  const roundId = roundSaveResult.right.id;
  const roundAnswerSaveResult = await createRoundAnswerModel(
    dto,
    roundSaveResult.right.id,
    user?.userId
  );
  if (isLeft(roundAnswerSaveResult)) {
    throw roundAnswerSaveResult.left;
  }
  await prisma.event.create({
    data: {
      type: EventType.USER_POSTED_ANSWER,
      payload: { ...eventPayload },
    },
  });
  res.locals = { ...res.locals, roundId, round, estimate: dto.estimate };
  next();
};

async function createRoundModel(round: Round, odds: number) {
  return tryCatch(
    () =>
      prisma.round.create({
        data: {
          myHand: round.myHand,
          opponentsHands: round.opponentsHands,
          board: round.board,
          odds: odds,
        },
      }),
    error => Error(String(error))
  )();
}
async function createRoundAnswerModel(
  dto: NewAnswerDto,
  roundId: string,
  userId?: string
) {
  return tryCatch(
    () =>
      prisma.roundAnswer.create({
        data: {
          roundId,
          estimate: dto.estimate,
          userId,
        },
      }),
    error => Error(String(error))
  )();
}
