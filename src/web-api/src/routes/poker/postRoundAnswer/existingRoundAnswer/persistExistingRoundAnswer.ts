import { Round } from '@moby-it/poker-core';
import { NextFunction, Request, Response } from 'express';
import prisma from 'prisma';
import { EventType } from 'shared';
import { extractUserDataFromRequest } from '../../../auth/common';
import { ExistingAnswerDto } from './existingAnswer.dto';
export const persistExistingRound = async (
  req: Request,
  res: Response<
    unknown,
    {
      dto: ExistingAnswerDto;
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
  const roundId = dto.roundId;
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
  await createRoundAnswerModel(dto, user?.userId);
  await prisma.event.create({
    data: {
      type: EventType.USER_POSTED_ANSWER,
      payload: { ...eventPayload },
    },
  });
  res.locals = { ...res.locals, roundId, estimate: dto.estimate };
  next();
};

async function createRoundAnswerModel(dto: ExistingAnswerDto, userId?: string) {
  await prisma.roundAnswer.create({
    data: {
      roundId: dto.roundId,
      estimate: dto.estimate,
      userId,
    },
  });
}
